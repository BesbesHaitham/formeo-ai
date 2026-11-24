import { fn } from 'storybook/test';
import Sidebar from '../components/organisms/Sidebar';
import AccountMenu from '../components/organisms/AccountMenu';

export default {
  title: 'Organisms/Sidebar',
  component: Sidebar,
};

const noop = fn();

export const Default = {
  args: { account: <AccountMenu name="Alex Morgan" email="alex@example.com" onLogout={noop} /> },
};
