import { appConfig } from '../config/appConfig.js';
export async function request(path, options = {}) {
  const response = await fetch(`${appConfig.apiBase}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(4000),
  });
  if (!response.ok) throw new Error(`Mock service returned ${response.status}`);
  return response.status === 204 ? null : response.json();
}
export const formsApi = {
  list: () => request('/forms'),
  read: (id) => request(`/forms/${id}`),
  create: (form) => request('/forms', { method: 'POST', body: JSON.stringify(form) }),
  update: (form) => request(`/forms/${form.id}`, { method: 'PUT', body: JSON.stringify(form) }),
  remove: (id) => request(`/forms/${id}`, { method: 'DELETE' }),
  templates: () => request('/templates'),
  responses: (id) => request(`/forms/${id}/responses`),
  submit: (response) =>
    request(`/forms/${response.formId}/responses`, {
      method: 'POST',
      body: JSON.stringify(response),
    }),
};
