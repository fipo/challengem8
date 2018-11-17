const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const sourcePath = path.join(__dirname, './src');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: sourcePath,
    port: 3000,
    open: true,
    clientLogLevel: 'error',
    quiet: false,
    noInfo: false,
  }
});
