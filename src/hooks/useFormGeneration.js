import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkspace } from './useWorkspace';
import { studentForm } from '../content/fixtures';
import { copyForm } from '../utils/formSchema';
import { generateFormFromPrompt } from '../services/aiService';

export function useFormGeneration() {
  const workspace = useWorkspace();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const request = useRef(null);
  useEffect(() => () => request.current?.abort(), []);

  function open(form) {
    workspace.send({ type: 'add', form });
    navigate(`/forms/${form.id}/edit`);
  }

  async function generate() {
    if (loading || !prompt.trim()) return;

    if (!workspace.aiReady) {
      workspace.setKeyDialog(true);
      setError('Connect Gemini to generate your form, or start with the registration template.');

      return;
    }

    setLoading(true);
    setError('');
    const controller = new AbortController();
    request.current = controller;
    try {
      const form = await generateFormFromPrompt(prompt, workspace.apiKey, controller.signal);

      if (!controller.signal.aborted) open(form);
    } catch (e) {
      if (!controller.signal.aborted) setError(e.message);
    } finally {
      if (request.current === controller) setLoading(false);
    }
  }

  function demo() {
    open({ ...copyForm(studentForm), demo: true });
    workspace.notify('Registration template added. Customize it to fit your needs.');
  }

  return { ...workspace, prompt, setPrompt, loading, error, generate, demo };
}
