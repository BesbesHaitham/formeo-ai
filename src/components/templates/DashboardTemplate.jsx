import classNames from 'classnames';
import { uiContent } from '../../content/uiContent';
import Select from '../atoms/Select';
import SearchField from '../molecules/SearchField';
import AppHeader from '../organisms/AppHeader';
import Sidebar from '../organisms/Sidebar';
import AccountMenu from '../organisms/AccountMenu';
import FormsGrid from '../organisms/FormsGrid';
import AIBanner from '../organisms/AIBanner';
import WorkspaceDialogs from '../organisms/WorkspaceDialogs';
import styles from './Templates.module.css';

export default function DashboardTemplate({
  content = uiContent.DashboardTemplate,
  forms,
  total,
  responses,
  query,
  setQuery,
  status,
  setStatus,
  create,
  action,
  navigate,
  dialog,
  setDialog,
  confirm,
  initialized,
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
        onCreate={() => create()}
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
              <p className={styles.eyebrow}>{content.eyebrow}</p>
              <h1>{content.title}</h1>
              <p className={styles.subtitle}>{content.description}</p>
            </div>
          </div>
          <AIBanner onGenerate={() => navigate('/generate')} content={uiContent.AIBanner} />
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
            <Select
              aria-label={content.statusLabel}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">{content.allStatuses}</option>
              <option value="published">{content.published}</option>
              <option value="draft">{content.drafts}</option>
            </Select>
          </div>
          {initialized ? (
            <FormsGrid
              forms={forms}
              responses={responses}
              onAction={action}
              onCreate={() => create()}
              content={uiContent.FormsGrid}
            />
          ) : (
            <p role="status">{content.loading}</p>
          )}
        </main>
      </div>
      {dialog && (
        <WorkspaceDialogs
          key={dialog.form.id + dialog.type}
          dialog={dialog}
          onClose={() => setDialog(null)}
          onConfirm={confirm}
          content={uiContent.WorkspaceDialogs}
        />
      )}
    </>
  );
}
