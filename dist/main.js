/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ GhostBlasters\n/* harmony export */ });\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n/* harmony import */ var _shooter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shooter */ \"./src/shooter.js\");\n\n// import Ghost from \"./ghost\";\n\n// import '../stylesheets'\n\nclass GhostBlasters {\n    constructor(canvas) {\n        this.ctx = canvas.getContext(\"2d\");\n        this.dimensions = { width: canvas.width, height: canvas.height };\n        // this.running = false;\n        this.registerEvents();\n        this.restart();\n    }\n    \n    registerEvents() {\n        this.boundClickHandler = this.click.bind(this);\n        document.addEventListener(\"keydown\", this.boundClickHandler);\n    }\n\n    restart() {\n        this.running = false;\n        this.level = new _level__WEBPACK_IMPORTED_MODULE_0__.default(this.dimensions);\n        this.shooter = new _shooter__WEBPACK_IMPORTED_MODULE_1__.default (this.dimensions);\n        this.animate(); \n        this.howToPlay();\n        this.instructions();\n        this.highScore();\n        this.startGame();\n    }\n\n    play() {\n       this.running = true;\n       this.animate(); \n    }\n\n\n    click(e) {\n        if (!this.running) {\n            this.play();\n        }\n\n            this.level.moveHouse();\n        \n        \n    }\n\n    startGame() {\n        this.ctx.font = \"20pt Creepster\";\n        this.ctx.fillStyle = \"#b30000\";\n        this.ctx.fillText(\"Press any key to start\", 365, 350);\n    }\n\n    instructions() {\n        this.ctx.font = \"20pt Creepster\";\n        this.ctx.fillStyle = \"#b30000\";\n        this.ctx.fillText(\"Click on ghosts to shoot them.\", 315, 250); \n    }\n\n    highScore() {\n        this.ctx.font = \"20pt Creepster\";\n        this.ctx.fillStyle = \"#b30000\";\n        this.ctx.fillText(\"Shoot as many ghosts as possible to get a high score!\", 225, 300); \n    }\n\n    howToPlay() {\n        this.ctx.font = \"30pt Creepster\";\n        this.ctx.fillStyle = \"#b30000\";\n        this.ctx.fillText(\"How to play:\", 395, 200); \n    }\n \n    animate() {\n        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);\n        this.level.animate(this.ctx);\n        this.shooter.animate(this.ctx);\n        \n        if (this.running) {\n            requestAnimationFrame(this.animate.bind(this));\n        }\n    }\n}\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n// import '../stylesheets/application.css';\n\nconst canvas = document.getElementById('game-canvas');\nnew _game__WEBPACK_IMPORTED_MODULE_0__.default(canvas);\n// console.log(\"webpack is working\")\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Level\n/* harmony export */ });\nclass Level {\n   constructor(dimensions) {\n       this.dimensions = dimensions;\n       this.house_x = 80;\n       this.house_y = 550;\n       this.ghost_x = 635; \n       this.velocity = 5;\n   } \n\n\n   moveHouse(ctx) {\n        this.house_x -= this.velocity;\n        let that = this;\n        if (this.house_x < -200) {\n            this.house_x = 950;\n            this.drawHouse(ctx);\n        }\n   }\n\n    newGhost(ctx) {\n\n        var unshotGhost = new Image();\n        unshotGhost.src = '../images/unshot_ghost.png';\n\n        unshotGhost.onload = function () {\n\n            ctx.drawImage(unshotGhost, 50, this.ghost_x, 63, 70)\n        }\n    }\n\n    shotGhost(ctx) {\n\n        var shotGhost = new Image();\n        shotGhost.src = '../images/shot_ghost.png';\n\n        shotGhost.onload = function () {\n\n            ctx.drawImage(shotGhost, 50, 35, this.ghost_x, 70)\n        }\n    }\n\n    moveGhost(ctx) {\n        this.ghost_x -= this.velocity;\n    }\n\n    drawHouse(ctx) {\n        var house = new Image();\n        house.src = '../images/haunted_house.png';\n        let that = this;\n        ctx.drawImage(house, that.house_x, that.house_y, 250, 250)\n        house.onload = function () {\n\n            ctx.drawImage(house, that.house_x, that.house_y, 250, 250)\n        }\n    }\n    animate(ctx) {\n\n        this.drawHouse(ctx);\n        this.moveHouse(ctx)\n    }\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ }),

/***/ "./src/shooter.js":
/*!************************!*\
  !*** ./src/shooter.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Shooter\n/* harmony export */ });\n\nclass Shooter {\n\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n        this.velocity = 5;\n        // this.x = 300;\n        // this.y = 685;\n    }\n\n    drawShooter(ctx) {\n        var shooter = new Image();\n        shooter.src = '../images/squirtle.png';\n        let that = this;\n        ctx.drawImage(shooter, 300, 673, 115, 115)\n        shooter.onload = function () {\n            // console.log(this)\n            ctx.drawImage(shooter, 300, 673, 115, 115)\n        }\n    }\n\n    drawSkateboard(ctx) {\n        var skateboard = new Image();\n        skateboard.src = '../images/2d_skateboard.png';\n        let that = this;\n        ctx.drawImage(skateboard, 280, 770, 130, 30)\n        skateboard.onload = function () {\n            // console.log(this)\n            ctx.drawImage(skateboard, 280, 770, 130, 30)\n        } \n    }\n\n    animate(ctx) {\n        this.drawSkateboard(ctx)\n        this.drawShooter(ctx);\n\n\n    }\n}\n\n//# sourceURL=webpack:///./src/shooter.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;