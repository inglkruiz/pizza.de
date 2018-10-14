const path = require('path')
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const commonConfig = require('./common.config')
const paths = require('./utils/paths')

const config = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    filename: '[name].js'
  },
  plugins: [
    new CleanWebpackPlugin([paths.dist], { root: paths.context, exclude: ['dll'] }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.DllReferencePlugin({
      context: paths.context,
      manifest: require(path.join(paths.dll, 'vendors-manifest.json'))
    })
  ],
  devServer: {
    contentBase: paths.dist,
    hot: true,
    open: true,
    port: 9000,
    openPage: 'restaurants/',
    historyApiFallback: {
      rewrites: [
        { from: /.*\/?/i, to: 'index.html' }
      ]
    }
  },
  watchOptions: {
    ignored: /node_modules/
  }
}

module.exports = webpackMerge(commonConfig, config)
