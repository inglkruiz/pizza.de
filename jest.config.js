const paths = require('./webpack/utils/paths.js')

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  // Same as webpack.resolve.modules Array
  moduleDirectories: ['node_modules', paths.src],
  moduleNameMapper: {
    '\\.module\\.scss': 'identity-obj-proxy',
    '\\.scss': require.resolve('./test/style-mock.js')
  },
  coveragePathIgnorePatterns: ['<rootDir>/public/', '<rootDir>/node_modules/'],
  // after Jest is loaded
  setupTestFrameworkScriptFile: require.resolve('./test/setup-tests.js'),
  collectCoverageFrom: ['**/src/**/*.js']
}
