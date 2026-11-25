import Icon from '../atoms/Icon';
import styles from '../organisms/Organisms.module.css';

export default function TemplateThumbnail({ template }) {
  return (
    <div className={styles.thumbnail} aria-hidden="true">
      <div className={styles.miniForm}>
        <div>
          <Icon name={template.icon} size={16} />
          <i />
        </div>
        <i />
        <i className={styles.thumbnailShortLine} />
        <i />
      </div>
    </div>
  );
}
