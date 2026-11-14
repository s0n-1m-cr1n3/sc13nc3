var _pnclg8f;(()=>{var e={286(e2,t2,o2){o2.d(t2,{I:()=>r2});let r2=Symbol.for("controller frame handle")},805(e2,t2,o2){o2.d(t2,{C:()=>r2});class r2{methods;id;sendRaw;counter=0;promiseCallbacks=new Map;constructor(e3,t3,o3){this.methods=e3,this.id=t3,this.sendRaw=o3}recieve(e3){if(null==e3||"object"!=typeof e3)return;let t3=e3[this.id];if(null==t3||"object"!=typeof t3)return;let o3=t3.$type;if("response"===o3){let e4=t3.$token,o4=t3.$data,r3=t3.$error,i=this.promiseCallbacks.get(e4);if(!i)return;this.promiseCallbacks.delete(e4),void 0!==r3?i.reject(Error(r3)):i.resolve(o4)}else if("request"===o3){let e4=t3.$method,o4=t3.$args;this.methods[e4](o4).then(e5=>{this.sendRaw({[this.id]:{$type:"response",$token:t3.$token,$data:e5?.[0]}},e5?.[1])}).catch(e5=>{console.error(e5),this.sendRaw({[this.id]:{$type:"response",$token:t3.$token,$error:e5?.toString()||"Unknown error"}},[])})}}call(e3,t3,o3=[]){let r3=this.counter++;return new Promise((i,s)=>{this.promiseCallbacks.set(r3,{resolve:i,reject:s}),this.sendRaw({[this.id]:{$type:"request",$method:e3,$args:t3,$token:r3}},o3)})}}},423(e2,t2,o2){o2.d(t2,{Cx:()=>f,bw:()=>l,cP:()=>i,ht:()=>N,pX:()=>a});let{BareResponse:r2,CookieJar:i,IncrementalHtmlRewriter:s,Plugin:n,_6rqj1wdexiue_:a,_29msnoadcsd7_29ms:c,_jhzau51qrnee_:l,_i3qyajn50dvr_i3qyaj:h,_rqnk8ta7zncl_rqnk8ta7zncl:d,_ui6994zgdxpd_u:p,Tap:f,createLocationProxy:k,defaultConfig:g,defaultConfigDev:y,flagEnabled:m,getOwnPropertyDescriptorHandler:u,getRewriter:w,getScriptBlockTypeString:b,htmlRules:$,isArchiveMimeType:v,isAudioOrVideoMimeType:C,isFontMimeType:S,isHtmlMimeType:j,isImageMimeType:M,isInlineDisplayableMimeType:x,isJavascriptMimeType:P,isJavascriptMimeTypeEssenceMatch:A,isModuleScriptType:R,isScriptType:W,isScriptableMimeType:E,isXmlMimeType:J,isZipBasedMimeType:I,isdedicated:T,isshared:D,issw:O,iswindow:q,isworker:H,parseMimeType:X,rewriteBlob:U,rewriteCss:B,rewriteHtml:L,rewriteJs:_,rewriteJsInner:F,rewriteSrcset:G,rewriteUrl:z,rewriteWorkers:K,setWasm:N,unrewriteBlob:Q,unrewriteCss:V,unrewriteHtml:Y,unrewriteUrl:Z,versionInfo:ee}=globalThis._s3px98t}},t={};function o(r2){var i=t[r2];if(void 0!==i)return i.exports;var s=t[r2]={exports:{}};return e[r2](s,s.exports,o),s.exports}o.d=(e2,t2)=>{for(var r2 in t2)o.o(t2,r2)&&!o.o(e2,r2)&&Object.defineProperty(e2,r2,{enumerable:true,get:t2[r2]})},o.o=(e2,t2)=>Object.prototype.hasOwnProperty.call(e2,t2),o.r=e2=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e2,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e2,"__esModule",{value:true})};var r={};(()=>{o.r(r),o.d(r,{load:()=>l});var e2=o(805),t2=o(286),i=o(423);let s=MessagePort.prototype.postMessage,n=(e3,t3,o2)=>{s.call(e3,t3,o2)};class a{port;readyResolve;readyPromise=new Promise(e3=>{this.readyResolve=e3});ready=false;async init(){await this.readyPromise,this.ready=true}rpc;constructor(t3){this.port=t3,this.rpc=new e2.C({ready:async()=>{this.readyResolve()}},"transport",(e3,o2)=>{n(t3,e3,o2)}),t3.onmessageerror=e3=>{console.error("onmessageerror (this should never happen!)",e3)},t3.onmessage=e3=>{this.rpc.recieve(e3.data)},t3.start()}connect(e3,t3,o2,r2,i2,s2,a2){let c2=new MessageChannel,l2=c2.port1;return console.warn("connecting"),this.rpc.call("connect",{url:e3.href,protocols:t3,requestHeaders:o2,port:c2.port2},[c2.port2]).then(e4=>{console.log(e4),"success"===e4.result?r2(e4.protocol,e4.extensions):a2(e4.error)}),l2.onmessage=e4=>{let t4=e4.data;"data"===t4.type?i2(t4.data):"close"===t4.type&&s2(t4.code,t4.reason)},l2.onmessageerror=e4=>{console.error("onmessageerror (this should never happen!)",e4),a2("Message error in transport port")},[e4=>{n(l2,{type:"data",data:e4},e4 instanceof ArrayBuffer?[e4]:[])},e4=>{n(l2,{type:"close",code:e4})}]}async request(e3,t3,o2,r2,i2){return await this.rpc.call("request",{remote:e3.href,method:t3,body:o2,headers:r2})}async sendSetCookie(e3,t3={}){await this.rpc.call("sendSetCookie",{cookies:e3.map(({url:e4,cookie:t4})=>({url:e4.href,cookie:t4})),options:t3})}}let c=navigator.serviceWorker.controller;function l(e3){if(i.pX in globalThis)return void globalThis[i.pX].syncDocumentInit({initHeaders:e3.initHeaders,history:e3.history,cookies:e3.cookies});if(!("WASM"in self))throw Error("WASM not found in global scope!");let t3=Uint8Array.from(atob(self.WASM),e4=>e4.charCodeAt(0));delete self.WASM,(0,i.ht)(t3),new h(globalThis,e3)}class h{global;init;client;cookieJar;transport;handleServiceWorkerCookieMessage;constructor(e3,t3){this.global=e3,this.init=t3;const o2=new MessageChannel;this.transport=new a(o2.port1),c?.postMessage({$sw$initRemoteTransport:{port:o2.port2,prefix:this.init.prefix.href}},[o2.port2]),this.cookieJar=new i.cP,this.cookieJar.load(this.init.cookies),this.handleServiceWorkerCookieMessage=e4=>{if(!e4.data?.$controller$setCookie||"object"!=typeof e4.data.$controller$setCookie)return;let t4=e4.data.$controller$setCookie;if(t4.options?.clear&&this.cookieJar.clear(),Array.isArray(t4.cookies)){for(let e5 of t4.cookies)if("string"==typeof e5?.url&&"string"==typeof e5.cookie)try{this.cookieJar.setCookies(e5.cookie,new URL(e5.url))}catch{console.error("Failed to set cookie",e5)}}if("string"==typeof t4.id){let e5=navigator.serviceWorker?.controller??c;e5?.postMessage({$sw$setCookieDone:{id:t4.id}})}},navigator.serviceWorker?.addEventListener("message",this.handleServiceWorkerCookieMessage),this.inject_ueb6ouf()}inject_ueb6ouf(){let e3=this.global.frameElement;e3&&!e3.name&&(window.name=e3.name=`${Array(8).fill(0).map(()=>Math.floor(36*Math.random()).toString(36)).join("")}`);let o2=e3?.[t2.I],r2=true;if(!o2){r2=false;let e4=this.global.window;for(;e4.parent!==e4;){let r3=e4[i.pX];if(!r3){e4=e4.parent.window;continue}let s3=r3.descriptors.get("window.frameElement",e4);if(s3&&s3[t2.I]){o2=s3[t2.I];break}e4=e4.parent.window}}let s2={config:this.init.sjconfig,prefix:this.init.prefix,cookieJar:this.cookieJar,interface:{getInjectScripts:this.init.yieldGetInjectScripts(this.init.config,this.init.sjconfig,this.init.prefix,this.cookieJar,this.init.codecEncode,this.init.codecDecode),codecEncode:this.init.codecEncode,codecDecode:this.init.codecDecode}};this.client=new i.bw(this.global,{context:s2,transport:this.transport,sendSetCookie:async(e4,t3)=>{await this.transport.sendSetCookie(e4,t3)},shouldBlockMessageEvent:()=>false,hookSubcontext:e4=>new h(e4,{...this.init,cookies:this.cookieJar.dump()}).client,initHeaders:this.init.initHeaders,history:this.init.history});let n2={window:this.global.window,client:this.client,isTopLevel:r2};o2&&i.Cx.dispatch(o2.hooks.init.pre,n2,{}),this.client.hook(),o2&&i.Cx.dispatch(o2.hooks.init.post,n2,{})}}})(),_pnclg8f=r})();
;(function(){try{
  var UA_KEY = 'ub_ua_profile', EXT_KEY = 'ub_ext_scripts', PKG_KEY = 'ub_ext_packages';
  function readKey(k){
    var v = null;
    try { v = localStorage.getItem(k); } catch (e) {}
    if (!v && window.parent && window.parent !== window) {
      try { v = window.parent.localStorage.getItem(k); } catch (e) {}
    }
    return v;
  }
  function realUrl(){
    var p = location.pathname, i = p.indexOf('/~/sj/');
    return i >= 0 ? p.slice(i + 6) + location.search + location.hash : location.href;
  }
  function hostOf(u){ try { return new URL(u).hostname; } catch (e) { return ''; } }
  function matches(pattern, url, host){
    try {
      var p = String(pattern || '*').trim();
      if (!p || p === '*' || p === '<all_urls>') return true;
      if (p.indexOf('://') === -1 && p.indexOf('*') === -1 && p.indexOf('/') === -1 && p.indexOf('.') !== -1) {
        return host === p || host.slice(-(p.length + 1)) === '.' + p;
      }
      var re = new RegExp('^' + p.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$');
      return re.test(url) || re.test(host);
    } catch (e) { return false; }
  }
  function anyMatch(patterns, url, host){
    for (var i = 0; i < patterns.length; i++) {
      if (matches(patterns[i], url, host)) return true;
    }
    return false;
  }
  function installChrome(pk){
    try {
      var c = window.chrome || (window.chrome = {});
      var id = String(pk.id || 'ub-extension');
      if (!c.runtime) {
        c.runtime = {
          id: id,
          getURL: function (p) { return 'chrome-extension://' + id + '/' + String(p || '').replace(/^\/+/, ''); },
          sendMessage: function () {
            var cb = arguments[arguments.length - 1];
            if (typeof cb === 'function') setTimeout(function () { cb(undefined); }, 0);
            return Promise.resolve(undefined);
          },
          onMessage: { addListener: function () {}, removeListener: function () {}, hasListener: function () { return false; } },
          onConnect: { addListener: function () {}, removeListener: function () {} },
          connect: function () {
            return { postMessage: function () {}, disconnect: function () {}, onMessage: { addListener: function () {}, removeListener: function () {} }, onDisconnect: { addListener: function () {}, removeListener: function () {} } };
          },
          lastError: null
        };
      }
      if (!c.storage) {
        var PREFIX = 'ub_ext_store:' + id + ':';
        c.storage = {
          local: {
            get: function (keys, cb) {
              var out = {};
              try {
                if (keys === null || keys === undefined) {
                  for (var i = 0; i < localStorage.length; i++) {
                    var k = localStorage.key(i);
                    if (k && k.indexOf(PREFIX) === 0) out[k.slice(PREFIX.length)] = JSON.parse(localStorage.getItem(k));
                  }
                } else if (typeof keys === 'string') {
                  var one = localStorage.getItem(PREFIX + keys);
                  if (one !== null) out[keys] = JSON.parse(one);
                } else if (Array.isArray(keys)) {
                  keys.forEach(function (k) {
                    var v = localStorage.getItem(PREFIX + k);
                    if (v !== null) out[k] = JSON.parse(v);
                  });
                } else {
                  Object.keys(keys).forEach(function (k) {
                    var v = localStorage.getItem(PREFIX + k);
                    out[k] = v !== null ? JSON.parse(v) : keys[k];
                  });
                }
              } catch (e) {}
              if (typeof cb === 'function') setTimeout(function () { cb(out); }, 0);
              return Promise.resolve(out);
            },
            set: function (items, cb) {
              try {
                Object.keys(items || {}).forEach(function (k) { localStorage.setItem(PREFIX + k, JSON.stringify(items[k])); });
              } catch (e) {}
              if (typeof cb === 'function') setTimeout(cb, 0);
            },
            remove: function (keys, cb) {
              try {
                (Array.isArray(keys) ? keys : [keys]).forEach(function (k) { localStorage.removeItem(PREFIX + k); });
              } catch (e) {}
              if (typeof cb === 'function') setTimeout(cb, 0);
            },
            clear: function (cb) {
              try {
                for (var i = localStorage.length - 1; i >= 0; i--) {
                  var k = localStorage.key(i);
                  if (k && k.indexOf(PREFIX) === 0) localStorage.removeItem(k);
                }
              } catch (e) {}
              if (typeof cb === 'function') setTimeout(cb, 0);
            }
          }
        };
      }
      if (!c.i18n) c.i18n = { getMessage: function () { return ''; }, getUILanguage: function () { return 'en'; } };
    } catch (e) {}
  }
  function readPackages(raw){
    try {
      if (window.top && window.top !== window && window.top.__ubExtPkgCache && window.top.__ubExtPkgCache.raw === raw) {
        return window.top.__ubExtPkgCache.list;
      }
    } catch (e) {}
    var list = [];
    try { list = JSON.parse(raw); } catch (e) { list = []; }
    if (!Array.isArray(list)) list = [];
    try { if (window.top) window.top.__ubExtPkgCache = { raw: raw, list: list }; } catch (e) {}
    return list;
  }

  var uaRaw = readKey(UA_KEY);
  if (uaRaw) {
    var prof = JSON.parse(uaRaw);
    if (prof && prof.ua) {
      var ua = String(prof.ua);
      var def = function (n, v) {
        try { Object.defineProperty(Navigator.prototype, n, { configurable: true, get: function () { return v; } }); } catch (e) {}
      };
      def('userAgent', ua);
      def('appVersion', ua.replace(/^Mozilla\//, ''));
      def('platform', prof.platform || '');
      def('vendor', (/Edg\//.test(ua) || /Chrome\//.test(ua)) ? 'Google Inc.' : (/Safari\//.test(ua) ? 'Apple Computer, Inc.' : ''));
      if (prof.uaData === null) def('userAgentData', undefined);
    }
  }

  var extRaw = readKey(EXT_KEY);
  if (extRaw) {
    var list = JSON.parse(extRaw);
    if (Array.isArray(list) && list.length) {
      var url = realUrl(), host = hostOf(url);
      for (var i = 0; i < list.length; i++) {
        var x = list[i];
        if (!x || !x.enabled || !x.code) continue;
        if (!matches(x.sites, url, host)) continue;
        try { new Function(x.code)(); } catch (e) {
          try { console.warn('[ub-ext] ' + (x.name || 'script') + ':', e && e.message); } catch (_) {}
        }
      }
    }
  }

  var pkgRaw = readKey(PKG_KEY);
  if (pkgRaw) {
    var pkgs = readPackages(pkgRaw);
    if (pkgs.length) {
      var url2 = realUrl(), host2 = hostOf(url2);
      var isTop = false;
      try { isTop = window.top === window; } catch (e) {}
      for (var p = 0; p < pkgs.length; p++) {
        var pk = pkgs[p];
        if (!pk || !pk.enabled || !Array.isArray(pk.blocks)) continue;
        for (var b = 0; b < pk.blocks.length; b++) {
          var blk = pk.blocks[b];
          if (!blk) continue;
          if (!blk.allFrames && !isTop) continue;
          if (!anyMatch(blk.matches || [], url2, host2)) continue;
          installChrome(pk);
          for (var ci = 0; ci < (blk.css || []).length; ci++) {
            try {
              var st = document.createElement('style');
              st.setAttribute('data-ub-ext', String(pk.name || 'ext'));
              st.textContent = blk.css[ci].code;
              (document.head || document.documentElement).appendChild(st);
            } catch (e) {}
          }
          for (var ji = 0; ji < (blk.js || []).length; ji++) {
            try { new Function(blk.js[ji].code)(); } catch (e) {
              try { console.warn('[ub-ext] ' + (pk.name || 'package') + ': ' + (blk.js[ji].path || '') , e && e.message); } catch (_) {}
            }
          }
        }
      }
    }
  }
} catch (e) {}})();
