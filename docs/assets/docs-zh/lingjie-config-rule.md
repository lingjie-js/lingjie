# 零界微前端链接配置规则

零界微前端支持全局的链接规则配置，其一般格式如下：

```ts
type Rule = {
  test: string;
  originList?: string[];
  waitFor?: string;
  timeout?: number;
  backAction?: 'reload';
};

```
#### 让我们拆开来看
> #### test: string;

配置正则表达式匹配路径

> #### originList?: string[]

激活的域名列表，如不填，则所有域名里都启用

> #### waitFor?: string

配置 wait-for 等待指令，当页面的加载状态达到某个条件时（比如指定某个元素完成挂载时），再进行页面切换。

可选值：
* dom-ready：   文档已经结束了“正在加载”状态，DOM元素可以被访问 （默认值）
* fcp：         DOM完成渲染第一块内容
* loaded：      页面所有内容都已被完全加载
* css selector，也就是 CSS 选择器字符串， 比如：'#demo'，'.classname-foo'


> #### timeout?: number

配置跳转改页面时，最长等待时间，超出则强行展示页面，默认为5000ms

> #### backAction:'reload'

设置该页面回退到其它页面时，其他页面的行为，如不填，则回退页面的状态保持上一次离开时的状态，包括滚动条的位置。

可选值：
* reload：     刷新页面


### 例如

```ts
const rule: Rule = {
  // 匹配所有 /lingjie/docs 开头的路径
  test: '/lingjie/docs(/.+)?',
  // 等待 #logo 元素出现后，再展示
  waitFor: '#logo',
  // 最多等待 5000 毫秒
  timeout: 5000,
};
```

```ts
const rule: Rule = {
  // 匹配所有 foo.com/bar 开头的地址
  // 例如：
  // foo.com/bar/home   匹配成功
  // foo.com/foo    匹配失败
  // foo2.com/bar   匹配失败
  test: 'bar(/.+)?',
  // 等待 #logo 元素出现后，再展示
  originList:[
    'foo.com'
  ],
  waitFor: '#logo',
  // 最多等待 5000 毫秒
  timeout: 5000,
};
```

注意，全局配置的优先级，低于本地标签配置，可查看[零界微前端页面跳转的标签属性配置](/docs/usage.html?title=lingjie-data-attrs)了解更多。

&nbsp;

##### [配置零界shell和零界page](/docs/usage.html?title=lingjie-shell-and-lingjie-page)
###### [零界微前端页面跳转的标签属性配置](/docs/usage.html?title=lingjie-data-attrs)