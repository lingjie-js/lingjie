<div align="center">
 <img src="https://raw.githubusercontent.com/lingjie-js/lingjie/main/assets/logo_pink.jpg?token=GHSAT0AAAAAABXFZB6K4ULMLEVG5DNC2ZXQYZSYCIQ" alt="零界 logo" style="display:block; margin:0 auto;">
</div>

[English](https://github.com/lingjie-js/lingjie/blob/main/README.md) | 中文

# lingjie (零界)

[文档](https://lingjie-js.github.io/lingjie/dist/page/docs/index.html)

## 背景
目前大多数微前端框架都是以区域为维度解耦应用，可以高度自定义应用的拆解粒度，对于一些复杂的功能或共享的区域，可以针对性的拆解出来单独发布、部署，但是，对于页面级别的解耦来说，会产生额外的开销；并且，对于已有有的中大型应用改造成本太高。我们需要一种简单的、低成本的、在尽量不改变已有应用的基础之上组合多个应用。

## 介绍
零界是一种零成本的微前端解决方案，支持在不同应用之间快速无刷新切换达到类SPA的体验，并模拟了 Native App 中 WebView 切换的机制。

不同于大多数以区域为单位的微前端框架，零界是针对页面这个维度，基于页面之上，用极低的成本整合多个应用，接入的应用不会与零界深度绑定，可以随时接入、退出。

## 适用场景

- 资源整合，组合多个已有的中大型应用，无需重构。

- MPA优化，解决 MPA 页面跳转时页面短暂白屏的问题。

- H5端体验优化，低成本通过框架的能力达到 WebView 的切换效果。

## 特性

- 🔨   **无需改造原有代码**，技术栈无关，无需担心前端开发的难度。

- 🔌   **几乎零接入成本**，每个页面只需引入一个 script 文件，即可加入零界微前端机制。

- ⚡️   **无刷新切换页面**，零界将多个页面组织起来，提供无刷新页面切换的 SPA 体验，给用户一致性的体验。

- 💪   **安全可靠**，所有页面可随时退出零界微前端机制，回归原始状态。

- 🚀   **状态同步**，刷新页面不会丢失路由状态，页面回退更快展示，并保留前一页的滚动条以及页面状态。

- ☔   **完美隔离**，完全隔离了每个页面的css和js，避免了各个应用之间的变量污染。

## 效果展示
<div align="center">
 <img src="https://raw.githubusercontent.com/lingjie-js/lingjie/main/assets/lingjie_demo.gif?token=GHSAT0AAAAAABXFZB6LKSFCXQX4UWYCCNF6YZSYB3A" alt="零界demo" style="display:block; margin:0 auto; width:40%">
</div>

如上图所示，home Page，page A，page B 和 page C 为4个不同的朴素 html 文件，代表4个不同的应用。这4个页面的切换效果并不是通用传统 SPA （React 或 Vue 的 TransitionGroup 等组件）开发出来的，而是通过加入零界微前端，完全通过零界的机制达到的效果。

## 零界是如何工作的

所有加入零界微前端的应用都会以 `iframe` 的形式加载在零界中。

零界微前端通过一个 `microapp-shell` 页面，作为一个壳，管理多个 `iframe` 的加载和切换。

因此，每个加入零界微前端的应用都需要加载一个脚本去重定向到 `shell` 页面，之后以 `iframe` 的形式让零界管理。



所以，零界微前端由两部分组成：

* 一个是 `shell` 。一个普通的html页面只需引入 `lingjie-shell` 脚本就能成为一个 `shell` ，再向 `shell` 中配置允许加入 `shell` 的路径匹配规则和相关行为。

* 另一个是所有加入零界微前端的应用。每个加入零界微前端的应用只需引入一个 `lingjie-page` 脚本，即可在加载应用的时候跳转到 `shell` 让零界微前端进行管理。


<div align="center">
 <img src="https://raw.githubusercontent.com/lingjie-js/lingjie/main/assets/lingjie_structure.png?token=GHSAT0AAAAAABXFZB6K436ZASZHCXI3IZUMYZSYBIQ" alt="零界 structure" style="display:block; margin:0 auto; width:80%">
</div>


更多详细内容请查看 [文档](https://lingjie-js.github.io/lingjie/dist/page/docs/index.html)

---

## 快速开始

#### 初始化项目

```bash
mkdir micro-frontend
```

```bash
cd ./micro-frontend
```

#### 创建零界shell

> 新建一个文件夹存放零界shell页面， 所有接入零界微前端的应用都会作为iframe在这里进行创建、加载、切换、销毁。

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

在入口文件中引入`零界shell`脚本，这个文件就会成为零界`shell`。之后在shell中设置`__lingjie_shell_config__`变量来配置零界规则，该规则设置允许加入零界微前端的路径匹配规则和相关行为，请注意零界配置规则应放在引入零界shell脚本之前，下面为示例代码，关于[配置规则](https://lingjie-js.github.io/lingjie/dist/page/docs/usage.html?title=lingjie-shell-and-lingjie-page)。

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
  <script>
    // 零界配置规则
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

#### 接入零界

> 此时零界shell已准备完毕，接下来创建接入零界的应用，以下为示例代码

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

创建 index.html，projectA.html 和 projectB.html。 index.html 为demo的入口文件，projectA.html 和 projectB.html分别代表两个不同的应用。

```bash
touch index.html projectA.html projectB.html
```

将下面的代码分别写入 index.html，projectA.html 和 projectB.html中。把每一页的title和文字内容改为对应的index，projectA 和 projectB。请注意这里引入了`零界page`脚本，该脚本可以让页面重定向到`零界shell`。

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

#### 目录结构

```bash
micro-frontend
  |-demo
    |-index.html
    |-projectA.html
    |-projectB.html
  |-lingjie
    |-index.html
```

## 验收效果

安装npx，如果已经安装可以跳过这一步

```bash
npm install -g npx
```

在本地8080端口开启一个服务

```bash
npx http-server -p 8080
```

在浏览器中打开网址`http://localhost:8080/demo`， 点击里面的 go to index ， go to project A或 go to project B，页面之间的跳转`应当无刷新切换`。

---

## 欢迎提 Issue / Pull Request / Contributions
