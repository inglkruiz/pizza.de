const path = require('path')

module.exports = {
  env: {
    browser: true,
    es6: true,
    jquery: true,
    jest: true
  },
  extends: [
    'standard',
    'plugin:flowtype/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    allowImportExportEverywhere: true
  },
  globals: {
    BUNDLING_PRODUCTION: true
  },
  plugins: ['flowtype', 'react', 'prettier', 'standard'],
  rules: {
    'prettier/prettier': 'error',
    'space-before-function-paren': 0
  },
  settings: {
    react: {
      version: '16.6.0',
      flow: '0.84'
    }
  },
  overrides: [
    {
      files: ['**/__tests__/**'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: path.join(__dirname, './jest.config.js')
          }
        }
      }
    }
  ]
}
