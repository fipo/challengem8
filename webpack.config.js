const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './dist');

module.exports = function (env = 'development') {
  const isProduction = env === 'production';

  return {
    context: sourcePath,
    entry: {
      main: ['./index.js'],
      vendor: [
        'react',
        'react-dom'
      ]
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    devServer: {
      contentBase: sourcePath,
      port: 3000,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: [
            "babel-loader",
            "eslint-loader",
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        chunks: ['vendor', 'main'],
        template: 'index.html'
      })
    ],
    output: {
      path: outPath,
      publicPath: '/',
      filename: '[name].[chunkhash].js'
    }
  }
}
