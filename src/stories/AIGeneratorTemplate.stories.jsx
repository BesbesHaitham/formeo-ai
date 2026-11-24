import { fn } from 'storybook/test';
import AIGeneratorTemplate from '../components/templates/AIGeneratorTemplate';

export default {
  title: 'Templates/AIGeneratorTemplate',
  component: AIGeneratorTemplate,
  parameters: { layout: 'fullscreen' },
};

const noop = fn();

export const Default = {
  args: { prompt: '', setPrompt: noop, generate: noop, demo: noop, setKeyDialog: noop },
};
