!
function(a, b) {
    a.loginedRequest = function(c, d) {
        function e() {
            c.retryed ? h.call(null, {
                errcode: "NOT_LOGINED",
                message: "该页面需要登录，请刷新重试!"
            }) : (i && i.call(), b.goLogin({
                widget: !0,
                hideType: {
                    succ: function() {
                        a.loginedRequest(c, d)
                    },
                    fail: function() {
                        c.retryed = !0,
                        a.loginedRequest(c, d)
                    }
                }
            }))
        }
        function f() { ! n && m ? b.goLogin() : e()
        }
        var g = d.succ,
        h = d.fail,
        i = d.beforeLogin,
        j = ["X909", "N1T", "X909T", "N1W"],
        k = ["UCBrowser", "QQBrowser", "OS"],
        l = window.navigator.userAgent,
        m = new RegExp("(?:" + j.join("|") + ")").test(l),
        n = new RegExp("(?:" + k.join("|") + ")").test(l);
        return b.isLogin() ? void a.loginRequest(c,
        function(a) {
            g && g.call(null, a)
        },
        function(a) {
            var b = {
                message: "系统错误",
                result: a
            };
            if (a && a.ret && a.ret.length) {
                var c = a.ret[0].split("::");
                if (2 === c.length) {
                    if (0 <= c[0].indexOf("SESSION_EXPIRED") || 0 <= c[0].indexOf("NEED_LOGIN") || 0 <= c[0].indexOf("FAIL_SYS_SESSION_EXPIRED")) return void f();
                    b.errcode = c[0],
                    b.message = c[1]
                }
            }
            h && h.call(null, b)
        }) : void f()
    }
} (window.lib.mtop, window.lib.login),
window.lib.define("app.bag.mtop",
function() {
    var a = window.lib.mtop,
    b = window.lib.notification,
    c = (app.navigation.getParameters(), {
        msg: {
            emptyTitle: "购物车快饿瘪了T.T",
            emptyTxt: "主人快给我挑点宝贝吧",
            emptyUrl: "//m.taobao.com"
        },
        init: function() {},
        ajax: function(a) {
            var b = {
                data: {},
                success: null,
                error: null
            };
            b = $.extend(a),
            this.adjustOrder(b.data, b.success, b.error)
        },
        buildOrder: function(b, c, d) {
            var e = this,
            f = b || {};
            f.isPage = !1,
            f.extStatus = "0";
            for (var g in f) f[g] = decodeURIComponent(f[g]);
            if (e.ttid = f.ttid, delete f.ttid, e.ttid && e.ttid.indexOf("@baichuan") >= 0) {
                var h = e.ttid && e.ttid.split("@baichuan")[0].split("_")[2];
                h && (f.cartFrom = "baichuan_client", f.baichuanAppkey = h)
            }
            a.loginedRequest({
                api: "mtop.trade.queryBag",
                data: f,
                v: "4.1",
                ttid: e.ttid,
                ecode: 1,
                isSec: 0
            },
            {
                succ: function(a) {
                    c && c.call(null, a)
                },
                fail: function(a) {
                    var b = a.errcode;
                    "NO_ADDRESS" === a.errcode && (a.message = '<a href="//h5.' + lib.mtop.config.subDomain + '.taobao.com/mtb/address.html">' + a.message + "</a>");
                    var c = a.message,
                    f = (a.code, lib.mtop.getError(b).errorMessage);
                    b && f && (c = f),
                    $(".content-shopcart").html(e.failHandler(c)),
                    d && d.call(null, a)
                }
            })
        },
        adjustOrder: function(c, d, e) {
            var f = this;
            f.maskShow(),
            a.loginedRequest({
                api: "mtop.trade.updateBag",
                data: c,
                v: "3.1",
                ttid: f.ttid,
                type: "post",
                dataType: "json",
                ecode: 1,
                isSec: 0
            },
            {
                succ: function(a) {
                    f.maskHide(),
                    d && d.call(null, a.data)
                },
                fail: function(a) {
                    f.maskHide(),
                    b.simple(a.message),
                    e && e(a)
                }
            })
        },
        failHandler: function(a, b, c) {
            var d = c ? '<p class="url"><a href="' + c + '">去逛逛</a></p>': "",
            b = b || "";
            return '<div class="c-msg"><section class="c-msg-img warn"></section><section class="c-msg-info"><p>' + a + '</p><p class="opt">' + b + "</p>" + d + "</section></div>"
        },
        maskShow: function() {
            var a = $(".mask"),
            b = document.body.scrollHeight;
            a.height(b),
            a.show()
        },
        maskHide: function() {
            var a = $(".mask");
            a.hide()
        }
    });
    return c
}),
!
function() {
    function a(a, b) {
        return (/string|function/.test(typeof b) ? h: g)(a, b)
    }
    function b(a, c) {
        return "string" != typeof a && (c = typeof a, "number" === c ? a += "": a = "function" === c ? b(a.call(a)) : ""),
        a
    }
    function c(a) {
        return l[a]
    }
    function d(a) {
        return b(a).replace(/&(?![\w#]+;)|[<>"']/g, c)
    }
    function e(a, b) {
        if (m(a)) for (var c = 0,
        d = a.length; d > c; c++) b.call(a, a[c], c, a);
        else for (c in a) b.call(a, a[c], c)
    }
    function f(a, b) {
        var c = /(\/)[^/] + \1\.\.\1 / ,
        d = ("./" + a).replace(/[^/] + $ / ,
        ""),
        e = d + b;
        for (e = e.replace(/\/\.\//g, "/"); e.match(c);) e = e.replace(c, "/");
        return e
    }
    function g(b, c) {
        var d = a.get(b) || i({
            filename: b,
            name: "Render Error",
            message: "Template not found"
        });
        return c ? d(c) : d
    }
    function h(a, b) {
        if ("string" == typeof b) {
            var c = b;
            b = function() {
                return new k(c)
            }
        }
        var d = j[a] = function(c) {
            try {
                return new b(c, a) + ""
            } catch(d) {
                return i(d)()
            }
        };
        return d.prototype = b.prototype = n,
        d.toString = function() {
            return b + ""
        },
        d
    }
    function i(a) {
        var b = "{Template Error}",
        c = a.stack || "";
        if (c) c = c.split("\n").slice(0, 2).join("\n");
        else for (var d in a) c += "<" + d + ">\n" + a[d] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(b + "\n\n" + c),
            b
        }
    }
    var j = a.cache = {},
    k = this.String,
    l = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    },
    m = Array.isArray ||
    function(a) {
        return "[object Array]" === {}.toString.call(a)
    },
    n = a.utils = {
        $helpers: {},
        $include: function(a, b, c) {
            return a = f(c, a),
            g(a, b)
        },
        $string: b,
        $escape: d,
        $each: e
    },
    o = a.helpers = n.$helpers;
    a.get = function(a) {
        return j[a.replace(/^\.\//, "")]
    },
    a.helper = function(a, b) {
        o[a] = b
    },
    "function" == typeof define ? define(function() {
        return a
    }) : "undefined" != typeof exports ? module.exports = a: this.app.bag.template = a,
    a("activity/index", ' <div class="activity"> </div> '),
    a("allItem/index",
    function(a) {
        "use strict";
        var b = this,
        c = b.$helpers,
        d = b.$each,
        e = a.rob,
        f = a.key,
        g = (a.value, a.i, b.$string),
        h = a.fun,
        i = a.obj,
        j = a.mtop,
        l = "";
        return l += " ",
        d(e.getStruct(f),
        function(a) {
            l += " ",
            "bundle" === a.tag && (l += " ", l += g(c.includeChild(h, "", i.tag = a.tag, "")), l += " "),
            l += " "
        }),
        l += " ",
        i.tag || (l += " ", l += g(j.failHandler(j.msg.emptyTitle, j.msg.emptyTxt, j.msg.emptyUrl)), l += " "),
        l += " ",
        i.tag && (l += ' <ul class="order-main"> ', l += g(c.includeChild(f, "bundle", "li", "order-list on")), l += ' </ul> <div class="footer-toolbar"> <div class="totalprice"> ', l += g(c.includeChild(f, "checkAll")), l += " ", l += g(c.includeChild(f, "realPay", "div", "total-price")), l += ' <div class="btn"> ', l += g(c.includeChild(f, "submit")), l += ' </div> <input class="cartids" type="hidden" name="cart_ids"> </div> ', l += g(c.includeChild(f, "realQuantity")), l += " </div> "),
        l += " ",
        new k(l)
    }),
    a("bundle/index",
    function(a) {
        "use strict";
        var b = this,
        c = b.$helpers,
        d = a.data,
        e = b.$string,
        f = a.key,
        g = a.win,
        h = "";
        return "invalid" !== d.bundleId && (h += ' <div class="order-shop"> <div class="title"> <div class="info"> ', h += e(c.includeChild(f, "shop", "div", "shop-info")), h += " ", h += e(c.includeChild(f, "promotion", "p")), h += ' </div> <div class="editor"></div> </div> </div> ', h += e(c.includeChild(f, "order", "ul", "item-main")), h += " "),
        h += " ",
        "invalid" === d.bundleId && (h += ' <div class="order-shop"> <div class="editor-delete"> </div> <div class="title"> <div class="info"> <h3>', h += e(g.lib.secureFilters(d.invalidTitle)), h += '</h3> </div> </div> </div> <ul class="item-main lose"> ', h += e(c.includeChild(f, "item", "li", "item-list")), h += ' </ul> <div class="lose-btn"><span class="btn">清空失效宝贝</span></div> '),
        h += " ",
        new k(h)
    }),
    a("bundlePay/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$string),
        d = a.data,
        e = "";
        return e += '合计:<strong class="price">',
        e += c(d.priceTitle),
        e += "</strong> ",
        new k(e)
    }),
    a("bundleQuantity/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$string),
        d = a.data,
        e = "";
        return e += c(d.title),
        e += " ",
        new k(e)
    }),
    a("checkAll/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, a.data),
        d = "";
        return d += '<div class="ckb"> <input type="checkbox" class="c-f-checkbox" ',
        ("true" === c.checked || c.checked === !0) && (d += "checked"),
        d += "> 全选 </div> ",
        new k(d)
    }),
    a("confirmCart/index", ' <div class="wrap shopcart-buy"> </div> '),
    a("coudan/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$string),
        d = a.data,
        e = "";
        return e += " ",
        e += c(d.title),
        e += " ",
        new k(e)
    }),
    a("item/index",
    function(a) {
        "use strict";
        var b = this,
        c = b.$helpers,
        d = b.$string,
        e = a.data,
        f = a.key,
        g = a.parentData,
        h = b.$each,
        i = (a.value, a.i, "");
        return i += ' <div class="item-box" data-cartid="',
        i += d(e.cartId),
        i += '" data-sellerid="',
        i += d(e.sellerId),
        i += '" data-shopid="',
        i += d(e.shopId),
        i += '" data-skuid="',
        i += d(e.skuId),
        i += '" data-itemid="',
        i += d(e.itemId),
        i += '"> <div class="myicb"> ',
        ("true" === e.showCheckBox || e.showCheckBox === !0) && (i += ' <input type="checkbox" class="c-f-checkbox icb " ', ("true" === e.checked || e.checked === !0) && (i += "checked"), i += "> "),
        i += ' </div> <div class="item-info" > ',
        i += d(c.includeChild(f, "itemInfo")),
        i += ' <div class="sku-editor-delete"> ',
        i += d(c.includeChild(f, "sku")),
        i += ' <div class="editor-delete ',
        ("true" == g.editable || 1 == g.editable || "true" == e.showCheckBox || 1 == e.showCheckBox) && (i += " J_delete "),
        i += " ",
        "true" !== g.editable && g.editable !== !0 && "true" !== e.showCheckBox && e.showCheckBox !== !0 && (i += "uneditable"),
        i += '"></div> </div> ',
        e.itemSkuExt && (i += " ", h(e.itemSkuExt,
        function(a) {
            i += ' <div style="font-size:12px;color:#999;margin-top:8px;">',
            i += d(a.name),
            i += d(a.value),
            i += "</div> "
        }), i += " "),
        i += " ",
        i += d(c.includeChild(f, "itemOperate")),
        i += ' <div class="sub-price"> ',
        i += d(c.includeChild(f, "itemPay", "span")),
        i += " ",
        i += d(c.includeChild(f, "quantity", "span", "txt")),
        i += " </div> </div> </div> ",
        i += d(c.includeChild(f, "stateIcon", "div", "promotionPart")),
        i += " ",
        i += d(c.includeChild(f, "promotionIcon", "div", "ico")),
        i += " ",
        new k(i)
    }),
    a("itemInfo/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, a.data),
        d = b.$string,
        e = a.win,
        f = "";
        return f += " <a ",
        c.itemURL && (f += 'href="', f += d(c.itemURL), f += '"'),
        f += ' class="pic J_detail"> <img class="lazy" data-src="',
        f += d(c.pic || "//assets.alicdn.com/mw/s/common/icons/nopic/no-80.png"),
        f += '" src="//assets.alicdn.com/mw/s/common/icons/nopic/no-80.png"> </a> <a ',
        c.itemURL && (f += 'href="', f += d(c.itemURL), f += '"'),
        f += ' class="fragment J_detail"> <h4>',
        f += d(e.lib.secureFilters(c.title)),
        f += "</h4> </a> ",
        new k(f)
    }),
    a("itemOperate/index", ""),
    a("itemPay/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, a.data),
        d = b.$string,
        e = a.win,
        f = "";
        return f += ' <del class="grey">',
        c.priceTitle !== c.favorablePriceTitle && (f += d(e.lib.secureFilters(c.priceTitle))),
        f += '</del> <span class="h">',
        f += d(e.lib.secureFilters(c.favorablePriceTitle)),
        f += "</span>",
        new k(f)
    }),
    a("order/index",
    function(a) {
        "use strict";
        var b = this,
        c = b.$helpers,
        d = a.data,
        e = b.$string,
        f = a.key,
        g = "";
        return g += '<div class="',
        1 == d.isRelationItem && (g += "taocan"),
        g += '"> ',
        g += e(c.includeChild(f, "item", "li", "item-list")),
        g += " </div> ",
        new k(g)
    }),
    a("promotion/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$each),
        d = a.data,
        e = (a.value, a.i, b.$string),
        f = "";
        return c(d.titles,
        function(a) {
            f += " ",
            f += e(a),
            f += " "
        }),
        f += " ",
        new k(f)
    }),
    a("promotionIcon/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$each),
        d = a.data,
        e = (a.value, a.i, b.$string),
        f = a.win,
        g = "";
        return g += " ",
        c(d.iconList,
        function(a) {
            g += " ",
            a.pic && (g += ' <span class="ico_phone_exclusive"><img src="', g += e(a.pic), g += '"/></span> '),
            g += " ",
            a.pic || (g += ' <span class="ico_phone_exclusive" style="background:#', g += e(a.textColor), g += '"> ', g += e(f.lib.secureFilters(a.text)), g += " </span> "),
            g += " "
        }),
        g += " ",
        new k(g)
    }),
    a("quantity/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, a.parentData),
        d = b.$string,
        e = a.data,
        f = a.win,
        g = "";
        return g += "X ",
        ("true" == c.editable || 1 == c.editable) && (g += ' <input class="c-f-text qt" type="number" value="', g += d(e.quantity), g += '" min="', g += d(e.min), g += '" max="', g += d(e.max), g += '"> '),
        g += " ",
        ("false" == c.editable || 0 == c.editable) && (g += " ", g += d(f.lib.secureFilters(e.quantity)), g += " "),
        g += " ",
        new k(g)
    }),
    a("realPay/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, a.win),
        d = a.data,
        e = b.$string,
        f = "";
        return f += '<p class="h"><span>合计:</span> <strong class="price" ',
        c.Number(d.price) > 9999999 && (f += 'style="font-size:14px"'),
        f += " ",
        c.Number(d.price) > 999999999 && (f += 'style="font-size:12px"'),
        f += " >",
        f += e(c.lib.secureFilters(d.priceTitle)),
        f += '</strong></p> <p class="attached">',
        f += e(c.lib.secureFilters(d.postTitle)),
        f += "</p> ",
        new k(f)
    }),
    a("realQuantity/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$string),
        d = a.data,
        e = "";
        return e += '<input type="hidden" value="',
        e += c(d.value),
        e += '"> ',
        new k(e)
    }),
    a("reduceItem/index", ' <div class="reduceItem"> </div> '),
    a("shop/index",
    function(a) {
        "use strict";
        var b = this,
        c = b.$helpers,
        d = a.data,
        e = b.$string,
        f = a.win,
        g = a.key,
        h = "";
        return h += ' <div class="myscb"> ',
        ("true" === d.showCheckBox || d.showCheckBox === !0) && (h += ' <input type="checkbox" class="c-f-checkbox icb green " ', ("true" === d.checked || d.checked === !0) && (h += "checked"), h += "> "),
        h += " </div> <a ",
        d.url && "0" !== d.shopId && 0 !== d.shopId && (h += 'href="', h += e(d.url), h += '"'),
        h += "> <h3>",
        h += e(f.lib.secureFilters(d.title) || f.lib.secureFilters(d.shopName)),
        h += "</h3> ",
        h += e(c.includeChild(g, "coudan", "p")),
        h += ' </a> <!-- <div class="getcoupon h" data-sellerid="',
        h += e(d.sellerId),
        h += '"> ',
        h += e(c.includeChild(g, "shopBonus")),
        h += " </div> --> ",
        new k(h)
    }),
    a("shopBonus/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, a.data),
        d = "";
        return (c.hasCoupon === !0 || "true" === c.hasCoupon) && (d += " 领券 "),
        d += " ",
        new k(d)
    }),
    a("sku/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$string),
        d = a.data,
        e = a.parentData,
        f = a.win,
        g = "";
        return g += ' <p class="props"> ',
        g += c(d.title),
        g += ' </p> <div class="editor-cont"> ',
        ("true" == e.editable || 1 == e.editable) && (g += ' <p class="editor-sku" data-areaid="', g += c(d.areaId), g += '" data-cartid="" data-skuid="', g += c(d.skuId), g += '"> ', g += c(f.lib.secureFilters(d.title)), g += "</p> "),
        g += " ",
        ("false" == e.editable || 0 == e.editable) && (g += ' <p class="editor-no">', g += c(f.lib.secureFilters(d.title)), g += "</p> "),
        g += " </div>",
        new k(g)
    }),
    a("stateIcon/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$each),
        d = a.data,
        e = (a.value, a.i, b.$string),
        f = a.win,
        g = "";
        return g += " ",
        c(d.iconList,
        function(a) {
            g += " ",
            a.pic && (g += ' <span class="ico_phone_exclusive"><img src="', g += e(a.pic), g += '"/></span> '),
            g += " ",
            a.pic || (g += ' <span class="" style="color:#', g += e(a.textColor), g += '"> ', g += e(f.lib.secureFilters(a.text)), g += " </span> "),
            g += " "
        }),
        g += " ",
        new k(g)
    }),
    a("stockItem/index", " "),
    a("submit/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$string),
        d = a.data,
        e = "";
        return e += '<button class="c-btn-orgn btn-sub" type="submit">结算(',
        e += c(d.number ? d.number: "0"),
        e += ")</button> ",
        new k(e)
    })
} (), window.lib.define("app.bag.activity",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.allItem",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.bundle",
function() {
    "use strict";
    return {
        init: function(a, b, c) {
            var d = a.find(".editor"),
            e = a.find(".lose-btn .btn");
            d.on("click",
            function() {
                a.hasClass("on") ? a.removeClass("on").addClass("off") : a.hasClass("off") && a.removeClass("off").addClass("on")
            }),
            e.on("click",
            function() {
                var d = $(".mask"),
                e = lib.notification.confirm("确定清空失效宝贝吗？", "",
                function(e, f) {
                    f && b.set("", "", "deleteInvalid",
                    function() {
                        a.remove();
                        var b = c.pageMeta.data.totalCount ? c.pageMeta.data.totalCount: 0;
                        app.navigation.setTitle("购物车(" + b + ")")
                    },
                    function() {}),
                    this.hide(),
                    d.hide(),
                    d.attr("style", "")
                });
                d.attr("style", "background:rgba(0,0,0,0.3)"),
                d.show(),
                e.show()
            })
        }
    }
}), window.lib.define("app.bag.bundlePay",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.bundleQuantity",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.checkAll",
function() {
    "use strict";
    return {
        init: function(a, b, c, d, e) {
            var f = this,
            g = a.find(".c-f-checkbox"),
            h = "";
            g.off().on("change",
            function() {
                var a = this,
                c = $(e).find("input[type='checkbox']");
                f.boxesChecked(c, a.checked),
                b.set("checked", a.checked, null,
                function(b) {
                    var c = b && b.message;
                    a.checked && c && c !== h ? (lib.notification.simple(c), h = c) : h = ""
                })
            })
        },
        boxesChecked: function(a, b) {
            for (var a = a || [], c = a.length - 1; c >= 0; c--) {
                var d = a[c];
                d.checked = b
            }
        }
    }
}), window.lib.define("app.bag.confirmCart",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.coudan",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.item",
function() {
    "use strict";
    return {
        init: function(a, b, c, d, e) {
            var f = $(e).find(".mask"),
            g = lib.notification,
            h = a.find(".quantity .c-f-text"),
            i = parseInt(b.get("quantity"), 10),
            j = parseInt(h.attr("min"), 10),
            k = parseInt(h.attr("max"), 10),
            l = a.find(".myicb .c-f-checkbox"),
            m = a.find(".editor-sku"),
            n = a.find(".item-box"),
            o = n.attr("data-itemid"),
            p = n.attr("data-cartid"),
            q = n.attr("data-skuid"),
            r = m.attr("data-areaid"),
            s = b.guid,
            t = c.hierarchy.getParentStructure(s).guid;
            this.rob = c,
            a.off().on("click", ".J_delete",
            function() {
                var g = lib.notification.confirm("你确定删除该宝贝？", "",
                function(g, h) {
                    if (h) {
                        var i = b._data.fields.valid,
                        j = "false" == i || 0 == i ? "deleteInvalid": "deleteSome";
                        b.set("", "", j,
                        function() {
                            var b = c.hierarchy.getStructureSubset(t),
                            f = c.instance.COMPONENT_MODEL_CACHE || [],
                            g = !1;
                            for (var h in f) {
                                var i = f[h],
                                j = i.tag;
                                "item" === j && (g = !0)
                            }
                            b.length <= 0 ? a.parents(".order-list").remove() : a.remove();
                            var k = c.pageMeta.data.totalCount ? c.pageMeta.data.totalCount: 0;
                            app.navigation.setTitle("购物车(" + k + ")"),
                            g || (e.innerHTML = d.failHandler(d.msg.emptyTitle, d.msg.emptyTxt, d.msg.emptyUrl))
                        })
                    }
                    this.hide(),
                    f.hide(),
                    f.attr("style", "")
                });
                f.attr("style", "background:rgba(0,0,0,0.3)"),
                f.show(),
                g.show()
            }).on("blur", ".quantity .c-f-text",
            function() {
                {
                    var a = this,
                    c = $.trim(this.value);
                    parseInt($(this).attr("data-default"), 10)
                }
                "" == c ? (g.simple("购买数量不能为空"), this.value = i) : /^\d{1,}$/.test(c) ? 1 > c ? (this.value = j, g.simple("购买数量不能少于1个"), i !== j && b.set("quantity", 1, "update", null,
                function() {
                    a.value = i
                })) : c > k ? (this.value = k, g.simple("此宝贝最多可以购买" + k + "个"), i !== k && b.set("quantity", k, "update", null,
                function() {
                    a.value = i
                })) : i != c && b.set("quantity", this.value, "update",
                function() {},
                function() {
                    a.value = i
                }) : (g.simple("购买数量请输入正整数"), this.value = i)
            }).on("click", ".editor-sku",
            function() {
                location.hash = "#!/awp/base/sku.htm?itemid=" + o + "&skuid=" + q + "&cartid=" + p + "&areaid=" + r + "&backurl=" + encodeURIComponent(location.hash)
            }),
            l.on("change",
            function() {
                var a = this;
                b.set("checked", a.checked, null,
                function(b) {
                    a.checked && b.message && lib.notification.simple(b.message)
                })
            })
        },
        checkEnv: function() {
            var a = "m",
            b = location.host;
            return - 1 !== b.indexOf("waptest") ? a = "waptest": -1 !== b.indexOf("wapa") && (a = "wapa"),
            a
        }
    }
}), window.lib.define("app.bag.itemInfo",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.itemOperate",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.itemPay",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.order",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.promotion",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.promotionIcon",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.quantity",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.realPay",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.realQuantity",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.reduceItem",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.shop",
function() {
    "use strict";
    return {
        init: function(a, b) {
            var c = a.find(".c-f-checkbox"),
            d = "";
            c.on("change",
            function() {
                var a = this;
                b.set("checked", a.checked, null,
                function(b) {
                    var c = b && b.message;
                    a.checked && c && c !== d ? (lib.notification.simple(c), d = c) : d = ""
                })
            })
        }
    }
}), window.lib.define("app.bag.shopBonus",
function() {
    "use strict";
    return {
        init: function(a) {
            var b = this;
            a.on("click",
            function() {
                var a = $(this),
                c = a.parent().attr("data-sellerid");
                c && (location.href = "//h5." + b.checkEnv() + ".taobao.com/awp/base/coupon.htm?sellerId=532923103" + c)
            })
        },
        checkEnv: function() {
            var a = "m",
            b = location.host;
            return - 1 !== b.indexOf("waptest") ? a = "waptest": -1 !== b.indexOf("wapa") && (a = "wapa"),
            a
        }
    }
}), window.lib.define("app.bag.sku",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.stateIcon",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.stockItem",
function() {
    "use strict";
    return {
        init: function() {}
    }
}), window.lib.define("app.bag.submit",
function() {
    "use strict";
    return {
        init: function(a, b, c, d) {
            {
                var e = app.navigation.getParameters(),
                f = e.ttid || "";
                $(d).find(".mask")
            }
            a.off().on("click",
            function() {
                var a = c.getSubmitData(),
                b = a.cartIds,
                d = a.settlement,
                e = a.isSettlementAlone,
                g = a.message,
                h = a.excludes,
                i = a.url,
                j = b,
                k = "cartIds";
                if ((e === !0 || "true" === e) && (j = d, k = "buyParam"), g) lib.notification.simple(g);
                else if (b.length >= 20) lib.notification.simple("您下单的宝贝太多了");
                else if (j) if (j.length) {
                    var l = f ? "&ttid=" + f: "",
                    m = j.join(",");
                    if (i) {
                        var n = $(['<form method="post" action="' + i + '"><input type="hidden" name="cartId" value=\'' + b.join(",") + '\'/><input type="hidden" name="cart_param" value=\'{"items":[' + String(a.cartParam) + "]}'/></form>"].join(""));
                        n[0].submit()
                    } else if (h.indexOf("HK") >= 0 && "m" === lib.mtop.config.subDomain) {
                        var o = "//h5.m.tmall.hk/awp/base/order.htm?buyNow=false&buyParam=" + d.join(",");
                        location.href = o
                    } else {
                        var o = "#!/awp/base/order.htm?buyNow=false&" + k + "=" + m + l;
                        location.hash = o
                    }
                } else lib.notification.simple("请选择需要下单的商品");
                else console.log("下单错误")
            })
        }
    }
}), window.lib.define("app.bag.publicMods",
function() {
    return ["toggle", "label", "nativeDeliveryMethod", "multiSelect", "input"]
}), window.lib.define("app.bag.render",
function() {
    var a = function(a, b) {
        this.rob = a,
        this.rootNode = b,
        this.template = app.bag.template,
        this._templateHelper(),
        this.publicMods = namespace("app.bag.publicMods"),
        this.mtop = namespace("app.bag.mtop"),
        this.modBind = {},
        this.rootNode.innerHTML = "",
        this._init()
    };
    return a.prototype = {
        _init: function() {
            var a = (this.rob.getRootModel(), this.rob.getStruct("root")),
            b = this;
            $.each(a,
            function(a, c) {
                b._renderOrder.call(b, {
                    target: c
                })
            }),
            b._renderOrder.call(b, "mask"),
            this.rob.fire("load"),
            app.plugin.lazyload.check()
        },
        _renderOrder: function(a) {
            {
                var b = this;
                this.rob.getRootModel(),
                b.rob.getComponent(),
                b.rob.instance.getData()
            }
            return "mask" === a ? void(this.rootNode.innerHTML += '<div class="mask"></div>') : (this.rootNode.innerHTML += this._renderHtml(a.target, a.target.tag), void a.target.detach("load").on("load",
            function(a) {
                window.namespace("app.bag." + a.target.tag).init($("#" + a.target.randomId), a.target, b.rob)
            }))
        },
        _renderHtml: function(a, b) {
            var c = this;
            return this.modBind[a.guid] = !1,
            c.template(b + "/index", {
                parentData: a._data,
                data: a._data.fields,
                key: a.guid,
                win: window,
                rob: c.rob,
                obj: {},
                mtop: c.mtop
            })
        },
        _creatElement: function(a, b, c) {
            var d = arguments[3] || "";
            return a._data.status && "hidden" == a._data.status ? "": "<" + c + ' class="' + a._data.tag + " " + d + '" id="' + a.randomId + '">' + this._renderHtml(a, b) + "</" + c + ">"
        },
        _templateHelper: function() {
            var a = this;
            a.template.helper("includeChild",
            function(b, c) {
                var d = "",
                e = a.rob.getStruct(b),
                f = e.length,
                g = arguments[2] || "div",
                h = arguments[3] || "";
                if (f > 0) for (var i = 0; f > i; i++) {
                    var j = e[i];
                    if ("undefined" != typeof j && j.tag == c) {
                        var k = $.inArray(j._data.type, a.publicMods) > -1 ? j._data.type: j._data.tag;
                        d += a._creatElement.call(a, j, k, g, h),
                        j.detach("load").on("load",
                        function(b) {
                            var c = $.inArray(b.target._data.type, a.publicMods) > -1 ? b.target._data.type: b.target._data.tag,
                            d = $("#" + b.target.randomId) || null,
                            e = window.namespace("app.bag." + c);
                            e && e.init(d, b.target, a.rob, a.mtop, a.rootNode),
                            a.modBind[b.target.guid] = !0
                        }),
                        j.detach("change").on("change",
                        function(b) {
                            var c = $.inArray(b.target._data.type, a.publicMods) > -1 ? b.target._data.type: b.target._data.tag;
                            $("#" + b.target.randomId).html(a._renderHtml.call(a, b.target, c)),
                            a.rob.fire("load", b.target.guid),
                            app.plugin.lazyload.check()
                        })
                    }
                }
                return d
            })
        }
    },
    a
}),
function(a, b) {
    window.lib.mtop;
    b.extendView({
        name: "bag",
        el: "div",
        plugins: {
            domevent: !0
        },
        events: [],
        render: function() {
            function c() {
                b.plugin.loading.hide(h);
                var a = setTimeout(function() {
                    b.plugin.loading.hide(h),
                    clearTimeout(a)
                },
                1e3)
            }
            var d = this,
            e = d.$el,
            f = window.namespace("app.bag.mtop"),
            g = b.navigation.getParameters(),
            h = b.plugin.loading.show();
            window.location.href.indexOf("127.0.0.1") > -1 ? ($.ajax({
                type: "GET",
                url: "./data/mock.json",
                data: {},
                dataType: "json",
                success: function(c) {
                    var d = new a.Lob({
                        data: c,
                        apiObj: f
                    }),
                    g = window.namespace("app.bag.render");
                    new g(d, e[0]);
                    var h = d.pageMeta && d.pageMeta.data && d.pageMeta.data.totalCount ? d.pageMeta.data.totalCount: 0;
                    h && b.navigation.setTitle("购物车(" + h + ")")
                },
                error: function() {
                    alert("Ajax error!")
                }
            }), c()) : f.buildOrder(g,
            function(d) {
                var g = new a.Lob({
                    data: d.data,
                    apiObj: f
                }),
                h = window.namespace("app.bag.render");
                new h(g, e[0]);
                var i = g.pageMeta && g.pageMeta.data && g.pageMeta.data.totalCount ? g.pageMeta.data.totalCount: 0;
                i && b.navigation.setTitle("购物车(" + i + ")"),
                c()
            },
            function() {
                c()
            })
        }
    })
} (window, window.app);