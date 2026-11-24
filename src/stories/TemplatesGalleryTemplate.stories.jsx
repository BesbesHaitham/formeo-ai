import { fn } from 'storybook/test';
import TemplatesGalleryTemplate from '../components/templates/TemplatesGalleryTemplate';
import { initialForms, templates } from '../content/fixtures';

export default {
  title: 'Templates/TemplatesGalleryTemplate',
  component: TemplatesGalleryTemplate,
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
  args: { ...common, templates: templates, category: 'All templates', setCategory: noop },
};
