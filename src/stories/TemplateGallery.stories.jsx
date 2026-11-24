import { fn } from 'storybook/test';
import TemplateGallery from '../components/organisms/TemplateGallery';
import { templates } from '../content/fixtures';

export default {
  title: 'Organisms/TemplateGallery',
  component: TemplateGallery,
};

const noop = fn();

export const Default = { args: { templates: templates, onUse: noop } };
