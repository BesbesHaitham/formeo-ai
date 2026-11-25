import { uiContent } from '../../content/uiContent';
import Logo from '../molecules/Logo';
import Badge from '../molecules/Badge';
import IconTile from '../molecules/IconTile';
import styles from '../templates/Templates.module.css';

export default function AuthAside({ content = uiContent.AuthTemplate, signingUp }) {
  return (
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
          <i className={styles.authPreviewLine} />
          <i />
        </div>
        <IconTile icon="Sparkles" className={styles.artSparkle} />
      </div>
    </aside>
  );
}
