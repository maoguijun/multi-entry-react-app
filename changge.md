# CHANGE LOG

## 2019-04-05 操作内容

### 1. eject create-react-app

```bash
$ npm i yarn -g
$ yarn create react-app my-app
$ yarn eject
$ rm -rf node_modules\
$ yarn
```

### 2. 查看目录

```bash
|   .gitignore
|   package.json
|   README.md
|   yarn.lock
|
+---config #webpack 配置
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
        App.css
        App.js
        App.test.js
        index.css
        index.js # webpack entry
        logo.svg
        serviceWorker.js
```

### 3. 修改 /config/

#### 3.1

<mark>+</mark>： 表示添加代码；
<mark>-</mark>： 表示删除代码；

```js
// /config/paths.js // 添加以下代码

+ const globby = require('globby');

 // 获取所有入口js
+ const entriesPath = globby.sync([resolveApp('src') + '/*/index.js']).map(filePath => {
  let tmp = filePath.split('/');
  let name = tmp[tmp.length - 2];
  return {path: filePath, name}
});

module.exports = {
-  appIndexJs: resolveModule(resolveApp, 'src/index')
  ...
+  entriesPath,
}
```

```js
// /config/webpackDevServer.config.js
+ const paths = require('./paths');
+ const files = paths.entriesPath;
+ const rewrites = files.map(({name, path}) => {
  return {
    from: new RegExp(`^\/${name}`),
    to: `dist/${name}.html`
  };
});

modelue.exports = function (proxy, allowedHost) {
  return {
    ...
-   contentBase: paths.appPublic,
+   contentBase: paths.appPath,
+   rewrites,
  }
}
```

```js
// /config/webpack.config.js
+ const paths = require('./paths');
module.exports = function (webpackEnv) {
  // 获取 entry
+ function getEntries(){
    const entries = {};
    const files = paths.entriesPath;
    // console.log(117, files)
    files.forEach(({name, path}) => {
      entries[name] = [
        isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'),
        path,
      ].filter(Boolean);
    });
    return entries;
  }

+  const entries = getEntries()

+  const htmlPlugin = Object.keys(entries).map(name => {
    return new HtmlWebpackPlugin(Object.assign({}, {
        inject: true,
        template: paths.appHtml,
        chunks: [name, 0], // 只会插入名字中带 "0" 或者 带 name 的js 问题
        filename: `${name}.html`,
        title: `${name} html`,

      }, isEnvProduction
        ? {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        }
        : undefined));
  });
}

return {
  ...
-  entry: [
    isEnvDevelopment &&
        require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs,
  ].filter(Boolean),
+  entry:entries,
  output: {
    ...
-   filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/bundle.js',
+   filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/[name].bundle.js',
    ...
  }
  ...
  plugins: [
-   new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
+ ...htmlPlugin,
  ]
}
```

```js
// /scripts/start.js
// /scripts/build.js
// /scripts/test.js
+ const path = require("path")
- if (!checkRequiredFiles([paths.appHtml,  paths.appIndexJs])) {
    process.exit(1);
  }
+ paths.entriesPath.forEach(({path, name}) => {
  if (!checkRequiredFiles([paths.appHtml, path])) {
    process.exit(1);
  }
})
```

### 4. 修改目录

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
    |   App.css # 删除
    |   App.js  # 删除
    |   App.test.js # 删除
    |   index.css # 删除
    |   index.js # 删除
    |   logo.svg
    |   serviceWorker.js
    |
+    +---h5 # 添加
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
+    \---pc # 添加
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

### 5. 至此，多入口已经修改完毕

### 6. 对 index.html 做处理

```bash
$ yarn add handlebars-loader --save
```

```js
// /config/webpack.config.js
module.exports = function (webpackEnv) {
  ...
  return {
    ...
    module: {
      rules: [
+       {
          test: /.hbs$/,
          loader: require.resolve('handlebars-loader')
        },
      ]
    }

  }
}
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
-   <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
+   <link rel="shortcut icon" href="/public/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />

-   <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
+   <link rel="manifest" href="/public/manifest.json" />

-    <title>REACT APP</title>
+    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>

```
