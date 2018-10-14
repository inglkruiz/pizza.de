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
    vendors: [ '@babel/polyfill', 'whatwg-fetch', 'react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react', 'react-loadable', 'prop-types' ]
  },
  output: {
    path: dll,
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new CleanWebpackPlugin([dist], { root: context }),
    new webpack.DllPlugin({
      path: path.join(dll, '[name]-manifest.json'),
      name: '[name]'
    })
  ]
}
