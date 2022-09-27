import{r as k,I as ae,w as se,g as le,_ as ie,b as U,c as S,d as ce,a as oe,R as t,L as pe,C as ue,u as me}from"./Container.da033fcf.js";import{B as fe}from"./Button.65ce39e9.js";import{_ as Q,M as h}from"./Markdown.af0ae16c.js";function Ne(){import("data:text/javascript,")}var ve={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},de=/\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;function Y(e){var r={type:"tag",name:"",voidElement:!1,attrs:{},children:[]},n=e.match(/<\/?([^\s]+?)[/\s>]/);if(n&&(r.name=n[1],(ve[n[1]]||e.charAt(e.length-2)==="/")&&(r.voidElement=!0),r.name.startsWith("!--"))){var l=e.indexOf("-->");return{type:"comment",comment:l!==-1?e.slice(4,l):""}}for(var o=new RegExp(de),a=null;(a=o.exec(e))!==null;)if(a[0].trim())if(a[1]){var i=a[1].trim(),v=[i,""];i.indexOf("=")>-1&&(v=i.split("=")),r.attrs[v[0]]=v[1],o.lastIndex--}else a[2]&&(r.attrs[a[2]]=a[3].trim().substring(1,a[3].length-1));return r}var ge=/<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g,he=/^\s*$/,xe=Object.create(null);function Z(e,r){switch(r.type){case"text":return e+r.content;case"tag":return e+="<"+r.name+(r.attrs?function(n){var l=[];for(var o in n)l.push(o+'="'+n[o]+'"');return l.length?" "+l.join(" "):""}(r.attrs):"")+(r.voidElement?"/>":">"),r.voidElement?e:e+r.children.reduce(Z,"")+"</"+r.name+">";case"comment":return e+"<!--"+r.comment+"-->"}}var ye={parse:function(e,r){r||(r={}),r.components||(r.components=xe);var n,l=[],o=[],a=-1,i=!1;if(e.indexOf("<")!==0){var v=e.indexOf("<");l.push({type:"text",content:v===-1?e:e.substring(0,v)})}return e.replace(ge,function(d,j){if(i){if(d!=="</"+n.name+">")return;i=!1}var w,O=d.charAt(1)!=="/",A=d.startsWith("<!--"),y=j+d.length,E=e.charAt(y);if(A){var P=Y(d);return a<0?(l.push(P),l):((w=o[a]).children.push(P),l)}if(O&&(a++,(n=Y(d)).type==="tag"&&r.components[n.name]&&(n.type="component",i=!0),n.voidElement||i||!E||E==="<"||n.children.push({type:"text",content:e.slice(y,e.indexOf("<",y))}),a===0&&l.push(n),(w=o[a-1])&&w.children.push(n),o[a]=n),(!O||n.voidElement)&&(a>-1&&(n.voidElement||n.name===d.slice(2,-1))&&(a--,n=a===-1?l:o[a]),!i&&E!=="<"&&E)){w=a===-1?l:o[a].children;var g=e.indexOf("<",y),x=e.slice(y,g===-1?void 0:g);he.test(x)&&(x=" "),(g>-1&&a+w.length>=0||x!==" ")&&w.push({type:"text",content:x})}}),l},stringify:function(e){return e.reduce(function(r,n){return r+Z("",n)},"")}},Ee=["format"],be=["children","count","parent","i18nKey","context","tOptions","values","defaults","components","ns","i18n","t","shouldUnescape"];function z(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);r&&(l=l.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,l)}return n}function f(e){for(var r=1;r<arguments.length;r++){var n=arguments[r]!=null?arguments[r]:{};r%2?z(Object(n),!0).forEach(function(l){ie(e,l,n[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):z(Object(n)).forEach(function(l){Object.defineProperty(e,l,Object.getOwnPropertyDescriptor(n,l))})}return e}function I(e,r){if(!e)return!1;var n=e.props?e.props.children:e.children;return r?n.length>0:!!n}function _(e){return e?e&&e.children?e.children:e.props&&e.props.children:[]}function ke(e){return Object.prototype.toString.call(e)!=="[object Array]"?!1:e.every(function(r){return k.exports.isValidElement(r)})}function D(e){return Array.isArray(e)?e:[e]}function je(e,r){var n=f({},r);return n.props=Object.assign(e.props,r.props),n}function G(e,r){if(!e)return"";var n="",l=D(e),o=r.transSupportBasicHtmlNodes&&r.transKeepBasicHtmlNodesFor?r.transKeepBasicHtmlNodesFor:[];return l.forEach(function(a,i){if(typeof a=="string")n+="".concat(a);else if(k.exports.isValidElement(a)){var v=Object.keys(a.props).length,d=o.indexOf(a.type)>-1,j=a.props.children;if(!j&&d&&v===0)n+="<".concat(a.type,"/>");else if(!j&&(!d||v!==0))n+="<".concat(i,"></").concat(i,">");else if(a.props.i18nIsDynamicList)n+="<".concat(i,"></").concat(i,">");else if(d&&v===1&&typeof j=="string")n+="<".concat(a.type,">").concat(j,"</").concat(a.type,">");else{var w=G(j,r);n+="<".concat(i,">").concat(w,"</").concat(i,">")}}else if(a===null)U("Trans: the passed in value is invalid - seems you passed in a null child.");else if(S(a)==="object"){var O=a.format,A=Q(a,Ee),y=Object.keys(A);if(y.length===1){var E=O?"".concat(y[0],", ").concat(O):y[0];n+="{{".concat(E,"}}")}else U("react-i18next: the passed in object contained more than one variable - the object should look like {{ value, format }} where format is optional.",a)}else U("Trans: the passed in value is invalid - seems you passed in a variable like {number} - please pass in variables for interpolation as full objects like {{number}}.",a)}),n}function we(e,r,n,l,o,a){if(r==="")return[];var i=l.transKeepBasicHtmlNodesFor||[],v=r&&new RegExp(i.join("|")).test(r);if(!e&&!v)return[r];var d={};function j(g){var x=D(g);x.forEach(function(c){typeof c!="string"&&(I(c)?j(_(c)):S(c)==="object"&&!k.exports.isValidElement(c)&&Object.assign(d,c))})}j(e);var w=ye.parse("<0>".concat(r,"</0>")),O=f(f({},d),o);function A(g,x,c){var u=_(g),q=E(u,x.children,c);return ke(u)&&q.length===0?u:q}function y(g,x,c,u,q){g.dummy&&(g.children=x),c.push(k.exports.cloneElement(g,f(f({},g.props),{},{key:u}),q?void 0:x))}function E(g,x,c){var u=D(g),q=D(x);return q.reduce(function(p,s,b){var T=s.children&&s.children[0]&&s.children[0].content&&n.services.interpolator.interpolate(s.children[0].content,O,n.language);if(s.type==="tag"){var N=u[parseInt(s.name,10)];!N&&c.length===1&&c[0][s.name]&&(N=c[0][s.name]),N||(N={});var m=Object.keys(s.attrs).length!==0?je({props:s.attrs},N):N,F=k.exports.isValidElement(m),V=F&&I(s,!0)&&!s.voidElement,K=v&&S(m)==="object"&&m.dummy&&!F,C=S(e)==="object"&&e!==null&&Object.hasOwnProperty.call(e,s.name);if(typeof m=="string"){var H=n.services.interpolator.interpolate(m,O,n.language);p.push(H)}else if(I(m)||V){var R=A(m,s,c);y(m,R,p,b)}else if(K){var ee=E(u,s.children,c);p.push(k.exports.cloneElement(m,f(f({},m.props),{},{key:b}),ee))}else if(Number.isNaN(parseFloat(s.name)))if(C){var te=A(m,s,c);y(m,te,p,b,s.voidElement)}else if(l.transSupportBasicHtmlNodes&&i.indexOf(s.name)>-1)if(s.voidElement)p.push(k.exports.createElement(s.name,{key:"".concat(s.name,"-").concat(b)}));else{var ne=E(u,s.children,c);p.push(k.exports.createElement(s.name,{key:"".concat(s.name,"-").concat(b)},ne))}else if(s.voidElement)p.push("<".concat(s.name," />"));else{var re=E(u,s.children,c);p.push("<".concat(s.name,">").concat(re,"</").concat(s.name,">"))}else if(S(m)==="object"&&!F){var M=s.children[0]?T:null;M&&p.push(M)}else s.children.length===1&&T?p.push(k.exports.cloneElement(m,f(f({},m.props),{},{key:b}),T)):p.push(k.exports.cloneElement(m,f(f({},m.props),{},{key:b})))}else if(s.type==="text"){var W=l.transWrapTextNodes,X=a?l.unescape(n.services.interpolator.interpolate(s.content,O,n.language)):n.services.interpolator.interpolate(s.content,O,n.language);W?p.push(k.exports.createElement(W,{key:"".concat(s.name,"-").concat(b)},X)):p.push(X)}return p},[])}var P=E([{dummy:!0,children:e||[]}],w,D(e||[]));return _(P[0])}function L(e){var r=e.children,n=e.count,l=e.parent,o=e.i18nKey,a=e.context,i=e.tOptions,v=i===void 0?{}:i,d=e.values,j=e.defaults,w=e.components,O=e.ns,A=e.i18n,y=e.t,E=e.shouldUnescape,P=Q(e,be),g=k.exports.useContext(ae)||{},x=g.i18n,c=g.defaultNS,u=A||x||ce();if(!u)return se("You will need to pass in an i18next instance by using i18nextReactModule"),r;var q=y||u.t.bind(u)||function(H){return H};a&&(v.context=a);var p=f(f({},le()),u.options&&u.options.react),s=O||q.ns||c||u.options&&u.options.defaultNS;s=typeof s=="string"?[s]:s||["translation"];var b=j||G(r,p)||p.transEmptyNodeValue||o,T=p.hashTransKey,N=o||(T?T(b):b),m=d?v.interpolation:{interpolation:f(f({},v.interpolation),{},{prefix:"#$?",suffix:"?$#"})},F=f(f(f(f({},v),{},{count:n},d),m),{},{defaultValue:b,ns:s}),V=N?q(N,F):b,K=we(w||r,V,u,p,F,E),C=l!==void 0?l:p.defaultTransParent;return C?k.exports.createElement(C,P,K):K}const J="/lingjie/dist/page",Oe=()=>{const{t:e,i18n:r}=me();return t.createElement(t.Fragment,null,t.createElement("h1",{className:"text-center sm:text-3xl text-2xl title-font mb-4 text-pink-500 font-bold"},e("quick-start.title")),t.createElement("section",{className:"text-gray-600 body-font"},t.createElement("div",{className:"container px-5 lg:px-20 pt-12 mx-auto"},t.createElement($,{index:1,title:e("quick-start.step.1.title"),description:t.createElement(t.Fragment,null,t.createElement(h,null,"```bash\nmkdir micro-frontend"),t.createElement(h,null,"```bash\ncd ./micro-frontend"))}),t.createElement($,{index:2,title:e("quick-start.step.2.title"),description:t.createElement(t.Fragment,null,t.createElement(h,null,`> ${e("quick-start.step.2.markdown.blockquote.create-lingjie-shell")}`),e("quick-start.step.2.create-lingjie-folder"),t.createElement(h,null,"```bash\nmkdir lingjie"),t.createElement(h,null,"```bash\ncd ./lingjie"),e("quick-start.step.2.create-entry-file"),t.createElement(h,null,"```bash\ntouch index.html"),t.createElement(L,{i18nKey:"quick-start.step.2.import-lingjie-shell"},t.createElement(B,null,"ignore"),t.createElement(B,null,"ignore"),t.createElement("a",{href:`${J}/docs/usage.html?title=lingjie-shell-and-lingjie-page`,className:"text-pink-500 font-bold"},"ignore")),t.createElement(h,null,`\`\`\`html
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
  ${e("quick-start.step.2.markdown.code.lingjie-rules")}
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
  <\/script>
  ${e("quick-start.step.2.markdown.code.import-shell-script")}
  <script src="https://unpkg.com/lingjie@1.0.0/dist/shell/lingjie-shell.umd.js"><\/script>
</body>

</html>
                      `))}),t.createElement($,{index:3,title:e("quick-start.step.3.title"),description:t.createElement(t.Fragment,null,t.createElement(h,null,`> ${e("quick-start.step.3.markdown.blockquote.create-lingjie-page")}`),e("quick-start.step.3.one-level-up"),t.createElement(h,null,"```bash\ncd .."),e("quick-start.step.3.create-demo-folder"),t.createElement(h,null,"```bash\nmkdir demo"),t.createElement(h,null,"```bash\ncd ./demo"),e("quick-start.step.3.create-demo-files"),t.createElement(h,null,"```bash\ntouch index.html projectA.html projectB.html"),t.createElement(L,{i18nKey:"quick-start.step.3.import-lingjie-page"},t.createElement(B,null,"ignore"),t.createElement(B,null,"ignore")),t.createElement(h,null,`\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${e("quick-start.step.3.markdown.code.modify-title")}
  <title>index</title>
  ${e("quick-start.step.3.markdown.code.import-lingjie-page")}
  <script src="https://unpkg.com/lingjie@1.0.0/dist/page/lingjie-page.umd.js"><\/script>
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
  ${e("quick-start.step.3.markdown.code.modify-content")}
  <h1>This is index page</h1>
</body>
</html>`))}),t.createElement($,{index:4,title:e("quick-start.step.4.title"),description:t.createElement(h,null,`\`\`\`bash
micro-frontend
  |-demo
    |-index.html
    |-projectA.html
    |-projectB.html
  |-lingjie
    |-index.html`)}),t.createElement($,{index:5,title:e("quick-start.step.5.title"),description:t.createElement(t.Fragment,null,e("quick-start.step.5.install-npx"),t.createElement(h,null,"```bash\nnpm install -g npx"),e("quick-start.step.5.start-local-server"),t.createElement(h,null,"```bash\nnpx http-server -p 8080"),t.createElement(L,{i18nKey:"quick-start.step.5.instruction"},t.createElement(B,null,"ignore"),t.createElement(B,null,"ignore")))}))),t.createElement("a",{href:`${J}/docs/usage-index.html`,className:"py-12 flex"},t.createElement(fe,null,e("quick-start.step.5.more"))))},$=e=>t.createElement("div",{className:"relative pt-10 pb-20 sm:items-center md:w-[2/3] ml-0"},t.createElement("div",{className:"h-full w-6 sm:w-10 absolute inset-0 flex items-center justify-center"},t.createElement("div",{className:"h-full w-1 bg-gray-200 pointer-events-none"})),t.createElement("div",{className:"flex-shrink-0 w-6 h-6 sm:w-10 sm:h-10 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-pink-500 text-white relative z-10 title-font font-medium text-sm sm:text-xl"},e.index),t.createElement("div",{className:"flex-grow md:pl-8 pl-6 sm:items-center items-start flex-col sm:flex-row"},t.createElement("div",{className:"flex-grow sm:pl-6 mt-6 sm:mt-0"},t.createElement("h2",{className:"title-font text-gray-700 mb-1 text-xl font-bold"},e.title),t.createElement("div",{className:"leading-relaxed"},e.description)))),B=e=>t.createElement("span",{className:"bg-pink-400 text-slate-50 mx-1 px-2 py-1"},e.children),qe=()=>t.createElement(pe,null,t.createElement(ue,null,t.createElement(Oe,null)));oe.render(t.createElement(qe,null),document.getElementById("root"));export{Ne as __vite_legacy_guard};
//# sourceMappingURL=quick-start.c7416f2b.js.map
