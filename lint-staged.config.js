module.exports = {
  linters: {
    'src/**/*.js': ['jest --findRelatedTests'],
    '**/*.+(js|scss|json)': ['prettier --write', 'git add']
  }
}
