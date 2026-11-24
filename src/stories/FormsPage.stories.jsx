import FormsPage from '../pages/FormsPage';
import AppRoutes from '../routes/AppRoutes';

export default {
  title: 'Pages/FormsPage',
  component: FormsPage,
  parameters: {
    layout: 'fullscreen',
    route: '/',
    workspace: {},
    controls: { disable: true },
  },
  render: () => <AppRoutes />,
};

export const Default = {};

export const Empty = { parameters: { workspace: { forms: [], responses: [], visits: [] } } };

export const Loading = { parameters: { workspace: { initialized: false } } };
