module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  rules: {
    'no-plusplus': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'max-len': ['error', { code: 1000 }],

    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: false,
      },
    ],
    'max-len': 'off',
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': 'off',
  },

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],

  extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/typescript'],
};
