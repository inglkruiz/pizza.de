const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const paths = require('./utils/paths')

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

const config = {
  context: paths.context,
  entry: {
    'pizza.de': path.join(paths.app, 'pizza.de/index.js')
  },
  output: {
    path: paths.dist,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        // set up standard-loader as a preloader
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'standard-loader',
        include: [paths.src]
      },
      {
        test: /\.jsx?$/,
        include: [paths.src],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          isProd
            ? MiniCssExtractPlugin.loader
            : { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: isDev
            }
          }
        ]
      },
      {
        test: /\.html$/,
        include: [paths.src],
        use: { loader: 'html-loader' }
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      filename: path.join(paths.dist, 'pizza.de/index.html'),
      chunksSortMode: 'manual',
      chunks: ['pizza.de/runtime', 'core-js', 'vendors', 'pizza.de'],
      template: path.join(paths.app, 'pizza.de/index.pug'),
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
    }),
    new CopyWebpackPlugin([
      { from: path.join(paths.src, 'static'), to: paths.dist }
    ]),
    new StyleLintPlugin({
      syntax: 'scss'
    }),
    new webpack.DefinePlugin({
      BUNDLING_PRODUCTION: JSON.stringify(isProd)
    })/* ,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }) */
  ],
  resolve: {
    extensions: ['.js', '.scss'],
    modules: [paths.src, 'node_modules']
  }
}

module.exports = config
