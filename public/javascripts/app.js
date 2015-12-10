(function(S) {
    window._CTK5e17 = window._CTK5e17 ||
    function() {
        var a = {},
        e = "";
        return function(r, t, n, i) {
            i = i || {};
            if (i.reject) {
                if (typeof i.reject != "object") {
                    i.reject = [i.reject]
                }
                for (var o = i.reject.length - 1; o >= 0; o--) {
                    if (a[i.reject[o]]) {
                        return
                    }
                }
            }
            if (!e) {
                e = t
            }
            var s = (new Date).valueOf();
            a[t] = s;
            var d;
            if (t == e) {
                var v = window.g_config && g_config.startTime;
                d = v ? s - v: 0
            } else {
                d = s - (a[n || e] || a[e])
            }
            switch (i.autoGroup) {
            case "time":
                i.group = i.autoGroup + "_" + (d <= 0 ? 0 : Math.floor(Math.log(d) / Math.log(2)));
                break
            }
            if (i.group) {
                t = t + "|" + i.group
            }
            if (typeof r == "object") {
                r = r[i.group || "_"] || 0
            }
            var l = [.86, .78, .67, .6, .51, .43, .41, .36, .32, .27, .25, .2, .19, .2, .18, .17, .14, .12, .14, .13, .12, .11, .11, .09, .1, .1, .1, .09, .09, .08, .1, .09, .09, .09, .09, .08, .11, .11, .12, .12, .12, .11, .15, .18, .18, .21, .25, .28, .42, .54, .59, .63, .74, .88, .8, .78, .88, 1.02, .99, 1.22, 1.35, 1.35, 1.07, 1.4, 1.5, 1.41, 1.66, 1.72, 1.09, 1.45, 1.64, 1.51, 1.59, 1.18, 1.21, 1.34, 1.73, 1.35, 1.44, 1.17, 1.27, 1.59, 1.59, 1.53, 1.64, 1.52, 1.16, 1.6, 1.78, 1.45, 1.21, 1.43, 1.28, 1.48, 1.37, 1.8, 1.99, 1.5, 1.16, 1.63, 1.66, 1.89, 1.55, 1.13, 1.65, 1.4, 1.45, 1.54, 1.44, 1.1, 1.2, 1.4, 1.3, 1.5, 1.47, 1.29, 1.53, 1.34, 1.28, 1.81, 1.82, 1.71, 1.42, 1.64, 1.78, 2.21, 1.74, 1.74, 1.7, 1.37, 1.54, 1.48, 1.59, 1.63, 1.5, 1.53, 1.7, 1.62, 1.37, 1.28, 1.39, 1.21, 1.12, .97],
            c = l && l[Math.floor((s + 288e5) / (864e5 / 144)) % 144] || 1,
            p = Math.round(Math.max(Math.pow(2, r) * c / (undefined || 8192), 1 / (undefined || 1 / 16)));
            if (Math.floor(Math.random() * p) > 0) {
                return
            }
            var m = "http://shop.tmall.com/track-1/",
            u = ["[u" + m + "]", "[t" + d + "]", "[c" +
            function _() {
                return window.trackVersionShop
            } () + "|" + t + "]", "[r" + p + "]"].join("");
            var f = "",
            h;
            try {
                h = /_nk_=([^;]+)/.exec(document.cookie);
                if (h) {
                    f = decodeURIComponent(h[1])
                }
            } catch(x) {}
            var g = "jsFeImage_" + s + "_" + Math.random(),
            b = window[g] = new Image;
            b.onload = b.onerror = function() {
                window[g] = null
            };
            b.src = "http://gm.mmstat.com/jstracker.2?" + ["type=9", "id=jstracker", "v=0.01", "nick=" + encodeURIComponent(f), "islogin=0", "msg=" + encodeURIComponent(u), "file=" + encodeURIComponent(m), "line=" + p, "scrolltop=" + (document.documentElement && document.documentElement.scrollTop || document.body && document.body.scrollTop || 0), "screen=" + screen.width + "x" + screen.height, "t=" + d].join("&");
            b = null
        }
    } (); (function() {
        _CTK5e17(28, "app.init"); (function(a) {
            if (/^(loaded|complete)$/.test(document.readyState)) {
                return a()
            }
            if (document.addEventListener) {
                return document.addEventListener("DOMContentLoaded", a, false)
            } (function() {
                try {
                    document.documentElement.doScroll("left");
                    a()
                } catch(e) {
                    setTimeout(arguments.callee, 0)
                }
            })()
        })(function() {
            _CTK5e17({
                time_12: 21,
                time_13: 20,
                time_4: 20,
                time_15: 17,
                time_6: 24,
                time_10: 24,
                time_9: 24,
                time_7: 25,
                time_8: 25,
                time_14: 19,
                time_0: 20,
                time_3: 18,
                time_11: 22,
                time_5: 23,
                time_1: 18
            },
            "app.timing.domready", "app.init", {
                autoGroup: "time"
            }); (function(a) {
                if (/^(loaded|complete)$/.test(document.readyState)) {
                    return a()
                }
                if (window.addEventListener) {
                    return window.addEventListener("load", a, false)
                }
                if (window.attachEvent) {
                    return window.attachEvent("onload", a)
                }
            })(function() {
                setTimeout(function() {
                    _CTK5e17({
                        time_5: 21,
                        time_8: 24,
                        time_14: 22,
                        time_7: 23,
                        time_6: 22,
                        time_11: 24,
                        time_4: 20,
                        time_10: 25,
                        time_12: 23,
                        time_9: 25,
                        time_13: 22,
                        time_16: 18,
                        time_15: 20,
                        time_17: 18,
                        time_3: 18
                    },
                    "app.timing.onload", "app.timing.domready", {
                        autoGroup: "time"
                    });
                    var a = window.performance && performance.memory && performance.memory.usedJSHeapSize;
                    if (a) {
                        _CTK5e17({
                            23 : 24,
                            24 : 25,
                            25 : 25,
                            26 : 22,
                            27 : 19
                        },
                        "app.memory.onload", "app.init", {
                            group: a <= 0 ? 0 : Math.floor(Math.log(a) / Math.log(2))
                        })
                    }
                },
                0)
            })
        })
    })();
    var defIns;
    function createLoader(a) {
        var e, r, t = [],
        n;
        return function(i, o) {
            if (o !== 0 && !o) {
                o = 1
            }
            if (o & 1 && !r) {
                r = true;
                a(function(a) {
                    e = a;
                    while (n = t.shift()) {
                        n && n.apply(null, [e])
                    }
                })
            }
            if (e !== undefined) {
                i && i.apply(null, [e]);
                return e
            }
            if (! (o & 2)) {
                i && t.push(i)
            }
            return e
        }
    }
    function addLis(a, e) {
        var r;
        while (r = a.shift()) {
            e.apply(null, r)
        }
    }
    function detectCss(a) {
        try {
            var e = document.createElement("div");
            e.className = "mdv1-" + a.replace(/\.css$/, "").replace(/\W+/g, "_");
            e.style.visibility = "hidden";
            e.style.position = "absolute";
            var r = document.body;
            if (!r) {
                return
            }
            r.insertBefore(e, r.firstChild);
            if (Math.round(e.offsetHeight / 7) == 1) {
                S.add(a,
                function() {
                    return 1
                })
            }
            var t = window.getComputedStyle(e, ":before").content;
            if (t) {
                S.each(t.split(","),
                function(a) {
                    S.add(a + ".css",
                    function() {
                        return 1
                    })
                })
            }
            r.removeChild(e)
        } catch(n) {}
    }
    function TMShop() {}
    window.TMShop = TMShop;
    S.mix(TMShop, {
        init: function(a, e) {
            var r, t, n = document.scripts || document.getElementsByTagName("script"),
            i = /.+\/tm\/shop\/([^\/]+)\//;
            for (var o = n.length - 1,
            s; o >= 0; o--) {
                var d = n[o].src,
                v,
                l = d.indexOf("??");
                if (l >= 0) {
                    v = d.substring(l + 2).split(",");
                    var c = d.substring(0, l);
                    for (s = v.length - 1; s >= 0; s--) {
                        v[s] = c + v[s]
                    }
                } else {
                    v = [d]
                }
                for (s = v.length - 1; s >= 0; s--) {
                    var p = i.exec(v[s]);
                    if (p) {
                        r = p[0];
                        t = p[1];
                        window.trackVersionShop = t + (window.trackTagShop ? "-" + window.trackTagShop: "");
                        break
                    }
                }
                if (r) {
                    break
                }
            }
            if (!S.Config.packages.mui) {
                S.config({
                    packages: [{
                        name: "mui",
                        path: "//g.tbcdn.cn",
                        charset: "utf-8",
                        combine: true
                    }]
                })
            }
            S.config({
                packages: [{
                    name: "shop",
                    path: r,
                    charset: "utf-8",
                    group: "group1",
                    ignorePackageNameInUri: true,
                    debug: true
                }],
                modules: {
                    "mui/sticky": {
                        path: "mui/sticky/1.0.2/sticky.js"
                    },
                    "mui/datalazyload": {
                        path: "mui/datalazyload/1.0.5/datalazyload.js"
                    },
                    "mui/datalazyload/webp": {
                        path: "mui/datalazyload/1.0.5/webp.js"
                    }
                }
            });
            if (S.version < "1.40") {
                S.config("modules", {
                    io: {
                        alias: ["ajax"]
                    }
                })
            }
            _CTK5e17(28, "app.init");
            e && e()
        },
        onMdv: function(a) {
            a(defIns || (defIns = new TMShop))
        }
    });
    S.augment(TMShop, {
        _mods: {},
        createLoader: createLoader,
        detectCss: detectCss,
        onDatalazyload: createLoader(function(a) {
            S.use("mui/datalazyload",
            function(e, r) {
                var t = new r(document.body, {
                    autoDestroy: false,
                    diff: {
                        top: 0,
                        bottom: 10
                    }
                });
                a(t)
            })
        }),
        onModInit: function(a, e, r) {
            if (!a || !e) {
                return
            }
            var t = S.isObject(a) ? a: this._mods[a];
            if (!t) {
                t = this._mods[a] = {}
            }
            if (t._mdvInit) {
                return t._mdvInit(e, r)
            }
            if (!t._mdvInitLis) {
                t._mdvInitLis = []
            }
            t._mdvInitLis.push([e, r])
        },
        onModCallback: function(a, e, r) {
            if (!a || !e) {
                return
            }
            var t = S.isObject(a) ? a: this._mods[a];
            if (!t) {
                t = this._mods[a] = {}
            }
            if (t._mdvCallback) {
                return t._mdvCallback(e, r)
            }
            if (!t._mdvCallbackLis) {
                t._mdvCallbackLis = []
            }
            t._mdvCallbackLis.push([e, r]);
            if (r !== 0 && !r) {
                r = 1
            }
            if (typeof a == "string" && r & 1) {
                this.addModule(a)
            }
        },
        addAlias: function(a, e) {
            var r = this;
            r._mods[a] = S.isObject(e) ? e: r._mods[e]
        },
        addModule: function(a, e, r) {
            var t = this,
            n = {
                _mdvInit: createLoader(function(t) {
                    t({
                        name: a,
                        cfg: r || {},
                        loader: e
                    })
                }),
                _mdvCallback: createLoader(function(a) {
                    n._mdvInit(function(e) {
                        var r = e.loader ||
                        function() {
                            var r = e.name.replace(/index(?:\.js)?$/, "");
                            detectCss(r + "index.css");
                            S.use(r,
                            function(r, n) {
                                if (n.initView) {
                                    return n.initView(null, e.cfg, t, a)
                                }
                                if (n.init) {
                                    n.init(e.cfg)
                                }
                                a(n)
                            })
                        };
                        r(a)
                    })
                })
            };
            var i = this._mods[a];
            if (i && i._mdvInitLis) {
                addLis(i._mdvInitLis, n._mdvInit);
                i._mdvInitLis = 0
            }
            if (i && i._mdvCallbackLis) {
                addLis(i._mdvCallbackLis, n._mdvCallback);
                i._mdvCallbackLis = 0
            }
            return this._mods[a] = n
        },
        addElement: function(ele, cls, cfg) {
            var self = this;
            function each(a, e) {
                if (S.isArray(a)) {
                    return S.each(a, e)
                }
                if (typeof a === "string") {
                    S.use("dom",
                    function(r, t) {
                        r.each(t.query(a), e)
                    });
                    return
                }
                return e(a)
            }
            each(ele,
            function(el) {
                if (!el._mdvCallback) {
                    var modCls = cls || el.getAttribute("mdv-cls");
                    if (modCls) {
                        el._mdvInit = createLoader(function(callback) {
                            _CTK5e17({
                                "charity/components/detailModule/index": 24,
                                "shop/head/search/": 27,
                                "shop/dc/header/": 27,
                                "shop/head/qrcode/": 27,
                                "shop/dc/topRight/": 27,
                                "shop/dc/headArchive/": 27,
                                "shop/head/main/": 27,
                                "malldetail/view/tmsBlock": 27,
                                "shop/brandDetail/brandShare/": 19,
                                "shop/dc/bottomRight/": 25,
                                "shop/dc/footer/": 23,
                                "shop/dc/left/": 27,
                                "shop/head/shopinfo/": 27,
                                "brand-m/mods/global/seckill/seckill": 17,
                                "shop/productList/itemsfloor/index": 18,
                                "shop/shopDetail/coupon/index": 17,
                                "brandstreet-m/mods/subject/subject": 18,
                                "brand-m/mods/global/header/header": 17,
                                "brand-m/mods/global/goods/goods": 17,
                                "shop/shopDetail/topbanner/index": 17,
                                "brandstreet-m/mods/fashion/subject": 17,
                                "brandstreet-m/mods/header/header": 18,
                                "brandstreet-m/mods/fashion/channel": 18,
                                "brandstreet-m/mods/fashion/video": 17,
                                "brandstreet-m/mods/fashion/feed": 18
                            },
                            "mdv.init", "app.init", {
                                group: modCls
                            });
                            S.use("dom",
                            function(S, DOM) {
                                if (!/\s+t(m|b)-\S+/.test(DOM.attr(el, "class")) && DOM.parent(el, ".tb-shop")) {
                                    return _CTK5e17(20, "mdv.forbid", "mdv.init")
                                }
                                var modCfg = DOM.attr(el, "mdv-cfg");
                                DOM.removeAttr(el, "mdv-cls");
                                DOM.removeAttr(el, "mdv-cfg");
                                try {
                                    modCfg = modCfg ? eval("(" + modCfg + ")") : {}
                                } catch(err) {
                                    modCfg = {};
                                    setTimeout(function() {
                                        throw err
                                    },
                                    0)
                                }
                                S.mix(modCfg, cfg);
                                callback({
                                    el: el,
                                    cls: modCls,
                                    cfg: modCfg
                                })
                            })
                        });
                        el._mdvCallback = createLoader(function(a) {
                            el._mdvInit(function(e) {
                                var r = e.cls.replace(/index(?:\.js)?$/, "");
                                detectCss(r + "index.css");
                                S.use(r,
                                function(r, t) {
                                    t.initView(el, e.cfg, self, a);
                                    _CTK5e17({
                                        "shop/dc/bottomRight/": 25,
                                        "shop/brandDetail/brandShare/": 19,
                                        "shop/head/main/": 27,
                                        "shop/dc/header/": 27,
                                        "shop/dc/footer/": 23,
                                        "shop/head/shopinfo/": 27,
                                        "shop/dc/headArchive/": 27,
                                        "shop/head/search/": 27,
                                        "shop/head/qrcode/": 27,
                                        "shop/dc/left/": 27,
                                        "charity/components/detailModule/index": 25,
                                        "shop/dc/topRight/": 27,
                                        "brand-m/mods/global/seckill/seckill": 17,
                                        "malldetail/view/tmsBlock": 27,
                                        "brand-m/mods/global/header/header": 17,
                                        "brand-m/mods/global/goods/goods": 17,
                                        "shop/productList/itemsfloor/index": 18,
                                        "shop/shopDetail/topbanner/index": 17,
                                        "shop/shopDetail/coupon/index": 17,
                                        "brandstreet-m/mods/fashion/channel": 18,
                                        "brandstreet-m/mods/fashion/feed": 18,
                                        "brandstreet-m/mods/header/header": 18,
                                        "brandstreet-m/mods/fashion/video": 17,
                                        "brandstreet-m/mods/fashion/subject": 17,
                                        "brandstreet-m/mods/subject/subject": 17
                                    },
                                    "mdv.callback", "mdv.init", {
                                        group: e.cls
                                    })
                                })
                            })
                        });
                        if (el._mdvInitLis) {
                            addLis(el._mdvInitLis, el._mdvInit);
                            el._mdvInitLis = 0
                        }
                        if (el._mdvCallbackLis) {
                            addLis(el._mdvCallbackLis, el._mdvCallback);
                            el._mdvInitLis = 0
                        }
                        if (!self._mods[modCls] || !self._mods[modCls]._mdvCallback) {
                            self.addModule(modCls, el._mdvCallback)
                        }
                    }
                }
                if (el._mdvCallback) {
                    self.onDatalazyload(function(a) {
                        a.addCallback(el,
                        function() {
                            S.use("dom",
                            function(a, e) {
                                if (e.css(el, "display") == "none") {
                                    return false
                                }
                                el._mdvCallback()
                            })
                        })
                    })
                }
            })
        }
    });
    S.add("shop/app",
    function() {
        return TMShop
    })
})(KISSY);