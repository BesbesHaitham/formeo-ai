import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createForm, copyForm } from '../utils/formSchema';
import { login, signup, rememberUser } from '../services/authService';
import { useWorkspace } from './useWorkspace';
import { appConfig } from '../config/appConfig';
import { googleUser, mockGoogleUser, prepareGoogleSignIn } from '../services/googleAuth';
import { checkPassword, passwordMinimum } from '../utils/password';

export function useAuth(signingUp) {
  const navigate = useNavigate();
  const { user, setUser, send } = useWorkspace();
  const { state } = useLocation();
  const returnTo = state?.returnTo;
  const [destination, setDestination] = useState(() =>
    typeof returnTo === 'string' &&
    returnTo.startsWith('/') &&
    !returnTo.startsWith('//') &&
    !/^\/(login|signup)([/?#]|$)/.test(returnTo)
      ? returnTo
      : '/',
  );
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    agree: false,
    remember: false,
  });
  const [error, setError] = useState('');
  const [pending, setPending] = useState('');
  const [preparingGoogle, setPreparingGoogle] = useState(!appConfig.useMock);
  const busy = useRef(false);
  const active = useRef(true);
  useEffect(() => {
    active.current = true;

    if (!appConfig.useMock) {
      prepareGoogleSignIn()
        .catch(() => {})
        .finally(() => {
          if (active.current) setPreparingGoogle(false);
        });
    }

    return () => {
      active.current = false;
    };
  }, []);
  const complete = useCallback(
    (account) => {
      rememberUser(account, values.remember);

      if (state?.create) {
        const form = state.template ? copyForm(state.template) : createForm();
        send({ type: 'add', form });
        setDestination(`/forms/${form.id}/edit`);
      }

      setUser(account);
    },
    [send, setUser, state, values.remember],
  );
  const authenticate = useCallback(
    async (method, operation) => {
      if (busy.current) return;

      busy.current = true;
      setPending(method);
      setError('');
      try {
        const account = await operation();

        if (active.current) complete(account);
      } catch (error) {
        if (active.current) setError(error.message);
      } finally {
        busy.current = false;

        if (active.current) setPending('');
      }
    },
    [complete],
  );
  const change = (name, value) => {
    setValues({ ...values, [name]: value });
    setError('');
  };

  function submit() {
    if (busy.current) return;

    if (signingUp && !values.name.trim()) {
      setError('Please enter your full name.');

      return;
    }

    if (signingUp && !values.agree) {
      setError('Please confirm the storage notice to continue.');

      return;
    }

    authenticate('password', () => (signingUp ? signup(values) : login(values)));
  }

  return {
    user,
    destination,
    authState: state,
    values,
    passwordChecks: checkPassword(values.password),
    passwordMinimum,
    change,
    error,
    loading: pending === 'password',
    busy: !!pending,
    googleMock: appConfig.useMock,
    googleLoading: preparingGoogle || pending === 'google',
    onGoogle: () => authenticate('google', appConfig.useMock ? mockGoogleUser : googleUser),
    submit,
    onForgotPassword: () =>
      navigate('/forgot-password', { state: { ...state, email: values.email } }),
  };
}
