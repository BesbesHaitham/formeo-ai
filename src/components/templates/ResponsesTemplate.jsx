import classNames from 'classnames';
import { uiContent } from '../../content/uiContent';
import AppHeader from '../organisms/AppHeader';
import Sidebar from '../organisms/Sidebar';
import AccountMenu from '../organisms/AccountMenu';
import AnalyticsOverview from '../organisms/AnalyticsOverview';
import ResponsesTable from '../organisms/ResponsesTable';
import Modal from '../molecules/Modal';
import Badge from '../molecules/Badge';
import Button from '../atoms/Button';
import Select from '../atoms/Select';
import Icon from '../atoms/Icon';
import styles from './Templates.module.css';

export default function ResponsesTemplate({
  content = uiContent.ResponsesTemplate,
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
  theme,
  setTheme,
  logout,
  user,
  className,
}) {
  return (
    <>
      <AppHeader
        user={user}
        onCreate={onCreate}
        theme={theme}
        onTheme={setTheme}
        account={user && <AccountMenu name={user.name || user.email} compact onLogout={logout} />}
        content={uiContent.AppHeader}
      />
      <div className={styles.workspace}>
        <Sidebar
          account={
            user && (
              <AccountMenu name={user.name || user.email} email={user.email} onLogout={logout} />
            )
          }
          content={uiContent.Sidebar}
        />
        <main id="main-content" tabIndex={-1} className={classNames(styles.main, className)}>
          <div className={styles.titleRow}>
            <div>
              <h1>{content.title}</h1>
              <p className={styles.subtitle}>{content.description}</p>
            </div>
            <div className={styles.responseActions}>
              <Badge variant={form.status === 'published' ? 'success' : 'neutral'}>
                {form.status === 'published' ? content.published : content.draft}
              </Badge>
              <Button variant="secondary" size="sm" onClick={exportCsv}>
                <Icon name="Download" size={16} />
                {content.exportCsv}
              </Button>
            </div>
          </div>
          <div className={styles.responseControls}>
            <Select
              aria-label={content.chooseForm}
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
              aria-label={content.dateRange}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            >
              <option value={7}>{content.lastWeek}</option>
              <option value={30}>{content.lastMonth}</option>
            </Select>
          </div>
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
        <Modal
          title={content.responseDetails}
          onClose={() => setSelected(null)}
          content={uiContent.Modal}
        >
          <p>
            {new Date(selected.submittedAt).toLocaleString()}
            {selected.fixture ? content.exampleResponse : content.submittedResponse}
          </p>
          <dl>
            {details.map(({ id, label, value }) => (
              <div key={id} className={styles.responseDetail}>
                <dt className={styles.responseLabel}>{label}</dt>
                <dd className={styles.responseValue}>{value}</dd>
              </div>
            ))}
          </dl>
        </Modal>
      )}
    </>
  );
}
