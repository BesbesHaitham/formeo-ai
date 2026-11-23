import { uiContent } from '../../content/uiContent';
import classNames from 'classnames';
import styles from './Templates.module.css';
import { KeyDialog } from '../organisms/WorkspaceDialogs';

export default function GlobalFeedback({
  keyDialog,
  setKeyDialog,
  apiKey,
  setApiKey,
  notice,
  saveError,
  className,
}) {
  return (
    <>
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
