# How Lingjie Works
&nbsp;

> ## Basics

All apps that join lingjie micro-frontend will load in `iframes`.

Lingjie, as a shell, manages loading and switching iframes via a `microapp-shell`.

Thus, every page that wants to connect with lingjie must import a script to redirect to `shell`, and then these pages will load in the `iframe` and be managed by lingjie.

&nbsp;

Therefore, lingjie micro-frontend contains two parts:

* One is the `shell`. A regular HTML file will become a `shell` if it imports `lingjie-shell` script. Don't forget to define the path rules that allow connecting lingjie micro-frontend and related actions in the `shell`.
* The other is the pages that joined lingjie micro-frontend. Once a page imports the `lingjie-page` script, it will redirect to the lingjie micro-frontend whenever it loads.

![lingjie_structure](../lingjie_structure.png)

In the `shell`, lingjie will synchronize the current activated page's location state with the browser's location state via `history APIs` like `pushState` and `replaceState`. So refreshing, going back and forwarding the page will not lose the routing state.

During the process of switching pages, switching may not happen until a specific render state is reached (such as fcp or a target element is mounted). That page will force a switch if the actual waiting time exceeds the configured maximum waiting time.


&nbsp;

> ## Max Number of Iframes

For the sake of saving browser resources, the maximum number of `iframes` in lingjie is limited to `10`. Lingjie manages Iframes in a queue data structure and follows FIFO. Lingjie will enqueue the new `iframe` to the front and dequeue the rear iframe if the number of `iframes` exceeds the limit.

&nbsp;

> ## Iframe Slide in & Slide out Animation

Under the lingjie-shell, switching pages will have slide-in and slide-out animation like the webview in the native app if the inner width is below `800px`.

&nbsp;

> ## Anchor Tag Redirect Mechanism

Lingjie Micro-frontend captures all the anchor element click events and rewrites default action if needed. It will check the following conditions one by one.

1. Check if the anchor element sets `target="_blank"`
    - If yes, open the link in the new tab normally.
    - If not, go to the next step.
2. Check if the value of the `href` attribute matches the current domain.
    - If yes, reload the page without refreshing.
    - If not, go to the next step.
3. Check if the domain matches one of the `path rules` in the `lingjie-shell`.
    - If yes, lingjie will prevent the default action and add an `iframe` to load the target page. Once the new iframe reaches the configured render state, lingjie will switch to the new iframe.
    - If not, lingjie will not rewrite the default action.


Lingjie not only captures the redirection by anchor tags but also provides [Lingjie JS APIs](/docs/usage.html?title=lingjie-JS-API) to switch pages.

&nbsp;

###### [Lingjie-shell & Lingjie-page](/docs/usage.html?title=lingjie-shell-and-lingjie-page)