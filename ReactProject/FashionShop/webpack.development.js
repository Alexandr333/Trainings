'use strict'

const WebpackMerge = require('webpack-merge');
const webpack = require('webpack');

const CommonConfig = require('./webpack.common.js');

module.exports = WebpackMerge(CommonConfig,
    {
        devtool: 'source-map',
        devServer: {
          historyApiFallback: true,
          contentBase: './',
          hot: true,
          inline: true
        },
        plugins: [
          new webpack.NamedModulesPlugin(),
          new webpack.HotModuleReplacementPlugin()
        ]
    }
)