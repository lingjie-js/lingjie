#  Lingjie HTML Attribute

The lingjie HTML attribute is the attribute that starts with `data-lingjie-*` in tags.

Lingjie supports configuring HTML attributes to set page switching behaviors. The following attributes are supported.

Please note that `data-lingjie-disable` and `data-lingjie-enable` will affect the nearest parent anchor element.

> ## data-lingjie-wait-for={selector}

Page switching will not happen until the selected HTML elements are mounted.

&nbsp;

> ## data-lingjie-timeout={number}

The maximum time waits for reaching a specific render state during page switching. It will force a switch if timeout. It prevents waiting a long time and staying on the previous page permanently.

&nbsp;

> ## data-lingjie-back-action="reload"

The action will be taken on the previous page when returning to the previous page. Now `reload` is supported. If set `backAction` to `reload`, the previous page will reload without refreshing after going back.

&nbsp;

> ## data-lingjie-enable

All the sections that are wrapped in this element will enable lingjie micro-frontend

&nbsp;

> ## data-lingjie-disable

All the sections that are wrapped in this element will disable lingjie micro-frontend


&nbsp;
## For example

```jsx
<li>
  <a
    // wait for #trigger-show element
    data-lingjie-wait-for="#trigger-show"
    // page reload when going back
    data-lingjie-back-action="reload"
    // target address
    href="/lingjie/docs/b.html"
    >b.html</a>
</li>
<li>
  <a
   href="/lingjie/docs/c.html"
   // disable the lingjie micro-frontend
   data-lingjie-disable
   >c.html</a>
</li>
```

&nbsp;

##### [Lingjie Rule Config](/docs/usage.html?title=lingjie-config-rule)
###### [How to Disable Lingjie Temporarily](/docs/usage.html?title=disable-lingjie-temporarily)