import AuthPage from '../pages/AuthPage';
import AppRoutes from '../routes/AppRoutes';

export default {
  title: 'Pages/AuthPage',
  component: AuthPage,
  parameters: {
    layout: 'fullscreen',
    route: '/login',
    workspace: { user: null },
    controls: { disable: true },
  },
  render: () => <AppRoutes />,
};

export const Default = {};

export const Signup = { parameters: { route: '/signup' } };

export const ReturningToEditor = {
  parameters: {
    route: { pathname: '/login', state: { returnTo: '/forms/student-registration/edit' } },
  },
};
