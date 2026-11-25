import { fn } from 'storybook/test';
import WorkspaceLayout from '../components/templates/WorkspaceLayout';

export default {
  title: 'Templates/WorkspaceLayout',
  component: WorkspaceLayout,
  args: {
    user: { name: 'Alex Doe', email: 'alex@example.com' },
    theme: 'light',
    setTheme: fn(),
    logout: fn(),
    onCreate: fn(),
    children: (
      <>
        <h1>Workspace</h1>
        <p>Your page content appears here.</p>
      </>
    ),
  },
  parameters: { layout: 'fullscreen' },
};

export const Default = {};

export const SignedOut = { args: { user: null } };

export const Dark = { args: { theme: 'dark' }, globals: { theme: 'dark' } };
