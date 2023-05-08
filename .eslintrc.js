module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'sonarjs','simple-import-sort'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:sonarjs/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  root: true,
  globals: {
    Express: true
  },
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'mysql', 'postgres', 'node_modules'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', "ignoreRestSiblings": true }],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          ['builtin', 'external'],
          ['parent', 'sibling', 'index'],
        ],
      },
    ],
    // 'simple-import-sort/imports': 'error',
    // 'simple-import-sort/exports': 'error',
    curly: ['error', 'all'],
    'sort-vars': 'error',
    "sonarjs/cognitive-complexity": ['error', 50],
    "sonarjs/no-duplicate-string": ['error', 10]
  },
};
