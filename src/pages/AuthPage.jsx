import { useAuth } from '../hooks/useAuth';
import AuthTemplate from '../components/templates/AuthTemplate';
import { Navigate } from 'react-router-dom';
export default function AuthPage({ signingUp = false }) {
  const { user, destination, ...auth } = useAuth(signingUp);
  return user ? (
    <Navigate to={destination} replace />
  ) : (
    <AuthTemplate signingUp={signingUp} {...auth} />
  );
}
