import { fn } from 'storybook/test';
import AppHeader from '../components/organisms/AppHeader';

export default {
  title: 'Organisms/AppHeader',
  component: AppHeader,
};

const noop = fn();

export const Default = { args: { onCreate: noop, theme: 'light', onTheme: noop } };
