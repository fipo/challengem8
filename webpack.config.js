const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './dist');

module.exports = function (env = 'development') {
  const isProduction = env === 'production';

  return {
    mode: env,
    context: sourcePath,
    entry: {
      main: ['./index.jsx'],
      vendor: ['react', 'react-dom']
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    devServer: {
      contentBase: sourcePath,
      port: 3000,
      open: true,
      stats: 'errors-only',
      clientLogLevel: 'error'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
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
          test: /\.hbs$/,
          use: [
            {
              loader: "handlebars-loader"
            }
          ]
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
}
