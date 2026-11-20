import '../src/index.css';
import { MemoryRouter } from 'react-router-dom';
export default {
  globalTypes: {
    theme: { description: 'Theme', toolbar: { icon: 'paintbrush', items: ['light', 'dark'] } },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => (
      <MemoryRouter>
        <div
          data-theme={context.globals.theme}
          style={{ padding: 24, color: 'var(--text)', background: 'var(--bg)', minHeight: '100vh' }}
        >
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'todo' },
  },
};
