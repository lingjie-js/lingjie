# Lingjie JS API

In some scenarios, redirects are made by javascript instead of the anchor tag.

Lingjie cannot capture the redirect action in such cases, so lingjie provides some APIs for developers to call if needed.

&nbsp;

> ### window.lingjie.addPage(url)

If the URL matches one of the rules in lingjie-shell, the URL will be loaded in the iframe and added to lingjie without page refreshing. Otherwise, reload and refresh the page.

```ts
/**
 * Under lingjie micro-frontend, every page has window.lingjie global variable.
 * The following code could run in both cases.
 */
if (window.lingjie) {
  window.lingjie.addPage(url);
} else {
  window.location.href = url;
}
```

&nbsp;

> ### window.lingjie.goto(url)

This API is similar to `addPage`. The difference is that calling `goto` always reloads the page even if the URL matches one of the rules in lingjie-shell.

```ts
/**
 * Under lingjie micro-frontend, every page has window.lingjie global variable
 * The following code could run in both cases.
 */
if (window.lingjie) {
  window.lingjie.goto(url);
} else {
  window.location.href = url;
}
```

&nbsp;

> ### window.lingjie.redirect(url)

Lingjie micro-fronted provides the `redirect` API that allows developers to redirect pages. It's different from `window.location.replace(url)` that `lingjie.redirect` happen in lingjie-shell instead of current page (iframe)

Please note: The URL in the browser will not change if not calling `window.lingjie.redirect(url)` when redirecting to the page that does not join the lingjie micro-frontend.


```ts
/**
 * Under lingjie micro-frontend, every page has window.lingjie global variable
 * The following code could run in both cases.
 */
if (window.lingjie) {
  window.lingjie.redirect(url);
} else {
  window.location.replace(url)
}
```

&nbsp;

##### [How to Disable Lingjie Temporarily](/docs/usage.html?title=disable-lingjie-temporarily)