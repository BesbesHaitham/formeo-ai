import { useNavigate } from 'react-router-dom';
import { useWorkspace } from './useWorkspace';
import { createForm, copyForm } from '../utils/formSchema';

/** Shared creation behavior for dashboards, templates and response pages. */
export function useFormActions() {
  const workspace = useWorkspace();
  const navigate = useNavigate();
  function create(template) {
    const form = template ? copyForm(template) : createForm();
    workspace.send({ type: 'add', form });
    navigate(`/forms/${form.id}/edit`);
    return form;
  }
  return { ...workspace, navigate, create };
}
