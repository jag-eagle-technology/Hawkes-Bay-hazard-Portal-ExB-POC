define(["jimu-core","jimu-ui","jimu-ui/advanced/setting-components","jimu-ui/advanced/style-setting-components","jimu-ui/basic/color-picker","jimu-ui/advanced/resource-selector"],(function(e,n,t,a,o,i){return function(e){var n={};function t(a){if(n[a])return n[a].exports;var o=n[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:a})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(t.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(a,o,function(n){return e[n]}.bind(null,o));return a},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=445)}({0:function(n,t){n.exports=e},1:function(e,t){e.exports=n},107:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),function(e){e.Icon="ICON",e.Vertical="VERTICAL",e.Horizontal="HORIZONTAL"}(n.MenuType||(n.MenuType={}))},108:function(e,n){e.exports='<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h12v12H0z"></path><path d="M.5 10h11a.5.5 0 110 1H.5a.5.5 0 110-1zm0-3h6a.5.5 0 010 1h-6a.5.5 0 010-1zm0-3h9a.5.5 0 010 1h-9a.5.5 0 010-1zm0-3h7a.5.5 0 010 1h-7a.5.5 0 010-1z" fill="#000" fill-rule="nonzero"></path></g></svg>'},109:function(e,n){e.exports='<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h12v12H0z"></path><path d="M11.5 10a.5.5 0 110 1H.5a.5.5 0 110-1h11zm-3-3a.5.5 0 010 1h-5a.5.5 0 010-1h5zm3-3a.5.5 0 110 1H.5a.5.5 0 010-1h11zm-3-3a.5.5 0 010 1h-5a.5.5 0 010-1h5z" fill="#000" fill-rule="nonzero"></path></g></svg>'},11:function(e,n){e.exports=o},110:function(e,n){e.exports='<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h12v12H0z"></path><path d="M11.5 10a.5.5 0 110 1H.5a.5.5 0 110-1h11zm0-3a.5.5 0 110 1h-6a.5.5 0 010-1h6zm0-3a.5.5 0 110 1h-9a.5.5 0 010-1h9zm0-3a.5.5 0 110 1h-7a.5.5 0 010-1h7z" fill="#000" fill-rule="nonzero"></path></g></svg>'},12:function(e,n){e.exports=i},3:function(e,n){e.exports=t},445:function(e,n,t){"use strict";var a=this&&this.__makeTemplateObject||function(e,n){return Object.defineProperty?Object.defineProperty(e,"raw",{value:n}):e.raw=n,e};Object.defineProperty(n,"__esModule",{value:!0});var o,i=t(0),r=t(3),l=t(107),u=t(1),s=t(12),c=t(7),d=t(11),p=t(446),v=t(447),f=i.ReactRedux.useSelector,g=t(108),h=t(109),m=t(110),x={svg:'<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="css-1i7frhi jimu-icon"><path d="M2 1a1 1 0 100 2h12a1 1 0 100-2H2zm0-1h12a2 2 0 010 4H2a2 2 0 010-4zm0 7a1 1 0 100 2h12a1 1 0 100-2H2zm0-1h12a2 2 0 010 4H2a2 2 0 010-4zm0 7a1 1 0 100 2h12a1 1 0 100-2H2zm0-1h12a2 2 0 010 4H2a2 2 0 010-4z" fill="currentColor" fill-rule="nonzero"></path></svg>',properties:{color:"#121212",size:20,inlineSvg:!0}},w=function(e){var n;return null===(n=null==e?void 0:e.components)||void 0===n?void 0:n.paper},j=i.css(o||(o=a(["\n  .style-setting--input-unit {\n    width: 50%;\n  }\n  .radio-container {\n    display: flex;\n    width: 100%;\n    margin-top: 0.5rem;\n    > span.jimu-radio {\n      flex-shrink: 0;\n      margin-top: 0.1rem;\n    }\n    > label {\n      margin-bottom: 0;\n    }\n  }\n"],["\n  .style-setting--input-unit {\n    width: 50%;\n  }\n  .radio-container {\n    display: flex;\n    width: 100%;\n    margin-top: 0.5rem;\n    > span.jimu-radio {\n      flex-shrink: 0;\n      margin-top: 0.1rem;\n    }\n    > label {\n      margin-bottom: 0;\n    }\n  }\n"])));n.default=function(e){var n,t,a,o=p.useTranslate(),y=p.useTranslate(v.default),b=f((function(e){var n;return null===(n=null==e?void 0:e.appContext)||void 0===n?void 0:n.isRTL})),M=f((function(e){var n;return null===(n=null==e?void 0:e.appStateInBuilder)||void 0===n?void 0:n.theme})),S=e.config,z=e.id,T=e.onSettingChange,C=S.vertical,R=S.type,I=S.menuStyle,k=S.variant,H=S.advanced,O=S.standard||{},_=O.anchor,P=O.textAlign,B=O.icon,N=O.submenuMode,V=O.gap,A=p.useMenuNavigationVariant("nav",I,H,k),L=H?null==S?void 0:S.paper:w(M),E="drawer"===R?l.MenuType.Icon:C?l.MenuType.Vertical:l.MenuType.Horizontal,U=function(e,n){T({id:z,config:Array.isArray(e)?S.setIn(e,n):S.set(e,n)})};return i.jsx("div",{css:j,className:"widget-setting-menu jimu-widget-setting"},i.jsx(r.SettingSection,null,i.jsx(r.SettingRow,{label:o("type")},i.jsx(u.Select,{value:E,onChange:function(e){var n=e.target.value,t=n===l.MenuType.Icon?"drawer":"nav",a=n===l.MenuType.Icon?"left":"",o=n!==l.MenuType.Horizontal,r=o?"foldable":"dropdown",u={icon:n===l.MenuType.Icon?i.Immutable(x):null,anchor:a,submenuMode:r,textAlign:"center",gap:"0px"},s=S.set("type",t).set("menuStyle","default").set("standard",u).set("advanced",!1).without("variant").without("paper").set("vertical",o);T({id:z,config:s})},style:{width:"50%"}},i.jsx("option",{value:l.MenuType.Icon},o("icon")),i.jsx("option",{value:l.MenuType.Vertical},o("vertical")),i.jsx("option",{value:l.MenuType.Horizontal},o("horizontal")))),"drawer"===R&&i.jsx(r.SettingRow,{label:o("location"),flow:"no-wrap"},i.jsx(u.Select,{style:{width:"50%"},value:_,onChange:function(e){return U(["standard","anchor"],e.target.value)}},i.jsx("option",{value:"left"},o("left")),i.jsx("option",{value:"right"},o("right")))),C&&i.jsx(r.SettingRow,{label:y("subMenuExpandMode"),flow:"wrap"},i.jsx(u.Select,{value:N,onChange:function(e){return U(["standard","submenuMode"],e.target.value)}},i.jsx("option",{value:"foldable"},o("foldable")),i.jsx("option",{value:"static"},o("expand")))),"drawer"===R&&i.jsx(i.React.Fragment,null,i.jsx(r.SettingRow,{label:o("icon"),flow:"no-wrap"},i.jsx(s.IconPicker,{hideRemove:!0,icon:B,previewOptions:{color:!0,size:!1},onChange:function(e){return U(["standard","icon"],e)}})),i.jsx(r.SettingRow,{label:o("iconSize"),flow:"no-wrap"},i.jsx(c.InputUnit,{value:(null!==(t=null===(n=null==B?void 0:B.properties)||void 0===n?void 0:n.size)&&void 0!==t?t:0)+"px",onChange:function(e){return U(["standard","icon","properties","size"],e.distance)}})))),i.jsx(r.SettingSection,{title:o("appearance")},i.jsx(r.SettingRow,{label:o("style"),flow:"wrap"},[{label:o("default"),value:"default"},{label:o("underline"),value:"underline"},{label:o("pills"),value:"pills"}].map((function(e,n){return i.jsx("div",{className:"radio-container",key:n},i.jsx(u.Radio,{id:"nav-style-type"+n,style:{cursor:"pointer"},name:"style-type",onChange:function(n){return function(e,n){if(e.currentTarget.checked){var t=S.set("menuStyle",n).set("advanced",!1).set("variant",null);T({id:z,config:t})}}(n,e.value)},checked:I===e.value}),i.jsx(u.Label,{style:{cursor:"pointer"},for:"nav-style-type"+n,className:"ml-2 text-break"},e.label))}))),i.jsx(r.SettingRow,{label:o("space"),flow:"no-wrap"},i.jsx(c.InputUnit,{value:V,onChange:function(e){return U(["standard","gap"],""+e.distance+e.unit)}})),i.jsx(r.SettingRow,{flow:"no-wrap",label:o("alignment")},i.jsx(u.ButtonGroup,null,i.jsx(u.Button,{title:o(b?"right":"left"),type:"secondary",icon:!0,size:"sm",active:"left"===P,onClick:function(){return U(["standard","textAlign"],"left")}},i.jsx(u.Icon,{icon:g})),i.jsx(u.Button,{title:o("center"),type:"secondary",icon:!0,size:"sm",active:"center"===P,onClick:function(){return U(["standard","textAlign"],"center")}},i.jsx(u.Icon,{icon:h})),i.jsx(u.Button,{title:o(b?"left":"right"),type:"secondary",icon:!0,size:"sm",active:"right"===P,onClick:function(){return U(["standard","textAlign"],"right")}},i.jsx(u.Icon,{icon:m}))))),i.jsx(r.SettingSection,null,i.jsx(r.SettingRow,{flow:"no-wrap",label:o("advance")},i.jsx(u.Switch,{checked:H,onChange:function(){var e=!(null==S?void 0:S.advanced),n=S.set("advanced",e);if(e){var t=p.getMenuNavigationVariant("nav",I),a=w(M);n=n.set("variant",t).set("paper",a)}else n=n.without("variant").without("paper");T({id:z,config:n})}})),H&&i.jsx(i.React.Fragment,null,"drawer"!==R&&i.jsx(r.SettingRow,{label:o("background"),flow:"no-wrap"},i.jsx(d.ThemeColorPicker,{specificTheme:M,value:null===(a=null==A?void 0:A.root)||void 0===a?void 0:a.bg,onChange:function(e){return U(["variant","root","bg"],e)}})),"drawer"===R&&i.jsx(r.SettingRow,{label:o("background"),flow:"no-wrap"},i.jsx(d.ThemeColorPicker,{specificTheme:M,value:null==L?void 0:L.bg,onChange:function(e){return U(["paper","bg"],e)}})),i.jsx(c.NavStyleSettingByState,{variant:A,onlyBorderColor:"underline"===I,text:!0,icon:!1,onChange:function(e,n,t){U(["variant","item",e,n],t)}}))))}},446:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t(0),o=t(1),i=a.React.useMemo;n.useTranslate=function(e){void 0===e&&(e=o.defaultMessages);var n=a.useIntl();return a.React.useCallback((function(t,a){return n.formatMessage({id:t,defaultMessage:e[t]},a)}),[n,e])},n.getMenuNavigationVariant=function(e,n){var t,o;return null===(o=null===(t=a.themeUtils.getThemeVariablesByCategory("navigation",!1).find((function(n){return n.component===e})))||void 0===t?void 0:t.styles)||void 0===o?void 0:o[n]},n.useMenuNavigationVariant=function(e,t,a,o){return i((function(){return a?o:n.getMenuNavigationVariant(e,t)}),[e,t,a,o])}},447:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={subMenuExpandMode:"Submenu expand mode",mainMenu:"Main menu",subMenu:"Submenu"}},7:function(e,n){e.exports=a}})}));