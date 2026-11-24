import { fn } from 'storybook/test';
import GoogleSignInButton from '../components/molecules/GoogleSignInButton';

export default {
  title: 'Molecules/GoogleSignInButton',
  component: GoogleSignInButton,
  args: { onClick: fn(), onChange: fn() },
};

export const Default = {
  args: {
    label: 'Continue with Google',
    notice: 'Test account provided by WireMock',
    onClick: fn(),
  },
};
