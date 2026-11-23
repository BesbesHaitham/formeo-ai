import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useWorkspace } from '../hooks/useWorkspace';
import FormsPage from '../pages/FormsPage';
import GeneratorPage from '../pages/GeneratorPage';
import TemplatesPage from '../pages/TemplatesPage';
import EditorPage from '../pages/EditorPage';
import PreviewPage from '../pages/PreviewPage';
import ResponsesPage from '../pages/ResponsesPage';
import AuthPage from '../pages/AuthPage';
import PasswordRecoveryPage from '../pages/PasswordRecoveryPage';
import NotFoundTemplate from '../components/templates/NotFoundTemplate';

function RequireAuth() {
  const { user } = useWorkspace();
  const { pathname, search, hash } = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ returnTo: pathname + search + hash }} />
  );
}

export default function AppRoutes() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/templates" element={<TemplatesPage />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<FormsPage />} />
        <Route path="/generate" element={<GeneratorPage />} />
        <Route path="/forms/:id/edit" element={<EditorPage key={location.pathname} />} />
        <Route path="/forms/:id/preview" element={<PreviewPage key={location.pathname} />} />
        <Route path="/responses" element={<ResponsesPage />} />
        <Route path="/responses/:id" element={<ResponsesPage />} />
      </Route>
      <Route path="/f/:id" element={<PreviewPage key={location.pathname} preview={false} />} />
      <Route path="/login" element={<AuthPage key="login" />} />
      <Route path="/signup" element={<AuthPage key="signup" signingUp />} />
      <Route path="/forgot-password" element={<PasswordRecoveryPage />} />
      <Route path="*" element={<NotFoundTemplate message="Page not found" />} />
    </Routes>
  );
}
