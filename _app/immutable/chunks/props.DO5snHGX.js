import{S as T,o as Z,a as $,s as m,b as J,c as h,U as c,g as N,d as P,e as C,f as V,h as Q,i as W,j as X,r as B,k as U,p as Y,l as x,m as k,E as p,H as ee,n as re,q as ae,t as M,u as te,v as ne,L as fe,w as j,B as ie,R as se,x as G,y as ue,P as le,z as ve,A as _e,C as H,D as de,F as ce,G as oe,I as ge,J as ye,K as be}from"./runtime.nP1E8Gge.js";import{c as he}from"./store.BQNrfC_v.js";function w(f,u=null,y){if(typeof f!="object"||f===null||T in f)return f;const b=Q(f);if(b!==Z&&b!==$)return f;var i=new Map,v=W(f),_=m(0);v&&i.set("length",m(f.length));var d;return new Proxy(f,{defineProperty(n,e,r){(!("value"in r)||r.configurable===!1||r.enumerable===!1||r.writable===!1)&&J();var a=i.get(e);return a===void 0?(a=m(r.value),i.set(e,a)):h(a,w(r.value,d)),!0},deleteProperty(n,e){var r=i.get(e);if(r===void 0)e in n&&i.set(e,m(c));else{if(v&&typeof e=="string"){var a=i.get("length"),t=Number(e);Number.isInteger(t)&&t<a.v&&h(a,t)}h(r,c),K(_)}return!0},get(n,e,r){var o;if(e===T)return f;var a=i.get(e),t=e in n;if(a===void 0&&(!t||(o=N(n,e))!=null&&o.writable)&&(a=m(w(t?n[e]:c,d)),i.set(e,a)),a!==void 0){var s=P(a);return s===c?void 0:s}return Reflect.get(n,e,r)},getOwnPropertyDescriptor(n,e){var r=Reflect.getOwnPropertyDescriptor(n,e);if(r&&"value"in r){var a=i.get(e);a&&(r.value=P(a))}else if(r===void 0){var t=i.get(e),s=t==null?void 0:t.v;if(t!==void 0&&s!==c)return{enumerable:!0,configurable:!0,value:s,writable:!0}}return r},has(n,e){var s;if(e===T)return!0;var r=i.get(e),a=r!==void 0&&r.v!==c||Reflect.has(n,e);if(r!==void 0||C!==null&&(!a||(s=N(n,e))!=null&&s.writable)){r===void 0&&(r=m(a?w(n[e],d):c),i.set(e,r));var t=P(r);if(t===c)return!1}return a},set(n,e,r,a){var E;var t=i.get(e),s=e in n;if(v&&e==="length")for(var o=r;o<t.v;o+=1){var R=i.get(o+"");R!==void 0?h(R,c):o in n&&(R=m(c),i.set(o+"",R))}t===void 0?(!s||(E=N(n,e))!=null&&E.writable)&&(t=m(void 0),h(t,w(r,d)),i.set(e,t)):(s=t.v!==c,h(t,w(r,d)));var g=Reflect.getOwnPropertyDescriptor(n,e);if(g!=null&&g.set&&g.set.call(a,r),!s){if(v&&typeof e=="string"){var S=i.get("length"),A=Number(e);Number.isInteger(A)&&A>=S.v&&h(S,A+1)}K(_)}return!0},ownKeys(n){P(_);var e=Reflect.ownKeys(n).filter(t=>{var s=i.get(t);return s===void 0||s.v!==c});for(var[r,a]of i)a.v!==c&&!(r in n)&&e.push(r);return e},setPrototypeOf(){V()}})}function K(f,u=1){h(f,f.v+u)}function Re(f,u,y,b=null,i=!1){x&&k();var v=f,_=null,d=null,n=null,e=i?p:0;X(()=>{if(n===(n=!!u()))return;let r=!1;if(x){const a=v.data===ee;n===a&&(v=re(),ae(v),M(!1),r=!0)}n?(_?B(_):_=U(()=>y(v)),d&&Y(d,()=>{d=null})):(d?B(d):b&&(d=U(()=>b(v))),_&&Y(_,()=>{_=null})),r&&M(!0)},e),x&&(v=te)}function z(f){for(var u=C,y=C;u!==null&&!(u.f&(ie|se));)u=u.parent;try{return G(u),f()}finally{G(y)}}function Ee(f,u,y,b){var q;var i=(y&ge)!==0,v=!ue||(y&le)!==0,_=(y&ve)!==0,d=(y&ye)!==0,n=!1,e;_?[e,n]=he(()=>f[u]):e=f[u];var r=T in f||_e in f,a=((q=N(f,u))==null?void 0:q.set)??(r&&_&&u in f?l=>f[u]=l:void 0),t=b,s=!0,o=!1,R=()=>(o=!0,s&&(s=!1,d?t=j(b):t=b),t);e===void 0&&b!==void 0&&(a&&v&&ne(),e=R(),a&&a(e));var g;if(v)g=()=>{var l=f[u];return l===void 0?R():(s=!0,o=!1,l)};else{var S=z(()=>(i?H:de)(()=>f[u]));S.f|=fe,g=()=>{var l=P(S);return l!==void 0&&(t=void 0),l===void 0?t:l}}if(!(y&ce))return g;if(a){var A=f.$$legacy;return function(l,I){return arguments.length>0?((!v||!I||A||n)&&a(I?g():l),l):g()}}var E=!1,F=!1,D=be(e),O=z(()=>H(()=>{var l=g(),I=P(D);return E?(E=!1,F=!0,I):(F=!1,D.v=l)}));return i||(O.equals=oe),function(l,I){if(arguments.length>0){const L=I?P(O):v&&_?w(l):l;return O.equals(L)||(E=!0,h(D,L),o&&t!==void 0&&(t=L),j(()=>P(O))),l}return P(O)}}export{w as a,Re as i,Ee as p};
