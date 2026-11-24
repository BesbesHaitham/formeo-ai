import '../src/index.css';
import { MemoryRouter } from 'react-router-dom';
import { useGlobals } from 'storybook/preview-api';
import StoryWorkspace from './StoryWorkspace';
import ThemeFrame from './ThemeFrame';

export default {
  globalTypes: {
    theme: { description: 'Theme', toolbar: { icon: 'paintbrush', items: ['light', 'dark'] } },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    function PreviewDecorator(Story, context) {
      const [, updateGlobals] = useGlobals();

      return (
        <MemoryRouter key={context.id} initialEntries={[context.parameters.route || '/']}>
          <ThemeFrame
            theme={context.globals.theme}
            fullscreen={context.parameters.layout === 'fullscreen'}
          >
            {context.parameters.workspace ? (
              <StoryWorkspace
                key={context.id}
                workspace={context.parameters.workspace}
                theme={context.globals.theme}
                setTheme={(theme) => updateGlobals({ theme })}
              >
                <Story />
              </StoryWorkspace>
            ) : (
              <Story />
            )}
          </ThemeFrame>
        </MemoryRouter>
      );
    },
  ],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    options: { storySort: { order: ['Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages'] } },
    a11y: { test: 'todo' },
  },
};
