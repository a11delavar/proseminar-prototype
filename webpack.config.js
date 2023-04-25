import { resolve, join } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import ResolveTypeScriptPlugin from 'resolve-typescript-plugin'

export default (_, args) => {
	return ({
		cache: false,
		entry: './index.ts',
		context: resolve(),
		stats: 'minimal',
		module: {
			rules: [
				{
					test: /\.ts?$/,
					loader: 'ts-loader',
					options: { allowTsInNodeModules: true, transpileOnly: true }
				}
			]
		},
		output: {
			filename: 'main.js',
			publicPath: '/'
		},
		devServer: {
			static: join('dist'),
			open: true,
			historyApiFallback: true,
		},
		plugins: [
			new HtmlWebpackPlugin({
				templateContent: `
					<!DOCTYPE html>
					<html lang="en">

						<head>
							<meta charset="UTF-8">
							<meta http-equiv="X-UA-Compatible" content="IE=edge">
							<meta name="viewport" content="width=device-width, initial-scale=1.0">
							<script type="module" src="./index.js"></script>
							<title>Seminar Prototype</title>
						</head>

						<body></body>
					</html>
				`
			}),
		],
		resolve: {
			extensions: ['.ts', '.js'],
			plugins: [
				new ResolveTypeScriptPlugin(),
				new TsconfigPathsPlugin({ configFile: './tsconfig.json' })
			]
		}
	})
}