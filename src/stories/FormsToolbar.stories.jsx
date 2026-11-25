import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import FormsToolbar from '../components/organisms/FormsToolbar';

export default {
  title: 'Organisms/FormsToolbar',
  component: FormsToolbar,
  args: { total: 6, query: '', setQuery: fn(), status: 'all', setStatus: fn() },
  render: function ToolbarStory(args) {
    const [, updateArgs] = useArgs();

    return (
      <FormsToolbar
        {...args}
        setQuery={(query) => {
          args.setQuery(query);
          updateArgs({ query });
        }}
        setStatus={(status) => {
          args.setStatus(status);
          updateArgs({ status });
        }}
      />
    );
  },
};

export const Default = {};

export const Filtered = { args: { query: 'Registration', status: 'published', total: 2 } };

export const Empty = { args: { total: 0 } };
