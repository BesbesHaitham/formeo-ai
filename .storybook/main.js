import { fileURLToPath } from 'node:url';

export default {
  stories: ['../src/stories/**/*.stories.jsx'],
  addons: ['@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  core: { disableTelemetry: true },
  viteFinal: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: [
        ...['authService', 'googleAuth', 'formsApi', 'aiService'].map((service) => ({
          find: new RegExp(`^.*\\/services/${service}(\\.js)?$`),
          replacement: fileURLToPath(new URL(`./mocks/${service}.js`, import.meta.url)),
        })),
        {
          find: /^.*\/config\/appConfig(\.js)?$/,
          replacement: fileURLToPath(new URL('./mocks/appConfig.js', import.meta.url)),
        },
        ...(Array.isArray(config.resolve?.alias)
          ? config.resolve.alias
          : Object.entries(config.resolve?.alias || {}).map(([find, replacement]) => ({
              find,
              replacement,
            }))),
      ],
    },
  }),
};
