export const appConfig = {
  model: import.meta.env?.VITE_GEMINI_MODEL || 'gemini-3.5-flash',
  apiBase: import.meta.env?.VITE_API_BASE_URL || '/api',
  useMock: import.meta.env?.VITE_USE_MOCK_API === 'true',
  firebaseAuthDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || '',
  firebaseProjectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || '',
  firebaseApiKey: import.meta.env?.VITE_FIREBASE_API_KEY || '',
  firebaseStorageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || '',
  firebaseMessagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  firebaseAppId: import.meta.env?.VITE_FIREBASE_APP_ID || '',
  aiProxy: import.meta.env?.VITE_AI_PROXY_ENABLED === 'true',
  storageKey: 'formeo.workspace.v1',
};

export const formDefaults = {
  title: 'Untitled form',
  description: 'A few questions to get to know you better.',
  status: 'draft',
  color: '#5b43e7',
};
