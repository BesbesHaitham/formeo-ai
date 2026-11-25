import { uiContent } from '../../content/uiContent';
import SelectOptions from '../molecules/SelectOptions';
import SearchField from '../molecules/SearchField';
import styles from '../templates/Templates.module.css';

export default function FormsToolbar({
  content = uiContent.DashboardTemplate,
  total,
  query,
  setQuery,
  status,
  setStatus,
}) {
  return (
    <div className={styles.toolbar}>
      <div>
        <h2>
          {content.formsTitle}{' '}
          <small>
            {content.countStart}
            {total}
            {content.countEnd}
          </small>
        </h2>
        <small>{content.recentDescription}</small>
      </div>
      <SearchField
        placeholder={content.searchPlaceholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        content={uiContent.SearchField}
      />
      <SelectOptions
        aria-label={content.statusLabel}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        options={[
          { value: 'all', label: content.allStatuses },
          { value: 'published', label: content.published },
          { value: 'draft', label: content.drafts },
        ]}
      />
    </div>
  );
}
