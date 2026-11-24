import PasswordRecoveryPage from '../pages/PasswordRecoveryPage';
import AppRoutes from '../routes/AppRoutes';

export default {
  title: 'Pages/PasswordRecoveryPage',
  component: PasswordRecoveryPage,
  parameters: {
    layout: 'fullscreen',
    route: '/forgot-password',
    workspace: { user: null },
    controls: { disable: true },
  },
  render: () => <AppRoutes />,
};

export const Default = {};

export const PrefilledEmail = {
  parameters: { route: { pathname: '/forgot-password', state: { email: 'alex@example.com' } } },
};
