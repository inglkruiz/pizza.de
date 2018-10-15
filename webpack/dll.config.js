const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { dll, context, dist } = require('./utils/paths')

module.exports = {
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules']
  },
  entry: {
    core: ['@babel/polyfill', 'whatwg-fetch'],
    react: ['react', 'react-dom', 'prop-types'],
    reactRouter: ['react-router-dom'],
    reactLoadable: ['react-loadable'],
    mobx: ['mobx', 'mobx-react']
  },
  output: {
    path: dll,
    filename: '[name].dll.js',
    library: '[name]_[hash]'
  },
  plugins: [
    new CleanWebpackPlugin([dist], { root: context }),
    new webpack.DllPlugin({
      path: path.join(dll, '[name]-manifest.json'),
      name: '[name]_[hash]'
    })
  ]
}
