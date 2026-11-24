import { fn } from 'storybook/test';
import AuthTemplate from '../components/templates/AuthTemplate';
import { checkPassword, passwordMinimum } from '../utils/password';

export default {
  title: 'Templates/AuthTemplate',
  component: AuthTemplate,
  parameters: { layout: 'fullscreen' },
};

const noop = fn();

export const Default = {
  args: {
    values: { email: '', password: '', remember: false },
    change: noop,
    submit: noop,
    googleMock: true,
    onGoogle: noop,
  },
};

export const Signup = {
  args: {
    signingUp: true,
    values: { name: '', email: '', password: '', agree: false },
    passwordChecks: checkPassword(''),
    passwordMinimum: passwordMinimum,
    change: noop,
    submit: noop,
    googleMock: true,
    onGoogle: noop,
  },
};

export const PasswordRecovery = {
  args: { recovery: { email: '', setEmail: noop, submit: noop, back: noop } },
};

export const ResetEmailSent = {
  args: {
    recovery: { sent: true, email: 'you@example.com', cooldown: 60, submit: noop, back: noop },
  },
};
