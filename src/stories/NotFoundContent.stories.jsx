import NotFoundContent from '../components/organisms/NotFoundContent';
import templateStyles from '../components/templates/Templates.module.css';

export default {
  title: 'Organisms/NotFoundContent',
  component: NotFoundContent,
  args: { message: 'This form could not be found.' },
  decorators: [
    (Story) => (
      <div className={templateStyles.center}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {};

export const Unavailable = { args: { message: 'This form is not available.' } };
