import classNames from 'classnames';
import { uiContent } from '../../content/uiContent';
import AppHeader from '../organisms/AppHeader';
import Sidebar from '../organisms/Sidebar';
import AnalyticsOverview from '../organisms/AnalyticsOverview';
import ResponsesTable from '../organisms/ResponsesTable';
import Modal from '../molecules/Modal';
import Badge from '../molecules/Badge';
import Button from '../atoms/Button';
import Select from '../atoms/Select';
import Icon from '../atoms/Icon';
import styles from './Templates.module.css';
export default function ResponsesTemplate({
  form,
  forms,
  analytics,
  days,
  setDays,
  selected,
  details = [],
  setSelected,
  showAll,
  setShowAll,
  navigate,
  exportCsv,
  onCreate,
  onSettings,
  user,
  className,
}) {
  return (
    <>
      <AppHeader
        user={user}
        onCreate={onCreate}
        onHelp={onSettings}
        content={uiContent.AppHeader}
      />
      <div className={styles.workspace}>
        <Sidebar onSettings={onSettings} content={uiContent.Sidebar} />
        <main className={classNames(styles.main, className)}>
          <div className={styles.titleRow}>
            <div>
              <Button
                variant="link"
                style={{
                  color: 'var(--muted)',
                  marginBottom: 16,
                }}
                onClick={() => navigate('/')}
              >
                <Icon name="ArrowLeft" size={15} />
                My forms &nbsp; / &nbsp;
                <strong
                  style={{
                    color: 'var(--text)',
                  }}
                >
                  {form.title}
                </strong>
              </Button>
              <h1>Responses &amp; insights</h1>
              <p className={styles.subtitle}>Understand how people interact with your form.</p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 15,
              }}
            >
              <Badge variant={form.status === 'published' ? 'success' : undefined}>
                {form.status === 'published' ? 'Published' : 'Draft'}
              </Badge>
              <Button variant="secondary" onClick={exportCsv}>
                <Icon name="Download" size={18} />
                Export CSV
              </Button>
            </div>
          </div>
          <div className={styles.responseControls}>
            <Select
              aria-label="Choose form responses"
              value={form.id}
              onChange={(e) => navigate(`/responses/${e.target.value}`)}
            >
              {forms.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.title}
                </option>
              ))}
            </Select>
            <Select
              aria-label="Date range"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
            </Select>
          </div>
          {analytics.responses.some((r) => r.fixture) && (
            <p className={styles.notice}>
              Includes labeled sample submissions and visit events for the university demonstration.
            </p>
          )}
          <AnalyticsOverview
            analytics={analytics}
            days={days}
            content={uiContent.AnalyticsOverview}
          />
          <ResponsesTable
            form={form}
            responses={analytics.responses}
            onSelect={setSelected}
            showAll={showAll}
            onShowAll={() => setShowAll(!showAll)}
            content={uiContent.ResponsesTable}
          />
        </main>
      </div>
      {selected && (
        <Modal title="Response details" onClose={() => setSelected(null)} content={uiContent.Modal}>
          <p>
            {new Date(selected.submittedAt).toLocaleString()}
            {selected.fixture ? ' · Sample submission' : ' · Local submission'}
          </p>
          <dl>
            {details.map(({ id, label, value }) => (
              <div
                key={id}
                style={{
                  marginBottom: 18,
                }}
              >
                <dt
                  style={{
                    fontWeight: 650,
                  }}
                >
                  {label}
                </dt>
                <dd
                  style={{
                    margin: '4px 0',
                    color: 'var(--muted)',
                  }}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Modal>
      )}
    </>
  );
}
