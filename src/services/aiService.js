import { appConfig } from '../config/appConfig.js';
import { fieldTypes } from '../content/fieldTypes.js';
import { validateGeneratedForm } from '../utils/formSchema.js';
export const generationSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['title', 'description', 'fields'],
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    fields: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'type', 'label', 'required', 'options'],
        properties: {
          id: { type: 'string' },
          type: { type: 'string', enum: fieldTypes.map((f) => f.type) },
          label: { type: 'string' },
          placeholder: { type: 'string' },
          required: { type: 'boolean' },
          helpText: { type: 'string' },
          section: { type: 'string' },
          options: { type: 'array', items: { type: 'string' } },
          validation: {
            type: 'object',
            additionalProperties: false,
            properties: {
              min: { type: 'number' },
              max: { type: 'number' },
              minLength: { type: 'integer' },
              maxLength: { type: 'integer' },
            },
          },
        },
      },
    },
  },
};
async function generate(prompt, apiKey, current, signal) {
  if (!apiKey)
    throw new Error('Configure a temporary Gemini key, or explicitly choose the demo example.');
  if (!prompt.trim()) throw new Error('Please describe the form or changes you need.');
  let response;
  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });
    response = await ai.models.generateContent({
      model: appConfig.model,
      contents: `${current ? `Update this form: ${JSON.stringify(current)}\nPreserve existing IDs, questions and settings unless the request requires changing them.\nRequested changes:` : 'Create a professional form from this request:'}\n${prompt}`,
      config: {
        abortSignal: signal,
        systemInstruction:
          'Return only form data, never code. Follow the request faithfully. Use logical question ordering and useful help text. Give choice fields nonempty options. Use sections only when helpful. Do not invent requirements.',
        responseMimeType: 'application/json',
        responseJsonSchema: generationSchema,
        httpOptions: { timeout: 60000, retryOptions: { attempts: 1 } },
      },
    });
  } catch (error) {
    if (signal?.aborted) throw signal.reason || error;
    if (/429|quota|rate/i.test(error.message))
      throw new Error(
        'Gemini quota or rate limit reached. Retry later or use the labeled demo example.',
        { cause: error },
      );
    if (/fetch|network|timeout/i.test(error.message))
      throw new Error(
        'Gemini could not be reached. Check your connection and retry, or use the demo example.',
        { cause: error },
      );
    if (/key|403|401/i.test(error.message))
      throw new Error('Gemini could not authorize this key. Check the key and its restrictions.', {
        cause: error,
      });
    throw new Error('Generation failed. Please retry or use the labeled demo example.', {
      cause: error,
    });
  }
  if (!response.text) throw new Error('Gemini returned no form. Try a more specific description.');
  let data;
  try {
    data = JSON.parse(response.text);
  } catch (error) {
    throw new Error('Gemini returned incomplete JSON. Please retry.', { cause: error });
  }
  return validateGeneratedForm(data, current);
}
export const generateFormFromPrompt = (prompt, key, signal) =>
  generate(prompt, key, undefined, signal);
export const refineFormFromPrompt = (form, prompt, key, signal) =>
  generate(prompt, key, form, signal);
