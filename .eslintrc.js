// eslint-disable-next-line
const fs = require('fs');
// eslint-disable-next-line
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'plugin:react/recommended',
  ],
  env: {
    jest: true,
    browser: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'jsx-a11y', 'import', 'prettier', 'react-hooks'],
  root: true,
  rules: {
    'no-unused-expressions': 0,
    'prettier/prettier': ['warn', prettierOptions],
    'class-methods-use-this': 0,
    camelcase: 0,
    'default-case': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'import/extensions': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    // indent: [
    //   2,
    //   2,
    //   {
    //     SwitchCase: 1,
    //   },
    // ],
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/accessible-emoji': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-use-before-define': 0,
    'prefer-template': 2,
    'react/destructuring-assignment': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 0,
    'react/jsx-closing-tag-location': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-filename-extension': 0,
    'react/jsx-no-target-blank': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 'warn',
    'react/jsx-uses-vars': 2,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/sort-comp': 0,
    'require-yield': 0,
  },
};
