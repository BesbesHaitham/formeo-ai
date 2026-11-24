import { fn } from 'storybook/test';
import ThemeSwitch from '../components/molecules/ThemeSwitch';

export default {
  title: 'Molecules/ThemeSwitch',
  component: ThemeSwitch,
  args: { onClick: fn(), onChange: fn() },
};

export const Default = { args: { theme: 'light', onChange: fn() } };
