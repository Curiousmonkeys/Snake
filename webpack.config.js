/*
 * @Description:
 * @Version: 2.0
 * @Autor: 庄鸿凯
 * @Date: 2022-04-25 21:23:42
 * @LastEditors: 庄鸿凯
 * @LastEditTime: 2022-04-26 21:01:56
 */
// 引入包  nodejs模块
// 作用：拼接路径
const path = require("path");

// 引入自动生成html插件
const HTMLWebPackPlugin = require("html-webpack-plugin");
// 引入清空dist插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// webpack的所有配置信息都应该写在module.exports里
module.exports = {
  // 指定入口文件
  entry: "./src/index.ts",
  // 打包后文件放置位置
  output: {
    // 指定打包后的目录
    // 拼出一个路径  和只写'./dist'一样  只不过这样会完整拼出路径
    path: path.resolve(__dirname, "dist"),
    // 打包后文件名
    filename: "bundle.js",
  },
  // 指定webpack打包所用的模块
  module: {
    // 可能文件有很多种   所以制定规则
    rules: [
      {
        // 指定规则生效的文件  需要正则表达式
        test: /\.ts$/,
        // 指定处理方式
        use: "ts-loader",
        // 指定要排除的文件   一般是node_modules
        exclude: /node_modules/,
      },
      // 设置less文件处理
      {
        test: /\.less$/,
        // use执行顺序从后往前
        use: [
          "style-loader",
          "css-loader",
          // less装成css之后  添加css前缀  再处理css
          // 进行配置postloader
          {
            loader: "postcss-loader",
            options: {
              // postcss配置
              postcssOptions: {
                // 要使用的插件
                plugins: [
                  [
                    "postcss-preset-env",
                    // 配置浏览器信息
                    {
                      // 最新的浏览器的两个版本
                      browser: "last 2 versions",
                    },
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  // 配置webpack插件
  plugins: [
    // 传一个插件的实例对象即可
    // 可以传配置文件
    new CleanWebpackPlugin(),
    new HTMLWebPackPlugin({ template: "./src/index.html" }),
  ],
  mode: "none", //设置mode
  // 用来设置可以被作为模块的文件
  resolve: {
    extensions: [".ts", ".js"],
  },
};
