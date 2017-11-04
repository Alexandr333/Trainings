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
        module: {
            rules: [
              {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ],
                exclude: /node_modules/
              }
            ]
        },
        plugins: [
          new webpack.NamedModulesPlugin(),
          new webpack.HotModuleReplacementPlugin()
        ]
    }
)