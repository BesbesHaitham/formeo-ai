import { fn } from 'storybook/test';
import ResponsesTable from '../components/organisms/ResponsesTable';
import { initialForms, initialResponses } from '../content/fixtures';

export default {
  title: 'Organisms/ResponsesTable',
  component: ResponsesTable,
};

const noop = fn();

export const Default = {
  args: { form: initialForms[0], responses: initialResponses, onSelect: noop, onShowAll: noop },
};
