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
    }, {
			test: /\.ico$/,
			exclude: /node_modules/,
			loader: 'file-loader?name=[name].[ext]'
		}, {
			test: /\.svg/,
			loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]'
		}, {
			test: /\.woff/,
			loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]'
		}, {
			test: /\.woff2/,
			loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]'
		}, {
			test: /\.[ot]tf/,
			loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
		}, {
			test: /\.eot/,
			loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]'
		}]
  },
	sassLoader: {
		includePaths: [
			path.resolve(__dirname, 'src/stylesheets'),
			path.resolve(__dirname, "./node_modules/compass-mixins/lib")
		]
	},
  plugins: [
    new extractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin()
  ]
};
