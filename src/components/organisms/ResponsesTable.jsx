import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import Badge from '../molecules/Badge';
import styles from './Organisms.module.css';
export default function ResponsesTable({
  content = uiContent.ResponsesTable,
  form,
  responses,
  onSelect,
  showAll,
  onShowAll,
  className,
  ...rest
}) {
  const find = (response, type) => {
    const field = form.fields.find((f) => f.type === type);
    return (
      response.answers[field?.id] ||
      (type === 'text' ? response.answers.name : response.answers.email) ||
      '—'
    );
  };
  return (
    <section className={classNames(styles.card, styles.tableCard, className)} {...rest}>
      <div className={styles.tableHeader}>
        <h2>{content.recentResponses}</h2>
        <Button variant="link" onClick={onShowAll}>
          {showAll ? content.showRecentResponses : content.viewAllResponses}
          <Icon name={content.icons.arrowright} size={16} />
        </Button>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{content.nameFirstAnswer}</th>
              <th>{content.email}</th>
              <th>{content.submitted}</th>
              <th>{content.status}</th>
            </tr>
          </thead>
          <tbody>
            {responses.slice(0, showAll ? undefined : 5).map((response) => (
              <tr
                key={response.id}
                tabIndex={0}
                onClick={() => onSelect(response)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSelect(response);
                }}
                aria-label={content.viewResponseDetails}
              >
                <td>{String(find(response, 'text'))}</td>
                <td>{String(find(response, 'email'))}</td>
                <td>
                  {new Date(response.submittedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}{' '}
                  {response.fixture && <small>{content.sample}</small>}
                </td>
                <td>
                  <Badge variant="success">{content.completed}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!responses.length && (
          <div className={styles.empty}>
            <h3>{content.noResponsesYet}</h3>
            <p>{content.submitYourPublishedFormToSeeRealLocal}</p>
          </div>
        )}
      </div>
    </section>
  );
}
