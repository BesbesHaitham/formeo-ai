import { appConfig } from '../config/appConfig.js';
import { validStoredForm } from '../utils/formSchema.js';
export function readWorkspace() {
  try {
    const raw = localStorage.getItem(appConfig.storageKey);
    if (raw === null) return null;
    const data = JSON.parse(raw);
    if (
      !Array.isArray(data.forms) ||
      !data.forms.every(validStoredForm) ||
      !Array.isArray(data.responses) ||
      !Array.isArray(data.visits)
    )
      return null;
    if (
      !data.responses.every(
        (r) =>
          r &&
          typeof r.id === 'string' &&
          typeof r.formId === 'string' &&
          r.answers &&
          typeof r.answers === 'object' &&
          !Array.isArray(r.answers) &&
          typeof r.submittedAt === 'string' &&
          Number.isFinite(Date.parse(r.submittedAt)) &&
          (r.fieldSnapshot === undefined ||
            (Array.isArray(r.fieldSnapshot) &&
              r.fieldSnapshot.every(
                (f) => f && typeof f.id === 'string' && typeof f.label === 'string',
              ))),
      ) ||
      !data.visits.every(
        (v) =>
          v &&
          typeof v.id === 'string' &&
          typeof v.formId === 'string' &&
          typeof v.startedAt === 'string',
      )
    )
      return null;
    return data;
  } catch {
    return null;
  }
}
export function saveWorkspace(data) {
  try {
    localStorage.setItem(appConfig.storageKey, JSON.stringify(data));
    return '';
  } catch {
    return 'Your browser could not save these changes. Free some storage before leaving this page.';
  }
}
