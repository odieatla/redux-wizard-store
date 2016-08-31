var path = require('path');
var webpack = require('webpack');
var extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.scss$/,
      loader: extractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')
      // loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
    }]
  },
  plugins: [
    new extractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin()
  ]
};
