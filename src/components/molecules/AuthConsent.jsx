import { uiContent } from '../../content/uiContent';
import Checkbox from '../atoms/Checkbox';

export default function AuthConsent({
  content = uiContent.AuthenticationForm,
  signingUp,
  values,
  change,
}) {
  return (
    <label>
      <Checkbox
        required={signingUp}
        checked={signingUp ? values.agree : values.remember}
        onChange={(e) => change(signingUp ? 'agree' : 'remember', e.target.checked)}
      />
      {signingUp ? content.storageConsent : content.rememberMe}
    </label>
  );
}
