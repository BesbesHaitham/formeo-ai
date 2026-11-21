import { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorkspace } from './useWorkspace';
import { createField, uid, publishError } from '../utils/formSchema';
import { choiceTypes } from '../content/fieldTypes';
import { refineFormFromPrompt } from '../services/aiService';
function historyReducer(state, action) {
  if (action.type === 'undo' && state.past.length)
    return {
      past: state.past.slice(0, -1),
      present: state.past.at(-1),
      future: [state.present, ...state.future],
    };
  if (action.type === 'redo' && state.future.length)
    return {
      past: [...state.past, state.present],
      present: state.future[0],
      future: state.future.slice(1),
    };
  if (action.type === 'change')
    return { past: [...state.past.slice(-49), state.present], present: action.form, future: [] };
  return state;
}
export function useFormEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const workspace = useWorkspace();
  const form = workspace.forms.find((f) => f.id === id);
  const [selectedId, setSelectedId] = useState(form?.fields[0]?.id);
  const [history, dispatch] = useReducer(historyReducer, { past: [], present: form, future: [] });
  const [tab, setTab] = useState('questions');
  const [publishOpen, setPublishOpen] = useState(false);
  const [refinePrompt, setRefinePrompt] = useState('');
  const [refineOpen, setRefineVisible] = useState(false);
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const request = useRef(null);
  const proposalBase = useRef(null);
  useEffect(() => () => request.current?.abort(), []);
  function setRefineOpen(open) {
    if (!open) {
      request.current?.abort();
      setLoading(false);
      setProposal(null);
      setError('');
    }
    setRefineVisible(open);
  }
  const selected = form?.fields.find((f) => f.id === selectedId) || form?.fields[0];
  const localUrl = `${window.location.origin}/f/${id}`;
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(localUrl);
      workspace.notify('Form link copied.');
    } catch {
      workspace.notify('Select the link above to copy it.');
    }
  }
  function change(next) {
    dispatch({ type: 'change', form: next });
    workspace.send({ type: 'update', form: next });
  }
  function update(patch) {
    change({ ...form, ...patch });
  }
  function updateField(patch) {
    if (selected)
      update({ fields: form.fields.map((f) => (f.id === selected.id ? { ...f, ...patch } : f)) });
  }
  function addField(
    type = 'text',
    index = selected ? form.fields.indexOf(selected) + 1 : form.fields.length,
  ) {
    if (!form || form.fields.length >= 100) {
      workspace.notify('A form can contain up to 100 questions.');
      return;
    }
    const field = createField(type);
    const fields = [...form.fields];
    fields.splice(Math.max(0, Math.min(index, fields.length)), 0, field);
    update({ fields });
    setSelectedId(field.id);
  }
  function fieldAction(action, fieldId) {
    const index = form.fields.findIndex((f) => f.id === fieldId);
    if (index < 0) return;
    if ((action === 'up' && index === 0) || (action === 'down' && index === form.fields.length - 1))
      return;
    if (action === 'up' || action === 'down') setSelectedId(fieldId);
    const fields = [...form.fields];
    if (action === 'delete') {
      fields.splice(index, 1);
      if (selected?.id === fieldId) setSelectedId(fields[Math.min(index, fields.length - 1)]?.id);
    }
    if (action === 'duplicate') {
      if (fields.length >= 100) return;
      const copy = { ...structuredClone(fields[index]), id: uid() };
      fields.splice(index + 1, 0, copy);
      setSelectedId(copy.id);
    }
    if (action === 'up' && index > 0)
      [fields[index - 1], fields[index]] = [fields[index], fields[index - 1]];
    if (action === 'down' && index < fields.length - 1)
      [fields[index + 1], fields[index]] = [fields[index], fields[index + 1]];
    update({ fields });
  }
  function reorder(from, insertionIndex) {
    const fields = [...form.fields];
    const index = fields.findIndex((f) => f.id === from);
    if (index < 0) return;
    const target = Math.max(
      0,
      Math.min(insertionIndex - (index < insertionIndex ? 1 : 0), fields.length - 1),
    );
    if (index === target) return;
    fields.splice(target, 0, fields.splice(index, 1)[0]);
    update({ fields });
    setSelectedId(from);
  }
  function changeType(type) {
    const defaults = createField(type);
    updateField({
      type,
      options: choiceTypes.includes(type)
        ? selected.options.length
          ? selected.options
          : defaults.options
        : [],
    });
  }
  function travel(type) {
    const next = type === 'undo' ? history.past.at(-1) : history.future[0];
    if (next) {
      dispatch({ type });
      workspace.send({ type: 'update', form: next });
    }
  }
  async function refine() {
    if (loading || !refinePrompt.trim()) return;
    const controller = new AbortController();
    request.current = controller;
    proposalBase.current = form;
    setLoading(true);
    setError('');
    try {
      const updated = await refineFormFromPrompt(
        form,
        refinePrompt,
        workspace.apiKey,
        controller.signal,
      );
      if (!controller.signal.aborted) setProposal(updated);
    } catch (e) {
      if (!controller.signal.aborted) setError(e.message);
    } finally {
      if (request.current === controller) setLoading(false);
    }
  }
  return {
    ...workspace,
    form,
    localUrl,
    copyLink,
    openForm: () => window.open(localUrl, '_blank', 'noopener,noreferrer'),
    selected,
    selectedId: selected?.id,
    setSelectedId,
    tab,
    setTab,
    update,
    updateField,
    addField,
    fieldAction,
    reorder,
    changeType,
    undo: () => travel('undo'),
    redo: () => travel('redo'),
    canUndo: !!history.past.length,
    canRedo: !!history.future.length,
    publishOpen,
    setPublishOpen,
    publish: () => {
      const problem = publishError(form);
      if (problem) {
        workspace.notify(problem);
        return;
      }
      update({ status: 'published' });
      setPublishOpen(true);
    },
    preview: () => navigate(`/forms/${id}/preview`),
    refinePrompt,
    setRefinePrompt,
    refineOpen,
    setRefineOpen,
    proposal,
    loading,
    error,
    refine,
    applyProposal: () => {
      if (form !== proposalBase.current) {
        setError(
          'Your form changed while AI was working. Discard this proposal and generate a fresh revision.',
        );
        return;
      }
      change(proposal);
      setProposal(null);
      setRefineOpen(false);
      workspace.notify('AI changes applied.');
    },
    discardProposal: () => setProposal(null),
  };
}
