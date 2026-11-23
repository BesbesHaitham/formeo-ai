import { BrowserRouter } from 'react-router-dom';
import WorkspaceProvider from './store/WorkspaceProvider';
import AppRoutes from './routes/AppRoutes';
import GlobalFeedback from './components/templates/GlobalFeedback';
import { useWorkspace } from './hooks/useWorkspace';

function AppContent() {
  const workspace = useWorkspace();

  return (
    <>
      <a className="skipLink" href="#main-content">
        Skip to content
      </a>
      <AppRoutes />
      <GlobalFeedback {...workspace} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <WorkspaceProvider>
        <AppContent />
      </WorkspaceProvider>
    </BrowserRouter>
  );
}
