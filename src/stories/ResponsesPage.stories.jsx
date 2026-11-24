import ResponsesPage from '../pages/ResponsesPage';
import AppRoutes from '../routes/AppRoutes';

export default {
  title: 'Pages/ResponsesPage',
  component: ResponsesPage,
  parameters: {
    layout: 'fullscreen',
    route: '/responses/event',
    workspace: {},
    controls: { disable: true },
  },
  render: () => <AppRoutes />,
};

export const Default = {};

export const EmptyResponses = { parameters: { workspace: { responses: [], visits: [] } } };

export const NotFound = { parameters: { route: '/responses/missing' } };
