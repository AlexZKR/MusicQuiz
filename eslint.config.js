import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jestPlugin from 'eslint-plugin-jest';
import { fixupPluginRules } from '@eslint/compat';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // Global ignores
  {
    ignores: ['**/node_modules/', '**/dist/', '**/build/', '**/coverage/'],
  },

  // Base JS rules
  eslint.configs.recommended,

  // TypeScript rules
  ...tsEslint.configs.recommended,

  // React rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // React Hooks rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': fixupPluginRules(reactHooks),
    },
    rules: reactHooks.configs.recommended.rules,
  },

  // Jest rules for test files
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/__tests__/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      'jest/expect-expect': [
        'warn',
        {
          assertFunctionNames: [
            'expect',
            'assertQuizRunnerHappyPath',
            'assertQuizResultScreenHappyPath',
          ],
        },
      ],
    },
  },

  // Node.js environment for config files
  {
    files: ['**/*.config.{js,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Prettier config (must come last)
  prettierConfig,
];
