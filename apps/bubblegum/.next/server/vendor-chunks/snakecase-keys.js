"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/snakecase-keys";
exports.ids = ["vendor-chunks/snakecase-keys"];
exports.modules = {

/***/ "(rsc)/../../node_modules/snakecase-keys/index.js":
/*!**************************************************!*\
  !*** ../../node_modules/snakecase-keys/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst map = __webpack_require__(/*! map-obj */ \"(rsc)/../../node_modules/map-obj/index.js\");\nconst { snakeCase } = __webpack_require__(/*! snake-case */ \"(rsc)/../../node_modules/snake-case/dist/index.js\");\nmodule.exports = function(obj, options) {\n    options = Object.assign({\n        deep: true,\n        exclude: [],\n        parsingOptions: {}\n    }, options);\n    return map(obj, function(key, val) {\n        return [\n            matches(options.exclude, key) ? key : snakeCase(key, options.parsingOptions),\n            val\n        ];\n    }, options);\n};\nfunction matches(patterns, value) {\n    return patterns.some(function(pattern) {\n        return typeof pattern === \"string\" ? pattern === value : pattern.test(value);\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzL3NuYWtlY2FzZS1rZXlzL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBRUEsTUFBTUEsTUFBTUMsbUJBQU9BLENBQUM7QUFDcEIsTUFBTSxFQUFFQyxTQUFTLEVBQUUsR0FBR0QsbUJBQU9BLENBQUM7QUFFOUJFLE9BQU9DLE9BQU8sR0FBRyxTQUFVQyxHQUFHLEVBQUVDLE9BQU87SUFDckNBLFVBQVVDLE9BQU9DLE1BQU0sQ0FBQztRQUFFQyxNQUFNO1FBQU1DLFNBQVMsRUFBRTtRQUFFQyxnQkFBZ0IsQ0FBQztJQUFFLEdBQUdMO0lBRXpFLE9BQU9OLElBQUlLLEtBQUssU0FBVU8sR0FBRyxFQUFFQyxHQUFHO1FBQ2hDLE9BQU87WUFDTEMsUUFBUVIsUUFBUUksT0FBTyxFQUFFRSxPQUFPQSxNQUFNVixVQUFVVSxLQUFLTixRQUFRSyxjQUFjO1lBQzNFRTtTQUNEO0lBQ0gsR0FBR1A7QUFDTDtBQUVBLFNBQVNRLFFBQVNDLFFBQVEsRUFBRUMsS0FBSztJQUMvQixPQUFPRCxTQUFTRSxJQUFJLENBQUMsU0FBVUMsT0FBTztRQUNwQyxPQUFPLE9BQU9BLFlBQVksV0FDdEJBLFlBQVlGLFFBQ1pFLFFBQVFDLElBQUksQ0FBQ0g7SUFDbkI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2J1YmJsZWd1bS8uLi8uLi9ub2RlX21vZHVsZXMvc25ha2VjYXNlLWtleXMvaW5kZXguanM/MjBkOCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuY29uc3QgbWFwID0gcmVxdWlyZSgnbWFwLW9iaicpXG5jb25zdCB7IHNuYWtlQ2FzZSB9ID0gcmVxdWlyZSgnc25ha2UtY2FzZScpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaiwgb3B0aW9ucykge1xuICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7IGRlZXA6IHRydWUsIGV4Y2x1ZGU6IFtdLCBwYXJzaW5nT3B0aW9uczoge30gfSwgb3B0aW9ucylcblxuICByZXR1cm4gbWFwKG9iaiwgZnVuY3Rpb24gKGtleSwgdmFsKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIG1hdGNoZXMob3B0aW9ucy5leGNsdWRlLCBrZXkpID8ga2V5IDogc25ha2VDYXNlKGtleSwgb3B0aW9ucy5wYXJzaW5nT3B0aW9ucyksXG4gICAgICB2YWxcbiAgICBdXG4gIH0sIG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIG1hdGNoZXMgKHBhdHRlcm5zLCB2YWx1ZSkge1xuICByZXR1cm4gcGF0dGVybnMuc29tZShmdW5jdGlvbiAocGF0dGVybikge1xuICAgIHJldHVybiB0eXBlb2YgcGF0dGVybiA9PT0gJ3N0cmluZydcbiAgICAgID8gcGF0dGVybiA9PT0gdmFsdWVcbiAgICAgIDogcGF0dGVybi50ZXN0KHZhbHVlKVxuICB9KVxufVxuIl0sIm5hbWVzIjpbIm1hcCIsInJlcXVpcmUiLCJzbmFrZUNhc2UiLCJtb2R1bGUiLCJleHBvcnRzIiwib2JqIiwib3B0aW9ucyIsIk9iamVjdCIsImFzc2lnbiIsImRlZXAiLCJleGNsdWRlIiwicGFyc2luZ09wdGlvbnMiLCJrZXkiLCJ2YWwiLCJtYXRjaGVzIiwicGF0dGVybnMiLCJ2YWx1ZSIsInNvbWUiLCJwYXR0ZXJuIiwidGVzdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/snakecase-keys/index.js\n");

