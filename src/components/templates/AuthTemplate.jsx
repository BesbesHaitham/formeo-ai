import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import Logo from '../molecules/Logo';
import Badge from '../molecules/Badge';
import IconTile from '../molecules/IconTile';
import AuthenticationForm from '../organisms/AuthenticationForm';
import styles from './Templates.module.css';
export default function AuthTemplate({ signingUp, className, ...props }) {
  return (
    <main className={classNames(styles.auth, className)}>
      <aside className={styles.authAside}>
        <Logo content={uiContent.Logo} />
        <div className={styles.authCopy}>
          <Badge variant="purple" icon="Sparkles">
            Smart form builder
          </Badge>
          <h1>
            {signingUp
              ? 'Your next great form starts here.'
              : 'Build better forms, with less work.'}
          </h1>
          <p>
            Create beautiful forms in minutes. Describe your idea, let AI handle the structure, then
            personalize every detail.
          </p>
        </div>
        <div className={styles.authArt} aria-hidden="true">
          <div className={styles.artCard}>
            <header>
              <IconTile icon="FileText" />
              <h3>Student registration</h3>
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
        <AuthenticationForm
          signingUp={signingUp}
          {...props}
          content={uiContent.AuthenticationForm}
        />
      </section>
    </main>
  );
}
