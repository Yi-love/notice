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
    }) : "undefined" != typeof exports ? module.exports = a: this.orderManageTemplate = a,
    a("address/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$string),
        d = a.win,
        e = a.data,
        f = "";
        return f += '<div class="o-t-contmsg"> <div class="ico"><span class="icon-location"></span></div> <div class="cont"> <h5 class=""> <div>收货人：',
        f += c(d.lib.secureFilters(e.name)),
        f += "</div> <div>",
        f += c(d.lib.secureFilters(e.mobilephone)),
        f += "</div> </h5> ",
        e.value && (f += ' <div class="submsg">', f += c(d.lib.secureFilters(e.label)), f += "：", f += c(d.lib.secureFilters(e.value)), f += "</div> "),
        f += " </div> </div>",
        new k(f)
    }),
    a("detail/index",
    function(a) {
        "use strict";
        var b = this,
        c = b.$helpers,
        d = a.data,
        e = b.$string,
        f = a.key,
        g = "";
        return g += " ",
        d.group && d.group.length ? (g += " ", g += e(c.includeChild(f, "order", "div", "", d.group)), g += " ") : (g += " ", g += e(c.includeChild(f, "error", "div", "", {
            title: "没有该订单相关的信息",
            sub: ""
        },
        "")), g += " "),
        g += " ",
        new k(g)
    }),
    a("error/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$string),
        d = a.id,
        e = a.data,
        f = "";
        return f += ' <div class="o-error" id="',
        f += c(d),
        f += '"> <div> <div class="img"><p><span class="icon-form"></span></p></div> ',
        e.title && (f += ' <p class="txt">', f += c(e.title), f += "</p> "),
        f += " ",
        e.sub && (f += ' <p class="sub-txt">', f += c(e.sub), f += "</p> "),
        f += " ",
        e.btn && (f += ' <p class="refresh"><a href="', f += c(e.url), f += '" class="bt">', f += c(e.btn), f += "</a></p> "),
        f += " </div> </div> ",
        new k(f)
    }),
    a("head/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$each),
        d = a.data,
        e = (a.head, a.l, b.$string),
        f = a.win,
        g = "";
        return g += ' <div class="tcont"> ',
        c(d,
        function(a) {
            g += " ",
            "seller" === a.tag && (g += ' <div class="ico"><img src="', g += e(a.fields.shopImg), g += '"></div> <div class="contact"> <p><a href="//shop.', g += e(f.lib.mtop.config.subDomain), g += ".taobao.com/shop/shop_index.htm?user_id=", g += e(a.fields.id), g += '">', g += e(f.lib.secureFilters(a.fields.shopName)), g += '<span class="icon-right"></span></a></p> </div> '),
            g += " ",
            "status" === a.tag && (g += ' <div class="state"> <div class="state-cont"> <p class="h">', g += e(f.lib.secureFilters(a.fields.text)), g += '</p> <p class="gray"></p> </div> </div> '),
            g += " "
        }),
        g += " </div> ",
        new k(g)
    }),
    a("headerBar/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$string),
        d = a.data,
        e = "";
        return e += '<header class="header"> <div class="back"><p><span class="icon-back"></span></p></div> <div class="title">',
        e += c(d.title),
        e += "</div> <div><p>",
        e += c(d.sub),
        e += "</p></div> </header>",
        new k(e)
    }),
    a("item/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, a.data),
        d = b.$string,
        e = a.imgHelper,
        f = a.win,
        g = b.$each,
        h = (a.sub, a.i, a.parentData),
        i = (a.value, a.key, a.j, a.val, "");
        return i += ' <div class="item-list o-t-item"> ',
        c.pic && (i += ' <div class="item-img"> <p> <img class="lazy" src="//gw.alicdn.com/tfscom/TB1AfYzJVXXXXcxXFXXorbaIVXX-80-80.jpg_q75" data-src="', i += d(e.getNewUrl(c.pic)), i += '"> </p> </div> '),
        i += ' <div class="item-info"> <h3 class="title">',
        i += d(f.lib.secureFilters(c.title ? c.title: "")),
        i += '</h3> <p class="sku">',
        i += d(f.lib.secureFilters(c.skuText ? c.skuText: "")),
        i += "</p> ",
        c.extraDesc && (i += " ", g(c.extraDesc,
        function(a) {
            i += ' <p class="',
            "true" === a.highLight && (i += "h"),
            i += '">',
            i += d(f.lib.secureFilters(a.value)),
            i += "</p> "
        }), i += " "),
        i += " ",
        h.cellData.length >= 2 && (i += " ", g(h.cellData,
        function(a) {
            i += " ",
            "serviceinfo" === a.tag && (i += ' <ul class="order-serviceinfo"> ', a.fields.main && (i += " ", g(a.fields.main,
            function(a) {
                i += " <li>",
                i += d(f.lib.secureFilters(a.name)),
                i += "</li> "
            }), i += " "), i += " </ul> "),
            i += " "
        }), i += " "),
        i += ' </div> <div class="item-pay"> <div class="item-pay-data"> <p class="price">',
        i += d(f.lib.secureFilters(c.priceInfo.promotion ? c.priceInfo.promotion: c.priceInfo.original)),
        i += "</p> ",
        c.priceInfo.promotion && c.priceInfo.promotion !== c.priceInfo.original && (i += ' <p class="price"> <del class="">', i += d(f.lib.secureFilters(c.priceInfo.original)), i += "</del> </p> "),
        i += " ",
        c.quantity && "-" !== c.quantity && (i += ' <p class="nums">x', i += d(f.lib.secureFilters(c.quantity)), i += "</p> "),
        i += " ",
        c.refundStatus && (i += ' <p class="h">', i += d(f.lib.secureFilters(c.refundStatus)), i += "</p> "),
        i += " </div> ",
        h.cellData.length >= 2 && (i += " ", g(h.cellData,
        function(a) {
            i += " ",
            "suborderop" === a.tag && (i += " ", g(a.fields.values,
            function(b) {
                i += " ",
                a.fields.extra && a.fields.extra[b] && (i += ' <div class="item-pay-btn"> <a class="h" ', a.fields.extraUrl && a.fields.extraUrl[b] && (i += 'href="', i += d(a.fields.extraUrl[b]), i += '"'), i += "> ", i += d(f.lib.secureFilters(a.fields.extra[b])), i += " </a> </div> "),
                i += " "
            }), i += " "),
            i += " "
        }), i += " "),
        i += " </div> </div>",
        new k(i)
    }),
    a("label/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$string),
        d = a.dataParent,
        e = a.data,
        f = a.win,
        g = b.$each,
        h = (a.value, a.i, "");
        return h += ' <div class="o-t-contmsg label" name="',
        h += c(d.tag),
        h += '"> <a ',
        e.url && (h += 'href="', h += c(e.url), h += '"'),
        h += "> <div> ",
        e.icon && (h += ' <div class="icons"><img src="', h += c(e.icon), h += '"></div> '),
        h += ' <div class="cont"> <h5 class=""> <div>',
        h += c(f.lib.secureFilters(e.title)),
        h += "</div> <div>",
        h += c(f.lib.secureFilters(e.desc)),
        h += "</div> </h5> ",
        g(e.values,
        function(a) {
            h += ' <div class="submsg"> ',
            a.name && (h += c(f.lib.secureFilters(a.name)), h += "："),
            h += c(f.lib.secureFilters(a.value)),
            h += " </div> "
        }),
        h += " </div> ",
        e.showArrow && "true" === e.showArrow && (h += ' <div class="arrow"><p><span class="icon-right"></span></p></div> '),
        h += " </div> </a> </div>",
        new k(h)
    }),
    a("list/index",
    function(a) {
        "use strict";
        var b = this,
        c = b.$helpers,
        d = b.$string,
        e = a.obj,
        f = b.$each,
        g = (a.value, a.i, a.data),
        h = a.key,
        i = "";
        return i += d(e.tab = ["all", "waitPay", "waitSend", "waitConfirm", "waitRate"]),
        i += "  ",
        f(e.tab,
        function(a) {
            i += ' <section class="order-cont" ',
            a !== g.tab && (i += 'style="display:none;"'),
            i += ' data-code="',
            i += d(a),
            i += '"> ',
            a === g.tab ? (i += " ", g.group && g.group.length ? (i += " ", i += d(c.includeChild(h, "order", "div", "", g.group)), i += " ") : (i += " ", i += d(c.includeChild(h, "error", "div", "", {
                title: "您还没有相关的订单",
                sub: "可以去看看有哪些想买",
                btn: "随便逛逛",
                url: "//m.taobao.com"
            },
            "")), i += " "), i += " ") : i += ' <div class="loading"> <div> <p class="txt">正在加载...</p> </div> </div> ',
            i += " </section> "
        }),
        i += " ",
        new k(i)
    }),
    a("logisticsholder/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$string),
        d = a.data,
        e = a.win,
        f = "";
        return f += '<div class="o-t-contmsg express"> <div class="ico"><span class="icon-deliver"></span></div> <div class="cont"> <h5> <div>',
        f += c(d.message ? e.lib.secureFilters(d.message) : "查询中"),
        f += "</div> <div></div> </h5> ",
        d.time && (f += ' <div class="subtime">', f += c(e.lib.secureFilters(d.time)), f += "</div> "),
        f += ' </div> <div class="arrow"><p><span class="icon-right"></span></p></div> </div>',
        new k(f)
    }),
    a("memo/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$string),
        d = a.win,
        e = a.data,
        f = "";
        return f += '<div class="o-t-contmsg memobook"> <div class="ico"><span class="icon-comment"></span></div> <div class="cont"> <h5 class=""> <div>',
        f += c(d.lib.secureFilters(e.title)),
        f += '：</div> <div></div> </h5> <div class="submsg">',
        f += c(d.lib.secureFilters(e.content)),
        f += '</div> </div> <div class="arrow"></div> </div>',
        new k(f)
    }),
    a("order/index",
    function(a) {
        "use strict";
        var b = this,
        c = b.$helpers,
        d = b.$each,
        e = a.data,
        f = (a.value, a.i, a.order, a.j, a.od, a.k, a.cellData, a.l, a.obj),
        g = b.$string,
        h = a.key,
        i = "";
        return i += ' <ul class="order-list"> ',
        d(e,
        function(a) {
            i += "  <li> ",
            d(a,
            function(a, b) {
                i += " ",
                d(a,
                function(a) {
                    i += " ",
                    d(a.cellData,
                    function(d) {
                        i += " ",
                        f.storage && "storage" !== d.tag && (i += " ", i += g(d.fields.storage = f.storage.fields), i += " "),
                        i += " ",
                        "storage" === d.tag && (i += " ", i += g(f[d.tag] = d), i += " "),
                        i += " ",
                        "serviceinfo" === d.tag && (i += " ", i += g(a.serviceinfo = d), i += " "),
                        i += " ",
                        "status" === d.tag && (i += " ", i += g(a.status = d), i += " "),
                        i += " ",
                        i += g(c.includeChild(h, "biz" === d.type ? d.tag: d.type, "div", "module " + (d.fields ? d.fields.mainOrderId = b: "") + (d.fields ? d.fields.ids = d.id: ""), d.fields, a, d)),
                        i += " "
                    }),
                    i += " "
                }),
                i += " "
            }),
            i += " </li> "
        }),
        i += " </ul> ",
        new k(i)
    }),
    a("orderinfo/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, a.data),
        d = b.$each,
        e = (a.sub, a.l, b.$string),
        f = "";
        return c.labels && c.labels.length && (f += ' <div class="order-box order-message"> ', d(c.labels,
        function(a) {
            f += ' <p class="',
            a.highLight && "true" === a.highLight && (f += "h"),
            f += '">',
            f += e(a.name),
            f += ":",
            f += e(a.value),
            f += "</p> "
        }), f += " </div> "),
        new k(f)
    }),
    a("orderop/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$string),
        d = a.obj,
        e = a.win,
        f = a.data,
        g = b.$each,
        h = (a.btn, a.m, a.parentData),
        i = "";
        return i += c(d.orderop = e.namespace("app.orderMange.tempEvent").init().orderop),
        i += " ",
        f.values.length >= 1 && (i += ' <div class="o-tab-btn" > <ul> ', g(f.values,
        function(a, b) {
            i += "  ",
            3 === b && (i += '<li class="more">更多</li><ul class="sublist" style="display:none">'),
            i += " ",
            f.extra && f.extra[a] && (i += ' <li class="" name="" data-id="" data-url="', i += c(f.extraUrl[a]), i += '" > ', i += c(f.extra[a]), i += " </li> "),
            i += " ",
            d.orderop[a] && (i += ' <li class="', "true" === d.orderop[a].highlight && (i += "h"), i += '" name="', i += c(a), i += '" data-id="', i += c(h.orderId), i += '" > ', i += c(d.orderop[a].text), i += " </li> "),
            i += "  ",
            f.values.length >= 4 && b === f.values.length - 1 && (i += "</ul>"),
            i += " "
        }), i += " </ul> </div> "),
        i += " ",
        new k(i)
    }),
    a("pay/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, a.data),
        d = b.$string,
        e = b.$each,
        f = (a.value, a.i, "");
        return f += '<div class="o-total-price"> <div class="cont"> ',
        c.total && (f += " <span>", f += d(c.total.prefix), f += "<b>", f += d(c.total.value), f += "</b>", f += d(c.total.suffix), f += "</span> "),
        f += " ",
        c.actualFee && (f += " <span>", f += d(c.actualFee.prefix), f += "<b>", f += d(c.actualFee.value), f += "</b>", f += d(c.actualFee.suffix), f += "</span> "),
        f += " ",
        c.postFee && (f += " <span>", f += d(c.postFee.prefix), f += "<b>", f += d(c.postFee.value), f += "</b>", f += d(c.postFee.suffix), f += "</span> "),
        f += " ",
        c.serviceFee && (f += " <span>", f += d(c.serviceFee.prefix), f += "<b>", f += d(c.serviceFee.value), f += "</b>", f += d(c.serviceFee.suffix), f += "</span> "),
        f += " ",
        c.price && (f += " <span>", f += d(c.price.prefix), f += "<b>", f += d(c.price.value), f += "</b>", f += d(c.price.suffix), f += "</span> "),
        f += " ",
        c.extraPayInfos && c.extraPayInfos.length && (f += " ", e(c.extraPayInfos,
        function(a) {
            f += " <span>",
            f += d(a.prefix),
            f += "<b>",
            f += d(a.value),
            f += "</b>",
            f += d(a.suffix),
            f += "</span> "
        }), f += " "),
        f += " </div> </div> ",
        new k(f)
    }),
    a("paydetail/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, a.data),
        d = b.$each,
        e = (a.value, a.i, b.$string),
        f = a.win,
        g = "";
        return g += ' <div class="order-price-freight"> ',
        c.postFees && (g += " ", d(c.postFees,
        function(a) {
            g += " <dl> <dt>",
            g += e(f.lib.secureFilters(a.name)),
            g += "</dt><dd>",
            g += e(f.lib.secureFilters(a.value)),
            g += "</dd> </dl> "
        }), g += " "),
        g += " ",
        c.promotions && (g += " ", d(c.promotions,
        function(a) {
            g += " <dl> <dt>",
            a.icon && (g += '<img src="', g += e(a.icon), g += '"/>'),
            g += e(f.lib.secureFilters(a.name)),
            g += "</dt><dd>",
            g += e(f.lib.secureFilters(a.value)),
            g += "</dd> </dl> "
        }), g += " "),
        g += " ",
        c.actualFee && (g += " <dl> <dt>", g += e(f.lib.secureFilters(c.actualFee.name)), g += '</dt><dd class="h">', g += e(f.lib.secureFilters(c.actualFee.value)), g += "</dd> </dl> "),
        g += " </div>",
        new k(g)
    }),
    a("seller/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$string),
        d = a.data,
        e = a.win,
        f = a.parentData,
        g = b.$each,
        h = (a.value, a.i, "");
        return h += ' <div class="o-t-title-shop"> <div class="tcont"> <div class="ico"><img src="',
        h += c(d.shopImg),
        h += '"></div> <div class="contact"> <a href="//shop.',
        h += c(e.lib.mtop.config.subDomain),
        h += ".taobao.com/shop/shop_index.htm?user_id=",
        h += c(d.id),
        h += '"> <p class="title">',
        h += c(e.lib.secureFilters(d.shopName)),
        h += '</p> <p class="arrow"><span class="icon-right"></span></p> </a> </div> ',
        d.statusInfo && (h += ' <div class="state"> <div class="state-cont"> <p class="h">', h += c(e.lib.secureFilters(d.statusInfo.text)), h += '</p> <p class="gray"></p> </div> </div> '),
        h += " ",
        f.cellData.length >= 2 && (h += " ", g(f.cellData,
        function(a) {
            h += " ",
            "status" === a.tag && (h += ' <div class="state"> <div class="state-cont"> <p class="h">', h += c(e.lib.secureFilters(a.fields.text)), h += '</p> <p class="gray"></p> </div> </div> '),
            h += " "
        }), h += " "),
        h += " </div> </div> ",
        new k(h)
    }),
    a("serviceinfo/index", " "),
    a("status/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$string),
        d = a.data,
        e = b.$each,
        f = (a.value, a.i, a.win),
        g = "";
        return g += ' <div class="seller-state ',
        g += c(d.code),
        g += " ",
        g += c(d.flagPic ? "": "isbg"),
        g += '" style="background: ',
        d.style && d.style.bgColor ? (g += " ", g += c(d.style.bgColor), g += " ") : g += " #ff7e00 ",
        g += " ",
        d.flagPic && (g += " url(", g += c(d.flagPic), g += ")no-repeat 90% center;background-size: auto 100%; "),
        g += ' "> <div class="state-cont"> <p class="h">',
        g += c(d.text),
        g += "</p> ",
        d.extra && (g += " ", e(d.extra,
        function(a) {
            g += ' <p class="sub">',
            g += c(f.lib.secureFilters(a)),
            g += "</p> "
        }), g += " "),
        g += " </div> ",
        !d.style || "true" !== d.style.rainbowBar && d.style.rainbowBar !== !0 || (g += ' <div class="rainbowBar"></div> '),
        g += " </div>",
        new k(g)
    }),
    a("step/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$each),
        d = a.data,
        e = (a.value, a.i, b.$string),
        f = (a.label, a.j, "");
        return f += ' <div class="order-phase"> <ul class="o-t-phase"> ',
        c(d.values,
        function(a) {
            f += ' <li class="',
            "true" === a.current && (f += "current"),
            f += '"> <p>阶段',
            f += e(a.num),
            f += "：",
            f += e(a.name),
            f += "</p> <p>",
            f += e(a.status),
            f += "：<span>",
            f += e(a.totalFee),
            f += "</span> </p> ",
            a.statusMemo && (f += " <p> ", a.statusMemo.name && (f += " ", f += e(a.statusMemo.name), f += "： "), f += " ", f += e(a.statusMemo.value), f += " </p> "),
            f += " ",
            a.labels && (f += " ", c(a.labels,
            function(a) {
                f += ' <p class="sub"> ',
                a.name && (f += " ", f += e(a.name), f += "： "),
                f += " ",
                f += e(a.value),
                f += " </p> "
            }), f += " "),
            f += " </li> "
        }),
        f += " </ul> </div> ",
        new k(f)
    }),
    a("storage/index", ""),
    a("sub/index",
    function(a) {
        "use strict";
        var b = this,
        c = b.$helpers,
        d = b.$string,
        e = a.data,
        f = a.key,
        g = a.cellData,
        h = a.j,
        i = "";
        return i += '<div class="item-list o-t-item" data-id="',
        i += d(e.mainOrderId),
        i += '"> ',
        i += d(c.includeChild(f, g.tag, "div", g.fields ? g.fields.mainOrderId = h: "", g.fields, "")),
        i += " </div> ",
        new k(i)
    }),
    a("suborderop/index", ""),
    a("talkseller/index",
    function(a) {
        "use strict";
        var b = this,
        c = (b.$helpers, b.$string),
        d = a.data,
        e = "";
        return e += ' <div class="order-tablink o-t-tablink"> <div class="cont ww" data-nick="',
        e += c(d.storage.sellerNick),
        e += '"> <p><span class="ico icon-wang"></span></p> <p><span>联系卖家</span></p> </div> ',
        d.storage.phone && (e += ' <a class="cont phone" href="tel:', e += c(d.storage.phone), e += '"> <p><span class="ico icon-phone"></span></p> <p><span>卖家电话</span></p> </a> '),
        e += " </div>",
        new k(e)
    }),
    a("topTab/index", '<div class="nav-tab-top"> <ul> <li class="cur" data-code="all">全部</li> <li data-code="waitPay">待付款</li> <li data-code="waitSend">待发货</li> <li data-code="waitConfirm">待收货</li> <li data-code="waitRate">待评价</li> </ul> </div> ')
} (), window.lib.define("app.orderManage.address",
function() {
    "use strict";
    return {
        init: function(a, b, c) {}
    }
}), window.lib.define("app.orderManage.detail",
function() {
    "use strict";
    return {
        init: function(a, b, c) {}
    }
}), window.lib.define("app.orderManage.error",
function() {
    "use strict";
    return {
        init: function(a, b, c) {}
    }
}), window.lib.define("app.orderManage.head",
function() {
    "use strict";
    return {
        init: function(a, b, c) {}
    }
}), window.lib.define("app.orderManage.headerBar",
function() {
    "use strict";
    return {
        init: function(a, b, c, d) {}
    }
}), window.lib.define("app.orderManage.item",
function() {
    "use strict";
    return {
        init: function(a, b, c, d, e) {
            function f(a) {
                var a = JSON.parse(JSON.stringify(a)),
                b = a.event.templates,
                c = b["item_" + l],
                d = c.eventType,
                e = c.params;
                for (var f in e) {
                    var g = e[f].match(/\$\{([\w]+)\}/),
                    h = e[f].match(/\$\{this.([\w]+)\}/);
                    if (g) {
                        var j = g[1];
                        e[f] = k[j]
                    } else if (h) {
                        var j = h[1];
                        e[f] = eventData[j]
                    }
                }
                if ("url" === d) {
                    var m = c.url;
                    i = m.replace(/\$\{([\w]+)\}/g,
                    function(a, b) {
                        return e[b]
                    })
                }
            }
            function g(a, b) {
                var c = new lib.httpurl(a);
                try {
                    c.params.spm = g_SPM.spm(b)
                } catch(d) {}
                return c.toString()
            }
            var h = a.attr("id"),
            i = "",
            j = c.mainOrderId,
            k = c.storage,
            l = k.orderType,
            m = k.subAuctionIds,
            n = c.ids,
            o = Number(n.split("_")[1]),
            p = m[o - 1];
            if (d.hasClass("list")) if ("orderNative" === l) i = "//h5." + lib.mtop.config.subDomain + ".taobao.com/mlapp/odetail.html?bizOrderId=" + j + "&archive=" + k.archive;
            else {
                var q = window.namespace("app.orderMange.tempEvent").init();
                f(q)
            } else d.hasClass("detail") && (i = "//a." + lib.mtop.config.subDomain + ".taobao.com/i" + p + ".htm");
            d.on("click", "#" + h + " .item-img",
            function() {
                i && (location.href = g(i, this))
            }).on("click", "#" + h + " .item-info",
            function() {
                i && (location.href = g(i, this))
            })
        }
    }
}), window.lib.define("app.orderManage.label",
function() {
    "use strict";
    return {
        init: function(a, b, c, d) {
            var e = a.attr("id"),
            f = window.namespace("app.orderMange.tempEvent"),
            g = f.init(),
            h = g.event.templates,
            i = g.orderop || {},
            j = c.storage;
            "true" === c.triggerEvent && d.on("click", "#" + e + " .label",
            function() {
                var a = $(this),
                b = a.attr("name"),
                c = i[b],
                e = h[c.eventId],
                g = e.eventType;
                e.code = b,
                f.sltEvent(g, e, a[0], j, d)
            })
        }
    }
}), window.lib.define("app.orderManage.list",
function() {
    "use strict";
    return {
        init: function(a, b, c) {}
    }
}), window.lib.define("app.orderManage.logisticsholder",
function() {
    "use strict";
    return {
        init: function(a, b, c, d) {
            function e(a, b) {
                var c = new lib.httpurl(a);
                try {
                    c.params.spm = g_SPM.spm(b)
                } catch(d) {}
                return c.toString()
            }
            var f = a.attr("id");
            d.on("click", "#" + f + " .express",
            function() {
                var a = "//h5." + lib.mtop.config.subDomain + ".taobao.com/awp/mtb/oper.htm?operId=0&orderId=" + c.mainOrderId;
                location.href = e(a, this)
            })
        }
    }
}), window.lib.define("app.orderManage.memo",
function() {
    "use strict";
    return {
        init: function(a, b, c) {}
    }
}), window.lib.define("app.orderManage.order",
function() {
    "use strict";
    return {
        init: function(a, b, c) {}
    }
}), window.lib.define("app.orderManage.orderinfo",
function() {
    "use strict";
    return {
        init: function(a, b, c) {}
    }
}), window.lib.define("app.orderManage.orderop",
function() {
    "use strict";
    return {
        init: function(a, b, c, d) {
            function e(a) {
                var b = a.attr("name"),
                c = a.attr("data-url"),
                e = j[b];
                if (a.hasClass("more")) {
                    var h = a.next(".sublist");
                    a.hasClass("off") ? (h.hide(), a.removeClass("off")) : (h.show(), a.addClass("off"))
                } else if (c) location.href = g.getSpmUrl(c, this);
                else if (e) {
                    var l = i[e.eventId],
                    m = l.eventType;
                    l.code = b,
                    g.sltEvent(m, l, a[0], f, d, k)
                } else lib.notification.simple("该功能尚未上线 请用手机淘宝查看")
            }
            var c = c,
            f = c.storage,
            g = (f.mainOrderId, window.namespace("app.orderMange.tempEvent")),
            h = g.init(),
            i = h.event.templates,
            j = h.orderop || {},
            k = a.attr("id");
            d.on("click", "#" + k + " li",
            function() {
                var a = $(this);
                e(a)
            }).on("click", "#o-pop-btm" + k + " .cancel",
            function() {
                var a = $(this);
                e(a)
            }).on("click", "#o-pop-btm" + k + " .confirmPay",
            function() {
                var a = $(this);
                e(a)
            })
        }
    }
}), window.lib.define("app.orderManage.pay",
function() {
    "use strict";
    return {
        init: function(a, b, c) {}
    }
}), window.lib.define("app.orderManage.paydetail",
function() {
    "use strict";
    return {
        init: function(a, b, c) {}
    }
}), window.lib.define("app.orderManage.seller",
function() {
    "use strict";
    return {
        init: function(a, b, c) {}
    }
}), window.lib.define("app.orderManage.status",
function() {
    "use strict";
    return {
        init: function(a, b, c) {}
    }
}), window.lib.define("app.orderManage.step",
function() {
    "use strict";
    return {
        init: function(a, b, c) {}
    }
}), window.lib.define("app.orderManage.storage",
function() {
    "use strict";
    return {
        init: function(a, b, c, d) {
            if (d.hasClass("detail")) {
                var e = c.pageName;
                e && (d.find(".header .title").text(e), lib.env.aliapp && lib.env.aliapp.windvane && "0.0.0" !== lib.env.aliapp.windvane.val && window.WindVane && window.WindVane.call("WebAppInterface", "setCustomPageTitle", {
                    title: e
                },
                function(a) {},
                function(a) {}))
            }
        }
    }
}), window.lib.define("app.orderManage.sub",
function() {
    "use strict";
    return {
        init: function(a, b, c) {}
    }
}), window.lib.define("app.orderManage.suborderop",
function() {
    "use strict";
    return {
        init: function(a, b, c) {}
    }
}), window.lib.define("app.orderManage.talkseller",
function() {
    "use strict";
    return {
        init: function(a, b, c, d) {
            function e(a, b, c, d) {
                var e = h.encode(a) || "",
                f = b || "",
                i = c || "",
                j = d || "",
                k = g({
                    subdomain: "h5",
                    path: "ww/index.htm"
                }) + "#!dialog-{{sellerNick}}-{{itemId}}-{{shopId}}-{{orderId}}";
                return k.replace("{{sellerNick}}", e).replace("{{itemId}}", f).replace("{{shopId}}", i).replace("{{orderId}}", j)
            }
            function f(a, b) {
                var c = new lib.httpurl(a);
                try {
                    c.params.spm = g_SPM.spm(b)
                } catch(d) {}
                return c.toString()
            }
            var g = window.lib.uri.getUrl,
            h = window.lib.encode.base64_utf8,
            i = a.attr("id"),
            j = c.storage || {},
            k = j.sellerNick,
            l = (j.sellerId, j.mainOrderId),
            m = e(k, null, null, l);
            d.on("click", "#" + i + " .cont.ww",
            function() {
                location.href = f(m, this)
            })
        }
    }
}), window.lib.define("app.orderManage.topTab",
function() {
    "use strict";
    return {
        init: function(a, b, c) {}
    }
}), window.lib.define("app.orderMange.render",
function() {
    var a = {
        isT: {},
        n: 0,
        start: function(a, b) {
            this.rootNode = a,
            this.template = window.orderManageTemplate,
            this.modelObj = [],
            this._templateHelper(),
            this.imgHelper = b
        },
        _init: function(a, b, c, d) {
            var e = this;
            this.modelObj = [],
            this.modelName = c,
            this.rootNode = b,
            this.setStorageFun(c, a, {}),
            this._renderOrder.call(e, a, null, d)
        },
        _renderOrder: function(a, b, c) {
            var d = this,
            e = this._renderHtml(a, b, d.modelName),
            f = $(e);
            c && c(e),
            d.getStorageFun(f)
        },
        _renderHtml: function(a, b, c, d) {
            var e = this,
            f = window.namespace("app.orderManage." + c);
            if (f && f.init) {
                var g = e.n;
                return e.n++,
                e.template(c + "/index", {
                    data: a,
                    parentData: b,
                    dataParent: d,
                    win: window,
                    obj: {},
                    id: c + g,
                    imgHelper: e.imgHelper
                })
            }
            return ""
        },
        _creatElement: function(a, b, c, d, e, f) {
            var g = this._renderHtml(a, b, d, f);
            return "{Template Error}" === g && (g = ""),
            "<" + c + ' class="' + e + " " + d + '" id="' + a.randomId + '">' + g + "</" + c + ">"
        },
        _templateHelper: function() {
            var a = this;
            a.template.helper("includeChild",
            function(b, c) {
                var d = "",
                e = arguments[4] || {},
                f = arguments[5] || {},
                g = arguments[6] || {},
                h = arguments[2] || "div",
                i = arguments[3] || "";
                return e.randomId = c + a.n,
                a.setStorageFun(c, e, f),
                d += a._creatElement.call(a, e, f, h, c, i, g)
            })
        },
        getStorageFun: function(a) {
            for (var b = this,
            c = 0; c < b.modelObj.length; c++) {
                var d = b.modelObj[c],
                e = d.model,
                f = a.find("#" + d.tag + d.n),
                g = d.parentData;
                new e.init(f, d.tag, d.data, b.rootNode, g)
            }
        },
        setStorageFun: function(a, b, c, d) {
            var e = this,
            f = window.namespace("app.orderManage." + a);
            if (f) {
                var g = {
                    tag: a,
                    data: b,
                    dataParent: d,
                    parent: parent,
                    n: e.n,
                    model: f
                };
                e.modelObj.push(g)
            }
        }
    };
    return a
}), window.lib.define("app.orderMange.tempEvent",
function() {
    var a = {
        init: function() {
            return this.tempEvent || this.handle(this.data)
        },
        start: function() {
            var a = this;
            if (a.local = window.localStorage, a.tempEvent) return a.tempEvent;
            var b = a.handle(a.data);
            a.getDataObj(b)
        },
        setSend: function() {
            var a = this;
            a.getSend().then(function(b) {
                a.getDataObj(b)
            })["catch"](function() {
                a.tempEvent = a.data
            })
        },
        getDataObj: function(a) {
            var b = this;
            b.tempEvent = a;
            var c = b.getDate(),
            d = b.getDate(c.year + "-" + c.month + "-" + c.day).time,
            e = {
                time: d,
                data: a
            };
            b.local && localStorage.setItem("tempEvent", JSON.stringify(e))
        },
        getSend: function() {
            var a = this;
            return new Promise(function(b, c) {
                $.ajax({
                    type: "GET",
                    url: "//gw.alicdn.com/L0/avengers/component/TB1pjm0IpXXXXXYXpXXhA1h2FXX",
                    data: {},
                    dataType: "json",
                    timeout: 2e3,
                    success: function(c) {
                        var c = a.handle(c);
                        a.tempEvent = c,
                        b(c)
                    },
                    error: function(b, d) {
                        a.tempEvent = a.handle(a.data),
                        c(b)
                    }
                })
            })
        },
        handle: function(a) {
            for (var b = a.orderop,
            c = b.templates,
            d = {},
            e = 0; e < c.length; e++) {
                var f = c[e];
                d[f.code] = f
            }
            return a.orderop = d,
            a
        },
        getDate: function(a) {
            var b = a ? new Date(a) : new Date,
            c = b.getFullYear(),
            d = b.getMonth() + 1,
            e = b.getDate();
            return {
                year: c,
                month: d,
                day: e,
                time: b.getTime()
            }
        },
        sltEvent: function(a, b, c, d, e, f) {
            that = this;
            var b = JSON.parse(JSON.stringify(b)),
            g = b.code,
            h = b.params,
            i = d.mainOrderId;
            for (var j in h) {
                var k = h[j].match(/\$\{([\w]+)\}/),
                l = h[j].match(/\$\{this.([\w]+)\}/);
                if (k) {
                    var m = k[1];
                    h[j] = d[m]
                } else if (l) {
                    var m = l[1];
                    h[j] = b[m]
                }
            }
            if ("alert" === a) that.alertEvent(b, d, e, f);
            else if ("mtop" === a) that.mtopEvent(b).then(function(a) {
                var b = a.ret,
                d = (b && b[0].split("::")[1], a.data),
                b = ["pay", "helpPay", "confirmGood", "stepPay", "preAuth", "stepConfirm2", "stepConfirmGood", "confirmPay"];
                if (d.eventType) {
                    if ("url" === d.eventType) location.href = that.getSpmUrl(d.url, c);
                    else if ("toast" === d.eventType) lib.notification.simple(d.msg);
                    else if ("alert" === d.eventType) {
                        var h = lib.notification.confirm("确认", d.msg,
                        function() {
                            h.hide()
                        });
                        h.show()
                    }
                } else "stepPayV2" === g ? that.setStepPayV2(d, f) : d.reason ? lib.notification.simple(d.reason) : b.indexOf(g) >= 0 || lib.notification.simple(d.msg || "请求成功");
                setTimeout(function() {
                    b.indexOf(g) >= 0 ? location.href = d.alipayUrl: "cancelOrder" === g || "cancelApply" === g || "stepConfirm" === g || "stepConfirmGood2" === g ? location.reload() : "delOrder" === g && (e.hasClass("detail") ? history.back() : e.hasClass("list") && (e.find("#" + f).parents("li").eq(0).remove(), window.app.orderMangeListInit && window.app.orderMangeListInit.scrollView && window.app.orderMangeListInit.scrollView.refresh()))
                },
                500)
            })["catch"](function(a) {
                var b = a.ret,
                c = b && b[0].split("::")[1];
                lib.notification.simple(c)
            });
            else if ("url" === a) {
                var n = b.url;
                n = n.replace(/\$\{([\w]+)\}/g,
                function(a, b) {
                    return h[b]
                }),
                location.href = that.getSpmUrl(n, c)
            } else if ("nativeUrl" === a) {
                var n = "";
                "viewLogistic" === g ? n = "//h5." + lib.mtop.config.subDomain + ".taobao.com/awp/mtb/oper.htm?operId=0&orderId=" + h.orderId: "rateOrder" === g || "tmallRateOrder" === g ? n = "//h5." + lib.mtop.config.subDomain + ".taobao.com/awp/mtb/rate.htm?orderId=" + h.orderId + "&orderID=" + h.orderId: "appendRate" === g ? n = "//h5." + lib.mtop.config.subDomain + ".taobao.com/rate/appendRate.html#!parentBizOrderId=" + h.orderId + "&isArchive=" + d.archive: "tmallAppendRate" === g && (n = "//h5." + lib.mtop.config.subDomain + ".taobao.com/rate/tmallappendRate.html#!parentBizOrderId=" + h.orderId + "&isArchive=" + d.archive),
                n ? location.href = that.getSpmUrl(n, c) : lib.notification.simple("该功能尚未上线 请用手机淘宝查看")
            } else if ("native" === a) if ("cancelOrder" === g || "cancelApply" === g) {
                for (var o = b.reasons,
                p = [], q = 0; q < o.length; q++) {
                    var r = {},
                    s = o[q];
                    r.key = s.value,
                    r.value = s.key,
                    p.push(r)
                }
                that.selectMenu(g, p, b, e, d)
            } else if ("talkww" === g) {
                var t = d.sellerNick,
                n = that.getWwUrl(t, null, null, i);
                location.href = that.getSpmUrl(n, c)
            } else if ("cancel" === g) {
                var u = $(c).parents(".o-pop-btm");
                u.hide()
            } else lib.notification.simple("该功能尚未上线 请用手机淘宝查看")
        },
        alertEvent: function(a, b, c, d) {
            var e = this,
            f = a.title,
            g = a.msg,
            h = a.nextEventId,
            i = a.code,
            j = e.tempEvent.event.templates,
            k = j[h],
            l = k.eventType;
            k.code = i;
            var m = lib.notification.confirm(f, g,
            function(a, f) {
                f && e.sltEvent(l, k, null, b, c, d),
                m.hide()
            });
            m.show()
        },
        mtopEvent: function(a) {
            var b = a.api,
            c = a.v,
            d = a.params;
            return $(".shade").show(),
            new Promise(function(a, e) {
                lib.mtop.loginRequest({
                    api: b,
                    v: c,
                    data: d,
                    ecode: 1,
                    ttid: "h5"
                },
                function(b) {
                    b && b.ret && 0 === b.ret[0].indexOf("SUCCESS") ? a(b) : e(b),
                    $(".shade").hide()
                },
                function(a) {
                    e(a),
                    $(".shade").hide()
                })
            })
        },
        setStepPayV2: function(a, b) {
            for (var c = this,
            d = $(".order-manage"), e = d.find("#o-pop-btm" + b), f = a.op || [], g = a.detailInfo || [], h = a.multiDetailInfo || [], i = a.warnTips || {},
            j = c.tempEvent.orderop || {},
            k = "", l = "", m = "", n = "", o = "", p = "", q = 0; q < f.length; q++) {
                var r = f[q],
                s = j[r],
                t = s.text,
                u = s.eventId;
                l += '<p class="' + r + '" name="' + r + '" id="' + u + '">' + t + "</p>"
            }
            if (g.length) {
                m += '<div class="info"><ul>';
                for (var v = 0; v < g.length; v++) {
                    var w = g[v];
                    m += "<li><p>" + w.name + '</p><p class="' + ("true" === w.highLight ? "h": "") + '">' + w.value + "</p></li>"
                }
                m += "</u></div>"
            }
            if (h.length) {
                n += '<div class="minfo">';
                for (var x = 0; x < h.length; x++) {
                    var w = h[x];
                    n += "<p>" + w.name + '</p><p class="' + ("true" === w.highLight ? "h": "") + '">' + w.value + "</p>"
                }
                n += "</div>"
            }
            if (i.desc && (p += '<div class="subinfo">' + i.desc + "</div>"), o = '<div class="title">' + a.title + '</div><div class="detail">' + p + m + n + '</div><div class="btn">' + l + "</div>", e.length) {
                e.find(".main").addClass("hide").html(o),
                e.show();
                setTimeout(function() {
                    e.find(".main").removeClass("hide").addClass("show"),
                    clearTimeout(a);
                    var a = setTimeout(function() {
                        e.find(".main").removeClass("show"),
                        clearTimeout(a)
                    },
                    400)
                },
                50)
            } else {
                k = '<div class="o-pop-btm" id="o-pop-btm' + b + '"><div class="blank"></div><div class="main hide">' + o + "</div></div>",
                d.append(k),
                e = d.find(".o-pop-btm");
                setTimeout(function() {
                    e.find(".main").removeClass("hide").addClass("show"),
                    clearTimeout(a);
                    var a = setTimeout(function() {
                        e.find(".main").removeClass("show"),
                        clearTimeout(a)
                    },
                    400)
                },
                50)
            }
        },
        selectMenu: function(a, b, c, d, e) {
            var f = this,
            g = f.tempEvent.event.templates,
            h = ctrl.selectmenu,
            i = new h({
                confirmText: "确定",
                title: f.tempEvent.orderop[a].text || "操作设置",
                cancelText: "取消"
            });
            i.viewModel = {
                code: b
            },
            i.addEventListener("confirm",
            function(b) {
                var h = this.selectedValue,
                j = c.nextEventId,
                k = g[j];
                k.code = a,
                k.params.map = {
                    reasonId: h["val-code"]
                },
                k.params.map = JSON.stringify(k.params.map),
                f.sltEvent(k.eventType, k, null, e, d),
                setTimeout(function() {
                    i.remove()
                },
                500)
            }),
            i.addEventListener("cancel",
            function(a) {
                setTimeout(function() {
                    i.remove()
                },
                500)
            }),
            d.append(i.root),
            i.show()
        },
        getWwUrl: function(a, b, c, d) {
            var e = window.lib.uri.getUrl,
            f = window.lib.encode.base64_utf8,
            g = f.encode(a) || "",
            h = b || "",
            i = c || "",
            j = d || "",
            k = e({
                subdomain: "h5",
                path: "ww/index.htm"
            }) + "#!dialog-{{sellerNick}}-{{itemId}}-{{shopId}}-{{orderId}}";
            return k.replace("{{sellerNick}}", g).replace("{{itemId}}", h).replace("{{shopId}}", i).replace("{{orderId}}", j)
        },
        getSpmUrl: function(a, b) {
            var c = new lib.httpurl(a);
            try {
                c.params.spm = g_SPM.spm(b)
            } catch(d) {}
            return c.toString()
        },
        data: {
            outterurl: {
                v: "2.0",
                templates: [{
                    text: "全部",
                    eventId: "allOrder_native",
                    code: "allOrder"
                },
                {
                    text: "机票",
                    eventId: "flight_h5",
                    code: "flight"
                },
                {
                    text: "彩票",
                    eventId: "lottery_h5",
                    code: "lottery"
                },
                {
                    text: "电影票",
                    eventId: "movie_h5",
                    code: "movie"
                },
                {
                    text: "火车票",
                    eventId: "train_h5",
                    code: "train"
                }],
                modified: "true"
            },
            event: {
                v: "13.0",
                templates: {
                    item_1410_flight: {
                        params: {
                            orderId: "${flightOrderId}"
                        },
                        eventType: "url",
                        url: "http://h5.m.taobao.com/trip/flight/myorder/detail.html?orderType=interflight&orderId=${orderId}"
                    },
                    doPayOverseas: {
                        v: "3.0",
                        api: "mtop.order.doPay",
                        params: {
                            code: "${this.code}",
                            orderId: "${overOrderId}"
                        },
                        eventType: "mtop"
                    },
                    queryTail: {
                        v: "3.0",
                        api: "mtop.order.queryTail",
                        params: {
                            code: "${this.code}",
                            mainOrderId: "${mainOrderId}"
                        },
                        eventType: "mtop"
                    },
                    talkphone: {
                        eventType: "native"
                    },
                    appendRate: {
                        params: {
                            orderId: "${mainOrderId}",
                            subOrderId: "${subOrderIds[?]}"
                        },
                        eventType: "nativeUrl"
                    },
                    cancelOrder: {
                        eventType: "native",
                        reasons: [{
                            value: "我不想买了",
                            key: "1"
                        },
                        {
                            value: "信息填写错误，重新拍",
                            key: "2"
                        },
                        {
                            value: "卖家缺货",
                            key: "3"
                        },
                        {
                            value: "同城见面交易",
                            key: "4"
                        },
                        {
                            value: "其他原因",
                            key: "5"
                        }],
                        nextEventId: "orderOperate"
                    },
                    allOrder_native: {
                        eventType: "nativeUrl"
                    },
                    viewLogistic: {
                        params: {
                            orderId: "${mainOrderId}"
                        },
                        eventType: "nativeUrl"
                    },
                    delayTimeout: {
                        title: "确认延长收货时间?",
                        eventType: "alert",
                        msg: "每笔订单只能延迟一次哦",
                        nextEventId: "orderOperate"
                    },
                    item_150_movie: {
                        params: {
                            tbOrderId: "${mainOrderId}"
                        },
                        eventType: "url",
                        url: "http://h5.m.taobao.com/movie/tbm/myorder-detail.html?tbOrderId=${tbOrderId}"
                    },
                    item_200_daijia: {
                        params: {
                            orderId: "${daijia}"
                        },
                        eventType: "url",
                        url: "http://h5.m.taobao.com/servitization/daijia/order.html?data=${orderId}"
                    },
                    item_1102_baoxian: {
                        params: {
                            bizOrderId: "${mainOrderId}"
                        },
                        eventType: "url",
                        url: "http://h5.m.taobao.com/bx/orderdetail.html?bizOrderId=${bizOrderId}"
                    },
                    item_6800_train: {
                        params: {
                            orderId: "${mainOrderId}"
                        },
                        eventType: "url",
                        url: "http://h5.m.taobao.com/trip/train/myorder/detail.html?orderId=${orderId}"
                    },
                    usePugService: {
                        params: {
                            orderId: "${mainOrderId}"
                        },
                        eventType: "url",
                        url: "http://hs.tmall.com/pug/show_stores_for_mobile.htm?order_id=${orderId}"
                    },
                    realNameAuth: {
                        params: {
                            order_id: "${mainOrderId}"
                        },
                        eventType: "url",
                        url: "http://wt.m.taobao.com/trade/auth.htm?order_id=${order_id}"
                    },
                    orderOperate: {
                        v: "3.0",
                        api: "mtop.order.doOp",
                        params: {
                            archive: "${archive}",
                            code: "${this.code}",
                            orderId: "${mainOrderId}"
                        },
                        eventType: "mtop"
                    },
                    lottery_h5: {
                        eventType: "currentViewUrl",
                        url: "http://h5.m.taobao.com/cph5/tb/orderlist/index.html?tag=order_detail"
                    },
                    item_200_miaoloan: {
                        params: {
                            orderId: "${mainOrderId}"
                        },
                        eventType: "url",
                        url: "http://h5.m.taobao.com/mlapp/odetail.html?hideBar=true&bizOrderId=${orderId}"
                    },
                    talkww: {
                        eventType: "native"
                    },
                    item_1600_waimai: {
                        params: {
                            bizOrderId: "${mainOrderId}"
                        },
                        eventType: "url",
                        url: "http://dd.m.taobao.com/dd/my_delivery_detail/${bizOrderId}"
                    },
                    movie_h5: {
                        eventType: "currentViewUrl",
                        url: "http://h5.m.taobao.com/movie/tbm/movieorder.html?tag=order_detail"
                    },
                    cancelApply: {
                        eventType: "native",
                        reasons: [{
                            value: "好奇随便尝试下",
                            key: "11"
                        },
                        {
                            value: "分期的额度不够",
                            key: "12"
                        },
                        {
                            value: "分期的利息太高",
                            key: "13"
                        },
                        {
                            value: "再看看其他车型",
                            key: "14"
                        },
                        {
                            value: "新业务有些顾虑",
                            key: "15"
                        },
                        {
                            value: "其他原因",
                            key: "16"
                        }],
                        nextEventId: "orderOperate"
                    },
                    item_1400_flight: {
                        params: {
                            orderId: "${flightOrderId}"
                        },
                        eventType: "url",
                        url: "http://h5.m.taobao.com/trip/flight/myorder/detail.html?orderId=${orderId}"
                    },
                    rateOrder: {
                        params: {
                            orderId: "${mainOrderId}",
                            subOrderId: "${subOrderIds[?]}"
                        },
                        eventType: "nativeUrl"
                    },
                    item_3yzbService: {
                        params: {
                            subOrderId: "${subOrderIds[?]}"
                        },
                        eventType: "url",
                        url: "http://fwfront.tmall.com/serviceDetail/buyerZhibaoMobileDetail.htm?serviceOrderId=${subOrderId}"
                    },
                    delOrder: {
                        title: "确认删除订单?",
                        eventType: "alert",
                        msg: "删除之后将无法恢复",
                        nextEventId: "orderOperate"
                    },
                    queryBoughtList: {
                        v: "3.0",
                        api: "mtop.order.queryBoughtList",
                        params: {
                            tabCode: "${this.code}"
                        },
                        eventType: "mtop"
                    },
                    queryOrderDetail: {
                        v: "3.0",
                        api: "mtop.order.queryDetail",
                        params: {
                            archive: "${archive}",
                            bizOrderId: "${mainOrderId}"
                        },
                        eventType: "mtop"
                    },
                    doAny: {
                        v: "3.0",
                        api: "mtop.order.doAny",
                        params: {
                            code: "${this.code}",
                            orderId: "${mainOrderId}"
                        },
                        eventType: "mtop"
                    },
                    item_700_hotel: {
                        params: {
                            orderId: "${mainOrderId}"
                        },
                        eventType: "url",
                        url: "http://h5.m.taobao.com/trip/hotel/order/order-detail.html?orderId=${orderId}"
                    },
                    item_itemNative: {
                        params: {
                            itemId: "${subAuctionIds[?]}"
                        },
                        eventType: "nativeUrl"
                    },
                    item_3000_fund: {
                        params: {
                            orderId: "${mainOrderId}"
                        },
                        eventType: "url",
                        url: "http://h5.m.taobao.com/fund/orderdetail.html?orderId=${orderId}"
                    },
                    item_200_lightservice: {
                        params: {
                            orderId: "${lightService}"
                        },
                        eventType: "url",
                        url: "http://h5.m.taobao.com/fwjy/detail.html?data=${orderId}"
                    },
                    viewCard: {
                        params: {
                            orderId: "${mainOrderId}"
                        },
                        eventType: "url",
                        url: "http://h5.m.taobao.com/awp/mtb/oper.htm?operId=1&hybrid=true&orderId=${orderId}"
                    },
                    tmallAppendRate: {
                        params: {
                            orderId: "${mainOrderId}",
                            subOrderId: "${subOrderIds[?]}"
                        },
                        eventType: "nativeUrl"
                    },
                    flight_h5: {
                        eventType: "currentViewUrl",
                        url: "http://h5.m.taobao.com/trip/flight/myorder/list.html?tag=order_detail#list"
                    },
                    train_h5: {
                        eventType: "currentViewUrl",
                        url: "http://h5.m.taobao.com/trip/h5-train/myorder/list.html?tag=order_detail"
                    },
                    item_orderNative: {
                        params: {
                            archive: "${archive}",
                            orderId: "${mainOrderId}"
                        },
                        eventType: "nativeUrl"
                    },
                    doPay: {
                        v: "3.0",
                        api: "mtop.order.doPay",
                        params: {
                            code: "${this.code}",
                            orderId: "${mainOrderId}"
                        },
                        eventType: "mtop"
                    },
                    closeWindow: {
                        eventType: "native"
                    },
                    tmallRateOrder: {
                        params: {
                            orderId: "${mainOrderId}",
                            subOrderId: "${subOrderIds[?]}"
                        },
                        eventType: "nativeUrl"
                    },
                    viewEticket: {
                        params: {
                            isArchive: "${archive}",
                            orderId: "${mainOrderId}"
                        },
                        eventType: "url",
                        url: "http://bendi.m.taobao.com/coupon/q/eticket_detail.htm?orderId=${orderId}&isArchive=${isArchive}&hybrid=true"
                    },
                    item_1102_baoxianflight: {
                        params: {
                            bizOrderId: "${mainOrderId}"
                        },
                        eventType: "url",
                        url: "http://h5.m.taobao.com/bx/aviationins.html?bizOrderId=${bizOrderId}"
                    },
                    item_service: {
                        eventType: "native"
                    },
                    viewEticket2: {
                        params: {
                            isArchive: "${archive}",
                            orderId: "${mainOrderId}"
                        },
                        eventType: "url",
                        url: "http://bendi.m.taobao.com/coupon/q/eticket_sec_pay_detail.htm?orderId=${orderId}&isArchive=${isArchive}"
                    }
                },
                modified: "true"
            },
            suborderop: {
                v: "1.0",
                templates: [{
                    text: "追加评价",
                    eventId: "tmallAppendRate",
                    code: "tmallAppendRate"
                }],
                modified: "true"
            },
            orderop: {
                v: "7.0",
                templates: [{
                    text: "付款",
                    eventId: "doPay",
                    code: "pay",
                    highlight: "true"
                },
                {
                    text: "取消",
                    code: "cancel"
                },
                {
                    text: "朋友代付",
                    eventId: "doPay",
                    code: "helpPay"
                },
                {
                    text: "确认收货",
                    eventId: "doPay",
                    code: "confirmGood",
                    highlight: "true"
                },
                {
                    text: "付款",
                    eventId: "doPay",
                    code: "stepPay",
                    highlight: "true"
                },
                {
                    text: "付款",
                    eventId: "queryTail",
                    code: "stepPayV2",
                    highlight: "true"
                },
                {
                    text: "确认付尾款",
                    eventId: "doPay",
                    code: "confirmPay",
                    highlight: "true"
                },
                {
                    text: "取消",
                    eventId: "closeWindow",
                    code: "cancel"
                },
                {
                    text: "付款",
                    eventId: "doPay",
                    code: "preAuth",
                    highlight: "true"
                },
                {
                    text: "去认证",
                    eventId: "realNameAuth",
                    code: "realNameAuth",
                    highlight: "true"
                },
                {
                    text: "确认",
                    eventId: "doPay",
                    code: "stepConfirm",
                    highlight: "true"
                },
                {
                    text: "确认",
                    eventId: "doPay",
                    code: "stepConfirm2",
                    highlight: "true"
                },
                {
                    text: "确认收货",
                    eventId: "doPay",
                    code: "stepConfirmGood",
                    highlight: "true"
                },
                {
                    text: "确认收货",
                    eventId: "doPay",
                    code: "stepConfirmGood2",
                    highlight: "true"
                },
                {
                    text: "提醒发货",
                    eventId: "orderOperate",
                    code: "notifyDelivery"
                },
                {
                    text: "取消订单",
                    eventId: "cancelOrder",
                    code: "cancelOrder"
                },
                {
                    text: "确认申请",
                    eventId: "orderOperate",
                    code: "confirmApply",
                    highlight: "true"
                },
                {
                    text: "取消申请",
                    eventId: "cancelApply",
                    code: "cancelApply"
                },
                {
                    text: "延长收货",
                    eventId: "delayTimeout",
                    code: "delayTimeout"
                },
                {
                    text: "查看物流",
                    eventId: "viewLogistic",
                    code: "viewLogistic"
                },
                {
                    text: "删除订单",
                    eventId: "delOrder",
                    code: "delOrder"
                },
                {
                    text: "电子凭证",
                    eventId: "viewEticket",
                    code: "viewEticket",
                    highlight: "true"
                },
                {
                    text: "电子凭证",
                    eventId: "viewEticket2",
                    code: "viewEticket2",
                    highlight: "true"
                },
                {
                    text: "先试后买",
                    eventId: "orderOperate",
                    code: "installmentBill"
                },
                {
                    text: "分期购",
                    eventId: "orderOperate",
                    code: "installmentBill2"
                },
                {
                    eventId: "orderOperate",
                    code: "installment"
                },
                {
                    text: "评价",
                    eventId: "rateOrder",
                    code: "rateOrder",
                    highlight: "true"
                },
                {
                    text: "追加评价",
                    eventId: "appendRate",
                    code: "appendRate"
                },
                {
                    text: "评价",
                    eventId: "tmallRateOrder",
                    code: "tmallRateOrder",
                    highlight: "true"
                },
                {
                    text: "追加评价",
                    eventId: "tmallAppendRate",
                    code: "tmallAppendRate"
                },
                {
                    text: "查看卡密",
                    eventId: "viewCard",
                    code: "viewCard"
                },
                {
                    text: "提取卡密",
                    eventId: "viewCard",
                    code: "viewCard2"
                },
                {
                    text: "联系卖家",
                    eventId: "talkww",
                    code: "talkww"
                },
                {
                    text: "拨打电话",
                    eventId: "talkphone",
                    code: "talkphone"
                },
                {
                    text: "门店自提",
                    eventId: "usePugService",
                    code: "usePugService"
                },
                {
                    eventId: "recommendUrl",
                    code: "recommendUrl"
                }],
                modified: "true"
            },
            batchop: {
                v: "1.0",
                templates: [{
                    text: "合并付款",
                    eventId: "doPay",
                    code: "batchPay",
                    highlight: "true"
                }],
                modified: "true"
            },
            tabs: {
                v: "1.0",
                templates: [{
                    text: "全部",
                    eventId: "queryBoughtList",
                    code: "all"
                },
                {
                    text: "待付款",
                    eventId: "queryBoughtList",
                    code: "waitPay"
                },
                {
                    text: "待发货",
                    eventId: "queryBoughtList",
                    code: "waitSend"
                },
                {
                    text: "待收货",
                    eventId: "queryBoughtList",
                    code: "waitConfirm"
                },
                {
                    text: "待评价",
                    eventId: "queryBoughtList",
                    code: "waitRate"
                }],
                modified: "true"
            }
        }
    };
    return a.start(),
    a
}),
function(a, b) {
    var c = {
        Init: function() {
            var a = this;
            a.oCont = $(".order-manage.list"),
            a.newTaobao = window.namespace("app.orderMange.render"),
            a.params = lib.env.params,
            a.params.tabCode && a.page[a.params.tabCode] && (a.page.selected = a.params.tabCode),
            a.startTaobao(),
            a.evets()
        },
        page: {
            all: {
                page: 1,
                top: 0
            },
            waitPay: {
                page: 1,
                top: 0
            },
            waitSend: {
                page: 1,
                top: 0
            },
            waitConfirm: {
                page: 1,
                top: 0
            },
            waitRate: {
                page: 1,
                top: 0
            },
            selected: "all",
            isUpdate: !0
        },
        startTaobao: function() {
            function a(a) {
                return new Promise(function(c, d) {
                    b.newTaobao._init({
                        group: a.group,
                        tab: b.page.selected
                    },
                    b.oCont, "list",
                    function(a) {
                        c(a)
                    })
                })
            }
            var b = this;
            b.scrollView = new ctrl.scrollview,
            b.imgHelper = lib.img({
                "class": "lib-img",
                dataSrc: "data-src",
                size: "120x120",
                sharpen: "s150",
                q: ["q50", "q30"],
                enableLazyload: !1,
                lazyHeight: 0,
                lazyWidth: 0,
                enalbeIOSWifiLoadMore: !1
            }),
            b.newTaobao.start(b.oCont, b.imgHelper),
            b.sendMtop(b.page.selected).then(function(c) {
                var d = c.data;
                return b.setEndPage(b.page.selected, d),
                a(d)
            }).then(function(a) {
                if ("true" === b.params.hideBar || lib.env.aliapp) var c = "";
                else var c = new Promise(function(a, c) {
                    b.newTaobao._init({
                        title: "订单管理"
                    },
                    b.oCont, "headerBar",
                    function(b) {
                        a(b)
                    })
                });
                if ("true" === b.params.hideTab) var d = "";
                else var d = new Promise(function(a, c) {
                    b.newTaobao._init({},
                    b.oCont, "topTab",
                    function(b) {
                        a(b)
                    })
                });
                return Promise.all([c, d, a])
            }).then(function(a) {
                var c = a[0],
                d = a[1],
                e = a[2];
                b.scrollView.content = e,
                lib.env.os.isIOS ? (b.scrollView.pullRefresh.handler = function(a) {
                    b.delay(1e3).then(function() {
                        if (b.page.isUpdate) {
                            b.page.isUpdate = !1;
                            var c = b.page.selected,
                            d = b.page[c];
                            d.page = 1,
                            b.pageNum(b.page.selected)
                        }
                        a()
                    })
                },
                b.scrollView.pullRefresh.enable = !0) : b.scrollView.pullRefresh.enable = !1,
                b.scrollView.pullUpdate.handler = function(a) {
                    b.delay(2e3).then(function() {
                        b.page.isUpdate && (b.page.isUpdate = !1, b.pageNum(b.page.selected)),
                        a()
                    })
                },
                !b.page[b.page.selected].update || b.page[b.page.selected].isEnd ? b.scrollView.pullUpdate.enable = !1 : b.scrollView.pullUpdate.enable = !0,
                b.scrollView.fixed.topElement = c + d,
                b.scrollView.fixed.enable = !0,
                b.scrollView.lazyload.enable = !0,
                b.oCont.html(b.scrollView.root),
                b.scrollView.init({
                    padding: {
                        bottom: 100
                    }
                })
            }).then(function() {
                var a = b.oCont.find(".scroll-wrap");
                a.css({
                    height: "500px"
                }),
                window.scrollViewPage = b.scrollView,
                b.setCurTab()
            })["catch"](function(a) {
                var c = a,
                d = c.ret && c.ret[0] ? c.ret[0].split("::")[1] : "下拉刷新试试吧！";
                b.newTaobao._init({
                    title: "哎哟，服务器开了个小差！",
                    sub: d
                },
                b.oCont, "error",
                function(a) {
                    b.oCont.html(a)
                })
            })
        },
        sendMtop: function(a) {
            var b = this,
            a = a || "all",
            c = b.page[a].page || 1,
            d = {
                page: c,
                tabCode: a,
                appVersion: "1.0",
                appName: "tborder"
            };
            return lib.login.isLogin ? (d = $.extend(lib.env.params, d), new Promise(function(c, e) {
                lib.mtop.request({
                    api: "mtop.order.queryBoughtList",
                    v: "3.0",
                    data: d,
                    ttid: "##h5",
                    ecode: 1,
                    isSec: 0
                },
                function(d) {
                    d && d.ret && 0 === d.ret[0].indexOf("SUCCESS") && (b.page[a].page++, b.page[a].update = !0, b.page.isUpdate = !0, c(d.data))
                },
                function(a) {
                    a && a.ret && a.retType === lib.mtop.RESPONSE_TYPE.SESSION_EXPIRED && lib.login.goLogin(),
                    e(a)
                })
            })) : void lib.login.goLogin()
        },
        sendQueryTemplate: function() {
            return new Promise(function(a, b) {
                lib.mtop.loginRequest({
                    api: "mtop.order.queryTemplate",
                    v: "3.0",
                    data: {
                        pageType: "bought"
                    },
                    ttid: "##h5",
                    ecode: 1,
                    isSec: 0
                },
                function(c) {
                    c && c.ret && 0 === c.ret[0].indexOf("SUCCESS") ? a(c.data) : b(c)
                },
                function(a) {
                    if (a.value) var a = a.value;
                    b(a)
                })
            })
        },
        firstSend: function() {},
        pageNum: function(a) {
            var b = this;
            this.sendMtop(a).then(function(c) {
                var d = c.data || {};
                return b.setEndPage(a, d),
                new Promise(function(c, e) {
                    d.group && d.group.length ? b.newTaobao._init(d.group, b.oCont, "order",
                    function(a) {
                        c(a)
                    }) : d.group && 2 === b.page[a].page ? b.newTaobao._init({
                        title: "您还没有相关的订单",
                        sub: "可以去看看有哪些想买",
                        btn: "随便逛逛",
                        url: "//m.taobao.com"
                    },
                    null, "error",
                    function(a) {
                        c(a)
                    }) : lib.notificaiton.simple("没有相关的订单信息")
                })
            })["catch"](function(c) {
                var d = c.ret && c.ret[0] ? c.ret[0].split("::")[1] : "下拉刷新试试吧！",
                e = b.oCont.find('.order-cont[data-code="' + a + '"]'),
                f = e.find(".order-list");
                if (f && f.length) lib.notificaiton.simple(d);
                else if (1 === b.page[a].page) return b.scrollView.pullUpdate.enable = !1,
                new Promise(function(a, c) {
                    b.newTaobao._init({
                        title: "哎哟，服务器开了个小差！",
                        sub: d
                    },
                    b.oCont, "error",
                    function(b) {
                        a(b)
                    })
                })
            }).then(function(c) {
                var d = b.scrollView.getScrollTop(),
                e = b.oCont.find('.order-cont[data-code="' + a + '"]');
                b.page[a].page <= 2 && e.html(""),
                e.append(c),
                b.scrollView.refresh(),
                b.page[a].page > 2 && b.scrollView.scrollTo(d + 300, !0)
            })["catch"](function() {})
        },
        setCurTab: function() {
            var a = this.oCont.find(".nav-tab-top"),
            b = a.find("li"),
            c = this.page.selected,
            d = a.find('li[data-code="' + c + '"]');
            b.removeClass("cur"),
            d.addClass("cur")
        },
        setCurCont: function() {
            var a = this.oCont.find(".order-cont"),
            b = this.page.selected,
            c = this.oCont.find('.order-cont[data-code="' + b + '"]');
            a.hide(),
            c.show()
        },
        setNewCont: function(a) {
            var b = this,
            c = b.scrollView.getScrollTop(),
            d = b.page.selected;
            b.page[d].top = c,
            b.page.selected = a,
            b.setCurTab(),
            b.setCurCont(),
            b.scrollView.refresh(),
            b.scrollView.scrollTo(0),
            !b.page[a].update || b.page[a].isEnd ? b.scrollView.pullUpdate.enable = !1 : b.scrollView.pullUpdate.enable = !0,
            b.page[a].update || b.pageNum(a)
        },
        setEndPage: function(a, b) {
            var c = this,
            d = b.group,
            e = d.length,
            f = b.meta,
            g = f.page || {},
            h = g.fields || {},
            i = h.currentPage || 1,
            j = h.pageSize || 15,
            k = h.totalNumber || 0;
            i = Number(i),
            j = Number(j),
            k = Number(k),
            e > j || i * j >= k ? c.page[a].isEnd = !0 : c.scrollView.pullUpdate.enable = !0
        },
        delay: function(a) {
            return new Promise(function(b, c) {
                setTimeout(b, a)
            })
        },
        evets: function() {
            var a = this;
            this.oCont.on("click", ".nav-tab-top li[data-code]",
            function() {
                var b = $(this),
                c = b.data("code");
                a.setNewCont(c)
            }).on("click", ".icon-back",
            function() {
                history.back()
            }).on("click", ".icon-search",
            function() {})
        },
        FirstRender: function() {}
    };
    b.orderMangeInit || (b.orderMangeInit = {}),
    b.orderMangeInit.list = c
} (window, window.app || {}),
function(a, b) {
    var c = {
        Init: function() {
            var a = this;
            a.oCont = $(".order-manage"),
            a.newTaobao = window.namespace("app.orderMange.render"),
            a.startTaobao(),
            a.evets()
        },
        startTaobao: function() {
            function a(a) {
                return new Promise(function(c, d) {
                    b.newTaobao._init({
                        group: a.group,
                        tab: "all"
                    },
                    b.oCont, "detail",
                    function(a) {
                        c(a)
                    })
                })
            }
            var b = this;
            if (b.imgHelper = lib.img({
                "class": "lazy",
                dataSrc: "data-src",
                size: "120x120",
                sharpen: "s150",
                q: ["q50", "q30"],
                enableLazyload: !0,
                lazyHeight: 0,
                lazyWidth: 0,
                enalbeIOSWifiLoadMore: !1
            }), b.newTaobao.start(b.oCont, b.imgHelper), !lib.env.aliapp) {
                var c = new Promise(function(a, c) {
                    b.newTaobao._init({
                        title: "订单详情"
                    },
                    b.oCont, "headerBar",
                    function(b) {
                        a(b)
                    })
                });
                c.then(function(a) {
                    b.oCont.append('<div class="shade" style="display: none;"></div>' + a)
                })
            }
            b.sendMtop().then(function(b) {
                var c = b.data;
                return a(c)
            }).then(function(a) {
                b.oCont.append(a)
            }).then(function() {
                b.oCont.find(".logisticsholder").length && b.sendCNMtop().then(function(a) {
                    var c = a.orderList || [],
                    d = c[0].transitList || [],
                    e = d.length,
                    f = d[e - 1] || {};
                    f.orderId = lib.env.params.bizOrderId,
                    b.newTaobao._init(f, b.oCont, "logisticsholder",
                    function(a) {
                        b.oCont.find(".logisticsholder").html(a)
                    })
                })["catch"](function(a) {
                    var c = a && a.ret && a.ret[0] && a.ret[0].split("::")[1];
                    b.newTaobao._init({
                        message: c
                    },
                    b.oCont, "logisticsholder",
                    function(a) {
                        b.oCont.find(".logisticsholder").html(a)
                    })
                })
            }).then(function() {
                b.imgHelper.fireLazyload()
            })["catch"](function(a) {
                b.newTaobao._init({
                    title: "哎哟，服务器开了个小差",
                    sub: "请稍后重试"
                },
                b.oCont, "error",
                function(a) {
                    b.oCont.html(a)
                })
            })
        },
        sendMtop: function(a) {
            var b = {
                appName: "tborder",
                appVersion: "1.0"
            };
            return lib.login.isLogin ? (b = $.extend(lib.env.params, b), new Promise(function(a, c) {
                lib.mtop.request({
                    api: "mtop.order.queryDetail",
                    v: "3.0",
                    data: b,
                    ttid: "##h5",
                    ecode: 1,
                    isSec: 0
                },
                function(b) {
                    b && b.ret && 0 === b.ret[0].indexOf("SUCCESS") && a(b.data)
                },
                function(a) {
                    a && a.ret && a.retType === lib.mtop.RESPONSE_TYPE.SESSION_EXPIRED && lib.login.goLogin(),
                    c(a)
                })
            })) : void lib.login.goLogin()
        },
        sendCNMtop: function(a) {
            var b = lib.env.params;
            return new Promise(function(a, c) {
                lib.mtop.loginRequest({
                    api: "mtop.cnwireless.CNLogisticDetailService.queryLogisDetailByTradeId",
                    v: "1.0",
                    data: {
                        orderId: b.bizOrderId
                    }
                },
                function(b) {
                    b && b.ret && 0 === b.ret[0].indexOf("SUCCESS") ? a(b.data) : c(b)
                },
                function(a) {
                    c(a)
                })
            })
        },
        sendQueryTemplate: function() {
            return new Promise(function(a, b) {
                lib.mtop.loginRequest({
                    api: "mtop.order.queryTemplate",
                    v: "3.0",
                    data: {
                        pageType: "bought"
                    },
                    ttid: "0000@taobao_iphone_5.11.5",
                    ecode: 1,
                    isSec: 0
                },
                function(c) {
                    c && c.ret && 0 === c.ret[0].indexOf("SUCCESS") ? a(c.data) : b(c)
                },
                function(a) {
                    b(a)
                })
            })
        },
        delay: function(a) {
            return new Promise(function(b, c) {
                setTimeout(b, a)
            })
        },
        evets: function() {
            var a = this;
            this.oCont.on("click", ".nav-tab-top li[data-code]",
            function() {
                var b = $(this),
                c = b.data("code");
                a.setNewCont(c)
            }).on("click", ".back",
            function() {
                history.back()
            })
        }
    };
    b.orderMangeInit || (b.orderMangeInit = {}),
    b.orderMangeInit.detail = c
} (window, window.app || {});