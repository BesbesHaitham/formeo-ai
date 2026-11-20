import Textarea from '../components/atoms/Textarea';
export default {
  title: 'Atoms/Textarea',
  component: Textarea,
  args: { placeholder: 'Tell us more...', 'aria-label': 'Description' },
};
export const Default = {};
export const Disabled = { args: { disabled: true } };
