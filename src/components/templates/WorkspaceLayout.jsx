import classNames from 'classnames';
import { uiContent } from '../../content/uiContent';
import AppHeader from '../organisms/AppHeader';
import Sidebar from '../organisms/Sidebar';
import AccountMenu from '../organisms/AccountMenu';
import styles from './Templates.module.css';

export default function WorkspaceLayout({
  user,
  theme,
  setTheme,
  logout,
  onCreate,
  className,
  children,
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
          {children}
        </main>
      </div>
    </>
  );
}
