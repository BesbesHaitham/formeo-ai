import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup, rememberUser } from '../services/authService';
import { useWorkspace } from './useWorkspace';
export function useAuth(signingUp) {
  const navigate = useNavigate();
  const { setUser } = useWorkspace();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    agree: false,
    remember: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const change = (name, value) => {
    setValues({ ...values, [name]: value });
    setError('');
  };
  async function submit() {
    if (loading) return;
    if (signingUp && !values.name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (signingUp && values.password !== values.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (signingUp && !values.agree) {
      setError('Please agree to the demo terms to continue.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const user = await (signingUp ? signup(values) : login(values));
      rememberUser(user, values.remember);
      setUser(user);
      navigate('/');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
  return {
    values,
    change,
    error,
    loading,
    submit,
    onForgotPassword: () =>
      setError(
        'This local demo has no email service. Create a new demo account with another email address.',
      ),
    onGoogle: () =>
      setError(
        'Google OAuth is not configured in this frontend-only demo. Please use a local demo account.',
      ),
  };
}
