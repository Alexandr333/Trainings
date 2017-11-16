'use strict'

const WebpackMerge = require('webpack-merge');
const webpack = require('webpack');

const CommonConfig = require('./webpack.common.js');

module.exports = WebpackMerge(CommonConfig,
    {
        devtool: 'source-map',
        devServer: {
          contentBase: './dist',
          inline: true,
          hot:true
        },
        plugins: [
          new webpack.NamedModulesPlugin(),
          new webpack.HotModuleReplacementPlugin()
        ]
    }
)