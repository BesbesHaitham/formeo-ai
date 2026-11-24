import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import PasswordRecoveryForm from '../components/organisms/PasswordRecoveryForm';
import { uiContent } from '../content/uiContent';

export default {
  title: 'Organisms/PasswordRecoveryForm',
  component: PasswordRecoveryForm,
  args: {
    content: uiContent.PasswordRecoveryForm,
    email: '',
    setEmail: fn(),
    submit: fn(),
    back: fn(),
  },
  render: function RecoveryStory(args) {
    const [, updateArgs] = useArgs();

    return (
      <PasswordRecoveryForm
        {...args}
        setEmail={(email) => {
          updateArgs({ email });
          args.setEmail(email);
        }}
      />
    );
  },
};

export const Default = {};

export const Loading = { args: { email: 'alex@example.com', loading: true } };

export const Error = { args: { error: 'Unable to send the reset email. Please try again.' } };

export const Sent = { args: { sent: true, email: 'alex@example.com', cooldown: 60 } };

export const ReadyToResend = { args: { sent: true, cooldown: 0 } };
