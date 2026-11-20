import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import styles from './Templates.module.css';
import { KeyDialog, SettingsDialog } from '../organisms/WorkspaceDialogs';
export default function GlobalFeedback({
  keyDialog,
  setKeyDialog,
  apiKey,
  setApiKey,
  notice,
  saveError,
  settingsDialog,
  setSettingsDialog,
  theme,
  setTheme,
  user,
  logout,
  className,
}) {
  return (
    <>
      {settingsDialog && (
        <SettingsDialog
          theme={theme}
          onTheme={setTheme}
          user={user}
          onLogout={logout}
          onClose={() => setSettingsDialog(false)}
          onConfigure={() => {
            setSettingsDialog(false);
            setKeyDialog(true);
          }}
          content={uiContent.SettingsDialog}
        />
      )}
      {keyDialog && (
        <KeyDialog
          hasKey={!!apiKey}
          onSave={setApiKey}
          onClose={() => setKeyDialog(false)}
          content={uiContent.KeyDialog}
        />
      )}
      {(notice || saveError) && (
        <div
          className={classNames(styles.feedback, className)}
          role={saveError ? 'alert' : 'status'}
        >
          {saveError || notice}
        </div>
      )}
    </>
  );
}
