parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"../node_modules/@directus/extension-toolkit/mixins/interface.js":[function(require,module,exports) {
module.exports={props:{id:{type:String,required:!0},name:{type:String,required:!0},value:{type:null,default:null},type:{type:String,required:!0},length:{type:[String,Number],default:null},readonly:{type:Boolean,default:!1},required:{type:Boolean,default:!1},options:{type:Object,default:()=>({})},newItem:{type:Boolean,default:!1},relation:{type:Object,default:null},fields:{type:Object,default:null},values:{type:Object,default:null}}};
},{}],"input.vue":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=o(require("@directus/extension-toolkit/mixins/interface"));function o(e){return e&&e.__esModule?e:{default:e}}var t={mixins:[e.default],mounted:function(){var e=this,o=this._props.values;console.log(o);var t=document.querySelectorAll("[data-field]");console.log("fieldsnode: "),console.log(t);var l=document.querySelector("[data-field=type]"),n=document.querySelectorAll('div[input-name="m2orepeater"]');console.log("m2oplace: "),console.log(n);var s=document.getElementsByClassName("content two-up");console.log("content2up: "),console.log(s);var i=s.childNodes[0];console.log("first child node: "),console.log(i);var r=i.textContent;console.log("child node name: "),console.log(r);document.querySelector(".row-container");var c=this.getOptions();this.hideAll(t),this.showFields(c[o.type]),l&&l.addEventListener("change",function(o){var l=o.target.value;e.hideAll(t),e.showFields(c[l])})},updated:function(){},methods:{foo:function(){console.log("button")},emitValue:function(e){var o=e.target.value;this.$emit("input",o)}}};exports.default=t;
(function(){var t,e=exports.default||module.exports;"function"==typeof e&&(e=e.options),Object.assign(e,((t=function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("button",{on:{click:this.foo}},[this._v("foo")]),this._v(" "),e("div",{attrs:{id:"pare"}})])})._withStripped=!0,{render:t,staticRenderFns:[],_compiled:!0,_scopeId:"data-v-70248b",functional:void 0}));})();
},{"@directus/extension-toolkit/mixins/interface":"../node_modules/@directus/extension-toolkit/mixins/interface.js"}]},{},["input.vue"], "__DirectusExtension__")
//# sourceMappingURL=input.js.map