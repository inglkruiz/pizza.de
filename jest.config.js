module.exports = {
  ...require('./test/jest-common.js'),
  // after Jest is loaded
  collectCoverageFrom: ['**/src/**/*.js'],
  projects: [
    './test/jest.lint.js',
    './test/jest.client.js',
    './test/jest.server.js'
  ]
}
