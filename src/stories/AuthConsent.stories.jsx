import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import AuthConsent from '../components/molecules/AuthConsent';

export default {
  title: 'Molecules/AuthConsent',
  component: AuthConsent,
  args: { signingUp: false, values: { agree: false, remember: false }, change: fn() },
  render: function ConsentStory(args) {
    const [, updateArgs] = useArgs();

    return (
      <AuthConsent
        {...args}
        change={(key, value) => {
          args.change(key, value);
          updateArgs({ values: { ...args.values, [key]: value } });
        }}
      />
    );
  },
};

export const Default = {};

export const Signup = { args: { signingUp: true } };

export const Checked = { args: { values: { agree: true, remember: true } } };
