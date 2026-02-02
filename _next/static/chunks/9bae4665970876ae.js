(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,683544,e=>{"use strict";e.i(145967);var t=e.i(604148),i=e.i(654479);e.i(582768);var n=e.i(120119);e.i(728547);var r=e.i(829389);e.i(852634);var a=e.i(459088),s=e.i(645975),o=e.i(162611);let l=o.css`
  :host {
    position: relative;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: ${({spacing:e})=>e[1]};
  }

  /* -- Colors --------------------------------------------------- */
  button[data-type='accent'] wui-icon {
    color: ${({tokens:e})=>e.core.iconAccentPrimary};
  }

  button[data-type='neutral'][data-variant='primary'] wui-icon {
    color: ${({tokens:e})=>e.theme.iconInverse};
  }

  button[data-type='neutral'][data-variant='secondary'] wui-icon {
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  button[data-type='success'] wui-icon {
    color: ${({tokens:e})=>e.core.iconSuccess};
  }

  button[data-type='error'] wui-icon {
    color: ${({tokens:e})=>e.core.iconError};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='xs'] {
    width: 16px;
    height: 16px;

    border-radius: ${({borderRadius:e})=>e[1]};
  }

  button[data-size='sm'] {
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:e})=>e[1]};
  }

  button[data-size='md'] {
    width: 24px;
    height: 24px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  button[data-size='lg'] {
    width: 28px;
    height: 28px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  button[data-size='xs'] wui-icon {
    width: 8px;
    height: 8px;
  }

  button[data-size='sm'] wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] wui-icon {
    width: 20px;
    height: 20px;
  }

  /* -- Hover --------------------------------------------------- */
  @media (hover: hover) {
    button[data-type='accent']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.foregroundAccent010};
    }

    button[data-variant='primary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }

    button[data-variant='secondary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }

    button[data-type='success']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.backgroundSuccess};
    }

    button[data-type='error']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.backgroundError};
    }
  }

  /* -- Focus --------------------------------------------------- */
  button:focus-visible {
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent020};
  }

  /* -- Properties --------------------------------------------------- */
  button[data-full-width='true'] {
    width: 100%;
  }

  :host([fullWidth]) {
    width: 100%;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var c=function(e,t,i,n){var r,a=arguments.length,s=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(s=(a<3?r(s):a>3?r(t,i,s):r(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let u=class extends t.LitElement{constructor(){super(...arguments),this.icon="card",this.variant="primary",this.type="accent",this.size="md",this.iconSize=void 0,this.fullWidth=!1,this.disabled=!1}render(){return i.html`<button
      data-variant=${this.variant}
      data-type=${this.type}
      data-size=${this.size}
      data-full-width=${this.fullWidth}
      ?disabled=${this.disabled}
    >
      <wui-icon color="inherit" name=${this.icon} size=${(0,r.ifDefined)(this.iconSize)}></wui-icon>
    </button>`}};u.styles=[a.resetStyles,a.elementStyles,l],c([(0,n.property)()],u.prototype,"icon",void 0),c([(0,n.property)()],u.prototype,"variant",void 0),c([(0,n.property)()],u.prototype,"type",void 0),c([(0,n.property)()],u.prototype,"size",void 0),c([(0,n.property)()],u.prototype,"iconSize",void 0),c([(0,n.property)({type:Boolean})],u.prototype,"fullWidth",void 0),c([(0,n.property)({type:Boolean})],u.prototype,"disabled",void 0),u=c([(0,s.customElement)("wui-icon-button")],u),e.s([],683544)},409995,857505,910705,e=>{"use strict";e.i(131507),e.i(654479),e.i(108285),e.i(794533),e.s([],409995),e.i(165399),e.i(120119),e.i(56350),e.i(467999),e.i(362318),e.i(995568),e.i(858578),e.i(391998),e.i(242691),e.s([],857505),e.i(829389),e.s([],910705)},854712,749991,752869,891602,662703,972122,746668,e=>{"use strict";e.i(409995);var t=e.i(604148),i=e.i(654479);e.i(857505);var n=e.i(56350);e.i(910705);var r=e.i(829389),a=e.i(436220),s=e.i(960398),o=e.i(971080),l=e.i(149454),c=e.i(803468),u=e.i(221728),d=e.i(811424);e.i(404041);var p=e.i(645975);e.i(534420),e.i(62238),e.i(443452),e.i(683544),e.i(907170),e.i(869609),e.i(143053),e.i(421147),e.i(774339),e.i(79929),e.i(249536),e.i(956303),e.s(["DIRECT_TRANSFER_DEPOSIT_TYPE",()=>em,"DIRECT_TRANSFER_REQUEST_ID",()=>ep,"DIRECT_TRANSFER_TRANSACTION_TYPE",()=>eh,"PayController",()=>ey],749991);var m=e.i(365801),h=e.i(742710),g=e.i(401564),y=e.i(675457),w=e.i(150576),f=e.i(227302),b=e.i(653157),x=e.i(518887),v=e.i(769718);let C="INVALID_PAYMENT_CONFIG",k="INVALID_RECIPIENT",P="INVALID_ASSET",E="INVALID_AMOUNT",A="UNABLE_TO_INITIATE_PAYMENT",S="INVALID_CHAIN_NAMESPACE",I="GENERIC_PAYMENT_ERROR",$="UNABLE_TO_GET_EXCHANGES",N="ASSET_NOT_SUPPORTED",T="UNABLE_TO_GET_PAY_URL",U="UNABLE_TO_GET_BUY_STATUS",R="UNABLE_TO_GET_QUOTE",D="UNABLE_TO_GET_QUOTE_STATUS",q="INVALID_RECIPIENT_ADDRESS_FOR_ASSET",O={[C]:"Invalid payment configuration",[k]:"Invalid recipient address",[P]:"Invalid asset specified",[E]:"Invalid payment amount",[q]:"Invalid recipient address for the asset selected",UNKNOWN_ERROR:"Unknown payment error occurred",[A]:"Unable to initiate payment",[S]:"Invalid chain namespace",[I]:"Unable to process payment",[$]:"Unable to get exchanges",[N]:"Asset not supported by the selected exchange",[T]:"Unable to get payment URL",[U]:"Unable to get buy status",UNABLE_TO_GET_TOKEN_BALANCES:"Unable to get token balances",[R]:"Unable to get quote. Please choose a different token",[D]:"Unable to get quote status"};class _ extends Error{get message(){return O[this.code]}constructor(e,t){super(O[e]),this.name="AppKitPayError",this.code=e,this.details=t,Error.captureStackTrace&&Error.captureStackTrace(this,_)}}var j=e.i(364258),F=e.i(82283),L=e.i(564126);let z="reown_test";var B=e.i(959204),W=e.i(462579);async function M(e,t,i){if(t!==g.ConstantsUtil.CHAIN.EVM)throw new _(S);if(!i.fromAddress)throw new _(C,"fromAddress is required for native EVM payments.");let n="string"==typeof i.amount?parseFloat(i.amount):i.amount;if(isNaN(n))throw new _(C);let r=e.metadata?.decimals??18,a=o.ConnectionController.parseUnits(n.toString(),r);if("bigint"!=typeof a)throw new _(I);return await o.ConnectionController.sendTransaction({chainNamespace:t,to:i.recipient,address:i.fromAddress,value:a,data:"0x"})??void 0}async function Q(e,t){if(!t.fromAddress)throw new _(C,"fromAddress is required for ERC20 EVM payments.");let i=e.asset,n=t.recipient,r=Number(e.metadata.decimals),a=o.ConnectionController.parseUnits(t.amount.toString(),r);if(void 0===a)throw new _(I);return await o.ConnectionController.writeContract({fromAddress:t.fromAddress,tokenAddress:i,args:[n,a],method:"transfer",abi:B.ContractUtil.getERC20Abi(i),chainNamespace:g.ConstantsUtil.CHAIN.EVM})??void 0}async function H(e,t){if(e!==g.ConstantsUtil.CHAIN.SOLANA)throw new _(S);if(!t.fromAddress)throw new _(C,"fromAddress is required for Solana payments.");let i="string"==typeof t.amount?parseFloat(t.amount):t.amount;if(isNaN(i)||i<=0)throw new _(C,"Invalid payment amount.");try{if(!W.ProviderController.getProvider(e))throw new _(I,"No Solana provider available.");let n=await o.ConnectionController.sendTransaction({chainNamespace:g.ConstantsUtil.CHAIN.SOLANA,to:t.recipient,value:i,tokenMint:t.tokenMint});if(!n)throw new _(I,"Transaction failed.");return n}catch(e){if(e instanceof _)throw e;throw new _(I,`Solana payment failed: ${e}`)}}async function K({sourceToken:e,toToken:t,amount:i,recipient:n}){let r=o.ConnectionController.parseUnits(i,e.metadata.decimals),a=o.ConnectionController.parseUnits(i,t.metadata.decimals);return Promise.resolve({type:ep,origin:{amount:r?.toString()??"0",currency:e},destination:{amount:a?.toString()??"0",currency:t},fees:[{id:"service",label:"Service Fee",amount:"0",currency:t}],steps:[{requestId:ep,type:"deposit",deposit:{amount:r?.toString()??"0",currency:e.asset,receiver:n}}],timeInSeconds:6})}function Y(e){if(!e)return null;let t=e.steps[0];return t&&t.type===em?t:null}function G(e,t=0){if(!e)return[];let i=e.steps.filter(e=>e.type===eh),n=i.filter((e,i)=>i+1>t);return i.length>0&&i.length<3?n:[]}let V=new j.FetchUtil({baseUrl:f.CoreHelperUtil.getApiUrl(),clientId:null});class J extends Error{}function X(){let{projectId:e,sdkType:t,sdkVersion:i}=F.OptionsController.state;return{projectId:e,st:t||"appkit",sv:i||"html-wagmi-4.2.2"}}async function Z(e,t){let i,n=(i=F.OptionsController.getSnapshot().projectId,`https://rpc.walletconnect.org/v1/json-rpc?projectId=${i}`),{sdkType:r,sdkVersion:a,projectId:s}=F.OptionsController.getSnapshot(),o={jsonrpc:"2.0",id:1,method:e,params:{...t||{},st:r,sv:a,projectId:s}},l=await fetch(n,{method:"POST",body:JSON.stringify(o),headers:{"Content-Type":"application/json"}}),c=await l.json();if(c.error)throw new J(c.error.message);return c}async function ee(e){return(await Z("reown_getExchanges",e)).result}async function et(e){return(await Z("reown_getExchangePayUrl",e)).result}async function ei(e){return(await Z("reown_getExchangeBuyStatus",e)).result}async function en(e){let t=y.NumberUtil.bigNumber(e.amount).times(10**e.toToken.metadata.decimals).toString(),{chainId:i,chainNamespace:n}=w.ParseUtil.parseCaipNetworkId(e.sourceToken.network),{chainId:r,chainNamespace:a}=w.ParseUtil.parseCaipNetworkId(e.toToken.network),s="native"===e.sourceToken.asset?(0,L.getNativeTokenAddress)(n):e.sourceToken.asset,o="native"===e.toToken.asset?(0,L.getNativeTokenAddress)(a):e.toToken.asset;return await V.post({path:"/appkit/v1/transfers/quote",body:{user:e.address,originChainId:i.toString(),originCurrency:s,destinationChainId:r.toString(),destinationCurrency:o,recipient:e.recipient,amount:t},params:X()})}async function er(e){let t=v.HelpersUtil.isLowerCaseMatch(e.sourceToken.network,e.toToken.network),i=v.HelpersUtil.isLowerCaseMatch(e.sourceToken.asset,e.toToken.asset);return t&&i?K(e):en(e)}async function ea(e){return await V.get({path:"/appkit/v1/transfers/status",params:{requestId:e.requestId,...X()}})}async function es(e){return await V.get({path:`/appkit/v1/transfers/assets/exchanges/${e}`,params:X()})}let eo=["eip155","solana"],el={eip155:{native:{assetNamespace:"slip44",assetReference:"60"},defaultTokenNamespace:"erc20"},solana:{native:{assetNamespace:"slip44",assetReference:"501"},defaultTokenNamespace:"token"}};function ec(e,t){let{chainNamespace:i,chainId:n}=w.ParseUtil.parseCaipNetworkId(e),r=el[i];if(!r)throw Error(`Unsupported chain namespace for CAIP-19 formatting: ${i}`);let a=r.native.assetNamespace,s=r.native.assetReference;"native"!==t&&(a=r.defaultTokenNamespace,s=t);let o=`${i}:${n}`;return`${o}/${a}:${s}`}function eu(e){let t=y.NumberUtil.bigNumber(e,{safe:!0});return t.lt(.001)?"<0.001":t.round(4).toString()}let ed="unknown",ep="direct-transfer",em="deposit",eh="transaction",eg=(0,m.proxy)({paymentAsset:{network:"eip155:1",asset:"0x0",metadata:{name:"0x0",symbol:"0x0",decimals:0}},recipient:"0x0",amount:0,isConfigured:!1,error:null,isPaymentInProgress:!1,exchanges:[],isLoading:!1,openInNewTab:!0,redirectUrl:void 0,payWithExchange:void 0,currentPayment:void 0,analyticsSet:!1,paymentId:void 0,choice:"pay",tokenBalances:{[g.ConstantsUtil.CHAIN.EVM]:[],[g.ConstantsUtil.CHAIN.SOLANA]:[]},isFetchingTokenBalances:!1,selectedPaymentAsset:null,quote:void 0,quoteStatus:"waiting",quoteError:null,isFetchingQuote:!1,selectedExchange:void 0,exchangeUrlForQuote:void 0,requestId:void 0}),ey={state:eg,subscribe:e=>(0,m.subscribe)(eg,()=>e(eg)),subscribeKey:(e,t)=>(0,h.subscribeKey)(eg,e,t),async handleOpenPay(e){this.resetState(),this.setPaymentConfig(e),this.initializeAnalytics(),function(){let{chainNamespace:e}=w.ParseUtil.parseCaipNetworkId(ey.state.paymentAsset.network);if(!f.CoreHelperUtil.isAddress(ey.state.recipient,e))throw new _(q,`Provide valid recipient address for namespace "${e}"`)}(),await this.prepareTokenLogo(),eg.isConfigured=!0,b.EventsController.sendEvent({type:"track",event:"PAY_MODAL_OPEN",properties:{exchanges:eg.exchanges,configuration:{network:eg.paymentAsset.network,asset:eg.paymentAsset.asset,recipient:eg.recipient,amount:eg.amount}}}),await c.ModalController.open({view:"Pay"})},resetState(){eg.paymentAsset={network:"eip155:1",asset:"0x0",metadata:{name:"0x0",symbol:"0x0",decimals:0}},eg.recipient="0x0",eg.amount=0,eg.isConfigured=!1,eg.error=null,eg.isPaymentInProgress=!1,eg.isLoading=!1,eg.currentPayment=void 0,eg.selectedExchange=void 0,eg.exchangeUrlForQuote=void 0,eg.requestId=void 0},resetQuoteState(){eg.quote=void 0,eg.quoteStatus="waiting",eg.quoteError=null,eg.isFetchingQuote=!1,eg.requestId=void 0},setPaymentConfig(e){if(!e.paymentAsset)throw new _(C);try{eg.choice=e.choice??"pay",eg.paymentAsset=e.paymentAsset,eg.recipient=e.recipient,eg.amount=e.amount,eg.openInNewTab=e.openInNewTab??!0,eg.redirectUrl=e.redirectUrl,eg.payWithExchange=e.payWithExchange,eg.error=null}catch(e){throw new _(C,e.message)}},setSelectedPaymentAsset(e){eg.selectedPaymentAsset=e},setSelectedExchange(e){eg.selectedExchange=e},setRequestId(e){eg.requestId=e},setPaymentInProgress(e){eg.isPaymentInProgress=e},getPaymentAsset:()=>eg.paymentAsset,getExchanges:()=>eg.exchanges,async fetchExchanges(){try{eg.isLoading=!0,eg.exchanges=(await ee({page:0})).exchanges.slice(0,2)}catch(e){throw d.SnackController.showError(O.UNABLE_TO_GET_EXCHANGES),new _($)}finally{eg.isLoading=!1}},async getAvailableExchanges(e){try{let t=e?.asset&&e?.network?ec(e.network,e.asset):void 0;return await ee({page:e?.page??0,asset:t,amount:e?.amount?.toString()})}catch(e){throw new _($)}},async getPayUrl(e,t,i=!1){try{let n=Number(t.amount),r=await et({exchangeId:e,asset:ec(t.network,t.asset),amount:n.toString(),recipient:`${t.network}:${t.recipient}`});return b.EventsController.sendEvent({type:"track",event:"PAY_EXCHANGE_SELECTED",properties:{source:"pay",exchange:{id:e},configuration:{network:t.network,asset:t.asset,recipient:t.recipient,amount:n},currentPayment:{type:"exchange",exchangeId:e},headless:i}}),i&&(this.initiatePayment(),b.EventsController.sendEvent({type:"track",event:"PAY_INITIATED",properties:{source:"pay",paymentId:eg.paymentId||ed,configuration:{network:t.network,asset:t.asset,recipient:t.recipient,amount:n},currentPayment:{type:"exchange",exchangeId:e}}})),r}catch(e){if(e instanceof Error&&e.message.includes("is not supported"))throw new _(N);throw Error(e.message)}},async generateExchangeUrlForQuote({exchangeId:e,paymentAsset:t,amount:i,recipient:n}){let r=await et({exchangeId:e,asset:ec(t.network,t.asset),amount:i.toString(),recipient:n});eg.exchangeSessionId=r.sessionId,eg.exchangeUrlForQuote=r.url},async openPayUrl(e,t,i=!1){try{let n=await this.getPayUrl(e.exchangeId,t,i);if(!n)throw new _(T);let r=e.openInNewTab??!0;return f.CoreHelperUtil.openHref(n.url,r?"_blank":"_self"),n}catch(e){throw e instanceof _?eg.error=e.message:eg.error=O.GENERIC_PAYMENT_ERROR,new _(T)}},async onTransfer({chainNamespace:e,fromAddress:t,toAddress:i,amount:n,paymentAsset:r}){if(eg.currentPayment={type:"wallet",status:"IN_PROGRESS"},!eg.isPaymentInProgress)try{this.initiatePayment();let a=s.ChainController.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===r.network);if(!a)throw Error("Target network not found");let o=s.ChainController.state.activeCaipNetwork;switch(!v.HelpersUtil.isLowerCaseMatch(o?.caipNetworkId,a.caipNetworkId)&&await s.ChainController.switchActiveNetwork(a),e){case g.ConstantsUtil.CHAIN.EVM:"native"===r.asset&&(eg.currentPayment.result=await M(r,e,{recipient:i,amount:n,fromAddress:t})),r.asset.startsWith("0x")&&(eg.currentPayment.result=await Q(r,{recipient:i,amount:n,fromAddress:t})),eg.currentPayment.status="SUCCESS";break;case g.ConstantsUtil.CHAIN.SOLANA:eg.currentPayment.result=await H(e,{recipient:i,amount:n,fromAddress:t,tokenMint:"native"===r.asset?void 0:r.asset}),eg.currentPayment.status="SUCCESS";break;default:throw new _(S)}}catch(e){throw e instanceof _?eg.error=e.message:eg.error=O.GENERIC_PAYMENT_ERROR,eg.currentPayment.status="FAILED",d.SnackController.showError(eg.error),e}finally{eg.isPaymentInProgress=!1}},async onSendTransaction(e){try{let{namespace:t,transactionStep:i}=e;ey.initiatePayment();let n=s.ChainController.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===eg.paymentAsset?.network);if(!n)throw Error("Target network not found");let r=s.ChainController.state.activeCaipNetwork;if(v.HelpersUtil.isLowerCaseMatch(r?.caipNetworkId,n.caipNetworkId)||await s.ChainController.switchActiveNetwork(n),t===g.ConstantsUtil.CHAIN.EVM){let{from:e,to:n,data:r,value:a}=i.transaction;await o.ConnectionController.sendTransaction({address:e,to:n,data:r,value:BigInt(a),chainNamespace:t})}else if(t===g.ConstantsUtil.CHAIN.SOLANA){let{instructions:e}=i.transaction;await o.ConnectionController.writeSolanaTransaction({instructions:e})}}catch(e){throw e instanceof _?eg.error=e.message:eg.error=O.GENERIC_PAYMENT_ERROR,d.SnackController.showError(eg.error),e}finally{eg.isPaymentInProgress=!1}},getExchangeById:e=>eg.exchanges.find(t=>t.id===e),validatePayConfig(e){let{paymentAsset:t,recipient:i,amount:n}=e;if(!t)throw new _(C);if(!i)throw new _(k);if(!t.asset)throw new _(P);if(null==n||n<=0)throw new _(E)},async handlePayWithExchange(e){try{eg.currentPayment={type:"exchange",exchangeId:e};let{network:t,asset:i}=eg.paymentAsset,n={network:t,asset:i,amount:eg.amount,recipient:eg.recipient},r=await this.getPayUrl(e,n);if(!r)throw new _(A);return eg.currentPayment.sessionId=r.sessionId,eg.currentPayment.status="IN_PROGRESS",eg.currentPayment.exchangeId=e,this.initiatePayment(),{url:r.url,openInNewTab:eg.openInNewTab}}catch(e){return e instanceof _?eg.error=e.message:eg.error=O.GENERIC_PAYMENT_ERROR,eg.isPaymentInProgress=!1,d.SnackController.showError(eg.error),null}},async getBuyStatus(e,t){try{let i=await ei({sessionId:t,exchangeId:e});return("SUCCESS"===i.status||"FAILED"===i.status)&&b.EventsController.sendEvent({type:"track",event:"SUCCESS"===i.status?"PAY_SUCCESS":"PAY_ERROR",properties:{message:"FAILED"===i.status?f.CoreHelperUtil.parseError(eg.error):void 0,source:"pay",paymentId:eg.paymentId||ed,configuration:{network:eg.paymentAsset.network,asset:eg.paymentAsset.asset,recipient:eg.recipient,amount:eg.amount},currentPayment:{type:"exchange",exchangeId:eg.currentPayment?.exchangeId,sessionId:eg.currentPayment?.sessionId,result:i.txHash}}}),i}catch(e){throw new _(U)}},async fetchTokensFromEOA({caipAddress:e,caipNetwork:t,namespace:i}){if(!e)return[];let{address:n}=w.ParseUtil.parseCaipAddress(e),r=t;return i===g.ConstantsUtil.CHAIN.EVM&&(r=void 0),await x.BalanceUtil.getMyTokensWithBalance({address:n,caipNetwork:r})},async fetchTokensFromExchange(){if(!eg.selectedExchange)return[];let e=Object.values((await es(eg.selectedExchange.id)).assets).flat();return await Promise.all(e.map(async e=>{let t={chainId:e.network,address:`${e.network}:${e.asset}`,symbol:e.metadata.symbol,name:e.metadata.name,iconUrl:e.metadata.logoURI||"",price:0,quantity:{numeric:"0",decimals:e.metadata.decimals.toString()}},{chainNamespace:i}=w.ParseUtil.parseCaipNetworkId(t.chainId),n=t.address;if(f.CoreHelperUtil.isCaipAddress(n)){let{address:e}=w.ParseUtil.parseCaipAddress(n);n=e}return t.iconUrl=await a.AssetUtil.getImageByToken(n??"",i).catch(()=>void 0)??"",t}))},async fetchTokens({caipAddress:e,caipNetwork:t,namespace:i}){try{eg.isFetchingTokenBalances=!0;let n=eg.selectedExchange?this.fetchTokensFromExchange():this.fetchTokensFromEOA({caipAddress:e,caipNetwork:t,namespace:i}),r=await n;eg.tokenBalances={...eg.tokenBalances,[i]:r}}catch(t){let e=t instanceof Error?t.message:"Unable to get token balances";d.SnackController.showError(e)}finally{eg.isFetchingTokenBalances=!1}},async fetchQuote({amount:e,address:t,sourceToken:i,toToken:n,recipient:r}){try{ey.resetQuoteState(),eg.isFetchingQuote=!0;let a=await er({amount:e,address:eg.selectedExchange?void 0:t,sourceToken:i,toToken:n,recipient:r});if(eg.selectedExchange){let e=Y(a);if(e){let t=`${i.network}:${e.deposit.receiver}`,n=y.NumberUtil.formatNumber(e.deposit.amount,{decimals:i.metadata.decimals??0,round:8});await ey.generateExchangeUrlForQuote({exchangeId:eg.selectedExchange.id,paymentAsset:i,amount:n.toString(),recipient:t})}}eg.quote=a}catch(t){let e=O.UNABLE_TO_GET_QUOTE;if(t instanceof Error&&t.cause&&t.cause instanceof Response)try{let i=await t.cause.json();i.error&&"string"==typeof i.error&&(e=i.error)}catch{}throw eg.quoteError=e,d.SnackController.showError(e),new _(R)}finally{eg.isFetchingQuote=!1}},async fetchQuoteStatus({requestId:e}){try{if(e===ep){let e=eg.selectedExchange,t=eg.exchangeSessionId;if(e&&t){switch((await this.getBuyStatus(e.id,t)).status){case"IN_PROGRESS":case"UNKNOWN":default:eg.quoteStatus="waiting";break;case"SUCCESS":eg.quoteStatus="success",eg.isPaymentInProgress=!1;break;case"FAILED":eg.quoteStatus="failure",eg.isPaymentInProgress=!1}return}eg.quoteStatus="success";return}let{status:t}=await ea({requestId:e});eg.quoteStatus=t}catch{throw eg.quoteStatus="failure",new _(D)}},initiatePayment(){eg.isPaymentInProgress=!0,eg.paymentId=crypto.randomUUID()},initializeAnalytics(){eg.analyticsSet||(eg.analyticsSet=!0,this.subscribeKey("isPaymentInProgress",e=>{if(eg.currentPayment?.status&&"UNKNOWN"!==eg.currentPayment.status){let e={IN_PROGRESS:"PAY_INITIATED",SUCCESS:"PAY_SUCCESS",FAILED:"PAY_ERROR"}[eg.currentPayment.status];b.EventsController.sendEvent({type:"track",event:e,properties:{message:"FAILED"===eg.currentPayment.status?f.CoreHelperUtil.parseError(eg.error):void 0,source:"pay",paymentId:eg.paymentId||ed,configuration:{network:eg.paymentAsset.network,asset:eg.paymentAsset.asset,recipient:eg.recipient,amount:eg.amount},currentPayment:{type:eg.currentPayment.type,exchangeId:eg.currentPayment.exchangeId,sessionId:eg.currentPayment.sessionId,result:eg.currentPayment.result}}})}}))},async prepareTokenLogo(){if(!eg.paymentAsset.metadata.logoURI)try{let{chainNamespace:e}=w.ParseUtil.parseCaipNetworkId(eg.paymentAsset.network),t=await a.AssetUtil.getImageByToken(eg.paymentAsset.asset,e);eg.paymentAsset.metadata.logoURI=t}catch{}}};var ew=e.i(162611);let ef=ew.css`
  wui-separator {
    margin: var(--apkt-spacing-3) calc(var(--apkt-spacing-3) * -1) var(--apkt-spacing-2)
      calc(var(--apkt-spacing-3) * -1);
    width: calc(100% + var(--apkt-spacing-3) * 2);
  }

  .token-display {
    padding: var(--apkt-spacing-3) var(--apkt-spacing-3);
    border-radius: var(--apkt-borderRadius-5);
    background-color: var(--apkt-tokens-theme-backgroundPrimary);
    margin-top: var(--apkt-spacing-3);
    margin-bottom: var(--apkt-spacing-3);
  }

  .token-display wui-text {
    text-transform: none;
  }

  wui-loading-spinner {
    padding: var(--apkt-spacing-2);
  }

  .left-image-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .token-image {
    border-radius: ${({borderRadius:e})=>e.round};
    width: 40px;
    height: 40px;
  }

  .chain-image {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: -3px;
    right: -5px;
    border-radius: ${({borderRadius:e})=>e.round};
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  .payment-methods-container {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:e})=>e[8]};
    border-top-left-radius: ${({borderRadius:e})=>e[8]};
  }
