parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"../node_modules/@directus/extension-toolkit/mixins/interface.js":[function(require,module,exports) {
module.exports={props:{id:{type:String,required:!0},name:{type:String,required:!0},value:{type:null,default:null},type:{type:String,required:!0},length:{type:[String,Number],default:null},readonly:{type:Boolean,default:!1},required:{type:Boolean,default:!1},options:{type:Object,default:()=>({})},newItem:{type:Boolean,default:!1},relation:{type:Object,default:null},fields:{type:Object,default:null},values:{type:Object,default:null}}};
},{}],"input.vue":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var o=e(require("@directus/extension-toolkit/mixins/interface"));function e(o){return o&&o.__esModule?o:{default:o}}var t={mixins:[o.default],data:function(){return{collectionName:"",options:[],selectedvalue:""}},created:function(){this.options=this.callAPI},mounted:function(){},updated:function(){},methods:{},computed:{callAPI:function(){this.findCollectionValue();var o=this.findURL(),e=[];return fetch(o).then(function(o){return o.json()}).then(function(o){console.log("inside fetch"),console.log(o),o.data.forEach(function(o){e.push(o.identifier)}),console.log("after push"),console.log(e)}).catch(function(o){console.error("Error:",o)}),e},debouncedQuery:_.debounce(function(){this.query()},300),foo:function(o){console.log("button"),console.log(o)},findCollectionValue:function(){var o=document.querySelectorAll('div[input-name="m2orepeater"]');console.log("m2oplace: "),console.log(o);var e=document.getElementsByClassName("content two-up");console.log("content2up: "),console.log(e);var t=e[0].firstElementChild;console.log("first child node: "),console.log(t);var n=t.querySelector(".value .no-wrap");return console.log("val is: "),console.log(n),this.collectionName=n.innerHTML.toLowerCase().replace(/ /g,"_"),console.log(this.collectionName),this.collectionName},findURL:function(){console.log(this.collectionName);var o="http://localhost:2443/corporatesite/items/"+this.collectionName;return console.log("full URL is: "),console.log(o),o},emitValue:function(o){console.log("event"),console.log(o),console.log("target: "),console.log(o.target),console.log("value"),console.log(o.target.value)}},watch:{}};exports.default=t;
(function(){var e,t=exports.default||module.exports;"function"==typeof t&&(t=t.options),Object.assign(t,((e=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"app"}},[o("v-select",{attrs:{options:e.options,value:e.selectedvalue},on:{input:e.emitValue}}),e._v(" "),o("div",[e._v(e._s(e.selectedvalue))]),e._v(" "),o("button",{on:{click:e.foo}},[e._v("foo")])],1)})._withStripped=!0,{render:e,staticRenderFns:[],_compiled:!0,_scopeId:"data-v-70248b",functional:void 0}));})();
},{"@directus/extension-toolkit/mixins/interface":"../node_modules/@directus/extension-toolkit/mixins/interface.js"}]},{},["input.vue"], "__DirectusExtension__")
//# sourceMappingURL=input.js.map