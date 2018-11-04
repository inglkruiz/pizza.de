module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.module\\.scss': 'identity-obj-proxy',
    '\\.scss': require.resolve('./test/style-mock.js')
  },
  coveragePathIgnorePatterns: ['<rootDir>/public/', '<rootDir>/node_modules/'],
  // after Jest is loaded
  setupTestFrameworkScriptFile: require.resolve('./test/setup-tests.js')
}
