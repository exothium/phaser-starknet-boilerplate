/* jshint ignore:start */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const dev = {
  mode: 'development',
  stats: 'errors-warnings',
  devtool: 'source-map', //eval
  devServer: {
    open: true,
  }
}

module.exports = merge(common, dev)
