import EditorPage from '../pages/EditorPage';
import AppRoutes from '../routes/AppRoutes';

export default {
  title: 'Pages/EditorPage',
  component: EditorPage,
  parameters: {
    layout: 'fullscreen',
    route: '/forms/student-registration/edit',
    workspace: {},
    controls: { disable: true },
  },
  render: () => <AppRoutes />,
};

export const Default = {};

export const NotFound = { parameters: { route: '/forms/missing/edit' } };

export const EmptyForm = {
  parameters: {
    workspace: {
      forms: [
        {
          id: 'empty',
          title: 'Untitled form',
          description: 'Start adding questions.',
          status: 'draft',
          color: '#5b43e7',
          fields: [],
        },
      ],
    },
    route: '/forms/empty/edit',
  },
};
