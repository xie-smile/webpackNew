/*
此文件是webpack的配置文件 用于指定webpack去执行哪些任务
*/
const {resolve} = require("path");
module.exports = {
    entry: {
        main: './src/js/index.js',//入口文件
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'index.js'
    },//输出文件
    mode: 'development',//配置工作模式
    /* 所有的loader都要在module对象中的rules属性中，rules是一个数组数组中的每一个对象就是一个loader
     loader特点：下载后无需引入，只需声明*/
    module: {
        rules: [
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
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
            /*     {loader: "less-loader"}, // 使用lessloader，将 Less 文件编译为 CSS 文件}
                 {loader: "css-loader"},
                 {loader: "style-loader"}*/
        ],
    },
};
