parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"../node_modules/@directus/extension-toolkit/mixins/interface.js":[function(require,module,exports) {
module.exports={props:{id:{type:String,required:!0},name:{type:String,required:!0},value:{type:null,default:null},type:{type:String,required:!0},length:{type:[String,Number],default:null},readonly:{type:Boolean,default:!1},required:{type:Boolean,default:!1},options:{type:Object,default:()=>({})},newItem:{type:Boolean,default:!1},relation:{type:Object,default:null},fields:{type:Object,default:null},values:{type:Object,default:null}}};
},{}],"../../../cw90/corporate-website/source/directus/api/rest.php":[function(require,module,exports) {
module.exports="rest.927c3eb1.php";
},{}],"input.vue":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("@directus/extension-toolkit/mixins/interface")),o=t(require("C:/Users/hnguyen/Documents/WebsiteProjekt/cw90/corporate-website/source/directus/api/rest.php"));function t(e){return e&&e.__esModule?e:{default:e}}var n={mixins:[e.default],data:function(){return{collectionName:""}},mounted:function(){},updated:function(){},methods:{foo:function(){console.log("button")},emitValue:function(e){var o=e.target.value;this.$emit("input",o)}},computed:{callAPI:function(){var e=document.querySelectorAll('div[input-name="m2orepeater"]');console.log("m2oplace: "),console.log(e);var o=document.getElementsByClassName("content two-up");console.log("content2up: "),console.log(o);var t=o[0].firstElementChild;console.log("first child node: "),console.log(t);var n=t.querySelector(".value .no-wrap");console.log("val is: "),console.log(n),this.collectionName=n.innerHTML.toLowerCase().replace(/ /g,"_"),console.log(this.collectionName);console.log(this.collectionName);var l="http://localhost:2443/corporatesite/items/"+this.collectionName;console.log("full URL is: "),console.log(l);var c=[];return fetch(l).then(function(e){return e.json()}).then(function(e){console.log("inside fetch"),console.log(e),e.data.forEach(function(e){c.push(e.identifier)}),console.log("after push"),console.log(c)}).catch(function(e){console.error("Error:",e)}),null}}};exports.default=n;
(function(){var t,i=exports.default||module.exports;"function"==typeof i&&(i=i.options),Object.assign(i,((t=function(){var t=this.$createElement,i=this._self._c||t;return i("div",[i("div",[this._v(this._s(this.callAPI))]),this._v(" "),i("button",{on:{click:this.foo}},[this._v("foo")])])})._withStripped=!0,{render:t,staticRenderFns:[],_compiled:!0,_scopeId:"data-v-70248b",functional:void 0}));})();
},{"@directus/extension-toolkit/mixins/interface":"../node_modules/@directus/extension-toolkit/mixins/interface.js","C:/Users/hnguyen/Documents/WebsiteProjekt/cw90/corporate-website/source/directus/api/rest.php":"../../../cw90/corporate-website/source/directus/api/rest.php"}]},{},["input.vue"], "__DirectusExtension__")
//# sourceMappingURL=input.js.map