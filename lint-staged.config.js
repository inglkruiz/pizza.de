module.exports = {
  linters: {
    'src/**/*.js': ['eslint'],
    '**/*.+(js|scss|json)': ['prettier --write', 'git add']
  }
}
