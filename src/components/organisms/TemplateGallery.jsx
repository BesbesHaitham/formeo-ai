import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import styles from './Organisms.module.css';

export default function TemplateGallery({
  content = uiContent.TemplateGallery,
  templates,
  onUse,
  className,
  ...rest
}) {
  return (
    <div className={classNames(styles.grid, styles.templateGrid, className)} {...rest}>
      {templates.map((template) => (
        <article key={template.id} className={classNames(styles.card, styles.templateCard)}>
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
          <h2>{template.title}</h2>
          <p>{template.description}</p>
          <Button variant="link" onClick={() => onUse(template)}>
            {content.useTemplate}
            <Icon name={content.icons.arrowright} size={16} />
          </Button>
        </article>
      ))}
    </div>
  );
}
