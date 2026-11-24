import { fn } from 'storybook/test';
import FormProgress from '../components/molecules/FormProgress';

export default {
  title: 'Molecules/FormProgress',
  component: FormProgress,
  args: { onClick: fn(), onChange: fn() },
};

export const Default = {
  args: { ...{ current: 2, total: 6, title: 'Student Registration' } },
};
