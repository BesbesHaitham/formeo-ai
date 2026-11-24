import { useReducer, useState } from 'react';
import { WorkspaceContext } from '../src/store/WorkspaceContext';
import { workspaceReducer } from '../src/store/workspaceReducer';
import {
  initialForms,
  initialResponses,
  initialVisits,
  studentForm,
} from '../src/content/fixtures';
import GlobalFeedback from '../src/components/templates/GlobalFeedback';

// Use the real reducer with a fresh in-memory workspace for each story.
export default function StoryWorkspace({ children, workspace = {}, theme, setTheme }) {
  const [state, send] = useReducer(workspaceReducer, null, () =>
    structuredClone({
      forms: [...initialForms, studentForm],
      responses: initialResponses,
      visits: initialVisits,
      initialized: true,
      ...workspace,
    }),
  );
  const [user, setUser] = useState(
    workspace.user === undefined
      ? { name: 'Alex Morgan', email: 'alex@example.com' }
      : workspace.user,
  );
  const [notice, notify] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [keyDialog, setKeyDialog] = useState(false);
  const value = {
    ...state,
    user,
    setUser,
    send,
    notice,
    notify,
    apiKey,
    setApiKey,
    keyDialog,
    setKeyDialog,
    saveError: '',
    aiReady: true,
    mockMode: true,
    theme,
    setTheme,
    logout: () => setUser(null),
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
      <GlobalFeedback {...value} />
    </WorkspaceContext.Provider>
  );
}
