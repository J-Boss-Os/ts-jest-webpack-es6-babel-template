# ts-jest-webpack-es6-babel-template
常用工具函数开发模板

## 缺少webpack-cli `错误`

```
                        const statsPresetToOptions = require("webpack").Stats.presetToOptions;
                                                                             ^

TypeError: Cannot read property 'presetToOptions' of undefined
```

原因是因为只安装了 webpack  没有安装 `webpack-cli`，执行以下命令后再执行 webpack 打包命令

```sh
npm i -D webpack-cli --registry=https://registry.npm.taobao.org
```

## 让webpack可以解析TS语法`必须`

`ts-loader` 可以让webpack解析TS，但是该loader还需要依赖`typescript`这个包

```sh
npm i -D typescript ts-loader --registry=https://registry.npm.taobao.org
```

并在webpack.config.js 添加以下代码

```js
module: {
    rules: [
      // 识别 编译ts
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
```



## 每次打包可以自动清除上一次的文件残渣`建议加上`

`clean-webpack-plugin` 可以再每次打包的时候自动清除上一次的残渣文件

```shell
npm i -D clean-webpack-plugin --registry=https://registry.npm.taobao.org
```

## tsconfig.json 配置

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/",// 打包到的目录
    "sourceMap": true,// 是否生成sourceMap（用于浏览器调试）
    "noImplicitAny": false,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "declaration": true,// 是否生成声明文件
    "declarationDir": "./dist/types/",// 声明文件打包的位置
    "declarationMap": true,// 是否生成声明文件map文件（便于调试）
    "moduleResolution": "node",
    "module": "esnext",
    "target": "es5",// 转化成的目标语言
    "baseUrl": "./",
    "types": [
      "node",
      "jest"
    ],
    "typeRoots": [
      "./node_modules/@types"
    ],
    "lib": [
      "dom",
      "es2015"
    ],
    "jsx": "react",
    "allowJs": false
  },
  "include": [
    "src/**/*.ts"
  ],// 要打包的文件
  "exclude": [
    "node_modules",
    "*.test.ts"
  ]
}
```

## webpack.config.js 配置

```js
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// the path(s) that should be cleaned
let pathsToClean = ['dist'];

// the clean options to use
let cleanOptions = {
    root: path.resolve(__dirname),
    // exclude: ['shared.js'],
    verbose: true,
    dry: false,
};

module.exports = {
    resolve: {
        extensions: ['.js', '.ts', '.json'],
    },
    devtool: 'source-map',// 打包出的js文件是否生成map文件（方便浏览器调试）
    mode: 'production',
    entry: {
        ‘my-ts': './src/index.ts',
    },
    output: {
        filename: '[name].js',// 生成的fiename需要与package.json中的main一致
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'tslint-loader',
                        options: {
                            configFile: path.resolve(__dirname, './tslint.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            // 指定特定的ts编译配置，为了区分脚本的ts配置
                            configFile: path.resolve(__dirname, './tsconfig.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [new CleanWebpackPlugin(pathsToClean, cleanOptions)],
};
```

## 添加 TS-Jest 让 jest 支持 TS

```shell
npm i -D jest typescript ts-jest @types/jest  --registry=https://registry.npm.taobao.org
```

创建配置 `npx ts-jest config:init`

修改config.json配置添加以下代码

```json
{
  ...
  "scripts": {
    "test": "jest --coverage",
  },
  "jest": {
    "testRegex": "/test/*.spec.jsx?$"
  },
  ...
}
```

