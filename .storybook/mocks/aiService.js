import { studentForm } from '../../src/content/fixtures';
import { copyForm } from '../../src/utils/formSchema';

export async function generateFormFromPrompt(prompt) {
  if (prompt.toLowerCase().includes('error'))
    throw new Error('Unable to connect to Gemini. Please try again.');

  return copyForm(studentForm);
}

export async function refineFormFromPrompt(form, prompt) {
  if (prompt.toLowerCase().includes('error'))
    throw new Error('Unable to connect to Gemini. Please try again.');

  return { ...structuredClone(form), description: prompt };
}
