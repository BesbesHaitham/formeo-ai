import TemplateThumbnail from '../components/molecules/TemplateThumbnail';
import { templates } from '../content/fixtures';

export default {
  title: 'Molecules/TemplateThumbnail',
  component: TemplateThumbnail,
  args: { template: templates[0] },
};

export const Default = {};

export const AnotherTemplate = { args: { template: templates[1] } };
