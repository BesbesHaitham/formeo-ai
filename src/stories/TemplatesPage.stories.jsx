import TemplatesPage from '../pages/TemplatesPage';
import AppRoutes from '../routes/AppRoutes';

export default {
  title: 'Pages/TemplatesPage',
  component: TemplatesPage,
  parameters: {
    layout: 'fullscreen',
    route: '/templates',
    workspace: {},
    controls: { disable: true },
  },
  render: () => <AppRoutes />,
};

export const Default = {};
