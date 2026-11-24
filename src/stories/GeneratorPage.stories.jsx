import GeneratorPage from '../pages/GeneratorPage';
import AppRoutes from '../routes/AppRoutes';

export default {
  title: 'Pages/GeneratorPage',
  component: GeneratorPage,
  parameters: {
    layout: 'fullscreen',
    route: '/generate',
    workspace: {},
    controls: { disable: true },
  },
  render: () => <AppRoutes />,
};

export const Default = {};
