import {
  initialForms,
  initialResponses,
  initialVisits,
  templates,
} from '../../src/content/fixtures';

export const formsApi = {
  list: async () => structuredClone(initialForms),
  templates: async () => structuredClone(templates),
  responses: async () => structuredClone({ responses: initialResponses, visits: initialVisits }),
  create: async (form) => form,
  update: async (form) => form,
  remove: async () => {},
  submit: async (response) => response,
};
