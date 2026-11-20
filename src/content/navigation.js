export const navigation = [
  { to: '/', icon: 'FileText', label: 'My forms', end: true },
  { to: '/templates', icon: 'Table2', label: 'Templates' },
  { to: '/responses', icon: 'ChartNoAxesColumn', label: 'Responses' },
];

export const statusLabels = { published: 'Published', draft: 'Draft' };
export const templateCategories = ['All templates', 'Registration', 'Feedback', 'Business'];
export const editorTabs = [
  { id: 'questions', label: 'Questions' },
  { id: 'design', label: 'Design' },
  { id: 'settings', label: 'Settings' },
];
export const formActions = [
  { name: 'edit', label: 'Edit' },
  { name: 'rename', label: 'Rename' },
  { name: 'duplicate', label: 'Duplicate' },
  { name: 'preview', label: 'Preview' },
  { name: 'publish', label: 'Publish', activeLabel: 'Unpublish' },
  { name: 'responses', label: 'Responses' },
  { name: 'delete', label: 'Delete', variant: 'danger' },
];
export const fieldActions = [
  { name: 'up', icon: 'ArrowUp', label: 'Move up' },
  { name: 'down', icon: 'ArrowDown', label: 'Move down' },
  { name: 'duplicate', icon: 'Copy', label: 'Duplicate' },
  { name: 'delete', icon: 'Trash2', label: 'Delete' },
];
