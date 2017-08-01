/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	;var pw = window.pw || {};

	(function (window, document) {
	    "use strict";

	    pw.abandoned = function (window, document) {
	        var modules = {};
	        var PROPS_OBSERVER = ['childList', 'attributes', 'characterData', 'subtree'];
	        var CART_CONFIG = function CART_CONFIG() {
	            return JSON.parse('{"name":"zdravcity","nodeParent":".header-count-basket-items","typeChange":"contentCount","host":"zdravcity.ru","emptyCartValue":"0 ","orderSuccessPath":"cart/?STEP=4","propsObserver":["childList","subtree"]}');
	        };

	        var AbandonedCart = function () {
	            function AbandonedCart(props) {
	                _classCallCheck(this, AbandonedCart);

	                this.propsObserver = props.observer;
	                this.cart = props.cart();
	                this.init();
	            }

	            _createClass(AbandonedCart, [{
	                key: 'init',
	                value: function init() {
	                    if (!this.isOrderSuccess) {
	                        this.domChangeState();
	                        this.disconnect();

	                        if (this.cart) {
	                            this.customEvents(btoa('pw:abandoned:ready'), this.isHost(this.cart.host));
	                            this.initState();
	                        }
	                    }
	                }
	            }, {
	                key: 'initState',
	                value: function initState() {
	                    var cart = this.cart;
	                    var elementNode = document.querySelector(cart.nodeParent);

	                    if (elementNode && this.isHost(cart.host)) {
	                        this.switchChange(elementNode, cart);
	                    }
	                }
	            }, {
	                key: 'replaceStrReg',
	                value: function replaceStrReg(str) {
	                    var list = ['?', '/', '#', '='];
	                    var strUpdate = str;

	                    list.forEach(function (item) {
	                        strUpdate = strUpdate.replace(item, '\\' + item);
	                    });
	                    return strUpdate;
	                }
	            }, {
	                key: 'isHost',
	                value: function isHost(host) {
	                    return document.location.host === host ? true : false;
	                }
	            }, {
	                key: 'domObserver',
	                value: function domObserver(el, itemObserver, callback) {
	                    var done = function done() {
	                        callback(el);
	                    };

	                    if (this.isMutationObserver) {
	                        var observer = new MutationObserver(done);
	                        observer.disconnect();
	                        observer.observe(el, itemObserver);

	                        this.observer = observer;
	                    }
	                }
	            }, {
	                key: 'disconnect',
	                value: function disconnect() {
	                    var _this = this;

	                    document.addEventListener(btoa('pw:abandoned:disconnect'), function (e) {
	                        if (e.detail && _this.observer) {
	                            _this.observer.disconnect();
	                        }
	                    });
	                }
	            }, {
	                key: 'customEvents',
	                value: function customEvents(event, data) {
	                    var evc = new CustomEvent(event, {
	                        bubbles: true,
	                        target: document,
	                        detail: data
	                    });
	                    document.dispatchEvent(evc);
	                }
	            }, {
	                key: 'itemPropsObserver',
	                value: function itemPropsObserver(items) {
	                    var propsObserver = this.propsObserver;
	                    var data = {};

	                    items.forEach(function (item) {
	                        data[item] = ~propsObserver.indexOf(item) !== 0 ? true : false;
	                    });

	                    return data;
	                }
	            }, {
	                key: 'domChangeState',
	                value: function domChangeState() {
	                    var _this2 = this;

	                    var cart = this.cart;
	                    if (!cart) return;

	                    var elementNode = document.querySelector(cart.nodeParent);
	                    var itemPropsObserver = this.itemPropsObserver(cart.propsObserver);

	                    if (elementNode && this.isHost(cart.host)) {
	                        this.domObserver(elementNode, itemPropsObserver, function (el) {
	                            _this2.switchChange(el, cart);
	                        });
	                    }
	                }
	            }, {
	                key: 'switchChange',
	                value: function switchChange(el, cart) {
	                    switch (cart.typeChange) {
	                        case 'contentCount':
	                            this.domChangeContentCount(el, cart);
	                            break;
	                        case 'contentNode':
	                            this.domChangeContentNode(el, cart);
	                            break;
	                        case 'attributes':
	                            this.domChangeAttributes(el, cart);
	                            break;
	                    }
	                }

	                // Изменение содержимого кол-во товаров в корзине

	            }, {
	                key: 'domChangeContentCount',
	                value: function domChangeContentCount(el, item) {
	                    var content = el.innerHTML;
	                    var obsElementContent = void 0,
	                        emptyCartValue = void 0;

	                    if (item.nodeChild) {
	                        var contentDOM = this.parseDOMelements(content),
	                            obsElement = contentDOM.querySelector(item.nodeChild);

	                        obsElementContent = parseFloat(obsElement.innerHTML);
	                        emptyCartValue = parseFloat(item.emptyCartValue);
	                    } else {
	                        obsElementContent = parseFloat(content);
	                        emptyCartValue = parseFloat(item.emptyCartValue);
	                    }

	                    var data = obsElementContent > emptyCartValue ? { cart_is_empty: false, cart_items: obsElementContent, event_id: 'cart_state' } : { cart_is_empty: true, cart_items: obsElementContent, event_id: 'cart_state' };

	                    this.customEvents(btoa('pw:abandoned:cart'), data);
	                }

	                // Изменение содержимого Node узла (html || text) товаров в корзине

	            }, {
	                key: 'domChangeContentNode',
	                value: function domChangeContentNode(el, item) {
	                    var content = el.innerHTML,
	                        emptyCartValue = item.emptyCartValue,
	                        regEmptyCart = new RegExp('' + item.emptyCartValue, 'gi'),
	                        count = regEmptyCart.test(content) ? 0 : parseFloat(content);

	                    var data = regEmptyCart.test(content) ? { cart_is_empty: true, cart_items: count, event_id: 'cart_state' } : { cart_is_empty: false, cart_items: count, event_id: 'cart_state' };

	                    this.customEvents(btoa('pw:abandoned:cart'), data);
	                }
	            }, {
	                key: 'parseDOMelements',
	                value: function parseDOMelements(content) {
	                    var parser = new DOMParser();
	                    var contentDOM = parser.parseFromString(content, 'text/html');

	                    return contentDOM;
	                }
	            }, {
	                key: 'domChangeAttributes',
	                value: function domChangeAttributes() {
	                    // ... change props attributes
	                }
	            }, {
	                key: 'isOrderSuccess',
	                get: function get() {
	                    var cart = this.cart;
	                    var href = document.location.href;
	                    var Reg = new RegExp('' + this.replaceStrReg(cart.orderSuccessPath), 'gi');

	                    if (!cart.orderSuccessPath) return false;

	                    var isOrderSuccess = ~href.search(Reg) ? true : false;

	                    if (isOrderSuccess) {
	                        this.customEvents(btoa('pw:abandoned:cart'), {
	                            event_id: 'cart_state',
	                            cart_is_empty: true
	                        });
	                    }

	                    return isOrderSuccess;
	                }
	            }, {
	                key: 'isMutationObserver',
	                get: function get() {
	                    return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	                }
	            }]);

	            return AbandonedCart;
	        }();

	        modules.init = function () {
	            return new AbandonedCart({
	                observer: PROPS_OBSERVER,
	                cart: CART_CONFIG
	            });
	        };

	        return modules;
	    }(window, document);
        
	    pw.abandoned.init();

	})(window, document);

/***/ })
/******/ ]);
