module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended-type-checked', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended', 'prettier'],
  plugins: ['react-refresh', 'react', 'prettier'],
  settings: {
    react: {
      version: 'detect', // Автоматически определяет версию React
    },
  },
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': 'error',
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', 'sass.config.js'],
};
