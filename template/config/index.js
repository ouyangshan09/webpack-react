/**
 * Created by ouyangshan09 on 2017/3/7.
 */
var path = require('path');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    build: {
        env: require('./dev.env'),
        index: resolve('dist/index.html'),
        assetRoot: resolve('dist'),
        assetSubDirectory: 'static',
        assetsPublicPath: '/',
        assetsLib: resolve('lib'),
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        cssSourceMap: false
    }
};