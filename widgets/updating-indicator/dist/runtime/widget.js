define(["jimu-arcgis","jimu-core","jimu-core/react"], function(__WEBPACK_EXTERNAL_MODULE_jimu_arcgis__, __WEBPACK_EXTERNAL_MODULE_jimu_core__, __WEBPACK_EXTERNAL_MODULE_react__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./your-extensions/widgets/updating-indicator/src/runtime/widget.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./your-extensions/widgets/updating-indicator/src/runtime/widget.tsx":
/*!***************************************************************************!*\
  !*** ./your-extensions/widgets/updating-indicator/src/runtime/widget.tsx ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar jimu_core_1 = __webpack_require__(/*! jimu-core */ \"jimu-core\");\r\nvar react_1 = __webpack_require__(/*! react */ \"react\");\r\nvar jimu_arcgis_1 = __webpack_require__(/*! jimu-arcgis */ \"jimu-arcgis\");\r\nvar WorkingIndicator = __webpack_require__(/*! ./working.svg */ \"./your-extensions/widgets/updating-indicator/src/runtime/working.svg\");\r\nfunction Widget(props) {\r\n    // const mapView = useRef<JimuMapView>();\r\n    var _a = react_1.useState(true), updating = _a[0], setUpdating = _a[1]; // wont update to false until watcher runs\r\n    var onViewsCreate = function (views) {\r\n        onActiveViewChange(views[0]);\r\n    };\r\n    var onActiveViewChange = function (jimuMapView) {\r\n        if (jimuMapView) {\r\n            jimuMapView.view.watch('updating', function (updating) {\r\n                setUpdating(updating);\r\n            });\r\n        }\r\n    };\r\n    return jimu_core_1.React.createElement(\"div\", { className: \"jimu-widget\" },\r\n        jimu_core_1.React.createElement(jimu_arcgis_1.JimuMapViewComponent, { useMapWidgetIds: props.useMapWidgetIds, onViewsCreate: onViewsCreate, onActiveViewChange: onActiveViewChange }),\r\n        props.useMapWidgetIds && updating && jimu_core_1.React.createElement(\"img\", { src: WorkingIndicator }),\r\n        !props.useMapWidgetIds && jimu_core_1.React.createElement(\"div\", { style: { background: \"white\" } }, \"Select Map\"));\r\n}\r\nexports.default = Widget;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy91cGRhdGluZy1pbmRpY2F0b3Ivc3JjL3J1bnRpbWUvd2lkZ2V0LnRzeC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3lvdXItZXh0ZW5zaW9ucy93aWRnZXRzL3VwZGF0aW5nLWluZGljYXRvci9zcmMvcnVudGltZS93aWRnZXQudHN4PzA1YWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBbGxXaWRnZXRQcm9wcywgUmVhY3R9IGZyb20gJ2ppbXUtY29yZSc7XG5pbXBvcnQge3VzZVN0YXRlLCB1c2VSZWYsIHVzZUVmZmVjdH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtKaW11TWFwVmlld0NvbXBvbmVudCwgSmltdU1hcFZpZXd9IGZyb20gJ2ppbXUtYXJjZ2lzJztcbmltcG9ydCB7SU1Db25maWd9IGZyb20gJy4uL2NvbmZpZyc7XG5jb25zdCBXb3JraW5nSW5kaWNhdG9yID0gcmVxdWlyZSgnLi93b3JraW5nLnN2ZycpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBXaWRnZXQocHJvcHM6IEFsbFdpZGdldFByb3BzPElNQ29uZmlnPil7XG4gICAgLy8gY29uc3QgbWFwVmlldyA9IHVzZVJlZjxKaW11TWFwVmlldz4oKTtcbiAgICBjb25zdCBbdXBkYXRpbmcsIHNldFVwZGF0aW5nXSA9IHVzZVN0YXRlKHRydWUpOyAvLyB3b250IHVwZGF0ZSB0byBmYWxzZSB1bnRpbCB3YXRjaGVyIHJ1bnNcbiAgICBjb25zdCBvblZpZXdzQ3JlYXRlID0gKHZpZXdzKSA9PiB7XG4gICAgICAgIG9uQWN0aXZlVmlld0NoYW5nZSh2aWV3c1swXSk7XG4gICAgfVxuICAgIGNvbnN0IG9uQWN0aXZlVmlld0NoYW5nZSA9IChqaW11TWFwVmlldzogSmltdU1hcFZpZXcpID0+IHtcbiAgICAgICAgaWYgKGppbXVNYXBWaWV3KSB7XG4gICAgICAgICAgICBqaW11TWFwVmlldy52aWV3LndhdGNoKCd1cGRhdGluZycsICh1cGRhdGluZykgPT4ge1xuICAgICAgICAgICAgICAgIHNldFVwZGF0aW5nKHVwZGF0aW5nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImppbXUtd2lkZ2V0XCI+XG4gICAgICAgIDxKaW11TWFwVmlld0NvbXBvbmVudCB1c2VNYXBXaWRnZXRJZHM9e3Byb3BzLnVzZU1hcFdpZGdldElkc30gb25WaWV3c0NyZWF0ZT17b25WaWV3c0NyZWF0ZX0gb25BY3RpdmVWaWV3Q2hhbmdlPXtvbkFjdGl2ZVZpZXdDaGFuZ2V9IC8+XG4gICAgICAgIHtwcm9wcy51c2VNYXBXaWRnZXRJZHMgJiYgdXBkYXRpbmcgJiYgPGltZyBzcmM9e1dvcmtpbmdJbmRpY2F0b3J9IC8+fVxuICAgICAgICB7IXByb3BzLnVzZU1hcFdpZGdldElkcyAmJiA8ZGl2IHN0eWxlPXt7YmFja2dyb3VuZDogXCJ3aGl0ZVwifX0+U2VsZWN0IE1hcDwvZGl2Pn1cbiAgICA8L2Rpdj47XG59XG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFsQkE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./your-extensions/widgets/updating-indicator/src/runtime/widget.tsx\n");

/***/ }),

