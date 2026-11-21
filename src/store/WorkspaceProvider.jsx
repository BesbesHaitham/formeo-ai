import { useCallback, useEffect, useLayoutEffect, useReducer, useState } from 'react';
import { WorkspaceContext } from './WorkspaceContext.js';
import { workspaceReducer } from './workspaceReducer.js';
import { initialForms, initialResponses, initialVisits } from '../content/fixtures.js';
import { readWorkspace, saveWorkspace } from '../services/storage.js';
import { formsApi } from '../services/formsApi.js';
import { appConfig } from '../config/appConfig.js';
import { validStoredForm } from '../utils/formSchema.js';
import { readSession, clearSession } from '../services/authService.js';
export default function WorkspaceProvider({ children }) {
  const [state, dispatch] = useReducer(workspaceReducer, null, () => {
    const saved = readWorkspace();
    return {
      ...(saved || { forms: initialForms, responses: initialResponses, visits: initialVisits }),
      initialized: !appConfig.useMock || saved !== null,
    };
  });
  const [saveError, setSaveError] = useState('');
  const [notice, setNotice] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [user, setUser] = useState(readSession);
  const [keyDialog, setKeyDialog] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('formeo.theme') || 'light';
    } catch {
      return 'light';
    }
  });
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('formeo.theme', theme);
    } catch {
      /* Theme remains usable in memory. */
    }
  }, [theme]);
  useEffect(() => {
    if (state.initialized) return;
    let active = true;
    Promise.all([formsApi.list(), formsApi.responses('event')])
      .then(([forms, events]) => {
        if (!Array.isArray(forms) || !forms.every(validStoredForm))
          throw new Error('Invalid fixtures');
        if (active) dispatch({ type: 'initialize', forms, events });
      })
      .catch(() => {
        if (active) {
          dispatch({ type: 'initialize', forms: initialForms });
          setNotice(
            'Unable to connect to the form service. Your saved workspace remains available.',
          );
        }
      });
    return () => {
      active = false;
    };
  }, [state.initialized]);
  useEffect(() => {
    if (!state.initialized) return;
    queueMicrotask(() => setSaveError(saveWorkspace(state)));
  }, [state]);
  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(''), 5000);
    return () => clearTimeout(id);
  }, [notice]);
  useEffect(() => {
    if (!saveError) return;
    const warn = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [saveError]);
  const send = useCallback((action) => {
    dispatch(action);
    if (appConfig.useMock) {
      const operation = {
        add: () => formsApi.create(action.form),
        update: () => formsApi.update(action.form),
        delete: () => formsApi.remove(action.id),
        submit: () => formsApi.submit(action.response),
      }[action.type];
      operation?.().catch(() =>
        setNotice('Changes saved on this device. The form service could not be reached.'),
      );
    }
  }, []);
  return (
    <WorkspaceContext.Provider
      value={{
        ...state,
        send,
        saveError,
        notice,
        notify: setNotice,
        apiKey,
        aiReady: appConfig.aiProxy || !!apiKey,
        mockMode: appConfig.useMock,
        setApiKey,
        keyDialog,
        setKeyDialog,
        theme,
        setTheme,
        user,
        setUser,
        logout: () => {
          clearSession();
          setUser(null);
          setApiKey('');
          setKeyDialog(false);
          setNotice('You have been logged out.');
        },
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
