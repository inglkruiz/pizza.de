const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const InlineSourcePlugin = require('html-webpack-inline-source-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const commonConfig = require('./common.config')
const paths = require('./utils/paths')

const config = {
  output: {
    filename: '[name].[contenthash].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        'core-js': {
          test: /[\\/]node_modules[\\/]core-js/,
          name: 'core-js',
          chunks: 'initial',
          priority: -9
        },
        vendors: {
          test: /[\\/]node_modules[\\/](?!core-js)/,
          name: 'vendors',
          chunks: 'all',
          priority: -10
        }
      }
    },
    runtimeChunk: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        cache: false,
        parallel: true,
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          autoprefixer: false,
          discardComments: {
            removeAll: true
          }
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin([paths.dist], { root: paths.context }),
    new InlineSourcePlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 15,
      minChunkSize: 10000
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      filename: '[name].[contenthash].css'
    }),
    new CompressionPlugin({
      test: /\.(jsx?|css|html)$/
    })
  ]
}

module.exports = webpackMerge(commonConfig, config)
