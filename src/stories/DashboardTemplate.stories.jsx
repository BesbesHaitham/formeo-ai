import { fn } from 'storybook/test';
import DashboardTemplate from '../components/templates/DashboardTemplate';
import { initialForms, initialResponses } from '../content/fixtures';

export default {
  title: 'Templates/DashboardTemplate',
  component: DashboardTemplate,
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
    total: 6,
    responses: initialResponses,
    status: 'all',
    setStatus: noop,
    initialized: true,
  },
};
