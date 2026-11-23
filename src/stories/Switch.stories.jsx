import Switch from '../components/atoms/Switch';

export default {
  title: 'Atoms/Switch',
  component: Switch,
  args: { 'aria-label': 'Required question' },
};

export const Default = {};

export const Disabled = { args: { disabled: true } };
