import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { requestPasswordReset } from '../services/authService';
import { appConfig } from '../config/appConfig';

export function usePasswordRecovery() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(state?.email || '');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const busy = useRef(false);
  const retryAt = useRef(0);
  const active = useRef(true);
  useEffect(() => {
    active.current = true;

    return () => {
      active.current = false;
    };
  }, []);
  const coolingDown = cooldown > 0;
  useEffect(() => {
    if (!coolingDown) return;

    const timer = setInterval(
      () => setCooldown(Math.max(0, Math.ceil((retryAt.current - Date.now()) / 1000))),
      1000,
    );

    return () => clearInterval(timer);
  }, [coolingDown]);

  async function submit() {
    if (busy.current || cooldown) return;

    busy.current = true;
    setLoading(true);
    setError('');
    try {
      await requestPasswordReset(email);

      if (active.current) {
        setSent(true);
        retryAt.current = Date.now() + 60000;
        setCooldown(60);
      }
    } catch (error) {
      if (active.current) setError(error.message);
    } finally {
      busy.current = false;

      if (active.current) setLoading(false);
    }
  }

  return {
    email,
    setEmail,
    sent,
    loading,
    error,
    cooldown,
    submit,
    mock: appConfig.useMock,
    authState: state,
    back: () => navigate('/login', { state, replace: true }),
  };
}
