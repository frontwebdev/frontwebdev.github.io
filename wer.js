!function (e) {
    function t(a) {
        if (n[a]) return n[a].exports;
        var r = n[a] = {exports: {}, id: a, loaded: !1};
        return e[a].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }

    var n = {};
    t.m = e, t.c = n, t.p = "", t(0)
}([function (e, t) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    var a = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var a = t[n];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
            }
        }

        return function (t, n, a) {
            return n && e(t.prototype, n), a && e(t, a), t
        }
    }(), r = window.pw || {};
    !function (e, t) {
        r.abandoned = function (e, t) {
            var r = {}, i = ["childList", "attributes", "characterData", "subtree"], s = function () {
                return JSON.parse('{"name":"wer","nodeParent":"#basketWrap","nodeChild":".product-count-label","typeChange":"contentCount","host":"wer.ru","emptyCartValue":"0","orderSuccessPath":"order/make/index.php?ORDER_ID=","propsObserver":["childList","subtree"],"scriptVersion":1}')
            }, o = function () {
                function r(e) {
                    n(this, r), this.propsObserver = e.observer, this.cart = e.cart(), this.cacheData = {}, this.init()
                }

                return a(r, [{
                    key: "init", value: function () {
                        this.isOrderSuccess || (this.domChangeState(), this.disconnect(), this.cart && (this.customEvents(btoa("pw:abandoned:ready"), {abandoned: this.isHost(this.cart.host)}), this.initState()))
                    }
                }, {
                    key: "initState", value: function () {
                        var e = this.cart, n = t.querySelector(e.nodeParent);
                        n && this.isHost(e.host) && this.switchChange(n, e)
                    }
                }, {
                    key: "replaceStrReg", value: function (e) {
                        var t = ["?", "/", "#", "="], n = e;
                        return t.forEach(function (e) {
                            n = n.replace(e, "\\" + e)
                        }), n
                    }
                }, {
                    key: "isHost", value: function (e) {
                        return t.location.host === e
                    }
                }, {
                    key: "domObserver", value: function (e, t, n) {
                        var a = function () {
                            n(e)
                        };
                        if (this.isMutationObserver) {
                            var r = new MutationObserver(a);
                            r.disconnect(), r.observe(e, t), this.observer = r
                        }
                    }
                }, {
                    key: "disconnect", value: function () {
                        var e = this;
                        t.addEventListener(btoa("pw:abandoned:disconnect"), function (t) {
                            t.detail && e.observer && e.observer.disconnect()
                        })
                    }
                }, {
                    key: "customEvents", value: function (e, n) {
                        var a = new CustomEvent(e, {bubbles: !0, target: t, detail: n});
                        t.dispatchEvent(a)
                    }
                }, {
                    key: "itemPropsObserver", value: function (e) {
                        var t = this.propsObserver, n = {};
                        return e.forEach(function (e) {
                            n[e] = 0 != ~t.indexOf(e)
                        }), n
                    }
                }, {
                    key: "domChangeState", value: function () {
                        var e = this, n = this.cart;
                        if (n) {
                            var a = t.querySelector(n.nodeParent), r = this.itemPropsObserver(n.propsObserver);
                            a && this.isHost(n.host) && this.domObserver(a, r, function (t) {
                                e.switchChange(t, n)
                            })
                        }
                    }
                }, {
                    key: "switchChange", value: function (e, t) {
                        switch (t.typeChange) {
                            case"contentCount":
                                this.domChangeContentCount(e, t);
                                break;
                            case"contentNode":
                                this.domChangeContentNode(e, t);
                                break;
                            case"attributes":
                                this.domChangeAttributes(e, t)
                        }
                    }
                }, {
                    key: "domChangeContentCount", value: function (e, t) {
                        var n = e.innerHTML, a = void 0, r = void 0;
                        if (t.nodeChild) {
                            var i = this.parseDOMelements(n), s = i.querySelector(t.nodeChild);
                            a = this.cleaningDataParsing(s.innerHTML), r = parseFloat(t.emptyCartValue)
                        } else a = this.cleaningDataParsing(n), r = parseFloat(t.emptyCartValue);
                        if (!1 !== a) {
                            var o = this.getDataCart(a > r, a);
                            this.sendData(o)
                        }
                    }
                }, {
                    key: "domChangeContentNode", value: function (e, t) {
                        var n = e.innerHTML, a = (t.emptyCartValue, new RegExp("" + t.emptyCartValue, "gi")),
                            r = a.test(n) ? 0 : parseFloat(n);
                        if (!1 !== r) {
                            var i = this.getDataCart(a.test(n), r);
                            this.sendData(i)
                        }
                    }
                }, {
                    key: "sendData", value: function (e) {
                        e.cart_items !== this.cacheData.cart_items && (this.customEvents(btoa("pw:abandoned:cart"), e), this.cacheData = e)
                    }
                }, {
                    key: "cleaningDataParsing", value: function (e) {
                        return !!e && parseFloat(e.replace(/\(|\)/gi, ""))
                    }
                }, {
                    key: "getDataCart", value: function (e, t) {
                        return e ? {cart_is_empty: !1, cart_items: t, event_id: "cart_state"} : {
                            cart_is_empty: !0,
                            cart_items: t,
                            event_id: "cart_state"
                        }
                    }
                }, {
                    key: "parseDOMelements", value: function (e) {
                        return (new DOMParser).parseFromString(e, "text/html")
                    }
                }, {
                    key: "domChangeAttributes", value: function () {
                    }
                }, {
                    key: "isOrderSuccess", get: function () {
                        var e = this.cart, n = t.location.href,
                            a = new RegExp("" + this.replaceStrReg(e.orderSuccessPath), "gi");
                        if (!e.orderSuccessPath) return !1;
                        var r = !!~n.search(a);
                        return r && this.customEvents(btoa("pw:abandoned:cart"), {
                            event_id: "cart_state",
                            cart_is_empty: !0
                        }), r
                    }
                }, {
                    key: "isMutationObserver", get: function () {
                        return e.MutationObserver || e.WebKitMutationObserver || e.MozMutationObserver
                    }
                }]), r
            }();
            return r.init = function () {
                return new o({observer: i, cart: s})
            }, r
        }(e, t), 
            r.abandoned.init()
    }(window, document)
}]);
