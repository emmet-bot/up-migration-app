(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,455587,729084,595157,e=>{"use strict";var t=e.i(365801),r=e.i(742710);let o=(0,t.proxy)({isLegalCheckboxChecked:!1}),i={state:o,subscribe:e=>(0,t.subscribe)(o,()=>e(o)),subscribeKey:(e,t)=>(0,r.subscribeKey)(o,e,t),setIsLegalCheckboxChecked(e){o.isLegalCheckboxChecked=e}};e.s(["OptionsStateController",0,i],455587),e.i(353845);var s=e.i(604148),n=e.i(654479);e.i(713724);var a=e.i(56350),l=e.i(82283);e.i(404041);var c=e.i(645975);e.i(145967);var d=s;e.i(582768);var h=e.i(120119);e.i(728547);var u=e.i(829389);e.i(494693);var p=e.i(765090);e.i(852634),e.i(839009);var g=e.i(459088),b=e.i(162611);let f=b.css`
  label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    column-gap: ${({spacing:e})=>e[2]};
  }

  label > input[type='checkbox'] {
    height: 0;
    width: 0;
    opacity: 0;
    position: absolute;
  }

  label > span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    border: 1px solid ${({colors:e})=>e.neutrals400};
    color: ${({colors:e})=>e.white};
    background-color: transparent;
    will-change: border-color, background-color;
  }

  label > span > wui-icon {
    opacity: 0;
    will-change: opacity;
  }

  label > input[type='checkbox']:checked + span > wui-icon {
    color: ${({colors:e})=>e.white};
  }

  label > input[type='checkbox']:not(:checked) > span > wui-icon {
    color: ${({colors:e})=>e.neutrals900};
  }

  label > input[type='checkbox']:checked + span > wui-icon {
    opacity: 1;
  }

  /* -- Sizes --------------------------------------------------- */
  label[data-size='lg'] > span {
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
    border-radius: ${({borderRadius:e})=>e[10]};
  }

  label[data-size='md'] > span {
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  label[data-size='sm'] > span {
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
    border-radius: ${({borderRadius:e})=>e[1]};
  }

  /* -- Focus states --------------------------------------------------- */
  label > input[type='checkbox']:focus-visible + span,
  label > input[type='checkbox']:focus + span {
    border: 1px solid ${({tokens:e})=>e.core.borderAccentPrimary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  /* -- Checked states --------------------------------------------------- */
  label > input[type='checkbox']:checked + span {
    background-color: ${({tokens:e})=>e.core.iconAccentPrimary};
    border: 1px solid transparent;
  }

  /* -- Hover states --------------------------------------------------- */
  input[type='checkbox']:not(:checked):not(:disabled) + span:hover {
    border: 1px solid ${({colors:e})=>e.neutrals700};
    background-color: ${({colors:e})=>e.neutrals800};
    box-shadow: none;
  }

  input[type='checkbox']:checked:not(:disabled) + span:hover {
    border: 1px solid transparent;
    background-color: ${({colors:e})=>e.accent080};
    box-shadow: none;
  }

  /* -- Disabled state --------------------------------------------------- */
  label > input[type='checkbox']:checked:disabled + span {
    border: 1px solid transparent;
    opacity: 0.3;
  }

  label > input[type='checkbox']:not(:checked):disabled + span {
    border: 1px solid ${({colors:e})=>e.neutrals700};
  }

  label:has(input[type='checkbox']:disabled) {
    cursor: auto;
  }

  label > input[type='checkbox']:disabled + span {
    cursor: not-allowed;
  }
`;var v=function(e,t,r,o){var i,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(s<3?i(n):s>3?i(t,r,n):i(t,r))||n);return s>3&&n&&Object.defineProperty(t,r,n),n};let y={lg:"md",md:"sm",sm:"sm"},m=class extends d.LitElement{constructor(){super(...arguments),this.inputElementRef=(0,p.createRef)(),this.checked=void 0,this.disabled=!1,this.size="md"}render(){let e=y[this.size];return n.html`
      <label data-size=${this.size}>
        <input
          ${(0,p.ref)(this.inputElementRef)}
          ?checked=${(0,u.ifDefined)(this.checked)}
          ?disabled=${this.disabled}
          type="checkbox"
          @change=${this.dispatchChangeEvent}
        />
        <span>
          <wui-icon name="checkmarkBold" size=${e}></wui-icon>
        </span>
        <slot></slot>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("checkboxChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};m.styles=[g.resetStyles,f],v([(0,h.property)({type:Boolean})],m.prototype,"checked",void 0),v([(0,h.property)({type:Boolean})],m.prototype,"disabled",void 0),v([(0,h.property)()],m.prototype,"size",void 0),m=v([(0,c.customElement)("wui-checkbox")],m),e.i(249536);let x=b.css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  wui-checkbox {
    padding: ${({spacing:e})=>e["3"]};
  }
  a {
    text-decoration: none;
    color: ${({tokens:e})=>e.theme.textSecondary};
    font-weight: 500;
  }
`;var w=function(e,t,r,o){var i,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(s<3?i(n):s>3?i(t,r,n):i(t,r))||n);return s>3&&n&&Object.defineProperty(t,r,n),n};let k=class extends s.LitElement{constructor(){super(),this.unsubscribe=[],this.checked=i.state.isLegalCheckboxChecked,this.unsubscribe.push(i.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=l.OptionsController.state,r=l.OptionsController.state.features?.legalCheckbox;return(e||t)&&r?n.html`
      <wui-checkbox
        ?checked=${this.checked}
        @checkboxChange=${this.onCheckboxChange.bind(this)}
        data-testid="wui-checkbox"
      >
        <wui-text color="secondary" variant="sm-regular" align="left">
          I agree to our ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
        </wui-text>
      </wui-checkbox>
    `:null}andTemplate(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=l.OptionsController.state;return e&&t?"and":""}termsTemplate(){let{termsConditionsUrl:e}=l.OptionsController.state;return e?n.html`<a rel="noreferrer" target="_blank" href=${e}>terms of service</a>`:null}privacyTemplate(){let{privacyPolicyUrl:e}=l.OptionsController.state;return e?n.html`<a rel="noreferrer" target="_blank" href=${e}>privacy policy</a>`:null}onCheckboxChange(){i.setIsLegalCheckboxChecked(!this.checked)}};k.styles=[x],w([(0,a.state)()],k.prototype,"checked",void 0),k=w([(0,c.customElement)("w3m-legal-checkbox")],k),e.s([],729084);var C=s;let O=b.css`
  :host {
    display: block;
    width: 100px;
    height: 100px;
  }

  svg {
    width: 100px;
    height: 100px;
  }

  rect {
    fill: none;
    stroke: ${e=>e.colors.accent100};
    stroke-width: 3px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var $=function(e,t,r,o){var i,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(s<3?i(n):s>3?i(t,r,n):i(t,r))||n);return s>3&&n&&Object.defineProperty(t,r,n),n};let z=class extends C.LitElement{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){let e=this.radius>50?50:this.radius,t=36-e;return n.html`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${e}
          stroke-dasharray="${116+t} ${245+t}"
          stroke-dashoffset=${360+1.75*t}
        />
      </svg>
    `}};z.styles=[g.resetStyles,O],$([(0,h.property)({type:Number})],z.prototype,"radius",void 0),z=$([(0,c.customElement)("wui-loading-thumbnail")],z),e.s([],595157)},366350,e=>{"use strict";var t={exports:{}};function r(e){try{return JSON.stringify(e)}catch{return'"[Circular]"'}}let o=function(e,t,o){var i=o&&o.stringify||r;if("object"==typeof e&&null!==e){var s=t.length+1;if(1===s)return e;var n=Array(s);n[0]=i(e);for(var a=1;a<s;a++)n[a]=i(t[a]);return n.join(" ")}if("string"!=typeof e)return e;var l=t.length;if(0===l)return e;for(var c="",d=0,h=-1,u=e&&e.length||0,p=0;p<u;){if(37===e.charCodeAt(p)&&p+1<u){switch(h=h>-1?h:0,e.charCodeAt(p+1)){case 100:case 102:if(d>=l||null==t[d])break;h<p&&(c+=e.slice(h,p)),c+=Number(t[d]),h=p+2,p++;break;case 105:if(d>=l||null==t[d])break;h<p&&(c+=e.slice(h,p)),c+=Math.floor(Number(t[d])),h=p+2,p++;break;case 79:case 111:case 106:if(d>=l||void 0===t[d])break;h<p&&(c+=e.slice(h,p));var g=typeof t[d];if("string"===g){c+="'"+t[d]+"'",h=p+2,p++;break}if("function"===g){c+=t[d].name||"<anonymous>",h=p+2,p++;break}c+=i(t[d]),h=p+2,p++;break;case 115:if(d>=l)break;h<p&&(c+=e.slice(h,p)),c+=String(t[d]),h=p+2,p++;break;case 37:h<p&&(c+=e.slice(h,p)),c+="%",h=p+2,p++,d--}++d}++p}return -1===h?e:(h<u&&(c+=e.slice(h)),c)};t.exports=d;let i=function(){function e(e){return"u">typeof e&&e}try{return"u">typeof globalThis||Object.defineProperty(Object.prototype,"globalThis",{get:function(){return delete Object.prototype.globalThis,this.globalThis=this},configurable:!0}),globalThis}catch{return e(self)||e(window)||e(this)||{}}}().console||{};function s(e,t){return"silent"===e?1/0:t.levels.values[e]}let n=Symbol("pino.logFuncs"),a=Symbol("pino.hierarchy"),l={error:"log",fatal:"error",warn:"error",info:"log",debug:"log",trace:"log"};function c(e,t){let r={logger:t,parent:e[a]};t[a]=r}function d(e){var t,r,o;let a,g,b;(e=e||{}).browser=e.browser||{};let f=e.browser.transmit;if(f&&"function"!=typeof f.send)throw Error("pino: transmit option must have a send function");let x=e.browser.write||i;e.browser.write&&(e.browser.asObject=!0);let w=e.serializers||{},k=(t=e.browser.serialize,Array.isArray(t)?t.filter(function(e){return"!stdSerializers.err"!==e}):!0===t&&Object.keys(w)),C=e.browser.serialize;Array.isArray(e.browser.serialize)&&e.browser.serialize.indexOf("!stdSerializers.err")>-1&&(C=!1);let O=Object.keys(e.customLevels||{}),$=["error","fatal","warn","info","debug","trace"].concat(O);"function"==typeof x&&$.forEach(function(e){x[e]=x}),(!1===e.enabled||e.browser.disabled)&&(e.level="silent");let z=e.level||"info",L=Object.create(x);L.log||(L.log=v),a={},$.forEach(e=>{a[e]=x[e]?x[e]:i[e]||i[l[e]||"log"]||v}),L[n]=a,c({},L),Object.defineProperty(L,"levelVal",{get:function(){return s(this.level,this)}}),Object.defineProperty(L,"level",{get:function(){return this._level},set:function(e){if("silent"!==e&&!this.levels.values[e])throw Error("unknown level "+e);this._level=e,h(this,E,L,"error"),h(this,E,L,"fatal"),h(this,E,L,"warn"),h(this,E,L,"info"),h(this,E,L,"debug"),h(this,E,L,"trace"),O.forEach(e=>{h(this,E,L,e)})}});let E={transmit:f,serialize:k,asObject:e.browser.asObject,asObjectBindingsOnly:e.browser.asObjectBindingsOnly,formatters:e.browser.formatters,levels:$,timestamp:"function"==typeof(r=e).timestamp?r.timestamp:!1===r.timestamp?y:m,messageKey:e.messageKey||"msg",onChild:e.onChild||v};function j(t,r,o){if(!r)throw Error("missing bindings for child Pino");o=o||{},k&&r.serializers&&(o.serializers=r.serializers);let i=o.serializers;if(k&&i){var s=Object.assign({},w,i),n=!0===e.browser.serialize?Object.keys(s):k;delete r.serializers,u([r],n,s,this._stdErrSerialize)}function a(e){this._childLevel=(0|e._childLevel)+1,this.bindings=r,s&&(this.serializers=s,this._serialize=n),f&&(this._logEvent=p([].concat(e._logEvent.bindings,r)))}a.prototype=this;let l=new a(this);return c(this,l),l.child=function(...e){return j.call(this,t,...e)},l.level=o.level||this.level,t.onChild(l),l}return g=e.customLevels||{},L.levels={values:Object.assign({},d.levels.values,g),labels:Object.assign({},d.levels.labels,(b={},Object.keys(o=g).forEach(function(e){b[o[e]]=e}),b))},L.level=z,L.isLevelEnabled=function(e){return!!this.levels.values[e]&&this.levels.values[e]>=this.levels.values[this.level]},L.setMaxListeners=L.getMaxListeners=L.emit=L.addListener=L.on=L.prependListener=L.once=L.prependOnceListener=L.removeListener=L.removeAllListeners=L.listeners=L.listenerCount=L.eventNames=L.write=L.flush=v,L.serializers=w,L._serialize=k,L._stdErrSerialize=C,L.child=function(...e){return j.call(this,E,...e)},f&&(L._logEvent=p()),L}function h(e,t,r,l){var c,d,h,g,b,f,y;if(Object.defineProperty(e,l,{value:s(e.level,r)>s(l,r)?v:r[n][l],writable:!0,enumerable:!0,configurable:!0}),e[l]===v){if(!t.transmit)return;let o=s(t.transmit.level||e.level,r);if(s(l,r)<o)return}e[l]=(c=e,d=t,h=r,g=l,b=c[n][g],function(){let e=d.timestamp(),t=Array(arguments.length),r=Object.getPrototypeOf&&Object.getPrototypeOf(this)===i?i:this;for(var n=0;n<t.length;n++)t[n]=arguments[n];var a=!1;if(d.serialize&&(u(t,this._serialize,this.serializers,this._stdErrSerialize),a=!0),d.asObject||d.formatters?b.call(r,...function(e,t,r,i,s){let{level:n,log:a=e=>e}=s.formatters||{},l=r.slice(),c=l[0],d={},h=(0|e._childLevel)+1;if((h<1&&(h=1),i&&(d.time=i),n)?Object.assign(d,n(t,e.levels.values[t])):d.level=e.levels.values[t],s.asObjectBindingsOnly){if(null!==c&&"object"==typeof c)for(;h--&&"object"==typeof l[0];)Object.assign(d,l.shift());return[a(d),...l]}if(null!==c&&"object"==typeof c){for(;h--&&"object"==typeof l[0];)Object.assign(d,l.shift());c=l.length?o(l.shift(),l):void 0}else"string"==typeof c&&(c=o(l.shift(),l));return void 0!==c&&(d[s.messageKey]=c),[a(d)]}(this,g,t,e,d)):b.apply(r,t),d.transmit){let r=d.transmit.level||c._level,o=s(r,h),i=s(g,h);if(i<o)return;!function(e,t,r,o=!1){let i=t.send,s=t.ts,n=t.methodLevel,a=t.methodValue,l=t.val,c=e._logEvent.bindings;o||u(r,e._serialize||Object.keys(e.serializers),e.serializers,void 0===e._stdErrSerialize||e._stdErrSerialize),e._logEvent.ts=s,e._logEvent.messages=r.filter(function(e){return -1===c.indexOf(e)}),e._logEvent.level.label=n,e._logEvent.level.value=a,i(n,e._logEvent,l),e._logEvent=p(c)}(this,{ts:e,methodLevel:g,methodValue:i,transmitLevel:r,transmitValue:h.levels.values[d.transmit.level||c._level],send:d.transmit.send,val:s(c._level,h)},t,a)}});let m=function(e){let t=[];e.bindings&&t.push(e.bindings);let r=e[a];for(;r.parent;)(r=r.parent).logger.bindings&&t.push(r.logger.bindings);return t.reverse()}(e);0!==m.length&&(e[l]=(f=m,y=e[l],function(){return y.apply(this,[...f,...arguments])}))}function u(e,t,r,o){for(let i in e)if(o&&e[i]instanceof Error)e[i]=d.stdSerializers.err(e[i]);else if("object"==typeof e[i]&&!Array.isArray(e[i])&&t)for(let o in e[i])t.indexOf(o)>-1&&o in r&&(e[i][o]=r[o](e[i][o]))}function p(e){return{ts:0,messages:[],bindings:e||[],level:{label:"",value:0}}}function g(e){let t={type:e.constructor.name,msg:e.message,stack:e.stack};for(let r in e)void 0===t[r]&&(t[r]=e[r]);return t}function b(){return{}}function f(e){return e}function v(){}function y(){return!1}function m(){return Date.now()}d.levels={values:{fatal:60,error:50,warn:40,info:30,debug:20,trace:10},labels:{10:"trace",20:"debug",30:"info",40:"warn",50:"error",60:"fatal"}},d.stdSerializers={mapHttpRequest:b,mapHttpResponse:b,wrapRequestSerializer:f,wrapResponseSerializer:f,wrapErrorSerializer:f,req:b,res:b,err:g,errWithCause:g},d.stdTimeFunctions=Object.assign({},{nullTime:y,epochTime:m,unixTime:function(){return Math.round(Date.now()/1e3)},isoTime:function(){return new Date(Date.now()).toISOString()}}),t.exports.default=d,t.exports.pino=d;let x="custom_context";var w=Object.defineProperty,k=(e,t,r)=>{let o;return(o="symbol"!=typeof t?t+"":t)in e?w(e,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[o]=r};class C{constructor(e){k(this,"nodeValue"),k(this,"sizeInBytes"),k(this,"next"),this.nodeValue=e,this.sizeInBytes=new TextEncoder().encode(this.nodeValue).length,this.next=null}get value(){return this.nodeValue}get size(){return this.sizeInBytes}}class O{constructor(e){k(this,"lengthInNodes"),k(this,"sizeInBytes"),k(this,"head"),k(this,"tail"),k(this,"maxSizeInBytes"),this.head=null,this.tail=null,this.lengthInNodes=0,this.maxSizeInBytes=e,this.sizeInBytes=0}append(e){let t=new C(e);if(t.size>this.maxSizeInBytes)throw Error(`[LinkedList] Value too big to insert into list: ${e} with size ${t.size}`);for(;this.size+t.size>this.maxSizeInBytes;)this.shift();this.head?this.tail&&(this.tail.next=t):this.head=t,this.tail=t,this.lengthInNodes++,this.sizeInBytes+=t.size}shift(){if(!this.head)return;let e=this.head;this.head=this.head.next,this.head||(this.tail=null),this.lengthInNodes--,this.sizeInBytes-=e.size}toArray(){let e=[],t=this.head;for(;null!==t;)e.push(t.value),t=t.next;return e}get length(){return this.lengthInNodes}get size(){return this.sizeInBytes}toOrderedArray(){return Array.from(this)}[Symbol.iterator](){let e=this.head;return{next:()=>{if(!e)return{done:!0,value:null};let t=e.value;return e=e.next,{done:!1,value:t}}}}}function $(e){return"string"==typeof e?e:JSON.stringify(e,(e,t)=>"bigint"==typeof t?t.toString()+"n":t)||""}var z=Object.defineProperty,L=(e,t,r)=>{let o;return(o="symbol"!=typeof t?t+"":t)in e?z(e,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[o]=r};class E{constructor(e,r=1024e3){L(this,"logs"),L(this,"level"),L(this,"levelValue"),L(this,"MAX_LOG_SIZE_IN_BYTES"),this.level=e??"error",this.levelValue=t.exports.levels.values[this.level],this.MAX_LOG_SIZE_IN_BYTES=r,this.logs=new O(this.MAX_LOG_SIZE_IN_BYTES)}forwardToConsole(e,r){r===t.exports.levels.values.error?console.error(e):r===t.exports.levels.values.warn?console.warn(e):r===t.exports.levels.values.debug?console.debug(e):r===t.exports.levels.values.trace?console.trace(e):console.log(e)}appendToLogs(e){this.logs.append($({timestamp:new Date().toISOString(),log:e}));let t="string"==typeof e?JSON.parse(e).level:e.level;t>=this.levelValue&&this.forwardToConsole(e,t)}getLogs(){return this.logs}clearLogs(){this.logs=new O(this.MAX_LOG_SIZE_IN_BYTES)}getLogArray(){return Array.from(this.logs)}logsToBlob(e){let t=this.getLogArray();return t.push($({extraMetadata:e})),new Blob(t,{type:"application/json"})}}var j=Object.defineProperty;class S{constructor(e,t=1024e3){((e,t,r)=>{let o;return(o="symbol"!=typeof t?t+"":t)in e?j(e,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[o]=r})(this,"baseChunkLogger"),this.baseChunkLogger=new E(e,t)}write(e){this.baseChunkLogger.appendToLogs(e)}getLogs(){return this.baseChunkLogger.getLogs()}clearLogs(){this.baseChunkLogger.clearLogs()}getLogArray(){return this.baseChunkLogger.getLogArray()}logsToBlob(e){return this.baseChunkLogger.logsToBlob(e)}downloadLogsBlobInBrowser(e){let t=URL.createObjectURL(this.logsToBlob(e)),r=document.createElement("a");r.href=t,r.download=`walletconnect-logs-${new Date().toISOString()}.txt`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t)}}var T=Object.defineProperty;class I{constructor(e,t=1024e3){((e,t,r)=>{let o;return(o="symbol"!=typeof t?t+"":t)in e?T(e,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[o]=r})(this,"baseChunkLogger"),this.baseChunkLogger=new E(e,t)}write(e){this.baseChunkLogger.appendToLogs(e)}getLogs(){return this.baseChunkLogger.getLogs()}clearLogs(){this.baseChunkLogger.clearLogs()}getLogArray(){return this.baseChunkLogger.getLogArray()}logsToBlob(e){return this.baseChunkLogger.logsToBlob(e)}}var _=Object.defineProperty,P=Object.defineProperties,R=Object.getOwnPropertyDescriptors,B=Object.getOwnPropertySymbols,A=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable,D=(e,t,r)=>t in e?_(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,V=(e,t)=>{for(var r in t||(t={}))A.call(t,r)&&D(e,r,t[r]);if(B)for(var r of B(t))N.call(t,r)&&D(e,r,t[r]);return e};function M(e){return P(V({},e),R({level:e?.level||"info"}))}function U(e,t=x){return e[t]||""}function W(e,t,r=x){let o=function(e,t,r=x){let o=U(e,r);return o.trim()?`${o}/${t}`:t}(e,t,r);return function(e,t,r=x){return e[r]=t,e}(e.child({context:o}),o,r)}function H(e){var r,o,i,s,n,a,l;let c,d,h,u,p,g;if("u">typeof e.loggerOverride&&"string"!=typeof e.loggerOverride)return{logger:e.loggerOverride,chunkLoggerController:null};let b=P(V({},e.opts),R({level:"string"==typeof e.loggerOverride?e.loggerOverride:null==(r=e.opts)?void 0:r.level}));return"u">typeof window?(h=new S(null==(i=(o=P(V({},e),R({opts:b}))).opts)?void 0:i.level,o.maxSizeInBytes),{logger:t.exports((c=V({},o.opts),d={level:"trace",browser:P(V({},null==(s=o.opts)?void 0:s.browser),R({write:e=>h.write(e)}))},P(c,R(d)))),chunkLoggerController:h}):(g=new I(null==(a=(n=P(V({},e),R({opts:b}))).opts)?void 0:a.level,n.maxSizeInBytes),{logger:t.exports((u=V({},n.opts),p={level:"trace",browser:P(V({},null==(l=n.opts)?void 0:l.browser),R({write:e=>g.write(e)}))},P(u,R(p))),g),chunkLoggerController:g})}e.s(["generateChildLogger",()=>W,"generatePlatformLogger",()=>H,"getDefaultLoggerOptions",()=>M,"getLoggerContext",()=>U])},542904,e=>{"use strict";var t=e.i(247167);let r={ACCOUNT_TABS:[{label:"Tokens"},{label:"Activity"}],SECURE_SITE_ORIGIN:(void 0!==t.default&&void 0!==t.default.env?t.default.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN:void 0)||"https://secure.walletconnect.org",VIEW_DIRECTION:{Next:"next",Prev:"prev"},ANIMATION_DURATIONS:{HeaderText:120,ModalHeight:150,ViewTransition:150},VIEWS_WITH_LEGAL_FOOTER:["Connect","ConnectWallets","OnRampTokenSelect","OnRampFiatSelect","OnRampProviders"],VIEWS_WITH_DEFAULT_FOOTER:["Networks"]};e.s(["ConstantsUtil",0,r])},443452,e=>{"use strict";e.i(852634),e.s([])},912190,e=>{"use strict";e.i(145967);var t=e.i(604148),r=e.i(654479);e.i(582768);var o=e.i(120119);e.i(728547);var i=e.i(829389);e.i(852634);var s=e.i(459088),n=e.i(645975),a=e.i(162611);let l=a.css`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: ${({borderRadius:e})=>e[2]};
    padding: ${({spacing:e})=>e[1]} !important;
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    position: relative;
  }

  :host([data-padding='2']) {
    padding: ${({spacing:e})=>e[2]} !important;
  }

  :host:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  :host > wui-icon {
    z-index: 10;
  }

  /* -- Colors --------------------------------------------------- */
  :host([data-color='accent-primary']) {
    color: ${({tokens:e})=>e.core.iconAccentPrimary};
  }

  :host([data-color='accent-primary']):after {
    background-color: ${({tokens:e})=>e.core.foregroundAccent010};
  }

  :host([data-color='default']),
  :host([data-color='secondary']) {
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  :host([data-color='default']):after {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  :host([data-color='secondary']):after {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  :host([data-color='success']) {
    color: ${({tokens:e})=>e.core.iconSuccess};
  }

  :host([data-color='success']):after {
    background-color: ${({tokens:e})=>e.core.backgroundSuccess};
  }

  :host([data-color='error']) {
    color: ${({tokens:e})=>e.core.iconError};
  }

  :host([data-color='error']):after {
    background-color: ${({tokens:e})=>e.core.backgroundError};
  }

  :host([data-color='warning']) {
    color: ${({tokens:e})=>e.core.iconWarning};
  }

  :host([data-color='warning']):after {
    background-color: ${({tokens:e})=>e.core.backgroundWarning};
  }

  :host([data-color='inverse']) {
    color: ${({tokens:e})=>e.theme.iconInverse};
  }

  :host([data-color='inverse']):after {
    background-color: transparent;
  }
`;var c=function(e,t,r,o){var i,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(s<3?i(n):s>3?i(t,r,n):i(t,r))||n);return s>3&&n&&Object.defineProperty(t,r,n),n};let d=class extends t.LitElement{constructor(){super(...arguments),this.icon="copy",this.size="md",this.padding="1",this.color="default"}render(){return this.dataset.padding=this.padding,this.dataset.color=this.color,r.html`
      <wui-icon size=${(0,i.ifDefined)(this.size)} name=${this.icon} color="inherit"></wui-icon>
    `}};d.styles=[s.resetStyles,s.elementStyles,l],c([(0,o.property)()],d.prototype,"icon",void 0),c([(0,o.property)()],d.prototype,"size",void 0),c([(0,o.property)()],d.prototype,"padding",void 0),c([(0,o.property)()],d.prototype,"color",void 0),d=c([(0,n.customElement)("wui-icon-box")],d),e.s([],912190)},864380,e=>{"use strict";e.i(145967);var t=e.i(604148),r=e.i(654479);e.i(582768);var o=e.i(120119);e.i(728547);var i=e.i(829389),s=e.i(459088),n=e.i(645975),a=e.i(162611);let l=a.css`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
    user-select: none;
    user-drag: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }

  :host([data-boxed='true']) {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  :host([data-boxed='true']) img {
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:e})=>e[16]};
  }

  :host([data-full='true']) img {
    width: 100%;
    height: 100%;
  }

  :host([data-boxed='true']) wui-icon {
    width: 20px;
    height: 20px;
  }

  :host([data-icon='error']) {
    background-color: ${({tokens:e})=>e.core.backgroundError};
  }

  :host([data-rounded='true']) {
    border-radius: ${({borderRadius:e})=>e[16]};
  }
`;var c=function(e,t,r,o){var i,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(s<3?i(n):s>3?i(t,r,n):i(t,r))||n);return s>3&&n&&Object.defineProperty(t,r,n),n};let d=class extends t.LitElement{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0,this.boxed=!1,this.rounded=!1,this.fullSize=!1}render(){let e={inherit:"inherit",xxs:"2",xs:"3",sm:"4",md:"4",mdl:"5",lg:"5",xl:"6",xxl:"7","3xl":"8","4xl":"9","5xl":"10"};return(this.style.cssText=`
      --local-width: ${this.size?`var(--apkt-spacing-${e[this.size]});`:"100%"};
      --local-height: ${this.size?`var(--apkt-spacing-${e[this.size]});`:"100%"};
      `,this.dataset.boxed=this.boxed?"true":"false",this.dataset.rounded=this.rounded?"true":"false",this.dataset.full=this.fullSize?"true":"false",this.dataset.icon=this.iconColor||"inherit",this.icon)?r.html`<wui-icon
        color=${this.iconColor||"inherit"}
        name=${this.icon}
        size="lg"
      ></wui-icon> `:this.logo?r.html`<wui-icon size="lg" color="inherit" name=${this.logo}></wui-icon> `:r.html`<img src=${(0,i.ifDefined)(this.src)} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};d.styles=[s.resetStyles,l],c([(0,o.property)()],d.prototype,"src",void 0),c([(0,o.property)()],d.prototype,"logo",void 0),c([(0,o.property)()],d.prototype,"icon",void 0),c([(0,o.property)()],d.prototype,"iconColor",void 0),c([(0,o.property)()],d.prototype,"alt",void 0),c([(0,o.property)()],d.prototype,"size",void 0),c([(0,o.property)({type:Boolean})],d.prototype,"boxed",void 0),c([(0,o.property)({type:Boolean})],d.prototype,"rounded",void 0),c([(0,o.property)({type:Boolean})],d.prototype,"fullSize",void 0),d=c([(0,n.customElement)("wui-image")],d),e.s([],864380)},383227,e=>{"use strict";e.i(145967);var t=e.i(604148),r=e.i(654479);e.i(582768);var o=e.i(120119),i=e.i(162611),s=e.i(459088),n=e.i(645975),a=e.i(592057);let l=a.css`
  :host {
    display: flex;
  }

  :host([data-size='sm']) > svg {
    width: 12px;
    height: 12px;
  }

  :host([data-size='md']) > svg {
    width: 16px;
    height: 16px;
  }

  :host([data-size='lg']) > svg {
    width: 24px;
    height: 24px;
  }

  :host([data-size='xl']) > svg {
    width: 32px;
    height: 32px;
  }

  svg {
    animation: rotate 1.4s linear infinite;
    color: var(--local-color);
  }

  :host([data-size='md']) > svg > circle {
    stroke-width: 6px;
  }

  :host([data-size='sm']) > svg > circle {
    stroke-width: 8px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;var c=function(e,t,r,o){var i,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(s<3?i(n):s>3?i(t,r,n):i(t,r))||n);return s>3&&n&&Object.defineProperty(t,r,n),n};let d=class extends t.LitElement{constructor(){super(...arguments),this.color="primary",this.size="lg"}render(){let e={primary:i.vars.tokens.theme.textPrimary,secondary:i.vars.tokens.theme.textSecondary,tertiary:i.vars.tokens.theme.textTertiary,invert:i.vars.tokens.theme.textInvert,error:i.vars.tokens.core.textError,warning:i.vars.tokens.core.textWarning,"accent-primary":i.vars.tokens.core.textAccentPrimary};return this.style.cssText=`
      --local-color: ${"inherit"===this.color?"inherit":e[this.color]};
      `,this.dataset.size=this.size,r.html`<svg viewBox="0 0 16 17" fill="none">
      <path
        d="M8.75 2.65625V4.65625C8.75 4.85516 8.67098 5.04593 8.53033 5.18658C8.38968 5.32723 8.19891 5.40625 8 5.40625C7.80109 5.40625 7.61032 5.32723 7.46967 5.18658C7.32902 5.04593 7.25 4.85516 7.25 4.65625V2.65625C7.25 2.45734 7.32902 2.26657 7.46967 2.12592C7.61032 1.98527 7.80109 1.90625 8 1.90625C8.19891 1.90625 8.38968 1.98527 8.53033 2.12592C8.67098 2.26657 8.75 2.45734 8.75 2.65625ZM14 7.90625H12C11.8011 7.90625 11.6103 7.98527 11.4697 8.12592C11.329 8.26657 11.25 8.45734 11.25 8.65625C11.25 8.85516 11.329 9.04593 11.4697 9.18658C11.6103 9.32723 11.8011 9.40625 12 9.40625H14C14.1989 9.40625 14.3897 9.32723 14.5303 9.18658C14.671 9.04593 14.75 8.85516 14.75 8.65625C14.75 8.45734 14.671 8.26657 14.5303 8.12592C14.3897 7.98527 14.1989 7.90625 14 7.90625ZM11.3588 10.9544C11.289 10.8846 11.2062 10.8293 11.115 10.7915C11.0239 10.7538 10.9262 10.7343 10.8275 10.7343C10.7288 10.7343 10.6311 10.7538 10.54 10.7915C10.4488 10.8293 10.366 10.8846 10.2963 10.9544C10.2265 11.0241 10.1711 11.107 10.1334 11.1981C10.0956 11.2893 10.0762 11.387 10.0762 11.4856C10.0762 11.5843 10.0956 11.682 10.1334 11.7731C10.1711 11.8643 10.2265 11.9471 10.2963 12.0169L11.7106 13.4312C11.8515 13.5721 12.0426 13.6513 12.2419 13.6513C12.4411 13.6513 12.6322 13.5721 12.7731 13.4312C12.914 13.2904 12.9932 13.0993 12.9932 12.9C12.9932 12.7007 12.914 12.5096 12.7731 12.3687L11.3588 10.9544ZM8 11.9062C7.80109 11.9062 7.61032 11.9853 7.46967 12.1259C7.32902 12.2666 7.25 12.4573 7.25 12.6562V14.6562C7.25 14.8552 7.32902 15.0459 7.46967 15.1866C7.61032 15.3272 7.80109 15.4062 8 15.4062C8.19891 15.4062 8.38968 15.3272 8.53033 15.1866C8.67098 15.0459 8.75 14.8552 8.75 14.6562V12.6562C8.75 12.4573 8.67098 12.2666 8.53033 12.1259C8.38968 11.9853 8.19891 11.9062 8 11.9062ZM4.64125 10.9544L3.22688 12.3687C3.08598 12.5096 3.00682 12.7007 3.00682 12.9C3.00682 13.0993 3.08598 13.2904 3.22688 13.4312C3.36777 13.5721 3.55887 13.6513 3.75813 13.6513C3.95738 13.6513 4.14848 13.5721 4.28937 13.4312L5.70375 12.0169C5.84465 11.876 5.9238 11.6849 5.9238 11.4856C5.9238 11.2864 5.84465 11.0953 5.70375 10.9544C5.56285 10.8135 5.37176 10.7343 5.1725 10.7343C4.97324 10.7343 4.78215 10.8135 4.64125 10.9544ZM4.75 8.65625C4.75 8.45734 4.67098 8.26657 4.53033 8.12592C4.38968 7.98527 4.19891 7.90625 4 7.90625H2C1.80109 7.90625 1.61032 7.98527 1.46967 8.12592C1.32902 8.26657 1.25 8.45734 1.25 8.65625C1.25 8.85516 1.32902 9.04593 1.46967 9.18658C1.61032 9.32723 1.80109 9.40625 2 9.40625H4C4.19891 9.40625 4.38968 9.32723 4.53033 9.18658C4.67098 9.04593 4.75 8.85516 4.75 8.65625ZM4.2875 3.88313C4.1466 3.74223 3.95551 3.66307 3.75625 3.66307C3.55699 3.66307 3.3659 3.74223 3.225 3.88313C3.0841 4.02402 3.00495 4.21512 3.00495 4.41438C3.00495 4.61363 3.0841 4.80473 3.225 4.94562L4.64125 6.35813C4.78215 6.49902 4.97324 6.57818 5.1725 6.57818C5.37176 6.57818 5.56285 6.49902 5.70375 6.35813C5.84465 6.21723 5.9238 6.02613 5.9238 5.82688C5.9238 5.62762 5.84465 5.43652 5.70375 5.29563L4.2875 3.88313Z"
        fill="currentColor"
      />
    </svg>`}};d.styles=[s.resetStyles,l],c([(0,o.property)()],d.prototype,"color",void 0),c([(0,o.property)()],d.prototype,"size",void 0),d=c([(0,n.customElement)("wui-loading-spinner")],d),e.s([],383227)},534420,624947,e=>{"use strict";e.i(145967);var t=e.i(604148),r=e.i(654479);e.i(582768);var o=e.i(120119);e.i(852634),e.i(383227),e.i(839009);var i=e.i(459088),s=e.i(645975),n=e.i(162611);let a=n.css`
  :host {
    width: var(--local-width);
  }

  button {
    width: var(--local-width);
    white-space: nowrap;
    column-gap: ${({spacing:e})=>e[2]};
    transition:
      scale ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-1"]},
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      border-radius ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]};
    will-change: scale, background-color, border-radius;
    cursor: pointer;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='sm'] {
    border-radius: ${({borderRadius:e})=>e[2]};
    padding: 0 ${({spacing:e})=>e[2]};
    height: 28px;
  }

  button[data-size='md'] {
    border-radius: ${({borderRadius:e})=>e[3]};
    padding: 0 ${({spacing:e})=>e[4]};
    height: 38px;
  }

  button[data-size='lg'] {
    border-radius: ${({borderRadius:e})=>e[4]};
    padding: 0 ${({spacing:e})=>e[5]};
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='accent-primary'] {
    background-color: ${({tokens:e})=>e.core.backgroundAccentPrimary};
    color: ${({tokens:e})=>e.theme.textInvert};
  }

  button[data-variant='accent-secondary'] {
    background-color: ${({tokens:e})=>e.core.foregroundAccent010};
    color: ${({tokens:e})=>e.core.textAccentPrimary};
  }

  button[data-variant='neutral-primary'] {
    background-color: ${({tokens:e})=>e.theme.backgroundInvert};
    color: ${({tokens:e})=>e.theme.textInvert};
  }

  button[data-variant='neutral-secondary'] {
    background-color: transparent;
    border: 1px solid ${({tokens:e})=>e.theme.borderSecondary};
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  button[data-variant='neutral-tertiary'] {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  button[data-variant='error-primary'] {
    background-color: ${({tokens:e})=>e.core.textError};
    color: ${({tokens:e})=>e.theme.textInvert};
  }

  button[data-variant='error-secondary'] {
    background-color: ${({tokens:e})=>e.core.backgroundError};
    color: ${({tokens:e})=>e.core.textError};
  }

  button[data-variant='shade'] {
    background: var(--wui-color-gray-glass-002);
    color: var(--wui-color-fg-200);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-size='sm']:focus-visible:enabled {
    border-radius: 28px;
  }

  button[data-size='md']:focus-visible:enabled {
    border-radius: 38px;
  }

  button[data-size='lg']:focus-visible:enabled {
    border-radius: 48px;
  }
  button[data-variant='shade']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) {
    button[data-size='sm']:hover:enabled {
      border-radius: 28px;
    }

    button[data-size='md']:hover:enabled {
      border-radius: 38px;
    }

    button[data-size='lg']:hover:enabled {
      border-radius: 48px;
    }

    button[data-variant='shade']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='shade']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }
  }

  button[data-size='sm']:active:enabled {
    border-radius: 28px;
  }

  button[data-size='md']:active:enabled {
    border-radius: 38px;
  }

  button[data-size='lg']:active:enabled {
    border-radius: 48px;
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    opacity: 0.3;
  }
