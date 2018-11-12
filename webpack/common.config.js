const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const paths = require('./utils/paths')

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

const config = {
  context: paths.context,
  output: {
    path: paths.dist,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        // set up eslint-loader as a preloader
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
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
        test: /\.module\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { modules: true, camelCase: true }
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : { loader: 'style-loader' },
          {
            loader: 'css-loader'
          },
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
    new CopyWebpackPlugin([
      { from: path.join(paths.src, 'static'), to: paths.dist }
    ]),
    new StyleLintPlugin({
      syntax: 'scss'
    }),
    new webpack.DefinePlugin({
      BUNDLING_PRODUCTION: JSON.stringify(isProd)
    }) /* ,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }) */
  ],
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules', paths.src, 'utils']
  }
}

module.exports = config
