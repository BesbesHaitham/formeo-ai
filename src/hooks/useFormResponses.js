import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWorkspace } from './useWorkspace';
import { getAnalytics, exportCsv, responseDetails } from '../utils/analytics';
export function useFormResponses() {
  const workspace = useWorkspace();
  const { id } = useParams();
  const navigate = useNavigate();
  const [days, setDays] = useState(7);
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const form =
    workspace.forms.find((f) => f.id === id) ||
    (!id
      ? workspace.forms.find((f) => workspace.responses.some((r) => r.formId === f.id)) ||
        workspace.forms[0]
      : null);
  const responses = workspace.responses.filter((r) => r.formId === form?.id);
  const visits = workspace.visits.filter((v) => v.formId === form?.id);
  const analytics = getAnalytics(responses, visits, days);
  return {
    ...workspace,
    form,
    analytics,
    days,
    setDays,
    selected,
    details: selected && form ? responseDetails(selected, form) : [],
    setSelected,
    showAll,
    setShowAll,
    navigate,
    exportCsv: () => exportCsv(form, analytics.responses),
  };
}
