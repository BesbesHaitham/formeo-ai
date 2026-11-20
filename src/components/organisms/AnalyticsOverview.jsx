import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import IconTile from '../molecules/IconTile';
import styles from './Organisms.module.css';
export default function AnalyticsOverview({
  content = uiContent.AnalyticsOverview,
  analytics,
  days,
  className,
  ...rest
}) {
  const { total, completion, average, visits, bars, completed, dropped } = analytics;
  const values = {
    total,
    visits,
    completion: completion === null ? content.emptyValue : completion + '%',
    average:
      average === null
        ? content.emptyValue
        : Math.floor(average / 60) + 'm ' + (average % 60) + 's',
  };
  const max = Math.max(...bars.map((b) => b.count), 1);
  return (
    <div className={classNames(styles.analytics, className)} {...rest}>
      <div className={styles.stats}>
        {content.metrics.map(({ key, icon, label }) => (
          <section key={label} className={classNames(styles.card, styles.stat)}>
            <IconTile icon={icon} />
            <div>
              <p>{label}</p>
              <strong>{values[key]}</strong>
            </div>
          </section>
        ))}
      </div>
      <div className={styles.charts}>
        <section className={classNames(styles.card, styles.chart)}>
          <h2>{content.responsesOverTime}</h2>
          <p>
            {content.submissionsDuringTheLast}
            {days}
            {content.days}
          </p>
          <div
            className={styles.bars}
            role="img"
            aria-label={bars.map((b) => `${b.label}: ${b.count}`).join(', ')}
          >
            {bars.map((bar, i) => (
              <div key={i} className={styles.barColumn}>
                <span
                  title={`${bar.count} responses`}
                  style={{
                    height: `${(bar.count / max) * 90}%`,
                  }}
                />
                <small>{days === 7 || i % 5 === 0 ? bar.label : ''}</small>
              </div>
            ))}
          </div>
        </section>
        <section className={classNames(styles.card, styles.chart)}>
          <h2>{content.completion}</h2>
          <p>{content.peopleWhoFinishedYourForm}</p>
          <div className={styles.completion}>
            <div
              className={styles.donut}
              style={{
                background: `conic-gradient(var(--primary) ${completion || 0}%, var(--soft) 0)`,
              }}
            >
              <div>
                <strong>{completion === null ? '—' : `${completion}%`}</strong>
                <small>{completion === null ? content.noVisitsYet : content.completed}</small>
              </div>
            </div>
            <div className={styles.legend}>
              <p>
                <i />
                {content.completed2}
                <strong>{completed}</strong>
              </p>
              <p>
                <i />
                {content.notCompleted}
                <strong>{dropped}</strong>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
