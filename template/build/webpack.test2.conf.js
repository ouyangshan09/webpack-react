/**
 * Created by ouyangshan09 on 2017/3/7.
 * 先跑起来
 */
var path = require('path');
var HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

var config = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: resolve('dist/'),
        filename: '[name].js',
        publicPath: '/'
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
                test: /\.css$/,
                loader: 'css-loader'
            },{
                test: /\.css$/,
                loader: 'style-loader'
            }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin()//热模块替换插件
    ],
    devServer: {
        contentBase: path.join(__dirname, "../"),
        hot: true,
        inline: true,
        port: 8889,
    }
};

module.exports = config;
