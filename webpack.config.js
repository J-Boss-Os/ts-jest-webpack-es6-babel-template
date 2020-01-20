const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  resolve: {
    modules: [
      "node_modules"
    ],
    extensions: ['.js', '.ts', '.json'],
  },
  devtool: 'source-map', // 打包出的js文件是否生成map文件（方便浏览器调试）
  mode: 'development', // 开发模式
  entry: { // 多入口
    add: './src/add'
  },
  output: {
    filename: '[name].js', // 打包后的名称
    path: path.resolve(__dirname, 'dist'), // 打包去哪里
    libraryTarget: 'umd',
    globalObject: 'this' // 重新设置 全局window 的 指向  this 避免在 node 环境运行出现 window 找不到的情况
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname),
      // exclude: ['shared.js'],
      verbose: true,
      dry: false,
    })
  ],
  module: {
    rules: [
      // 识别 编译ts
      { test: /\.tsx?$/, exclude: /node_modules/, loader: "ts-loader" },
    ]
  }
}