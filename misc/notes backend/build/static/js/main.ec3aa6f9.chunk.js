(this.webpackJsonp2c=this.webpackJsonp2c||[]).push([[0],{15:function(t,e,n){t.exports=n(38)},37:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),c=n(14),o=n.n(c),u=n(4),i=n(2),l=function(t){var e=t.note,n=t.toggleImportance,a=e.important?"make not important":"make important";return r.a.createElement("li",{className:"note"},e.content,r.a.createElement("button",{onClick:n},a))},m=function(t){var e=t.message;return null===e?null:r.a.createElement("div",{className:"error"},e)},f={color:"green",fontStyle:"italic",fontSize:16},s=function(){return r.a.createElement("div",{style:f},r.a.createElement("br",null),r.a.createElement("p",null,"Note app, Department of Computer Science, University of Helsinki"))},p=n(3),d=n.n(p),E=function(){return d.a.get("/api/notes").then((function(t){return t.data}))},b=function(t){return d.a.post("/api/notes",t).then((function(t){return t.data}))},v=function(t,e){return d.a.put("".concat("/api/notes","/").concat(t),e).then((function(t){return t.data}))},h=function(){var t=Object(a.useState)([]),e=Object(i.a)(t,2),n=e[0],c=e[1],o=Object(a.useState)("a new note..."),f=Object(i.a)(o,2),p=f[0],d=f[1],h=Object(a.useState)(!0),g=Object(i.a)(h,2),O=g[0],j=g[1],S=Object(a.useState)(null),k=Object(i.a)(S,2),y=k[0],w=k[1];Object(a.useEffect)((function(){E().then((function(t){c(t)}))}),[]);var N=O?n:n.filter((function(t){return t.important}));return r.a.createElement("div",null,r.a.createElement("h1",null,"Notes"),r.a.createElement(m,{message:y}),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return j(!O)}},"show ",O?"important":"all")),r.a.createElement("ul",null,N.map((function(t){return r.a.createElement(l,{key:t.id,note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),a=Object(u.a)(Object(u.a)({},e),{},{important:!e.important});v(t,a).then((function(e){c(n.map((function(n){return n.id!==t?n:e})))})).catch((function(a){w("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){w(null)}),5e3),c(n.filter((function(e){return e.id!==t})))}))}(t.id)}})}))),r.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:p,date:(new Date).toISOString(),important:Math.random()<.5};b(e).then((function(t){c(n.concat(t)),d("")}))}},r.a.createElement("input",{value:p,onChange:function(t){d(t.target.value)}}),r.a.createElement("button",{type:"submit"},"save")),r.a.createElement(s,null))};n(37);o.a.render(r.a.createElement(h,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.ec3aa6f9.chunk.js.map