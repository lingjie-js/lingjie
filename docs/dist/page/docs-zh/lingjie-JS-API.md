# 零界微前端 JS API

在一些场景中，页面跳转是通过 `JavaScript` 完成，没有 `a` 标签。

这种情况下，零界微前端无法监听到页面的跳转请求，因此零界微前端提供了 API，让开发者可以主动调用。

> ## window.lingjie.addPage(url)

当符合零界微前端规则时，会新增 iframe 不引起页面刷新；不符合时，则刷新当前页面。

```ts
/**
 * 在零界微前端中，每个页面都有 lingjie 全局变量
 * 通过 if/else 判断，下方代码可以在两种场景中都能正常工作
 */
if (window.lingjie) {
  window.lingjie.addPage(url);
} else {
  window.location.href = url;
}
```

&nbsp;

> ## window.lingjie.goto(url)

跟 `addPage` 功能类似，区别在于 `goto` 总是刷新页面，不管是否符合零界微前端规则。

```ts
/**
 * 在零界微前端中，每个页面都有 lingjie 全局变量
 * 通过 if/else 判断，下方代码可以在两种场景中都能正常工作
 */
if (window.lingjie) {
  window.lingjie.goto(url);
} else {
  window.location.href = url;
}
```

&nbsp;

> ## window.lingjie.redirect(url)
零界微前端提供了 `redirect` 方法，用于重定向的页面，同时在浏览器历史记录中将新页面替换旧页面，历史记录的总条数不变。跟页面里 `window.location.replace(url)` 的方式不同，`lingjie.redirect` 是在零界shell页面重定向，而不是当前页面(iframe)。

注：当重定向至未接入零界微前端应用时，如果不通过 `redirect` 方法去重定向，浏览器地址栏 url 将不会随着 iframe 页面跳转而变化。


```ts
/**
 * 在零界微前端中，每个页面都有 lingjie 全局变量
 * 通过 if/else 判断，下方代码可以在两种场景中都能正常工作
 */
if (window.lingjie) {
  window.lingjie.redirect(url);
} else {
  window.location.replace(url)
}
```

&nbsp;

##### [临时关闭微前端机制](/docs/usage.html?title=disable-lingjie-temporarily)