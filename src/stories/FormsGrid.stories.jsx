import { fn } from 'storybook/test';
import FormsGrid from '../components/organisms/FormsGrid';
import { initialForms, initialResponses } from '../content/fixtures';

export default {
  title: 'Organisms/FormsGrid',
  component: FormsGrid,
};

const noop = fn();

export const Default = {
  args: { forms: initialForms, responses: initialResponses, onAction: noop },
};

export const EmptyForms = { args: { forms: [], onCreate: noop } };
