const path = require('path');
const webpack = require('webpack');
const { merge: webpackMerge } = require('webpack-merge');
const { VueLoaderPlugin } = require('vue-loader');
const WebpackBar = require('webpackbar');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const dotenv = require('dotenv');
const findUp = require('find-up');

dotenv.config({ path: findUp.sync('.env') });
const IS_DEV = process.env.NODE_ENV !== 'production';
if (!IS_DEV) {
	const { parsed: envConfig } = dotenv.config({
		path: findUp.sync('.env.prod'),
	});
	for (const k in envConfig) {
		process.env[k] = envConfig[k];
	}
}

const APP_SERVER_PORT = process.env.APP_SERVER_PORT || 3000;
const WEBPACK_PORT = 8085;

const baseWebpackConfig = {
	output: {
		publicPath: '/assets/',
		path: path.join(__dirname, './dist', 'frontend'),
	},
	entry: {
		index: './src/frontend/js/index.ts',
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: [
					IS_DEV
						? 'style-loader'
						: {
								loader: MiniCssExtractPlugin.loader,
								options: {
									hmr: IS_DEV,
								},
						  },
					'css-loader',
					'postcss-loader',
				],
			},
			{
				test: /\.scss$/,
				use: [
					IS_DEV
						? 'style-loader'
						: {
								loader: MiniCssExtractPlugin.loader,
								options: {
									hmr: IS_DEV,
								},
						  },
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				loader: 'file-loader',
				options: {
					name: '[contenthash].[ext]',
					outputPath: 'images',
					esModule: false,
					useRelativePath: true,
				},
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					name: '[contenthash].[ext]',
					outputPath: 'font',
					esModule: false,
				},
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new WebpackBar(),
		new WebpackAssetsManifest({
			writeToDisk: true,
			output: path.join(__dirname, './storage/app/assets-manifest.json'),
			entrypoints: true,
			// transform({ entrypoints }) {
			// 	return entrypoints;
			// },
			transform(_, manifest) {
				const entrypoints = {};
				for (const key in manifest.stats.namedChunkGroups) {
					if (manifest.stats.namedChunkGroups.hasOwnProperty(key)) {
						const element = manifest.stats.namedChunkGroups[key];
						const css = element.assets
							.filter((value) => /\.css$/gm.exec(value))
							.map((value) => `/${value}`);
						const js = element.assets
							.filter((value) => /\.js$/gm.exec(value))
							.map((value) => `/${value}`);
						entrypoints[key] = {
							css,
							js,
						};
					}
				}
				return entrypoints;
			},
		}),
		// new WebpackAssetsManifest({
		// 	writeToDisk: true,
		// 	output: path.join(__dirname, '../dist/frontend/assets-manifest.json'),
		// }),
	],
	resolve: {
		extensions: ['.js', '.ts', '.vue', '.jsx', '.tsx', '.scss', '.sass'],
		alias: {
			'~': path.resolve(__dirname, './src/frontend'),
			'~js': path.resolve(__dirname, './src/frontend/js'),
			'~libs': path.resolve(__dirname, './src/frontend/js/libs'),
			'~type': path.resolve(__dirname, './src/frontend/js/type'),
			'~interface': path.resolve(__dirname, './src/frontend/js/interface'),
			'~style': path.resolve(__dirname, './src/frontend/style'),
		},
	},
	optimization: {
		runtimeChunk: true,
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'initial',
				},
			},
		},
	},
};

let webpackConfig;
if (!IS_DEV) {
	webpackConfig = webpackMerge(baseWebpackConfig, {
		output: {
			filename: 'js/[name]-[contenthash].js',
		},
		mode: 'production',
		watch: false,
		plugins: [
			new CleanWebpackPlugin(),
			new CompressionPlugin(),
			// @ts-ignore
			new MiniCssExtractPlugin({
				filename: 'style/[name]-[contenthash].css',
				chunkFilename: 'style/[name]-[contenthash].css',
			}),
		],
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					parallel: true,
					extractComments: false,
					terserOptions: {
						compress: {
							// module : true,
							unsafe: true,
							inline: true,
							passes: 5,
							keep_fargs: false,
							ecma: 5,
						},
						output: {
							beautify: false,
							comments: false,
						},
						mangle: true,
					},
				}),
			],
		},
	});
} else {
	webpackConfig = webpackMerge(baseWebpackConfig, {
		plugins: [new webpack.HotModuleReplacementPlugin()],
		output: {
			filename: 'js/[name].js',
		},
		mode: 'development',
		watch: true,
		devtool: 'source-map',
		devServer: {
			hot: true,
			port: WEBPACK_PORT,
			overlay: IS_DEV,
			open: false,
			openPage: `http://localhost:${APP_SERVER_PORT}`,
			contentBase: path.join(__dirname, './dist', 'frontend'),
		},
	});
}

module.exports = webpackConfig;
