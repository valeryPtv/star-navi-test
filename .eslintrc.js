module.exports = {
  extends: ['airbnb', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  env: {
    node: true,
    es6: true
  },
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'react/state-in-constructor': ['error', 'never'],
    'space-before-function-paren': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    // 'quotes': [2, 'single', 'avoid-escape'],
    experimentalDecorators: 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'global-require': 'off',
    'consistent-return': 'off',
    'react/destructuring-assignment': 'off',
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 1,
    'no-use-before-define': [
      'error',
      { functions: true, classes: true, variables: false }
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/interactive-supports-focus': 'off'
  },
  plugins: [
    'react-hooks'
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src']
      }
    }
  },
  parser: 'babel-eslint'
};
