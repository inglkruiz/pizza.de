const webpackMerge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const prodConfig = require('./prod.config')

module.exports = webpackMerge(prodConfig, {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
})
