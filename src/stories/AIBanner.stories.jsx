import { fn } from 'storybook/test';
import AIBanner from '../components/organisms/AIBanner';

export default {
  title: 'Organisms/AIBanner',
  component: AIBanner,
};

const noop = fn();

export const Default = { args: { onGenerate: noop } };
