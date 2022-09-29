# How to Disable Lingjie Temporarily

## 1st Method: add url search parameter

All pages in this tab will disable lingjie micro-frontend once adding `lingjie=0` to the url. It's convenient to add breakpoints for debugging.

For example: `http//www.demo.com/detail?lingjie=0`

Please note that this will only work on current tab. Other tabs or browsers will not be affected.


&nbsp;

## 2nd Method: configure global variable

Setting global variable `window.__lingjie_config__` before loading `lingjie-page` script.

For example 

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

This will let the page disconnect lingjie micro-frontend in any tabs or browsers.

The config value could be changed during ssr, then it could decide weather or not connect lingjie micro-fronted dynamically.

For example

```html
<script>
  window.__lingjie_config_ = {
    disable: getRemoteConfig().featureFlags.enableLingjie
  }
</script>
```

&nbsp;

##### [Lingjie HTML Attribute](/docs/usage.html?title=lingjie-data-attrs)
###### [Lingjie JS APIs](/docs/usage.html?title=lingjie-JS-API)