<div align="center">
  <img src="https://github.com/lingjie-js/lingjie/blob/main/assets/logo_pink.jpg" alt="lingjie logo" style="display:block; margin:0 auto;">
</div>

English | [中文](https://github.com/lingjie-js/lingjie/blob/main/README-ZH.md)

# Lingjie (零界)

## Background
Currently, most micro-frontend frameworks aim to decouple web apps by any scale of sections as desired. It enables to split of complex features or shared areas out of the app and lets them develop and deploy independently. However, in the case of decoupling pages, the extra overhead is unavoidable; sometimes, the cost is too high for medium and large apps to adopt these frameworks. We wish to organize multiple apps with simple, low-cost, and modified existed apps as little as possible.

## Introduction
Lingjie (means zero boundary) is a zero-cost way to implement micro-frontend. It enables users to switch different apps back and forth smoothly without page refreshing, just like SPA, and simulates the switch effect of web view in the native app.

Lingjie, in contrast, concentrates on decoupling page dimensions and integrates multiple apps with nearly zero cost. Moreover, apps would not bind into lingjie in depth. All apps could freely connect and disconnect lingjie micro-frontend at any time.

## Use case

- Apps integration. Integrate multiple medium and large apps. Refactor is not needed at all.

- MPA optimization. Solving white flickering problems when switching pages among MPA.

- H5 enhancement. Taking advantage of framework mechanism to get transition effect with very low cost.

## Features

- 🔨   **No need to rewrite existing app** 
  
  - Technology agnostic, no worries about the difficulty of development.  

- 🔌   **Only one line of code is needed**
  
  - Every web page only needs to import one script file to join the lingjie micro-frontend.

- ⚡️   **Switch page without refreshing**
  
  - Users could switch different web pages back and forth without refreshing and get consistent UX via lingjie.

- 💪   **Safe and strong**
  
  - Every web page can disconnect lingjie micro-frontend at any time.

- 🚀   **State synchronization**
  
  - Refreshing page will not lose its routing state. All web pages could remain in their original state, such as scroll bar position, and show rapidly when back to the previous page.

- ☔   **Perfect isolation**
  
  - Lingjie isolates both styles and scripts perfectly and avoids namespace pollution among different pages.

## Demo
<div align="center">
 <img src="https://github.com/lingjie-js/lingjie/blob/main/assets/lingjie_demo.gif" alt="lingjie demo" style="display:block; margin:0 auto; width:40%">
</div>

As shown above, `home Page`, `page A`, `page B`, and `page C` are four different vanilla HTML, representing four separate apps. The transition effect is not made by traditional SPA (like TransitionGroup component in React or Vue). Lingjie mechanism entirely powers it.

## How lingjie Works

All apps that join lingjie micro-frontend will load in iframes.

Lingjie, as a shell, manages loading and switching iframes via a microapp-shell.

Thus, every page that wants to connect with lingjie must import a script to redirect to shell, and then these pages will load in the iframe and be managed by lingjie.

Therefore, lingjie micro-frontend contains two parts:

* One is the shell. A regular HTML file will become a shell if it imports lingjie-shell script. Don't forget to define the path rules that allow connecting lingjie micro-frontend and related actions in the shell.

* The other is the pages that joined lingjie micro-frontend. Once a page imports the lingjie-page script, it will redirect to the lingjie micro-frontend whenever it loads.


<div align="center">
 <img src="https://github.com/lingjie-js/lingjie/blob/main/assets/lingjie_structure.png" alt="lingjie structure" style="display:block; margin:0 auto; width:80%">
</div>


Read more on [documentation](https://lingjie-js.github.io/lingjie/dist/page/docs/index.html)

## Quick Start

#### Initialization

```bash
mkdir micro-frontend
```

```bash
cd ./micro-frontend
```

#### Create lingjie-shell

> Create a folder to place lingjie-shell. Lingjie-shell will load each page in the iframe individually. All related operations about the iframe, such as loading, switching, and destroying, will take place in this shell.

Create lingjie folder

```bash
mkdir lingjie
```

```bash
cd ./lingjie
```

Create entry file `index.html`

```bash
touch index.html
```

Import `lingjie-shell` script in the entry file, then this file will become the `shell`. Next, configure the `__lingjie_shell_config__` variable in the shell to define the path rules that allow connecting lingjie micro-frontend and related actions. Please note that the `__lingjie_shell_config__` configuration should place before importing the lingjie-shell script. Following is the demonstration. About [lingjie rule](https://lingjie-js.github.io/lingjie/dist/page/docs/usage.html?title=lingjie-shell-and-lingjie-page).

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lingjie Microapp Shell</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
  </style>
</head>

<body>
  <script>
    // lingjie rule
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
  <script src="https://unpkg.com/lingjie@1.0.0/dist/shell/lingjie-shell.umd.js"></script>
</body>

</html>
```

#### Connect with lingjie-shell

> Now, lingjie-shell is ready, creating apps connect with lingjie-shell next. Following is the demonstration.

Change the directory to one level up

```bash
cd ..
```

Create demo folder

```bash
mkdir demo
```

```bash
cd ./demo
```

Creating `index.html`, `projectA.html`, and `projectB.html`. `index.html` is the entry file of the demo. `projectA.html` and `projectB.html` represent two different apps.

```bash
touch detail.html order.html product.html
```

Copy the following code to `index.html`, `projectA.html`, and `projectB.html` separately. Modify the title and content correspondingly. Please note we import `lingjie-page` script here, which let the app redirect to `lingjie-shell`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- modify the title correspondingly -->
  <title>index</title>
  <!-- import lingjie-page script -->
  <script src="https://unpkg.com/lingjie@1.0.0/dist/page/lingjie-page.umd.js"></script>
</head>
<body>
  <li>
    <a href="/demo/index.html">go to index</a>
  </li>
  <li>
    <a href="/demo/projectA.html">go to project A</a>
  </li>
  <li>
    <a href="/demo/projectB.html">go to project B</a>
  </li>
  <!-- modify the content correspondingly -->
  <h1>This is index page</h1>
</body>
</html>
```

#### File structure

```bash
micro-frontend
  |-demo
    |-index.html
    |-projectA.html
    |-projectB.html
  |-lingjie
    |-index.html
```

#### Check the Effect

Install npx, skip this step if it's installed already.

```bash
npm install -g npx
```

Create a static HTTP server at port 8080

```bash
npx http-server -p 8080
```

Open `http://localhost:8080/demo` in the browser. Pages should switch without refreshing when click `go to index`, `go to project A` or `go to project B`.

---

## Issues / Pull Requests / Contributions are welcomed!
