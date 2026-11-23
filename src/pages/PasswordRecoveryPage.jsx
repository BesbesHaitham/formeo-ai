import AuthTemplate from '../components/templates/AuthTemplate';
import { usePasswordRecovery } from '../hooks/usePasswordRecovery';

export default function PasswordRecoveryPage() {
  return <AuthTemplate recovery={usePasswordRecovery()} />;
}
