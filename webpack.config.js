/*
* @Author: kkun
* @Date:   2017-06-19 05:57:06
* @Last Modified by:   kkun
* @Last Modified time: 2017-06-21 06:36:32
*/

var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); 
var HtmlWebpackPlugin = require("html-webpack-plugin"); 

//环境变量 dev / online 
var _env = process.env._env || 'dev';

//get html webpack plugin 参数
var getHtmlConfig = function(name, title) {
    return {
        template : './src/view/' + name + '.html',
        filename : 'view/' + name +'.html',
        title    : title,
        inject : true,
        hash : true,
        chunks : ['common', name],
    };
}

var config = {
     entry: {
        'common'            : ['./src/page/common/index.js'],
        'index'             : ['./src/page/index/index.js'],
        //'list'              : ['./src/page/list/index.js'],
        'detail'            : ['./src/page/detail/index.js'],
        'cart'              : ['./src/page/cart/index.js'],
        'user-login'        : ['./src/page/user-login/index.js'],
        'user-register'     : ['./src/page/user-register/index.js'],
        'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'],
        'user-center'       : ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
        'result'            : ['./src/page/result/index.js'],
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
            { test: /\.string$/, loader: 'html-loader'}
        ]
     },
     resolve : {
        alias : {
            node_modules : __dirname + '/node_modules',
            util : __dirname + '/src/util',
            page : __dirname + '/src/page',
            service : __dirname + '/src/service',
            image : __dirname + '/src/image'
        }
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
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
       // new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
     ]
};

if(_env === 'dev') {
    config.entry.common.push('webpack-dev-server/client?http://localhost:4396/');
}

module.exports = config;