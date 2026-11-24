import { fn } from 'storybook/test';
import FieldTypeItem from '../components/molecules/FieldTypeItem';

export default {
  title: 'Molecules/FieldTypeItem',
  component: FieldTypeItem,
  args: { onClick: fn(), onChange: fn() },
};

export const Default = { args: { icon: 'Mail', label: 'Email' } };
