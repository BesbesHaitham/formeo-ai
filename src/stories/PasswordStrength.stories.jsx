import { fn } from 'storybook/test';
import PasswordStrength from '../components/molecules/PasswordStrength';
import { checkPassword } from '../utils/password';
import { uiContent } from '../content/uiContent';

export default {
  title: 'Molecules/PasswordStrength',
  component: PasswordStrength,
  args: { onClick: fn(), onChange: fn() },
};

export const Default = {
  args: {
    checks: checkPassword('Example'),
    content: uiContent.PasswordStrength,
    style: { position: 'static', maxWidth: 360 },
  },
};
