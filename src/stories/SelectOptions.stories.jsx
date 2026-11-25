import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import SelectOptions from '../components/molecules/SelectOptions';

export default {
  title: 'Molecules/SelectOptions',
  component: SelectOptions,
  args: {
    'aria-label': 'Form status',
    value: 'all',
    options: [
      { value: 'all', label: 'All statuses' },
      { value: 'published', label: 'Published' },
      { value: 'draft', label: 'Draft' },
    ],
    onChange: fn(),
  },
  render: function SelectStory(args) {
    const [, updateArgs] = useArgs();

    return (
      <SelectOptions
        {...args}
        onChange={(event) => {
          args.onChange(event);
          updateArgs({ value: event.target.value });
        }}
      />
    );
  },
};

export const Default = {};

export const Disabled = { args: { disabled: true } };

export const Empty = { args: { options: [], value: '' } };
