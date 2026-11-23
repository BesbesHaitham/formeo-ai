import Input from '../components/atoms/Input';

export default {
  title: 'Atoms/Input',
  component: Input,
  args: { placeholder: 'Enter your full name', 'aria-label': 'Full name' },
};

export const Default = {};

export const Disabled = { args: { disabled: true } };
