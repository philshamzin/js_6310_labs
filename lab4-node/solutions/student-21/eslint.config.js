import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021
      }
    },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'indent': [
        'error',
        2,
        {
          'SwitchCase': 1,
          'FunctionDeclaration': {
            'parameters': 'first'
          },
          'MemberExpression': 2
        }
      ],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always']
    }
  }
];
