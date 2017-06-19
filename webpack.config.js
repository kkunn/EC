/*
* @Author: kkun
* @Date:   2017-06-19 05:57:06
* @Last Modified by:   kkun
* @Last Modified time: 2017-06-20 03:13:34
*/

var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); 
var HtmlWebpackPlugin = require("html-webpack-plugin"); 

//环境变量 dev / online 
var _env = process.env._env || 'dev';

console.log(_env);

//get html webpack plugin 参数
var getHtmlConfig = function(name) {
    return {
        template : './src/view/' + name + '.html',
        filename : 'view/' + name +'.html',
        inject : true,
        hash : true,
        chunks : ['common', name],
    };
}

var config = {
     entry: {
        'common' : ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js'],
    },
     output: {
         path: './dist',
         publicPath: '/dist',
         filename: 'js/[name].js'
     },
     externals : {
        'jquery' : 'window.jQuery'
     },
     module: {
        loaders: [
            { test: /\.css$/, loader : ExtractTextPlugin.extract("style-loader","css-loader")  },
            { test: /\.(gif|png|jpg|jpeg|woff|svg|eot|ttf)\??.*/, loader : 'url-loader?limit=128&name=resource/[name].[ext]' },
        ]
     },
     plugins:[
        //通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        //CSS打包
        new ExtractTextPlugin("css/[name].css"),
        //HTML模板处理
        new HtmlWebpackPlugin(getHtmlConfig('index')), 
        new HtmlWebpackPlugin(getHtmlConfig('login')), 
     ]
};

if(_env === 'dev') {
    config.entry.common.push('webpack-dev-server/client?http://localhost:4396/');
}

module.exports = config;