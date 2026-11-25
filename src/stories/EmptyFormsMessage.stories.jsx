import EmptyFormsMessage from '../components/molecules/EmptyFormsMessage';
import organismStyles from '../components/organisms/Organisms.module.css';

export default {
  title: 'Molecules/EmptyFormsMessage',
  component: EmptyFormsMessage,
  args: {},
  decorators: [
    (Story) => (
      <div className={organismStyles.empty}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {};
