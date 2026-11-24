import { fn } from 'storybook/test';
import AuthenticationForm from '../components/organisms/AuthenticationForm';

export default {
  title: 'Organisms/AuthenticationForm',
  component: AuthenticationForm,
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
