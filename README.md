[![GitHub All Releases](https://img.shields.io/github/downloads/maoguijun/multi-entry-react-app/total.svg)](https://github.com/maoguijun/multi-entry-react-app)
[![GitHub language](https://img.shields.io/github/languages/top/maoguijun/multi-entry-react-app.svg)](https://github.com/maoguijun/multi-entry-react-app)
[![GitHub language count](https://img.shields.io/github/languages/count/maoguijun/multi-entry-react-app.svg)](https://github.com/maoguijun/multi-entry-react-app)
[![GitHub license](https://img.shields.io/github/license/maoguijun/multi-entry-react-app.svg)](https://github.com/maoguijun/multi-entry-react-app)
[![GitHub last-commit](https://img.shields.io/github/last-commit/maoguijun/multi-entry-react-app.svg)](https://github.com/maoguijun/multi-entry-react-app)
[![GitHub contributors](https://img.shields.io/github/contributors/maoguijun/multi-entry-react-app.svg)](https://github.com/maoguijun/multi-entry-react-app)
[![GitHub contributors](https://img.shields.io/david/maoguijun/multi-entry-react-app.svg)](https://github.com/maoguijun/multi-entry-react-app)
[![GitHub contributors](https://img.shields.io/david/dev/maoguijun/multi-entry-react-app.svg)](https://github.com/maoguijun/multi-entry-react-app)
[![GitHub stars](https://img.shields.io/github/stars/maoguijun/multi-entry-react-app.svg?style=social)](https://github.com/maoguijun/multi-entry-react-app)
[![GitHub watchers](https://img.shields.io/github/watchers/maoguijun/multi-entry-react-app.svg?style=social)](https://github.com/maoguijun/multi-entry-react-app)
[![GitHub forks](https://img.shields.io/github/forks/maoguijun/multi-entry-react-app.svg?style=social)](https://github.com/maoguijun/multi-entry-react-app)

## 使用文档

### 1 clone

```bash
$ git clone https://github.com/maoguijun/multi-entry-react-app.git your-app
```

### 2 目录结构

```bash
|   .gitignore #
|   package.json
|   README.md
|   yarn.lock
|
+---config #webpack 相关配置
|   |   env.js
|   |   paths.js
|   |   webpack.config.js
|   |   webpackDevServer.config.js
|   |
|   \---jest
|           cssTransform.js
|           fileTransform.js
|
+---public # 静态文件
|       favicon.ico
|       index.html
|       manifest.json
|
+---scripts # 脚本
|       build.js
|       start.js
|       test.js
|
\---src # 项目文件
    |   logo.svg
    |   serviceWorker.js
    |
    +---h5 # 第一个页面
    |   |   index.js
    |   |
    |   +---container
    |   |   \---pcDemo
    |   |           index.css
    |   |           index.js
    |   |
    |   +---reducer
    |   |       index.js
    |   |
    |   \---store
    |           index.js
    |
    \---pc # 第二个页面
        |   index.js
        |
        +---container
        |   \---pcDemo
        |           index.css
        |           index.js
        |
        +---reducer
        |       index.js
        |
        \---store
                index.js
```

### 3 start

```bash
$ cd your-app
$ yarn
$ yarn start
```

#### 启动之后查看[pc 页面](http://127.0.0.1:3000/pc/demo)，[h5 页面](http://127.0.0.1:3000/pc/demo)

### 4 build

```bash
$ yarn build
```

### 5 如何增减加页面入口

#### 5.1 增加入口

只需要在 `/src/`

```bash
$ mkdir newEntry
$ cd newEntry
$ touch index.js
```

##### 然后再重新 `yarn start`, 就可以在新的页面写代码了

##

#### 5.2 减少入口

就更简单了，只要删掉一个 src 下的文件夹就可以了，文件夹的 index.js 改为其他的名字 如 a.js

### 插件

集成了 eslint prettier, 推荐使用 vscode ，安装 Prettier-code formatter 和 Formatting Toggle
, 可以根据 eslint 规则自动格式化代码
