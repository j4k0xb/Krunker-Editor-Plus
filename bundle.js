"use strict";(()=>{var go=Object.create;var Se=Object.defineProperty;var bo=Object.getOwnPropertyDescriptor;var vo=Object.getOwnPropertyNames;var So=Object.getPrototypeOf,Po=Object.prototype.hasOwnProperty;var Oo=(e,t)=>()=>(e&&(t=e(e=0)),t);var ko=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),To=(e,t)=>{for(var o in t)Se(e,o,{get:t[o],enumerable:!0})},xo=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of vo(t))!Po.call(e,n)&&n!==o&&Se(e,n,{get:()=>t[n],enumerable:!(r=bo(t,n))||r.enumerable});return e};var re=(e,t,o)=>(o=e!=null?go(So(e)):{},xo(t||!e||!e.__esModule?Se(o,"default",{value:e,enumerable:!0}):o,e));var F=ko((de,it)=>{(function(e,t){typeof de=="object"&&typeof it<"u"?t(de):typeof define=="function"&&define.amd?define(["exports"],t):(e=typeof globalThis<"u"?globalThis:e||self,t(e["fast-equals"]={}))})(de,function(e){"use strict";function t(a){return function(f,u,p,h,v,T,E){return a(f,u,E)}}function o(a){return function(f,u,p,h){if(!f||!u||typeof f!="object"||typeof u!="object")return a(f,u,p,h);var v=h.get(f),T=h.get(u);if(v&&T)return v===u&&T===f;h.set(f,u),h.set(u,f);var E=a(f,u,p,h);return h.delete(f),h.delete(u),E}}function r(a,c){var f={};for(var u in a)f[u]=a[u];for(var u in c)f[u]=c[u];return f}function n(a){return a.constructor===Object||a.constructor==null}function i(a){return typeof a.then=="function"}function s(a,c){return a===c||a!==a&&c!==c}var d="[object Arguments]",D="[object Boolean]",ee="[object Date]",Yt="[object RegExp]",Ft="[object Map]",Zt="[object Number]",Xt="[object Object]",Qt="[object Set]",eo="[object String]",Ue=Object.prototype.toString;function L(a){var c=a.areArraysEqual,f=a.areDatesEqual,u=a.areMapsEqual,p=a.areObjectsEqual,h=a.areRegExpsEqual,v=a.areSetsEqual,T=a.createIsNestedEqual,E=T(C);function C(y,g,j){if(y===g)return!0;if(!y||!g||typeof y!="object"||typeof g!="object")return y!==y&&g!==g;if(n(y)&&n(g))return p(y,g,E,j);var Ve=Array.isArray(y),Be=Array.isArray(g);if(Ve||Be)return Ve===Be&&c(y,g,E,j);var w=Ue.call(y);return w!==Ue.call(g)?!1:w===ee?f(y,g,E,j):w===Yt?h(y,g,E,j):w===Ft?u(y,g,E,j):w===Qt?v(y,g,E,j):w===Xt||w===d?i(y)||i(g)?!1:p(y,g,E,j):w===D||w===Zt||w===eo?s(y.valueOf(),g.valueOf()):!1}return C}function Ke(a,c,f,u){var p=a.length;if(c.length!==p)return!1;for(;p-- >0;)if(!f(a[p],c[p],p,p,a,c,u))return!1;return!0}var to=o(Ke);function Ae(a,c){return s(a.valueOf(),c.valueOf())}function Le(a,c,f,u){var p=a.size===c.size;if(!p)return!1;if(!a.size)return!0;var h={},v=0;return a.forEach(function(T,E){if(p){var C=!1,y=0;c.forEach(function(g,j){!C&&!h[y]&&(C=f(E,j,v,y,a,c,u)&&f(T,g,E,j,a,c,u))&&(h[y]=!0),y++}),v++,p=C}}),p}var oo=o(Le),ro="_owner",no=Object.prototype.hasOwnProperty;function qe(a,c,f,u){var p=Object.keys(a),h=p.length;if(Object.keys(c).length!==h)return!1;for(var v;h-- >0;){if(v=p[h],v===ro){var T=!!a.$$typeof,E=!!c.$$typeof;if((T||E)&&T!==E)return!1}if(!no.call(c,v)||!f(a[v],c[v],v,v,a,c,u))return!1}return!0}var io=o(qe);function ze(a,c){return a.source===c.source&&a.flags===c.flags}function Ne(a,c,f,u){var p=a.size===c.size;if(!p)return!1;if(!a.size)return!0;var h={};return a.forEach(function(v,T){if(p){var E=!1,C=0;c.forEach(function(y,g){!E&&!h[C]&&(E=f(v,y,T,g,a,c,u))&&(h[C]=!0),C++}),p=E}}),p}var ao=o(Ne),te=Object.freeze({areArraysEqual:Ke,areDatesEqual:Ae,areMapsEqual:Le,areObjectsEqual:qe,areRegExpsEqual:ze,areSetsEqual:Ne,createIsNestedEqual:t}),oe=Object.freeze({areArraysEqual:to,areDatesEqual:Ae,areMapsEqual:oo,areObjectsEqual:io,areRegExpsEqual:ze,areSetsEqual:ao,createIsNestedEqual:t}),so=L(te);function co(a,c){return so(a,c,void 0)}var lo=L(r(te,{createIsNestedEqual:function(){return s}}));function uo(a,c){return lo(a,c,void 0)}var po=L(oe);function fo(a,c){return po(a,c,new WeakMap)}var mo=L(r(oe,{createIsNestedEqual:function(){return s}}));function yo(a,c){return mo(a,c,new WeakMap)}function ho(a){return L(r(te,a(te)))}function Eo(a){var c=L(r(oe,a(oe)));return function(f,u,p){return p===void 0&&(p=new WeakMap),c(f,u,p)}}e.circularDeepEqual=fo,e.circularShallowEqual=yo,e.createCustomCircularEqual=Eo,e.createCustomEqual=ho,e.deepEqual=co,e.sameValueZeroEqual=s,e.shallowEqual=uo,Object.defineProperty(e,"__esModule",{value:!0})})});var Lt={};To(Lt,{css:()=>At});var At,qt=Oo(()=>{"use strict";At=`.spinner{width:70px;text-align:center;position:absolute}.spinner .bounce1{-webkit-animation-delay:-.32s;animation-delay:-.32s}.spinner .bounce2{-webkit-animation-delay:-.16s;animation-delay:-.16s}.spinner>div{width:15px;height:15px;background-color:#fff;border-radius:100%;display:inline-block;-webkit-animation:sk-bouncedelay 1.4s infinite ease-in-out both;animation:sk-bouncedelay 1.4s infinite ease-in-out both}@-webkit-keyframes sk-bouncedelay{0%,80%,to{-webkit-transform:scale(0)}40%{-webkit-transform:scale(1)}}@keyframes sk-bouncedelay{0%,80%,to{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}#chat-container{visibility:hidden;position:fixed;z-index:1;bottom:50px;width:280px;margin:0 20px 10px}#chat-list{max-height:500px;overflow-y:auto;overflow-x:hidden;position:relative;direction:rtl;text-align:left;background-color:#0006;border-radius:5px 5px 0 0}.chat-item{display:block;background:none;padding:5px 10px;direction:ltr;font-size:13px;line-height:1.5rem;word-break:break-word;box-shadow:none}.chat-link{text-decoration:underline;color:#1cb8ff}.chat-link:visited{color:#364963}#chat-input{background-color:#0006;color:#fff;border-radius:0 0 5px 5px;margin-top:2px;margin-bottom:8px;font-size:13px}#chat-input::placeholder{color:#dadada}button{background-color:#444;color:#1a1a1a;display:inline-block;padding:5px 10px;margin-top:10px;font-size:16px;border-radius:4px;border:none;box-shadow:2px 3px 8px #00000059;width:90px;text-align:center;cursor:pointer}button:hover{background-color:#6a6a6a}button.primary{background-color:#5490df}button.primary:hover{background-color:#94baeb}button.secondary{background-color:#8483f6}button.secondary:hover{background-color:#cbcafb}button.cancel{background-color:#f14d59}button.cancel:hover{background-color:#f7949b}.popupTitle{text-align:center;margin-bottom:10px;color:#fff}.joinPop{pointer-events:auto;border-radius:10px;background-color:#222227;padding:15px;text-align:left;position:absolute;top:40%;left:50%;transform:translate(-50%,-60%);color:#fff;width:372px}.joinInput{margin-top:5px;width:100%;font-size:20px;border-radius:4px;box-sizing:border-box;padding:5px}#joinPassword{width:100%;font-size:20px;border-radius:4px;box-sizing:border-box;padding:5px}.joinBtn{width:100%}#hotbar{grid-template-columns:45% 10% 45%}#playbar{grid-template-columns:repeat(auto-fit,minmax(10px,1fr))}#multiplayerIcon{font-size:25px}.warning{color:#f14d59!important}.button-row{display:flex;justify-content:center;gap:20px}.button-row>button{width:100%}.slider:before{transition:.2s}.vector3 input[type=text]{padding:4px;border-radius:4px;font-size:10px;background-color:#bbb}#epVersion{background:linear-gradient(45deg,#0d9fc7,#c500ff);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:inline-block}#epVersion:hover{cursor:pointer}.menuShortTabNew{width:20%}
`;document.head.appendChild(document.createElement("style")).appendChild(document.createTextNode(At))});var Rr=typeof process!="undefined"&&process.release.name==="node";var M={EU:{ws:"wss://editor-plus.fly.dev",ping:"https://dynamodb.eu-west-1.amazonaws.com"}},Co=20,$=1e3/Co,_r=60*10,jo=32,wo=new RegExp(String.raw`^\w+:[a-f\d]{${jo}}\$?$`),$e=new RegExp(String.raw`(?:https://krunker\.io/editor\.html\?room=)?(${wo.source.slice(1,-1)})`);var ne={[0]:5,[1]:10,[2]:20},Je=32,We=16,Ye=200;var Fe=100;var Ze="#f1f1f1";var m={name:localStorage.getItem("krunker_username")||"",renderCoopOutlines:!0,playerOpacity:1,streamerMode:!1,autoChatScroll:!0,region:null};function Xe(){let e=GM_getValue("settings");e?Object.assign(m,JSON.parse(e)):KE.setSettings("degToRad",!0),Object.keys(M).includes(m.region)||R("region",Object.keys(M)[0])}function R(e,t){m[e]=t,GM_setValue("settings",JSON.stringify(m))}function _(e){return String(e).replace(/&/g,"&amp;").replace(/'/g,"&apos;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function q(e){let t=document.createElement("span");return t.textContent=e,t.innerHTML}function Qe(e){e=q(e);let t=/(\bhttps?:\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;e=e.replace(t,'<a class="chatLink" href="$1" target="_blank">$1</a>');let o=/\b(\w*)::(\d+)\b/gi;return e=e.replace(o,'<a class="chatLink" href="javascript:EP.selectObjectFromSID($2)">$1::$2</a>'),e.replace(/\n/g,"<br>")}function G(e){if(!e)return history.replaceState("","",location.pathname);m.streamerMode&&(e="*".repeat(e.length),GM_setValue("lastRoomId",e)),history.replaceState("","",`${location.pathname}?room=${e}`)}function H(e){if(e||(e=KE.objectSelected(!0)),!e)return[];let t=KE.objGroups[e.uuid];return t?KE.objInsts.filter(o=>t.objects.includes(o.boundingMesh.uuid)):[]}function J(){let e=KE.objInsts;KE.objInsts=[];let{config:t}=KE.getMapExport(!0);return KE.objInsts=e,t||{}}var tt={clearMapOnDisconnect:!0,password:"",size:ne[0]},ie=class{constructor(t,o){this.id=t;this.settings=o;this.players=[];this.messages=[];this.lastSID=0}addChatMessage(t){this.messages.push(t),this.messages.length>Fe&&this.messages.shift()}get host(){return this.players[0]}findPlayer(t){return this.players.find(o=>o.id===t)}};var z,W,Y,S;function Do(){z=ae("parseGUIs"),W=ae("customGUIs"),Y=ae("decodeStream"),S=ae("hitBoxMaterial"),z.removePrivateKeys=e=>e}Object.assign(unsafeWindow,{loadWebpackModules:Do});function ae(e){let t=Object.values(unsafeWindow.__webpack_require__.c).map(o=>o.exports).find(o=>(typeof o=="object"||typeof o=="function")&&o!==null&&e in o);return t||console.error(`Module with exports ${e} not found`),t}var se=class{constructor(t){this.pos=[0,0,0];this.rot=[0,0,0];var o,r,n;this.room=t.room,this.name=t.name,this.color=(o=t.color)!=null?o:"#000000",this.id=(r=t.id)!=null?r:-1,this.role=(n=t.role)!=null?n:0,this.selectObject(t.selectedSID),this.move(t.pos,t.rot)}move(t=[0,0,0],o=[0,0,0]){this.pos=[...t],this.rot=[...o]}selectObject(t){this.selectedSID=t}get isHost(){return this.id===0}};var ot,N=class{constructor(t,o,r){this.name=t;this.color=o;this.object=r;KE.scene.add(r)}static create(t,o,r=[0,0,0],n=[0,0,0]){return ot||(ot=new KE.THREE.OBJLoader),new Promise(i=>{ot.load("https://assets.krunker.io/models/spawn_0.obj",s=>{let d=new N(t,o,s);d.createLabel(),d.updateMaterial(m.playerOpacity),d.move(r,n),i(d)})})}updateMaterial(t){let o=this.object.children[0];for(let r of o.material)r.opacity=t,r.transparent=t<1,r.color.set(this.color),r.fog=!1;this.object.children[1].visible=t>0}delete(){KE.scene.remove(this.object)}move(t,o){var D,ee;let{Tween:r,Easing:n}=unsafeWindow.TWEEN;(D=this.posTween)==null||D.stop(),(ee=this.rotTween)==null||ee.stop();let i=this.object.position,s={x:i.x,y:i.y+10,z:i.z},d={x:0,y:this.object.rotation.y,z:0};this.posTween=new r(s).to(new KE.THREE.Vector3(...t),$*3).easing(n.Sinusoidal.Out).onUpdate(()=>this.object.position.set(s.x,s.y-10,s.z)).onComplete(()=>this.posTween=void 0).start(),this.rotTween=new r(d).to({x:0,y:o[1],z:0},$*3).easing(n.Sinusoidal.Out).onUpdate(()=>this.object.rotation.set(0,d.y,0)).onComplete(()=>this.rotTween=void 0).start()}createLabel(){let t=Mo(this.name,this.color,80);if(!t)return;let o=new KE.THREE.CanvasTexture(t);o.magFilter=KE.THREE.NearestFilter,o.wrapS=o.wrapS=KE.THREE.ClampToEdgeWrapping;let r=new KE.THREE.SpriteMaterial({map:o,depthTest:!1,fog:!1}),n=new KE.THREE.Sprite(r);n.position.copy(this.object.position),n.position.y+=12,this.object.add(n),n.onBeforeRender=()=>{let i=new KE.THREE.Vector3;KE.camera.getWorldPosition(i);let s=this.object.position.distanceTo(i)/20,d=Math.max(4,s);n.scale.x=t.width*.003*d,n.scale.y=t.height*.003*d}}};function Mo(e,t,o){let r=document.createElement("canvas").getContext("2d");if(!r)return;let n=`${o}px gamefont`,i=o+120;r.canvas.height=i,r.font=n;let d=r.measureText(e).width+50;return r.canvas.width=d,r.font=n,r.textBaseline="middle",r.textAlign="center",r.fillStyle="black",r.fillText(e,d/2+5,i/2+5),r.fillStyle=t,r.fillText(e,d/2,i/2),r.canvas}var ce=class extends se{constructor(o){super(o);this.isYou=!1;this.room=o.room,o.isYou&&(this.isYou=!0),this.outlineMaterial=new KE.THREE.MeshBasicMaterial({color:this.color,side:KE.THREE.BackSide,transparent:!0,opacity:.5})}move(o,r){var n;super.move(o,r),(n=this.model)==null||n.move(o,r)}async createModel(){return this.model=await N.create(this.name,this.color,this.pos,this.rot),this.model}selectObject(o){if(super.selectObject(o),this.isYou)return;o==null&&this.removeOutline();let r=o?this.room.getObject(o):void 0;r&&this.setOutline(r)}setOutline(o){this.outlineMesh&&this.removeOutline();let r=new KE.THREE.Mesh(o.defaultMesh.geometry,this.outlineMaterial);r.userData.owner=o,r.visible=!1,this.outlineMesh=r,o.outlines||(o.outlines=[]),o.outlines.push(r),KE.scene.add(r)}removeOutline(){if(!this.outlineMesh)return;let o=this.outlineMesh.userData.owner;if(!o.outlines)return;let r=o.outlines.indexOf(this.outlineMesh);r!==-1&&o.outlines.splice(r,1),KE.scene.remove(this.outlineMesh),this.outlineMesh=void 0}};var l;function Pe(e){l=e}function le(e,t){let o=new ce({room:t,id:e[0],name:e[1],color:e[2],isYou:e[3],role:e[4],pos:e[5][0],rot:e[5][1]});return o.selectObject(e[6]),o.isYou?Pe(o):o.createModel(),t.players.push(o),o}var rt={execute(e,t,o,r){let n=e.room.findPlayer(t);n==null||n.move(o,r)}};var nt={execute(e,...t){t.forEach(o=>e.room.addChatMessage(o))}};var Oe=re(F());function ue(e,t,o){let r=new Set([...Object.keys(e),...Object.keys(t)]),n={};for(let i of r){let s=e[i],d=t[i];(0,Oe.deepEqual)(s,d)||(n[i]=d,o&&(0,Oe.deepEqual)(d,o[i])&&(n[i]=void 0))}return n}function Z(e,t,o){for(let[r,n]of Object.entries(t))n==null?o?e[r]=o[r]:delete e[r]:e[r]=n}var Et=re(F());var Q=re(F());var pe={},fe,U={},me=[],B=[],V=[],xe=[],X,ke,Ce=!1,Te=0;function he(){U={},me=[],B=[],V=[],xe=[],pe={},fe=void 0,X=void 0,Te=0}function Io(){let e=KE.objectSelected()||void 0;if(e){let t=[e.userData.owner,...H(e)];st(t)}}function Ro(){ke=setInterval(()=>{Ao(),qo(),Go()},250)}function _o(){ke&&clearInterval(ke)}function Go(){let e=z.parseGUIs(W.customGUIs);X&&!(0,Q.deepEqual)(X,e)&&O(19,e),X=e}function Ho(){var t;let e=me.map(o=>({...o.serialize(),sid:o.sid}));if(e.length){let r=((t=KE.objectSelected())==null?void 0:t.userData.owner.sid)===e[e.length-1].sid;O(9,r,...e)}me=[]}function Uo(){if(!l)return;let e=KE.controls.getObject().position.toArray(),t=KE.controls.getRotation();t=[t[1],t[0],0];let o=!(0,Q.shallowEqual)(e,l.pos),r=!(0,Q.shallowEqual)(t,l.rot);(o||r)&&(O(17,o?e:null,r?t:null),l.move(e,t))}function Ko(){var o;if(!l)return;let e=(o=KE.objectSelected())==null?void 0:o.userData.owner.sid;l.selectedSID!=e&&(l.selectObject(e),(e==null||e>0)&&O(12,e))}function st(e){let t=[];for(let o of e){let r=U[o.uuid],n=o.serialize();if(!r){U[o.uuid]=n;continue}if(o.synced){let i=ue(r,n);Object.keys(i).length&&t.push({sid:o.sid,...i}),U[o.uuid]=n}}t.length&&O(11,...t)}function Ao(){let e=KE.objInsts.filter(t=>!t.partial).slice(0,200);st(e),e.forEach(t=>t.partial=!0),e.length||KE.objInsts.forEach(t=>t.partial=!1)}function Lo(){let e=[];for(let t=V.length-1;t>=0;t--){let{oldPlaceholder:o,placeholder:r}=V[t];if(!r.synced||o&&!o.synced)continue;if(!KE.objGroups[r.boundingMesh.uuid]){console.warn("invalid created group",o,r),V.splice(t,1);continue}let n=H(r.boundingMesh);n.every(i=>i.synced)&&(e.push([o==null?void 0:o.sid,r.sid,...n.map(i=>i.sid)]),V.splice(t,1))}e.length&&O(13,...e)}function at(e,t){let o=[];for(let r=e.length-1;r>=0;r--){let n=e[r];n.synced&&(o.push(n.sid),e.splice(r,1))}o.length&&O(t,...o)}function qo(){let e={},t={};Object.keys(pe).length&&(e=ue(pe,KE.mapConfig,KE.defaultMapConfig));let o=J();fe&&(t=ue(fe,o)),(Object.keys(e).length||Object.keys(t).length)&&O(8,e,t),we(),De(o)}function ct(){Ce=!0,he(),Ro()}function lt(){Ce=!1,he(),_o()}function dt(){!Ce||Date.now()-Te<$||(at(B,10),Ho(),at(xe,14),Lo(),Io(),Ko(),Uo(),Te=Date.now())}function ut(e){l&&(e.sid=l.room.nextSid(),me.push(e))}function pt(e){delete U[e.uuid],B.push(e)}function je(e,t){if(t){let o=B.indexOf(t);o!==-1&&B.splice(o,1)}V.push({oldPlaceholder:t,placeholder:e})}function ft(e){xe.push(e),delete U[e.uuid],H(e.boundingMesh).forEach(o=>delete U[o.uuid])}function mt(e){X=e}function yt(e,t){U[e]=t}function we(){pe={...KE.mapConfig}}function De(e){fe=e!=null?e:J()}function ht(e,t){let o=B.find(r=>r.sid===e);o&&(o.sid=t)}var gt={objectAdded:!0,objectRemoved:!0,allowHideTransform:!0,createGroup:!0,removeGroup:!0,clearMap:!0,importMap:!0},x={...gt},A=!1;function bt(){No(),er(),Zo(),Xo(),Qo(),Wo(),zo(),tr(),Fo(),Yo(),Jo(),Bo(),Vo(),$o()}function k(e,t){let o=x;x={...gt,...t},e(),x=o}function K(e){A=e}function zo(){try{KE.getNearPosition()}catch(e){console.warn("Patched faulty KE.getNearPosition"),KE.getNearPosition=function(){let t=new this.THREE.Quaternion,o=new this.THREE.Vector3(0,-5,-30);o.applyQuaternion(this.camera.getWorldQuaternion(t));let r=new this.THREE.Vector3;return this.camera.getWorldPosition(r),r.add(o),[Math.round(r.x),Math.round(r.y),Math.round(r.z)]}}}function No(){S.hitBoxMaterial.color.set(4991687),S.prototype.partial=!1,Object.defineProperty(S.prototype,"synced",{get(){return this.sid>0}});let{serialize:e}=S.prototype;S.prototype.serialize=function(...o){let r=e.apply(this,o);return this.rot.some(n=>n)&&(r.r=this.rot.map(n=>n.round(4))),this.texOffX>0&&(r.tox=this.texOffX.round(4)),this.texOffY>0&&(r.toy=this.texOffY.round(4)),r};let{deserialize:t}=S;S.deserialize=o=>{let r=t(o);return r.sid=typeof o.sid=="number"?o.sid:0,r}}function Vo(){let e=KE.removeGroup.bind(KE);KE.removeGroup=t=>{A&&x.removeGroup&&(t||(t=KE.objectSelected(!0)),t&&ft(t.userData.owner)),k(()=>e(t),{objectRemoved:!1})}}function Bo(){let e=KE.createGroup.bind(KE);KE.createGroup=(...t)=>{var o,r;if(e(...t),A&&x.createGroup){let n=(o=KE.objectSelected(!0))==null?void 0:o.userData.owner,i=(r=t[0])==null?void 0:r.userData.owner;n&&je(n,i)}}}function $o(){let e=KE.duplicateGroup.bind(KE);KE.duplicateGroup=t=>{var o;if(k(()=>e(t),{createGroup:!1}),A&&x.createGroup){let r=(o=KE.objectSelected(!0))==null?void 0:o.userData.owner;r&&je(r)}}}function Jo(){let e=KE.updateGroups.bind(KE);KE.updateGroups=()=>{e(),dt()}}function Wo(){let e=KE.hideTransform.bind(KE);KE.hideTransform=()=>{if(!A||x.allowHideTransform)return e()}}function Yo(){KE.on("objectRemoved",e=>{var t,o;(t=e.outlines)==null||t.forEach(r=>KE.scene.remove(r)),A&&x.objectRemoved&&pt(e),(o=l)==null||o.room.deleteSID(e.sid)})}function Fo(){KE.on("objectAdded",e=>{var t;A&&x.objectAdded&&KE.objInsts.includes(e)&&ut(e),(t=l)==null||t.room.setSID(e)})}function Zo(){let e=KE.clearMap.bind(KE);KE.clearMap=()=>{x.clearMap&&e()}}function Xo(){let e=KE.importMap.bind(KE);KE.importMap=(...t)=>{let o=A;if(K(!1),e(...t),he(),o&&x.importMap){KE.objInsts.forEach((n,i)=>n.sid=i+1);let r=Me();O(20,r)}K(o)}}function Qo(){let e=KE.testMap.bind(KE);KE.testMap=t=>{let o=KE.getMapExport.bind(KE);KE.getMapExport=()=>{let r=o();if(t)return l?_(r):r;let n=JSON.parse(r);return n.name=q(n.name),n.welMsg&&(n.welMsg=q(n.welMsg)),JSON.stringify(n)},e(t),KE.getMapExport=o}}function er(){KE.disableHistory(),KE.initHistory=()=>{KE.historyInterval=setInterval(()=>{if(!(KE.settings.disableHistory||KE.settings.historyLimit<=0))for(let e of KE.objInsts){let t=KE.objHistory[e.uuid],o=e.serialize();t&&!(0,Et.deepEqual)(t,o)&&KE.addToHistory("update",e,KE.objHistory[e.uuid]),KE.objHistory[e.uuid]=o}},2e3)},KE.initHistory()}function tr(){let{update:e}=S.prototype;S.prototype.update=function(t){var o;e.call(this,t),(o=this.outlines)==null||o.forEach(r=>{if(r.visible=m.renderCoopOutlines,!m.renderCoopOutlines)return;let n=r.material;n.userData.t=(n.userData.t||0)+t/100,n.opacity=.7+.3*Math.sin(n.userData.t),r.geometry=this.defaultMesh.geometry,r.position.set(0,this.boundingMesh.scale.y/2,0),r.position.applyQuaternion(this.boundingMesh.quaternion),r.position.add(this.boundingMesh.position),r.quaternion.copy(this.boundingMesh.quaternion),r.rotation.copy(this.boundingMesh.rotation);let i=this.size.map(s=>1+1/s);r.scale.fromArray(i)})}}var vt={execute(e,t,o){let r={objects:[]},n=Object.keys(t).length>0,i=Object.keys(o).length>0;if(n&&(Z(KE.mapConfig,t,KE.defaultMapConfig),Object.assign(r,KE.mapConfig),we()),i){r.config=J(),Z(r.config,o),De(r.config);for(let s of Object.keys(KE.serverConfig))KE.serverConfig[s]={};GUI.panel.state.refresh("panel_left_essential")}k(()=>KE.importMap(JSON.stringify(r)),{clearMap:!1,importMap:!1})}};var St={execute(e,t){let{room:o}=e,r=o.findPlayer(t);r&&(o.removePlayer(r),windows[100].generatePlayers())}};var Pt={execute(e,...t){t.forEach(o=>or(e,o))}};function or(e,t){let o=t.shift(),r=t.shift(),n=e.room.getObject(r);if(!n)return;let i=o?e.room.getObject(o):void 0,s=KE.objInsts.filter(d=>t.includes(d.sid));s.length!==t.length&&console.warn("different group children length",t,s),i&&nr(i),e.selectedSID!=null&&e.selectedSID===o&&KE.attachTransform(n),rr(n,s),i&&e.room.players.filter(d=>i.sid===d.selectedSID).forEach(d=>d.selectObject(n.sid))}function rr(e,t){KE.objGroups[e.boundingMesh.uuid]={owner:e.boundingMesh,pos:e.boundingMesh.position.clone(),scale:e.boundingMesh.scale.clone(),rotY:e.boundingMesh.rotation.y,objects:t.map(o=>o.boundingMesh.uuid)}}function nr(e){k(()=>KE.removeObject(e,!0),{removeGroup:!1,objectRemoved:!1,allowHideTransform:!1})}var Ot={execute(e,...t){var r;let o=(r=KE.objectSelected())==null?void 0:r.userData.owner.sid;for(let n of t){let i=e.room.getObject(n);if(!i)continue;let s=H(i.boundingMesh),d=o===n||s.some(D=>D.sid===o);k(()=>KE.removeGroup(i.boundingMesh),{removeGroup:!1,objectRemoved:!1,allowHideTransform:d})}}};var kt={execute(e,t){W.customGUIs=z.parseGUIs(t,!0),mt(t),GUI.panel.state.refresh("panel_right_gui")}};var Tt={execute(e,t){e.room.import(t)}};var xt={execute(e,...t){k(()=>t.forEach(ir),{objectAdded:!1})}};function ir(e){let t=S.deserialize(e);KE.addObject(t,!0,!1),t.uuid=t.boundingMesh.uuid=t.sid.toString()}var Ct={execute(e,t,o){let r=e.room.findPlayer(t);r==null||r.selectObject(o!=null?o:void 0)}};var jt={execute(e,...t){var r;let o=(r=KE.objectSelected())==null?void 0:r.userData.owner.sid;for(let n of t){let i=e.room.getObject(n);if(!i)continue;let s=o===n;k(()=>KE.removeObject(i,!s,!1),{objectRemoved:!1}),delete KE.objGroups[i.boundingMesh.uuid]}}};var wt=re(F());var Dt={execute(e,...t){for(let o of t){let r=e.room.getObject(o.sid);r&&cr(r,o)}}},ar=["openEnded","team","texStretch","frameCount","bakeAcc","fullcone","faces","weaponId","poster","cmpSpwn","teamOnly","tilesX","tilesZ"],sr=["mSize","mYOff","mROff","itemID","assetID"];function cr(e,t){var n;delete t.sid,dr(e,t),ur(e);let o=e.serialize();if(Object.keys(t).length){Z(o,t);let i=S.deserialize({...o});for(let s of KE.configVal)try{e[s]=i[s]}catch(d){}lr(e,i)}((n=KE.objectSelected())==null?void 0:n.userData.owner.sid)===e.sid&&KE.updateObjConfigGUI(),KE.settings.disableHistory||(KE.objHistory[e.uuid]=o),yt(e.uuid,o)}function lr(e,t){try{e.regen(!0)}catch(o){}try{ar.some(o=>!(0,wt.deepEqual)(e[o],t[o]))&&e.regen()}catch(o){}try{sr.some(o=>typeof t[o]=="number"&&e[o].round(4)!==t[o].round(4))&&e.regenM()}catch(o){}}function dr(e,t){t.p&&(e.boundingMesh.position.fromArray(t.p),delete t.p),t.r&&(e.boundingMesh.rotation.fromArray(t.r),delete t.r),t.s&&(e.boundingMesh.scale.fromArray(t.s),delete t.s)}function ur(e){let t=e.boundingMesh,o=KE.objGroups[t.uuid];o&&(o.pos=t.position.clone(),o.scale=t.scale.clone(),o.rotY=t.rotation.clone().reorder("YXZ").y)}var Mt={execute(e,...t){le(t,e.room),windows[100].generatePlayers()}};var It={execute(){K(!1),KE.clearMap()}};var Ee=class extends ie{constructor(o,r){super(o,r);this.sidHashmap={}}removePlayer(o){var n;let r=this.players.indexOf(o);r!==-1&&this.players.splice(r,1),(n=o.model)==null||n.delete(),o.removeOutline(),o.isYou?Pe(void 0):o.isHost&&alert("Host ended room")}clearPlayers(){for(let o=this.players.length-1;o>=0;o--)this.removePlayer(this.players[o])}import(o){this.sidHashmap={},o.map.objects.forEach(r=>{var n;return r.meshUUID=(n=r.sid)==null?void 0:n.toString()}),k(()=>KE.importMap(JSON.stringify(o)),{importMap:!1})}addChatMessage(o){super.addChatMessage(o);let r=document.getElementById("chat-list"),n=r.scrollHeight-r.scrollTop-r.clientHeight,i=document.createElement("div");i.className="chat-item";for(let s of o){let d=document.createElement("span");d.innerHTML=Qe(s[0]),d.style.color=s[1]||Ze,i.appendChild(d)}r.appendChild(i),(n<100||m.autoChatScroll)&&i.scrollIntoView()}nextSid(){return--this.lastSID}getObject(o){return this.sidHashmap[o]}setSID(o,r){r!=null&&(o.sid=r),this.sidHashmap[o.sid]=o}deleteSID(o){delete this.sidHashmap[o]}};var Rt={execute(e,t,o,r,n){let i=new Ee(t,n);r&&i.import(r),KE.objInsts.forEach(s=>i.setSID(s)),o.forEach(s=>le(s,i)),l&&(l.isHost?KE.copyToClipboard(`https://krunker.io/editor.html?room=${i.id}`):KE.controls.getObject().position.fromArray(i.host.pos),pr(l),closeWindow(),ct(),K(!0))}};function pr(e){document.querySelector("#multiplayerIcon").setAttribute("style",`color: ${e.color} !important`),windows[100].generatePlayers(),G(e.room.id);let o=document.querySelector("#chat-container");o.style.visibility="visible";let r=document.querySelector("#chat-list");r.textContent=""}var _t={execute(e,t){alert(t)}};var Gt={execute(e,t){var n;let{room:o}=e,r=(n=KE.objectSelected())==null?void 0:n.userData.owner.sid;for(let i=0;i<t.length;i+=2){let[s,d]=[t[i],t[i+1]],D=o.getObject(s);if(!D){ht(s,d);continue}o.deleteSID(s),o.setSID(D,d),r===s&&(e==null||e.selectObject(d))}}};var Ht={execute(e,t,o){GM_setValue(t,o)}};var Ie=new Map([[3,Rt],[6,Mt],[17,rt],[4,nt],[2,St],[7,_t],[5,Gt],[9,xt],[10,jt],[11,Dt],[12,Ct],[13,Pt],[14,Ot],[8,vt],[19,kt],[16,It],[18,Ht],[20,Tt]]);function Ut(e){try{let[t,...o]=Y.decode(new Uint8Array(e)),r=Ie.get(t);r?r.execute(l,...o):console.warn("received unregistered event",t)}catch(t){console.error("event handling error",t)}}var b;async function Re(e){var t;if((b==null?void 0:b.readyState)===WebSocket.CONNECTING)throw new Error("already connecting");return(t=document.querySelector(".spinner"))==null||t.setAttribute("style",""),b=fr(M[e].ws),b.addEventListener("open",()=>console.debug("Connected")),b.addEventListener("error",()=>alert("Connection error")),b.addEventListener("close",mr),b.addEventListener("message",({data:o})=>Ut(o)),new Promise((o,r)=>{Ie.set(15,{execute:()=>o()}),b.addEventListener("close",r)})}function ge(){return new Promise(e=>{if(!b)return e();b.addEventListener("close",()=>e()),b.close()})}function O(e,...t){(b==null?void 0:b.readyState)===WebSocket.OPEN&&b.send(Y.encode([e,...t]))}function fr(e){let t=GM_getValue("token",""),o=m.name,r=new URLSearchParams({version:"4.14.4"});return o&&r.set("name",o),t&&r.set("token",t),b=new WebSocket(`${e}?${r.toString()}`),b.binaryType="arraybuffer",b}function mr(e){var o,r;e.reason&&alert(e.reason),console.debug("Disconnected"),b=void 0,lt(),K(!1),l&&G(),windows[100].generatePlayers(),(o=document.querySelector("#multiplayerIcon"))==null||o.setAttribute("style",""),(r=document.querySelector(".spinner"))==null||r.setAttribute("style","visibility: hidden");let t=document.querySelector("#chat-container");t.style.visibility="hidden",l&&(!l.isHost&&l.room.settings.clearMapOnDisconnect&&KE.clearMap(),l.room.clearPlayers())}var _e={shading:{name:"Toggle Shading",object:{val:"Shift + B"},keyCode:"B",key:"val",type:"key",action:()=>KE.toggleProp("ambient")},createcube:{name:"Create Cube",object:{val:"C"},keyCode:"c",key:"val",type:"key",action:()=>be(0)},creategate:{name:"Create Gate",object:{val:"G"},keyCode:"g",key:"val",type:"key",args:[[],!0],action:()=>be(24),onChange:console.log},createtrigger:{name:"Create Trigger",object:{val:"R"},keyCode:"r",key:"val",type:"key",action:()=>be(29)},createteleporter:{name:"Create Teleporter",object:{val:"T"},keyCode:"t",key:"val",type:"key",action:()=>be(27)},players:{name:"Open Player List",object:{val:"Tab"},keyCode:"Tab",key:"val",type:"key",action:()=>showWindow(101)},chat:{name:"Chat",object:{val:"Enter"},keyCode:"Enter",key:"val",type:"key",action:()=>{var e;return(e=document.querySelector("#chat-input"))==null?void 0:e.focus()}}};function be(e){KE.addObject(S.defaultFromType(e,KE.getNearPosition()))}function Kt(){addEventListener("keydown",e=>{if(KE.isTyping(e)||!KE.enabled||e.ctrlKey)return;let t=Object.values(_e).find(({keyCode:o})=>o===e.key);t&&(t.action(),e.preventDefault(),e.stopImmediatePropagation())})}var I;function zt(){document.body.oncontextmenu=null,KE.renderer.domElement.oncontextmenu=()=>!1,Promise.resolve().then(()=>qt()),Er(),hr(),yr(),Sr(),vr(),Pr(),br(),gr()}function Nt(){document.title+="+";let e=document.querySelector('link[rel~="icon"]'),t=e.cloneNode(!0);e.href=t.href="https://i.imgur.com/WdYKPAE.png",document.head.appendChild(t)}function yr(){var o;I=document.createElement("div"),I.classList.add("joinPop"),(o=document.querySelector("#popupHolder"))==null||o.appendChild(I);let e=unsafeWindow.resetPops;unsafeWindow.resetPops=()=>{e(),I.style.display="none"};let t=unsafeWindow.clearPops;unsafeWindow.clearPops=()=>{t(),I.style.display="none"}}function Vt(){unsafeWindow.resetPops(),I.style.display="block",I.innerHTML=`<div class='popupTitle'>Join Room</div>
  <input id='roomId' class='joinInput' type='text' placeholder='Link or room ID' autofocus>
  <button id='joinPopupBtn' class='primary joinBtn' onclick='clearPops()'>Join</button>`;let e=document.querySelector("#joinPopupBtn");e.onclick=()=>{let t=document.querySelector("#roomId").value;G(Ge(t)),location.reload()}}function Bt(){unsafeWindow.resetPops(),I.style.display="block",I.innerHTML=`<div class='popupTitle'>Join Room</div>
  <input id='joinPassword' class='joinInput' type='password' placeholder='Enter Password' autofocus>
  <button id='joinPopupBtn' class='primary joinBtn' onclick='clearPops()'>Join</button>`;let e=document.querySelector("#joinPopupBtn");e.onclick=ve}function hr(){let e=GUI._html.input.fixed.vector3.bind(GUI);GUI._html.input.fixed.vector3=(...t)=>e(...t).replace(/ type="number"/g,' type="text"'),GUI.update.number.change=t=>{let o=0;try{o=Function(`"use strict";return (${t.value})`)()}catch(r){}t.value=(Number.isFinite(o)?o:0).toString()},GUI._html.input.resizable.password=(t,o,r)=>`<input class="inlineInput" type="password" placeholder="${_(r)}" value="${_(t)}" oninput="${_(o)}" maxlength="${Je}" onchange="GUI.update.field(this)">`}function Er(){document.querySelector("#playbar").innerHTML+=`<div class="playbarItemR" onclick="showWindow(100)" title="Multiplayer Editing">
  <i id="multiplayerIcon" class="material-icons">group_add</i>
</div>`;let e=document.querySelector("#versionTxt");e.innerHTML=`<span id="epVersion" title="Click To Update Editor+

  By Jakob#8686">Editor+ v4.14.4</span> | ${e.innerHTML}`,e.addEventListener("click",()=>{GM_setValue("lastModified",0),location.reload()})}function gr(){windows[100]={header:"Player List",width:"600px",getPlayerCount(){var e,t;return`[${((e=l)==null?void 0:e.room.players.length)||0}/${((t=l)==null?void 0:t.room.settings.size)||0}]`},generatePlayers(){if(!l)return"";let e=l.room.players.map(r=>{var n;return`
<div class='section' style='font-size:25px'>
${r.isHost?'<i class="material-icons">stars</i>':""}
<span style='color:${r.color}'>${q(r.name)}</span>

${r.isYou?"":`
<div class='searchBtn' title='Teleport' style='float:right; width: initial; margin-top: 0px' onclick='closeWindow();EP.tpToPlayer(${r.id})'><i class='material-icons' style='color: #202020; font-size: 25px'>explore</i></div>
<div class='searchBtn' title='Select object' style='float:right; width: initial;  margin-top: 0px' onclick='closeWindow();EP.selectObjectOfPlayer(${r.id})'><i class='material-icons' style='color: #202020; font-size: 25px'>view_in_ar</i></div>
`}

${(n=l)!=null&&n.isHost&&!r.isYou?`
<div class='searchBtn' title='Kick' style='float:right; width: initial; margin-top: 0px' onclick='closeWindow();EP.punish(${r.id}, "kick")'><i class='material-icons' style='color: #202020; font-size: 25px'>person_remove</i></div>
<div class='searchBtn' title='Ban' style='float:right; width: initial; margin-top: 0px' onclick='closeWindow();EP.punish(${r.id}, "ban")'><i class='material-icons' style='color: #202020; font-size: 25px'>person_off</i></div>`:""}
</div>`}).join(""),t=document.querySelector("#playerList");t&&(t.innerHTML=e);let o=document.querySelector("#playerCount");return o&&(o.textContent=this.getPlayerCount()),e},gen(){return`<div class='windowHeader'>
      <div>Player List</div>
      <div id='playerCount' style='float:right;'>${this.getPlayerCount()}</div>
  </div>
  <div class='windowBody'>
      <span id='playerList'>${this.generatePlayers()}</span>
  </div>`}}}function br(){var o;let e=document.createElement("div");e.id="chat-container",e.innerHTML=`<div id='chat-list'></div>
<input id='chat-input' class='inlineInput' type='text' placeholder='Enter Message' maxlength='${Ye}' autocomplete='off'>`,(o=document.querySelector("#center"))==null||o.appendChild(e),document.querySelector("#chat-input").addEventListener("keydown",r=>{r.key==="Enter"&&He()})}function vr(){windows[2].tabNames.push("Editor+"),GUI._window.settings["editor+"]={gen(){return GUI._window.settings["editor+"].blueprint={name:{name:"Multiplayer Name",object:m,key:"name",type:"text",onChange(e,t){R("name",t.slice(0,We))}},autoChatScroll:{name:"Auto Chat Scroll",object:m,key:"autoChatScroll",type:"switch",onChange(e,t){R("autoChatScroll",t)}},renderCoopOutlines:{name:"Render Selected Object Outline",object:m,key:"renderCoopOutlines",type:"switch",onChange(e,t){R("renderCoopOutlines",t)}},streamerMode:{name:"Streamer Mode (hide room ID)",object:m,key:"streamerMode",type:"switch",onChange(e,t){R("streamerMode",t)}},playerOpacity:{name:"Player Opacity",object:m,key:"playerOpacity",type:"slider",args:[0,1,.1],onChange(e,t){var o;R("playerOpacity",t.round(1)),(o=l)==null||o.room.players.forEach(r=>{var n;return(n=r.model)==null?void 0:n.updateMaterial(t)})}}},GUI._build(["_window","settings","editor+","blueprint"])}}}function Sr(){windows[0].tabNames.push("Editor+"),GUI._window.controls["editor+"]={gen(){return GUI._window.controls["editor+"].blueprint=_e,GUI._build(["_window","controls","editor+","blueprint"])}}}function Pr(){let t=GM_getValue("token")?1:null,o=ne[t||0];GUI.roomSettings={settings:{...tt},gen(){return GUI.roomSettings.blueprint={rule:{type:"rule"},players:{name:"Players",object:this.settings,key:"size",type:"slider",args:[1,o,1]},password:{name:"Room Password",object:this.settings,key:"password",type:"password",args:["Enter Password"]},serverRegion:{name:"Server Region",object:m,key:"region",type:"select",args:[Object.keys(M).map(r=>({name:r,value:r}))],onChange(r,n){R("region",n)}},clearMapOnDisconnect:{name:"Clear map on disconnect",object:this.settings,key:"clearMapOnDisconnect",type:"switch"},rule2:{type:"rule"}},GUI._build(["roomSettings","blueprint"])}},windows[99]={header:"Multiplayer editing",width:"600px",gen:()=>`<div class="spinner" style="visibility: hidden">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
</div>
<div class="windowHeader" style="text-align: center;">
    <div>Multiplayer Editing</div>
</div>
<div class="windowBody">
    <div class="warning section">Only invite people you completely trust<br>
        they have full control over the map and can steal it or mess it up</div>
    ${GUI.roomSettings.gen()}
    <div class="section button-row">
        <button id="inviteBtn" class="primary" onclick="EP.copyRoomURL() || EP.host()">Invite</button>
        <button class="primary" onclick="EP.joinPrompt()">Join</button>
        <button class="secondary" onclick="EP.disconnect()">Disconnect</button>
    </div>
</div>`}}var Or={disconnect:ge,host:Cr,join:$t,joinPrompt:xr,copyRoomURL:kr,sendChat:He,punish:Dr,tpToPlayer:jr,selectObjectOfPlayer:wr,selectObjectFromSID:Jt,quoteAttribute:_,settings:m};Object.assign(unsafeWindow,{EP:Or});function kr(){return l?(KE.copyToClipboard(`https://krunker.io/editor.html?room=${l.room.id}`),document.querySelector("#inviteBtn").textContent="Copied",!0):!1}function Ge(e){let t=e.match($e);return t==null?void 0:t[1]}async function Tr(){try{let e=await navigator.clipboard.readText();return Ge(e)}catch(e){console.error(e)}}async function xr(){let e=await Tr();if(e){G(e),location.reload();return}Vt()}async function $t(e,t=""){let o=e.split(":")[0];await ge(),await Re(o),O(1,e,t)}function ve(){var o;let e=new URLSearchParams(location.search).get("room");if(e&&/^\*+$/.test(e)&&(e=GM_getValue("lastRoomId")),!e)return;let t=(o=document.querySelector("#joinPassword"))==null?void 0:o.value;if(e.endsWith("$")&&!t)return Bt();$t(e,t)}async function Cr(){await ge(),await Re(m.region||Object.keys(M)[0]),KE.objInsts.forEach((t,o)=>t.sid=o+1);let e=Me();O(0,e,GUI.roomSettings.settings)}function jr(e){var o;let t=(o=l)==null?void 0:o.room.findPlayer(e);t&&KE.controls.getObject().position.fromArray(t.pos)}function wr(e){var o;let t=(o=l)==null?void 0:o.room.findPlayer(e);(t==null?void 0:t.selectedSID)!=null?Jt(t.selectedSID):KE.hideTransform()}function Jt(e){var o;let t=(o=l)==null?void 0:o.room.getObject(e);t&&KE.attachTransform(t)}function Dr(e,t){O(16,e,t)}function Me(){let e=KE.save(!0);for(let t of e.map.objects)delete t.meshUUID,delete t.objUUID;delete e.history,delete e.selected,e.groups={};for(let t of Object.keys(KE.objGroups)){let o=KE.objGroups[t].owner,r=H(o).map(n=>String(n.sid));e.groups[o.userData.owner.sid]={ids:r}}return e}function He(){var r;let e=document.querySelector("#chat-input"),t=e.value,o=(r=KE.objectSelected())==null?void 0:r.userData.owner;if(o){let n=o.objType.toLowerCase();t=t.replace(/@obj/gim,`${n}::${o.sid}`)}t.length&&(O(4,t),e.value=""),e.blur()}addEventListener("editor-plus-init",e=>{let t=e.detail.replace(/=(.{0,10})\([^)]{1,5}\).{1,4}init.{1,4}editor.{0,4};/,"$&window.__webpack_require__=$1;loadWebpackModules();").replace(/\[(["']text["'],["']select-one["']\])/,'["password",$1').replace(/(?<=value=['"]{1,2}[+$]).+?(?=[+}])/g,"EP.quoteAttribute($&)");new Function(t)()});function Mr(){KE.connected||KE.initConnection(),Xe(),Kt(),bt(),zt(),Nt(),ve(),console.log("Editor+ loaded")}var Wt;Object.defineProperty(unsafeWindow,"KE",{get:()=>Wt,set(e){Wt=e,Mr()}});})();
