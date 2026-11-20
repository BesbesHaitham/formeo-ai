import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorkspace } from './useWorkspace';
import { uid, validateAnswer } from '../utils/formSchema';
export function useRespondent({ preview = false } = {}) {
  const { id } = useParams();
  const workspace = useWorkspace();
  const navigate = useNavigate();
  const form = workspace.forms.find((f) => f.id === id);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [complete, setComplete] = useState(false);
  const session = useRef(null);
  const submitted = useRef(false);
  const { send } = workspace;
  const available = !!form && form.status === 'published' && form.fields.length > 0;
  const field = form?.fields[index];
  const start = useCallback(() => {
    if (!preview && !session.current) {
      session.current = { id: uid(), startedAt: Date.now() };
      send({
        type: 'visit',
        visit: {
          id: session.current.id,
          formId: id,
          startedAt: new Date().toISOString(),
          completed: false,
        },
      });
    }
  }, [preview, id, send]);
  useEffect(() => {
    if (available) start();
  }, [available, start]);
  function change(value) {
    start();
    setAnswers({ ...answers, [field.id]: value });
    setError('');
  }
  function next() {
    if (!field || complete || submitted.current) return;
    start();
    const message = validateAnswer(field, answers[field.id]);
    setError(message);
    if (message) return;
    if (index < form.fields.length - 1) {
      setIndex(index + 1);
      return;
    }
    const invalidIndex = form.fields.findIndex((question) =>
      validateAnswer(question, answers[question.id]),
    );
    if (invalidIndex >= 0) {
      setIndex(invalidIndex);
      setError(validateAnswer(form.fields[invalidIndex], answers[form.fields[invalidIndex].id]));
      return;
    }
    submitted.current = true;
    if (!preview)
      workspace.send({
        type: 'submit',
        visitId: session.current.id,
        response: {
          id: uid(),
          formId: id,
          answers,
          fieldSnapshot: form.fields.map(({ id: fieldId, label }) => ({ id: fieldId, label })),
          submittedAt: new Date().toISOString(),
          duration: Math.round((Date.now() - session.current.startedAt) / 1000),
        },
      });
    setComplete(true);
  }
  return {
    form,
    field,
    index,
    answers,
    error,
    complete,
    preview,
    saveError: workspace.saveError,
    next,
    change,
    back: () => {
      setIndex(Math.max(0, index - 1));
      setError('');
    },
    exit: () => navigate(`/forms/${id}/edit`),
    restart: () => {
      setIndex(0);
      setAnswers({});
      setError('');
      setComplete(false);
      session.current = null;
      submitted.current = false;
    },
  };
}
