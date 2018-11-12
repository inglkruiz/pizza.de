const path = require('path')
const paths = require('../webpack/utils/paths.js')

module.exports = {
  rootDir: path.join(__dirname, '..'),
  // Same as webpack.resolve.modules Array
  moduleDirectories: ['node_modules', paths.src, 'utils', __dirname],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '/__server_tests__/',
    '<rootDir>/dist/'
  ],
  moduleNameMapper: {
    '\\.module\\.scss': 'identity-obj-proxy',
    '\\.scss': require.resolve('./style-mock.js')
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-watch-select-projects'
  ],
  globals: {
    BUNDLING_PRODUCTION: false
  }
}
