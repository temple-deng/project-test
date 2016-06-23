/**
 * 开发环境的配置文件
 */

'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./webpack.base.config');
let srcPath = path.join(__dirname, '/src');

let config = Object.assign({}, baseConfig, {
    entry: {
      'simple-counter': [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        './src/simple-counter'
      ]
    },
    cache: true,
    devtool: 'eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
});

//config.module.preLoaders = [
//                              {
//                                test: /\.(js|jsx)$/,
//                                include: srcPath,
//                                loader: 'eslint-loader'
//                              }
//                            ];


module.exports = config;