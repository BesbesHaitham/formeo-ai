import { fn } from 'storybook/test';
import PasswordField from '../components/molecules/PasswordField';

export default {
  title: 'Molecules/PasswordField',
  component: PasswordField,
  args: { onClick: fn(), onChange: fn() },
};

const Password = {
  args: { 'aria-label': 'Password', placeholder: 'Enter your password' },
};

export const Default = Password;