/***/ }),

/***/ "(ssr)/../../node_modules/snakecase-keys/index.js":
/*!**************************************************!*\
  !*** ../../node_modules/snakecase-keys/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nconst map = __webpack_require__(/*! map-obj */ \"(ssr)/../../node_modules/map-obj/index.js\")\nconst { snakeCase } = __webpack_require__(/*! snake-case */ \"(ssr)/../../node_modules/snake-case/dist/index.js\")\n\nmodule.exports = function (obj, options) {\n  options = Object.assign({ deep: true, exclude: [], parsingOptions: {} }, options)\n\n  return map(obj, function (key, val) {\n    return [\n      matches(options.exclude, key) ? key : snakeCase(key, options.parsingOptions),\n      val\n    ]\n  }, options)\n}\n\nfunction matches (patterns, value) {\n  return patterns.some(function (pattern) {\n    return typeof pattern === 'string'\n      ? pattern === value\n      : pattern.test(value)\n  })\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vbm9kZV9tb2R1bGVzL3NuYWtlY2FzZS1rZXlzL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFZOztBQUVaLFlBQVksbUJBQU8sQ0FBQywwREFBUztBQUM3QixRQUFRLFlBQVksRUFBRSxtQkFBTyxDQUFDLHFFQUFZOztBQUUxQztBQUNBLDRCQUE0Qiw2Q0FBNkM7O0FBRXpFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCIsInNvdXJjZXMiOlsid2VicGFjazovL2J1YmJsZWd1bS8uLi8uLi9ub2RlX21vZHVsZXMvc25ha2VjYXNlLWtleXMvaW5kZXguanM/MGE1NSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuY29uc3QgbWFwID0gcmVxdWlyZSgnbWFwLW9iaicpXG5jb25zdCB7IHNuYWtlQ2FzZSB9ID0gcmVxdWlyZSgnc25ha2UtY2FzZScpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaiwgb3B0aW9ucykge1xuICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7IGRlZXA6IHRydWUsIGV4Y2x1ZGU6IFtdLCBwYXJzaW5nT3B0aW9uczoge30gfSwgb3B0aW9ucylcblxuICByZXR1cm4gbWFwKG9iaiwgZnVuY3Rpb24gKGtleSwgdmFsKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIG1hdGNoZXMob3B0aW9ucy5leGNsdWRlLCBrZXkpID8ga2V5IDogc25ha2VDYXNlKGtleSwgb3B0aW9ucy5wYXJzaW5nT3B0aW9ucyksXG4gICAgICB2YWxcbiAgICBdXG4gIH0sIG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIG1hdGNoZXMgKHBhdHRlcm5zLCB2YWx1ZSkge1xuICByZXR1cm4gcGF0dGVybnMuc29tZShmdW5jdGlvbiAocGF0dGVybikge1xuICAgIHJldHVybiB0eXBlb2YgcGF0dGVybiA9PT0gJ3N0cmluZydcbiAgICAgID8gcGF0dGVybiA9PT0gdmFsdWVcbiAgICAgIDogcGF0dGVybi50ZXN0KHZhbHVlKVxuICB9KVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/../../node_modules/snakecase-keys/index.js\n");

/***/ })

};
;