import { fn } from 'storybook/test';
import Logo from '../components/molecules/Logo';

export default {
  title: 'Molecules/Logo',
  component: Logo,
  args: { onClick: fn(), onChange: fn() },
};

export const Default = { args: {} };
