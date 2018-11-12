const { rootDir } = require('./jest-common.js')

module.exports = {
  rootDir,
  displayName: 'lint',
  runner: 'jest-runner-eslint',
  testMatch: ['<rootDir>/**/*.js'],
  testPathIgnorePatterns: ['/node_modules/', '/coverage/', '<rootDir>/dist/']
}
