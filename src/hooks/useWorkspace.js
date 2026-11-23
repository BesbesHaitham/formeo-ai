import { useContext } from 'react';
import { WorkspaceContext } from '../store/WorkspaceContext.js';

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) throw new Error('WorkspaceProvider required');

  return context;
}
