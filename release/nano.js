/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Point, "ZERO", {
        get: function () {
            return new Point(0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point, "ONE", {
        get: function () {
            return new Point(1, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point, "AXIS_X", {
        get: function () {
            return new Point(1, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point, "AXIS_Y", {
        get: function () {
            return new Point(0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Point.prototype.add = function (p) {
        this.x += p.x;
        this.y += p.y;
    };
    Point.prototype.subtract = function (p) {
        this.x -= p.x;
        this.y -= p.y;
    };
    Point.prototype.multiply = function (p) {
        this.x *= p.x;
        this.y *= p.y;
    };
    Point.prototype.divide = function (p) {
        this.x /= p.x;
        this.y /= p.y;
    };
    Point.prototype.scale = function (scalar) {
        this.x *= scalar;
        this.y *= scalar;
    };
    Point.prototype.dot = function (p) {
        return this.x * p.x + this.y * p.y;
    };
    Point.prototype.reflection = function (normal) {
        var n = normal.clone();
        var t = this.clone();
        var dotN = t.dot(n);
        n.scale(dotN);
        n.scale(2);
        t.subtract(n);
        return t;
    };
    Point.prototype.invert = function () {
        this.x *= -1;
        this.y *= -1;
    };
    Point.prototype.normalize = function () {
        if (length < Number.EPSILON) {
            this.x = 0;
            this.y = 0;
        }
        else {
            var invLength = 1 / length;
            this.x *= invLength;
            this.y *= invLength;
        }
    };
    Point.prototype.squaredLength = function () {
        return this.x * this.x + this.y * this.y;
    };
    Point.prototype.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Point.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    Object.defineProperty(Point.prototype, "isZero", {
        get: function () {
            return this.x == 0 && this.y == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "isOne", {
        get: function () {
            return this.x == 1 && this.y == 1;
        },
        enumerable: true,
        configurable: true
    });
    Point.prototype.toString = function () {
        return "[Point] (x:" + this.x.toFixed(5) + ", y:" + this.y.toFixed(5) + ")";
    };
    return Point;
}());
exports.Point = Point;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Timer = /** @class */ (function () {
    function Timer() {
    }
    // TODO [GJP] complete timer system
    Timer.deltaSeconds = 0;
    return Timer;
}());
exports.Timer = Timer;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Color_1 = __webpack_require__(3);
var Container_1 = __webpack_require__(4);
var Timer_1 = __webpack_require__(1);
var Stage = /** @class */ (function () {
    function Stage() {
        this._clearColor = new Color_1.Color(0.3, 0.6, 0.9);
        this._framerate = 30;
        this._debug = false;
        this._lastUpdate = 0;
        this._accumulator = 0;
        this._updateInterval = 0;
    }
    Stage.init = function (width, height, clearColor, framerate, debug) {
        if (clearColor === void 0) { clearColor = null; }
        if (framerate === void 0) { framerate = 30; }
        if (debug === void 0) { debug = false; }
        if (this._instance == null) {
            this._instance = new Stage();
        }
        var instance = this._instance;
        clearColor == null
            ? (instance._clearColor = new Color_1.Color(0.3, 0.6, 0.9, 1))
            : (instance._clearColor = clearColor);
        instance.framerate = framerate;
        instance._debug = debug;
        instance._canvas = document.createElement('canvas');
        instance._context = instance._canvas.getContext('2d');
        instance._canvas.width = width;
        instance._canvas.height = height;
        instance._root = new Container_1.Container();
        instance._root.name = '__root';
        // testing
        document.body.appendChild(instance._canvas);
        instance.clear();
        instance._lastUpdate = Date.now();
        instance.addEventListeners();
        instance.updateAnimationFrame();
        return instance;
    };
    Object.defineProperty(Stage, "context", {
        get: function () {
            return Stage._instance._context;
        },
        enumerable: true,
        configurable: true
    });
    Stage.prototype.play = function () {
        this._lastUpdate = Date.now();
        this._isPaused = false;
    };
    Stage.prototype.pause = function () {
        this._isPaused = true;
    };
    Stage.prototype.addEventListeners = function () {
        var canvas = this.instance._canvas;
        canvas.onclick = this.instance._onClick;
        canvas.onmousedown = this.instance._onMouseDown;
        canvas.onmouseup = this.instance._onMouseUp;
        canvas.onmousemove = this.instance._onMouseMove;
        canvas.ontouchstart = this.instance._onTouchStart;
        canvas.ontouchend = this.instance._onTouchEnd;
        window.onblur = this.instance._onBlur;
        window.onfocus = this.instance._onFocus;
    };
    Stage.prototype._onTouchStart = function (e) {
        console.log('TouchStart');
    };
    Stage.prototype._onTouchEnd = function (e) {
        console.log('TouchEnd');
    };
    Stage.prototype._onClick = function (e) {
        console.log('Click');
    };
    Stage.prototype._onMouseDown = function (e) {
        console.log('MouseDown');
    };
    Stage.prototype._onMouseUp = function (e) {
        console.log('MouseUp');
    };
    Stage.prototype._onMouseMove = function (e) {
        console.log('MouseMove');
    };
    Stage.prototype._onBlur = function (e) {
        if (!this._isPaused) {
            this._isFocussed = false;
            Stage._instance.pause();
        }
    };
    Stage.prototype._onFocus = function (e) {
        if (!this._isFocussed) {
            this._isFocussed = true;
            Stage._instance.play();
        }
    };
    Object.defineProperty(Stage.prototype, "instance", {
        get: function () {
            return Stage._instance;
        },
        enumerable: true,
        configurable: true
    });
    Stage.prototype.domElement = function () {
        return this._context;
    };
    Object.defineProperty(Stage.prototype, "framerate", {
        get: function () {
            return this._framerate;
        },
        set: function (value) {
            this._framerate = value;
            this._updateInterval = 1 / this._framerate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "root", {
        get: function () {
            return this._root;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "clearColor", {
        get: function () {
            return this._clearColor;
        },
        set: function (value) {
            this._clearColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Stage.prototype.updateAnimationFrame = function () {
        var instance = Stage._instance;
        window.requestAnimationFrame(instance.updateAnimationFrame);
        if (!instance._isPaused) {
            var currentTime = Date.now();
            var delta = (currentTime - instance._lastUpdate) / 1000;
            Timer_1.Timer.deltaSeconds = delta;
            instance._accumulator += delta;
            while (instance._accumulator >= instance._updateInterval) {
                instance.update(delta);
                instance._accumulator -= instance._updateInterval;
            }
            instance._lastUpdate = currentTime;
        }
    };
    Stage.prototype.update = function (applicationTime) {
        var instance = Stage._instance;
        instance.resetCanvasState();
        instance.clear();
        // TODO update tweener
        instance._root.update(true);
        instance._root.draw();
        if (instance._debug) {
            instance._root.drawDebug();
        }
        // TODO onEnterFrame;
    };
    Stage.prototype.resetCanvasState = function () {
        this._context.resetTransform();
        this._context.globalAlpha = 1;
        this._context.imageSmoothingEnabled = true;
        this._context.globalCompositeOperation = 'source-over';
    };
    Stage.prototype.clear = function () {
        this._context.fillStyle = this._clearColor.toHexRGB();
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    };
    return Stage;
}());
exports.Stage = Stage;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Color = /** @class */ (function () {
    function Color(red, green, blue, alpha) {
        if (red === void 0) { red = 0; }
        if (green === void 0) { green = 0; }
        if (blue === void 0) { blue = 0; }
        if (alpha === void 0) { alpha = 1; }
        this._red = red;
        this._green = green;
        this._blue = blue;
        this._alpha = alpha;
    }
    Object.defineProperty(Color.prototype, "red", {
        get: function () {
            return this._red;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "green", {
        get: function () {
            return this._green;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "blue", {
        get: function () {
            return this._blue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "alpha", {
        get: function () {
            return this._alpha;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color, "RED", {
        get: function () {
            return new Color(1, 0, 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Color.prototype.toHexRGB = function () {
        var red = Math.floor(this._red * 255);
        var green = Math.floor(this._green * 255);
        var blue = Math.floor(this._blue * 255);
        return ('#' +
            red.toString(16).padStart(2, '0') +
            green.toString(16).padStart(2, '0') +
            blue.toString(16).padStart(2, '0'));
    };
    Color.prototype.toHexRGBA = function () {
        var red = Math.floor(this._red * 255);
        var green = Math.floor(this._green * 255);
        var blue = Math.floor(this._blue * 255);
        var alpha = Math.floor(this._alpha * 255);
        return ('#' +
            red.toString(16).padStart(2, '0') +
            green.toString(16).padStart(2, '0') +
            blue.toString(16).padStart(2, '0') +
            alpha.toString(16).padStart(2, '0'));
    };
    return Color;
}());
exports.Color = Color;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Spatial_1 = __webpack_require__(10);
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super.call(this) || this;
        _this._children = [];
        return _this;
    }
    Container.prototype.dispose = function () {
        this.removeAllChildren();
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(Container.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    Container.prototype.addChild = function (spatial) {
        if (this._children.lastIndexOf(spatial) != -1) {
            //TODO warn
            return;
        }
        spatial.parent = this;
        this._children.push(spatial);
    };
    Container.prototype.removeChild = function (spatial) {
        var index = this._children.lastIndexOf(spatial);
        if (index != -1) {
            spatial.parent = null;
            this._children.splice(index, 1);
        }
    };
    Container.prototype.removeAllChildren = function () {
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.parent = null;
            child.dispose();
        }
        this._children = null;
    };
    // override
    Container.prototype.updateWorldData = function () {
        _super.prototype.updateWorldData.call(this);
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.update(false);
        }
    };
    Container.prototype.draw = function () {
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.draw();
        }
    };
    Container.prototype.drawDebug = function () {
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.drawDebug();
        }
    };
    return Container;
}(Spatial_1.Spatial));
exports.Container = Container;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __webpack_require__(0);
var Matrix_1 = __webpack_require__(11);
var Transform = /** @class */ (function () {
    function Transform() {
        this._scale = Point_1.Point.ONE;
        this._rotation = Matrix_1.Matrix.IDENTITY;
        this._translation = Point_1.Point.ZERO;
        this._matrix = Matrix_1.Matrix.IDENTITY;
        this._isDirty = true;
    }
    Object.defineProperty(Transform, "IDENTITY", {
        get: function () {
            return new Transform();
        },
        enumerable: true,
        configurable: true
    });
    Transform.prototype.setScale = function (x, y) {
        this._scale.x = x;
        this._scale.y = y;
        this._isDirty = true;
    };
    Transform.prototype.setTranslate = function (x, y) {
        this._translation.x = x;
        this._translation.y = y;
        this._isDirty = true;
    };
    Transform.prototype.setRotate = function (radians) {
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        this._rotation.set(c, -s, 0, s, c, 0, 0, 0, 1);
        this._isDirty = true;
    };
    Object.defineProperty(Transform.prototype, "scaleX", {
        get: function () {
            return this._scale.x;
        },
        set: function (value) {
            this._scale.x = value;
            this._isDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "scaleY", {
        get: function () {
            return this._scale.y;
        },
        set: function (value) {
            this._scale.y = value;
            this._isDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        set: function (value) {
            this._scale = value;
            this._isDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "rotation", {
        get: function () {
            return this._rotation;
        },
        set: function (value) {
            this._rotation = value;
            this._isDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "translation", {
        get: function () {
            return this._translation;
        },
        set: function (value) {
            this._translation = value;
            this._isDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Transform.multiply = function (lhs, rhs) {
        var m = Matrix_1.Matrix.multiply(lhs.matrix, rhs.matrix);
        var t = new Transform();
        t.matrix = m;
        return t;
    };
    Object.defineProperty(Transform.prototype, "matrix", {
        get: function () {
            if (this._isDirty) {
                this._matrix.compose(this._scale, this._rotation, this._translation);
                this._isDirty = false;
            }
            return this._matrix;
        },
        set: function (value) {
            this._matrix = value;
            this._matrix.decompose(this._scale, this._rotation, this._translation);
            this._isDirty = false;
        },
        enumerable: true,
        configurable: true
    });
    return Transform;
}());
exports.Transform = Transform;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BlendMode_1 = __webpack_require__(7);
var Point_1 = __webpack_require__(0);
var Container_1 = __webpack_require__(4);
var Stage_1 = __webpack_require__(2);
var AnchorType_1 = __webpack_require__(8);
var Sprite = /** @class */ (function (_super) {
    __extends(Sprite, _super);
    function Sprite() {
        var _this = _super.call(this) || this;
        _this.alpha = 1;
        _this.smoothing = true;
        _this.blendMode = BlendMode_1.BlendMode.SOURCE_OVER;
        _this.pivot = Point_1.Point.ZERO;
        // TODO Dynamic allocation
        _this._width = 100;
        _this._height = 100;
        _this._isDirty = true;
        _this._targetCanvas = document.createElement('canvas');
        _this._targetContext = _this._targetCanvas.getContext('2d');
        _this.canvas = document.createElement('canvas');
        _this.graphics = _this.canvas.getContext('2d');
        _this._image = document.createElement('img');
        _this._image.onload = function () {
            _this._isDirty = true;
        };
        _this._image.onerror = function () {
            _this._image.src = '';
        };
        _this._mask = document.createElement('img');
        _this._mask.onload = function () {
            _this._isDirty = true;
        };
        _this._mask.onerror = function () {
            _this._mask.src = '';
        };
        return _this;
    }
    Object.defineProperty(Sprite.prototype, "targetContext", {
        get: function () {
            return this._targetContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "targetCanvas", {
        get: function () {
            return this._targetCanvas;
        },
        enumerable: true,
        configurable: true
    });
    Sprite.prototype.dispose = function () { };
    //override
    Sprite.prototype.update = function (initiator) {
        // TODO update model space
        if (initiator === void 0) { initiator = true; }
        _super.prototype.update.call(this, initiator);
    };
    // override
    Sprite.prototype.draw = function () {
        if (this.alpha < Number.EPSILON) {
            return;
        }
        if (this._isDirty) {
            this.redraw();
        }
        var context = Stage_1.Stage.context;
        var m = this.worldTransform.matrix;
        context.globalAlpha = this.alpha;
        context.imageSmoothingEnabled = this.smoothing;
        context.globalCompositeOperation = this.blendMode;
        context.setTransform(m.m00, m.m10, m.m01, m.m11, m.m02, m.m12);
        var target = this._targetContext;
        target.globalAlpha = this.alpha;
        context.drawImage(target.canvas, -this.pivot.x, -this.pivot.y);
        _super.prototype.draw.call(this);
    };
    Sprite.prototype.redraw = function () {
        var ctx = this._targetContext;
        ctx.clearRect(0, 0, this._width, this._height);
        ctx.globalAlpha = 1;
        ctx.imageSmoothingEnabled = this.smoothing;
        ctx.globalCompositeOperation = this.blendMode;
        ctx.drawImage(this.graphics.canvas, 0, 0, this._width, this._height);
        if (this._image.src != '' || this._image.src != null) {
            ctx.drawImage(this._image, 0, 0, this._width, this._height);
        }
        if (this._tint != null) {
            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = BlendMode_1.BlendMode.SOURCE_ATOP;
            ctx.fillStyle = this._tint.toHexRGBA();
            ctx.fillRect(0, 0, this._width, this._height);
        }
        if (this._mask.src != '' || this._mask.src != null) {
            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = BlendMode_1.BlendMode.DESTINATION_IN;
            ctx.drawImage(this._mask, 0, 0, this._width, this._height);
        }
        this._isDirty = false;
    };
    Object.defineProperty(Sprite.prototype, "mask", {
        set: function (value) {
            this._mask.src = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "image", {
        get: function () {
            return this._image.src;
        },
        set: function (value) {
            this._image.src = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "tint", {
        get: function () {
            return this._tint;
        },
        set: function (value) {
            this._tint = value;
            this._isDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "width", {
        /*
        public get width():number
        {
            return this._width;
        }
    
        public set width(value:number)
        {
            this._width = value;
            this._isDirty = true;
        }
    
        public get height():number
        {
            return this._height;
        }
    
        public set height(value:number)
        {
            this._height = value;
            this._isDirty = true;
        }
        */
        get: function () {
            return this._targetCanvas.width;
        },
        set: function (value) {
            if (this._isDirty) {
                this.redraw();
            }
            this.scaleX = value / this._targetCanvas.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "height", {
        get: function () {
            return this._targetCanvas.height;
        },
        set: function (value) {
            if (this._isDirty) {
                this.redraw();
            }
            this.scaleY = value / this._targetCanvas.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "anchor", {
        set: function (value) {
            var width = this._width;
            var height = this._height;
            var halfWidth = this._width / 2;
            var halfHeight = this._height / 2;
            switch (value) {
                case AnchorType_1.AnchorType.TOP_LEFT:
                    this.pivot.set(0, 0);
                    break;
                case AnchorType_1.AnchorType.TOP_CENTER:
                    this.pivot.set(halfWidth, 0);
                    break;
                case AnchorType_1.AnchorType.TOP_RIGHT:
                    this.pivot.set(width, 0);
                    break;
                case AnchorType_1.AnchorType.CENTER_LEFT:
                    this.pivot.set(0, halfHeight);
                    break;
                case AnchorType_1.AnchorType.CENTER:
                    this.pivot.set(halfWidth, halfHeight);
                    break;
                case AnchorType_1.AnchorType.CENTER_RIGHT:
                    this.pivot.set(width, halfHeight);
                    break;
                case AnchorType_1.AnchorType.BOTTOM_LEFT:
                    this.pivot.set(0, height);
                    break;
                case AnchorType_1.AnchorType.BOTTOM_CENTER:
                    this.pivot.set(halfWidth, height);
                    break;
                case AnchorType_1.AnchorType.BOTTOM_RIGHT:
                    this.pivot.set(width, height);
                    break;
            }
        },
        enumerable: true,
        configurable: true
    });
    return Sprite;
}(Container_1.Container));
exports.Sprite = Sprite;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BlendMode;
(function (BlendMode) {
    BlendMode["SOURCE_OVER"] = "source-over";
    BlendMode["SOURCE_IN"] = "source-in";
    BlendMode["SOURCE_OUT"] = "source-out";
    BlendMode["SOURCE_ATOP"] = "source-atop";
    BlendMode["DESTINATION_OVER"] = "destination-over";
    BlendMode["DESTINATION_IN"] = "destination-in";
    BlendMode["DESTINATION_OUT"] = "destination-out";
    BlendMode["DESTINATION_ATOP"] = "destination-atop";
    BlendMode["LIGHTER"] = "lighter";
    BlendMode["COPY"] = "copy";
    BlendMode["XOR"] = "xor";
    BlendMode["MULTIPLY"] = "multiply";
    BlendMode["SCREEN"] = "screen";
    BlendMode["OVERLAY"] = "overlay";
    BlendMode["DARKEN"] = "darken";
    BlendMode["LIGHTEN"] = "lighten";
    BlendMode["COLOR_DODGE"] = "color-dodge";
    BlendMode["COLOR_BURN"] = "color-burn";
    BlendMode["HARD_LIGHT"] = "hard-light";
    BlendMode["SOFT_LIGHT"] = "soft-light";
    BlendMode["DIFFERENCE"] = "difference";
    BlendMode["EXCLUSION"] = "exclusion";
    BlendMode["HUE"] = "hue";
    BlendMode["SATURATION"] = "saturation";
    BlendMode["COLOR"] = "color";
    BlendMode["LUMINOSITY"] = "luminosity";
})(BlendMode = exports.BlendMode || (exports.BlendMode = {}));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AnchorType;
(function (AnchorType) {
    AnchorType[AnchorType["NONE"] = 0] = "NONE";
    AnchorType[AnchorType["BOTTOM_CENTER"] = 1] = "BOTTOM_CENTER";
    AnchorType[AnchorType["BOTTOM_LEFT"] = 2] = "BOTTOM_LEFT";
    AnchorType[AnchorType["BOTTOM_RIGHT"] = 3] = "BOTTOM_RIGHT";
    AnchorType[AnchorType["CENTER"] = 4] = "CENTER";
    AnchorType[AnchorType["CENTER_LEFT"] = 5] = "CENTER_LEFT";
    AnchorType[AnchorType["CENTER_RIGHT"] = 6] = "CENTER_RIGHT";
    AnchorType[AnchorType["TOP_CENTER"] = 7] = "TOP_CENTER";
    AnchorType[AnchorType["TOP_LEFT"] = 8] = "TOP_LEFT";
    AnchorType[AnchorType["TOP_RIGHT"] = 9] = "TOP_RIGHT";
})(AnchorType = exports.AnchorType || (exports.AnchorType = {}));


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Stage_1 = __webpack_require__(2);
var Color_1 = __webpack_require__(3);
var Sprite_1 = __webpack_require__(6);
var BlendMode_1 = __webpack_require__(7);
var AnchorType_1 = __webpack_require__(8);
var MovieClip_1 = __webpack_require__(13);
var clearColor = new Color_1.Color(0.3, 0.6, 0.9, 1);
var stage = Stage_1.Stage.init(800, 600, clearColor, 30, true);
var bunny = new Sprite_1.Sprite();
bunny.blendMode = BlendMode_1.BlendMode.SOURCE_OVER;
bunny.anchor = AnchorType_1.AnchorType.CENTER;
bunny.scale = 1.3;
bunny.smoothing = false;
bunny.graphics.fillStyle = '#FF0000';
bunny.graphics.fillRect(0, 0, 100, 100);
bunny.image = './assets/bunny.png';
bunny.tint = new Color_1.Color(1, 1, 0, 0.5);
bunny.x = 300;
bunny.y = 300;
bunny.rotationSpeed = 1;
bunny.update();
var star = new Sprite_1.Sprite();
star.blendMode = BlendMode_1.BlendMode.COLOR_BURN;
star.x = 30;
star.y = 30;
star.scale = 1.3;
star.alpha = 0.75;
star.tint = new Color_1.Color(1, 0, 0, 0.5);
star.smoothing = false;
star.anchor = AnchorType_1.AnchorType.CENTER;
star.image = './assets/star.png';
star.mask = './assets/bunny.png';
star.rotationSpeed = 2;
bunny.addChild(star);
stage.root.addChild(bunny);
var frames = [bunny, star];
var mc = new MovieClip_1.MovieClip();
mc.blendMode = BlendMode_1.BlendMode.COLOR_BURN;
mc.anchor = AnchorType_1.AnchorType.CENTER;
mc.rotationSpeed = -4;
mc.x = 100;
mc.y = 100;
mc.framerate = 2;
mc.tint = new Color_1.Color(1, 0, 0, 0.8);
mc.frames = frames;
stage.root.addChild(mc);
/*
let texture: Texture = new Texture()
texture.addEventListener(EventType.LOADED, (e: Event) => onLoaded(e))
texture.addEventListener(EventType.ERROR, (e: ErrorEvent) => onError(e))

texture.path = 'assets/star.png'

function onLoaded(e: Event): void {
    console.log('Texture loaded')
    texture.draw(100, 100)
}

function onError(e: ErrorEvent): void {
    console.log(`An error occured: ${e.message}`)
}
*/


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Transform_1 = __webpack_require__(5);
var Bound_1 = __webpack_require__(12);
var Point_1 = __webpack_require__(0);
var Timer_1 = __webpack_require__(1);
var Spatial = /** @class */ (function () {
    function Spatial() {
        this.name = '';
        // internal use only
        this.transform = Transform_1.Transform.IDENTITY;
        // internal use only
        this.worldTransform = Transform_1.Transform.IDENTITY;
        this._worldBoundIsDirty = true;
        this._worldTransformIsDirty = true;
        this._parent = null;
        // internal use only
        this._worldBound = Bound_1.Bound.IDENTITY;
        this.velocity = Point_1.Point.ZERO;
        this.rotationSpeed = 0;
        this._x = 0;
        this._y = 0;
        this._scaleX = 1;
        this._scaleY = 1;
        this._rotation = 0;
    }
    Spatial.prototype.dispose = function () { };
    Object.defineProperty(Spatial.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
            this._worldTransformIsDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Spatial.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
            this._worldTransformIsDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Spatial.prototype, "scaleX", {
        get: function () {
            return this._scaleX;
        },
        set: function (value) {
            this._scaleX = value;
            this._worldTransformIsDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Spatial.prototype, "scaleY", {
        get: function () {
            return this._scaleY;
        },
        set: function (value) {
            this._scaleY = value;
            this._worldTransformIsDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Spatial.prototype, "rotation", {
        get: function () {
            return this._rotation;
        },
        set: function (value) {
            this._rotation = value;
            this._worldTransformIsDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Spatial.prototype.rotate = function (radian) {
        this.rotation += radian;
    };
    Spatial.prototype.translate = function (x, y) {
        this.x += x;
        this.y += y;
    };
    Object.defineProperty(Spatial.prototype, "scale", {
        set: function (value) {
            this.scaleX *= value;
            this.scaleY *= value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Spatial.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        set: function (value) {
            this._parent = value;
        },
        enumerable: true,
        configurable: true
    });
    Spatial.prototype.update = function (initiator) {
        var dt = Timer_1.Timer.deltaSeconds;
        if (!this.velocity.isZero) {
            this.x += this.velocity.x * dt;
            this.y += this.velocity.y * dt;
        }
        if (this.rotationSpeed != 0) {
            this.rotation += this.rotationSpeed * dt;
        }
        this.updateWorldData();
        this.updateWorldBound();
        if (initiator) {
            this.propagateBoundToRoot();
        }
    };
    // virtual
    Spatial.prototype.updateWorldData = function () {
        // TODO updateController(applicationTime);
        if (this._worldTransformIsDirty) {
            this.transform.setTranslate(this._x, this._y);
            this.transform.setScale(this._scaleX, this._scaleY);
            this.transform.setRotate(this._rotation);
            if (this._parent != null) {
                this.worldTransform = Transform_1.Transform.multiply(this._parent.worldTransform, this.transform);
            }
            else {
                //console.log(this.transform);
                this.worldTransform = this.transform;
            }
        }
    };
    Spatial.prototype.updateModelSpace = function () {
        this.updateModelBound();
    };
    Spatial.prototype.updateModelBound = function () {
        // virtual
    };
    Spatial.prototype.updateWorldBound = function () {
        // virtual
    };
    Spatial.prototype.propagateBoundToRoot = function () {
        if (this._parent != null) {
            this._parent.updateWorldBound();
            this._parent.propagateBoundToRoot();
        }
    };
    Spatial.prototype.draw = function () {
        // virtual
    };
    Spatial.prototype.drawDebug = function () {
        // virtual
    };
    return Spatial;
}());
exports.Spatial = Spatial;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Matrix = /** @class */ (function () {
    function Matrix(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
        if (m00 === void 0) { m00 = 1; }
        if (m01 === void 0) { m01 = 0; }
        if (m02 === void 0) { m02 = 0; }
        if (m10 === void 0) { m10 = 0; }
        if (m11 === void 0) { m11 = 1; }
        if (m12 === void 0) { m12 = 0; }
        if (m20 === void 0) { m20 = 0; }
        if (m21 === void 0) { m21 = 0; }
        if (m22 === void 0) { m22 = 1; }
        this.m00 = m00;
        this.m01 = m01;
        this.m02 = m02;
        this.m10 = m10;
        this.m11 = m11;
        this.m12 = m12;
        this.m20 = m20;
        this.m21 = m21;
        this.m22 = m22;
    }
    Object.defineProperty(Matrix, "IDENTITY", {
        get: function () {
            return new Matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix, "ZERO", {
        get: function () {
            return new Matrix(0, 0, 0, 0, 0, 0, 0, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "euler", {
        get: function () {
            return Math.atan2(-this.m01, this.m00);
        },
        enumerable: true,
        configurable: true
    });
    Matrix.rotation = function (radians) {
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        return new Matrix(c, -s, 0, s, c, 0, 0, 0, 1);
    };
    Matrix.scale = function (scaleX, scaleY) {
        return new Matrix(scaleX, 0, 0, 0, scaleY, 0, 0, 0, 1);
    };
    Matrix.translation = function (x, y) {
        return new Matrix(1, 0, x, 0, 1, y, 0, 0, 1);
    };
    Matrix.multiply = function (lhs, rhs) {
        return new Matrix(lhs.m00 * rhs.m00 + lhs.m01 * rhs.m10 + lhs.m02 * rhs.m20, lhs.m00 * rhs.m01 + lhs.m01 * rhs.m11 + lhs.m02 * rhs.m21, lhs.m00 * rhs.m02 + lhs.m01 * rhs.m12 + lhs.m02 * rhs.m22, lhs.m10 * rhs.m00 + lhs.m11 * rhs.m10 + lhs.m12 * rhs.m20, lhs.m10 * rhs.m01 + lhs.m11 * rhs.m11 + lhs.m12 * rhs.m21, lhs.m10 * rhs.m02 + lhs.m11 * rhs.m12 + lhs.m12 * rhs.m22, lhs.m20 * rhs.m00 + lhs.m21 * rhs.m10 + lhs.m22 * rhs.m20, lhs.m20 * rhs.m01 + lhs.m21 * rhs.m11 + lhs.m22 * rhs.m21, lhs.m20 * rhs.m02 + lhs.m21 * rhs.m12 + lhs.m22 * rhs.m22);
    };
    Matrix.prototype.compose = function (scale, rotation, translation) {
        var sMat = Matrix.scale(scale.x, scale.y);
        var rMat = Matrix.multiply(sMat, rotation);
        this.set(rMat.m00, rMat.m01, translation.x, rMat.m10, rMat.m11, translation.y, 0, 0, 1);
    };
    Matrix.prototype.decompose = function (scale, rotation, translation) {
        translation.set(this.m02, this.m12);
        var sx = Math.sqrt(this.m00 * this.m00 + this.m01 * this.m01);
        var sy = Math.sqrt(this.m10 * this.m10 + this.m11 * this.m11);
        scale.set(sx, sy);
        rotation.set(this.m00 / sx, this.m01 / sx, 0, this.m10 / sy, this.m11 / sy, 0, 0, 0, 1);
    };
    Matrix.prototype.set = function (m00, m01, m02, m10, m11, m12, m20, m21, m22) {
        this.m00 = m00;
        this.m01 = m01;
        this.m02 = m02;
        this.m10 = m10;
        this.m11 = m11;
        this.m12 = m12;
        this.m20 = m20;
        this.m21 = m21;
        this.m22 = m22;
    };
    Matrix.prototype.copyFrom = function (m) {
        this.m00 = m.m00;
        this.m01 = m.m01;
        this.m02 = m.m02;
        this.m10 = m.m10;
        this.m11 = m.m11;
        this.m12 = m.m12;
        this.m20 = m.m20;
        this.m21 = m.m21;
        this.m22 = m.m22;
    };
    Matrix.prototype.toIdentity = function () {
        this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
    };
    Matrix.prototype.toZero = function () {
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    };
    Matrix.prototype.toString = function () {
        return ("[Matrix]\n" +
            (" m00: " + this.m00.toPrecision(8) + ", m01: " + this.m01.toPrecision(8) + ", m02: " + this.m02.toPrecision(8) + "\n") +
            (" m10: " + this.m10.toPrecision(8) + ", m11: " + this.m11.toPrecision(8) + ", m12: " + this.m12.toPrecision(8) + "\n") +
            (" m20: " + this.m20.toPrecision(8) + ", m21: " + this.m21.toPrecision(8) + ", m22: " + this.m22.toPrecision(8)));
    };
    return Matrix;
}());
exports.Matrix = Matrix;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Transform_1 = __webpack_require__(5);
var Point_1 = __webpack_require__(0);
var Bound = /** @class */ (function () {
    function Bound(vertices) {
        this._vertices = [
            Point_1.Point.ZERO,
            Point_1.Point.ZERO,
            Point_1.Point.ZERO,
            Point_1.Point.ZERO
        ];
        this._transform = Transform_1.Transform.IDENTITY;
        this._vertices = vertices;
        this._isAABBDirty = true;
    }
    Object.defineProperty(Bound, "IDENTITY", {
        get: function () {
            var vertices = [Point_1.Point.ZERO, Point_1.Point.ZERO, Point_1.Point.ONE, Point_1.Point.ONE];
            return new Bound(vertices);
        },
        enumerable: true,
        configurable: true
    });
    return Bound;
}());
exports.Bound = Bound;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Sprite_1 = __webpack_require__(6);
var Timer_1 = __webpack_require__(1);
var MovieClip = /** @class */ (function (_super) {
    __extends(MovieClip, _super);
    function MovieClip() {
        var _this = _super.call(this) || this;
        _this._frames = [];
        _this._currentFrame = 0;
        _this._framerate = 30;
        _this._accumulator = 0;
        _this._updateInterval = 0;
        _this._isPaused = false;
        return _this;
    }
    MovieClip.prototype.dispose = function () {
        for (var _i = 0, _a = this._frames; _i < _a.length; _i++) {
            var sprite = _a[_i];
            sprite.dispose();
        }
        _super.prototype.dispose.call(this);
    };
    Object.defineProperty(MovieClip.prototype, "framerate", {
        get: function () {
            return this._framerate;
        },
        set: function (value) {
            this._framerate = value;
            this._updateInterval = 1 / value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClip.prototype, "frames", {
        get: function () {
            return this._frames;
        },
        set: function (value) {
            this._frames = value;
            this.frame = 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MovieClip.prototype, "frame", {
        set: function (frame) {
            this._currentFrame = frame;
            if (this._frames[this._currentFrame] != null) {
                this.image = this._frames[this._currentFrame].image;
            }
        },
        enumerable: true,
        configurable: true
    });
    MovieClip.prototype.play = function () {
        this._isPaused = false;
    };
    MovieClip.prototype.stop = function () {
        this._isPaused = true;
    };
    MovieClip.prototype.update = function (initiator) {
        if (initiator === void 0) { initiator = true; }
        if (!this._isPaused) {
            this._accumulator += Timer_1.Timer.deltaSeconds;
            while (this._accumulator >= this._updateInterval) {
                this._currentFrame++;
                if (this._currentFrame >= this._frames.length) {
                    this._currentFrame = 0;
                }
                this._accumulator -= this._updateInterval;
                this.frame = this._currentFrame;
            }
        }
        _super.prototype.update.call(this, initiator);
    };
    return MovieClip;
}(Sprite_1.Sprite));
exports.MovieClip = MovieClip;


/***/ })
/******/ ]);