const webpackMerge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const prodAppsConfig = require('./prod.config')

let analyzerPort = 8887

module.exports = prodAppsConfig.map(appConfig => {
  analyzerPort += 1
  return webpackMerge(appConfig, {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerPort
      })
    ]
  })
})
