import Radio from '../components/atoms/Radio';

export default {
  title: 'Atoms/Radio',
  component: Radio,
  args: { 'aria-label': 'Select this option', name: 'example' },
};

export const Default = {};

export const Disabled = { args: { disabled: true } };
