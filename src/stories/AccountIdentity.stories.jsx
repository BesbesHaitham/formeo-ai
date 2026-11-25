import AccountIdentity from '../components/molecules/AccountIdentity';
import moleculeStyles from '../components/molecules/Molecules.module.css';

export default {
  title: 'Molecules/AccountIdentity',
  component: AccountIdentity,
  args: { initials: 'AD', name: 'Alex Doe', email: 'alex@example.com' },
  decorators: [
    (Story) => (
      <div className={moleculeStyles.accountButton}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {};

export const WithoutEmail = { args: { email: undefined } };
