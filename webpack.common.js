const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './dist');

module.exports = {
  context: sourcePath,
  entry: {
    main: './index.js'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'src/common': path.join(sourcePath, 'common'),
      'src/components': path.join(sourcePath, 'components'),
      'src/firebase': path.join(sourcePath, 'firebase'),
      'src/scenes': path.join(sourcePath, 'scenes'),
      src: sourcePath
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
        }
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
    new CleanWebpackPlugin({ verbose: true }),
    new HtmlWebpackPlugin({
      title: 'Challenge M8',
      chunks: ['vendor', 'main'],
      template: '../public/index.hbs'
    })
  ],
  output: {
    path: outPath,
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  }
};
