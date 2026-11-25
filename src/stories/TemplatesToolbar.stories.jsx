import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import TemplatesToolbar from '../components/organisms/TemplatesToolbar';
import { templateCategories } from '../content/navigation';

export default {
  title: 'Organisms/TemplatesToolbar',
  component: TemplatesToolbar,
  args: { category: templateCategories[0], setCategory: fn(), query: '', setQuery: fn() },
  render: function TemplatesStory(args) {
    const [, updateArgs] = useArgs();

    return (
      <TemplatesToolbar
        {...args}
        setCategory={(category) => {
          args.setCategory(category);
          updateArgs({ category });
        }}
        setQuery={(query) => {
          args.setQuery(query);
          updateArgs({ query });
        }}
      />
    );
  },
};

export const Default = {};

export const Filtered = { args: { category: templateCategories[1], query: 'registration' } };
