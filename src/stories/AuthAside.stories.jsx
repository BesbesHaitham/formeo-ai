import AuthAside from '../components/organisms/AuthAside';

export default {
  title: 'Organisms/AuthAside',
  component: AuthAside,
  args: { signingUp: false },
};

export const Default = {};

export const Signup = { args: { signingUp: true } };
