const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
    main: path.join(__dirname, '../client/src/index.js')
  },
	output: {
		path: path.resolve(__dirname, '../client/public')
	},
	module: {
		rules: [
			{
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'react', 'stage-2']
        }
      },
			{
				test: /\.css$/,

				use: [
					{
						loader: 'style-loader',

						options: {
							sourceMap: true
						}
					},
					{
						loader: 'css-loader'
					}
				]
			}
		]
	},

	devtool: 'inline-source-map',
	devServer: {
		contentBase: './client/public',
		hot: true,
	},
	mode: 'development'
};

