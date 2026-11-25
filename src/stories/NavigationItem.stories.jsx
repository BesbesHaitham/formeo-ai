import NavigationItem from '../components/molecules/NavigationItem';

export default {
  title: 'Molecules/NavigationItem',
  component: NavigationItem,
  args: { to: '/', icon: 'FileText', label: 'My forms', end: true },
};

export const Default = {};

export const Inactive = { args: { to: '/templates', icon: 'LayoutTemplate', label: 'Templates' } };
