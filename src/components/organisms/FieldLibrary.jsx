import { uiContent } from '../../content/uiContent';
import { useState } from 'react';
import classNames from 'classnames';
import Button from '../atoms/Button';
import FieldTypeItem from '../molecules/FieldTypeItem';
import { startEditorDrag } from '../../utils/editorDrag';
import styles from './Organisms.module.css';
export default function FieldLibrary({
  content = uiContent.FieldLibrary,
  types = [],
  visibleCount = 7,
  onAdd,
  className,
  ...rest
}) {
  const [more, setMore] = useState(false);
  return (
    <aside className={classNames(styles.panel, className)} {...rest}>
      <h2>{content.title}</h2>
      <p>{content.description}</p>
      <div className={styles.library}>
        {types.slice(0, more ? types.length : visibleCount).map((type) => (
          <FieldTypeItem
            key={type.type}
            label={type.label}
            icon={type.icon}
            draggable
            onDragStart={(event) => startEditorDrag(event, 'field', type.type)}
            onClick={() => onAdd(type.type)}
          />
        ))}
        <Button variant="link" size="sm" onClick={() => setMore(!more)}>
          {more ? content.showLess : content.showMore}
        </Button>
      </div>
    </aside>
  );
}
