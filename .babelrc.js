module.exports = {
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
  ].concat(
    process.env.NODE_ENV === 'development'
    ? [
      'react-hot-loader/babel'
    ]
    : [
        ['transform-react-remove-prop-types', {
          'mode': 'remove',
          'removeImport': true
        }]
    ]
  )
}
