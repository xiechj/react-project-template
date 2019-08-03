module.exports = {
	plugins: [
		// "dynamic-import-webpack",
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-transform-modules-commonjs',
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-transform-runtime',
		'@babel/plugin-proposal-function-bind',
		['@babel/plugin-proposal-decorators', { legacy: true }],
		['@babel/plugin-proposal-class-properties', { loose: true }],
		// [
		// 	"import",
		// 	{
		// 		"libraryName": "antd",
		// 		"style": "css"
		// 	}
		// ]
	],
	presets: [
		[
			'@babel/preset-env',
			{
				"targets": {
					"chrome": "49",
					"ie": "10"
				},
				corejs: 3,
				modules: false,
				useBuiltIns: 'entry',
				exclude: ['transform-typeof-symbol'],
			},
		],
		['@babel/preset-react', {
			useBuiltIns: true,
		}],
		['@babel/preset-typescript'],
	],
};
