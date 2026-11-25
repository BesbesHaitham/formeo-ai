import TemplateThumbnail from '../molecules/TemplateThumbnail';
import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import ActionButton from '../molecules/ActionButton';
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
          <TemplateThumbnail template={template} />
          <h2>{template.title}</h2>
          <p>{template.description}</p>
          <ActionButton
            variant="link"
            onClick={() => onUse(template)}
            endIcon={content.icons.arrowright}
            endIconSize={16}
          >
            {content.useTemplate}
          </ActionButton>
        </article>
      ))}
    </div>
  );
}
