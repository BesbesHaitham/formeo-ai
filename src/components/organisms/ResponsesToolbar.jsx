import { uiContent } from '../../content/uiContent';
import Badge from '../molecules/Badge';
import ActionButton from '../molecules/ActionButton';
import SelectOptions from '../molecules/SelectOptions';
import styles from '../templates/Templates.module.css';

export default function ResponsesToolbar({
  content = uiContent.ResponsesTemplate,
  form,
  forms,
  exportCsv,
  navigate,
  days,
  setDays,
}) {
  return (
    <>
      <div className={styles.titleRow}>
        <div>
          <h1>{content.title}</h1>
          <p className={styles.subtitle}>{content.description}</p>
        </div>
        <div className={styles.responseActions}>
          <Badge variant={form.status === 'published' ? 'success' : 'neutral'}>
            {form.status === 'published' ? content.published : content.draft}
          </Badge>
          <ActionButton
            variant="secondary"
            size="sm"
            onClick={exportCsv}
            icon="Download"
            iconSize={16}
          >
            {content.exportCsv}
          </ActionButton>
        </div>
      </div>
      <div className={styles.responseControls}>
        <SelectOptions
          aria-label={content.chooseForm}
          value={form.id}
          onChange={(e) => navigate(`/responses/${e.target.value}`)}
          options={forms.map(({ id, title }) => ({ value: id, label: title }))}
        />
        <SelectOptions
          aria-label={content.dateRange}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          options={[
            { value: 7, label: content.lastWeek },
            { value: 30, label: content.lastMonth },
          ]}
        />
      </div>
    </>
  );
}
