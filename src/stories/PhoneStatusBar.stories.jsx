import { fn } from 'storybook/test';
import PhoneStatusBar from '../components/molecules/PhoneStatusBar';

export default {
  title: 'Molecules/PhoneStatusBar',
  component: PhoneStatusBar,
  args: { onClick: fn(), onChange: fn() },
};

export const Default = { args: { style: { width: 280 } } };