/***/ "./your-extensions/widgets/updating-indicator/src/runtime/working.svg":
/*!****************************************************************************!*\
  !*** ./your-extensions/widgets/updating-indicator/src/runtime/working.svg ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvOyIgd2lkdGg9IjQ0cHgiIGhlaWdodD0iNDRweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIj4KPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMzIiIHN0cm9rZS13aWR0aD0iMTQiIHN0cm9rZT0iIzBhNjlhYSIgc3Ryb2tlLWRhc2hhcnJheT0iNTAuMjY1NDgyNDU3NDM2NjkgNTAuMjY1NDgyNDU3NDM2NjkiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+CiAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiBrZXlUaW1lcz0iMDsxIiB2YWx1ZXM9IjAgNTAgNTA7MzYwIDUwIDUwIj48L2FuaW1hdGVUcmFuc2Zvcm0+CjwvY2lyY2xlPgo8L3N2Zz4=\"//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy91cGRhdGluZy1pbmRpY2F0b3Ivc3JjL3J1bnRpbWUvd29ya2luZy5zdmcuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi95b3VyLWV4dGVuc2lvbnMvd2lkZ2V0cy91cGRhdGluZy1pbmRpY2F0b3Ivc3JjL3J1bnRpbWUvd29ya2luZy5zdmc/NDliZSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJsYm1OdlpHbHVaejBpZFhSbUxUZ2lQejRLUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIaHRiRzV6T25oc2FXNXJQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUwzaHNhVzVySWlCemRIbHNaVDBpYldGeVoybHVPaUJoZFhSdk95QmthWE53YkdGNU9pQmliRzlqYXpzZ2MyaGhjR1V0Y21WdVpHVnlhVzVuT2lCaGRYUnZPeUlnZDJsa2RHZzlJalEwY0hnaUlHaGxhV2RvZEQwaU5EUndlQ0lnZG1sbGQwSnZlRDBpTUNBd0lERXdNQ0F4TURBaUlIQnlaWE5sY25abFFYTndaV04wVW1GMGFXODlJbmhOYVdSWlRXbGtJajRLUEdOcGNtTnNaU0JqZUQwaU5UQWlJR041UFNJMU1DSWdjajBpTXpJaUlITjBjbTlyWlMxM2FXUjBhRDBpTVRRaUlITjBjbTlyWlQwaUl6QmhOamxoWVNJZ2MzUnliMnRsTFdSaGMyaGhjbkpoZVQwaU5UQXVNalkxTkRneU5EVTNORE0yTmprZ05UQXVNalkxTkRneU5EVTNORE0yTmpraUlHWnBiR3c5SW01dmJtVWlJSE4wY205clpTMXNhVzVsWTJGd1BTSnliM1Z1WkNJK0NpQWdQR0Z1YVcxaGRHVlVjbUZ1YzJadmNtMGdZWFIwY21saWRYUmxUbUZ0WlQwaWRISmhibk5tYjNKdElpQjBlWEJsUFNKeWIzUmhkR1VpSUhKbGNHVmhkRU52ZFc1MFBTSnBibVJsWm1sdWFYUmxJaUJrZFhJOUlqRnpJaUJyWlhsVWFXMWxjejBpTURzeElpQjJZV3gxWlhNOUlqQWdOVEFnTlRBN016WXdJRFV3SURVd0lqNDhMMkZ1YVcxaGRHVlVjbUZ1YzJadmNtMCtDand2WTJseVkyeGxQZ284TDNOMlp6ND1cIiJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./your-extensions/widgets/updating-indicator/src/runtime/working.svg\n");

/***/ }),

/***/ "jimu-arcgis":
/*!******************************!*\
  !*** external "jimu-arcgis" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_arcgis__;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamltdS1hcmNnaXMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqaW11LWFyY2dpc1wiPzlmMWMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2ppbXVfYXJjZ2lzX187Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///jimu-arcgis\n");

/***/ }),

/***/ "jimu-core":
/*!****************************!*\
  !*** external "jimu-core" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_core__;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamltdS1jb3JlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiamltdS1jb3JlXCI/YzY5NSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfamltdV9jb3JlX187Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///jimu-core\n");

/***/ }),

/***/ "react":
/*!**********************************!*\
  !*** external "jimu-core/react" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqaW11LWNvcmUvcmVhY3RcIj80ZjdmIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yZWFjdF9fOyJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///react\n");

/***/ })

/******/ })});;