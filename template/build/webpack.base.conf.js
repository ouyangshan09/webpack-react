/**
 * Created by ouyangshan09 on 2017/3/7.
 * React开发基础配置
 */
var path = require('path');
var config = require('../config');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [resolve('src')]
            },{
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: 'build/img[name].[ext]?[hash]'
                }
            },{
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: 'build/img[name].[ext]?[hash]'
                }
            },{
                test: /\.css$/,
                loader: 'css-loader'
            },{
                test: '/\.css$/',
                loader: 'style-loader'
            }
        ]
    }
};