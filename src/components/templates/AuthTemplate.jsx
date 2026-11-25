import AuthAside from '../organisms/AuthAside';
import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import AuthenticationForm from '../organisms/AuthenticationForm';
import PasswordRecoveryForm from '../organisms/PasswordRecoveryForm';
import styles from './Templates.module.css';

export default function AuthTemplate({
  content = uiContent.AuthTemplate,
  signingUp,
  recovery,
  className,
  ...props
}) {
  return (
    <main id="main-content" tabIndex={-1} className={classNames(styles.auth, className)}>
      <AuthAside content={content} signingUp={signingUp} />
      <section className={styles.authMain}>
        {recovery ? (
          <PasswordRecoveryForm {...recovery} content={uiContent.PasswordRecoveryForm} />
        ) : (
          <AuthenticationForm
            signingUp={signingUp}
            {...props}
            content={uiContent.AuthenticationForm}
          />
        )}
      </section>
    </main>
  );
}
