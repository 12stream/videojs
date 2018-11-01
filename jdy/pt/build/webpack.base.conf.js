var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: ['babel-polyfill', './src/main.js']
            // app: './src/main.js',
            // "babel-polyfill": "babel-polyfill"
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            //add
            'common': resolve('src/common'),
            'components': resolve('src/components'),
            'base': resolve('src/base'),
            'api': resolve('src/api'),
            'base': resolve('src/base')
           
        }
    },
    module: {
        rules: [{
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            // less yst
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader",
            }
        ]
    },
    // plugins: [
    //     new webpack.ProvidePlugin({
    //         $: "jquery",
    //         jQuery: "jquery"
    //     })
    //  ]
}