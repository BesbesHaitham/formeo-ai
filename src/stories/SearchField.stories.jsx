import { fn } from 'storybook/test';
import SearchField from '../components/molecules/SearchField';

export default {
  title: 'Molecules/SearchField',
  component: SearchField,
  args: { onClick: fn(), onChange: fn() },
};

export const Default = { args: {} };
