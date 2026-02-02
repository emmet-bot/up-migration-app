(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,219298,(t,e,r)=>{"use strict";var i,o="object"==typeof Reflect?Reflect:null,n=o&&"function"==typeof o.apply?o.apply:function(t,e,r){return Function.prototype.apply.call(t,e,r)};i=o&&"function"==typeof o.ownKeys?o.ownKeys:Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:function(t){return Object.getOwnPropertyNames(t)};var s=Number.isNaN||function(t){return t!=t};function a(){a.init.call(this)}e.exports=a,e.exports.once=function(t,e){return new Promise(function(r,i){var o,n,s;function a(r){t.removeListener(e,u),i(r)}function u(){"function"==typeof t.removeListener&&t.removeListener("error",a),r([].slice.call(arguments))}v(t,e,u,{once:!0}),"error"!==e&&(o=t,n=a,s={once:!0},"function"==typeof o.on&&v(o,"error",n,s))})},a.EventEmitter=a,a.prototype._events=void 0,a.prototype._eventsCount=0,a.prototype._maxListeners=void 0;var u=10;function l(t){if("function"!=typeof t)throw TypeError('The "listener" argument must be of type Function. Received type '+typeof t)}function c(t){return void 0===t._maxListeners?a.defaultMaxListeners:t._maxListeners}function f(t,e,r,i){if(l(r),void 0===(n=t._events)?(n=t._events=Object.create(null),t._eventsCount=0):(void 0!==n.newListener&&(t.emit("newListener",e,r.listener?r.listener:r),n=t._events),s=n[e]),void 0===s)s=n[e]=r,++t._eventsCount;else if("function"==typeof s?s=n[e]=i?[r,s]:[s,r]:i?s.unshift(r):s.push(r),(o=c(t))>0&&s.length>o&&!s.warned){s.warned=!0;var o,n,s,a=Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");a.name="MaxListenersExceededWarning",a.emitter=t,a.type=e,a.count=s.length,console&&console.warn&&console.warn(a)}return t}function h(){if(!this.fired)return(this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0==arguments.length)?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function p(t,e,r){var i={fired:!1,wrapFn:void 0,target:t,type:e,listener:r},o=h.bind(i);return o.listener=r,i.wrapFn=o,o}function d(t,e,r){var i=t._events;if(void 0===i)return[];var o=i[e];return void 0===o?[]:"function"==typeof o?r?[o.listener||o]:[o]:r?function(t){for(var e=Array(t.length),r=0;r<e.length;++r)e[r]=t[r].listener||t[r];return e}(o):g(o,o.length)}function y(t){var e=this._events;if(void 0!==e){var r=e[t];if("function"==typeof r)return 1;if(void 0!==r)return r.length}return 0}function g(t,e){for(var r=Array(e),i=0;i<e;++i)r[i]=t[i];return r}function v(t,e,r,i){if("function"==typeof t.on)i.once?t.once(e,r):t.on(e,r);else if("function"==typeof t.addEventListener)t.addEventListener(e,function o(n){i.once&&t.removeEventListener(e,o),r(n)});else throw TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof t)}Object.defineProperty(a,"defaultMaxListeners",{enumerable:!0,get:function(){return u},set:function(t){if("number"!=typeof t||t<0||s(t))throw RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+t+".");u=t}}),a.init=function(){(void 0===this._events||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},a.prototype.setMaxListeners=function(t){if("number"!=typeof t||t<0||s(t))throw RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this},a.prototype.getMaxListeners=function(){return c(this)},a.prototype.emit=function(t){for(var e=[],r=1;r<arguments.length;r++)e.push(arguments[r]);var i="error"===t,o=this._events;if(void 0!==o)i=i&&void 0===o.error;else if(!i)return!1;if(i){if(e.length>0&&(s=e[0]),s instanceof Error)throw s;var s,a=Error("Unhandled error."+(s?" ("+s.message+")":""));throw a.context=s,a}var u=o[t];if(void 0===u)return!1;if("function"==typeof u)n(u,this,e);else for(var l=u.length,c=g(u,l),r=0;r<l;++r)n(c[r],this,e);return!0},a.prototype.addListener=function(t,e){return f(this,t,e,!1)},a.prototype.on=a.prototype.addListener,a.prototype.prependListener=function(t,e){return f(this,t,e,!0)},a.prototype.once=function(t,e){return l(e),this.on(t,p(this,t,e)),this},a.prototype.prependOnceListener=function(t,e){return l(e),this.prependListener(t,p(this,t,e)),this},a.prototype.removeListener=function(t,e){var r,i,o,n,s;if(l(e),void 0===(i=this._events)||void 0===(r=i[t]))return this;if(r===e||r.listener===e)0==--this._eventsCount?this._events=Object.create(null):(delete i[t],i.removeListener&&this.emit("removeListener",t,r.listener||e));else if("function"!=typeof r){for(o=-1,n=r.length-1;n>=0;n--)if(r[n]===e||r[n].listener===e){s=r[n].listener,o=n;break}if(o<0)return this;0===o?r.shift():function(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}(r,o),1===r.length&&(i[t]=r[0]),void 0!==i.removeListener&&this.emit("removeListener",t,s||e)}return this},a.prototype.off=a.prototype.removeListener,a.prototype.removeAllListeners=function(t){var e,r,i;if(void 0===(r=this._events))return this;if(void 0===r.removeListener)return 0==arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==r[t]&&(0==--this._eventsCount?this._events=Object.create(null):delete r[t]),this;if(0==arguments.length){var o,n=Object.keys(r);for(i=0;i<n.length;++i)"removeListener"!==(o=n[i])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(e=r[t]))this.removeListener(t,e);else if(void 0!==e)for(i=e.length-1;i>=0;i--)this.removeListener(t,e[i]);return this},a.prototype.listeners=function(t){return d(this,t,!0)},a.prototype.rawListeners=function(t){return d(this,t,!1)},a.listenerCount=function(t,e){return"function"==typeof t.listenerCount?t.listenerCount(e):y.call(t,e)},a.prototype.listenerCount=y,a.prototype.eventNames=function(){return this._eventsCount>0?i(this._events):[]}},16555,t=>{"use strict";let e={METMASK_CONNECTOR_NAME:"MetaMask",TRUST_CONNECTOR_NAME:"Trust Wallet",SOLFLARE_CONNECTOR_NAME:"Solflare",PHANTOM_CONNECTOR_NAME:"Phantom",COIN98_CONNECTOR_NAME:"Coin98",MAGIC_EDEN_CONNECTOR_NAME:"Magic Eden",BACKPACK_CONNECTOR_NAME:"Backpack",BITGET_CONNECTOR_NAME:"Bitget Wallet",FRONTIER_CONNECTOR_NAME:"Frontier",XVERSE_CONNECTOR_NAME:"Xverse Wallet",LEATHER_CONNECTOR_NAME:"Leather",OKX_CONNECTOR_NAME:"OKX Wallet",BINANCE_CONNECTOR_NAME:"Binance Wallet",EIP155:t.i(401564).ConstantsUtil.CHAIN.EVM,ADD_CHAIN_METHOD:"wallet_addEthereumChain",EIP6963_ANNOUNCE_EVENT:"eip6963:announceProvider",EIP6963_REQUEST_EVENT:"eip6963:requestProvider",CONNECTOR_RDNS_MAP:{coinbaseWallet:"com.coinbase.wallet",coinbaseWalletSDK:"com.coinbase.wallet"},CONNECTOR_TYPE_EXTERNAL:"EXTERNAL",CONNECTOR_TYPE_WALLET_CONNECT:"WALLET_CONNECT",CONNECTOR_TYPE_INJECTED:"INJECTED",CONNECTOR_TYPE_ANNOUNCED:"ANNOUNCED",CONNECTOR_TYPE_AUTH:"AUTH",CONNECTOR_TYPE_MULTI_CHAIN:"MULTI_CHAIN",CONNECTOR_TYPE_W3M_AUTH:"AUTH",getSDKVersionWarningMessage:(t,e)=>`
     @@@@@@@           @@@@@@@@@@@@@@@@@@      
   @@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@@@   
  @@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@  
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@  
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@@   @@@@@@@@@@@ 
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@   @@@@@@@@@@@@ 
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@  @@@@@@@@@@@@@
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@   @@@@@@@@@@@@@    
 @@@@@@   @@@@@@  @@@@@@@@@@@   @@@@@@@@@@@@@@    
 @@@@@@   @@@@@@  @@@@@@@@@@@  @@@@@@@@@@@@@@@ 
 @@@@@@@@@@@@@@@  @@@@@@@@@@   @@@@@@@@@@@@@@@ 
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@  
  @@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@  
   @@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@@@   
      @@@@@            @@@@@@@@@@@@@@@@@@  
      
AppKit SDK version ${t} is outdated. Latest version is ${e}. Please update to the latest version for bug fixes and new features.
            
Changelog: https://github.com/reown-com/appkit/releases
NPM Registry: https://www.npmjs.com/package/@reown/appkit`};t.s(["ConstantsUtil",0,e])},79929,t=>{"use strict";t.i(145967);var e=t.i(604148),r=t.i(654479);t.i(582768);var i=t.i(120119);t.i(839009);var o=t.i(459088),n=t.i(645975),s=t.i(162611);let a=s.css`
  :host {
    position: relative;
    display: flex;
    width: 100%;
    height: 1px;
    background-color: ${({tokens:t})=>t.theme.borderPrimary};
    justify-content: center;
    align-items: center;
  }

  :host > wui-text {
    position: absolute;
    padding: 0px 8px;
    transition: background-color ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color;
  }

  :host([data-bg-color='primary']) > wui-text {
    background-color: ${({tokens:t})=>t.theme.backgroundPrimary};
  }

  :host([data-bg-color='secondary']) > wui-text {
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
  }
`;var u=function(t,e,r,i){var o,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(s=(n<3?o(s):n>3?o(e,r,s):o(e,r))||s);return n>3&&s&&Object.defineProperty(e,r,s),s};let l=class extends e.LitElement{constructor(){super(...arguments),this.text="",this.bgColor="primary"}render(){return this.dataset.bgColor=this.bgColor,r.html`${this.template()}`}template(){return this.text?r.html`<wui-text variant="md-regular" color="secondary">${this.text}</wui-text>`:null}};l.styles=[o.resetStyles,a],u([(0,i.property)()],l.prototype,"text",void 0),u([(0,i.property)()],l.prototype,"bgColor",void 0),l=u([(0,n.customElement)("wui-separator")],l),t.s([],79929)},907170,695553,t=>{"use strict";t.i(145967);var e=t.i(604148),r=t.i(654479);t.i(582768);var i=t.i(120119);t.i(852634);var o=t.i(459088),n=t.i(645975),s=t.i(162611);let a=s.css`
  button {
    background-color: transparent;
    padding: ${({spacing:t})=>t[1]};
  }

  button:focus-visible {
    box-shadow: 0 0 0 4px ${({tokens:t})=>t.core.foregroundAccent020};
  }

  button[data-variant='accent']:hover:enabled,
  button[data-variant='accent']:focus-visible {
    background-color: ${({tokens:t})=>t.core.foregroundAccent010};
  }

  button[data-variant='primary']:hover:enabled,
  button[data-variant='primary']:focus-visible,
  button[data-variant='secondary']:hover:enabled,
  button[data-variant='secondary']:focus-visible {
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
  }

  button[data-size='xs'] > wui-icon {
    width: 8px;
    height: 8px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='xs'],
  button[data-size='sm'] {
    border-radius: ${({borderRadius:t})=>t[1]};
  }

  button[data-size='md'],
  button[data-size='lg'] {
    border-radius: ${({borderRadius:t})=>t[2]};
  }

  button[data-size='md'] > wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] > wui-icon {
    width: 20px;
    height: 20px;
  }

  button:disabled {
    background-color: transparent;
    cursor: not-allowed;
    opacity: 0.5;
  }

  button:hover:not(:disabled) {
    background-color: var(--wui-color-accent-glass-015);
  }

  button:focus-visible:not(:disabled) {
    background-color: var(--wui-color-accent-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
`;var u=function(t,e,r,i){var o,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(s=(n<3?o(s):n>3?o(e,r,s):o(e,r))||s);return n>3&&s&&Object.defineProperty(e,r,s),s};let l=class extends e.LitElement{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.icon="copy",this.iconColor="default",this.variant="accent"}render(){return r.html`
      <button data-variant=${this.variant} ?disabled=${this.disabled} data-size=${this.size}>
        <wui-icon
          color=${({accent:"accent-primary",primary:"inverse",secondary:"default"})[this.variant]||this.iconColor}
          size=${this.size}
          name=${this.icon}
        ></wui-icon>
      </button>
    `}};l.styles=[o.resetStyles,o.elementStyles,a],u([(0,i.property)()],l.prototype,"size",void 0),u([(0,i.property)({type:Boolean})],l.prototype,"disabled",void 0),u([(0,i.property)()],l.prototype,"icon",void 0),u([(0,i.property)()],l.prototype,"iconColor",void 0),u([(0,i.property)()],l.prototype,"variant",void 0),l=u([(0,n.customElement)("wui-icon-link")],l),t.s([],695553),t.s([],907170)},769718,t=>{"use strict";var e=t.i(401564),r=t.i(960398),i=t.i(149454),o=t.i(758331),n=t.i(16555);let s={getCaipTokens(t){if(!t)return;let e={};return Object.entries(t).forEach(([t,r])=>{e[`${n.ConstantsUtil.EIP155}:${t}`]=r}),e},isLowerCaseMatch:(t,e)=>t?.toLowerCase()===e?.toLowerCase(),getActiveNamespaceConnectedToAuth(){let t=r.ChainController.state.activeChain;return e.ConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(r=>i.ConnectorController.getConnectorId(r)===e.ConstantsUtil.CONNECTOR_ID.AUTH&&r===t)},withRetry({conditionFn:t,intervalMs:e,maxRetries:r}){let i=0;return new Promise(o=>{async function n(){return(i+=1,await t())?o(!0):i>=r?o(!1):(setTimeout(n,e),null)}n()})},userChainIdToChainNamespace(t){if("number"==typeof t)return e.ConstantsUtil.CHAIN.EVM;let[r]=t.split(":");return r},getOtherAuthNamespaces:t=>t?e.ConstantsUtil.AUTH_CONNECTOR_SUPPORTED_CHAINS.filter(e=>e!==t):[],getConnectorStorageInfo(t,e){let r=o.StorageUtil.getConnections()[e]??[];return{hasDisconnected:o.StorageUtil.isConnectorDisconnected(t,e),hasConnected:r.some(e=>s.isLowerCaseMatch(e.connectorId,t))}}};t.s(["HelpersUtil",0,s])},604415,t=>{"use strict";t.i(145967);var e=t.i(604148),r=t.i(654479);t.i(582768);var i=t.i(120119);t.i(728547);var o=t.i(829389);t.i(852634),t.i(864380),t.i(839009),t.i(73944);var n=t.i(459088),s=t.i(112699),a=t.i(645975),u=t.i(162611);let l=u.css`
  button {
    display: flex;
    align-items: center;
    height: 40px;
    padding: ${({spacing:t})=>t[2]};
    border-radius: ${({borderRadius:t})=>t[4]};
    column-gap: ${({spacing:t})=>t[1]};
    background-color: transparent;
    transition: background-color ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color;
  }

  wui-image,
  .icon-box {
    width: ${({spacing:t})=>t[6]};
    height: ${({spacing:t})=>t[6]};
    border-radius: ${({borderRadius:t})=>t[4]};
  }

  wui-text {
    flex: 1;
  }

  .icon-box {
    position: relative;
  }

  .icon-box[data-active='true'] {
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
  }

  .circle {
    position: absolute;
    left: 16px;
    top: 15px;
    width: 8px;
    height: 8px;
    background-color: ${({tokens:t})=>t.core.textSuccess};
    box-shadow: 0 0 0 2px ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: 50%;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) {
    button:hover:enabled,
    button:active:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    }
  }
`;var c=function(t,e,r,i){var o,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(s=(n<3?o(s):n>3?o(e,r,s):o(e,r))||s);return n>3&&s&&Object.defineProperty(e,r,s),s};let f=class extends e.LitElement{constructor(){super(...arguments),this.address="",this.profileName="",this.alt="",this.imageSrc="",this.icon=void 0,this.iconSize="md",this.enableGreenCircle=!0,this.loading=!1,this.charsStart=4,this.charsEnd=6}render(){return r.html`
      <button>
        ${this.leftImageTemplate()} ${this.textTemplate()} ${this.rightImageTemplate()}
      </button>
    `}leftImageTemplate(){let t=this.icon?r.html`<wui-icon
          size=${(0,o.ifDefined)(this.iconSize)}
          color="default"
          name=${this.icon}
          class="icon"
        ></wui-icon>`:r.html`<wui-image src=${this.imageSrc} alt=${this.alt}></wui-image>`;return r.html`
      <wui-flex
        alignItems="center"
        justifyContent="center"
        class="icon-box"
        data-active=${!!this.icon}
      >
        ${t}
        ${this.enableGreenCircle?r.html`<wui-flex class="circle"></wui-flex>`:null}
      </wui-flex>
    `}textTemplate(){return r.html`
      <wui-text variant="lg-regular" color="primary">
        ${s.UiHelperUtil.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?16:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"})}
      </wui-text>
    `}rightImageTemplate(){return r.html`<wui-icon name="chevronBottom" size="sm" color="default"></wui-icon>`}};f.styles=[n.resetStyles,n.elementStyles,l],c([(0,i.property)()],f.prototype,"address",void 0),c([(0,i.property)()],f.prototype,"profileName",void 0),c([(0,i.property)()],f.prototype,"alt",void 0),c([(0,i.property)()],f.prototype,"imageSrc",void 0),c([(0,i.property)()],f.prototype,"icon",void 0),c([(0,i.property)()],f.prototype,"iconSize",void 0),c([(0,i.property)({type:Boolean})],f.prototype,"enableGreenCircle",void 0),c([(0,i.property)({type:Boolean})],f.prototype,"loading",void 0),c([(0,i.property)({type:Number})],f.prototype,"charsStart",void 0),c([(0,i.property)({type:Number})],f.prototype,"charsEnd",void 0),f=c([(0,a.customElement)("wui-wallet-switch")],f),t.s([],604415)},720226,t=>{"use strict";t.i(145967);var e=t.i(604148),r=t.i(654479);t.i(582768);var i=t.i(120119);t.i(852634),t.i(864380);var o=t.i(459088),n=t.i(645975);t.i(912190);var s=t.i(162611);let a=s.css`
  :host {
    position: relative;
    background-color: ${({tokens:t})=>t.theme.foregroundTertiary};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host([data-image='true']) {
    background-color: transparent;
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host([data-size='sm']) {
    width: 32px;
    height: 32px;
  }

  :host([data-size='md']) {
    width: 40px;
    height: 40px;
  }

  :host([data-size='lg']) {
    width: 56px;
    height: 56px;
  }

  :host([name='Extension'])::after {
    border: 1px solid ${({colors:t})=>t.accent010};
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid ${({colors:t})=>t.accent010};
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon {
    color: ${({tokens:t})=>t.theme.iconDefault};
  }

  wui-icon[data-parent-size='sm'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='md'] {
    width: 32px;
    height: 32px;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid ${({tokens:t})=>t.theme.backgroundPrimary};
    padding: 1px;
  }
`;var u=function(t,e,r,i){var o,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(s=(n<3?o(s):n>3?o(e,r,s):o(e,r))||s);return n>3&&s&&Object.defineProperty(e,r,s),s};let l=class extends e.LitElement{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let t="1";return"lg"===this.size?t="4":"md"===this.size?t="2":"sm"===this.size&&(t="1"),this.style.cssText=`
       --local-border-radius: var(--apkt-borderRadius-${t});
   `,this.dataset.size=this.size,this.imageSrc&&(this.dataset.image="true"),this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),r.html`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?r.html`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?r.html`<wui-icon size="md" color="default" name=${this.walletIcon}></wui-icon>`:r.html`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="wallet"
    ></wui-icon>`}};l.styles=[o.resetStyles,a],u([(0,i.property)()],l.prototype,"size",void 0),u([(0,i.property)()],l.prototype,"name",void 0),u([(0,i.property)()],l.prototype,"imageSrc",void 0),u([(0,i.property)()],l.prototype,"walletIcon",void 0),u([(0,i.property)({type:Boolean})],l.prototype,"installed",void 0),u([(0,i.property)()],l.prototype,"badgeSize",void 0),l=u([(0,n.customElement)("wui-wallet-image")],l),t.s([],720226)},252157,t=>{"use strict";t.i(145967);var e=t.i(654479);let r=e.svg`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`;t.s(["networkSvgMd",0,r])},956303,t=>{"use strict";t.i(720226),t.s([])},116275,t=>{"use strict";t.i(145967);var e=t.i(654479);let r=e.svg`<svg width="86" height="96" fill="none">
  <path
    d="M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z"
  />
</svg>`;t.s(["networkSvgLg",0,r])},774339,t=>{"use strict";t.i(145967);var e=t.i(604148),r=t.i(654479);t.i(582768);var i=t.i(120119),o=t.i(116275),n=t.i(252157);let s=r.svg`
  <svg fill="none" viewBox="0 0 36 40">
    <path
      d="M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z"
    />
  </svg>
`;t.i(852634),t.i(864380);var a=t.i(459088),u=t.i(645975),l=t.i(162611);let c=l.css`
  :host {
    position: relative;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-width);
    height: var(--local-height);
  }

  :host([data-round='true']) {
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: 100%;
    outline: 1px solid ${({tokens:t})=>t.core.glass010};
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  svg > path {
    stroke: var(--local-stroke);
  }

  wui-image {
    width: 100%;
    height: 100%;
    -webkit-clip-path: var(--local-path);
    clip-path: var(--local-path);
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  wui-icon {
    transform: translateY(-5%);
    width: var(--local-icon-size);
    height: var(--local-icon-size);
  }
`;var f=function(t,e,r,i){var o,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(s=(n<3?o(s):n>3?o(e,r,s):o(e,r))||s);return n>3&&s&&Object.defineProperty(e,r,s),s};let h=class extends e.LitElement{constructor(){super(...arguments),this.size="md",this.name="uknown",this.networkImagesBySize={sm:s,md:n.networkSvgMd,lg:o.networkSvgLg},this.selected=!1,this.round=!1}render(){return this.round?(this.dataset.round="true",this.style.cssText=`
      --local-width: var(--apkt-spacing-10);
      --local-height: var(--apkt-spacing-10);
      --local-icon-size: var(--apkt-spacing-4);
    `):this.style.cssText=`

      --local-path: var(--apkt-path-network-${this.size});
      --local-width:  var(--apkt-width-network-${this.size});
      --local-height:  var(--apkt-height-network-${this.size});
      --local-icon-size:  var(--apkt-spacing-${({sm:"4",md:"6",lg:"10"})[this.size]});
    `,r.html`${this.templateVisual()} ${this.svgTemplate()} `}svgTemplate(){return this.round?null:this.networkImagesBySize[this.size]}templateVisual(){return this.imageSrc?r.html`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:r.html`<wui-icon size="inherit" color="default" name="networkPlaceholder"></wui-icon>`}};h.styles=[a.resetStyles,c],f([(0,i.property)()],h.prototype,"size",void 0),f([(0,i.property)()],h.prototype,"name",void 0),f([(0,i.property)({type:Object})],h.prototype,"networkImagesBySize",void 0),f([(0,i.property)()],h.prototype,"imageSrc",void 0),f([(0,i.property)({type:Boolean})],h.prototype,"selected",void 0),f([(0,i.property)({type:Boolean})],h.prototype,"round",void 0),h=f([(0,u.customElement)("wui-network-image")],h),t.s([],774339)},467034,(t,e,r)=>{var i={675:function(t,e){"use strict";e.byteLength=function(t){var e=u(t),r=e[0],i=e[1];return(r+i)*3/4-i},e.toByteArray=function(t){var e,r,n=u(t),s=n[0],a=n[1],l=new o((s+a)*3/4-a),c=0,f=a>0?s-4:s;for(r=0;r<f;r+=4)e=i[t.charCodeAt(r)]<<18|i[t.charCodeAt(r+1)]<<12|i[t.charCodeAt(r+2)]<<6|i[t.charCodeAt(r+3)],l[c++]=e>>16&255,l[c++]=e>>8&255,l[c++]=255&e;return 2===a&&(e=i[t.charCodeAt(r)]<<2|i[t.charCodeAt(r+1)]>>4,l[c++]=255&e),1===a&&(e=i[t.charCodeAt(r)]<<10|i[t.charCodeAt(r+1)]<<4|i[t.charCodeAt(r+2)]>>2,l[c++]=e>>8&255,l[c++]=255&e),l},e.fromByteArray=function(t){for(var e,i=t.length,o=i%3,n=[],s=0,a=i-o;s<a;s+=16383)n.push(function(t,e,i){for(var o,n=[],s=e;s<i;s+=3)o=(t[s]<<16&0xff0000)+(t[s+1]<<8&65280)+(255&t[s+2]),n.push(r[o>>18&63]+r[o>>12&63]+r[o>>6&63]+r[63&o]);return n.join("")}(t,s,s+16383>a?a:s+16383));return 1===o?n.push(r[(e=t[i-1])>>2]+r[e<<4&63]+"=="):2===o&&n.push(r[(e=(t[i-2]<<8)+t[i-1])>>10]+r[e>>4&63]+r[e<<2&63]+"="),n.join("")};for(var r=[],i=[],o="u">typeof Uint8Array?Uint8Array:Array,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=0,a=n.length;s<a;++s)r[s]=n[s],i[n.charCodeAt(s)]=s;function u(t){var e=t.length;if(e%4>0)throw Error("Invalid string. Length must be a multiple of 4");var r=t.indexOf("=");-1===r&&(r=e);var i=r===e?0:4-r%4;return[r,i]}i[45]=62,i[95]=63},72:function(t,e,r){"use strict";var i=r(675),o=r(783),n="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;function s(t){if(t>0x7fffffff)throw RangeError('The value "'+t+'" is invalid for option "size"');var e=new Uint8Array(t);return Object.setPrototypeOf(e,a.prototype),e}function a(t,e,r){if("number"==typeof t){if("string"==typeof e)throw TypeError('The "string" argument must be of type string. Received type number');return c(t)}return u(t,e,r)}function u(t,e,r){if("string"==typeof t){var i=t,o=e;if(("string"!=typeof o||""===o)&&(o="utf8"),!a.isEncoding(o))throw TypeError("Unknown encoding: "+o);var n=0|p(i,o),u=s(n),l=u.write(i,o);return l!==n&&(u=u.slice(0,l)),u}if(ArrayBuffer.isView(t))return f(t);if(null==t)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(L(t,ArrayBuffer)||t&&L(t.buffer,ArrayBuffer)||"u">typeof SharedArrayBuffer&&(L(t,SharedArrayBuffer)||t&&L(t.buffer,SharedArrayBuffer)))return function(t,e,r){var i;if(e<0||t.byteLength<e)throw RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(r||0))throw RangeError('"length" is outside of buffer bounds');return Object.setPrototypeOf(i=void 0===e&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,e):new Uint8Array(t,e,r),a.prototype),i}(t,e,r);if("number"==typeof t)throw TypeError('The "value" argument must not be of type number. Received type number');var c=t.valueOf&&t.valueOf();if(null!=c&&c!==t)return a.from(c,e,r);var d=function(t){if(a.isBuffer(t)){var e=0|h(t.length),r=s(e);return 0===r.length||t.copy(r,0,0,e),r}return void 0!==t.length?"number"!=typeof t.length||function(t){return t!=t}(t.length)?s(0):f(t):"Buffer"===t.type&&Array.isArray(t.data)?f(t.data):void 0}(t);if(d)return d;if("u">typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return a.from(t[Symbol.toPrimitive]("string"),e,r);throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function l(t){if("number"!=typeof t)throw TypeError('"size" argument must be of type number');if(t<0)throw RangeError('The value "'+t+'" is invalid for option "size"')}function c(t){return l(t),s(t<0?0:0|h(t))}function f(t){for(var e=t.length<0?0:0|h(t.length),r=s(e),i=0;i<e;i+=1)r[i]=255&t[i];return r}e.Buffer=a,e.SlowBuffer=function(t){return+t!=t&&(t=0),a.alloc(+t)},e.INSPECT_MAX_BYTES=50,e.kMaxLength=0x7fffffff,a.TYPED_ARRAY_SUPPORT=function(){try{var t=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),42===t.foo()}catch(t){return!1}}(),!a.TYPED_ARRAY_SUPPORT&&"u">typeof console&&"function"==typeof console.error&&console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(a.prototype,"parent",{enumerable:!0,get:function(){if(a.isBuffer(this))return this.buffer}}),Object.defineProperty(a.prototype,"offset",{enumerable:!0,get:function(){if(a.isBuffer(this))return this.byteOffset}}),a.poolSize=8192,a.from=function(t,e,r){return u(t,e,r)},Object.setPrototypeOf(a.prototype,Uint8Array.prototype),Object.setPrototypeOf(a,Uint8Array),a.alloc=function(t,e,r){return(l(t),t<=0)?s(t):void 0!==e?"string"==typeof r?s(t).fill(e,r):s(t).fill(e):s(t)},a.allocUnsafe=function(t){return c(t)},a.allocUnsafeSlow=function(t){return c(t)};function h(t){if(t>=0x7fffffff)throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes");return 0|t}function p(t,e){if(a.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||L(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);var r=t.length,i=arguments.length>2&&!0===arguments[2];if(!i&&0===r)return 0;for(var o=!1;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return T(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return R(t).length;default:if(o)return i?-1:T(t).length;e=(""+e).toLowerCase(),o=!0}}function d(t,e,r){var o,n,s,a=!1;if((void 0===e||e<0)&&(e=0),e>this.length||((void 0===r||r>this.length)&&(r=this.length),r<=0||(r>>>=0)<=(e>>>=0)))return"";for(t||(t="utf8");;)switch(t){case"hex":return function(t,e,r){var i=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>i)&&(r=i);for(var o="",n=e;n<r;++n)o+=_[t[n]];return o}(this,e,r);case"utf8":case"utf-8":return m(this,e,r);case"ascii":return function(t,e,r){var i="";r=Math.min(t.length,r);for(var o=e;o<r;++o)i+=String.fromCharCode(127&t[o]);return i}(this,e,r);case"latin1":case"binary":return function(t,e,r){var i="";r=Math.min(t.length,r);for(var o=e;o<r;++o)i+=String.fromCharCode(t[o]);return i}(this,e,r);case"base64":return o=this,n=e,s=r,0===n&&s===o.length?i.fromByteArray(o):i.fromByteArray(o.slice(n,s));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(t,e,r){for(var i=t.slice(e,r),o="",n=0;n<i.length;n+=2)o+=String.fromCharCode(i[n]+256*i[n+1]);return o}(this,e,r);default:if(a)throw TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),a=!0}}function y(t,e,r){var i=t[e];t[e]=t[r],t[r]=i}function g(t,e,r,i,o){var n;if(0===t.length)return -1;if("string"==typeof r?(i=r,r=0):r>0x7fffffff?r=0x7fffffff:r<-0x80000000&&(r=-0x80000000),(n=r*=1)!=n&&(r=o?0:t.length-1),r<0&&(r=t.length+r),r>=t.length)if(o)return -1;else r=t.length-1;else if(r<0)if(!o)return -1;else r=0;if("string"==typeof e&&(e=a.from(e,i)),a.isBuffer(e))return 0===e.length?-1:v(t,e,r,i,o);if("number"==typeof e){if(e&=255,"function"==typeof Uint8Array.prototype.indexOf)if(o)return Uint8Array.prototype.indexOf.call(t,e,r);else return Uint8Array.prototype.lastIndexOf.call(t,e,r);return v(t,[e],r,i,o)}throw TypeError("val must be string, number or Buffer")}function v(t,e,r,i,o){var n,s=1,a=t.length,u=e.length;if(void 0!==i&&("ucs2"===(i=String(i).toLowerCase())||"ucs-2"===i||"utf16le"===i||"utf-16le"===i)){if(t.length<2||e.length<2)return -1;s=2,a/=2,u/=2,r/=2}function l(t,e){return 1===s?t[e]:t.readUInt16BE(e*s)}if(o){var c=-1;for(n=r;n<a;n++)if(l(t,n)===l(e,-1===c?0:n-c)){if(-1===c&&(c=n),n-c+1===u)return c*s}else -1!==c&&(n-=n-c),c=-1}else for(r+u>a&&(r=a-u),n=r;n>=0;n--){for(var f=!0,h=0;h<u;h++)if(l(t,n+h)!==l(e,h)){f=!1;break}if(f)return n}return -1}a.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==a.prototype},a.compare=function(t,e){if(L(t,Uint8Array)&&(t=a.from(t,t.offset,t.byteLength)),L(e,Uint8Array)&&(e=a.from(e,e.offset,e.byteLength)),!a.isBuffer(t)||!a.isBuffer(e))throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;for(var r=t.length,i=e.length,o=0,n=Math.min(r,i);o<n;++o)if(t[o]!==e[o]){r=t[o],i=e[o];break}return r<i?-1:+(i<r)},a.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},a.concat=function(t,e){if(!Array.isArray(t))throw TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return a.alloc(0);if(void 0===e)for(r=0,e=0;r<t.length;++r)e+=t[r].length;var r,i=a.allocUnsafe(e),o=0;for(r=0;r<t.length;++r){var n=t[r];if(L(n,Uint8Array)&&(n=a.from(n)),!a.isBuffer(n))throw TypeError('"list" argument must be an Array of Buffers');n.copy(i,o),o+=n.length}return i},a.byteLength=p,a.prototype._isBuffer=!0,a.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw RangeError("Buffer size must be a multiple of 16-bits");for(var e=0;e<t;e+=2)y(this,e,e+1);return this},a.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw RangeError("Buffer size must be a multiple of 32-bits");for(var e=0;e<t;e+=4)y(this,e,e+3),y(this,e+1,e+2);return this},a.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw RangeError("Buffer size must be a multiple of 64-bits");for(var e=0;e<t;e+=8)y(this,e,e+7),y(this,e+1,e+6),y(this,e+2,e+5),y(this,e+3,e+4);return this},a.prototype.toString=function(){var t=this.length;return 0===t?"":0==arguments.length?m(this,0,t):d.apply(this,arguments)},a.prototype.toLocaleString=a.prototype.toString,a.prototype.equals=function(t){if(!a.isBuffer(t))throw TypeError("Argument must be a Buffer");return this===t||0===a.compare(this,t)},a.prototype.inspect=function(){var t="",r=e.INSPECT_MAX_BYTES;return t=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(t+=" ... "),"<Buffer "+t+">"},n&&(a.prototype[n]=a.prototype.inspect),a.prototype.compare=function(t,e,r,i,o){if(L(t,Uint8Array)&&(t=a.from(t,t.offset,t.byteLength)),!a.isBuffer(t))throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===i&&(i=0),void 0===o&&(o=this.length),e<0||r>t.length||i<0||o>this.length)throw RangeError("out of range index");if(i>=o&&e>=r)return 0;if(i>=o)return -1;if(e>=r)return 1;if(e>>>=0,r>>>=0,i>>>=0,o>>>=0,this===t)return 0;for(var n=o-i,s=r-e,u=Math.min(n,s),l=this.slice(i,o),c=t.slice(e,r),f=0;f<u;++f)if(l[f]!==c[f]){n=l[f],s=c[f];break}return n<s?-1:+(s<n)},a.prototype.includes=function(t,e,r){return -1!==this.indexOf(t,e,r)},a.prototype.indexOf=function(t,e,r){return g(this,t,e,r,!0)},a.prototype.lastIndexOf=function(t,e,r){return g(this,t,e,r,!1)};function m(t,e,r){r=Math.min(t.length,r);for(var i=[],o=e;o<r;){var n,s,a,u,l=t[o],c=null,f=l>239?4:l>223?3:l>191?2:1;if(o+f<=r)switch(f){case 1:l<128&&(c=l);break;case 2:(192&(n=t[o+1]))==128&&(u=(31&l)<<6|63&n)>127&&(c=u);break;case 3:n=t[o+1],s=t[o+2],(192&n)==128&&(192&s)==128&&(u=(15&l)<<12|(63&n)<<6|63&s)>2047&&(u<55296||u>57343)&&(c=u);break;case 4:n=t[o+1],s=t[o+2],a=t[o+3],(192&n)==128&&(192&s)==128&&(192&a)==128&&(u=(15&l)<<18|(63&n)<<12|(63&s)<<6|63&a)>65535&&u<1114112&&(c=u)}null===c?(c=65533,f=1):c>65535&&(c-=65536,i.push(c>>>10&1023|55296),c=56320|1023&c),i.push(c),o+=f}var h=i,p=h.length;if(p<=4096)return String.fromCharCode.apply(String,h);for(var d="",y=0;y<p;)d+=String.fromCharCode.apply(String,h.slice(y,y+=4096));return d}function w(t,e,r){if(t%1!=0||t<0)throw RangeError("offset is not uint");if(t+e>r)throw RangeError("Trying to access beyond buffer length")}function b(t,e,r,i,o,n){if(!a.isBuffer(t))throw TypeError('"buffer" argument must be a Buffer instance');if(e>o||e<n)throw RangeError('"value" argument is out of bounds');if(r+i>t.length)throw RangeError("Index out of range")}function E(t,e,r,i,o,n){if(r+i>t.length||r<0)throw RangeError("Index out of range")}function x(t,e,r,i,n){return e*=1,r>>>=0,n||E(t,e,r,4,34028234663852886e22,-34028234663852886e22),o.write(t,e,r,i,23,4),r+4}function C(t,e,r,i,n){return e*=1,r>>>=0,n||E(t,e,r,8,17976931348623157e292,-17976931348623157e292),o.write(t,e,r,i,52,8),r+8}a.prototype.write=function(t,e,r,i){if(void 0===e)i="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)i=e,r=this.length,e=0;else if(isFinite(e))e>>>=0,isFinite(r)?(r>>>=0,void 0===i&&(i="utf8")):(i=r,r=void 0);else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");var o,n,s,a,u,l,c,f,h=this.length-e;if((void 0===r||r>h)&&(r=h),t.length>0&&(r<0||e<0)||e>this.length)throw RangeError("Attempt to write outside buffer bounds");i||(i="utf8");for(var p=!1;;)switch(i){case"hex":return function(t,e,r,i){r=Number(r)||0;var o=t.length-r;i?(i=Number(i))>o&&(i=o):i=o;var n=e.length;i>n/2&&(i=n/2);for(var s=0;s<i;++s){var a,u=parseInt(e.substr(2*s,2),16);if((a=u)!=a)break;t[r+s]=u}return s}(this,t,e,r);case"utf8":case"utf-8":return o=e,n=r,N(T(t,this.length-o),this,o,n);case"ascii":return s=e,a=r,N(A(t),this,s,a);case"latin1":case"binary":return function(t,e,r,i){return N(A(e),t,r,i)}(this,t,e,r);case"base64":return u=e,l=r,N(R(t),this,u,l);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return c=e,f=r,N(function(t,e){for(var r,i,o=[],n=0;n<t.length&&!((e-=2)<0);++n)i=(r=t.charCodeAt(n))>>8,o.push(r%256),o.push(i);return o}(t,this.length-c),this,c,f);default:if(p)throw TypeError("Unknown encoding: "+i);i=(""+i).toLowerCase(),p=!0}},a.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},a.prototype.slice=function(t,e){var r=this.length;t=~~t,e=void 0===e?r:~~e,t<0?(t+=r)<0&&(t=0):t>r&&(t=r),e<0?(e+=r)<0&&(e=0):e>r&&(e=r),e<t&&(e=t);var i=this.subarray(t,e);return Object.setPrototypeOf(i,a.prototype),i},a.prototype.readUIntLE=function(t,e,r){t>>>=0,e>>>=0,r||w(t,e,this.length);for(var i=this[t],o=1,n=0;++n<e&&(o*=256);)i+=this[t+n]*o;return i},a.prototype.readUIntBE=function(t,e,r){t>>>=0,e>>>=0,r||w(t,e,this.length);for(var i=this[t+--e],o=1;e>0&&(o*=256);)i+=this[t+--e]*o;return i},a.prototype.readUInt8=function(t,e){return t>>>=0,e||w(t,1,this.length),this[t]},a.prototype.readUInt16LE=function(t,e){return t>>>=0,e||w(t,2,this.length),this[t]|this[t+1]<<8},a.prototype.readUInt16BE=function(t,e){return t>>>=0,e||w(t,2,this.length),this[t]<<8|this[t+1]},a.prototype.readUInt32LE=function(t,e){return t>>>=0,e||w(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+0x1000000*this[t+3]},a.prototype.readUInt32BE=function(t,e){return t>>>=0,e||w(t,4,this.length),0x1000000*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},a.prototype.readIntLE=function(t,e,r){t>>>=0,e>>>=0,r||w(t,e,this.length);for(var i=this[t],o=1,n=0;++n<e&&(o*=256);)i+=this[t+n]*o;return i>=(o*=128)&&(i-=Math.pow(2,8*e)),i},a.prototype.readIntBE=function(t,e,r){t>>>=0,e>>>=0,r||w(t,e,this.length);for(var i=e,o=1,n=this[t+--i];i>0&&(o*=256);)n+=this[t+--i]*o;return n>=(o*=128)&&(n-=Math.pow(2,8*e)),n},a.prototype.readInt8=function(t,e){return(t>>>=0,e||w(t,1,this.length),128&this[t])?-((255-this[t]+1)*1):this[t]},a.prototype.readInt16LE=function(t,e){t>>>=0,e||w(t,2,this.length);var r=this[t]|this[t+1]<<8;return 32768&r?0xffff0000|r:r},a.prototype.readInt16BE=function(t,e){t>>>=0,e||w(t,2,this.length);var r=this[t+1]|this[t]<<8;return 32768&r?0xffff0000|r:r},a.prototype.readInt32LE=function(t,e){return t>>>=0,e||w(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},a.prototype.readInt32BE=function(t,e){return t>>>=0,e||w(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},a.prototype.readFloatLE=function(t,e){return t>>>=0,e||w(t,4,this.length),o.read(this,t,!0,23,4)},a.prototype.readFloatBE=function(t,e){return t>>>=0,e||w(t,4,this.length),o.read(this,t,!1,23,4)},a.prototype.readDoubleLE=function(t,e){return t>>>=0,e||w(t,8,this.length),o.read(this,t,!0,52,8)},a.prototype.readDoubleBE=function(t,e){return t>>>=0,e||w(t,8,this.length),o.read(this,t,!1,52,8)},a.prototype.writeUIntLE=function(t,e,r,i){if(t*=1,e>>>=0,r>>>=0,!i){var o=Math.pow(2,8*r)-1;b(this,t,e,r,o,0)}var n=1,s=0;for(this[e]=255&t;++s<r&&(n*=256);)this[e+s]=t/n&255;return e+r},a.prototype.writeUIntBE=function(t,e,r,i){if(t*=1,e>>>=0,r>>>=0,!i){var o=Math.pow(2,8*r)-1;b(this,t,e,r,o,0)}var n=r-1,s=1;for(this[e+n]=255&t;--n>=0&&(s*=256);)this[e+n]=t/s&255;return e+r},a.prototype.writeUInt8=function(t,e,r){return t*=1,e>>>=0,r||b(this,t,e,1,255,0),this[e]=255&t,e+1},a.prototype.writeUInt16LE=function(t,e,r){return t*=1,e>>>=0,r||b(this,t,e,2,65535,0),this[e]=255&t,this[e+1]=t>>>8,e+2},a.prototype.writeUInt16BE=function(t,e,r){return t*=1,e>>>=0,r||b(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=255&t,e+2},a.prototype.writeUInt32LE=function(t,e,r){return t*=1,e>>>=0,r||b(this,t,e,4,0xffffffff,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t,e+4},a.prototype.writeUInt32BE=function(t,e,r){return t*=1,e>>>=0,r||b(this,t,e,4,0xffffffff,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},a.prototype.writeIntLE=function(t,e,r,i){if(t*=1,e>>>=0,!i){var o=Math.pow(2,8*r-1);b(this,t,e,r,o-1,-o)}var n=0,s=1,a=0;for(this[e]=255&t;++n<r&&(s*=256);)t<0&&0===a&&0!==this[e+n-1]&&(a=1),this[e+n]=(t/s|0)-a&255;return e+r},a.prototype.writeIntBE=function(t,e,r,i){if(t*=1,e>>>=0,!i){var o=Math.pow(2,8*r-1);b(this,t,e,r,o-1,-o)}var n=r-1,s=1,a=0;for(this[e+n]=255&t;--n>=0&&(s*=256);)t<0&&0===a&&0!==this[e+n+1]&&(a=1),this[e+n]=(t/s|0)-a&255;return e+r},a.prototype.writeInt8=function(t,e,r){return t*=1,e>>>=0,r||b(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=255&t,e+1},a.prototype.writeInt16LE=function(t,e,r){return t*=1,e>>>=0,r||b(this,t,e,2,32767,-32768),this[e]=255&t,this[e+1]=t>>>8,e+2},a.prototype.writeInt16BE=function(t,e,r){return t*=1,e>>>=0,r||b(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=255&t,e+2},a.prototype.writeInt32LE=function(t,e,r){return t*=1,e>>>=0,r||b(this,t,e,4,0x7fffffff,-0x80000000),this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4},a.prototype.writeInt32BE=function(t,e,r){return t*=1,e>>>=0,r||b(this,t,e,4,0x7fffffff,-0x80000000),t<0&&(t=0xffffffff+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},a.prototype.writeFloatLE=function(t,e,r){return x(this,t,e,!0,r)},a.prototype.writeFloatBE=function(t,e,r){return x(this,t,e,!1,r)},a.prototype.writeDoubleLE=function(t,e,r){return C(this,t,e,!0,r)},a.prototype.writeDoubleBE=function(t,e,r){return C(this,t,e,!1,r)},a.prototype.copy=function(t,e,r,i){if(!a.isBuffer(t))throw TypeError("argument should be a Buffer");if(r||(r=0),i||0===i||(i=this.length),e>=t.length&&(e=t.length),e||(e=0),i>0&&i<r&&(i=r),i===r||0===t.length||0===this.length)return 0;if(e<0)throw RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw RangeError("Index out of range");if(i<0)throw RangeError("sourceEnd out of bounds");i>this.length&&(i=this.length),t.length-e<i-r&&(i=t.length-e+r);var o=i-r;if(this===t&&"function"==typeof Uint8Array.prototype.copyWithin)this.copyWithin(e,r,i);else if(this===t&&r<e&&e<i)for(var n=o-1;n>=0;--n)t[n+e]=this[n+r];else Uint8Array.prototype.set.call(t,this.subarray(r,i),e);return o},a.prototype.fill=function(t,e,r,i){if("string"==typeof t){if("string"==typeof e?(i=e,e=0,r=this.length):"string"==typeof r&&(i=r,r=this.length),void 0!==i&&"string"!=typeof i)throw TypeError("encoding must be a string");if("string"==typeof i&&!a.isEncoding(i))throw TypeError("Unknown encoding: "+i);if(1===t.length){var o,n=t.charCodeAt(0);("utf8"===i&&n<128||"latin1"===i)&&(t=n)}}else"number"==typeof t?t&=255:"boolean"==typeof t&&(t=Number(t));if(e<0||this.length<e||this.length<r)throw RangeError("Out of range index");if(r<=e)return this;if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),"number"==typeof t)for(o=e;o<r;++o)this[o]=t;else{var s=a.isBuffer(t)?t:a.from(t,i),u=s.length;if(0===u)throw TypeError('The value "'+t+'" is invalid for argument "value"');for(o=0;o<r-e;++o)this[o+e]=s[o%u]}return this};var O=/[^+/0-9A-Za-z-_]/g;function T(t,e){e=e||1/0;for(var r,i=t.length,o=null,n=[],s=0;s<i;++s){if((r=t.charCodeAt(s))>55295&&r<57344){if(!o){if(r>56319||s+1===i){(e-=3)>-1&&n.push(239,191,189);continue}o=r;continue}if(r<56320){(e-=3)>-1&&n.push(239,191,189),o=r;continue}r=(o-55296<<10|r-56320)+65536}else o&&(e-=3)>-1&&n.push(239,191,189);if(o=null,r<128){if((e-=1)<0)break;n.push(r)}else if(r<2048){if((e-=2)<0)break;n.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;n.push(r>>12|224,r>>6&63|128,63&r|128)}else if(r<1114112){if((e-=4)<0)break;n.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}else throw Error("Invalid code point")}return n}function A(t){for(var e=[],r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}function R(t){return i.toByteArray(function(t){if((t=(t=t.split("=")[0]).trim().replace(O,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function N(t,e,r,i){for(var o=0;o<i&&!(o+r>=e.length)&&!(o>=t.length);++o)e[o+r]=t[o];return o}function L(t,e){return t instanceof e||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===e.name}var _=function(){for(var t="0123456789abcdef",e=Array(256),r=0;r<16;++r)for(var i=16*r,o=0;o<16;++o)e[i+o]=t[r]+t[o];return e}()},783:function(t,e){e.read=function(t,e,r,i,o){var n,s,a=8*o-i-1,u=(1<<a)-1,l=u>>1,c=-7,f=r?o-1:0,h=r?-1:1,p=t[e+f];for(f+=h,n=p&(1<<-c)-1,p>>=-c,c+=a;c>0;n=256*n+t[e+f],f+=h,c-=8);for(s=n&(1<<-c)-1,n>>=-c,c+=i;c>0;s=256*s+t[e+f],f+=h,c-=8);if(0===n)n=1-l;else{if(n===u)return s?NaN:1/0*(p?-1:1);s+=Math.pow(2,i),n-=l}return(p?-1:1)*s*Math.pow(2,n-i)},e.write=function(t,e,r,i,o,n){var s,a,u,l=8*n-o-1,c=(1<<l)-1,f=c>>1,h=5960464477539062e-23*(23===o),p=i?0:n-1,d=i?1:-1,y=+(e<0||0===e&&1/e<0);for(isNaN(e=Math.abs(e))||e===1/0?(a=+!!isNaN(e),s=c):(s=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-s))<1&&(s--,u*=2),s+f>=1?e+=h/u:e+=h*Math.pow(2,1-f),e*u>=2&&(s++,u/=2),s+f>=c?(a=0,s=c):s+f>=1?(a=(e*u-1)*Math.pow(2,o),s+=f):(a=e*Math.pow(2,f-1)*Math.pow(2,o),s=0));o>=8;t[r+p]=255&a,p+=d,a/=256,o-=8);for(s=s<<o|a,l+=o;l>0;t[r+p]=255&s,p+=d,s/=256,l-=8);t[r+p-d]|=128*y}}},o={};function n(t){var e=o[t];if(void 0!==e)return e.exports;var r=o[t]={exports:{}},s=!0;try{i[t](r,r.exports,n),s=!1}finally{s&&delete o[t]}return r.exports}n.ab="/ROOT/node_modules/next/dist/compiled/buffer/",e.exports=n(72)},168679,t=>{"use strict";let e;function r(t){return new Promise((e,r)=>{t.oncomplete=t.onsuccess=()=>e(t.result),t.onabort=t.onerror=()=>r(t.error)})}function i(t,e){let i=indexedDB.open(t);i.onupgradeneeded=()=>i.result.createObjectStore(e);let o=r(i);return(t,r)=>o.then(i=>r(i.transaction(e,t).objectStore(e)))}function o(){return e||(e=i("keyval-store","keyval")),e}function n(t,e=o()){return e("readonly",e=>r(e.get(t)))}function s(t,e,i=o()){return i("readwrite",i=>(i.put(e,t),r(i.transaction)))}function a(t,e=o()){return e("readwrite",e=>(e.delete(t),r(e.transaction)))}function u(t=o()){return t("readwrite",t=>(t.clear(),r(t.transaction)))}function l(t=o()){return t("readonly",t=>{var e;if(t.getAllKeys)return r(t.getAllKeys());let i=[];return(e=t=>i.push(t.key),t.openCursor().onsuccess=function(){this.result&&(e(this.result),this.result.continue())},r(t.transaction)).then(()=>i)})}t.s(["clear",()=>u,"createStore",()=>i,"del",()=>a,"get",()=>n,"keys",()=>l,"set",()=>s])},741611,748449,t=>{"use strict";t.i(353845);var e=t.i(604148),r=t.i(654479);t.i(713724);var i=t.i(120119),o=t.i(56350),n=t.i(803468),s=t.i(221728),a=t.i(365801),u=t.i(742710),l=t.i(592279);let c=(0,a.proxy)({message:"",open:!1,triggerRect:{width:0,height:0,top:0,left:0},variant:"shade"}),f=(0,l.withErrorBoundary)({state:c,subscribe:t=>(0,a.subscribe)(c,()=>t(c)),subscribeKey:(t,e)=>(0,u.subscribeKey)(c,t,e),showTooltip({message:t,triggerRect:e,variant:r}){c.open=!0,c.message=t,c.triggerRect=e,c.variant=r},hide(){c.open=!1,c.message="",c.triggerRect={width:0,height:0,top:0,left:0}}});t.i(404041);var h=t.i(645975),p=t.i(592057);let d=p.css`
  :host {
    width: 100%;
    display: block;
  }
`;var y=function(t,e,r,i){var o,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(s=(n<3?o(s):n>3?o(e,r,s):o(e,r))||s);return n>3&&s&&Object.defineProperty(e,r,s),s};let g=class extends e.LitElement{constructor(){super(),this.unsubscribe=[],this.text="",this.open=f.state.open,this.unsubscribe.push(s.RouterController.subscribeKey("view",()=>{f.hide()}),n.ModalController.subscribeKey("open",t=>{t||f.hide()}),f.subscribeKey("open",t=>{this.open=t}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),f.hide()}render(){return r.html`
      <div
        @pointermove=${this.onMouseEnter.bind(this)}
        @pointerleave=${this.onMouseLeave.bind(this)}
      >
        ${this.renderChildren()}
      </div>
    `}renderChildren(){return r.html`<slot></slot> `}onMouseEnter(){let t=this.getBoundingClientRect();if(!this.open){let e=document.querySelector("w3m-modal"),r={width:t.width,height:t.height,left:t.left,top:t.top};if(e){let i=e.getBoundingClientRect();r.left=t.left-(window.innerWidth-i.width)/2,r.top=t.top-(window.innerHeight-i.height)/2}f.showTooltip({message:this.text,triggerRect:r,variant:"shade"})}}onMouseLeave(t){this.contains(t.relatedTarget)||f.hide()}};g.styles=[d],y([(0,i.property)()],g.prototype,"text",void 0),y([(0,o.state)()],g.prototype,"open",void 0),g=y([(0,h.customElement)("w3m-tooltip-trigger")],g),t.s([],741611);var v=e;t.i(62238),t.i(443452),t.i(249536);var m=t.i(162611);let w=m.css`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px ${({spacing:t})=>t["3"]} 10px ${({spacing:t})=>t["3"]};
    border-radius: ${({borderRadius:t})=>t["3"]};
    color: ${({tokens:t})=>t.theme.backgroundPrimary};
    position: absolute;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--apkt-modal-width) - ${({spacing:t})=>t["5"]});
    transition: opacity ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-2"]};
    will-change: opacity;
    opacity: 0;
    animation-duration: ${({durations:t})=>t.xl};
    animation-timing-function: ${({easings:t})=>t["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: ${({tokens:t})=>t.theme.textSecondary};
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: ${({tokens:t})=>t.theme.backgroundPrimary};
    border: 1px solid ${({tokens:t})=>t.theme.borderPrimary};
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: ${({tokens:t})=>t.theme.foregroundPrimary};
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;var b=function(t,e,r,i){var o,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(s=(n<3?o(s):n>3?o(e,r,s):o(e,r))||s);return n>3&&s&&Object.defineProperty(e,r,s),s};let E=class extends v.LitElement{constructor(){super(),this.unsubscribe=[],this.open=f.state.open,this.message=f.state.message,this.triggerRect=f.state.triggerRect,this.variant=f.state.variant,this.unsubscribe.push(f.subscribe(t=>{this.open=t.open,this.message=t.message,this.triggerRect=t.triggerRect,this.variant=t.variant}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){this.dataset.variant=this.variant;let t=this.triggerRect.top,e=this.triggerRect.left;return this.style.cssText=`
    --w3m-tooltip-top: ${t}px;
    --w3m-tooltip-left: ${e}px;
    --w3m-tooltip-parent-width: ${this.triggerRect.width/2}px;
    --w3m-tooltip-display: ${this.open?"flex":"none"};
    --w3m-tooltip-opacity: ${+!!this.open};
    `,r.html`<wui-flex>
      <wui-icon data-placement="top" size="inherit" name="cursor"></wui-icon>
      <wui-text color="primary" variant="sm-regular">${this.message}</wui-text>
    </wui-flex>`}};E.styles=[w],b([(0,o.state)()],E.prototype,"open",void 0),b([(0,o.state)()],E.prototype,"message",void 0),b([(0,o.state)()],E.prototype,"triggerRect",void 0),b([(0,o.state)()],E.prototype,"variant",void 0),E=b([(0,h.customElement)("w3m-tooltip")],E),t.s([],748449)},225416,803596,t=>{"use strict";t.i(353845);var e=t.i(604148),r=t.i(654479);t.i(713724);var i=t.i(56350),o=t.i(82283);t.i(404041);var n=t.i(645975);t.i(62238),t.i(249536),t.i(145967);var s=e;t.i(852634),t.i(839009),t.i(73944);var a=t.i(459088),u=t.i(162611);let l=u.css`
  .reown-logo {
    height: 24px;
  }

  a {
    text-decoration: none;
    cursor: pointer;
    color: ${({tokens:t})=>t.theme.textSecondary};
  }

  a:hover {
    opacity: 0.9;
  }
`,c=class extends s.LitElement{render(){return r.html`
      <a
        data-testid="ux-branding-reown"
        href=${"https://reown.com"}
        rel="noreferrer"
        target="_blank"
        style="text-decoration: none;"
      >
        <wui-flex
          justifyContent="center"
          alignItems="center"
          gap="1"
          .padding=${["01","0","3","0"]}
        >
          <wui-text variant="sm-regular" color="inherit"> UX by </wui-text>
          <wui-icon name="reown" size="inherit" class="reown-logo"></wui-icon>
        </wui-flex>
      </a>
    `}};c.styles=[a.resetStyles,a.elementStyles,l],c=function(t,e,r,i){var o,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(s=(n<3?o(s):n>3?o(e,r,s):o(e,r))||s);return n>3&&s&&Object.defineProperty(e,r,s),s}([(0,n.customElement)("wui-ux-by-reown")],c),t.s([],803596);let f=u.css`
  :host wui-ux-by-reown {
    padding-top: 0;
  }

  :host wui-ux-by-reown.branding-only {
    padding-top: ${({spacing:t})=>t["3"]};
  }

  a {
    text-decoration: none;
    color: ${({tokens:t})=>t.core.textAccentPrimary};
    font-weight: 500;
  }
`;var h=function(t,e,r,i){var o,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(s=(n<3?o(s):n>3?o(e,r,s):o(e,r))||s);return n>3&&s&&Object.defineProperty(e,r,s),s};let p=class extends e.LitElement{constructor(){super(),this.unsubscribe=[],this.remoteFeatures=o.OptionsController.state.remoteFeatures,this.unsubscribe.push(o.OptionsController.subscribeKey("remoteFeatures",t=>this.remoteFeatures=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){let{termsConditionsUrl:t,privacyPolicyUrl:e}=o.OptionsController.state,i=o.OptionsController.state.features?.legalCheckbox;return(t||e)&&!i?r.html`
      <wui-flex flexDirection="column">
        <wui-flex .padding=${["4","3","3","3"]} justifyContent="center">
          <wui-text color="secondary" variant="md-regular" align="center">
            By connecting your wallet, you agree to our <br />
            ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
          </wui-text>
        </wui-flex>
        ${this.reownBrandingTemplate()}
      </wui-flex>
    `:r.html`
        <wui-flex flexDirection="column"> ${this.reownBrandingTemplate(!0)} </wui-flex>
      `}andTemplate(){let{termsConditionsUrl:t,privacyPolicyUrl:e}=o.OptionsController.state;return t&&e?"and":""}termsTemplate(){let{termsConditionsUrl:t}=o.OptionsController.state;return t?r.html`<a href=${t} target="_blank" rel="noopener noreferrer"
      >Terms of Service</a
    >`:null}privacyTemplate(){let{privacyPolicyUrl:t}=o.OptionsController.state;return t?r.html`<a href=${t} target="_blank" rel="noopener noreferrer"
      >Privacy Policy</a
    >`:null}reownBrandingTemplate(t=!1){return this.remoteFeatures?.reownBranding?t?r.html`<wui-ux-by-reown class="branding-only"></wui-ux-by-reown>`:r.html`<wui-ux-by-reown></wui-ux-by-reown>`:null}};p.styles=[f],h([(0,i.state)()],p.prototype,"remoteFeatures",void 0),p=h([(0,n.customElement)("w3m-legal-footer")],p),t.s([],225416)},550230,t=>{"use strict";t.i(353845);var e=t.i(604148),r=t.i(654479),i=t.i(960398),o=t.i(653157),n=t.i(82283),s=t.i(221728),a=t.i(564126);t.i(404041);var u=t.i(645975);t.i(62238),t.i(443452),t.i(210380),t.i(249536);var l=t.i(979484),c=t.i(592057);let f=c.css``,h=class extends e.LitElement{render(){let{termsConditionsUrl:t,privacyPolicyUrl:e}=n.OptionsController.state;return t||e?r.html`
      <wui-flex
        .padding=${["4","3","3","3"]}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="3"
      >
        <wui-text color="secondary" variant="md-regular" align="center">
          We work with the best providers to give you the lowest fees and best support. More options
          coming soon!
        </wui-text>

        ${this.howDoesItWorkTemplate()}
      </wui-flex>
    `:null}howDoesItWorkTemplate(){return r.html` <wui-link @click=${this.onWhatIsBuy.bind(this)}>
      <wui-icon size="xs" color="accent-primary" slot="iconLeft" name="helpCircle"></wui-icon>
      How does it work?
    </wui-link>`}onWhatIsBuy(){o.EventsController.sendEvent({type:"track",event:"SELECT_WHAT_IS_A_BUY",properties:{isSmartAccount:(0,a.getPreferredAccountType)(i.ChainController.state.activeChain)===l.W3mFrameRpcConstants.ACCOUNT_TYPES.SMART_ACCOUNT}}),s.RouterController.push("WhatIsABuy")}};h.styles=[f],h=function(t,e,r,i){var o,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(s=(n<3?o(s):n>3?o(e,r,s):o(e,r))||s);return n>3&&s&&Object.defineProperty(e,r,s),s}([(0,u.customElement)("w3m-onramp-providers-footer")],h),t.s([],550230)}]);