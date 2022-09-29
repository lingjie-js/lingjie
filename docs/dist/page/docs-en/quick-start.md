## 1. Initialization

```bash
mkdir micro-frontend
```

```bash
cd ./micro-frontend
```

&nbsp;

## 2. Create lingjie-shell

> Create a folder to place lingjie-shell. Lingjie-shell will load each page in the iframe individually. All iframe related operations, such as loading, switching, and destroying, will take place in this shell.

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

Import **lingjie-shell** script in the entry file, then this file will become the **shell**. Next, configure the `__lingjie_shell_config__` variable in the shell to define the path rules that allow connecting lingjie micro-frontend and related actions. Please note that the `__lingjie_shell_config__` configuration should place before importing the lingjie-shell script. Following is the demonstration. About [lingjie rule](/docs/usage.html?title=lingjie-config-rule).

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
  </body>
</html>
```

&nbsp;

## 3. Connect with lingjie-shell
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
touch index.html projectA.html projectB.html
```

Copy the following code to `index.html`, `projectA.html`, and `projectB.html` separately. Modify the title and content correspondingly. Please note we import **lingjie-page** script here, which let the app redirect to **lingjie-shell**.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- change the title same as the file name -->
    <title>index</title>
    <!-- import lingjie-page script -->
    <script src="https://unpkg.com/lingjie/dist/page/lingjie-page.umd.js"></script>
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
    <!-- change the content same as the file name -->
    <h1>This is index page</h1>
  </body>
</html>
```

&nbsp;

## 4. File structure
```bash
micro-frontend
  |-demo
    |-index.html
    |-projectA.html
    |-projectB.html
  |-lingjie
    |-index.html
```

&nbsp;

## 5. Check the Effect
Install npx, skip this step if it's installed already.

```bash
npm install -g npx
```

Create a static HTTP server at port 8080

```bash
npx http-server -p 8080
```

Open http://localhost:8080/demo in the browser. Pages should switch without refreshing when clicking `go to index`, `go to project A`, or `go to project B`.