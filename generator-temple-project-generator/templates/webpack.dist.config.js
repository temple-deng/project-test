
'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./webpack.base.config');


let config = Object.assign({}, baseConfig, {
  entry: {
    'simple-counter': './src/index'
  },
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ]
});

module.exports = config;

