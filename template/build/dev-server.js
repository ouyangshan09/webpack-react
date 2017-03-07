/**
 * Created by ouyangshan09 on 2017/3/7.
 * 利用Node.js 做代理服务器
 * @author Ouyang
 */

var path = require('path');
var opn = require('opn');
var express=  require('express');
var webpack = require('webpack');
var merge = require('webpack-merge');
var config = require('../config');
var baseWebpackConfig = require('./webpack.dev.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var proxyMiddleware = require('http-proxy-middleware')

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

var port = process.env.PORT || config.dev.port;
var autoOpenBrowser = !!config.dev.autoOpenBrowser;

var proxyTable = config.dev.proxyTable;

var app = express();
var compiler = webpack(baseWebpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: baseWebpackConfig.output.publicPath,
    quiet: true
});
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
});

compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit'), function (data, cb) {
        hotMiddleware.publish({ action: 'reload'});
        cb();
    }
});

Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context];
    if(typeof options === 'string'){
        options = {target: options};
    }
    app.use(proxyMiddleware(options.filter || context, options));
});

app.use(require('connect-history-api-fallback')());
app.use(devMiddleware);
app.use(hotMiddleware);
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

var uri = 'http://localhost:' + port;

devMiddleware.waitUntilValid(function () {
    console.log('> Listening at ' + uri + '\n');
});

module.exports = app.listen(port, function (err) {
    if(err){
        console.log(err);
        return;
    }
    if(autoOpenBrowser && process.env.NODE_ENV !== 'testing'){
        opn(uri);
    }
});