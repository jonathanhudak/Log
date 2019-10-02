(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{29:function(e,t,n){e.exports=n(38)},38:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),o=n(22),c=n.n(o),l=n(23),i=n(12),u=n(24),s=n(7),f=n(15),m=n(4),b=n.n(m),d=n(28);function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}var p="my_logs";function v(){var e=Object(r.useState)([]),t=Object(s.a)(e,2),n=t[0],a=t[1];Object(r.useEffect)(function(){var e=localStorage.getItem(p);e&&a(JSON.parse(e))},[a]);var o=Object(r.useCallback)(function(e){localStorage.setItem(p,JSON.stringify(e))},[]);return{logs:n,addNewLog:function(e){var t=[].concat(Object(d.a)(n),[e]);a(t),o(t)},updateLog:function(e){var t=n.map(function(t){return t.id===e.id?function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(n,!0).forEach(function(t){Object(i.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},t,{},e):t});a(t),o(t)}}}var O=n(16),y=n(2),E=n(14);function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}var j="negative",w="positive";function k(e){var t=e.addNewLog,n=e.defaultLog,o=e.updateLog,c=Object(r.useState)(n&&n.value),l=Object(s.a)(c,2),u=l[0],m=l[1],d=Object(r.useState)(n?n.sentiment:null),g=Object(s.a)(d,2),p=g[0],v=g[1],k=Object(r.useState)(!u),S=Object(s.a)(k,2),P=S[0],x=S[1];return P?a.a.createElement(y.a,{as:"form",onSubmit:function(e){if(e.preventDefault(),n){var r=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(n,!0).forEach(function(t){Object(i.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},n,{value:u,sentiment:p});o(r),x(!1)}else{var a=b()(),c=a.format("dddd MMMM Do YYYY h:mm:ss a");t({id:c,date:a,value:u,sentiment:p}),m(""),v(null)}},py:[2,3]},a.a.createElement(y.a,{mb:2},a.a.createElement(E.a,{htmlFor:"entry"},"What occurred?"),a.a.createElement(E.c,{autoFocus:!0,id:"entry",name:"entry",onChange:function(e){var t=e.target;m(t.value)},value:u})),a.a.createElement(y.d,{justifyContent:"flex-end"},a.a.createElement(y.b,{type:"button",mr:1,onClick:function(){return v(j)},sx:{bg:p===j&&"tomato"}},a.a.createElement(O.a,null)),a.a.createElement(y.b,{type:"button",mr:1,onClick:function(){return v(w)},sx:{bg:p===w&&"limegreen"}},a.a.createElement(O.b,null)),!!n&&a.a.createElement(y.b,{type:"button",variant:"secondary",onClick:function(){m(n?n.value:""),x(!1)},mr:1},"cancel"),a.a.createElement(y.b,{type:"submit",variant:"primary"},"save"))):a.a.createElement(y.c,{sx:{bg:"darkest",mb:3}},a.a.createElement(y.f,null,u),a.a.createElement(y.d,{justifyContent:"space-between",alignItems:"center"},a.a.createElement(y.a,{sx:{fontSize:1,py:2}},a.a.createElement(y.f,null,b()(n.date).format("h:mm:ss a")),a.a.createElement(y.f,null,b()(n.date).fromNow())),a.a.createElement(y.d,{alignItems:"center"},a.a.createElement(y.b,{onClick:function(){return x(!P)},variant:"icon",mr:2},a.a.createElement(f.c,null)),!!p&&a.a.createElement(y.a,{mr:2},p===j?a.a.createElement(O.a,null):a.a.createElement(O.b,null)))))}function S(e){return a.a.createElement(y.a,Object.assign({sx:{p:3,maxWidth:600,margin:"auto"}},e))}var P="ASC",x="DEC";function D(e){var t=e.sort,n=e.setSort;return a.a.createElement(y.a,{pt:[2,4]},a.a.createElement(E.a,{htmlFor:"sorting",mb:1},"Logs sorting"),a.a.createElement(E.b,{id:"sorting",name:"sorting",value:t,onChange:function(e){n(e.target.value)}},a.a.createElement("option",{value:P},"ascending"),a.a.createElement("option",{value:x},"descending")))}function L(e,t){return e.sort(function(e,n){return t===P?b()(e.date).valueOf()-b()(n.date).valueOf():b()(n.date).valueOf()-b()(e.date).valueOf()})}var C={listStyle:"none",p:0,m:0};function Y(e){var t=e.day,n=e.logs,o=e.sort,c=e.updateLog,l=Object(r.useState)(b()(t).isSame(b()(),"day")),i=Object(s.a)(l,2),u=i[0],m=i[1];return a.a.createElement(y.a,{as:"li",sx:{mb:1}},a.a.createElement(y.d,{justifyContent:"space-between",sx:{mb:2}},a.a.createElement(y.e,null,b()(t).format("dddd")),a.a.createElement(y.b,{variant:"outline",onClick:function(){return m(!u)}},a.a.createElement(y.a,{as:u?f.a:f.b,sx:{fontSize:[3,4]}}))),u&&a.a.createElement(y.a,{as:"ul",sx:C},L(n,o).map(function(e){return a.a.createElement(y.a,{as:"li",key:e.id},a.a.createElement(k,{defaultLog:e,updateLog:c}))})))}var M=!1;function W(){var e=v(),t=e.logs,n=e.addNewLog,o=e.updateLog,c=Object(r.useState)(x),l=Object(s.a)(c,2),i=l[0],u=l[1],f=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).reduce(function(e,t){var n=b()(t.date).format("YYYY-MM-DD");return e[n]?e[n].push(t):e[n]=[t],e},{})}(L(t));return a.a.createElement(S,null,a.a.createElement(y.a,{as:"ul",sx:C},a.a.createElement(y.a,{as:"li"},a.a.createElement(k,{addNewLog:n,updateLog:o})),Object.entries(f).map(function(e){var t=Object(s.a)(e,2),n=t[0],r=t[1];return a.a.createElement(Y,{key:n,updateLog:o,logs:r,day:n})})),M&&a.a.createElement(D,{sort:i,setSort:u}))}function N(){var e=Object(r.useState)(b()()),t=Object(s.a)(e,2),n=t[0],o=t[1];return Object(r.useEffect)(function(){var e=setInterval(function(){o(b()())},1e3);return function(){clearInterval(e)}},[o]),a.a.createElement(y.a,null,a.a.createElement(y.a,{sx:{py:[3,6],bg:"bg",backgroundImage:"url(https://images.unsplash.com/photo-1552484586-1a51df66315c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=768&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1024)",backgroundBlendMode:"multiply",backgroundSize:"cover"}},a.a.createElement(S,null,a.a.createElement(y.e,{as:"h1",sx:{bg:"darkest",color:"white",fontSize:[3,4,5],p:1}},n.format("MMMM Do YYYY, h:mm:ss a")))))}function I(){return a.a.createElement("div",null,a.a.createElement(N,null))}var A=n(8),F=n(11),J=n.n(F);function z(){var e=Object(l.a)(["\n        html {\n          background-color: ",";\n        }\n        html,\n        body {\n          margin: 0;\n          padding: 0;\n        }\n      "]);return z=function(){return e},e}function B(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function R(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?B(n,!0).forEach(function(t){Object(i.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):B(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var U=R({},J.a,{colors:R({},J.a.colors,{text:J.a.colors.background,background:"hsl(199, 47%, 20%)",darkest:"hsla(199, 47%, 10%, .7)"}),buttons:{primary:{color:"white",bg:J.a.colors.primary},secondary:{color:"white",bg:J.a.colors.secondary},outline:{color:"tomato",background:"none",border:"2px solid ".concat(J.a.colors.primary)},icon:{bg:"transparent",borderColor:"transparent"}}}),T=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function q(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}var H=document.getElementById("root");c.a.render(a.a.createElement(function(e){return a.a.createElement(u.a,{theme:U},a.a.createElement(A.a,{styles:Object(A.c)(z(),U.colors.background)}),a.a.createElement(y.a,{sx:{fontFamily:"body",color:"text",height:"inherit"}},a.a.createElement(I,null),a.a.createElement(W,null),e.children))},null),H),function(e){if("serviceWorker"in navigator){if(new URL("/Log",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/Log","/service-worker.js");T?(function(e,t){fetch(e).then(function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):q(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):q(t,e)})}}()}},[[29,1,2]]]);
//# sourceMappingURL=main.f48fdcbd.chunk.js.map