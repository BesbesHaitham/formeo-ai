import { uiContent } from '../content/uiContent';
import { useState } from 'react';
import { useRespondent } from '../hooks/useRespondent';
import FormPreviewTemplate from '../components/templates/FormPreviewTemplate';
import NotFoundTemplate from '../components/templates/NotFoundTemplate';

export default function PreviewPage({ content = uiContent.PreviewPage, preview = true }) {
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const respondent = useRespondent({ preview });

  if (!respondent.form || (!preview && respondent.form.status !== 'published'))
    return <NotFoundTemplate message={content.unavailable} />;

  if (!respondent.form.fields.length) return <NotFoundTemplate message={content.emptyForm} />;

  return (
    <FormPreviewTemplate
      {...respondent}
      previewDevice={previewDevice}
      setPreviewDevice={setPreviewDevice}
    />
  );
}
