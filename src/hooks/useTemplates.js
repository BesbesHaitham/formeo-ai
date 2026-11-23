import { useEffect, useState } from 'react';
import { templates } from '../content/fixtures';
import { useFormActions } from './useFormActions';
import { templateCategories } from '../content/navigation';
import { appConfig } from '../config/appConfig';
import { formsApi } from '../services/formsApi';
import { validStoredForm } from '../utils/formSchema';

export function useTemplates() {
  const forms = useFormActions();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(templateCategories[0]);
  const [catalog, setCatalog] = useState(templates);
  useEffect(() => {
    if (!appConfig.useMock) return;

    let active = true;
    formsApi
      .templates()
      .then((data) => {
        if (active && Array.isArray(data) && data.every(validStoredForm)) setCatalog(data);
      })
      .catch(() => {
        /* Bundled templates remain available offline. */
      });

    return () => {
      active = false;
    };
  }, []);

  return {
    ...forms,
    query,
    setQuery,
    category,
    setCategory,
    templates: catalog.filter(
      (f) =>
        (category === templateCategories[0] || f.category === category) &&
        f.title.toLowerCase().includes(query.toLowerCase()),
    ),
  };
}
