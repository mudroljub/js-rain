var webpack = require('webpack');

module.exports = {
	entry: [
		'webpack/hot/dev-server',
		'./main.js'
	],
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};
