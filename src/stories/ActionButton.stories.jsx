import { fn } from 'storybook/test';
import ActionButton from '../components/molecules/ActionButton';

export default {
  title: 'Molecules/ActionButton',
  component: ActionButton,
  args: { children: 'Create form', icon: 'Plus', onClick: fn() },
};

export const Default = {};

export const TextOnly = { args: { icon: undefined } };

export const TrailingIcon = { args: { icon: undefined, endIcon: 'ArrowRight' } };

export const Loading = { args: { loading: true } };

export const Disabled = { args: { disabled: true } };
