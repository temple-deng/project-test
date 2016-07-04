/**
 * webpack配置文件，注意这个文件实际上没有配置信息， 而是根据环境选择加载对应的配置文件
 */


'use strict';

const path = require('path');

let env = process.env.NODE_ENV;

// 支持两种环境 development: 开发环境 production: 线上环境
var allowedEnvs = ['development', 'production'];


// 设置环境
if (env) {
  env = env;
} else {
  env = 'development';     // 默认是dev环境
}
process.env.REACT_WEBPACK_ENV = env;


/**
 * 根据环境加载配置文件
 * @param  {String} 环境参数
 * @return {Object} Webpack config 配置文件
 */
function buildConfig(wantedEnv) {
  var isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
  var validEnv = isValid ? wantedEnv : 'development';
  var config = require(path.join(__dirname, 'webpack.' + (validEnv === 'development' ? 'dev' : 'dist')  + '.config'));
  return config;
}

module.exports = buildConfig(env);