`;var l=function(e,t,r,o){var i,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(s<3?i(n):s>3?i(t,r,n):i(t,r))||n);return s>3&&n&&Object.defineProperty(t,r,n),n};let c={lg:"lg-regular-mono",md:"md-regular-mono",sm:"sm-regular-mono"},d={lg:"md",md:"md",sm:"sm"},h=class extends t.LitElement{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="accent-primary"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
     `;let e=this.textVariant??c[this.size];return r.html`
      <button data-variant=${this.variant} data-size=${this.size} ?disabled=${this.disabled}>
        ${this.loadingTemplate()}
        <slot name="iconLeft"></slot>
        <wui-text variant=${e} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}loadingTemplate(){if(this.loading){let e=d[this.size],t="neutral-primary"===this.variant||"accent-primary"===this.variant?"invert":"primary";return r.html`<wui-loading-spinner color=${t} size=${e}></wui-loading-spinner>`}return null}};h.styles=[i.resetStyles,i.elementStyles,a],l([(0,o.property)()],h.prototype,"size",void 0),l([(0,o.property)({type:Boolean})],h.prototype,"disabled",void 0),l([(0,o.property)({type:Boolean})],h.prototype,"fullWidth",void 0),l([(0,o.property)({type:Boolean})],h.prototype,"loading",void 0),l([(0,o.property)()],h.prototype,"variant",void 0),l([(0,o.property)()],h.prototype,"textVariant",void 0),h=l([(0,s.customElement)("wui-button")],h),e.s([],624947),e.s([],534420)},864576,e=>{"use strict";e.i(145967);var t=e.i(604148),r=e.i(654479);e.i(582768);var o=e.i(120119),i=e.i(645975),s=e.i(162611);let n=s.css`
  :host {
    display: block;
    background: linear-gradient(
      90deg,
      ${({tokens:e})=>e.theme.foregroundPrimary} 0%,
      ${({tokens:e})=>e.theme.foregroundSecondary} 50%,
      ${({tokens:e})=>e.theme.foregroundPrimary} 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s linear infinite;
    border-radius: ${({borderRadius:e})=>e[1]};
  }

  :host([data-rounded='true']) {
    border-radius: ${({borderRadius:e})=>e[16]};
  }

  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;var a=function(e,t,r,o){var i,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(n=(s<3?i(n):s>3?i(t,r,n):i(t,r))||n);return s>3&&n&&Object.defineProperty(t,r,n),n};let l=class extends t.LitElement{constructor(){super(...arguments),this.width="",this.height="",this.variant="default",this.rounded=!1}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
    `,this.dataset.rounded=this.rounded?"true":"false",r.html`<slot></slot>`}};l.styles=[n],a([(0,o.property)()],l.prototype,"width",void 0),a([(0,o.property)()],l.prototype,"height",void 0),a([(0,o.property)()],l.prototype,"variant",void 0),a([(0,o.property)({type:Boolean})],l.prototype,"rounded",void 0),l=a([(0,i.customElement)("wui-shimmer")],l),e.s([],864576)},780313,e=>{"use strict";e.i(864576),e.s([])},851887,e=>{"use strict";var t=e.i(365801),r=e.i(742710),o=e.i(401564),i=e.i(592279),s=e.i(82283);let n=(0,t.proxy)({message:"",variant:"info",open:!1}),a=(0,i.withErrorBoundary)({state:n,subscribeKey:(e,t)=>(0,r.subscribeKey)(n,e,t),open(e,t){let{debug:r}=s.OptionsController.state,{code:i,displayMessage:a,debugMessage:l}=e;if(a&&r&&(n.message=a,n.variant=t,n.open=!0),l){if(!o.ConstantsUtil.IS_DEVELOPMENT)return;let e="function"==typeof l?l():l,r=i?{code:i}:void 0;"error"===t?console.error(e,r):"warning"===t?console.warn(e,r):console.info(e,r)}},warn(e,t,r){n.open=!0,n.message=e,n.variant="warning",t&&console.warn(t,r)},close(){n.open=!1,n.message="",n.variant="info"}});e.s(["AlertController",0,a])}]);