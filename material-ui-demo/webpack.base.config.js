/**
 * webpack的基础配置文件
 */


'use strict';
let path = require('path');

let defalutPort = '8080';
let srcPath = path.join(__dirname, '/src');
let publicPath = '/assets/';
let nodeModules = path.join(__dirname, "node_modules");

module.exports = {

  port: defalutPort,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: publicPath
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: defalutPort,
    publicPath: publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
    }
  },
  module: {
    noParse: [path.join(nodeModules,"react/dist/react")],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      }
    ]
  },
  eslint: {
    configFile: './.eslintrc'
  }
};


