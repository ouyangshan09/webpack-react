/**
 * Created by ouyangshan09 on 2017/3/7.
 */
var path = require('path');
var webpack = require('webpack');
var HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var merge = require('webpack-merge');
var config = require('../config');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(baseWebpackConfig, {
    // devServer: {
    //     hot: true,
    //     inline: true,
    //     contentBase: path.join(__dirname, "../"),
    //     port: 9999
    // },
    plugins: [
        new DefinePlugin({
            'process.env': config.dev.env
        }),
        new HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
    ]
});