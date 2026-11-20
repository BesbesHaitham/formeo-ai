import { useState } from 'react';
import { useFormActions } from './useFormActions.js';
import { copyForm, publishError } from '../utils/formSchema.js';
export function useForms() {
  const workspace = useFormActions();
  const { navigate, create } = workspace;
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [dialog, setDialog] = useState(null);
  const forms = workspace.forms.filter(
    (form) =>
      form.title.toLowerCase().includes(query.toLowerCase()) &&
      (status === 'all' || form.status === status),
  );
  function action(name, form) {
    if (name === 'edit') navigate(`/forms/${form.id}/edit`);
    if (name === 'preview') navigate(`/forms/${form.id}/preview`);
    if (name === 'responses') navigate(`/responses/${form.id}`);
    if (name === 'duplicate') {
      const copy = copyForm(form, `${form.title} (copy)`);
      workspace.send({ type: 'add', form: copy });
      workspace.notify('Form duplicated.');
    }
    if (name === 'publish') {
      const problem = form.status === 'draft' ? publishError(form) : '';
      if (problem) {
        workspace.notify(problem);
        return;
      }
      workspace.send({
        type: 'update',
        form: { ...form, status: form.status === 'published' ? 'draft' : 'published' },
      });
      workspace.notify(
        form.status === 'published' ? 'Form unpublished.' : 'Published for this browser.',
      );
    }
    if (['delete', 'rename'].includes(name)) setDialog({ type: name, form });
  }
  function confirm(value) {
    if (dialog.type === 'delete') workspace.send({ type: 'delete', id: dialog.form.id });
    else if (value.trim())
      workspace.send({ type: 'update', form: { ...dialog.form, title: value.trim() } });
    setDialog(null);
  }
  return {
    ...workspace,
    forms,
    total: workspace.forms.length,
    query,
    setQuery,
    status,
    setStatus,
    dialog,
    setDialog,
    create,
    action,
    confirm,
    navigate,
  };
}
