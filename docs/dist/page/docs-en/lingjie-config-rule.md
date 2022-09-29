# Lingjie Rule Config

Lingjie supports configuring the global link (origin + path) rule, and the pattern is the following.


```ts
type Rule = {
  test: string;
  originList?: string[];
  waitFor?: string;
  timeout?: number;
  backAction?: 'reload';
};
```

Let's go through them one by one.

> ### test: string

Regex path config.

> ### originList?: string[]

Configure origins that allow connecting with lingjie micro-frontend. Support all origins if not set explicitly.

> ### waitFor?: string

Configure wait-for directive. The page will not switch until a specific render state is reached, such as fcp, or a target element is mounted.

Possible value:
* `dom-ready`: The document has finished loading, and the document has been parsed, but sub-resources such as scripts, images, stylesheets, and frames are still loading. (default value)
* `fcp`: When the browser renders the first piece of DOM content.
* `loaded`: The document and all sub-resources have finished loading. The state indicates that the load event is about to fire.
* css selector, i.e.'#demo', '.classname-foo'

> ### timeout?: number

The maximum time waits for reaching a specific render state during page switching. It will force a switch if timeout. The default value is 5000 (ms).

> ### backAction:'reload'

The action will take on the previous page when going back. The previous page will remain in its state, including the scroll bar position, if `backAction` is` undefined`. The default value is `undefined`.

Possible value:
* `reload`: Reload the page.

### For example 

```ts
const rule: Rule = {
  // match all the addresses that path starts with /lingjie/docs
  test: '/lingjie/docs(/.+)?',
  // switch to this page when #logo element is mounted
  waitFor: '#logo',
  // the maximum wait time is 5000ms
  timeout: 5000,
};
```

```ts
const rule: Rule = {
  // match all the addresses that path starts with /bar
  // For example
  // foo.com/bar/home   success
  // foo.com/foo    fail
  // foo2.com/bar   fail
  test: 'bar(/.+)?',
  // switch to this page when #logo element is mounted
  originList:[
    'foo.com'
  ],
  waitFor: '#logo',
  // the maximum wait time is 5000ms
  timeout: 5000,
};
```

Please note that the global config's priority is lower than the lingjie HTML attribute. Read more on [Lingjie HTML Attribute](/docs/usage.html?title=lingjie-data-attrs)


&nbsp;

##### [Lingjie-shell & Lingjie-page](/docs/usage.html?title=lingjie-shell-and-lingjie-page)
###### [Lingjie HTML Attribute](/docs/usage.html?title=lingjie-data-attrs)