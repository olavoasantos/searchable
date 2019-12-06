module.exports = {
  parser: 'babel-eslint',
  plugins: ['@typescript-eslint', 'lodash', 'prettier', 'json'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  globals: {
    shallow: true,
    mount: true,
    render: true,
    google: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        // paths: ['api/packages/env/src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      rules: {
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
      },
    },
  ],
  rules: {
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: 'props',
        varsIgnorePattern: 'props',
      },
    ],
  },
};
