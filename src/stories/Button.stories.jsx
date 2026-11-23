import Button from '../components/atoms/Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger', 'link'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { children: 'Create form', variant: 'primary', size: 'md' },
};

export const Default = {};

export const Disabled = { args: { disabled: true } };

export const Secondary = { args: { variant: 'secondary' } };

export const Small = { args: { size: 'sm' } };

export const Large = { args: { size: 'lg' } };

export const Loading = { args: { loading: true } };

export const Danger = { args: { variant: 'danger', children: 'Delete form' } };
