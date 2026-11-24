import { fn } from 'storybook/test';
import FormPreview from '../components/organisms/FormPreview';
import { studentForm } from '../content/fixtures';

export default {
  title: 'Organisms/FormPreview',
  component: FormPreview,
};

const noop = fn();

export const Default = {
  args: { field: studentForm.fields[1], onChange: noop, onNext: noop },
};
