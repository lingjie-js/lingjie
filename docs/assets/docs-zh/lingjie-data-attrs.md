# 零界微前端页面跳转的标签属性配置

所谓的标签属性配置，即出现在 html 标签里以 `data-lingjie-*` 开头的属性。

零界微前端支持通过标签属性配置跳转页面的行为，目前有以下属性可用。

其中，`data-lingjie-disable` 和 `data-lingjie-enable` 都是区域性的属性，当点击元素时，离该元素最近的带 `enable/disable` 属性的父级元素会生效，更远的同类属性将被忽略。

&nbsp;

> ### data-lingjie-wait-for={selector}

等待满足特定选择器的元素的出现，一般用来 hold 住当前页面，等目标页面加载到目标元素出现后才切换展示。

&nbsp;

> ### data-lingjie-timeout={number}

设置超时时间，最多等待多少毫秒之后，页面强制切换，避免页面长时间停留在上一个页面。

&nbsp;

> ### data-lingjie-back-action="reload"

设置从下一个页面点击后退，返回后当前页面的行为，目前支持 `reload`，设置后，页面回来时会不刷新重新加载。

&nbsp;

> ### data-lingjie-disable

被该属性包裹住的整个区块都不参与零界微前端机制。

&nbsp;

> ### data-lingjie-enable

被该属性包裹住的整个区块开启微前端机制。

&nbsp;

## 举个例子

```html
<li>
  <!--  
    等待 "/lingjie/docs/b.html" 页面中的 #trigger-show 元素挂载后，再进行跳转。
    并且，通过此 a 标签进入"/lingjie/docs/b.html"后，在"/lingjie/docs/b.html"页
    面中点击回退按钮返回到当前页面之前，先刷新当前页面再展示当前页面。
  -->
  <a 
    data-lingjie-wait-for="#trigger-show"
    data-lingjie-back-action="reload"
    href="/lingjie/docs/b.html"
    >b.html</a>
</li>
<li>
  <!-- 手动禁用在这个区块内的零界微前端机制 -->
  <a
   href="/lingjie/docs/c.html"
   data-lingjie-disable
   >c.html</a>
</li>
```

&nbsp;

##### [零界微前端链接配置规则](/docs/usage.html?title=lingjie-config-rule)
###### [临时关闭微前端机制](/docs/usage.html?title=disable-lingjie-temporarily)