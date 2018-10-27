const path = require('path')
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
const htmlPlugin = require('./helpers/htmlPlugin')
const apps = require('./apps')

function getConfig(app) {
  return webpackMerge(commonConfig, {
    entry: {
      [app]: path.join(paths.app, `${app}/index.js`)
    },
    output: {
      filename: '[name]/main.[contenthash].js',
      chunkFilename: `${app}/[name]/main.[contenthash].js`
    },
    optimization: {
      splitChunks: {
        maxInitialRequests: Infinity,
        cacheGroups: {
          default: false,
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
      runtimeChunk: {
        name: () => {
          return `${app}/runtime`
        }
      },
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
      htmlPlugin(app),
      new InlineSourcePlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 15,
        minChunkSize: 10000
      }),
      new MiniCssExtractPlugin({
        chunkFilename: `${app}/[name]/main.[contenthash].css`
      }),
      new CompressionPlugin({
        test: /\.(jsx?|css|html)$/
      })
    ]
  })
}

module.exports = apps.map(app => getConfig(app))
