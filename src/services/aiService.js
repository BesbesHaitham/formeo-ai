import { appConfig } from '../config/appConfig.js';
import { createGenerationRequest, aiErrorMessage } from '../utils/aiRequest.js';
import { validateGeneratedForm } from '../utils/formSchema.js';
async function generate(prompt, apiKey, current, signal) {
  if (!apiKey && !appConfig.aiProxy)
    throw new Error('Connect your Gemini API key to generate a form, or start with a template.');
  if (!prompt.trim()) throw new Error('Please describe the form or changes you need.');
  let response;
  try {
    if (!apiKey && appConfig.aiProxy) {
      const result = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, current }),
        signal: AbortSignal.any([AbortSignal.timeout(65000), ...(signal ? [signal] : [])]),
      });
      response = await result.json();
      if (!result.ok)
        throw Object.assign(new Error('Gemini request failed.'), { status: result.status });
    } else {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });
      const request = createGenerationRequest(prompt, current);
      response = await ai.models.generateContent({
        ...request,
        config: { ...request.config, abortSignal: signal },
      });
    }
  } catch (error) {
    if (signal?.aborted) throw signal.reason || error;
    if (error.status) throw new Error(aiErrorMessage(error.status), { cause: error });
    if (/429|quota|rate/i.test(error.message))
      throw new Error(
        'Gemini request limit reached. Please try again later or start with a template.',
        { cause: error },
      );
    if (/fetch|network|timeout/i.test(error.message))
      throw new Error(
        'Unable to connect to Gemini. Check your internet connection and try again.',
        { cause: error },
      );
    if (/key|403|401/i.test(error.message))
      throw new Error('Gemini could not authorize this key. Check the key and its restrictions.', {
        cause: error,
      });
    throw new Error('Unable to generate your form. Please try again or start with a template.', {
      cause: error,
    });
  }
  if (!response.text && !response.form)
    throw new Error('Gemini returned no form. Try a more specific description.');
  let data;
  try {
    data = response.form || JSON.parse(response.text);
  } catch (error) {
    throw new Error('Gemini returned incomplete JSON. Please retry.', { cause: error });
  }
  return validateGeneratedForm(data, current);
}
export const generateFormFromPrompt = (prompt, key, signal) =>
  generate(prompt, key, undefined, signal);
export const refineFormFromPrompt = (form, prompt, key, signal) =>
  generate(prompt, key, form, signal);
