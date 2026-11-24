import { fn } from 'storybook/test';
import AIFormPrompt from '../components/organisms/AIFormPrompt';

export default {
  title: 'Organisms/AIFormPrompt',
  component: AIFormPrompt,
};

const noop = fn();

export const Default = {
  args: {
    prompt: 'Create a student registration form',
    setPrompt: noop,
    onGenerate: noop,
    onConfigure: noop,
    onDemo: noop,
  },
};

export const Generating = {
  args: {
    prompt: 'Create an internship application',
    setPrompt: noop,
    loading: true,
    onGenerate: noop,
    onConfigure: noop,
    onDemo: noop,
  },
};

export const GenerationError = {
  args: {
    prompt: 'Create a survey',
    setPrompt: noop,
    error: 'Gemini request limit reached. Please try again later.',
    onGenerate: noop,
    onConfigure: noop,
    onDemo: noop,
  },
};
