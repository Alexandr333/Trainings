'use strict'

const WebpackMerge = require('webpack-merge');

const CommonConfig = require('./webpack.common.js');
const Webpack = require('webpack');

module.exports = WebpackMerge(CommonConfig,
    {
      entry: {
        vendor: [
          'react',
          'react-dom'
        ]
      },
      plugins: [
        new Webpack.optimize.UglifyJsPlugin(
          {
            compress:{
              warnings: false,
              drop_console:true,
              unsafe:true
            }
          }
        ),
        new Webpack.optimize.CommonsChunkPlugin({name:"vendor", filename:"vendors.bundle.js"})
      ]
    }
)