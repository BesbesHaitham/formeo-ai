import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'storybook-static', 'test-results', 'playwright-report']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: '*', next: ['function', 'export', 'return', 'if'] },
        { blankLine: 'always', prev: ['function', 'if'], next: '*' },
      ],
    },
  },
  {
    files: ['src/components/{atoms,molecules,organisms,templates}/**/*.jsx', 'src/pages/**/*.jsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'JSXAttribute[name.name="style"]',
          message: 'Keep presentation in CSS modules; use CSS custom properties for runtime data.',
        },
        {
          selector: 'JSXText[value=/\\S/]',
          message: 'Read UI text from the component content contract in src/content/uiContent.js.',
        },
        {
          selector:
            'JSXAttribute[name.name=/^(label|title|placeholder|message|aria-label)$/] > Literal[value=/\\S/]',
          message: 'Read user-facing labels and messages from src/content/uiContent.js.',
        },
      ],
    },
  },
  {
    files: ['src/components/templates/**/*.jsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '(^|/)(atoms|molecules)/.*(?<!\\.css)$',
              message: 'Templates assemble organisms and shared template layouts.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/components/organisms/**/*.jsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '(^|/)(atoms|organisms|templates)/.*(?<!\\.css)$|^\\./(?!.*\\.css$)',
              message:
                'Organisms compose molecules. Move smaller controls into src/components/molecules.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/components/molecules/**/*.jsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '(^|/)(molecules|organisms|templates)/.*(?<!\\.css)$|^\\./(?!.*\\.css$)',
              message:
                'Molecules compose atoms. Keep component imports inside src/components/atoms.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['*.config.js', 'scripts/**/*.js', 'server/**/*.js'],
    languageOptions: { globals: globals.node },
  },
]);
