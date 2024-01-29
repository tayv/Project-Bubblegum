/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-url";
exports.ids = ["vendor-chunks/is-url"];
exports.modules = {

/***/ "(ssr)/../../node_modules/is-url/index.js":
/*!******************************************!*\
  !*** ../../node_modules/is-url/index.js ***!
  \******************************************/
/***/ ((module) => {

eval("\n/**\n * Expose `isUrl`.\n */\n\nmodule.exports = isUrl;\n\n/**\n * RegExps.\n * A URL must match #1 and then at least one of #2/#3.\n * Use two levels of REs to avoid REDOS.\n */\n\nvar protocolAndDomainRE = /^(?:\\w+:)?\\/\\/(\\S+)$/;\n\nvar localhostDomainRE = /^localhost[\\:?\\d]*(?:[^\\:?\\d]\\S*)?$/\nvar nonLocalhostDomainRE = /^[^\\s\\.]+\\.\\S{2,}$/;\n\n/**\n * Loosely validate a URL `string`.\n *\n * @param {String} string\n * @return {Boolean}\n */\n\nfunction isUrl(string){\n  if (typeof string !== 'string') {\n    return false;\n  }\n\n  var match = string.match(protocolAndDomainRE);\n  if (!match) {\n    return false;\n  }\n\n  var everythingAfterProtocol = match[1];\n  if (!everythingAfterProtocol) {\n    return false;\n  }\n\n  if (localhostDomainRE.test(everythingAfterProtocol) ||\n      nonLocalhostDomainRE.test(everythingAfterProtocol)) {\n    return true;\n  }\n\n  return false;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vbm9kZV9tb2R1bGVzL2lzLXVybC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSwwQ0FBMEMsR0FBRzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYnViYmxlZ3VtLy4uLy4uL25vZGVfbW9kdWxlcy9pcy11cmwvaW5kZXguanM/Y2ZmOSJdLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKlxuICogRXhwb3NlIGBpc1VybGAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBpc1VybDtcblxuLyoqXG4gKiBSZWdFeHBzLlxuICogQSBVUkwgbXVzdCBtYXRjaCAjMSBhbmQgdGhlbiBhdCBsZWFzdCBvbmUgb2YgIzIvIzMuXG4gKiBVc2UgdHdvIGxldmVscyBvZiBSRXMgdG8gYXZvaWQgUkVET1MuXG4gKi9cblxudmFyIHByb3RvY29sQW5kRG9tYWluUkUgPSAvXig/Olxcdys6KT9cXC9cXC8oXFxTKykkLztcblxudmFyIGxvY2FsaG9zdERvbWFpblJFID0gL15sb2NhbGhvc3RbXFw6P1xcZF0qKD86W15cXDo/XFxkXVxcUyopPyQvXG52YXIgbm9uTG9jYWxob3N0RG9tYWluUkUgPSAvXlteXFxzXFwuXStcXC5cXFN7Mix9JC87XG5cbi8qKlxuICogTG9vc2VseSB2YWxpZGF0ZSBhIFVSTCBgc3RyaW5nYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbmZ1bmN0aW9uIGlzVXJsKHN0cmluZyl7XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBtYXRjaCA9IHN0cmluZy5tYXRjaChwcm90b2NvbEFuZERvbWFpblJFKTtcbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBldmVyeXRoaW5nQWZ0ZXJQcm90b2NvbCA9IG1hdGNoWzFdO1xuICBpZiAoIWV2ZXJ5dGhpbmdBZnRlclByb3RvY29sKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGxvY2FsaG9zdERvbWFpblJFLnRlc3QoZXZlcnl0aGluZ0FmdGVyUHJvdG9jb2wpIHx8XG4gICAgICBub25Mb2NhbGhvc3REb21haW5SRS50ZXN0KGV2ZXJ5dGhpbmdBZnRlclByb3RvY29sKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/../../node_modules/is-url/index.js\n");

/***/ })

};
;