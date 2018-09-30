const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const InlineSourcePlugin = require('html-webpack-inline-source-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const dist = path.join(__dirname, 'public')
const src = path.join(__dirname, 'src')

const config = {
  mode: process.env.NODE_ENV,
  devtool: isProd ? false : 'cheap-eval-source-map',
  entry: {
    main: path.join(src, 'index.js')
  },
  output: {
    path: dist,
    filename: `[name]${isProd ? '.[chunkhash]' : ''}.js`,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        // set up standard-loader as a preloader
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'standard-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
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
              pretty: !isProd
            }
          }
        ]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {loader: 'html-loader'}
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: !isProd,
        cache: true,
        parallel: true
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
    new CleanWebpackPlugin([dist]),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      filename: path.join(dist, 'index.html'),
      chunksSortMode: 'manual',
      chunks: ['runtime~main', 'vendors', 'main'],
      template: path.join(src, 'index.pug'),
      alwaysWriteToDisk: true,
      inlineSource: 'runtime~.+\\.js|css$',
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
      { from: path.join(src, 'static'), to: dist }
    ]),
    new StyleLintPlugin()/* ,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }) */
  ].concat(
    isProd
      ? [
        new InlineSourcePlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          filename: `[name]${isProd ? '.[chunkhash]' : ''}.css`
        }),
        new CompressionPlugin({
          test: /\.(jsx?|css|html)$/
        })
      ]
      : [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackHarddiskPlugin()
      ]
  ),
  resolve: {
    extensions: ['.js', '.scss'],
    modules: [src, 'node_modules']
  },
  devServer: {
    contentBase: dist,
    hot: !isProd,
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

if (process.env.ANALYZE === 'true') {
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config
