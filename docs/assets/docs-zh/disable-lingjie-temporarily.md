# 如何临时关闭微前端机制？

## 方式一：添加url参数

在页面的 url 路径上添加 `lingjie=0` 后，整个标签内的所有页面都将脱离微前端机制，退化成普通页面，方便打断点等调试。

举个例子：`http//www.demo.com/detail?lingjie=0`

注意，这种方式只会关闭单个标签页的微前端机制，不会影响其它标签页或其它浏览器。


&nbsp;

## 方式二：配置全局变量

在页面加载 `page.js` 之前，设置全局变量，如：

```html
<!-- before loading lingjie-page script-->
<script>
  window.__lingjie_config__ = {
    disable: true
  }
</script>
<!-- import lingjie-page script-->
<script src="https://unpkg.com/lingjie/dist/page/lingjie-page.umd.js"></script>
```

这个方式影响范围比方式一更大，所有包含这段代码的页面，都退出微前端机制。

可以通过表达式，动态地决定是否退回普通页面。比如通过拉取远程配置作为开关，在 `SSR` 时读取配置，决定是否参与微前端机制。

```html
<script>
  window.__lingjie_config_ = {
    disable: getRemoteConfig().featureFlags.enableLingjie
  }
</script>
```

&nbsp;

##### [零界微前端页面跳转的标签属性配置](/docs/usage.html?title=lingjie-data-attrs)
###### [零界微前端 JS API](/docs/usage.html?title=lingjie-JS-API)