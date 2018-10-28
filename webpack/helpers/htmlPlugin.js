const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('../utils/paths')

module.exports = function htmlPlugin(name) {
  return new HtmlWebpackPlugin({
    filename: path.join(paths.dist, `${name}/index.html`),
    chunksSortMode: 'manual',
    chunks: [`${name}/runtime`, 'core-js', 'vendors', name],
    template: path.join(paths.app, `${name}/index.pug`),
    alwaysWriteToDisk: true,
    inlineSource: 'runtime/.*.js|css$',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    }
  })
}
