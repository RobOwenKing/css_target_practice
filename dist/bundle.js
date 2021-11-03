/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/editor.js":
/*!***********************!*\
  !*** ./src/editor.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"updateOutput\": () => (/* binding */ updateOutput),\n/* harmony export */   \"initInput\": () => (/* binding */ initInput)\n/* harmony export */ });\nconst onMessage = () => {\n  return `window.addEventListener('message', (event) => {\n            const newStyle = document.createElement('style');\n            newStyle.textContent = event.data;\n            document.head.append(newStyle);\n\n            const styleTags = document.querySelectorAll('style');\n            styleTags[0].parentNode.removeChild(styleTags[0]);\n        }\n      )`;\n};\n\n/* https://stackoverflow.com/a/61421435 */\nconst updateOutput = (iframe, css, html) => {\n  const iframeHTML = `\n    <!doctype html>\n    <html>\n      <head>\n        <style>${css}</style>\n        <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">\n      </head>\n      <body>\n        ${html}\n        <script>\n          ${onMessage()}\n        </script>\n      </body>\n    </html>`;\n  iframe.src = 'data:text/html,' + encodeURIComponent(iframeHTML);\n};\n\nconst initInput = (UI, CHALLENGE) => {\n  UI.inputTextarea.addEventListener('input', (event) => {\n    let userCSS = UI.inputTextarea.value;\n\n    // Fixing bug with scrolling aligning (pre/code otherwise ignore empty final new lines)\n    if (userCSS[userCSS.length-1] == \"\\n\") {\n      userCSS += \" \";\n    }\n\n    UI.inputCode.innerHTML = Prism.highlight(userCSS, Prism.languages.css, 'css');\n\n    UI.outputUser.contentWindow.postMessage(userCSS, \"*\");\n  });\n\n  UI.inputTextarea.addEventListener('scroll', (event) => {\n    UI.inputPre.scrollTop  = UI.inputTextarea.scrollTop;\n    UI.inputPre.scrollLeft = UI.inputTextarea.scrollLeft;\n  });\n};\n\n\n//# sourceURL=webpack://css_target_practice/./src/editor.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _editor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.js */ \"./src/editor.js\");\n/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu.js */ \"./src/menu.js\");\n/* harmony import */ var _resize_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resize.js */ \"./src/resize.js\");\n/* harmony import */ var _tabs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tabs.js */ \"./src/tabs.js\");\n\n\n\n\n\nconst UI = {\n  header: document.querySelector('header'),\n  h1: document.querySelector('h1'),\n\n  menuDiv: document.getElementById('menu'),\n  loading: document.getElementById('loading'),\n  loadError: document.getElementById('load-error'),\n  challengeForm: document.getElementById('challenge-form'),\n  challengeSelect: document.getElementById('challenge-select'),\n\n  challengeDiv: document.getElementById('challenge'),\n  htmlCode: document.getElementById('html-code'),\n  inputTextarea: document.getElementById('input-textarea'),\n  inputPre: document.getElementById('input-pre'),\n  inputCode: document.getElementById('input-code'),\n\n  outputTarget: document.getElementById('output-target'),\n  outputUser: document.getElementById('output-user')\n};\n\nconst CHALLENGE = {};\n\n/*\n * Adds input listener to inputTextarea to update outputUser\n * Adds scroll listener to inputTextarea to line up inputCode and inputPre\n*/\n(0,_editor_js__WEBPACK_IMPORTED_MODULE_0__.initInput)(UI, CHALLENGE);\n/*\n * Populates the <select> with <option>s based on the API\n   and adds an Event listener to display chosen challenge\n*/\n(0,_menu_js__WEBPACK_IMPORTED_MODULE_1__.initMenu)(UI, CHALLENGE);\n/*\n * Adds an Event listener to allow users to adjust\n   the relative widths of the input and output\n*/\n(0,_resize_js__WEBPACK_IMPORTED_MODULE_2__.initResizeable)();\n/*\n * Add Event listeners so users can change input/output displays\n   eg: switch from seeing html-code to input-code\n*/\n(0,_tabs_js__WEBPACK_IMPORTED_MODULE_3__.initTabs)();\n\n\n//# sourceURL=webpack://css_target_practice/./src/index.js?");

/***/ }),

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initMenu\": () => (/* binding */ initMenu)\n/* harmony export */ });\n/* harmony import */ var _editor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.js */ \"./src/editor.js\");\n\n\nconst loadChallenges = async () => {\n  const response = await fetch('http://localhost:3000/challenges');\n  const data = await response.json();\n\n  return data;\n};\n\nconst onLoadFail = (UI) => {\n  UI.loading.classList.remove('display-block');\n  UI.challengeForm.classList.remove('display-block');\n\n  UI.loadError.classList.add('display-block');\n};\n\nconst buildMenu = (data, UI) => {\n  data.forEach((challenge) => {\n    UI.challengeSelect.insertAdjacentHTML('beforeend', `<option value=${challenge.id}>${challenge.name}</option>`);\n  })\n\n  UI.loading.classList.remove('display-block');\n  UI.challengeForm.classList.add('display-block');\n};\n\nconst populateMenu = async (UI) => {\n  let data = [];\n\n  try {\n    data = await loadChallenges();\n  } catch(e) {\n    onLoadFail(UI);\n    return;\n  }\n\n  buildMenu(data, UI);\n};\n\n/**\n * Retrieves the challenge selected by the user\n * @see onFormSubmit()\n*/\nconst loadChallenge = async (UI) => {\n  const response = await fetch(`http://localhost:3000/challenges/${UI.challengeSelect.value}`);\n  const data = await response.json();\n\n  return data;\n};\n\nconst setupChallenge = (newChallenge, UI, CHALLENGE) => {\n  CHALLENGE.html = newChallenge.html;\n  CHALLENGE.css = newChallenge.css;\n\n  UI.htmlCode.innerHTML = Prism.highlight(CHALLENGE.html, Prism.languages.html, 'html');\n\n  UI.inputTextarea.value = '';\n  UI.inputCode.innerHTML = '';\n\n  (0,_editor_js__WEBPACK_IMPORTED_MODULE_0__.updateOutput)(UI.outputTarget, CHALLENGE.css, CHALLENGE.html);\n  (0,_editor_js__WEBPACK_IMPORTED_MODULE_0__.updateOutput)(UI.outputUser, ' ', CHALLENGE.html);\n};\n\nconst displayChallenge = (UI) => {\n  UI.header.classList.add('challenge');\n\n  UI.menuDiv.classList.remove('display-flex');\n  UI.challengeDiv.classList.add('display-flex');\n};\n\n/**\n * @param {Event} event - The submit event from addEventListener\n*/\nconst onFormSubmit = async (UI, CHALLENGE, event) => {\n  // Need to prevent default form submission behaviour\n  event.preventDefault();\n\n  let newChallenge;\n  try {\n    newChallenge = await loadChallenge(UI);\n  } catch(e) {\n    onLoadFail(UI);\n    return;\n  }\n\n  setupChallenge(newChallenge, UI, CHALLENGE);\n  displayChallenge(UI);\n};\n\nconst resetTabsDisplayed = () => {\n  const event = new MouseEvent('click', {\n    view: window,\n    bubbles: true,\n    cancelable: true\n  });\n\n  document.querySelector('[data-tab-target=\"#challenge-html\"]').dispatchEvent(event);\n  document.querySelector('[data-tab-target=\"#output-target\"]').dispatchEvent(event);\n};\n\nconst onH1Click = (UI) => {\n  UI.header.classList.remove('challenge');\n\n  UI.menuDiv.classList.add('display-flex');\n  UI.challengeDiv.classList.remove('display-flex');\n\n  resetTabsDisplayed();\n};\n\nconst initMenu = (UI, CHALLENGE) => {\n  populateMenu(UI);\n  UI.challengeForm.addEventListener('submit', onFormSubmit.bind(null, UI, CHALLENGE));\n  UI.h1.addEventListener('click', onH1Click.bind(null, UI));\n};\n\n\n//# sourceURL=webpack://css_target_practice/./src/menu.js?");

