import PreviewPage from '../pages/PreviewPage';
import AppRoutes from '../routes/AppRoutes';

export default {
  title: 'Pages/PreviewPage',
  component: PreviewPage,
  parameters: {
    layout: 'fullscreen',
    route: '/forms/student-registration/preview',
    workspace: {},
    controls: { disable: true },
  },
  render: () => <AppRoutes />,
};

export const Default = {};

export const PublicForm = { parameters: { route: '/f/event' } };

export const Unavailable = { parameters: { route: '/f/missing' } };

export const Unpublished = { parameters: { route: '/f/job' } };

export const NoQuestions = {
  parameters: {
    route: '/forms/empty/preview',
    workspace: { forms: [{ id: 'empty', title: 'Empty form', status: 'draft', fields: [] }] },
  },
};
