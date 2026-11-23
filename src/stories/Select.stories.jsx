import Select from '../components/atoms/Select';

export default {
  title: 'Atoms/Select',
  component: Select,
  render: (args) => (
    <Select {...args}>
      <option value="">Choose an option</option>
      <option>Engineering</option>
      <option>Design</option>
    </Select>
  ),
  args: { 'aria-label': 'Select an option', children: null },
};

export const Default = {};

export const Disabled = { args: { disabled: true } };
