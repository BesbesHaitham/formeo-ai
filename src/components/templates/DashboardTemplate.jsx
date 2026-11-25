import FormsToolbar from '../organisms/FormsToolbar';
import WorkspaceLayout from './WorkspaceLayout';
import { uiContent } from '../../content/uiContent';
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
      <WorkspaceLayout
        user={user}
        theme={theme}
        setTheme={setTheme}
        logout={logout}
        onCreate={() => create()}
        className={className}
      >
        <div className={styles.titleRow}>
          <div>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className={styles.subtitle}>{content.description}</p>
          </div>
        </div>
        <AIBanner onGenerate={() => navigate('/generate')} content={uiContent.AIBanner} />
        <FormsToolbar
          content={content}
          total={total}
          query={query}
          setQuery={setQuery}
          status={status}
          setStatus={setStatus}
        />
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
      </WorkspaceLayout>
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
