import ResponseDetailsDialog from '../organisms/ResponseDetailsDialog';
import ResponsesToolbar from '../organisms/ResponsesToolbar';
import WorkspaceLayout from './WorkspaceLayout';
import { uiContent } from '../../content/uiContent';
import AnalyticsOverview from '../organisms/AnalyticsOverview';
import ResponsesTable from '../organisms/ResponsesTable';

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
      <WorkspaceLayout
        user={user}
        theme={theme}
        setTheme={setTheme}
        logout={logout}
        onCreate={onCreate}
        className={className}
      >
        <ResponsesToolbar
          content={content}
          form={form}
          forms={forms}
          exportCsv={exportCsv}
          navigate={navigate}
          days={days}
          setDays={setDays}
        />
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
      </WorkspaceLayout>
      {selected && (
        <ResponseDetailsDialog
          content={content}
          selected={selected}
          details={details}
          setSelected={setSelected}
        />
      )}
    </>
  );
}
