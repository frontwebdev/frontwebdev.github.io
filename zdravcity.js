! function(t) {
    function e(r) {
        if (n[r]) return n[r].exports;
        var a = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return t[r].call(a.exports, a, a.exports, e), a.loaded = !0, a.exports
    }
    var n = {};
    e.m = t, e.c = n, e.p = "", e(0)
}([function(t, e) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    var r = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n), r && t(e, r), e
            }
        }(),
        a = window.pw || {};
    ! function(t, e) {
        a.abandoned = function(t, e) {
            var a = {},
                i = ["childList", "attributes", "characterData", "subtree"],
                s = function() {
                    return JSON.parse('{"name":"zdravcity","nodeParent":".header-count-basket-items","typeChange":"contentCount","host":"zdravcity.ru","emptyCartValue":"0 ","orderSuccessPath":"cart/?STEP=4","propsObserver":["childList","subtree"]}')
                },
                o = function() {
                    function a(t) {
                        n(this, a), this.propsObserver = t.observer, this.cart = t.cart(), this.init()
                    }
                    return r(a, [{
                        key: "init",
                        value: function() {
                            this.isOrderSuccess || (this.domChangeState(), this.disconnect(), this.cart && (this.customEvents(btoa("pw:abandoned:ready"), this.isHost(this.cart.host)), this.initState()))
                        }
                    }, {
                        key: "initState",
                        value: function() {
                            var t = this.cart,
                                n = e.querySelector(t.nodeParent);
                            n && this.isHost(t.host) && this.switchChange(n, t)
                        }
                    }, {
                        key: "replaceStrReg",
                        value: function(t) {
                            var e = ["?", "/", "#", "="],
                                n = t;
                            return e.forEach(function(t) {
                                n = n.replace(t, "\\" + t)
                            }), n
                        }
                    }, {
                        key: "isHost",
                        value: function(t) {
                            return e.location.host === t
                        }
                    }, {
                        key: "domObserver",
                        value: function(t, e, n) {
                            var r = function() {
                                n(t)
                            };
                            if (this.isMutationObserver) {
                                var a = new MutationObserver(r);
                                a.disconnect(), a.observe(t, e), this.observer = a
                            }
                        }
                    }, {
                        key: "disconnect",
                        value: function() {
                            var t = this;
                            e.addEventListener(btoa("pw:abandoned:disconnect"), function(e) {
                                e.detail && t.observer && t.observer.disconnect()
                            })
                        }
                    }, {
                        key: "customEvents",
                        value: function(t, n) {
                            var r = new CustomEvent(t, {
                                bubbles: !0,
                                target: e,
                                detail: n
                            });
                            e.dispatchEvent(r)
                        }
                    }, {
                        key: "itemPropsObserver",
                        value: function(t) {
                            var e = this.propsObserver,
                                n = {};
                            return t.forEach(function(t) {
                                n[t] = 0 != ~e.indexOf(t)
                            }), n
                        }
                    }, {
                        key: "domChangeState",
                        value: function() {
                            var t = this,
                                n = this.cart;
                            if (n) {
                                var r = e.querySelector(n.nodeParent),
                                    a = this.itemPropsObserver(n.propsObserver);
                                r && this.isHost(n.host) && this.domObserver(r, a, function(e) {
                                    t.switchChange(e, n)
                                })
                            }
                        }
                    }, {
                        key: "switchChange",
                        value: function(t, e) {
                            switch (e.typeChange) {
                                case "contentCount":
                                    this.domChangeContentCount(t, e);
                                    break;
                                case "contentNode":
                                    this.domChangeContentNode(t, e);
                                    break;
                                case "attributes":
                                    this.domChangeAttributes(t, e)
                            }
                        }
                    }, {
                        key: "domChangeContentCount",
                        value: function(t, e) {
                            var n = t.innerHTML,
                                r = void 0,
                                a = void 0;
                            if (e.nodeChild) {
                                var i = this.parseDOMelements(n),
                                    s = i.querySelector(e.nodeChild);
                                r = parseFloat(s.innerHTML), a = parseFloat(e.emptyCartValue)
                            } else r = parseFloat(n), a = parseFloat(e.emptyCartValue);
                            var o = r > a ? {
                                cart_is_empty: !1,
                                cart_items: r,
                                event_id: "cart_state"
                            } : {
                                cart_is_empty: !0,
                                cart_items: r,
                                event_id: "cart_state"
                            };
                            this.customEvents(btoa("pw:abandoned:cart"), o)
                        }
                    }, {
                        key: "domChangeContentNode",
                        value: function(t, e) {
                            var n = t.innerHTML,
                                r = (e.emptyCartValue, new RegExp("" + e.emptyCartValue, "gi")),
                                a = r.test(n) ? 0 : parseFloat(n),
                                i = r.test(n) ? {
                                    cart_is_empty: !0,
                                    cart_items: a,
                                    event_id: "cart_state"
                                } : {
                                    cart_is_empty: !1,
                                    cart_items: a,
                                    event_id: "cart_state"
                                };
                            this.customEvents(btoa("pw:abandoned:cart"), i)
                        }
                    }, {
                        key: "parseDOMelements",
                        value: function(t) {
                            return (new DOMParser).parseFromString(t, "text/html")
                        }
                    }, {
                        key: "domChangeAttributes",
                        value: function() {}
                    }, {
                        key: "isOrderSuccess",
                        get: function() {
                            var t = this.cart,
                                n = e.location.href,
                                r = new RegExp("" + this.replaceStrReg(t.orderSuccessPath), "gi");
                            if (!t.orderSuccessPath) return !1;
                            var a = !!~n.search(r);
                            return a && this.customEvents(btoa("pw:abandoned:cart"), {
                                event_id: "cart_state",
                                cart_is_empty: !0
                            }), a
                        }
                    }, {
                        key: "isMutationObserver",
                        get: function() {
                            return t.MutationObserver || t.WebKitMutationObserver || t.MozMutationObserver
                        }
                    }]), a
                }();
            return a.init = function() {
                return new o({
                    observer: i,
                    cart: s
                })
            }, a
        }(t, e),a.abandoned.init()
        
    }(window, document)
}]);
