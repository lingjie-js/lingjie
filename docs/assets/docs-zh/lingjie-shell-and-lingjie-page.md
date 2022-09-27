# 零界shell和零界page配置

在零界shell页面和零界page页面中，可以添加一些自定义配置使零界更加灵活

> ## 零界shell

在零界shell页面中，可以在 `window` 中添加 `__lingjie_shell_config__` 变量来设置哪些页面可以加入零界微前端、设置回退行为、是否关闭滑动效果等等，

```ts
type LingjieShellConfig = {
  rules?: Rule[];
  turnoffSlideAnimation?: boolean;
}
```

* rules?: Rule[];

参考[零界微前端链接配置规则](/docs/usage.html?title=lingjie-config-rule)

* turnoffSlideAnimation?: boolean;

是否关闭小屏滑动效果，默认为 `false`


注意，`__lingjie_shell_config__` 变量的设置要放在加载 `lingjie-shell` 脚本之前。

例如

```html
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
```

&nbsp;

> ## 零界page

在引入 `lingjie-page` 脚本的页面中，可以在 `window` 中添加 `__lingjie_config__` 变量来设置接入零界的应用的相关配置

```ts
type LingjieConfig = {
  disable?: boolean;
  shellSrc?: string;
}
```


* disable?: boolean;

设置该页面是否接入零界微前端，默认为 `false`

* shellSrc?: string;

`零界shell` 的路径，默认为 `/lingjie`

注意，`__lingjie_config__` 变量的设置要放在加载 `lingjie-page` 脚本之前。


例如

```html
<!-- 接入零界的应用的配置，放在引入lingjie-page脚本之前 -->
<script>
  window.__lingjie_config__ = {
    disable: true
  }
</script>
<!-- 引入零界page脚本 -->
<script src="https://unpkg.com/lingjie/dist/page/lingjie-page.umd.js"></script>
```

&nbsp;

##### [零界微前端工作原理](/docs/usage.html?title=how-lingjie-works)
###### [零界微前端链接配置规则](/docs/usage.html?title=lingjie-config-rule)