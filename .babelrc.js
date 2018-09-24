module.exports = {
  'env': {
    'production': {
      'plugins': [
        ['transform-react-remove-prop-types', {
          'mode': 'remove',
          'removeImport': true
        }]
      ]
    },
    'development': {
      'plugins': [
        'react-hot-loader/babel'
      ]
    }
  },
  'presets': [
    ['@babel/preset-env', {
      'modules': false,
      'useBuiltIns': 'entry'
    }],
    ['@babel/preset-react', {
      development: process.env.NODE_ENV === 'development'
    }]
  ],
  'plugins': [
    '@babel/plugin-transform-react-constant-elements',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ]
}
