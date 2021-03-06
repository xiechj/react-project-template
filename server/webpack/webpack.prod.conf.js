// const webpack = require('webpack');
// const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const baseConfig = require('./webpack.base.conf');
const {
	getArg,
	getPath,
	addDllPluginsConfig,
	createStyleLoader,
	createStylePlugin,
} = require('./utils');

const { project, channel } = getArg();
// const mode = 'production';
const mode = process.env.NODE_ENV;
const isDev = false;
module.exports = merge(baseConfig, {
	mode,
	devtool: false,
	output: {
		chunkFilename: 'js/[name].[chunkhash].js',
		filename: 'js/[name].[chunkhash].js',
		publicPath: './',
	},
	resolve: {
		alias: {
			'@redux-devtool': getPath(project, 'store', 'no.devtool.ts'),
		},
	},
	plugins: [
		// 删除文件
		new CleanWebpackPlugin(),
		// new BundleAnalyzerPlugin(),
	],
});
