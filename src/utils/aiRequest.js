import { appConfig } from '../config/appConfig.js';
import { fieldTypes } from '../content/fieldTypes.js';

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
          options: {
            type: 'array',
            items: { type: 'string' },
            description: `Choice questions require nonempty labels. For rating questions, include the requested scale or use the configured default: ${JSON.stringify(fieldTypes.find(({ type }) => type === 'rating').options)}. Other field types use an empty array.`,
          },
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

export function createGenerationRequest(prompt, current) {
  return {
    model: appConfig.model,
    contents: `${current ? `Update this form: ${JSON.stringify(current)}\nPreserve existing IDs, questions and settings unless the request requires changing them.\nRequested changes:` : 'Create a professional form from this request:'}\n${prompt}`,
    config: {
      systemInstruction:
        'Return only form data, never code. Follow the request faithfully. Use logical question ordering and useful help text. Give choice fields nonempty options. Use sections only when helpful. Do not invent requirements.',
      responseMimeType: 'application/json',
      responseJsonSchema: generationSchema,
      maxOutputTokens: 8192,
      httpOptions: { timeout: 60000, retryOptions: { attempts: 1 } },
    },
  };
}

const errorMessages = {
  400: 'Gemini could not process this description. Try a shorter, clearer request.',
  401: 'Gemini could not authorize the configured key. Check its settings.',
  403: 'Gemini could not authorize the configured key. Check its restrictions.',
  404: 'The configured Gemini model is unavailable. Check the model setting.',
  429: 'Gemini request limit reached. Please try again later or start with a template.',
  503: 'Gemini is temporarily busy. Please try again shortly.',
  504: 'Gemini took too long to respond. Please try again with a shorter description.',
};

export function aiErrorMessage(status) {
  return errorMessages[status] || 'Gemini is temporarily unavailable. Please try again.';
}