`;var eb=function(e,t,i,n){var r,a=arguments.length,s=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(s=(a<3?r(s):a>3?r(t,i,s):r(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let ex=class extends t.LitElement{constructor(){super(),this.unsubscribe=[],this.amount=ey.state.amount,this.namespace=void 0,this.paymentAsset=ey.state.paymentAsset,this.activeConnectorIds=l.ConnectorController.state.activeConnectorIds,this.caipAddress=void 0,this.exchanges=ey.state.exchanges,this.isLoading=ey.state.isLoading,this.initializeNamespace(),this.unsubscribe.push(ey.subscribeKey("amount",e=>this.amount=e)),this.unsubscribe.push(l.ConnectorController.subscribeKey("activeConnectorIds",e=>this.activeConnectorIds=e)),this.unsubscribe.push(ey.subscribeKey("exchanges",e=>this.exchanges=e)),this.unsubscribe.push(ey.subscribeKey("isLoading",e=>this.isLoading=e)),ey.fetchExchanges(),ey.setSelectedExchange(void 0)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return i.html`
      <wui-flex flexDirection="column">
        ${this.paymentDetailsTemplate()} ${this.paymentMethodsTemplate()}
      </wui-flex>
    `}paymentMethodsTemplate(){return i.html`
      <wui-flex flexDirection="column" padding="3" gap="2" class="payment-methods-container">
        ${this.payWithWalletTemplate()} ${this.templateSeparator()}
        ${this.templateExchangeOptions()}
      </wui-flex>
    `}initializeNamespace(){let e=s.ChainController.state.activeChain;this.namespace=e,this.caipAddress=s.ChainController.getAccountData(e)?.caipAddress,this.unsubscribe.push(s.ChainController.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress},e))}paymentDetailsTemplate(){let e=s.ChainController.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===this.paymentAsset.network);return i.html`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        .padding=${["6","8","6","8"]}
        gap="2"
      >
        <wui-flex alignItems="center" gap="1">
          <wui-text variant="h1-regular" color="primary">
            ${eu(this.amount||"0")}
          </wui-text>

          <wui-flex flexDirection="column">
            <wui-text variant="h6-regular" color="secondary">
              ${this.paymentAsset.metadata.symbol||"Unknown"}
            </wui-text>
            <wui-text variant="md-medium" color="secondary"
              >on ${e?.name||"Unknown"}</wui-text
            >
          </wui-flex>
        </wui-flex>

        <wui-flex class="left-image-container">
          <wui-image
            src=${(0,r.ifDefined)(this.paymentAsset.metadata.logoURI)}
            class="token-image"
          ></wui-image>
          <wui-image
            src=${(0,r.ifDefined)(a.AssetUtil.getNetworkImage(e))}
            class="chain-image"
          ></wui-image>
        </wui-flex>
      </wui-flex>
    `}payWithWalletTemplate(){return!function(e){let{chainNamespace:t}=w.ParseUtil.parseCaipNetworkId(e);return eo.includes(t)}(this.paymentAsset.network)?i.html``:this.caipAddress?this.connectedWalletTemplate():this.disconnectedWalletTemplate()}connectedWalletTemplate(){let{name:e,image:t}=this.getWalletProperties({namespace:this.namespace});return i.html`
      <wui-flex flexDirection="column" gap="3">
        <wui-list-item
          type="secondary"
          boxColor="foregroundSecondary"
          @click=${this.onWalletPayment}
          .boxed=${!1}
          ?chevron=${!0}
          ?fullSize=${!1}
          ?rounded=${!0}
          data-testid="wallet-payment-option"
          imageSrc=${(0,r.ifDefined)(t)}
          imageSize="3xl"
        >
          <wui-text variant="lg-regular" color="primary">Pay with ${e}</wui-text>
        </wui-list-item>

        <wui-list-item
          type="secondary"
          icon="power"
          iconColor="error"
          @click=${this.onDisconnect}
          data-testid="disconnect-button"
          ?chevron=${!1}
          boxColor="foregroundSecondary"
        >
          <wui-text variant="lg-regular" color="secondary">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>
    `}disconnectedWalletTemplate(){return i.html`<wui-list-item
      type="secondary"
      boxColor="foregroundSecondary"
      variant="icon"
      iconColor="default"
      iconVariant="overlay"
      icon="wallet"
      @click=${this.onWalletPayment}
      ?chevron=${!0}
      data-testid="wallet-payment-option"
    >
      <wui-text variant="lg-regular" color="primary">Pay with wallet</wui-text>
    </wui-list-item>`}templateExchangeOptions(){if(this.isLoading)return i.html`<wui-flex justifyContent="center" alignItems="center">
        <wui-loading-spinner size="md"></wui-loading-spinner>
      </wui-flex>`;let e=this.exchanges.filter(e=>{var t;let i;return(t=this.paymentAsset,(i=s.ChainController.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===t.network))&&i.testnet)?e.id===z:e.id!==z});return 0===e.length?i.html`<wui-flex justifyContent="center" alignItems="center">
        <wui-text variant="md-medium" color="primary">No exchanges available</wui-text>
      </wui-flex>`:e.map(e=>i.html`
        <wui-list-item
          type="secondary"
          boxColor="foregroundSecondary"
          @click=${()=>this.onExchangePayment(e)}
          data-testid="exchange-option-${e.id}"
          ?chevron=${!0}
          imageSrc=${(0,r.ifDefined)(e.imageUrl)}
        >
          <wui-text flexGrow="1" variant="lg-regular" color="primary">
            Pay with ${e.name}
          </wui-text>
        </wui-list-item>
      `)}templateSeparator(){return i.html`<wui-separator text="or" bgColor="secondary"></wui-separator>`}async onWalletPayment(){if(!this.namespace)throw Error("Namespace not found");this.caipAddress?u.RouterController.push("PayQuote"):(await l.ConnectorController.connect(),await c.ModalController.open({view:"PayQuote"}))}onExchangePayment(e){ey.setSelectedExchange(e),u.RouterController.push("PayQuote")}async onDisconnect(){try{await o.ConnectionController.disconnect(),await c.ModalController.open({view:"Pay"})}catch{console.error("Failed to disconnect"),d.SnackController.showError("Failed to disconnect")}}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};let t=this.activeConnectorIds[e];if(!t)return{name:void 0,image:void 0};let i=l.ConnectorController.getConnector({id:t,namespace:e});if(!i)return{name:void 0,image:void 0};let n=a.AssetUtil.getConnectorImage(i);return{name:i.name,image:n}}};ex.styles=ef,eb([(0,n.state)()],ex.prototype,"amount",void 0),eb([(0,n.state)()],ex.prototype,"namespace",void 0),eb([(0,n.state)()],ex.prototype,"paymentAsset",void 0),eb([(0,n.state)()],ex.prototype,"activeConnectorIds",void 0),eb([(0,n.state)()],ex.prototype,"caipAddress",void 0),eb([(0,n.state)()],ex.prototype,"exchanges",void 0),eb([(0,n.state)()],ex.prototype,"isLoading",void 0),ex=eb([(0,p.customElement)("w3m-pay-view")],ex),e.s(["W3mPayView",()=>ex],752869);var ev=t,eC=e.i(293090),ek=e.i(112699);e.i(145967);var eP=t;e.i(582768);var eE=e.i(120119),eA=e.i(459088);let eS=ew.css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .pulse-container {
    position: relative;
    width: var(--pulse-size);
    height: var(--pulse-size);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pulse-rings {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .pulse-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid var(--pulse-color);
    opacity: 0;
    animation: pulse var(--pulse-duration, 2s) ease-out infinite;
  }

  .pulse-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.5);
      opacity: var(--pulse-opacity, 0.3);
    }
    50% {
      opacity: calc(var(--pulse-opacity, 0.3) * 0.5);
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
`;var eI=function(e,t,i,n){var r,a=arguments.length,s=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(s=(a<3?r(s):a>3?r(t,i,s):r(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let e$={"accent-primary":ew.vars.tokens.core.backgroundAccentPrimary},eN=class extends eP.LitElement{constructor(){super(...arguments),this.rings=3,this.duration=2,this.opacity=.3,this.size="200px",this.variant="accent-primary"}render(){let e=e$[this.variant];this.style.cssText=`
      --pulse-size: ${this.size};
      --pulse-duration: ${this.duration}s;
      --pulse-color: ${e};
      --pulse-opacity: ${this.opacity};
    `;let t=Array.from({length:this.rings},(e,t)=>this.renderRing(t,this.rings));return i.html`
      <div class="pulse-container">
        <div class="pulse-rings">${t}</div>
        <div class="pulse-content">
          <slot></slot>
        </div>
      </div>
    `}renderRing(e,t){let n=e/t*this.duration,r=`animation-delay: ${n}s;`;return i.html`<div class="pulse-ring" style=${r}></div>`}};eN.styles=[eA.resetStyles,eS],eI([(0,eE.property)({type:Number})],eN.prototype,"rings",void 0),eI([(0,eE.property)({type:Number})],eN.prototype,"duration",void 0),eI([(0,eE.property)({type:Number})],eN.prototype,"opacity",void 0),eI([(0,eE.property)()],eN.prototype,"size",void 0),eI([(0,eE.property)()],eN.prototype,"variant",void 0),eN=eI([(0,p.customElement)("wui-pulse")],eN);let eT=[{id:"received",title:"Receiving funds",icon:"dollar"},{id:"processing",title:"Swapping asset",icon:"recycleHorizontal"},{id:"sending",title:"Sending asset to the recipient address",icon:"send"}],eU=["success","submitted","failure","timeout","refund"],eR=ew.css`
  :host {
    display: block;
    height: 100%;
    width: 100%;
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e.round};
  }

  .token-badge-container {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: ${({borderRadius:e})=>e[4]};
    z-index: 3;
    min-width: 105px;
  }

  .token-badge-container.loading {
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border: 3px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  .token-badge-container.success {
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border: 3px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  .token-image-container {
    position: relative;
  }

  .token-image {
    border-radius: ${({borderRadius:e})=>e.round};
    width: 64px;
    height: 64px;
  }

  .token-image.success {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .token-image.error {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .token-image.loading {
    background: ${({colors:e})=>e.accent010};
  }

  .token-image wui-icon {
    width: 32px;
    height: 32px;
  }

  .token-badge {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border: 1px solid ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  .token-badge wui-text {
    white-space: nowrap;
  }

  .payment-lifecycle-container {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:e})=>e[6]};
    border-top-left-radius: ${({borderRadius:e})=>e[6]};
  }

  .payment-step-badge {
    padding: ${({spacing:e})=>e[1]} ${({spacing:e})=>e[2]};
    border-radius: ${({borderRadius:e})=>e[1]};
  }

  .payment-step-badge.loading {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  .payment-step-badge.error {
    background-color: ${({tokens:e})=>e.core.backgroundError};
  }

  .payment-step-badge.success {
    background-color: ${({tokens:e})=>e.core.backgroundSuccess};
  }

  .step-icon-container {
    position: relative;
    height: 40px;
    width: 40px;
    border-radius: ${({borderRadius:e})=>e.round};
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  .step-icon-box {
    position: absolute;
    right: -4px;
    bottom: -1px;
    padding: 2px;
    border-radius: ${({borderRadius:e})=>e.round};
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .step-icon-box.success {
    background-color: ${({tokens:e})=>e.core.backgroundSuccess};
  }
`;var eD=function(e,t,i,n){var r,a=arguments.length,s=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(s=(a<3?r(s):a>3?r(t,i,s):r(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let eq={received:["pending","success","submitted"],processing:["success","submitted"],sending:["success","submitted"]},eO=class extends ev.LitElement{constructor(){super(),this.unsubscribe=[],this.pollingInterval=null,this.paymentAsset=ey.state.paymentAsset,this.quoteStatus=ey.state.quoteStatus,this.quote=ey.state.quote,this.amount=ey.state.amount,this.namespace=void 0,this.caipAddress=void 0,this.profileName=null,this.activeConnectorIds=l.ConnectorController.state.activeConnectorIds,this.selectedExchange=ey.state.selectedExchange,this.initializeNamespace(),this.unsubscribe.push(ey.subscribeKey("quoteStatus",e=>this.quoteStatus=e),ey.subscribeKey("quote",e=>this.quote=e),l.ConnectorController.subscribeKey("activeConnectorIds",e=>this.activeConnectorIds=e),ey.subscribeKey("selectedExchange",e=>this.selectedExchange=e))}connectedCallback(){super.connectedCallback(),this.startPolling()}disconnectedCallback(){super.disconnectedCallback(),this.stopPolling(),this.unsubscribe.forEach(e=>e())}render(){return i.html`
      <wui-flex flexDirection="column" .padding=${["3","0","0","0"]} gap="2">
        ${this.tokenTemplate()} ${this.paymentTemplate()} ${this.paymentLifecycleTemplate()}
      </wui-flex>
    `}tokenTemplate(){let e=eu(this.amount||"0"),t=this.paymentAsset.metadata.symbol??"Unknown",n=s.ChainController.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===this.paymentAsset.network),o="failure"===this.quoteStatus||"timeout"===this.quoteStatus||"refund"===this.quoteStatus;return"success"===this.quoteStatus||"submitted"===this.quoteStatus?i.html`<wui-flex alignItems="center" justifyContent="center">
        <wui-flex justifyContent="center" alignItems="center" class="token-image success">
          <wui-icon name="checkmark" color="success" size="inherit"></wui-icon>
        </wui-flex>
      </wui-flex>`:o?i.html`<wui-flex alignItems="center" justifyContent="center">
        <wui-flex justifyContent="center" alignItems="center" class="token-image error">
          <wui-icon name="close" color="error" size="inherit"></wui-icon>
        </wui-flex>
      </wui-flex>`:i.html`
      <wui-flex alignItems="center" justifyContent="center">
        <wui-flex class="token-image-container">
          <wui-pulse size="125px" rings="3" duration="4" opacity="0.5" variant="accent-primary">
            <wui-flex justifyContent="center" alignItems="center" class="token-image loading">
              <wui-icon name="paperPlaneTitle" color="accent-primary" size="inherit"></wui-icon>
            </wui-flex>
          </wui-pulse>

          <wui-flex
            justifyContent="center"
            alignItems="center"
            class="token-badge-container loading"
          >
            <wui-flex
              alignItems="center"
              justifyContent="center"
              gap="01"
              padding="1"
              class="token-badge"
            >
              <wui-image
                src=${(0,r.ifDefined)(a.AssetUtil.getNetworkImage(n))}
                class="chain-image"
                size="mdl"
              ></wui-image>

              <wui-text variant="lg-regular" color="primary">${e} ${t}</wui-text>
            </wui-flex>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}paymentTemplate(){return i.html`
      <wui-flex flexDirection="column" gap="2" .padding=${["0","6","0","6"]}>
        ${this.renderPayment()}
        <wui-separator></wui-separator>
        ${this.renderWallet()}
      </wui-flex>
    `}paymentLifecycleTemplate(){let e=this.getStepsWithStatus();return i.html`
      <wui-flex flexDirection="column" padding="4" gap="2" class="payment-lifecycle-container">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">PAYMENT CYCLE</wui-text>

          ${this.renderPaymentCycleBadge()}
        </wui-flex>

        <wui-flex flexDirection="column" gap="5" .padding=${["2","0","2","0"]}>
          ${e.map(e=>this.renderStep(e))}
        </wui-flex>
      </wui-flex>
    `}renderPaymentCycleBadge(){let e="failure"===this.quoteStatus||"timeout"===this.quoteStatus||"refund"===this.quoteStatus,t="success"===this.quoteStatus||"submitted"===this.quoteStatus;if(e)return i.html`
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge error"
          gap="1"
        >
          <wui-icon name="close" color="error" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="error">Failed</wui-text>
        </wui-flex>
      `;if(t)return i.html`
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge success"
          gap="1"
        >
          <wui-icon name="checkmark" color="success" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="success">Completed</wui-text>
        </wui-flex>
      `;let n=this.quote?.timeInSeconds??0;return i.html`
      <wui-flex alignItems="center" justifyContent="space-between" gap="3">
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge loading"
          gap="1"
        >
          <wui-icon name="clock" color="default" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="primary">Est. ${n} sec</wui-text>
        </wui-flex>

        <wui-icon name="chevronBottom" color="default" size="xxs"></wui-icon>
      </wui-flex>
    `}renderPayment(){let e=s.ChainController.getAllRequestedCaipNetworks().find(e=>{let t=this.quote?.origin.currency.network;if(!t)return!1;let{chainId:i}=w.ParseUtil.parseCaipNetworkId(t);return v.HelpersUtil.isLowerCaseMatch(e.id.toString(),i.toString())}),t=eu(y.NumberUtil.formatNumber(this.quote?.origin.amount||"0",{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString()),n=this.quote?.origin.currency.metadata.symbol??"Unknown";return i.html`
      <wui-flex
        alignItems="flex-start"
        justifyContent="space-between"
        .padding=${["3","0","3","0"]}
      >
        <wui-text variant="lg-regular" color="secondary">Payment Method</wui-text>

        <wui-flex flexDirection="column" alignItems="flex-end" gap="1">
          <wui-flex alignItems="center" gap="01">
            <wui-text variant="lg-regular" color="primary">${t}</wui-text>
            <wui-text variant="lg-regular" color="secondary">${n}</wui-text>
          </wui-flex>

          <wui-flex alignItems="center" gap="1">
            <wui-text variant="md-regular" color="secondary">on</wui-text>
            <wui-image
              src=${(0,r.ifDefined)(a.AssetUtil.getNetworkImage(e))}
              size="xs"
            ></wui-image>
            <wui-text variant="md-regular" color="secondary">${e?.name}</wui-text>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}renderWallet(){return i.html`
      <wui-flex
        alignItems="flex-start"
        justifyContent="space-between"
        .padding=${["3","0","3","0"]}
      >
        <wui-text variant="lg-regular" color="secondary">Wallet</wui-text>

        ${this.renderWalletText()}
      </wui-flex>
    `}renderWalletText(){let{image:e}=this.getWalletProperties({namespace:this.namespace}),{address:t}=this.caipAddress?w.ParseUtil.parseCaipAddress(this.caipAddress):{},n=this.selectedExchange?.name;return this.selectedExchange?i.html`
        <wui-flex alignItems="center" justifyContent="flex-end" gap="1">
          <wui-text variant="lg-regular" color="primary">${n}</wui-text>
          <wui-image src=${(0,r.ifDefined)(this.selectedExchange.imageUrl)} size="mdl"></wui-image>
        </wui-flex>
      `:i.html`
      <wui-flex alignItems="center" justifyContent="flex-end" gap="1">
        <wui-text variant="lg-regular" color="primary">
          ${ek.UiHelperUtil.getTruncateString({string:this.profileName||t||n||"",charsStart:this.profileName?16:4,charsEnd:6*!this.profileName,truncate:this.profileName?"end":"middle"})}
        </wui-text>

        <wui-image src=${(0,r.ifDefined)(e)} size="mdl"></wui-image>
      </wui-flex>
    `}getStepsWithStatus(){return"failure"===this.quoteStatus||"timeout"===this.quoteStatus||"refund"===this.quoteStatus?eT.map(e=>({...e,status:"failed"})):eT.map(e=>{let t=(eq[e.id]??[]).includes(this.quoteStatus)?"completed":"pending";return{...e,status:t}})}renderStep({title:e,icon:t,status:n}){return i.html`
      <wui-flex alignItems="center" gap="3">
        <wui-flex justifyContent="center" alignItems="center" class="step-icon-container">
          <wui-icon name=${t} color="default" size="mdl"></wui-icon>

          <wui-flex alignItems="center" justifyContent="center" class=${(0,eC.classMap)({"step-icon-box":!0,success:"completed"===n})}>
            ${this.renderStatusIndicator(n)}
          </wui-flex>
        </wui-flex>

        <wui-text variant="md-regular" color="primary">${e}</wui-text>
      </wui-flex>
    `}renderStatusIndicator(e){return"completed"===e?i.html`<wui-icon size="sm" color="success" name="checkmark"></wui-icon>`:"failed"===e?i.html`<wui-icon size="sm" color="error" name="close"></wui-icon>`:"pending"===e?i.html`<wui-loading-spinner color="accent-primary" size="sm"></wui-loading-spinner>`:null}startPolling(){this.pollingInterval||(this.fetchQuoteStatus(),this.pollingInterval=setInterval(()=>{this.fetchQuoteStatus()},3e3))}stopPolling(){this.pollingInterval&&(clearInterval(this.pollingInterval),this.pollingInterval=null)}async fetchQuoteStatus(){let e=ey.state.requestId;if(!e||eU.includes(this.quoteStatus))this.stopPolling();else try{await ey.fetchQuoteStatus({requestId:e}),eU.includes(this.quoteStatus)&&this.stopPolling()}catch{this.stopPolling()}}initializeNamespace(){let e=s.ChainController.state.activeChain;this.namespace=e,this.caipAddress=s.ChainController.getAccountData(e)?.caipAddress,this.profileName=s.ChainController.getAccountData(e)?.profileName??null,this.unsubscribe.push(s.ChainController.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress,this.profileName=e?.profileName??null},e))}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};let t=this.activeConnectorIds[e];if(!t)return{name:void 0,image:void 0};let i=l.ConnectorController.getConnector({id:t,namespace:e});if(!i)return{name:void 0,image:void 0};let n=a.AssetUtil.getConnectorImage(i);return{name:i.name,image:n}}};eO.styles=eR,eD([(0,n.state)()],eO.prototype,"paymentAsset",void 0),eD([(0,n.state)()],eO.prototype,"quoteStatus",void 0),eD([(0,n.state)()],eO.prototype,"quote",void 0),eD([(0,n.state)()],eO.prototype,"amount",void 0),eD([(0,n.state)()],eO.prototype,"namespace",void 0),eD([(0,n.state)()],eO.prototype,"caipAddress",void 0),eD([(0,n.state)()],eO.prototype,"profileName",void 0),eD([(0,n.state)()],eO.prototype,"activeConnectorIds",void 0),eD([(0,n.state)()],eO.prototype,"selectedExchange",void 0),eO=eD([(0,p.customElement)("w3m-pay-loading-view")],eO),e.s(["W3mPayLoadingView",()=>eO],891602);var e_=t;e.i(604415);var ej=t;e.i(780313);var eF=e.i(592057);let eL=eF.css`
  :host {
    display: block;
  }
`,ez=class extends ej.LitElement{render(){return i.html`
      <wui-flex flexDirection="column" gap="4">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Pay</wui-text>
          <wui-shimmer width="60px" height="16px" borderRadius="4xs" variant="light"></wui-shimmer>
        </wui-flex>

        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Network Fee</wui-text>

          <wui-flex flexDirection="column" alignItems="flex-end" gap="2">
            <wui-shimmer
              width="75px"
              height="16px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>

            <wui-flex alignItems="center" gap="01">
              <wui-shimmer width="14px" height="14px" rounded variant="light"></wui-shimmer>
              <wui-shimmer
                width="49px"
                height="14px"
                borderRadius="4xs"
                variant="light"
              ></wui-shimmer>
            </wui-flex>
          </wui-flex>
        </wui-flex>

        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Service Fee</wui-text>
          <wui-shimmer width="75px" height="16px" borderRadius="4xs" variant="light"></wui-shimmer>
        </wui-flex>
      </wui-flex>
    `}};ez.styles=[eL],ez=function(e,t,i,n){var r,a=arguments.length,s=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(s=(a<3?r(s):a>3?r(t,i,s):r(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s}([(0,p.customElement)("w3m-pay-fees-skeleton")],ez);var eB=t;let eW=ew.css`
  :host {
    display: block;
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e.round};
  }
`;var eM=function(e,t,i,n){var r,a=arguments.length,s=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(s=(a<3?r(s):a>3?r(t,i,s):r(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let eQ=class extends eB.LitElement{constructor(){super(),this.unsubscribe=[],this.quote=ey.state.quote,this.unsubscribe.push(ey.subscribeKey("quote",e=>this.quote=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=y.NumberUtil.formatNumber(this.quote?.origin.amount||"0",{decimals:this.quote?.origin.currency.metadata.decimals??0,round:6}).toString();return i.html`
      <wui-flex flexDirection="column" gap="4">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Pay</wui-text>
          <wui-text variant="md-regular" color="primary">
            ${e} ${this.quote?.origin.currency.metadata.symbol||"Unknown"}
          </wui-text>
        </wui-flex>

        ${this.quote&&this.quote.fees.length>0?this.quote.fees.map(e=>this.renderFee(e)):null}
      </wui-flex>
    `}renderFee(e){let t="network"===e.id,n=y.NumberUtil.formatNumber(e.amount||"0",{decimals:e.currency.metadata.decimals??0,round:6}).toString();if(t){let t=s.ChainController.getAllRequestedCaipNetworks().find(t=>v.HelpersUtil.isLowerCaseMatch(t.caipNetworkId,e.currency.network));return i.html`
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">${e.label}</wui-text>

          <wui-flex flexDirection="column" alignItems="flex-end" gap="2">
            <wui-text variant="md-regular" color="primary">
              ${n} ${e.currency.metadata.symbol||"Unknown"}
            </wui-text>

            <wui-flex alignItems="center" gap="01">
              <wui-image
                src=${(0,r.ifDefined)(a.AssetUtil.getNetworkImage(t))}
                size="xs"
              ></wui-image>
              <wui-text variant="sm-regular" color="secondary">
                ${t?.name||"Unknown"}
              </wui-text>
            </wui-flex>
          </wui-flex>
        </wui-flex>
      `}return i.html`
      <wui-flex alignItems="center" justifyContent="space-between">
        <wui-text variant="md-regular" color="secondary">${e.label}</wui-text>
        <wui-text variant="md-regular" color="primary">
          ${n} ${e.currency.metadata.symbol||"Unknown"}
        </wui-text>
      </wui-flex>
    `}};eQ.styles=[eW],eM([(0,n.state)()],eQ.prototype,"quote",void 0),eQ=eM([(0,p.customElement)("w3m-pay-fees")],eQ);var eH=t;let eK=ew.css`
  :host {
    display: block;
    width: 100%;
  }

  .disabled-container {
    padding: ${({spacing:e})=>e[2]};
    min-height: 168px;
  }

  wui-icon {
    width: ${({spacing:e})=>e[8]};
    height: ${({spacing:e})=>e[8]};
  }

  wui-flex > wui-text {
    max-width: 273px;
  }
`;var eY=function(e,t,i,n){var r,a=arguments.length,s=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(s=(a<3?r(s):a>3?r(t,i,s):r(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let eG=class extends eH.LitElement{constructor(){super(),this.unsubscribe=[],this.selectedExchange=ey.state.selectedExchange,this.unsubscribe.push(ey.subscribeKey("selectedExchange",e=>this.selectedExchange=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=!!this.selectedExchange;return i.html`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="3"
        class="disabled-container"
      >
        <wui-icon name="coins" color="default" size="inherit"></wui-icon>

        <wui-text variant="md-regular" color="primary" align="center">
          You don't have enough funds to complete this transaction
        </wui-text>

        ${e?null:i.html`<wui-button
              size="md"
              variant="neutral-secondary"
              @click=${this.dispatchConnectOtherWalletEvent.bind(this)}
              >Connect other wallet</wui-button
            >`}
      </wui-flex>
    `}dispatchConnectOtherWalletEvent(){this.dispatchEvent(new CustomEvent("connectOtherWallet",{detail:!0,bubbles:!0,composed:!0}))}};eG.styles=[eK],eY([(0,eE.property)({type:Array})],eG.prototype,"selectedExchange",void 0),eG=eY([(0,p.customElement)("w3m-pay-options-empty")],eG);var eV=t;let eJ=ew.css`
  :host {
    display: block;
    width: 100%;
  }

  .pay-options-container {
    max-height: 196px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .pay-options-container::-webkit-scrollbar {
    display: none;
  }

  .pay-option-container {
    border-radius: ${({borderRadius:e})=>e[4]};
    padding: ${({spacing:e})=>e[3]};
    min-height: 60px;
  }

  .token-images-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .chain-image {
    position: absolute;
    bottom: -3px;
    right: -5px;
    border: 2px solid ${({tokens:e})=>e.theme.foregroundSecondary};
  }
`,eX=class extends eV.LitElement{render(){return i.html`
      <wui-flex flexDirection="column" gap="2" class="pay-options-container">
        ${this.renderOptionEntry()} ${this.renderOptionEntry()} ${this.renderOptionEntry()}
      </wui-flex>
    `}renderOptionEntry(){return i.html`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        gap="2"
        class="pay-option-container"
      >
        <wui-flex alignItems="center" gap="2">
          <wui-flex class="token-images-container">
            <wui-shimmer
              width="32px"
              height="32px"
              rounded
              variant="light"
              class="token-image"
            ></wui-shimmer>
            <wui-shimmer
              width="16px"
              height="16px"
              rounded
              variant="light"
              class="chain-image"
            ></wui-shimmer>
          </wui-flex>

          <wui-flex flexDirection="column" gap="1">
            <wui-shimmer
              width="74px"
              height="16px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>
            <wui-shimmer
              width="46px"
              height="14px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}};eX.styles=[eJ],eX=function(e,t,i,n){var r,a=arguments.length,s=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(s=(a<3?r(s):a>3?r(t,i,s):r(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s}([(0,p.customElement)("w3m-pay-options-skeleton")],eX);var eZ=t,e0=e.i(608601);let e1=ew.css`
  :host {
    display: block;
    width: 100%;
  }

  .pay-options-container {
    max-height: 196px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    mask-image: var(--options-mask-image);
    -webkit-mask-image: var(--options-mask-image);
  }

  .pay-options-container::-webkit-scrollbar {
    display: none;
  }

  .pay-option-container {
    cursor: pointer;
    border-radius: ${({borderRadius:e})=>e[4]};
    padding: ${({spacing:e})=>e[3]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-1"]};
    will-change: background-color;
  }

  .token-images-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .token-image {
    border-radius: ${({borderRadius:e})=>e.round};
    width: 32px;
    height: 32px;
  }

  .chain-image {
    position: absolute;
    width: 16px;
    height: 16px;
    bottom: -3px;
    right: -5px;
    border-radius: ${({borderRadius:e})=>e.round};
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  @media (hover: hover) and (pointer: fine) {
    .pay-option-container:hover {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    }
  }
`;var e3=function(e,t,i,n){var r,a=arguments.length,s=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(s=(a<3?r(s):a>3?r(t,i,s):r(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let e5=class extends eZ.LitElement{constructor(){super(),this.unsubscribe=[],this.options=[],this.selectedPaymentAsset=null}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.resizeObserver?.disconnect();let e=this.shadowRoot?.querySelector(".pay-options-container");e?.removeEventListener("scroll",this.handleOptionsListScroll.bind(this))}firstUpdated(){let e=this.shadowRoot?.querySelector(".pay-options-container");e&&(requestAnimationFrame(this.handleOptionsListScroll.bind(this)),e?.addEventListener("scroll",this.handleOptionsListScroll.bind(this)),this.resizeObserver=new ResizeObserver(()=>{this.handleOptionsListScroll()}),this.resizeObserver?.observe(e),this.handleOptionsListScroll())}render(){return i.html`
      <wui-flex flexDirection="column" gap="2" class="pay-options-container">
        ${this.options.map(e=>this.payOptionTemplate(e))}
      </wui-flex>
    `}payOptionTemplate(e){let{network:t,metadata:n,asset:o,amount:l="0"}=e,c=s.ChainController.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===t),u=`${t}:${o}`,d=`${this.selectedPaymentAsset?.network}:${this.selectedPaymentAsset?.asset}`,p=y.NumberUtil.bigNumber(l,{safe:!0}),m=p.gt(0);return i.html`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        gap="2"
        @click=${()=>this.onSelect?.(e)}
        class="pay-option-container"
      >
        <wui-flex alignItems="center" gap="2">
          <wui-flex class="token-images-container">
            <wui-image
              src=${(0,r.ifDefined)(n.logoURI)}
              class="token-image"
              size="3xl"
            ></wui-image>
            <wui-image
              src=${(0,r.ifDefined)(a.AssetUtil.getNetworkImage(c))}
              class="chain-image"
              size="md"
            ></wui-image>
          </wui-flex>

          <wui-flex flexDirection="column" gap="1">
            <wui-text variant="lg-regular" color="primary">${n.symbol}</wui-text>
            ${m?i.html`<wui-text variant="sm-regular" color="secondary">
                  ${p.round(6).toString()} ${n.symbol}
                </wui-text>`:null}
          </wui-flex>
        </wui-flex>

        ${u===d?i.html`<wui-icon name="checkmark" size="md" color="success"></wui-icon>`:null}
      </wui-flex>
    `}handleOptionsListScroll(){let e=this.shadowRoot?.querySelector(".pay-options-container");e&&(e.scrollHeight>300?(e.style.setProperty("--options-mask-image",`linear-gradient(
          to bottom,
          rgba(0, 0, 0, calc(1 - var(--options-scroll--top-opacity))) 0px,
          rgba(200, 200, 200, calc(1 - var(--options-scroll--top-opacity))) 1px,
          black 50px,
          black calc(100% - 50px),
          rgba(155, 155, 155, calc(1 - var(--options-scroll--bottom-opacity))) calc(100% - 1px),
          rgba(0, 0, 0, calc(1 - var(--options-scroll--bottom-opacity))) 100%
        )`),e.style.setProperty("--options-scroll--top-opacity",e0.MathUtil.interpolate([0,50],[0,1],e.scrollTop).toString()),e.style.setProperty("--options-scroll--bottom-opacity",e0.MathUtil.interpolate([0,50],[0,1],e.scrollHeight-e.scrollTop-e.offsetHeight).toString())):(e.style.setProperty("--options-mask-image","none"),e.style.setProperty("--options-scroll--top-opacity","0"),e.style.setProperty("--options-scroll--bottom-opacity","0")))}};e5.styles=[e1],e3([(0,eE.property)({type:Array})],e5.prototype,"options",void 0),e3([(0,eE.property)()],e5.prototype,"selectedPaymentAsset",void 0),e3([(0,eE.property)()],e5.prototype,"onSelect",void 0),e5=e3([(0,p.customElement)("w3m-pay-options")],e5);let e2=ew.css`
  .payment-methods-container {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:e})=>e[5]};
    border-top-left-radius: ${({borderRadius:e})=>e[5]};
  }

  .pay-options-container {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[5]};
    padding: ${({spacing:e})=>e[1]};
  }

  w3m-tooltip-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: fit-content;
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e.round};
  }

  w3m-pay-options.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;var e4=function(e,t,i,n){var r,a=arguments.length,s=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,n);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(s=(a<3?r(s):a>3?r(t,i,s):r(t,i))||s);return a>3&&s&&Object.defineProperty(t,i,s),s};let e6={eip155:{icon:"ethereum",label:"EVM"},solana:{icon:"solana",label:"Solana"},bip122:{icon:"bitcoin",label:"Bitcoin"},ton:{icon:"ton",label:"Ton"}},e8=class extends e_.LitElement{constructor(){super(),this.unsubscribe=[],this.profileName=null,this.paymentAsset=ey.state.paymentAsset,this.namespace=void 0,this.caipAddress=void 0,this.amount=ey.state.amount,this.recipient=ey.state.recipient,this.activeConnectorIds=l.ConnectorController.state.activeConnectorIds,this.selectedPaymentAsset=ey.state.selectedPaymentAsset,this.selectedExchange=ey.state.selectedExchange,this.isFetchingQuote=ey.state.isFetchingQuote,this.quoteError=ey.state.quoteError,this.quote=ey.state.quote,this.isFetchingTokenBalances=ey.state.isFetchingTokenBalances,this.tokenBalances=ey.state.tokenBalances,this.isPaymentInProgress=ey.state.isPaymentInProgress,this.exchangeUrlForQuote=ey.state.exchangeUrlForQuote,this.completedTransactionsCount=0,this.unsubscribe.push(ey.subscribeKey("paymentAsset",e=>this.paymentAsset=e)),this.unsubscribe.push(ey.subscribeKey("tokenBalances",e=>this.onTokenBalancesChanged(e))),this.unsubscribe.push(ey.subscribeKey("isFetchingTokenBalances",e=>this.isFetchingTokenBalances=e)),this.unsubscribe.push(l.ConnectorController.subscribeKey("activeConnectorIds",e=>this.activeConnectorIds=e)),this.unsubscribe.push(ey.subscribeKey("selectedPaymentAsset",e=>this.selectedPaymentAsset=e)),this.unsubscribe.push(ey.subscribeKey("isFetchingQuote",e=>this.isFetchingQuote=e)),this.unsubscribe.push(ey.subscribeKey("quoteError",e=>this.quoteError=e)),this.unsubscribe.push(ey.subscribeKey("quote",e=>this.quote=e)),this.unsubscribe.push(ey.subscribeKey("amount",e=>this.amount=e)),this.unsubscribe.push(ey.subscribeKey("recipient",e=>this.recipient=e)),this.unsubscribe.push(ey.subscribeKey("isPaymentInProgress",e=>this.isPaymentInProgress=e)),this.unsubscribe.push(ey.subscribeKey("selectedExchange",e=>this.selectedExchange=e)),this.unsubscribe.push(ey.subscribeKey("exchangeUrlForQuote",e=>this.exchangeUrlForQuote=e)),this.resetQuoteState(),this.initializeNamespace(),this.fetchTokens()}disconnectedCallback(){super.disconnectedCallback(),this.resetAssetsState(),this.unsubscribe.forEach(e=>e())}updated(e){super.updated(e),e.has("selectedPaymentAsset")&&this.fetchQuote()}render(){return i.html`
      <wui-flex flexDirection="column">
        ${this.profileTemplate()}

        <wui-flex
          flexDirection="column"
          gap="4"
          class="payment-methods-container"
          .padding=${["4","4","5","4"]}
        >
          ${this.paymentOptionsViewTemplate()} ${this.amountWithFeeTemplate()}

          <wui-flex
            alignItems="center"
            justifyContent="space-between"
            .padding=${["1","0","1","0"]}
          >
            <wui-separator></wui-separator>
          </wui-flex>

          ${this.paymentActionsTemplate()}
        </wui-flex>
      </wui-flex>
    `}profileTemplate(){if(this.selectedExchange){let e=y.NumberUtil.formatNumber(this.quote?.origin.amount,{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString();return i.html`
        <wui-flex
          .padding=${["4","3","4","3"]}
          alignItems="center"
          justifyContent="space-between"
          gap="2"
        >
          <wui-text variant="lg-regular" color="secondary">Paying with</wui-text>

          ${this.quote?i.html`<wui-text variant="lg-regular" color="primary">
                ${y.NumberUtil.bigNumber(e,{safe:!0}).round(6).toString()}
                ${this.quote.origin.currency.metadata.symbol}
              </wui-text>`:i.html`<wui-shimmer width="80px" height="18px" variant="light"></wui-shimmer>`}
        </wui-flex>
      `}let e=f.CoreHelperUtil.getPlainAddress(this.caipAddress)??"",{name:t,image:n}=this.getWalletProperties({namespace:this.namespace}),{icon:a,label:s}=e6[this.namespace]??{};return i.html`
      <wui-flex
        .padding=${["4","3","4","3"]}
        alignItems="center"
        justifyContent="space-between"
        gap="2"
      >
        <wui-wallet-switch
          profileName=${(0,r.ifDefined)(this.profileName)}
          address=${(0,r.ifDefined)(e)}
          imageSrc=${(0,r.ifDefined)(n)}
          alt=${(0,r.ifDefined)(t)}
          @click=${this.onConnectOtherWallet.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>

        <wui-wallet-switch
          profileName=${(0,r.ifDefined)(s)}
          address=${(0,r.ifDefined)(e)}
          icon=${(0,r.ifDefined)(a)}
          iconSize="xs"
          .enableGreenCircle=${!1}
          alt=${(0,r.ifDefined)(s)}
          @click=${this.onConnectOtherWallet.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>
      </wui-flex>
    `}initializeNamespace(){let e=s.ChainController.state.activeChain;this.namespace=e,this.caipAddress=s.ChainController.getAccountData(e)?.caipAddress,this.profileName=s.ChainController.getAccountData(e)?.profileName??null,this.unsubscribe.push(s.ChainController.subscribeChainProp("accountState",e=>this.onAccountStateChanged(e),e))}async fetchTokens(){if(this.namespace){let e;if(this.caipAddress){let{chainId:t,chainNamespace:i}=w.ParseUtil.parseCaipAddress(this.caipAddress),n=`${i}:${t}`;e=s.ChainController.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===n)}await ey.fetchTokens({caipAddress:this.caipAddress,caipNetwork:e,namespace:this.namespace})}}fetchQuote(){if(this.amount&&this.recipient&&this.selectedPaymentAsset&&this.paymentAsset){let{address:e}=this.caipAddress?w.ParseUtil.parseCaipAddress(this.caipAddress):{};ey.fetchQuote({amount:this.amount.toString(),address:e,sourceToken:this.selectedPaymentAsset,toToken:this.paymentAsset,recipient:this.recipient})}}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};let t=this.activeConnectorIds[e];if(!t)return{name:void 0,image:void 0};let i=l.ConnectorController.getConnector({id:t,namespace:e});if(!i)return{name:void 0,image:void 0};let n=a.AssetUtil.getConnectorImage(i);return{name:i.name,image:n}}paymentOptionsViewTemplate(){return i.html`
      <wui-flex flexDirection="column" gap="2">
        <wui-text variant="sm-regular" color="secondary">CHOOSE PAYMENT OPTION</wui-text>
        <wui-flex class="pay-options-container">${this.paymentOptionsTemplate()}</wui-flex>
      </wui-flex>
    `}paymentOptionsTemplate(){let e=this.getPaymentAssetFromTokenBalances();if(this.isFetchingTokenBalances)return i.html`<w3m-pay-options-skeleton></w3m-pay-options-skeleton>`;if(0===e.length)return i.html`<w3m-pay-options-empty
        @connectOtherWallet=${this.onConnectOtherWallet.bind(this)}
      ></w3m-pay-options-empty>`;let t={disabled:this.isFetchingQuote};return i.html`<w3m-pay-options
      class=${(0,eC.classMap)(t)}
      .options=${e}
      .selectedPaymentAsset=${(0,r.ifDefined)(this.selectedPaymentAsset)}
      .onSelect=${this.onSelectedPaymentAssetChanged.bind(this)}
    ></w3m-pay-options>`}amountWithFeeTemplate(){return this.isFetchingQuote||!this.selectedPaymentAsset||this.quoteError?i.html`<w3m-pay-fees-skeleton></w3m-pay-fees-skeleton>`:i.html`<w3m-pay-fees></w3m-pay-fees>`}paymentActionsTemplate(){let e=this.isFetchingQuote||this.isFetchingTokenBalances,t=this.isFetchingQuote||this.isFetchingTokenBalances||!this.selectedPaymentAsset||!!this.quoteError,n=y.NumberUtil.formatNumber(this.quote?.origin.amount??0,{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString();return this.selectedExchange?e||t?i.html`
          <wui-shimmer width="100%" height="48px" variant="light" ?rounded=${!0}></wui-shimmer>
        `:i.html`<wui-button
        size="lg"
        fullWidth
        variant="accent-secondary"
        @click=${this.onPayWithExchange.bind(this)}
      >
        ${`Continue in ${this.selectedExchange.name}`}

        <wui-icon name="arrowRight" color="inherit" size="sm" slot="iconRight"></wui-icon>
      </wui-button>`:i.html`
      <wui-flex alignItems="center" justifyContent="space-between">
        <wui-flex flexDirection="column" gap="1">
          <wui-text variant="md-regular" color="secondary">Order Total</wui-text>

          ${e||t?i.html`<wui-shimmer width="58px" height="32px" variant="light"></wui-shimmer>`:i.html`<wui-flex alignItems="center" gap="01">
                <wui-text variant="h4-regular" color="primary">${eu(n)}</wui-text>

                <wui-text variant="lg-regular" color="secondary">
                  ${this.quote?.origin.currency.metadata.symbol||"Unknown"}
                </wui-text>
              </wui-flex>`}
        </wui-flex>

        ${this.actionButtonTemplate({isLoading:e,isDisabled:t})}
      </wui-flex>
    `}actionButtonTemplate(e){let t=G(this.quote),{isLoading:n,isDisabled:r}=e,a="Pay";return t.length>1&&0===this.completedTransactionsCount&&(a="Approve"),i.html`
      <wui-button
        size="lg"
        variant="accent-primary"
        ?loading=${n||this.isPaymentInProgress}
        ?disabled=${r||this.isPaymentInProgress}
        @click=${()=>{t.length>0?this.onSendTransactions():this.onTransfer()}}
      >
        ${a}
        ${n?null:i.html`<wui-icon
              name="arrowRight"
              color="inherit"
              size="sm"
              slot="iconRight"
            ></wui-icon>`}
      </wui-button>
    `}getPaymentAssetFromTokenBalances(){return this.namespace?(this.tokenBalances[this.namespace]??[]).map(e=>{try{return function(e){let t=s.ChainController.getAllRequestedCaipNetworks().find(t=>t.caipNetworkId===e.chainId),i=e.address;if(!t)throw Error(`Target network not found for balance chainId "${e.chainId}"`);if(v.HelpersUtil.isLowerCaseMatch(e.symbol,t.nativeCurrency.symbol))i="native";else if(f.CoreHelperUtil.isCaipAddress(i)){let{address:e}=w.ParseUtil.parseCaipAddress(i);i=e}else if(!i)throw Error(`Balance address not found for balance symbol "${e.symbol}"`);return{network:t.caipNetworkId,asset:i,metadata:{name:e.name,symbol:e.symbol,decimals:Number(e.quantity.decimals),logoURI:e.iconUrl},amount:e.quantity.numeric}}(e)}catch(e){return null}}).filter(e=>!!e).filter(e=>{let{chainId:t}=w.ParseUtil.parseCaipNetworkId(e.network),{chainId:i}=w.ParseUtil.parseCaipNetworkId(this.paymentAsset.network);return!!v.HelpersUtil.isLowerCaseMatch(e.asset,this.paymentAsset.asset)||!this.selectedExchange||!v.HelpersUtil.isLowerCaseMatch(t.toString(),i.toString())}):[]}onTokenBalancesChanged(e){this.tokenBalances=e;let[t]=this.getPaymentAssetFromTokenBalances();t&&ey.setSelectedPaymentAsset(t)}async onConnectOtherWallet(){await l.ConnectorController.connect(),await c.ModalController.open({view:"PayQuote"})}onAccountStateChanged(e){let{address:t}=this.caipAddress?w.ParseUtil.parseCaipAddress(this.caipAddress):{};if(this.caipAddress=e?.caipAddress,this.profileName=e?.profileName??null,t){let{address:e}=this.caipAddress?w.ParseUtil.parseCaipAddress(this.caipAddress):{};e?v.HelpersUtil.isLowerCaseMatch(e,t)||(this.resetAssetsState(),this.resetQuoteState(),this.fetchTokens()):c.ModalController.close()}}onSelectedPaymentAssetChanged(e){this.isFetchingQuote||ey.setSelectedPaymentAsset(e)}async onTransfer(){let e=Y(this.quote);if(e){if(!v.HelpersUtil.isLowerCaseMatch(this.selectedPaymentAsset?.asset,e.deposit.currency))throw Error("Quote asset is not the same as the selected payment asset");let t=this.selectedPaymentAsset?.amount??"0",i=y.NumberUtil.formatNumber(e.deposit.amount,{decimals:this.selectedPaymentAsset?.metadata.decimals??0}).toString();if(!y.NumberUtil.bigNumber(t).gte(i))return void d.SnackController.showError("Insufficient funds");if(this.quote&&this.selectedPaymentAsset&&this.caipAddress&&this.namespace){let{address:t}=w.ParseUtil.parseCaipAddress(this.caipAddress);await ey.onTransfer({chainNamespace:this.namespace,fromAddress:t,toAddress:e.deposit.receiver,amount:i,paymentAsset:this.selectedPaymentAsset}),ey.setRequestId(e.requestId),u.RouterController.push("PayLoading")}}}async onSendTransactions(){let e=this.selectedPaymentAsset?.amount??"0",t=y.NumberUtil.formatNumber(this.quote?.origin.amount??0,{decimals:this.selectedPaymentAsset?.metadata.decimals??0}).toString();if(!y.NumberUtil.bigNumber(e).gte(t))return void d.SnackController.showError("Insufficient funds");let i=G(this.quote),[n]=G(this.quote,this.completedTransactionsCount);n&&this.namespace&&(await ey.onSendTransaction({namespace:this.namespace,transactionStep:n}),this.completedTransactionsCount+=1,this.completedTransactionsCount===i.length&&(ey.setRequestId(n.requestId),u.RouterController.push("PayLoading")))}onPayWithExchange(){if(this.exchangeUrlForQuote){let e=f.CoreHelperUtil.returnOpenHref("","popupWindow","scrollbar=yes,width=480,height=720");if(!e)throw Error("Could not create popup window");e.location.href=this.exchangeUrlForQuote;let t=Y(this.quote);t&&ey.setRequestId(t.requestId),ey.initiatePayment(),u.RouterController.push("PayLoading")}}resetAssetsState(){ey.setSelectedPaymentAsset(null)}resetQuoteState(){ey.resetQuoteState()}};async function e9(e){return ey.handleOpenPay(e)}async function e7(e,t=3e5){if(t<=0)throw new _(C,"Timeout must be greater than 0");try{await e9(e)}catch(e){if(e instanceof _)throw e;throw new _(A,e.message)}return new Promise((e,i)=>{var n;let r=!1,a=setTimeout(()=>{r||(r=!0,o(),i(new _(I,"Payment timeout")))},t);function s(){if(r)return;let t=ey.state.currentPayment,i=ey.state.error,n=ey.state.isPaymentInProgress;if(t?.status==="SUCCESS"){r=!0,o(),clearTimeout(a),e({success:!0,result:t.result});return}if(t?.status==="FAILED"){r=!0,o(),clearTimeout(a),e({success:!1,error:i||"Payment failed"});return}!i||n||t||(r=!0,o(),clearTimeout(a),e({success:!1,error:i}))}let o=(n=[tr("currentPayment",s),tr("error",s),tr("isPaymentInProgress",s)],()=>{n.forEach(e=>{try{e()}catch{}})});s()})}function te(){return ey.getExchanges()}function tt(){return ey.state.currentPayment?.result}function ti(){return ey.state.error}function tn(){return ey.state.isPaymentInProgress}function tr(e,t){return ey.subscribeKey(e,t)}e8.styles=e2,e4([(0,n.state)()],e8.prototype,"profileName",void 0),e4([(0,n.state)()],e8.prototype,"paymentAsset",void 0),e4([(0,n.state)()],e8.prototype,"namespace",void 0),e4([(0,n.state)()],e8.prototype,"caipAddress",void 0),e4([(0,n.state)()],e8.prototype,"amount",void 0),e4([(0,n.state)()],e8.prototype,"recipient",void 0),e4([(0,n.state)()],e8.prototype,"activeConnectorIds",void 0),e4([(0,n.state)()],e8.prototype,"selectedPaymentAsset",void 0),e4([(0,n.state)()],e8.prototype,"selectedExchange",void 0),e4([(0,n.state)()],e8.prototype,"isFetchingQuote",void 0),e4([(0,n.state)()],e8.prototype,"quoteError",void 0),e4([(0,n.state)()],e8.prototype,"quote",void 0),e4([(0,n.state)()],e8.prototype,"isFetchingTokenBalances",void 0),e4([(0,n.state)()],e8.prototype,"tokenBalances",void 0),e4([(0,n.state)()],e8.prototype,"isPaymentInProgress",void 0),e4([(0,n.state)()],e8.prototype,"exchangeUrlForQuote",void 0),e4([(0,n.state)()],e8.prototype,"completedTransactionsCount",void 0),e8=e4([(0,p.customElement)("w3m-pay-quote-view")],e8),e.s(["W3mPayQuoteView",()=>e8],662703),e.s(["getExchanges",()=>te,"getIsPaymentInProgress",()=>tn,"getPayError",()=>ti,"getPayResult",()=>tt,"openPay",()=>e9,"pay",()=>e7],972122),e.s(["arbitrumUSDC",0,{network:"eip155:42161",asset:"0xaf88d065e77c8cC2239327C5EDb3A432268e5831",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},"arbitrumUSDT",0,{network:"eip155:42161",asset:"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},"baseETH",0,{network:"eip155:8453",asset:"native",metadata:{name:"Ethereum",symbol:"ETH",decimals:18}},"baseSepoliaETH",0,{network:"eip155:84532",asset:"native",metadata:{name:"Ethereum",symbol:"ETH",decimals:18}},"baseUSDC",0,{network:"eip155:8453",asset:"0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},"ethereumUSDC",0,{network:"eip155:1",asset:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},"ethereumUSDT",0,{network:"eip155:1",asset:"0xdAC17F958D2ee523a2206206994597C13D831ec7",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},"optimismUSDC",0,{network:"eip155:10",asset:"0x0b2c639c533813f4aa9d7837caf62653d097ff85",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},"optimismUSDT",0,{network:"eip155:10",asset:"0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},"polygonUSDC",0,{network:"eip155:137",asset:"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},"polygonUSDT",0,{network:"eip155:137",asset:"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},"solanaSOL",0,{network:"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",asset:"native",metadata:{name:"Solana",symbol:"SOL",decimals:9}},"solanaUSDC",0,{network:"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",asset:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},"solanaUSDT",0,{network:"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",asset:"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}}],746668),e.s([],854712)}]);