import { fn } from 'storybook/test';
import AccountMenu from '../components/organisms/AccountMenu';

export default {
  title: 'Organisms/AccountMenu',
  component: AccountMenu,
};

const noop = fn();

export const Default = {
  args: { name: 'Alex Morgan', email: 'alex@example.com', onLogout: noop },
};
