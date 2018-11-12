const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './dist');

module.exports = {
  context: sourcePath,
  entry: {
    main: './index.jsx',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'src/components': path.join(sourcePath, 'components'),
      'src/scenes': path.join(sourcePath, 'scenes'),
      'src': sourcePath
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: true
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Challenge M8',
      chunks: ['vendor', 'main'],
      template: '../public/index.hbs'
    })
  ],
  output: {
    path: outPath,
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  }
}
