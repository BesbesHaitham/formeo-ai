import { uiContent } from '../content/uiContent';
import { useState } from 'react';
import { useFormResponses } from '../hooks/useFormResponses';
import { useFormActions } from '../hooks/useFormActions';
import ResponsesTemplate from '../components/templates/ResponsesTemplate';
import NotFoundTemplate from '../components/templates/NotFoundTemplate';

export default function ResponsesPage({ content = uiContent.ResponsesPage } = {}) {
  const [showAll, setShowAll] = useState(false);
  const responses = useFormResponses();
  const { create } = useFormActions();

  return responses.form ? (
    <ResponsesTemplate
      {...responses}
      showAll={showAll}
      setShowAll={setShowAll}
      onCreate={() => create()}
    />
  ) : (
    <NotFoundTemplate message={content.empty} />
  );
}
