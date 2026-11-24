import { fn } from 'storybook/test';
import IconButton from '../components/molecules/IconButton';

export default {
  title: 'Molecules/IconButton',
  component: IconButton,
  args: { onClick: fn(), onChange: fn() },
};

export const Default = {
  args: { icon: 'Trash2', label: 'Delete question' },
};
