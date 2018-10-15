const path = require('path')
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const commonConfig = require('./common.config')
const paths = require('./utils/paths')

const config = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: '[name]/main.js',
    chunkFilename: 'pizza.de/[name]/main.js'
  },
  plugins: [
    new CleanWebpackPlugin([paths.dist], { root: paths.context, exclude: ['dll'] }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.DllReferencePlugin({
      context: paths.context,
      manifest: require(path.join(paths.dll, 'core-manifest.json'))
    }),
    new webpack.DllReferencePlugin({
      context: paths.context,
      manifest: require(path.join(paths.dll, 'react-manifest.json'))
    }),
    new webpack.DllReferencePlugin({
      context: paths.context,
      manifest: require(path.join(paths.dll, 'reactRouter-manifest.json'))
    }),
    new webpack.DllReferencePlugin({
      context: paths.context,
      manifest: require(path.join(paths.dll, 'reactLoadable-manifest.json'))
    }),
    new webpack.DllReferencePlugin({
      context: paths.context,
      manifest: require(path.join(paths.dll, 'mobx-manifest.json'))
    })
  ],
  devServer: {
    contentBase: paths.dist,
    hot: true,
    open: true,
    port: 9000,
    openPage: 'pizza.de/restaurants/',
    historyApiFallback: {
      rewrites: [
        // { from: /.*\/?/i, to: 'index.html' }
        { from: /^\/pizza.de\/.*\/?/i, to: '/pizza.de/index.html' }
      ]
    }
  },
  watchOptions: {
    ignored: /node_modules/
  }
}

module.exports = webpackMerge(commonConfig, config)
