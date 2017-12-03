'use strict'
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
module.exports = {
    entry: {
      app:[
        './src/app'
      ]
    },
    output: {
      path: __dirname + '/build',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.tsx?$/,
          enforce: 'pre',
          loader: 'tslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}  
            }
          ],
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ ".tsx", ".ts", ".js" ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'My App',
        template: './src/index.html',
        filename: 'index.html'
      }),
    ]
}
