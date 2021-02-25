/*
此文件是webpack的配置文件 用于指定webpack去执行哪些任务
*/
const {resolve} = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: ['./src/js/index.js', './src/index.html'],//入口文件,
    output: {
        path: resolve(__dirname, 'dist'),
        filename: './js/index.js'
    },//输出文件
    mode: 'development',//配置工作模式
    /* 所有的loader都要在module对象中的rules属性中，rules是一个数组数组中的每一个对象就是一个loader
     loader特点：下载后无需引入，只需声明*/
    module: {
        rules: [
            //less转换
            {
                test: /\.less$/,//匹配所有的less文件
                use: [
                    "style-loader",//用于在html文档中创建一个style标签，将样式放进去
                    "css-loader",//将less编译后的css转换成commonjs的一个模块
                    "less-loader"//把less编译成css，但是不生成单独的css文件，在内存中
                ]
            },
            //js语法检查
            {
                test: /\.js$/,//匹配所有的js文件
                exclude: /node_modules/,//排除node_modules文件夹的js
                enforce: "pre",//提前加载使用
                use: {
                    loader: "eslint-loader",//用eslint loader
                }
            },
            //js语法转换（es6->es5）
            //js语法转换（es6->es5）
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            /* {
                 test: /\.m?js$/,
                 exclude: /{node_modules}/,
                 use: {
                     loader: "babel-loader",
                     options: {
                         presets: [
                             [
                                 "@babel/preset-env",
                                 {
                                     useBuiltIns: "usage",//按需引入使用polyfill
                                     corejs: {version: 3},//解决不能够找到corejs的warn
                                     targets: {
                                         "chrome": "58",
                                         "ie": "9"
                                     }
                                 }
                             ]
                         ],
                         cacheDirectory: true,//开启babel缓存
                     }
                 }
             },*/
            //文件资源转换
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,//8kb以下的图片会进行base64处理
                        name: '[hash:5].[ext]',
                        outputPath: 'images',
                        publicPath: 'images/',
                    },
                }
            },
            //转换html文件中的img标签
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            /*     {loader: "less-loader"}, // 使用lessloader，将 Less 文件编译为 CSS 文件}
                 {loader: "css-loader"},
                 {loader: "style-loader"}*/
        ],
    },
    //配置html插件
    plugins: [new HtmlWebpackPlugin({
        template: "./src/index.html"
    })],
    //配置自动化编译
   /* devServer: {
        open: true,//自动打开浏览器
        compress: true,//启动gzip压缩
        port: 3000,//端口号
        hot: true,//支持热摸替换
    },*/
    devtool: 'cheap-module-eval-source-map',//cheap-module-source-map--生产环境  cheap-module-eval-source-map--开发环境
};
