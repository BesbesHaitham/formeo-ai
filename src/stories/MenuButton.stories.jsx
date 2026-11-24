import { fn } from 'storybook/test';
import MenuButton from '../components/molecules/MenuButton';
import { formActions } from '../content/navigation';

export default {
  title: 'Molecules/MenuButton',
  component: MenuButton,
  args: { onClick: fn(), onChange: fn() },
};

export const Default = {
  args: { label: 'Form actions', icon: 'MoreHorizontal', items: formActions, onAction: fn() },
};
