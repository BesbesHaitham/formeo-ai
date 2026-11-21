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
              <p className={styles.eyebrow}>Your workspace</p>
              <h1>My forms</h1>
              <p className={styles.subtitle}>
                Everything you need to create, share and manage beautiful forms.
              </p>
            </div>
          </div>
          <AIBanner onGenerate={() => navigate('/generate')} content={uiContent.AIBanner} />
          <div className={styles.toolbar}>
            <div>
              <h2>
                All forms <small>({total})</small>
              </h2>
              <small>Your recent work, ready to edit and share</small>
            </div>
            <SearchField
              placeholder="Search forms"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              content={uiContent.SearchField}
            />
            <Select
              aria-label="Filter forms by status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
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
            <p role="status">Loading your workspace…</p>
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
