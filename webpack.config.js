const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: "development",
	entry: {
		bundle: './assets/js/index.js'
	},

	output: {
		path: path.resolve(__dirname, "public"),
		filename: 'js/[name].js'
	},

	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				]
			}
		]
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
		})
	]
};
