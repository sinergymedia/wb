(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{VgKV:function(e,t,o){"use strict";o.r(t),o.d(t,"ion_popover",function(){return v});var i=o("YrOr"),n=(o("TJLY"),o("9Z7W"),o("vTwt")),r=o("KSOA"),s=o("1hGh"),p=o("cVTH");const a=(e,t,o)=>{let i="top",n="left";const r=t.querySelector(".popover-content"),s=r.getBoundingClientRect(),p=s.width,a=s.height,d=t.ownerDocument.defaultView.innerWidth,c=t.ownerDocument.defaultView.innerHeight,h=o&&o.target&&o.target.getBoundingClientRect(),m=null!=h&&"top"in h?h.top:c/2-a/2,v=null!=h&&"left"in h?h.left:d/2,f=h&&h.width||0,u=h&&h.height||0,w=t.querySelector(".popover-arrow"),b=w.getBoundingClientRect(),g=b.width,y=b.height;null==h&&(w.style.display="none");const x={top:m+u,left:v+f/2-g/2},D={top:m+u+(y-1),left:v+f/2-p/2};let P=!1,O=!1;D.left<l+25?(P=!0,D.left=l):p+l+D.left+25>d&&(O=!0,D.left=d-p-l,n="right"),m+u+a>c&&m-a>0?(x.top=m-(y+1),D.top=m-a-(y-1),t.className=t.className+" popover-bottom",i="bottom"):m+u+a>c&&(r.style.bottom=l+"%"),w.style.top=x.top+"px",w.style.left=x.left+"px",r.style.top=D.top+"px",r.style.left=D.left+"px",P&&(r.style.left=`calc(${D.left}px + var(--ion-safe-area-left, 0px))`),O&&(r.style.left=`calc(${D.left}px - var(--ion-safe-area-right, 0px))`),r.style.transformOrigin=i+" "+n;const j=new e,k=new e;k.addElement(t.querySelector("ion-backdrop")),k.fromTo("opacity",.01,.08);const E=new e;return E.addElement(t.querySelector(".popover-wrapper")),E.fromTo("opacity",.01,1),Promise.resolve(j.addElement(t).easing("ease").duration(100).add(k).add(E))},l=5,d=(e,t)=>{const o=new e,i=new e;i.addElement(t.querySelector("ion-backdrop"));const n=new e;return n.addElement(t.querySelector(".popover-wrapper")),n.fromTo("opacity",.99,0),i.fromTo("opacity",.08,0),Promise.resolve(o.addElement(t).easing("ease").duration(500).add(i).add(n))},c=(e,t,o)=>{const i=t.ownerDocument,n="rtl"===i.dir;let r="top",s=n?"right":"left";const p=t.querySelector(".popover-content"),a=p.getBoundingClientRect(),l=a.width,d=a.height,c=i.defaultView.innerWidth,m=i.defaultView.innerHeight,v=o&&o.target&&o.target.getBoundingClientRect(),f=null!=v&&"bottom"in v?v.bottom:m/2-d/2,u=v&&v.height||0,w={top:f,left:null!=v&&"left"in v?n?v.left-l+v.width:v.left:c/2-l/2};w.left<h?(w.left=h,s="left"):l+h+w.left>c&&(w.left=c-l-h,s="right"),f+u+d>m&&f-d>0?(w.top=f-d-u,t.className=t.className+" popover-bottom",r="bottom"):f+u+d>m&&(p.style.bottom=h+"px"),p.style.top=w.top+"px",p.style.left=w.left+"px",p.style.transformOrigin=r+" "+s;const b=new e,g=new e;g.addElement(t.querySelector("ion-backdrop")),g.fromTo("opacity",.01,.32);const y=new e;y.addElement(t.querySelector(".popover-wrapper")),y.fromTo("opacity",.01,1);const x=new e;x.addElement(t.querySelector(".popover-content")),x.fromTo("scale",.001,1);const D=new e;return D.addElement(t.querySelector(".popover-viewport")),D.fromTo("opacity",.01,1),Promise.resolve(b.addElement(t).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(300).add(g).add(y).add(x).add(D))},h=12,m=(e,t)=>{const o=new e,i=new e;i.addElement(t.querySelector("ion-backdrop"));const n=new e;return n.addElement(t.querySelector(".popover-wrapper")),n.fromTo("opacity",.99,0),i.fromTo("opacity",.32,0),Promise.resolve(o.addElement(t).easing("ease").duration(500).add(i).add(n))};class v{constructor(e){Object(i.m)(this,e),this.presented=!1,this.mode=Object(i.e)(this),this.keyboardClose=!0,this.backdropDismiss=!0,this.showBackdrop=!0,this.translucent=!1,this.animated=!0,this.onDismiss=e=>{e.stopPropagation(),e.preventDefault(),this.dismiss()},this.onBackdropTap=()=>{this.dismiss(void 0,n.a)},this.onLifecycle=e=>{const t=this.usersElement,o=f[e.type];if(t&&o){const i=new CustomEvent(o,{bubbles:!1,cancelable:!1,detail:e.detail});t.dispatchEvent(i)}},this.didPresent=Object(i.d)(this,"ionPopoverDidPresent",7),this.willPresent=Object(i.d)(this,"ionPopoverWillPresent",7),this.willDismiss=Object(i.d)(this,"ionPopoverWillDismiss",7),this.didDismiss=Object(i.d)(this,"ionPopoverDidDismiss",7)}async present(){if(this.presented)return;const e=this.el.querySelector(".popover-content");if(!e)throw new Error("container is undefined");const t=Object.assign({},this.componentProps,{popover:this.el});return this.usersElement=await Object(s.a)(this.delegate,e,this.component,["popover-viewport",this.el["s-sc"]],t),await Object(p.a)(this.usersElement),Object(n.e)(this,"popoverEnter",a,c,this.event)}async dismiss(e,t){const o=await Object(n.f)(this,e,t,"popoverLeave",d,m,this.event);return o&&await Object(s.b)(this.delegate,this.usersElement),o}onDidDismiss(){return Object(n.g)(this.el,"ionPopoverDidDismiss")}onWillDismiss(){return Object(n.g)(this.el,"ionPopoverWillDismiss")}render(){const e=Object(i.e)(this),{onLifecycle:t}=this;return Object(i.i)(i.a,{"aria-modal":"true","no-router":!0,style:{zIndex:`${2e4+this.overlayIndex}`},class:Object.assign({},Object(r.b)(this.cssClass),{[e]:!0,"popover-translucent":this.translucent}),onIonPopoverDidPresent:t,onIonPopoverWillPresent:t,onIonPopoverWillDismiss:t,onIonPopoverDidDismiss:t,onIonDismiss:this.onDismiss,onIonBackdropTap:this.onBackdropTap},Object(i.i)("ion-backdrop",{tappable:this.backdropDismiss,visible:this.showBackdrop}),Object(i.i)("div",{class:"popover-wrapper"},Object(i.i)("div",{class:"popover-arrow"}),Object(i.i)("div",{class:"popover-content"})))}get el(){return Object(i.f)(this)}static get style(){return".sc-ion-popover-md-h{--background:var(--ion-background-color,#fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:var(--ion-text-color,#000);z-index:1000}.overlay-hidden.sc-ion-popover-md-h{display:none}.popover-wrapper.sc-ion-popover-md{opacity:0;z-index:10}.popover-content.sc-ion-popover-md{display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:auto;z-index:10}.popover-viewport.sc-ion-popover-md{--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px}.sc-ion-popover-md-h{--width:250px;--max-height:90%;--box-shadow:0 5px 5px -3px rgba(0,0,0,0.2),0 8px 10px 1px rgba(0,0,0,0.14),0 3px 14px 2px rgba(0,0,0,0.12)}.popover-content.sc-ion-popover-md{border-radius:4px;-webkit-transform-origin:left top;transform-origin:left top}[dir=rtl].sc-ion-popover-md-h .popover-content.sc-ion-popover-md, [dir=rtl] .sc-ion-popover-md-h .popover-content.sc-ion-popover-md, [dir=rtl].sc-ion-popover-md .popover-content.sc-ion-popover-md{-webkit-transform-origin:right top;transform-origin:right top}.popover-viewport.sc-ion-popover-md{-webkit-transition-delay:.1s;transition-delay:.1s}"}}const f={ionPopoverDidPresent:"ionViewDidEnter",ionPopoverWillPresent:"ionViewWillEnter",ionPopoverWillDismiss:"ionViewWillLeave",ionPopoverDidDismiss:"ionViewDidLeave"}}}]);