/***/ }),

/***/ "./src/resize.js":
/*!***********************!*\
  !*** ./src/resize.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initResizeable\": () => (/* binding */ initResizeable)\n/* harmony export */ });\n// Adapted from https://htmldom.dev/create-resizable-split-views/\n\nconst resizer   = document.getElementById('resizer');\nconst leftSide  = document.getElementById('input');\nconst rightSide = document.getElementById('output');\n\n// These are for the position of the mouse\nlet x = 0;\nlet y = 0;\n\nlet leftWidth = 0;\n\nconst mouseMoveHandler = e => {\n  // How far the mouse has been moved\n  const dx = e.clientX - x;\n  const dy = e.clientY - y;\n\n  const newResizerLeft = resizer.offsetLeft + dx;\n  resizer.style.left = `${newResizerLeft}px`;\n\n  const newLeftWidth = newResizerLeft * 100 / resizer.parentNode.getBoundingClientRect().width;\n  leftWidth = newLeftWidth;\n  leftSide.style.width = `${newLeftWidth}%`;\n\n  leftSide.style.userSelect = 'none';\n  leftSide.style.pointerEvents = 'none';\n\n  rightSide.style.userSelect = 'none';\n  rightSide.style.pointerEvents = 'none';\n\n  resizer.style.cursor = 'col-resize';\n  document.body.style.cursor = 'col-resize';\n\n  x = e.clientX;\n  y = e.clientY;\n};\n\nconst mouseUpHandler = () => {\n  resizer.style.removeProperty('cursor');\n  document.body.style.removeProperty('cursor');\n\n  leftSide.style.removeProperty('user-select');\n  leftSide.style.removeProperty('pointer-events');\n\n  rightSide.style.removeProperty('user-select');\n  rightSide.style.removeProperty('pointer-events');\n\n  // Remove the handlers of `mousemove` and `mouseup`\n  document.removeEventListener('mousemove', mouseMoveHandler);\n  document.removeEventListener('mouseup', mouseUpHandler);\n};\n\nconst mouseDownHandler = e => {\n  // Get the current mouse position\n  x = e.clientX;\n  y = e.clientY;\n  leftWidth = leftSide.getBoundingClientRect().width;\n\n  document.addEventListener('mousemove', mouseMoveHandler);\n  document.addEventListener('mouseup', mouseUpHandler);\n};\n\n// Wrap the addEventListener in a function so we can call it from ./index.js\nconst initResizeable = () => {\n  resizer.addEventListener('mousedown', mouseDownHandler);\n}\n\n\n//# sourceURL=webpack://css_target_practice/./src/resize.js?");

/***/ }),

/***/ "./src/tabs.js":
/*!*********************!*\
  !*** ./src/tabs.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initTabs\": () => (/* binding */ initTabs)\n/* harmony export */ });\n/* Based on method used in https://www.youtube.com/watch?v=5L6h_MrNvsk by Web Dev Simplified */\nconst tabs = document.querySelectorAll('[data-tab-target]');\n\nconst onClick = (event) => {\n  const target = event.target;\n\n  // Hide currently displayed content\n  const oldContent = document.querySelector(`${target.dataset.tabType} .display-block`);\n  if (oldContent) { oldContent.classList.remove('display-block'); }\n\n  // Display desired content\n  const newContent = document.querySelector(target.dataset.tabTarget);\n  newContent.classList.add('display-block');\n\n  // Remove active styling from link for previous content\n  const oldTab = document.querySelector(`${target.dataset.tabType} .active-tab`);\n  if (oldTab) { oldTab.classList.remove('active-tab'); }\n\n  // Add active styling to link for desired content\n  target.classList.add('active-tab');\n};\n\nconst initTabs = () => {\n  tabs.forEach(tab => { tab.addEventListener('click', onClick); })\n};\n\n\n//# sourceURL=webpack://css_target_practice/./src/tabs.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;