(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{7:function(e,t,a){e.exports=a(8)},8:function(e,t,a){"use strict";a.r(t);var n=a(6),r=a(4),l=a(2),c=a(0),u=a.n(c),o=a(5),i=a.n(o),s=a(1),f=a.n(s);function d(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function m(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?d(a,!0).forEach(function(t){Object(r.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):d(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var p="my_logs";function v(e){var t=e.addNewLog,a=e.defaultLog,n=e.updateLog,r=Object(c.useState)(a&&a.value),o=Object(l.a)(r,2),i=o[0],s=o[1],d=Object(c.useState)(!i);return Object(l.a)(d,1)[0]?u.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),a){var r=m({},a,{value:i});n(r)}else{var l=f()(),c=l.format("dddd MMMM Do YYYY h:mm:ss a");t({id:c,date:l,value:i})}s("")},style:{paddingTop:16}},u.a.createElement("label",null,"What happened?",u.a.createElement("br",null),u.a.createElement("textarea",{style:{width:"300px"},onChange:function(e){return s(e.target.value)},value:i})),u.a.createElement("button",{type:"submit",style:{background:"limegreen"}},"save")):u.a.createElement("div",null,u.a.createElement("strong",null,a&&a.id)," \u2014",i)}var b="ASC",g="DEC";function O(e){var t=e.logs,a=e.addNewLog,n=e.updateLog,r=Object(c.useState)(g),o=Object(l.a)(r,2),i=o[0],s=o[1],d=t.sort(function(e,t){return i===b?f()(e.date).valueOf()-f()(t.date).valueOf():f()(t.date).valueOf()-f()(e.date).valueOf()});return u.a.createElement("div",null,u.a.createElement("select",{value:i,onChange:function(e){s(e.target.value)}},u.a.createElement("option",{value:b},"ascending"),u.a.createElement("option",{value:g},"descending")),u.a.createElement("ul",null,u.a.createElement("li",null,u.a.createElement(v,{addNewLog:a,updateLog:n})),d.map(function(e){return u.a.createElement("li",{key:e.id},u.a.createElement(v,{defaultLog:e,updateLog:n}))})))}function E(){var e=Object(c.useState)(f()()),t=Object(l.a)(e,2),a=t[0],n=t[1];return Object(c.useEffect)(function(){var e=setInterval(function(){n(f()())},1e3);return function(){clearInterval(e)}},[n]),u.a.createElement("h1",null,a.format("MMMM Do YYYY, h:mm:ss a"))}function j(){return u.a.createElement("div",null,u.a.createElement(E,null))}var y=document.getElementById("root");i.a.render(u.a.createElement(function(){var e=Object(c.useState)([]),t=Object(l.a)(e,2),a=t[0],r=t[1];Object(c.useEffect)(function(){var e=localStorage.getItem(p);e&&r(JSON.parse(e))},[r]);var o=Object(c.useCallback)(function(e){localStorage.setItem(p,JSON.stringify(e))},[]);return u.a.createElement("div",{className:"App"},u.a.createElement(j,null),u.a.createElement(O,{logs:a,addNewLog:function(e){var t=[].concat(Object(n.a)(a),[e]);r(t),o(t)},updateLog:function(e,t){var n=a.map(function(a){return a.id===e?m({},a,{},t):a});r(n),o(n)}}))},null),y)}},[[7,1,2]]]);
//# sourceMappingURL=main.b036556b.chunk.js.map