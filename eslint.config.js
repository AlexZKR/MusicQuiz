import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import react from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import jestPlugin from 'eslint-plugin-jest';
import prettier from 'eslint-plugin-prettier';

export default tsEslint.config(
  // Global ignore
  { ignores: ['dist', 'build', 'coverage'] },

  // Base JavaScript + TS rules
  eslint.configs.recommended,
  tsEslint.configs.recommended,

  // React-specific rules
  react.configs.recommended,
  react.configs['jsx-runtime'],
  reactHooks.configs.recommended,
  reactRefresh.configs.vite,

  // Jest rules for test files
  {
    files: ['**/*.test.{ts,tsx}', '**/__tests__/*.{ts,tsx}'],
    plugins: { jest: jestPlugin },
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
    languageOptions: {
      globals: { jest: 'readonly', describe: 'readonly', it: 'readonly' },
    },
  },

  // Integrate Prettier
  prettier.configs.recommended
);
