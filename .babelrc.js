const isTest = String(process.env.NODE_ENV) === 'test'
const isDev = String(process.env.NODE_ENV) === 'development'

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: isTest ? 'commonjs' : false,
        useBuiltIns: 'entry' // 'usage|entry'
      }
    ],
    [
      '@babel/preset-react',
      {
        development: isDev
      }
    ],
    '@babel/preset-flow'
  ],
  plugins: [
    '@babel/plugin-transform-react-constant-elements',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    'react-loadable/babel'
  ].concat(
    isDev
      ? ['react-hot-loader/babel']
      : [
          [
            'transform-react-remove-prop-types',
            {
              mode: 'remove',
              removeImport: true
            }
          ]
        ]
  ),
  retainLines: true
}
