import { useFormResponses } from '../hooks/useFormResponses';
import { useFormActions } from '../hooks/useFormActions';
import ResponsesTemplate from '../components/templates/ResponsesTemplate';
import NotFoundTemplate from '../components/templates/NotFoundTemplate';
export default function ResponsesPage() {
  const responses = useFormResponses();
  const { create } = useFormActions();
  return responses.form ? (
    <ResponsesTemplate {...responses} onCreate={() => create()} />
  ) : (
    <NotFoundTemplate message="Create a form to start collecting responses" />
  );
}
