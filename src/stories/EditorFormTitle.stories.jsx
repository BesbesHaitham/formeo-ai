import EditorFormTitle from '../components/molecules/EditorFormTitle';
import { studentForm } from '../content/fixtures';
import organismStyles from '../components/organisms/Organisms.module.css';

export default {
  title: 'Molecules/EditorFormTitle',
  component: EditorFormTitle,
  args: { form: studentForm },
  decorators: [
    (Story) => (
      <div className={organismStyles.headerTitle}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {};

export const LongTitle = {
  args: {
    form: {
      ...studentForm,
      title: 'Registration for the annual student research and innovation conference',
    },
  },
};
