(window.webpackJsonp=window.webpackJsonp||[]).push([[107],{"0SUp":function(e,o,t){"use strict";t.r(o),t.d(o,"iosTransitionAnimation",function(){return r}),t.d(o,"shadow",function(){return n});const n=e=>e.shadowRoot||e,r=(e,o,t)=>{const r="opacity",l="translateX",a="back"===t.direction,d="rtl"===o.ownerDocument.dir,i=d?"-99.5%":"99.5%",s=d?"33%":"-33%",c=t.enteringEl,f=t.leavingEl,m=c.querySelector(":scope > ion-content"),u=c.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"),y=c.querySelectorAll(":scope > ion-header > ion-toolbar"),S=new e,b=new e;if(b.addElement(c).duration(t.duration||540).easing(t.easing||"cubic-bezier(0.32,0.72,0,1)").beforeRemoveClass("ion-page-invisible"),f&&o){const t=new e;t.addElement(o),b.add(t)}if(m||0!==y.length||0!==u.length?S.addElement(m).addElement(u):S.addElement(c.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")),b.add(S),a)S.beforeClearStyles([r]).fromTo(l,s,"0%",!0).fromTo(r,.8,1,!0);else if(S.beforeClearStyles([r]).fromTo(l,i,"0%",!0),m){const o=n(m).querySelector(".transition-effect");if(o){const t=o.querySelector(".transition-cover"),n=o.querySelector(".transition-shadow"),l=new e,a=new e,d=new e;l.addElement(o).beforeStyles({opacity:"1"}).afterStyles({opacity:""}),a.addElement(t).beforeClearStyles([r]).fromTo(r,0,.1,!0),d.addElement(n).beforeClearStyles([r]).fromTo(r,.7,.03,!0),S.add(l).add(a).add(d)}}if(y.forEach(o=>{const t=new e,c=new e,f=new e,m=new e,u=new e,y=new e,S=o.querySelector("ion-back-button");if(t.addElement(o),b.add(t),c.addElement(o.querySelector("ion-title")),f.addElement(o.querySelectorAll("ion-buttons,[menuToggle]")),m.addElement(o.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])")),u.addElement(n(o).querySelector(".toolbar-background")),S&&y.addElement(S),t.add(c).add(f).add(m).add(u).add(y),c.fromTo(r,.01,1,!0),f.fromTo(r,.01,1,!0),m.fromTo(r,.01,1,!0),a)c.fromTo(l,s,"0%",!0),m.fromTo(l,s,"0%",!0),y.fromTo(r,.01,1,!0);else if(c.fromTo(l,i,"0%",!0),m.fromTo(l,i,"0%",!0),u.beforeClearStyles([r]).fromTo(r,.01,1,!0),y.fromTo(r,.01,1,!0),S){const o=new e;o.addElement(n(S).querySelector(".button-text")).fromTo(l,d?"-100px":"100px","0px"),t.add(o)}}),f){const o=new e,t=f.querySelector(":scope > ion-content");if(o.addElement(t).addElement(f.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *")),b.add(o),a){if(o.beforeClearStyles([r]).fromTo(l,"0%",d?"-100%":"100%"),t){const l=n(t).querySelector(".transition-effect");if(l){const t=l.querySelector(".transition-cover"),n=l.querySelector(".transition-shadow"),a=new e,d=new e,i=new e;a.addElement(l).beforeStyles({opacity:"1"}).afterStyles({opacity:""}),d.addElement(t).beforeClearStyles([r]).fromTo(r,.1,0,!0),i.addElement(n).beforeClearStyles([r]).fromTo(r,.7,.03,!0),o.add(a).add(d).add(i)}}}else o.fromTo(l,"0%",s,!0).fromTo(r,1,.8,!0);f.querySelectorAll(":scope > ion-header > ion-toolbar").forEach(o=>{const t=new e,i=new e,c=new e,f=new e,m=o.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])"),u=new e,y=new e,S=o.querySelector("ion-back-button");if(t.addElement(o),i.addElement(o.querySelector("ion-title")),c.addElement(o.querySelectorAll("ion-buttons,[menuToggle]")),m.length>0&&f.addElement(m),u.addElement(n(o).querySelector(".toolbar-background")),S&&y.addElement(S),t.add(i).add(c).add(f).add(y).add(u),b.add(t),y.fromTo(r,.99,0),i.fromTo(r,.99,0),c.fromTo(r,.99,0,0),f.fromTo(r,.99,0),a){if(i.fromTo(l,"0%",d?"-100%":"100%"),f.fromTo(l,"0%",d?"-100%":"100%"),u.beforeClearStyles([r]).fromTo(r,1,.01),S){const o=new e;o.addElement(n(S).querySelector(".button-text")),o.fromTo(l,"0%",(d?-124:124)+"px"),t.add(o)}}else i.fromTo(l,"0%",s).afterClearStyles(["transform"]),f.fromTo(l,"0%",s).afterClearStyles(["transform",r]),y.afterClearStyles([r]),i.afterClearStyles([r]),c.afterClearStyles([r])})}return Promise.resolve(b)}}}]);