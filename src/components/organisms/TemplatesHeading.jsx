import { uiContent } from '../../content/uiContent';
import ActionButton from '../molecules/ActionButton';
import styles from '../templates/Templates.module.css';

export default function TemplatesHeading({
  content = uiContent.TemplatesGalleryTemplate,
  navigate,
}) {
  return (
    <div className={styles.titleRow}>
      <div>
        <p className={styles.eyebrow}>{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p className={styles.subtitle}>{content.description}</p>
      </div>
      <ActionButton icon="Sparkles" size="lg" onClick={() => navigate('/generate')}>
        {content.generateWithAi}
      </ActionButton>
    </div>
  );
}
