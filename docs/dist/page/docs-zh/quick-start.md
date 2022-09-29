## 1. 初始化项目

```bash
mkdir micro-frontend
```

```bash
cd ./micro-frontend
```

&nbsp;

## 2. 创建零界shell
> 新建一个文件夹存放零界shell页面， 所有接入零界微前端的应用都会作为iframe在这里进行加载、切换、销毁。

新建 lingjie 文件夹

```bash
mkdir lingjie
```

```bash
cd ./lingjie
```

创建入口文件 index.html

```bash
touch index.html
```

在入口文件中引入**零界shell**脚本，这个文件就会成为零界**shell**。之后在shell中设置 `__lingjie_shell_config__` 变量来配置零界规则，该规则设置允许加入零界微前端的路径匹配规则和相关行为，请注意零界配置规则应放在引入零界shell脚本之前，下面为示例代码，关于[配置规则](/docs/usage.html?title=lingjie-config-rule)。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lingjie Microapp Shell</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>

  <body>
    <!-- 零界配置规则，放在引入lingjie-shell脚本之前 -->
    <script>
      window.__lingjie_shell_config__ = {
        rules: [
          {
            "test": "/demo(/.+)?",
            "timeout": 5000,
            "backAction": "reload",
            "disabled": false
          }
        ]
      }
    </script>
    <!-- 引入零界shell脚本 -->
    <script src="https://unpkg.com/lingjie/dist/shell/lingjie-shell.umd.js"></script>
  </body>
</html>
```

&nbsp;

## 3. 接入零界
此时零界shell已准备完毕，接下来创建接入零界的应用，以下为示例代码

返回上一层目录

```bash
cd ..
```

创建demo文件夹

```bash
mkdir demo
```

```bash
cd ./demo
```

创建 index.html，projectA.html 和 projectB.html。index.html 为demo的入口文件，projectA.html 和 projectB.html分别为两个不同的应用

```bash
touch index.html projectA.html projectB.html
```

将下面的代码分别写入 index.html，projectA.html 和 projectB.html中。把每一页的title和文字内容改为对应的index，projectA 和 projectB。请注意这里引入了**零界page脚本**，该脚本可以让页面重定向到**零界shell**。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 根据文件名改为对应的title名称 -->
    <title>index</title>
    <!-- 引入零界page脚本 -->
    <script src="https://unpkg.com/lingjie/dist/page/lingjie-page.umd.js"></script>
  </head>
  <body>
    <li>
      <a href="/demo/index.html">go to index</a>
    </li>
    <li>
      <a href="/demo/projectA.html">go to project A</a>
    </li>
    <li>
      <a href="/demo/projectB.html">go to project B</a>
    </li>
    <!-- 根据文件名改为对应的内容 -->
    <h1>This is index page</h1>
  </body>
</html>
```

&nbsp;

## 4. 目录结构

```bash
micro-frontend
  |-demo
    |-index.html
    |-projectA.html
    |-projectB.html
  |-lingjie
    |-index.html
```

&nbsp;

## 5. 验收效果

安装npx，如果已经安装可以跳过这一步

```bash
npm install -g npx
```

在本地8080端口开启一个服务

```bash
npx http-server -p 8080
```

在浏览器中打开网址**http://localhost:8080/demo**，点击里面的 go to index ，go to project A或 go to project B，页面之间的跳转应当**无刷新切换**。