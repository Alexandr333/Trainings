'use strict'

const WebpackMerge = require('webpack-merge');

const CommonConfig = require('./webpack.common.js');
const Webpack = require('webpack');

module.exports = WebpackMerge(CommonConfig,
  {
    devtool: 'source-map'
  }
)