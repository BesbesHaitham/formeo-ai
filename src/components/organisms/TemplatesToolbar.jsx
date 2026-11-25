import { uiContent } from '../../content/uiContent';
import { templateCategories } from '../../content/navigation';
import classNames from 'classnames';
import ActionButton from '../molecules/ActionButton';
import SearchField from '../molecules/SearchField';
import styles from '../templates/Templates.module.css';

export default function TemplatesToolbar({
  content = uiContent.TemplatesGalleryTemplate,
  category,
  setCategory,
  query,
  setQuery,
}) {
  return (
    <div className={classNames(styles.toolbar, styles.galleryToolbar)}>
      <div className={styles.filters}>
        {templateCategories.map((item) => (
          <ActionButton
            key={item}
            size="sm"
            variant="secondary"
            className={category === item ? styles.selected : ''}
            onClick={() => setCategory(item)}
          >
            {item}
          </ActionButton>
        ))}
      </div>
      <SearchField
        placeholder={content.searchPlaceholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        content={uiContent.SearchField}
      />
    </div>
  );
}
