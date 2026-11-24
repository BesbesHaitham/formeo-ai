import { fn } from 'storybook/test';
import FormField from '../components/molecules/FormField';

export default {
  title: 'Molecules/FormField',
  component: FormField,
  args: { onClick: fn(), onChange: fn() },
};

export const Default = {
  args: { id: 'story-email', label: 'Email address', placeholder: 'you@example.com' },
};

export const ValidationError = {
  args: {
    id: 'story-error',
    label: 'Email address',
    value: 'invalid',
    error: 'Please enter a valid email address.',
  },
};
