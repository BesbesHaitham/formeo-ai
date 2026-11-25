import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import ResponsesToolbar from '../components/organisms/ResponsesToolbar';
import { initialForms } from '../content/fixtures';

export default {
  title: 'Organisms/ResponsesToolbar',
  component: ResponsesToolbar,
  args: {
    form: initialForms[0],
    forms: initialForms,
    days: 7,
    setDays: fn(),
    navigate: fn(),
    exportCsv: fn(),
  },
  render: function ResponsesStory(args) {
    const [, updateArgs] = useArgs();

    return (
      <ResponsesToolbar
        {...args}
        setDays={(days) => {
          args.setDays(days);
          updateArgs({ days });
        }}
        navigate={(to) => {
          args.navigate(to);
          const form = args.forms.find((item) => to === `/responses/${item.id}`);

          if (form) updateArgs({ form });
        }}
      />
    );
  },
};

export const Default = {};

export const LastMonth = { args: { days: 30 } };

export const Published = { args: { form: { ...initialForms[0], status: 'published' } } };
