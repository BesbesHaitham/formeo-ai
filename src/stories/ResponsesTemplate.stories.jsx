import { fn } from 'storybook/test';
import ResponsesTemplate from '../components/templates/ResponsesTemplate';
import { initialForms, initialResponses, initialVisits } from '../content/fixtures';
import { getAnalytics } from '../utils/analytics';

export default {
  title: 'Templates/ResponsesTemplate',
  component: ResponsesTemplate,
  parameters: { layout: 'fullscreen' },
};

const noop = fn();

const common = {
  create: noop,
  action: noop,
  navigate: noop,
  setTheme: noop,
  setKeyDialog: noop,
  theme: 'light',
  setQuery: noop,
  query: '',
  forms: initialForms,
};

export const Default = {
  args: {
    ...common,
    form: initialForms[0],
    analytics: getAnalytics(initialResponses, initialVisits, 7, new Date('2026-11-20')),
    days: 7,
    setDays: noop,
    setSelected: noop,
    setShowAll: noop,
    exportCsv: noop,
    onCreate: noop,
  },
};
