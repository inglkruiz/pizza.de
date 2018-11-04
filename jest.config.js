module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.module\\.scss': 'identity-obj-proxy',
    '\\.scss': require.resolve('./test/style-mock.js')
  }
}
