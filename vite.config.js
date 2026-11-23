import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { aiMiddleware } from './server/aiMiddleware.js';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const proxy = {
    '/api': { target: env.VITE_API_PROXY_TARGET || 'http://127.0.0.1:8081', changeOrigin: true },
  };
  const ai = {
    name: 'local-gemini',
    configureServer: (server) => {
      if (env.VITE_USE_MOCK_API !== 'true')
        server.middlewares.use(aiMiddleware(env.GEMINI_API_KEY, env.GEMINI_MODEL));
    },
    configurePreviewServer: (server) => {
      if (env.VITE_USE_MOCK_API !== 'true')
        server.middlewares.use(aiMiddleware(env.GEMINI_API_KEY, env.GEMINI_MODEL));
    },
  };

  return {
    plugins: [react(), ai],
    define: {
      'import.meta.env.VITE_GEMINI_MODEL': JSON.stringify(
        env.GEMINI_MODEL || 'gemini-3.5-flash',
      ),
      'import.meta.env.VITE_AI_PROXY_ENABLED': JSON.stringify(
        String(!!env.GEMINI_API_KEY || env.VITE_USE_MOCK_API === 'true'),
      ),
    },
    server: { proxy },
    preview: { proxy },
  };
});
