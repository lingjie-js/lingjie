# Lingjie-shell & Lingjie-page

Adding some configs to shell and micro-app could make lingjie micro-frontend more flexible.

&nbsp;

## lingjie shell

Configuring `window.__lingjie_shell_config__` in the `shell` could set which pages are allowed to join the lingjie micro-frontend, their back actions, turn off the sliding animation, etc.

```ts
type LingjieShellConfig = {
  rules?: Rule[];
  turnoffSlideAnimation?: boolean;
}
```
&nbsp;

> ### rules?: Rule[];

Reference [Lingjie Rule Config](/docs/usage.html?title=lingjie-config-rule)

> ### turnoffSlideAnimation?: boolean;

Whether or not turn off the slide animation, default is `false`


Please note that `window.__lingjie_shell_config__` configuration should place before importing the `lingjie-shell` script.

&nbsp;

### For example

```html
<!-- set lingjie rule before importing lingjie-shell script -->
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
<!-- import lingjie-shell script -->
<script src="https://unpkg.com/lingjie/dist/shell/lingjie-shell.umd.js"></script>
```

&nbsp;

&nbsp;

## lingjie page

Setting the `window.__lingjie_config__` variable in the apps that import `lingjie-page` to configure lingjie.

```ts
type LingjieConfig = {
  disable?: boolean;
  shellSrc?: string;
}
```
&nbsp;

> ### disable?: boolean;

Whether or not connect lingjie micro-frontend. The default value is `false`.

> ### shellSrc?: string;

The path of lingjie-shell. The default value is `/lingjie`

Please note that `window.__lingjie_config__` configuration should place before importing the `lingjie-page` script.

&nbsp;

### For example

```html
<!-- set lingjie config，before importing lingjie-page script -->
<script>
  window.__lingjie_config__ = {
    disable: true
  }
</script>
<!-- import lingjie-page script -->
<script src="https://unpkg.com/lingjie/dist/page/lingjie-page.umd.js"></script>
```

&nbsp;

##### [How Lingjie Works](/docs/usage.html?title=how-lingjie-works)
###### [Lingjie Rule Config](/docs/usage.html?title=lingjie-config-rule)