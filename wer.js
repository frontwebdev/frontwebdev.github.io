!function (t) {
    function e(a) {
        if (n[a]) return n[a].exports;
        var r = n[a] = {exports: {}, id: a, loaded: !1};
        return t[a].call(r.exports, r, r.exports, e), r.loaded = !0, r.exports
    }

    var n = {};
    e.m = t, e.c = n, e.p = "", e(0)
}([function (t, e) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    var a = function () {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var a = e[n];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, a.key, a)
            }
        }

        return function (e, n, a) {
            return n && t(e.prototype, n), a && t(e, a), e
        }
    }(), r = window.pw || {};
    !function (t, e) {
        r.abandoned = function (t, e) {
            var r = {}, i = ["childList", "attributes", "characterData", "subtree"], s = function () {
                return JSON.parse('{"name":"newbeautyboxru","nodeParent":".bx_cart_counter","typeChange":"contentCount","host":"newbeautybox.ru","emptyCartValue":"0","orderSuccessPath":"personal/order/payment/","propsObserver":["childList","subtree"],"scriptVersion":1}')
            }, o = function () {
                function r(t) {
                    n(this, r), this.propsObserver = t.observer, this.cart = t.cart(), this.cacheData = {}, this.init()
                }

                return a(r, [{
                    key: "init", value: function () {
                        this.isOrderSuccess || (this.domChangeState(), this.disconnect(), this.cart && (this.customEvents(btoa("pw:abandoned:ready"), {abandoned: this.isHost(this.cart.host)}), this.initState()))
                    }
                }, {
                    key: "initState", value: function () {
                        var t = this.cart, n = e.querySelector(t.nodeParent);
                        n && this.isHost(t.host) && this.switchChange(n, t)
                    }
                }, {
                    key: "replaceStrReg", value: function (t) {
                        var e = ["?", "/", "#", "="], n = t;
                        return e.forEach(function (t) {
                            n = n.replace(t, "\\" + t)
                        }), n
                    }
                }, {
                    key: "isHost", value: function (t) {
                        return e.location.host === t
                    }
                }, {
                    key: "domObserver", value: function (t, e, n) {
                        var a = function () {
                            n(t)
                        };
                        if (this.isMutationObserver) {
                            var r = new MutationObserver(a);
                            r.disconnect(), r.observe(t, e), this.observer = r
                        }
                    }
                }, {
                    key: "disconnect", value: function () {
                        var t = this;
                        e.addEventListener(btoa("pw:abandoned:disconnect"), function (e) {
                            e.detail && t.observer && t.observer.disconnect()
                        })
                    }
                }, {
                    key: "customEvents", value: function (t, n) {
                        var a = new CustomEvent(t, {bubbles: !0, target: e, detail: n});
                        e.dispatchEvent(a)
                    }
                }, {
                    key: "itemPropsObserver", value: function (t) {
                        var e = this.propsObserver, n = {};
                        return t.forEach(function (t) {
                            n[t] = 0 != ~e.indexOf(t)
                        }), n
                    }
                }, {
                    key: "domChangeState", value: function () {
                        var t = this, n = this.cart;
                        if (n) {
                            var a = e.querySelector(n.nodeParent), r = this.itemPropsObserver(n.propsObserver);
                            a && this.isHost(n.host) && this.domObserver(a, r, function (e) {
                                t.switchChange(e, n)
                            })
                        }
                    }
                }, {
                    key: "switchChange", value: function (t, e) {
                        switch (e.typeChange) {
                            case"contentCount":
                                this.domChangeContentCount(t, e);
                                break;
                            case"contentNode":
                                this.domChangeContentNode(t, e);
                                break;
                            case"attributes":
                                this.domChangeAttributes(t, e)
                        }
                    }
                }, {
                    key: "domChangeContentCount", value: function (t, e) {
                        var n = t.innerHTML, a = void 0, r = void 0;
                        if (e.nodeChild) {
                            var i = this.parseDOMelements(n), s = i.querySelector(e.nodeChild);
                            a = this.cleaningDataParsing(s.innerHTML), r = parseFloat(e.emptyCartValue)
                        } else a = this.cleaningDataParsing(n), r = parseFloat(e.emptyCartValue);
                        if (!1 !== a) {
                            var o = this.getDataCart(a > r, a);
                            this.sendData(o)
                        }
                    }
                }, {
                    key: "domChangeContentNode", value: function (t, e) {
                        var n = t.innerHTML, a = (e.emptyCartValue, new RegExp("" + e.emptyCartValue, "gi")),
                            r = a.test(n) ? 0 : parseFloat(n);
                        if (!1 !== r) {
                            var i = this.getDataCart(a.test(n), r);
                            this.sendData(i)
                        }
                    }
                }, {
                    key: "sendData", value: function (t) {
                        t.cart_items !== this.cacheData.cart_items && (this.customEvents(btoa("pw:abandoned:cart"), t), this.cacheData = t)
                    }
                }, {
                    key: "cleaningDataParsing", value: function (t) {
                        return !!t && parseFloat(t.replace(/\(|\)/gi, ""))
                    }
                }, {
                    key: "getDataCart", value: function (t, e) {
                        return t ? {cart_is_empty: !1, cart_items: e, event_id: "cart_state"} : {
                            cart_is_empty: !0,
                            cart_items: e,
                            event_id: "cart_state"
                        }
                    }
                }, {
                    key: "parseDOMelements", value: function (t) {
                        return (new DOMParser).parseFromString(t, "text/html")
                    }
                }, {
                    key: "domChangeAttributes", value: function () {
                    }
                }, {
                    key: "isOrderSuccess", get: function () {
                        var t = this.cart, n = e.location.href,
                            a = new RegExp("" + this.replaceStrReg(t.orderSuccessPath), "gi");
                        if (!t.orderSuccessPath) return !1;
                        var r = !!~n.search(a);
                        return r && this.customEvents(btoa("pw:abandoned:cart"), {
                            event_id: "cart_state",
                            cart_is_empty: !0
                        }), r
                    }
                }, {
                    key: "isMutationObserver", get: function () {
                        return t.MutationObserver || t.WebKitMutationObserver || t.MozMutationObserver
                    }
                }]), r
            }();
            return r.init = function () {
                return new o({observer: i, cart: s})
            }, r
        }(t, e), 
            r.abandoned.init()
        
    }(window, document)
}]);
