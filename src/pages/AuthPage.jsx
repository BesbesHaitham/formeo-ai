import { useAuth } from '../hooks/useAuth';
import AuthTemplate from '../components/templates/AuthTemplate';
export default function AuthPage({ signingUp = false }) {
  return <AuthTemplate signingUp={signingUp} {...useAuth(signingUp)} />;
}
