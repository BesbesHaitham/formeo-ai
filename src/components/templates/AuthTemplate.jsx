import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import Logo from '../molecules/Logo';
import Badge from '../molecules/Badge';
import IconTile from '../molecules/IconTile';
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
      <aside className={styles.authAside}>
        <Logo content={uiContent.Logo} />
        <div className={styles.authCopy}>
          <Badge variant="purple" icon="Sparkles">
            {content.badge}
          </Badge>
          <h2>{signingUp ? content.signupTitle : content.loginTitle}</h2>
          <p>{content.description}</p>
        </div>
        <div className={styles.authArt} aria-hidden="true">
          <div className={styles.artCard}>
            <header>
              <IconTile icon="FileText" />
              <h3>{content.exampleTitle}</h3>
            </header>
            <i />
            <i
              style={{
                width: '87%',
              }}
            />
            <i />
          </div>
          <IconTile icon="Sparkles" className={styles.artSparkle} />
        </div>
      </aside>
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
