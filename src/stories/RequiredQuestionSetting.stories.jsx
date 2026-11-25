import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import RequiredQuestionSetting from '../components/molecules/RequiredQuestionSetting';
import { studentForm } from '../content/fixtures';

export default {
  title: 'Molecules/RequiredQuestionSetting',
  component: RequiredQuestionSetting,
  args: { field: studentForm.fields[0], onChange: fn() },
  render: function RequiredStory(args) {
    const [, updateArgs] = useArgs();

    return (
      <RequiredQuestionSetting
        {...args}
        onChange={(patch) => {
          args.onChange(patch);
          updateArgs({ field: { ...args.field, ...patch } });
        }}
      />
    );
  },
};

export const Default = {};

export const Optional = { args: { field: { ...studentForm.fields[0], required: false } } };
