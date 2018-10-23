module.exports = {
  'presets': [
    ['@babel/preset-env', {
      'modules': false,
      'useBuiltIns': 'entry' // 'usage|entry'
    }],
    ['@babel/preset-react', {
      development: process.env.NODE_ENV === 'development'
    }],
    '@babel/preset-flow'
  ],
  'plugins': [
    '@babel/plugin-transform-react-constant-elements',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    'react-loadable/babel'
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
