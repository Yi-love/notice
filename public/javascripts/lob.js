!
function(a) {
    "function" == typeof define && define.cmd ? define(function(b, c, d) {
        d.exports = a
    }) : "function" == typeof define && define.amd ? define(function() {
        return a
    }) : "undefined" != typeof KISSY && "function" == typeof KISSY.add ? KISSY.add(function() {
        return a
    }) : window.Lob = a
} (function() {
    function a(a) {
        this._init(a),
        this.ifReady = !1,
        this.readyCallBack = null
    }
    return function(a) {
        function b() {}
        function c(b, c) {
            return a.isObject(c) && (c = a.param(c)),
            (b + "&" + (c || "")).replace(/[&?]{1,2}/, "?")
        }
        function d(a) {
            return a && ("text/html" === a ? "html": "application/json" === a ? "json": /^(?:text|application)\/javascript/i.test(a) ? "script": /^(?:text|application)\/xml/i.test(a) && "xml") || "text"
        }
        function e() {
            return window.ActiveXObject ? new window.ActiveXObject("Microsoft.XMLHTTP") : new window.XMLHttpRequest
        }
        function f(d, e) {
            function f() {
                m.remove(),
                clearTimeout(g),
                delete window[l]
            }
            var g, h = a.Deferred(),
            i = e.data,
            j = e.jsonp,
            k = e.context,
            l = e.jsonpCallback || a.guid("jsonp"),
            m = document.createElement("script"),
            n = document.getElementsByTagName("head")[0] || document.documentElement;
            return i[j] = l,
            window[l] = function(a) {
                f(),
                h.resolveWith(k, [a, "success"])
            },
            m.onerror = function() {
                f(),
                h.rejectWith(k, ["error"])
            },
            m.src = c(d, i),
            e.timeout > 0 && (g = setTimeout(function() {
                m.remove(),
                l in window && (window[l] = b),
                h.rejectWith(k, ["timeout"])
            },
            e.timeout)),
            n.insertBefore(m, n.firstChild),
            h.promise()
        }
        function g(g, i) {
            a.isObject(g) && (i = g, g = i.url),
            i = a.merge(h, i || {});
            var j, k, l, m = a.Deferred(),
            n = i.context,
            o = i.dataType,
            p = a.param(i.data),
            q = i.contentType,
            r = i.crossDomain,
            s = i.type.toUpperCase(),
            t = {};
            return "jsonp" === o ? f(g, i) : (l = e(), k = i.accepts[o], r || (r = /^([\w-]+:)?\/\/([^\/]+)/.test(g) && RegExp.$2 != window.location.host), r || (t["X-Requested-With"] = "XMLHttpRequest"), k && (t.Accept = k, ~k.indexOf(",") && (k = k.split(",", 2)[0]), l.overrideMimeType && l.overrideMimeType(k)), (q || p && "GET" !== s) && (t["Content-Type"] = q || "application/x-www-form-urlencoded"), "GET" === s && (g = c(g, p)), l.onreadystatechange = function() {
                if (4 == l.readyState) {
                    var b, c = l.status;
                    if (clearTimeout(j), c >= 200 && 300 > c || 304 == c) {
                        b = l.responseText,
                        o = o || d(l.getResponseHeader("content-type"));
                        try {
                            switch (o) {
                            case "script":
                                (1, eval)(b);
                                break;
                            case "xml":
                                b = l.responseXML;
                                break;
                            case "json":
                                b = /^\s*$/.test(b) ? null: a.parseJSON(b)
                            }
                        } catch(e) {
                            m.rejectWith(n, [e, "parsererror"])
                        }
                        m.resolveWith(n, [b, "success"])
                    } else m.rejectWith(n, [null, "error"])
                }
            },
            l.open(s, g, i.async), a.each(t,
            function(a, b) {
                l.setRequestHeader(b, a)
            }), i.timeout > 0 && (j = setTimeout(function() {
                l.onreadystatechange = b,
                l.abort(),
                m.rejectWith(n, [null, "timeout"])
            },
            i.timeout)), l.send(p || null), m.promise())
        }
        var h = {
            data: {},
            timeout: 0,
            async: !0,
            type: "GET",
            context: {},
            jsonp: "callback",
            crossDomain: !1,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript"
            }
        };
        a.ajax = g,
        a.jsonp = f
    } (a),
    function(a) {
        function b() {
            function b(a) {
                for (var b; (b = a.shift()) || (b = h.always.shift());) setTimeout(function(a) {
                    return function() {
                        a.apply(c, i)
                    }
                } (b), 0)
            }
            var c, d = "done",
            e = "fail",
            f = "pending",
            g = f,
            h = {
                done: [],
                fail: [],
                always: []
            },
            i = [];
            return {
                done: function(a) {
                    return g === d && setTimeout(function() {
                        a.apply(c, i)
                    },
                    0),
                    g === f && h.done.push(a),
                    this
                },
                fail: function(a) {
                    return g === e && setTimeout(function() {
                        a.apply(c, i)
                    },
                    0),
                    g === f && h.fail.push(a),
                    this
                },
                always: function(a) {
                    return g !== f ? void setTimeout(function() {
                        a.apply(c, i)
                    },
                    0) : (h.always.push(a), this)
                },
                then: function(b, c) {
                    return a.isFunction(b) && this.done(b),
                    a.isFunction(c) && this.fail(c),
                    this
                },
                resolve: function() {
                    return this.resolveWith({},
                    arguments),
                    this
                },
                resolveWith: function(a, e) {
                    return g !== f ? this: (g = d, c = a || this, i = [].slice.call(e || []), b(h.done), this)
                },
                reject: function() {
                    return this.rejectWith({},
                    arguments),
                    this
                },
                rejectWith: function(a, d) {
                    return g !== f ? this: (g = e, c = a || this, i = [].slice.call(d || []), b(h.fail), this)
                },
                state: function() {
                    return g
                },
                promise: function() {
                    var b = {},
                    c = this,
                    d = a.keys(this);
                    return a.each(d,
                    function(a) {
                        "resolve" !== a && "reject" !== a && (b[a] = c[a])
                    }),
                    b
                }
            }
        }
        function c(c) {
            var d, e, f = 0;
            return a.isArray(c) || (c = [].slice.call(arguments)),
            d = b(),
            (e = c.length) ? (a.each(c,
            function(a) {
                a.fail(function() {
                    d.reject()
                }).done(function() {++f === e && d.resolve()
                })
            }), d.promise()) : d.resolve().promise()
        }
        a.Deferred = b,
        a.when = c
    } (a),
    function(a) {
        var b = {
            on: function(b, c) {
                if (!a.isFunction(c)) throw new Error("callback is not a function");
                return this._callback = this._callback || {},
                this._callback[b] = this._callback[b] || [],
                this._callback[b].push(c),
                this
            },
            detach: function(b, c) {
                if (this._callback = this._callback || {},
                b) if (c) {
                    if (this._callback[b] && this._callback[b].length > 0) {
                        var d = a.indexOf(c, this._callback[b]); - 1 != d && this._callback[b].splice(d, 1)
                    }
                } else this._callback[b] = [];
                else this._callback = {};
                return this
            },
            fire: function(b, c) {
                if (this._callback) {
                    var d = this._callback[b];
                    if (d && d.length > 0) {
                        c = c || {},
                        c.type = b,
                        c.target = this;
                        for (var e = d.length - 1; e >= 0; e--) a.isFunction(d[e]) && d[e].call(this, c)
                    }
                }
                return this
            }
        };
        a.Event = b
    } (a),
    function(a) {
        function b(a) {
            return function(b) {
                return {}.toString.call(b) === "[object " + a + "]"
            }
        }
        function c(a) {
            return (a || "") + q++
        }
        function d(b) {
            var c = Object.keys,
            d = [];
            if (a.isObject(b)) if (c) d = c(b);
            else for (var e in b) b.hasOwnProperty(e) && d.push(e);
            return d
        }
        function e(b, c, d, f) {
            for (var g in c) c.hasOwnProperty(g) && (g in b ? d && (f && a.isObject(b[g]) && a.isObject(c[g]) ? e(b[g], c[g], d, f) : b[g] = c[g]) : b[g] = c[g]);
            return b
        }
        function f(b) {
            var c, d, e = {};
            for (a.isArray(b) || (b = [].slice.call(arguments)), c = 0, d = b.length; d > c; c++) a.mix(e, b[c], !0);
            return e
        }
        function g(b, c) {
            var e, f, g;
            if (a.isArray(b)) for (e = 0, f = b.length; f > e && c(b[e], e, b) !== !1; e++);
            else for (g = d(b), e = 0, f = g.length; f > e && c(b[g[e]], g[e], b) !== !1; e++);
        }
        function h(b, c, d, e) {
            function f(b, c) {
                c = a.isFunction(c) ? c() : c || "",
                a.isObject(c) || g.push(encodeURIComponent(b) + d + encodeURIComponent(c + ""))
            }
            c = c || "&",
            d = d || "=",
            a.isUndefined(e) && (e = !0);
            var g = [];
            return a.each(b,
            function(b, c) {
                a.isArray(b) ? a.each(b,
                function(a) {
                    f(e ? c + "[]": c, a)
                }) : f(c, b)
            }),
            g.join(c)
        }
        function i(a) {
            var b = String.prototype.trim;
            return a = a || "",
            b ? b.call(a) : a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
        }
        function j(b) {
            var c = /^[\],:{}\s]*$/,
            d = /(?:^|:|,)(?:\s*\[)+/g,
            e = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
            f = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g;
            if (!b || !a.isString(b)) return null;
            if (b = a.trim(b), window.JSON && window.JSON.parse) return window.JSON.parse(b);
            if (c.test(b.replace(e, "@").replace(f, "]").replace(d, ""))) return new Function("return " + b)();
            throw new Error("Invalid JSON: " + b)
        }
        function k(b) {
            if (null == b) return ! 0;
            if (a.isArray(b) || a.isString(b)) return 0 === b.length;
            for (var c in b) if (b.hasOwnProperty(c)) return ! 1;
            return ! 0
        }
        function l(a, b) {
            var c = Object.hasOwnProperty;
            return c.call(a, b)
        }
        function m(b, c) {
            return a.isArray(c) ? c.indexOf(b) : -1
        }
        function n(a, b) {
            return a === b
        }
        function o() {}
        function p(a, b) {
            for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
            return a
        }
        var q = 0;
        a.isObject = b("Object"),
        e(a, {
            mix: e,
            keys: d,
            each: g,
            guid: c,
            trim: i,
            param: h,
            merge: f,
            has: l,
            indexOf: m,
            clone: o,
            isEqual: n,
            extend: p,
            isEmpty: k,
            isString: b("String"),
            isFunction: b("Function"),
            isUndefined: b("Undefined"),
            isArray: Array.isArray || b("Array"),
            parseJSON: j
        })
    } (a),
    function() {
        "use strict"
    } (a),
    function(b) {
        "use strict";
        var c = function(a) {
            this.data = a
        };
        c.prototype = {
            getData: function() {
                return this.data
            },
            getInnerGlobal: function() {
                return this.data.innerGlobal
            },
            getGlobal: function() {
                return this.data.global
            },
            getInner: function() {
                return this.data.inner
            },
            getExcludeTip: function() {
                return this.data.excludeTip
            },
            isInnerGlobal: function(a) {
                var b = this.getInnerGlobal();
                return this.getExudeKey(b, a)
            },
            isGlobal: function(a) {
                var b = this.getGlobal();
                return this.getExudeKey(b, a)
            },
            isInner: function(a) {
                var b = this.getInner();
                return this.getExudeKey(b, a)
            },
            getExudeKey: function(a, c) {
                var d = !1;
                return b.each(a,
                function(a, b) { (b === c || a == c) && (d = !0)
                }),
                d
            }
        },
        a.Excludes = function(a) {
            return new c(a)
        }
    } (a),
    function(a) {
        "use strict";
        var b = function(a, b) {
            this.data = a,
            this.instance = b
        };
        b.prototype = {
            getData: function() {
                return this.data
            },
            setData: function(a) {
                this.data = a
            },
            getStructure: function(b) {
                var c = [],
                d = [],
                e = this;
                return b = b || "confirmCart",
                b = "root" == b ? this.data.root: b,
                c = this.data.structure[b] || [],
                arguments[1] && arguments[1] === !0 ? c: (a.each(c,
                function(a) {
                    d.push(e.instance.data(a))
                }), d)
            },
            getStructureAllItem: function() {
                var b = this,
                c = [],
                d = b.data.structure || [];
                return a.each(d,
                function(a, d) {
                    {
                        var e = b.instance.data(d),
                        f = e.tag;
                        e.guid
                    }
                    "item" == f && c.push(e)
                }),
                c
            },
            getStructureSubset: function(a) {
                var b = this.data,
                c = b.structure;
                return a = a || "confirmCart",
                a = "root" == a ? this.data.root: a,
                c[a]
            },
            getStructureSibling: function(a) {
                var b = this.data,
                c = b.structure,
                d = [];
                a = a || "confirmCart",
                a = "root" == a ? this.data.root: a;
                for (var e in c) for (var f in c[e]) c[e][f] === a && (d = c[e]);
                return d
            },
            getParentStructure: function(a) {
                var b = this,
                c = this.data,
                d = c.structure,
                e = {};
                a = a || "confirmCart",
                a = "root" == a ? this.data.root: a;
                for (var f in d) for (var g in d[f]) d[f][g] === a && (e = b.instance.data(f));
                return e
            },
            getComponent: function() {
                return this.data.component || []
            },
            getGroups: function() {
                return this.data.groups || []
            },
            getControlParas: function() {
                return this.instance._data.controlParas || {}
            },
            getSettlementAlone: function() {
                var a = this.getControlParas();
                return a.isSettlementAlone
            },
            getOrderByH5Urls: function() {
                var a = this.getControlParas();
                return a.orderByH5Urls
            },
            getRootModel: function() {
                var a = this.data.root || "";
                return "" != a ? this.instance.data(a) : null
            }
        },
        a.Hierarchy = function(a, c) {
            return new b(a, c)
        }
    } (a),
    function(b) {
        "use strict";
        function c(a) {
            this._data = a,
            this.tag = a.tag,
            this.guid = a.id,
            this.guid.indexOf("item_") >= 0 && (this.needRequest = !0),
            this.randomId = b.guid(this.tag),
            this.structure = {},
            this.attributes = a.fields,
            this.initialize.apply(this, arguments)
        }
        var d, e = function(a, b) {
            d = this,
            this._data = a,
            this.intance = a.data,
            this.excludes = a.excludes,
            this.lob = b,
            b = b,
            this._initialize()
        };
        e.prototype = {
            _initialize: function() {
                var a = this;
                a.COMPONENT_MODEL_CACHE = {},
                a.ITEM_CHECKED = {},
                a.ITEM_CARTIDS = [],
                a.ITEM_SETLT = [],
                a.ITEM_IDS = [],
                a.ITEM_RXCLUDE = [],
                a.ITEM_CARTPARAM = [],
                a.ITEM_TIPS = "",
                b.each(a.intance,
                function(b, d) {
                    var e = new c(b);
                    a.COMPONENT_MODEL_CACHE[d] = e
                })
            },
            data: function(a, b, c) {
                var d = this.COMPONENT_MODEL_CACHE[a];
                if (!d) {
                    if (!c) throw new Error("No such component named " + a);
                    d = this.COMPONENT_MODEL_CACHE[a] = c
                }
                return b && d.set(b),
                d
            },
            getModelsByStructure: function(a) {
                var c = this,
                d = {};
                return b.isArray(a) ? (b.each(a,
                function(a) {
                    d[a] = c.CACHE[a]
                }), d) : void 0
            },
            async: function(a, c) {
                var e = this,
                f = new b.Deferred,
                g = {},
                h = {},
                i = b.extend({},
                e.ITEM_CHECKED),
                j = e.intance[a],
                k = (j.tag, j.fields),
                l = k.bundleId,
                m = k.valid,
                n = k.cartId,
                o = (k.settlement, k.h5CartParam),
                p = (e.ITEM_CARTIDS.indexOf(n), o && e.ITEM_CARTPARAM.indexOf(o));
                if (c && (1 == m || "true" == m)) {
                    var q = d.lob.hierarchy,
                    r = q.getStructureSibling(a);
                    for (var s in r) {
                        var t = r[s]; ! i[t] && e.COMPONENT_MODEL_CACHE[t] && (i[t] = d.data(t)._data)
                    }
                }
                if ("invalid" === l) {
                    var u = this.getAllInvalidData(a);
                    g = b.extend(i, u)
                } else g[a] = this.getSimplifyData(a),
                h[c] = [],
                h[c].push(a),
                g = b.extend(i, g);
                b.each(g,
                function(a, b) {
                    g[b] = e.getSimplifyData(b)
                });
                var v = k.isRelationItem,
                w = d.lob.hierarchy.getStructureSibling(a);
                1 != m && "true" != m || "deleteSome" !== c || !v || "true" != v && 1 != v ? "invalid" === l && "deleteInvalid" === c && (h[c] = d.lob.hierarchy.getStructureSubset(a)) : h[c] = b.extend(w, h[c]);
                var s = {
                    data: g,
                    operate: h
                };
                return e.operate = h[c],
                b.ajax({
                    url: "",
                    type: "post",
                    dataType: "json",
                    data: {
                        p: JSON.stringify(s),
                        extStatus: 0,
                        feature: '{"gzip":false}'
                    },
                    success: function(b) {
                        var g = e.intance[a],
                        h = g.fields,
                        i = g.fields.cartId,
                        j = e.ITEM_CARTIDS.indexOf(i);
                        if (b.data) if (b.reload === !0) e.lob.reload(b);
                        else {
                            var k = (e.data("realPay"), e.data("checkAll")),
                            l = e.data("submit"),
                            m = k._data.fields.checked;
                            if ("deleteSome" === c && j >= 0 && (e.ITEM_CARTIDS.splice(j, 1), e.ITEM_SETLT.splice(j, 1), e.ITEM_IDS.splice(j, 1), e.ITEM_RXCLUDE.splice(j, 1), o && e.ITEM_CARTPARAM.splice(p, 1), delete e.ITEM_CHECKED[a]), "deleteSome" === c || "deleteInvalid" === c) {
                                e.lob.pageMeta.data.totalCount -= e.operate.length;
                                for (var n = e.lob.hierarchy.data.structure,
                                q = e.lob.hierarchy.getParentStructure(a), r = q.guid, s = n[r], j = s.indexOf(a), t = 0; t < e.operate.length; t++) {
                                    var u = e.operate[t];
                                    e.lob.hierarchy.data.structure[r].splice(j, 1),
                                    delete e.lob.instance.intance[u],
                                    d._deleteModelByGuid(u)
                                }
                                e.lob.hierarchyReload(e.lob.hierarchy)
                            }
                            if (e._update.call(e, b.data, a), "update" === c) {
                                var g = e.intance[a] || {},
                                h = g.fields;
                                j >= 0 && (e.ITEM_SETLT.splice(j, 1), e.ITEM_CARTIDS.splice(j, 1)),
                                (h.checked === !0 || "true" === h.checked) && (e.ITEM_SETLT.push(h.settlement), e.ITEM_CARTIDS.push(i)),
                                l.set("number", e.ITEM_IDS.length)
                            }
                            "deleteSome" === c && (console.log(e.ITEM_CHECKED), l.set("number", e.ITEM_IDS.length)),
                            k.set("checked", m, "all")
                        }
                        f.resolve(b)
                    },
                    error: function(a) {
                        f.rejectWith(a)
                    }
                },
                e.lob),
                f.promise()
            },
            clearItemData: function() {
                var a = this;
                a.ITEM_CHECKED = {},
                a.ITEM_CARTIDS = [],
                a.ITEM_SETLT = [],
                a.ITEM_IDS = [],
                a.ITEM_RXCLUDE = [],
                a.ITEM_CARTPARAM = [],
                a.ITEM_TIPS = ""
            },
            getSimplifyData: function(a) {
                var b = this,
                c = b.intance[a],
                d = c.fields,
                e = d.itemId,
                f = d.cartId,
                g = d.bundleId,
                h = d.skuId,
                i = d.valid,
                j = d.quantity,
                k = d.checked,
                l = d.shopId;
                return c.fields = {},
                c.fields.itemId = e,
                c.fields.cartId = f,
                c.fields.bundleId = g,
                c.fields.skuId = h,
                c.fields.valid = i,
                c.fields.checked = k,
                c.fields.shopId = l,
                c.fields.quantity = j,
                c
            },
            getAllInvalidData: function(a) {
                for (var b = d.lob.hierarchy.getStructureSubset(a), c = {},
                e = 0; e < b.length; e++) {
                    var f = b[e],
                    g = d.lob.hierarchy.getStructure(f);
                    c[f] = g
                }
                return c
            },
            refreshRelation: function(a, c, e) {
                var f = this,
                g = f.data(a),
                h = g._data,
                i = g.tag,
                j = h.id,
                k = {};
                k[a] = h,
                f._update(k),
                "item" === i && f._updatePrice(a, c);
                var l = d.lob.hierarchy.getStructureSibling(a),
                m = f.data("checkAll");
                if ("shop" === i) {
                    if (m.set("checked", !1, "checkAll"), !c) for (var n in l) {
                        var j = l[n];
                        if ("order" === d.lob.data(j).tag) {
                            var o = d.lob.hierarchy.getStructureSubset(j);
                            for (var p in o) {
                                var j = o[p],
                                q = f.data(j);
                                h.fields.checked === !0 || "true" === h.fields.checked ? (q._data.fields.checked === !1 || "false" === q._data.fields.checked) && q.set("checked", !0, "shopAll",
                                function(a) {
                                    e && e(a)
                                }) : (q._data.fields.checked === !0 || "true" === q._data.fields.checked) && q.set("checked", !1, "shopAll")
                            }
                        }
                    }
                } else if ("item" === i) {
                    var r = !0,
                    s = d.lob.hierarchy.getParentStructure(a),
                    t = s.guid,
                    u = d.lob.hierarchy.getStructureSibling(t),
                    v = s._data.fields.isRelationItem;
                    for (var n in l) {
                        var j = l[n];
                        f.ITEM_CHECKED[j] || (r = !1)
                    }
                    for (var p in u) {
                        var j = u[p],
                        q = f.data(j),
                        w = q._data.fields.checked;
                        "shop" === q.tag && (c || 1 != v && "true" != v ? r ? q.set("checked", !0, null,
                        function(a) {
                            e && e(a)
                        }) : (!c && w === !0 || "true" === w) && q.set("checked", !1, "shopAll") : w === !1 || "false" === w ? q.set("checked", !0, null) : (w === !0 || "true" === w) && q.set("checked", !1, null))
                    }
                } else if (!c && "checkAll" === i) {
                    var x = (f._data.data, f.data(a)),
                    y = x._data.fields.checked,
                    z = f.lob.instance.intance,
                    A = f.data("realPay"),
                    B = f.data("submit");
                    "true" == y || 1 == y ? (A.setView("price", "0"), B.setView("number", "0")) : (A.set({
                        price: "0",
                        priceTitle: "\uffe50"
                    }), B.set("number", "0"), f.clearItemData()),
                    b.each(z,
                    function(a, b) {
                        var c = f.data(b),
                        d = c.tag,
                        g = c._data.fields,
                        h = g.valid,
                        i = g.checked;
                        "item" == d && "false" !== h && h !== !1 ? (c.setView("checked", y), i !== !0 && "true" !== i && f._updatePrice(b, "all"), f.refreshMutex(b, null, e)) : "shop" == d && c.setView("checked", y)
                    })
                }
            },
            refreshMutex: function(a, b, c) {
                var d = this,
                e = d.data(a),
                f = e._data,
                g = f.fields,
                h = (g.checked, f.tag),
                i = (g.exclude, g.mutex, d.lob.excludes);
                if ("item" === h) {
                    var j = d.ITEM_CHECKED,
                    k = i.getExcludeTip(),
                    l = {},
                    m = 0,
                    n = !1;
                    for (var o in j) {
                        var p = j[o],
                        q = (p._data, p.fields),
                        r = q.exclude,
                        s = q.mutex;
                        l[r] || (l[r] = {},
                        m++),
                        l[r][s] = s
                    }
                    for (var t in l) {
                        var u = l[t],
                        v = k[t],
                        w = "",
                        x = 0;
                        if (n) return;
                        for (var y in u) if (x++, d.ITEM_TIPS = "", i.isInnerGlobal(t, u[y])) {
                            if (x > 1) return d.ITEM_TIPS = v,
                            void(c && c({
                                message: v
                            }));
                            if (m > 1) return d.ITEM_TIPS = v,
                            void(c && c({
                                message: v
                            }))
                        } else if (i.isGlobal(t, u[y])) {
                            if (m > 1) return d.ITEM_TIPS = v,
                            void(c && c({
                                message: v
                            }))
                        } else if (i.isInner(t, u[y])) {
                            if (w && u[y] !== w) return d.ITEM_TIPS = v,
                            c && c({
                                message: v
                            }),
                            void(w = u[y]);
                            w = u[y]
                        }
                    }
                }
            },
            getData: function() {
                return this.intance
            },
            getCartIds: function() {
                return this.ITEM_CARTIDS
            },
            getSettlement: function() {
                return this.ITEM_SETLT
            },
            getItemIds: function() {
                return this.ITEM_IDS
            },
            setData: function(a) {
                this.intance = a
            },
            _updatePrice: function(a, b) {
                var c = this,
                d = c.data(a),
                e = d._data,
                f = e.fields,
                g = e.tag,
                h = e.id;
                if ("item" === g) {
                    var i = h.split("item_")[1],
                    j = this.data("itemPay_" + i),
                    k = this.data("realPay"),
                    l = this.data("submit"),
                    m = this.data("checkAll"),
                    n = this.data("quantity_" + i),
                    o = j._data.fields.favorablePrice,
                    p = k._data.fields.price,
                    q = Number(n._data.fields.quantity),
                    r = f.cartId,
                    s = f.settlement,
                    t = f.h5CartParam;
                    if (1 == e.fields.checked || "true" == e.fields.checked) o = -o,
                    c.ITEM_CHECKED[a] = e,
                    c.ITEM_CARTIDS.push(r),
                    c.ITEM_SETLT.push(s),
                    c.ITEM_IDS.push(e.id),
                    c.ITEM_RXCLUDE.push(f.exclude),
                    t && c.ITEM_CARTPARAM.push(t);
                    else {
                        var u = c.ITEM_CARTIDS.indexOf(r),
                        v = c.ITEM_CARTPARAM.indexOf(t);
                        c.ITEM_CARTIDS.splice(u, 1),
                        c.ITEM_SETLT.splice(u, 1),
                        c.ITEM_IDS.splice(u, 1),
                        c.ITEM_RXCLUDE.splice(u, 1),
                        t && c.ITEM_CARTPARAM.splice(v, 1),
                        delete c.ITEM_CHECKED[a],
                        (!b && 1 == m._data.fields.checked || "true" == m._data.fields.checked) && m.set("checked", !1, "checkAll")
                    }
                    p -= o * q,
                    k.set({
                        priceTitle: "\uffe5" + (p / 100).toFixed(2),
                        price: p
                    }),
                    l.set("number", c.ITEM_IDS.length)
                }
            },
            _deleteModelByGuid: function(a) {
                var c = this.COMPONENT_MODEL_CACHE[a],
                d = c.tag;
                c && (b.each(this.COMPONENT_MODEL_CACHE,
                function(b, e) {
                    if (e !== a && b.structure[a]) {
                        delete b.structure[a];
                        var f = b.structure[d].indexOf(c);
                        b.strcture[d].splice(f, 1),
                        b.fire("remove", {
                            guid: a,
                            model: c
                        })
                    }
                }), c.fire("destroy"), delete this.COMPONENT_MODEL_CACHE[a])
            },
            _addModel: function(a, b) {
                var d = this,
                e = d.COMPONENT_MODEL_CACHE[a];
                if (!e) throw new Error("no parentModel named " + a);
                var f = new c(b),
                g = f.guid,
                h = f.tag;
                return this.COMPONENT_MODEL_CACHE[g] = f,
                e.structure[g] = f,
                e.structure[h] = e.structure[h] || [],
                e.structure[h].push(f),
                e.fire("add", {
                    guid: g,
                    model: f
                }),
                f
            },
            _orderRelation: function(a) {
                var c = [],
                d = [];
                b.each(a,
                function(a, b) {
                    c.push(b)
                });
                var e = function(c, f) {
                    if (! (f.length <= 0)) {
                        var g = f[c];
                        b.each(f,
                        function(d, h) {
                            h !== c && b.indexOf(g, a[d]) > -1 && e(h, f)
                        }),
                        d.unshift(g),
                        f.splice(c, 1),
                        e(0, f)
                    }
                };
                return e(0, c),
                d
            },
            _update: function(a) {
                var c = this;
                b.each(a,
                function(a, b) {
                    var d = c.data(b, null, a),
                    e = ["item", "bundlePay", "realPay", "bundleQuantity", "quantity", "shop", "checkAll", "submit"];
                    c.intance[b] = a,
                    d.update(a),
                    e.indexOf(d.tag) >= 0 && d.fire("change")
                })
            }
        },
        a.Instance = function(a, b) {
            return new e(a, b)
        },
        b.mix(c.prototype, b.Event),
        b.mix(c.prototype, {
            initialize: function() {},
            update: function(a) {
                return this._data = a,
                this.attributes = a.fields,
                this
            },
            get: function(a) {
                return this.attributes[a]
            },
            setView: function(a, c) {
                var e, f, c, g = [];
                "object" == typeof a ? (e = a, callback = c, errorCallback = callback) : (e = {})[a] = c;
                for (f in e) c = e[f],
                b.isEqual(c, this.attributes[f]) || (g[f] = c);
                for (f in g) this.attributes[f] = g[f],
                d.intance[this.guid].fields[f] = g[f]
            },
            set: function(a, c, e, f, g) {
                var h, i, c, j = [];
                "object" == typeof a ? (h = a, f = c, g = f) : (h = {})[a] = c;
                for (i in h) c = h[i],
                b.isEqual(c, this.attributes[i]) || (j[i] = c);
                for (i in j) this.attributes[i] = j[i],
                d.intance[this.guid].fields[i] = j[i];
                return e && "deleteSome" === e || "update" === e || "deleteInvalid" === e ? d.async(this.guid, e).then(function(a) {
                    b.isFunction(f) && f.call(this, a)
                }).fail(function(a) {
                    b.isFunction(g) && g.call(this, a)
                }) : (d.refreshRelation(this.guid, e, f), void d.refreshMutex(this.guid, e, f))
            },
            toJSON: function() {
                return b.clone(this.attributes)
            }
        }),
        c.extend = b.extend,
        b.Model = c
    } (a),
    function(b) {
        "use strict";
        var c = function(a) {
            this.data = a
        };
        c.prototype = {
            getData: function() {
                return this.data
            },
            setData: function(a) {
                this.data = a
            },
            mixData: function(a) {
                b.mix(this.data, a, !0)
            },
            getPostLinkage: function() {
                var a = {};
                return a.signature = this.data.signature,
                a.common = this.data.common,
                a
            },
            getInterfaceUrl: function() {
                return this.data.url || ""
            },
            getRequest: function() {
                return this.data.request || []
            },
            getRelation: function() {
                return this.data.relation || []
            },
            getInput: function() {
                return this.data.input || []
            }
        },
        a.Linkage = function(a) {
            return new c(a)
        }
    } (a),
    function() {
        "use strict";
        var b = function(a) {
            this.data = a
        };
        b.prototype = {
            getPageMeta: function() {
                return this.data
            }
        },
        a.PageMeta = function(a) {
            return new b(a)
        }
    } (a),
    function() {
        "use strict"
    } (a),
    a.prototype = {
        _init: function(b) {
            var c = this,
            d = b.apiObj || null;
            d && a.mix(a, b.apiObj, !0),
            b.data ? c._initData(b.data) : a.ajax(b.url, {}).done(function(b) {
                this.ifReady = !0,
                c._initData(b),
                a.isFunction(c.readyCallBack) && c.readyCallBack.call(c)
            }).fail(function() {
                throw new Error("No such data " + b.url)
            })
        },
        _initData: function(b) {
            this.instance = a.Instance(b, this),
            this.hierarchy = a.Hierarchy(b.hierarchy, this.instance),
            this.excludes = a.Excludes(b.excludes, this),
            this.pageMeta = a.PageMeta(b.pageMeta, this)
        },
        ready: function(b) {
            return this.ifReady ? a.isFunction(b) && b.call(this) : this.readyCallBack = b,
            this
        },
        reload: function(a) {
            {
                var b;
                this.hierarchy.getRootModel()
            }
            this._initData(a),
            b = this.hierarchy.getComponent()
        },
        hierarchyReload: function(b) {
            this.hierarchy.getRootModel();
            this.hierarchy = a.Hierarchy(b.data, this.instance)
        },
        async: function(a) {
            this.instance.async(a)
        },
        getRootModel: function() {
            return this.hierarchy.getRootModel()
        },
        getStruct: function(a) {
            return this.hierarchy.getStructure(a)
        },
        getComponent: function() {
            return this.hierarchy.getComponent()
        },
        data: function(a, b) {
            return this.instance.data(a, b)
        },
        on: function(b, c, d) {
            var e = this.hierarchy.getComponent(),
            f = this;
            a.indexOf(c, e) > -1 ? a.each(this.instance.getData(),
            function(a, e) {
                a.tag === c && f.data(e).on(b, d)
            }) : this.data(c).on(b, d)
        },
        fire: function() {
            var b = arguments,
            c = b[0] || "change",
            d = b[1] || "",
            e = this.hierarchy.getComponent(),
            f = this;
            "" === d ? a.each(this.instance.getData(),
            function(a, b) {
                f.data(b).fire(c)
            }) : a.indexOf(d, e) > -1 ? a.each(this.instance.getData(),
            function(a, b) {
                a.tag === d && f.data(b).fire(c)
            }) : this.data(d).fire(c)
        },
        detach: function() {
            var b = arguments,
            c = b[0] || "change",
            d = b[1] || "",
            e = this.hierarchy.getComponent(),
            f = this;
            "" === d ? a.each(this.instance.getData(),
            function(a, b) {
                f.data(b).detach(c)
            }) : a.indexOf(d, e) > -1 ? a.each(this.instance.getData(),
            function(a, b) {
                a.tag === d && f.data(b).detach(c)
            }) : this.data(d).detach(c)
        },
        getSubmitData: function() {
            var a = this.instance,
            b = this.hierarchy,
            c = a.getCartIds(),
            d = a.getSettlement(),
            e = a.getItemIds(),
            f = a.ITEM_CARTPARAM,
            g = a.ITEM_RXCLUDE,
            h = a.ITEM_TIPS,
            i = b.getOrderByH5Urls(),
            j = b.getSettlementAlone(),
            k = "";
            if (!h && e.length) {
                var l = e[0],
                m = a.data(l),
                n = m._data,
                o = n.fields,
                p = o.exclude;
                k = i[p]
            }
            return {
                isSettlementAlone: j,
                cartIds: c,
                settlement: d,
                message: h,
                cartParam: f,
                excludes: g,
                url: k
            }
        },
        validate: function() {}
    },
    a
} (window));