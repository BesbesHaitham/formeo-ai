export const appConfig = {
  model: 'gemini-2.5-flash',
  apiBase: import.meta.env?.VITE_API_BASE_URL || '/api',
  useMock: import.meta.env?.VITE_USE_MOCK_API === 'true',
  storageKey: 'formeo.workspace.v1',
};

export const formDefaults = {
  title: 'Untitled form',
  description: 'A few questions to get to know you better.',
  status: 'draft',
  color: '#5b43e7',
};
