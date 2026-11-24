import NotFoundTemplate from '../components/templates/NotFoundTemplate';

export default {
  title: 'Templates/NotFoundTemplate',
  component: NotFoundTemplate,
  parameters: { layout: 'fullscreen' },
};

export const Default = {};

export const Unavailable = { args: { message: 'This form is not available' } };

export const EmptyForm = { args: { message: 'Add a question before previewing' } };
