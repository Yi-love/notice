/* 2015-10-30 09:29:51 */
!
function(e) {
    var t = 2;
    if (! (e.ali_analytics && e.ali_analytics.ua && t <= e.ali_analytics.ua.version)) {
        var a, n, r, i, o, s, c, l, m, d, u, p, f, _, g, h, b, v = window,
        y = document,
        w = v.navigator,
        E = w.appVersion,
        A = w && w.userAgent || "",
        O = function(e) {
            var t = 0;
            return parseFloat(e.replace(/\./g,
            function() {
                return 0 == t++?".": ""
            }))
        },
        P = function(e, t) {
            var a, n;
            t[a = "trident"] = .1,
            (n = e.match(/Trident\/([\d.]*)/)) && n[1] && (t[a] = O(n[1])),
            t.core = a
        },
        T = function(e) {
            var t, a;
            return (t = e.match(/MSIE ([^;]*)|Trident.*; rv(?:\s|:)?([0-9.]+)/)) && (a = t[1] || t[2]) ? O(a) : 0
        },
        S = function(e) {
            return void 0 == e || "" == e ? "other": e
        },
        M = function(e) {
            function t() {
                for (var t = [["Windows NT 5.1", "winXP"], ["Windows NT 6.1", "win7"], ["Windows NT 6.0", "winVista"], ["Windows NT 6.2", "win8"], ["Windows NT 10.0", "win10"], ["iPad", "ios"], ["iPhone;", "ios"], ["iPod", "ios"], ["Macintosh", "mac"], ["Android", "android"], ["Ubuntu", "ubuntu"], ["Linux", "linux"], ["Windows NT 5.2", "win2003"], ["Windows NT 5.0", "win2000"], ["Windows", "winOther"], ["rhino", "rhino"]], a = 0, n = t.length; n > a; ++a) if ( - 1 != e.indexOf(t[a][0])) return t[a][1];
                return "other"
            }
            function a(e, t, a, n) {
                var r, i = v.navigator.mimeTypes;
                try {
                    for (r in i) if (i.hasOwnProperty(r) && i[r][e] == t) {
                        if (void 0 !== a && n.test(i[r][a])) return ! 0;
                        if (void 0 === a) return ! 0
                    }
                    return ! 1
                } catch(o) {
                    return ! 1
                }
            }
            var n, r, i, o, s, c, l, m = "",
            d = m,
            u = m,
            p = [6, 9],
            f = "{{version}}",
            _ = "<!--[if IE " + f + "]><s></s><![endif]-->",
            g = y && y.createElement("div"),
            h = [],
            b = {
                webkit: void 0,
                edge: void 0,
                trident: void 0,
                gecko: void 0,
                presto: void 0,
                chrome: void 0,
                safari: void 0,
                firefox: void 0,
                ie: void 0,
                ieMode: void 0,
                opera: void 0,
                mobile: void 0,
                core: void 0,
                shell: void 0,
                phantomjs: void 0,
                os: void 0,
                ipad: void 0,
                iphone: void 0,
                ipod: void 0,
                ios: void 0,
                android: void 0,
                nodejs: void 0,
                extraName: void 0,
                extraVersion: void 0
            };
            if (g && g.getElementsByTagName && (g.innerHTML = _.replace(f, ""), h = g.getElementsByTagName("s")), h.length > 0) {
                for (P(e, b), o = p[0], s = p[1]; s >= o; o++) if (g.innerHTML = _.replace(f, o), h.length > 0) {
                    b[u = "ie"] = o;
                    break
                } ! b.ie && (i = T(e)) && (b[u = "ie"] = i)
            } else((r = e.match(/AppleWebKit\/*\s*([\d.]*)/i)) || (r = e.match(/Safari\/([\d.]*)/))) && r[1] ? (b[d = "webkit"] = O(r[1]), (r = e.match(/OPR\/(\d+\.\d+)/)) && r[1] ? b[u = "opera"] = O(r[1]) : (r = e.match(/Chrome\/([\d.]*)/)) && r[1] ? b[u = "chrome"] = O(r[1]) : (r = e.match(/\/([\d.]*) Safari/)) && r[1] ? b[u = "safari"] = O(r[1]) : b.safari = b.webkit, (r = e.match(/Edge\/([\d.]*)/)) && r[1] && (d = u = "edge", b[d] = O(r[1])), / Mobile\//.test(e) && e.match(/iPad|iPod|iPhone/) ? (b.mobile = "apple", r = e.match(/OS ([^\s]*)/), r && r[1] && (b.ios = O(r[1].replace("_", "."))), n = "ios", r = e.match(/iPad|iPod|iPhone/), r && r[0] && (b[r[0].toLowerCase()] = b.ios)) : / Android/i.test(e) ? (/Mobile/.test(e) && (n = b.mobile = "android"), r = e.match(/Android ([^\s]*);/), r && r[1] && (b.android = O(r[1]))) : (r = e.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/)) && (b.mobile = r[0].toLowerCase()), (r = e.match(/PhantomJS\/([^\s]*)/)) && r[1] && (b.phantomjs = O(r[1]))) : (r = e.match(/Presto\/([\d.]*)/)) && r[1] ? (b[d = "presto"] = O(r[1]), (r = e.match(/Opera\/([\d.]*)/)) && r[1] && (b[u = "opera"] = O(r[1]), (r = e.match(/Opera\/.* Version\/([\d.]*)/)) && r[1] && (b[u] = O(r[1])), (r = e.match(/Opera Mini[^;]*/)) && r ? b.mobile = r[0].toLowerCase() : (r = e.match(/Opera Mobi[^;]*/)) && r && (b.mobile = r[0]))) : (i = T(e)) ? (b[u = "ie"] = i, P(e, b)) : (r = e.match(/Gecko/)) && (b[d = "gecko"] = .1, (r = e.match(/rv:([\d.]*)/)) && r[1] && (b[d] = O(r[1]), /Mobile|Tablet/.test(e) && (b.mobile = "firefox")), (r = e.match(/Firefox\/([\d.]*)/)) && r[1] && (b[u = "firefox"] = O(r[1])));
            n || (n = t());
            var w, A, S;
            if (!a("type", "application/vnd.chromium.remoting-viewer")) {
                w = "scoped" in y.createElement("style"),
                S = "v8Locale" in v;
                try {
                    A = v.external || void 0
                } catch(M) {}
                if (r = e.match(/360SE/)) c = "360";
                else if (r = e.match(/SE\s([\d.]*)/) || A && "SEVersion" in A) c = "sougou",
                l = O(r[1]) || .1;
                else if ((r = e.match(/Maxthon(?:\/)+([\d.]*)/)) && A) {
                    c = "maxthon";
                    try {
                        l = O(A.max_version || r[1])
                    } catch(k) {
                        l = .1
                    }
                } else w && S ? c = "360se": w || S || !/Gecko\)\s+Chrome/.test(E) || b.opera || b.edge || (c = "360ee")
            }
            return (r = e.match(/TencentTraveler\s([\d.]*)|QQBrowser\/([\d.]*)/)) ? (c = "tt", l = O(r[2]) || .1) : (r = e.match(/LBBROWSER/) || A && "LiebaoGetVersion" in A) ? c = "liebao": (r = e.match(/TheWorld/)) ? (c = "theworld", l = 3) : (r = e.match(/TaoBrowser\/([\d.]*)/)) ? (c = "taobao", l = O(r[1]) || .1) : (r = e.match(/UCBrowser\/([\d.]*)/)) && (c = "uc", l = O(r[1]) || .1),
            b.os = n,
            b.core = b.core || d,
            b.shell = u,
            b.ieMode = b.ie && y.documentMode || b.ie,
            b.extraName = c,
            b.extraVersion = l,
            b.resolution = v.screen.width + "x" + v.screen.height,
            b
        },
        k = function(e) {
            function t(e) {
                return Object.prototype.toString.call(e)
            }
            function a(e, a, n) {
                if ("[object Function]" == t(a) && (a = a(n)), !a) return null;
                var r = {
                    name: e,
                    version: ""
                },
                i = t(a);
                if (a === !0) return r;
                if ("[object String]" === i) {
                    if ( - 1 !== n.indexOf(a)) return r
                } else if (a.exec) {
                    var o = a.exec(n);
                    if (o) return o.length >= 2 && o[1] ? r.version = o[1].replace(/_/g, ".") : r.version = "",
                    r
                }
            }
            var n = {
                name: "other",
                version: ""
            };
            e = (e || "").toLowerCase();
            for (var r = [["nokia",
            function(e) {
                return - 1 !== e.indexOf("nokia ") ? /\bnokia ([0-9]+)?/: /\bnokia([a-z0-9]+)?/
            }], ["samsung",
            function(e) {
                return - 1 !== e.indexOf("samsung") ? /\bsamsung(?:[ \-](?:sgh|gt|sm))?-([a-z0-9]+)/: /\b(?:sgh|sch|gt|sm)-([a-z0-9]+)/
            }], ["wp",
            function(e) {
                return - 1 !== e.indexOf("windows phone ") || -1 !== e.indexOf("xblwp") || -1 !== e.indexOf("zunewp") || -1 !== e.indexOf("windows ce")
            }], ["pc", "windows"], ["ipad", "ipad"], ["ipod", "ipod"], ["iphone", /\biphone\b|\biph(\d)/], ["mac", "macintosh"], ["mi", /\bmi[ \-]?([a-z0-9 ]+(?= build|\)))/], ["hongmi", /\bhm[ \-]?([a-z0-9]+)/], ["aliyun", /\baliyunos\b(?:[\-](\d+))?/], ["meizu",
            function(e) {
                return e.indexOf("meizu") >= 0 ? /\bmeizu[\/ ]([a-z0-9]+)\b/: /\bm([0-9x]{1,3})\b/
            }], ["nexus", /\bnexus ([0-9s.]+)/], ["huawei",
            function(e) {
                var t = /\bmediapad (.+?)(?= build\/huaweimediapad\b)/;
                return - 1 !== e.indexOf("huawei-huawei") ? /\bhuawei\-huawei\-([a-z0-9\-]+)/: t.test(e) ? t: /\bhuawei[ _\-]?([a-z0-9]+)/
            }], ["lenovo",
            function(e) {
                return - 1 !== e.indexOf("lenovo-lenovo") ? /\blenovo\-lenovo[ \-]([a-z0-9]+)/: /\blenovo[ \-]?([a-z0-9]+)/
            }], ["zte",
            function(e) {
                return /\bzte\-[tu]/.test(e) ? /\bzte-[tu][ _\-]?([a-su-z0-9\+]+)/: /\bzte[ _\-]?([a-su-z0-9\+]+)/
            }], ["vivo", /\bvivo(?: ([a-z0-9]+))?/], ["htc",
            function(e) {
                return /\bhtc[a-z0-9 _\-]+(?= build\b)/.test(e) ? /\bhtc[ _\-]?([a-z0-9 ]+(?= build))/: /\bhtc[ _\-]?([a-z0-9 ]+)/
            }], ["oppo", /\boppo[_]([a-z0-9]+)/], ["konka", /\bkonka[_\-]([a-z0-9]+)/], ["sonyericsson", /\bmt([a-z0-9]+)/], ["coolpad", /\bcoolpad[_ ]?([a-z0-9]+)/], ["lg", /\blg[\-]([a-z0-9]+)/], ["android", /\bandroid\b|\badr\b/], ["blackberry",
            function(e) {
                return e.indexOf("blackberry") >= 0 ? /\bblackberry\s?(\d+)/: "bb10"
            }]], i = 0; i < r.length; i++) {
                var o = r[i][0],
                s = r[i][1],
                c = a(o, s, e);
                if (c) {
                    n = c;
                    break
                }
            }
            return n
        },
        x = 1;
        try {
            a = M(A),
            n = k(A),
            r = a.os,
            i = a.shell,
            o = a.core,
            s = a.resolution,
            c = a.extraName,
            l = a.extraVersion,
            m = n.name,
            d = n.version,
            p = r ? r + (a[r] ? a[r] : "") : "",
            f = i ? i + parseInt(a[i]) : "",
            _ = o,
            g = s,
            h = c ? c + (l ? parseInt(l) : "") : "",
            b = m + d
        } catch(I) {}
        u = {
            p: x,
            o: S(p),
            b: S(f),
            w: S(_),
            s: g,
            mx: h,
            ism: b
        },
        e.ali_analytics || (e.ali_analytics = {}),
        e.ali_analytics.ua || (e.ali_analytics.ua = {}),
        e.ali_analytics.ua = {
            version: t,
            ua_info: u
        }
    }
} (window),
function() {
    function getBeaconSrc(e) {
        if (isTerminal) return "m";
        if (is_in_iframe) return isContain(e, "wrating.com") ? "k": "y";
        var t, a, n = "o",
        r = [["ju.taobao.com", "4"], ["juhuasuan.com", "4"], ["alipay.com", "f"], ["china.alibaba.com", "6"], ["qd.alibaba.com", "o"], ["jaq.alibaba.com", "o"], ["110.alibaba.com", "o"], ["security.alibaba.com", "o"], ["1688.com", "6"], ["alibaba.com", "7"], ["aliloan.com", "8"], ["cnzz.com", "9"], ["net.cn", "a"], ["hichina.com", "a"], ["phpwind.com", "b"], ["aliyun.com", "c"], ["tao123.com", "d"], ["alimama.com", "e"], ["taobao.com", "1"], ["tmall.com", "2"], ["tmall.hk", "2"], ["etao.com", "3"], ["*", n]],
        i = r.length;
        for (t = 0; i > t; t++) if (a = r[t], isContain(e, a[0])) return a[1];
        return n
    }
    function isContain(e, t) {
        return e.indexOf(t) > -1
    }
    function isStartWith(e, t) {
        return 0 == e.indexOf(t)
    }
    function isEndWith(e, t) {
        var a = e.length,
        n = t.length;
        return a >= n && e.indexOf(t) == a - n
    }
    function trim(e) {
        return isString(e) ? e.replace(/^\s+|\s+$/g, "") : ""
    }
    function tryToDecodeURIComponent(e, t) {
        var a = t || "";
        if (e) try {
            a = decodeURIComponent(e)
        } catch(n) {}
        return a
    }
    function obj2param(e) {
        var t, a, n = [];
        for (t in e) e.hasOwnProperty(t) && (a = "" + e[t], n.push(isStartWith(t, s_plain_obj) ? a: t + "=" + encodeURIComponent(a)));
        return n.join("&")
    }
    function arr2param(e) {
        var t, a, n, r = [],
        i = e.length;
        for (n = 0; i > n; n++) t = e[n][0],
        a = e[n][1],
        r.push(isStartWith(t, s_plain_obj) ? a: t + "=" + encodeURIComponent(a));
        return r.join("&")
    }
    function arr2obj(e) {
        var t, a, n, r = {},
        i = e.length;
        for (n = 0; i > n; n++) t = e[n][0],
        a = e[n][1],
        r[t] = a;
        return r
    }
    function objSimpleClone(e) {
        var t, a = {};
        for (t in e) e.hasOwnProperty(t) && (a[t] = e[t]);
        return a
    }
    function param2obj(e) {
        for (var t = e.split("&"), a = 0, n = t.length, r = {}; n > a; a++) {
            var i = t[a],
            o = i.indexOf("="),
            s = i.substring(0, o),
            c = i.substring(o + 1);
            r[s] = tryToDecodeURIComponent(c)
        }
        return r
    }
    function isNumber(e) {
        return "number" == typeof e
    }
    function isUnDefined(e) {
        return "undefined" == typeof e
    }
    function isString(e) {
        return "string" == typeof e
    }
    function isArray(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
    function tryToGetAttribute(e, t) {
        return e && e.getAttribute ? e.getAttribute(t) || "": ""
    }
    function tryToGetHref(e) {
        var t;
        try {
            t = trim(e.getAttribute("href", 2))
        } catch(a) {}
        return t || ""
    }
    function getExParams() {
        var e = doc.getElementById("tb-beacon-aplus"),
        t = tryToGetAttribute(e, "exparams");
        if (!t) return t;
        var a, n, r = ["taobao.com", "tmall.com", "etao.com", "hitao.com", "taohua.com", "juhuasuan.com", "alimama.com"];
        if (is_in_iframe) {
            for (n = r.length, a = 0; n > a; a++) if (isContain(hostsname, r[a])) return t;
            t = t.replace(/\buserid=\w*&?/, "")
        }
        return t = t.replace(/\buserid=/, "uidaplus=")
    }
    function getMetaTags() {
        return _head_node = _head_node || doc.getElementsByTagName("head")[0],
        _meta_nodes || (_head_node ? _meta_nodes = _head_node.getElementsByTagName("meta") : [])
    }
    function parseMetaContent(e, t) {
        var a, n, r = e.split(";"),
        i = r.length;
        for (a = 0; i > a; a++) n = r[a].split("="),
        t[trim(n[0]) || s_plain_obj] = tryToDecodeURIComponent(trim(n.slice(1).join("=")))
    }
    function getCookie(e) {
        var t = doc.cookie.match(new RegExp("(?:^|;)\\s*" + e + "=([^;]+)"));
        return t ? t[1] : ""
    }
    function makeCacheNum() {
        return Math.floor(268435456 * Math.random()).toString(16)
    }
    function init_getMetaMicroscopeData() {
        var e, t, a, n = getMetaTags(),
        r = n.length;
        for (e = 0; r > e; e++) t = n[e],
        "microscope-data" == tryToGetAttribute(t, "name") && (a = tryToGetAttribute(t, "content"), parseMetaContent(a, _microscope_data), is_head_has_meta_microscope_data = s_true);
        _microscope_data_params = obj2param(_microscope_data),
        ms_data_page_id = _microscope_data.pageId,
        ms_data_shop_id = _microscope_data.shopId,
        ms_data_instance_id = _microscope_data.siteInstanceId,
        ms_data_siteCategoryId = _microscope_data.siteCategory,
        ms_prototype_id = _microscope_data.prototypeId,
        site_instance_id_or_shop_id = ms_data_instance_id || ms_data_shop_id
    }
    function getMetaAtpData() {
        var e, t, a, n = getMetaTags(),
        r = n.length;
        for (e = 0; r > e; e++) t = n[e],
        "atp-beacon" == tryToGetAttribute(t, "name") && (a = tryToGetAttribute(t, "content"), parseMetaContent(a, _atp_beacon_data));
        _atp_beacon_data_params = obj2param(_atp_beacon_data)
    }
    function getMetaWaiting() {
        var e, t, a, n = getMetaTags(),
        r = n.length;
        for (e = 0; r > e; e++) if (t = n[e], "aplus-waiting" == tryToGetAttribute(t, "name")) {
            a = tryToGetAttribute(t, "content");
            break
        }
        return a
    }
    function getMetaTerminal() {
        var e, t, a, n = getMetaTags(),
        r = n.length;
        for (e = 0; r > e; e++) if (t = n[e], "aplus-terminal" == tryToGetAttribute(t, "name")) {
            a = tryToGetAttribute(t, "content");
            break
        }
        return a
    }
    function getMetaRateAhot() {
        var e, t, a, n = getMetaTags(),
        r = n.length;
        for (e = 0; r > e; e++) if (t = n[e], "aplus-rate-ahot" == tryToGetAttribute(t, "name")) {
            a = tryToGetAttribute(t, "content");
            break
        }
        return a = a ? parseFloat(a) : 0
    }
    function getMetaAhot() {
        var e, t, a, n = getMetaTags(),
        r = n.length;
        for (e = 0; r > e; e++) if (t = n[e], "ahot-aplus" == tryToGetAttribute(t, "name")) {
            a = tryToGetAttribute(t, "content");
            break
        }
        return a
    }
    function isOnePage() {
        var e, t, a = getMetaTags(),
        n = a.length,
        r = "-1";
        for (e = 0; n > e; e++) if (t = a[e], "isonepage" == tryToGetAttribute(t, "name")) {
            r = tryToGetAttribute(t, "content");
            break
        }
        return r
    }
    function getSPMProtocolFromMeta() {
        var e, t, a, n, r = getMetaTags();
        for (e = 0, t = r.length; t > e; e++) a = r[e],
        n = tryToGetAttribute(a, "name"),
        n == s_SPM_ATTR_NAME && (spm_protocol = tryToGetAttribute(a, s_SPM_DATA_PROTOCOL))
    }
    function getMetaSPMData(e) {
        var t, a, n, r, i, o, s = getMetaTags();
        if (s) for (t = 0, a = s.length; a > t; t++) if (r = s[t], i = tryToGetAttribute(r, "name"), i == e) return page_global_spm_id_origin = tryToGetAttribute(r, "content"),
        page_global_spm_id_origin.indexOf(":") >= 0 && (n = page_global_spm_id_origin.split(":"), spm_protocol = "i" == n[0] ? "i": "u", page_global_spm_id_origin = n[1]),
        o = tryToGetAttribute(r, s_SPM_DATA_PROTOCOL),
        o && (spm_protocol = "i" == o ? "i": "u"),
        page_global_is_wangpu = isStartWith(page_global_spm_id_origin, "110"),
        spm_ab = page_global_is_wangpu ? default_ab: page_global_spm_id_origin,
        s_true;
        return s_false
    }
    function init_getGlobalSPMId() {
        if (!isUnDefined(spm_ab)) return spm_ab;
        if (spm_a && spm_b) return spm_a = spm_a.replace(/^{(\w+)}$/g, "$1"),
        spm_b = spm_b.replace(/^{(\w+)}$/g, "$1"),
        wh_in_page = s_true,
        spm_ab = spm_a + "." + spm_b,
        getSPMProtocolFromMeta(),
        goldlog.spm_ab = [spm_a, spm_b],
        spm_ab;
        var e;
        doc.getElementsByTagName("head")[0];
        if (getMetaSPMData(s_SPM_ATTR_NAME) || getMetaSPMData("spm-id"), spm_ab = spm_ab || default_ab, !spm_ab) return spm_ab;
        var t, a = doc.getElementsByTagName("body");
        return e = spm_ab.split("."),
        goldlog.spm_ab = e,
        a = a && a.length ? a[0] : null,
        a && (t = tryToGetAttribute(a, s_SPM_ATTR_NAME), t ? (spm_ab = e[0] + "." + t, goldlog.spm_ab = [e[0], t]) : 1 == e.length && (spm_ab = default_ab)),
        spm_ab
    }
    function makePVId() {
        function e(e) {
            var t = "0123456789abcdefhijklmnopqrstuvwxyzABCDEFHIJKLMNOPQRSTUVWXYZ",
            a = "0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHIJKMNOPQRSTUVWXYZ";
            return 1 == e ? t.substr(Math.floor(60 * Math.random()), 1) : 2 == e ? a.substr(Math.floor(60 * Math.random()), 1) : "0"
        }
        var t = "g_aplus_pv_id",
        a = "",
        n = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        r = !1;
        if (!win[t]) {
            for (; a.length < 6;) {
                var i = n.substr(Math.floor(62 * Math.random()), 1); ! r && a.length <= 2 && ("g" == i.toLowerCase() || "l" == i.toLowerCase()) && (0 == a.length && "g" == i.toLowerCase() ? Math.random() < .5 && (i = e(1), r = !0) : 1 == a.length && "l" == i.toLowerCase() && "g" == a.charAt(0).toLowerCase() && (i = e(2), r = !0)),
                a += i
            }
            win[t] = a
        }
        return win[t]
    }
    function makeChkSum(e) {
        e = (e || "").split("#")[0].split("?")[0];
        var t = e.length,
        a = function(e) {
            var t, a = e.length,
            n = 0;
            for (t = 0; a > t; t++) n = 31 * n + e.charCodeAt(t);
            return n
        };
        return t ? a(t + "#" + e.charCodeAt(t - 1)) : -1
    }
    function init_aplusQueue() {
        var e, t = win[s_aplus_queue];
        t.push = e = function() {
            for (var e, a, n = 0,
            r = arguments.length; r > n; n++) e = arguments[n],
            isString(e) ? goldlog.send(hjlj_beacon_base + e) : isArray(e) && "push" != (a = e[0]) && (t[a] = t[a] || []).push(e.slice(1))
        };
        for (var a; a = t.shift();) e(a)
    }
    function onDOMReady(e) {
        var t = win.KISSY;
        t ? t.ready(e) : win.jQuery ? jQuery(doc).ready(e) : "complete" === doc.readyState ? e() : addEventListener(win, "load", e)
    }
    function recordValInWindowName() {
        var e, t; ! is_in_iframe && is_https && (is_login_page && page_referrer ? (e = page_referrer, t = nameStorage.getItem(KEY.NAME_STORAGE.REFERRER_PV_ID)) : (e = page_url, t = pvid), nameStorage.setItem(KEY.NAME_STORAGE.REFERRER, e), nameStorage.setItem(KEY.NAME_STORAGE.REFERRER_PV_ID, t))
    }
    function addEventListener(e, t, a) {
        e[onevent]((atta ? "on": "") + t,
        function(e) {
            e = e || win.event;
            var t = e.target || e.srcElement;
            a(e, t)
        },
        s_false)
    }
    function atp_inIframeException() {
        var e, t, a = ["/theme/info/info", "/promo/co_header.php", "fast_buy.htm", "/add_collection.htm", "/taobao_digital_iframe", "/promo/co_header_taoinfo.php", "/list_forum", "/theme/info/info"];
        for (e = 0, t = a.length; t > e; e++) if ( - 1 != pathname.indexOf(a[e])) return s_true;
        var n = /^https?:\/\/[\w\.]+\.taobao\.com/i;
        return ! n.test(page_referrer)
    }
    function processGoldlogQueue() {
        function e() {
            var e, t, a, n = win[s_GOLDMINER_QUEUE];
            if (n && isArray(n) && n.length) for (; e = n.shift();) if (e && e.action && isString(e.action) && e.arguments && isArray(e.arguments)) {
                for (a = e.action.split("."), t = win; a.length;) if (t = t[a.shift()], !t) return;
                if ("function" == typeof t) try {
                    t.apply(t, e.arguments)
                } catch(r) {}
            }
        }
        try {
            e()
        } catch(t) {}
    }
    function init_watchGoldlogQueue() {
        var e = function() {
            try {
                processGoldlogQueue(),
                setTimeout(e, 200)
            } catch(t) {}
        };
        e(),
        addEventListener(win, "beforeunload", processGoldlogQueue)
    }
    function cleanParams(e) {
        var t, a, n, r, i = [],
        o = {};
        for (t = e.length - 1; t >= 0; t--) a = e[t],
        n = a[0],
        n != s_plain_obj && o.hasOwnProperty(n) || (r = a[1], ("aplus" == n || "" != r) && (i.unshift([n, r]), o[n] = 1));
        return i
    }
    function cleanParamsForWindvane(e) {
        var t, a, n, r, i = [],
        o = {
            logtype: !0,
            cache: !0,
            scr: !0,
            "spm-cnt": !0
        };
        for (t = e.length - 1; t >= 0; t--) a = e[t],
        n = a[0],
        r = a[1],
        isStartWith(n, s_plain_obj) || o[n] || i.unshift([n, r]);
        return i
    }
    function tblogSend(e, t) {
        var a, n;
        if (t) {
            if (isWindVane && isTerminal) {
                n = cleanParamsForWindvane(cleanParams(t));
                var r, i = {},
                o = getSPMFromUrl(page_referrer),
                s = isOnePage(),
                c = s.split("|"),
                l = c[0],
                m = c[1] ? c[1] : "";
                try {
                    a = arr2obj(n),
                    r = JSON.stringify(a),
                    "{}" == r && (r = "")
                } catch(d) {
                    r = ""
                }
                i.functype = "2001",
                i.urlpagename = m,
                i.url = loc.href,
                i.spmcnt = (spm_ab || "0.0") + ".0.0",
                i.spmpre = o || "",
                i.lzsid = "",
                i.cna = acookie_cna || "",
                i.extendargs = r,
                i.isonepage = l,
                WindVane.call("WVTBUserTrack", "toUT", i),
                win[s_goldlog].windVaneData = i
            }
            return isUseLSProxy() ? useLSProxy({
                url: makeUrl(e, t),
                js: js_fdc_lsproxy,
                referrer: loc.href
            }) : goldlog.send(e, t)
        }
    }
    function mkPlainKey() {
        return s_plain_obj + Math.random()
    }
    function wp_bucketId(e, t) {
        var a, n = 2146271213;
        for (a = 0; a < e.length; a++) n = (n << 5) + n + e.charCodeAt(a);
        return (65535 & n) % t
    }
    function getSPMFromUrl(e) {
        var t, a = e.match(new RegExp("\\?.*spm=([\\w\\.\\-\\*]+)"));
        return a && (t = a[1]) && 5 == t.split(".").length ? t: null
    }
    function ifAdd(e, t) {
        var a, n, r, i, o = t.length;
        for (a = 0; o > a; a++) n = t[a],
        r = n[0],
        i = n[1],
        i && e.push([r, i])
    }
    function init_loadScripts() {
        var e = (new Date).getTime() / 36e5;
        Math.random() < .01 && addScript(url_g_alicdn + "/alilog/stat/a.js?t=" + e);
        var t = "laiwang",
        a = "/ilw/a/lwlog.js?v=140709";
        isContain(loc.href.split("?")[0], t) && addScript(url_g_alicdn + a);
        var n = "/alilog/mlog/xwj_heat.js?v=1503233",
        r = getMetaRateAhot() || CONFIG.RATE.AHOT_SAMPLING; (Math.random() < r || isAhot || CONFIG.DEBUG.AHOT) && addScript(url_g_alicdn + n),
        ms_data_instance_id && ms_prototype_id && ms_prototype_id.match(/^[124]$/) && ms_data_shop_id && addScriptFromFDC("wp-beacon.js?v=131014"),
        onDOMReady(function() {
            setTimeout(function() {
                addScript(url_g_alicdn + "/sd/data_sufei/1.4.5/aplus/index.js")
            },
            1e3)
        })
    }
    function compareVersion(e, t) {
        e = e.toString().split("."),
        t = t.toString().split(".");
        for (var a = 0; a < e.length || a < t.length; a++) {
            var n = parseInt(e[a], 10),
            r = parseInt(t[a], 10);
            if (window.isNaN(n) && (n = 0), window.isNaN(r) && (r = 0), r > n) return - 1;
            if (n > r) return 1
        }
        return 0
    }
    function callback(e, t) {
        isAndroid && compareVersion(osVersion, "2.4.0") < 0 ? setTimeout(function() {
            e && e(t)
        },
        1) : e && e(t)
    }
    function init_windVane() {
        var WV_Core = {
            call: function(e, t, a, n, r, i) {
                var o, s;
                return lib.promise && (lib.promise.deferred ? s = lib.promise.deferred() : lib.promise.defer && (s = lib.promise.defer())),
                o = i > 0 ? setTimeout(function() {
                    WV_Core.onFailure(o, {
                        ret: "TIMEOUT"
                    })
                },
                i) : WV_Private.getSid(),
                a.sid = o,
                WV_Private.registerCall(o, n, r, s),
                isAndroid ? compareVersion(wvVersion, "2.7.0") >= 0 ? WV_Private.callMethodByPrompt(e, t, WV_Private.buildParam(a), o + "") : WindVane_Native && WindVane_Native.callMethod && WindVane_Native.callMethod(e, t, WV_Private.buildParam(a), o + "") : isIOS && WV_Private.callMethodByIframe(e, t, WV_Private.buildParam(a), o + ""),
                s ? s.promise() : void 0
            },
            fireEvent: function(e, t) {
                var a = doc.createEvent("HTMLEvents");
                a.initEvent(e, !1, !0),
                a.param = WV_Private.parseParam(t),
                doc.dispatchEvent(a)
            },
            getParam: function(e) {
                return WV_Private.params[PARAM_PREFIX + e] || ""
            },
            onSuccess: function(e, t) {
                clearTimeout(e);
                var a = WV_Private.unregisterCall(e),
                n = a.success,
                r = a.deferred,
                i = WV_Private.parseParam(t);
                callback(function(e) {
                    n && n(e),
                    r && r.resolve(e)
                },
                i.value || i),
                WV_Private.onComplete(e)
            },
            onFailure: function(e, t) {
                clearTimeout(e);
                var a = WV_Private.unregisterCall(e),
                n = a.failure,
                r = a.deferred,
                i = WV_Private.parseParam(t);
                callback(function(e) {
                    n && n(e),
                    r && r.reject(e)
                },
                i),
                WV_Private.onComplete(e)
            }
        },
        WV_Private = {
            params: {},
            buildParam: function(e) {
                return e && "object" == typeof e ? JSON.stringify(e) : e || ""
            },
            parseParam: function(str) {
                var obj;
                if (str && "string" == typeof str) try {
                    obj = JSON.parse(str)
                } catch(e) {
                    obj = eval("(" + str + ")")
                } else obj = str || {};
                return obj
            },
            getSid: function() {
                return Math.floor(Math.random() * (1 << 50)) + "" + inc++
            },
            registerCall: function(e, t, a, n) {
                t && (callbackMap[SUCCESS_PREFIX + e] = t),
                a && (callbackMap[FAILURE_PREFIX + e] = a),
                n && (callbackMap[DEFERRED_PREFIX + e] = n)
            },
            unregisterCall: function(e) {
                var t = SUCCESS_PREFIX + e,
                a = FAILURE_PREFIX + e,
                n = DEFERRED_PREFIX + e,
                r = {
                    success: callbackMap[t],
                    failure: callbackMap[a],
                    deferred: callbackMap[n]
                };
                return delete callbackMap[t],
                delete callbackMap[a],
                r.deferred && delete callbackMap[n],
                r
            },
            useIframe: function(e, t) {
                var a = IFRAME_PREFIX + e,
                n = iframePool.pop();
                n || (n = doc.createElement("iframe"), n.setAttribute("frameborder", "0"), n.style.cssText = "width:0;height:0;border:0;display:none;"),
                n.setAttribute("id", a),
                n.setAttribute("src", t),
                n.parentNode || setTimeout(function() {
                    doc.body.appendChild(n)
                },
                5)
            },
            retrieveIframe: function(e) {
                var t = IFRAME_PREFIX + e,
                a = doc.querySelector("#" + t);
                iframePool.length >= iframeLimit ? doc.body.removeChild(a) : iframePool.push(a)
            },
            callMethodByIframe: function(e, t, a, n) {
                var r = {
                    "selfParam=1": 1,
                    sid: this.parseParam(a).sid
                };
                r = this.buildParam(r);
                var i = LOCAL_PROTOCOL + "://" + e + ":" + n + "/" + t + "?" + r;
                this.params[PARAM_PREFIX + n] = a,
                this.useIframe(n, i)
            },
            callMethodByPrompt: function(e, t, a, n) {
                var r = LOCAL_PROTOCOL + "://" + e + ":" + n + "/" + t + "?" + a,
                i = WV_PROTOCOL + ":";
                this.params[PARAM_PREFIX + n] = a,
                window.prompt(r, i)
            },
            onComplete: function(e) {
                isIOS && this.retrieveIframe(e),
                delete this.params[PARAM_PREFIX + e]
            }
        };
        for (var key in WV_Core) WV_Core.hasOwnProperty(key) && (win[s_goldlog][key] = WindVane[key] = WV_Core[key])
    }
    function addScript(e, t) {
        var a = "script",
        n = doc.createElement(a);
        n.type = "text/javascript",
        n.async = !0,
        n.src = is_https ? t || e: e;
        var r = doc.getElementsByTagName(a)[0];
        r.parentNode.insertBefore(n, r)
    }
    function addScriptFromFDC(e) {
        var t = "//assets.alicdn.com/s/fdc/",
        a = "//assets.alicdn.com/s/fdc/";
        addScript(t + e, a + e)
    }
    function createIframe(e, t) {
        var a = document.createElement("iframe");
        a.style.width = "1px",
        a.style.height = "1px",
        a.style.position = "absolute",
        a.style.display = "none",
        a.src = e,
        t && (a.name = t);
        var n = document.getElementsByTagName("body")[0];
        return n.appendChild(a),
        a
    }
    function checkLS() {
        var e = !1;
        if ("localStorage" in win && null != win.localStorage) try {
            localStorage.setItem("test", "test"),
            localStorage.removeItem("test"),
            e = !0
        } catch(t) {}
        return e
    }
    function isUseLSProxy() {
        if (CONFIG.DEBUG.LS_PROXY) return ! 0;
        var e = navigator.userAgent,
        t = -1 != e.indexOf("AliApp(");
        if (t) return ! 1;
        var a = e.split(" Safari/");
        return 2 != a.length ? !1 : checkLS() && win.postMessage && a[1].match(/[\d\.]+/) && e.indexOf("AppleWebKit") > -1 && e.match(/\bVersion\/\d+/) && !e.match(/\bChrome\/\d+/) && !e.match(/TencentTraveler|QQBrowser/) && !e.match(/UCBrowser|UCWEB/)
    }
    function useLSProxy(e) {
        var t = "//mmstat.alicdn.com/aplus-proxy.html?v=20130115";
        createIframe(t, JSON.stringify(e));
        win.addEventListener && win.JSON && win.addEventListener("message",
        function(e) {
            function t() {
                var e = hostsname.split("."),
                t = e.length;
                return t > 1 ? e[t - 2] + "." + e[t - 1] : hostsname
            }
            var a = e.data;
            try {
                a = JSON.parse(a)
            } catch(n) {
                return
            }
            if (a[0] && "cna" == a[0].k) for (var r, i, o, s = 0,
            c = a.length; c > s; s++) r = a[s],
            o = r.k,
            i = encodeURIComponent(o) + "=" + ("cna" == o ? r.v: encodeURIComponent(r.v)) + "; domain=." + t() + "; path=/; expires=" + new Date(r.t).toGMTString(),
            doc.cookie = i
        })
    }
    function makeUrl(e, t) {
        var a = -1 == e.indexOf("?") ? "?": "&",
        n = t ? isArray(t) ? arr2param(t) : obj2param(t) : "";
        return n ? e + a + n: e
    }
    function isDpp() {
        return isContain(getExParams(), "atp_isdpp")
    }
    function inAntiSpamWhiteList() {
        for (var e = !1,
        t = ["item.taobao.com", "detail.tmall.com", "list.tmall.com", "s.taobao.com", "list.taobao.com", "tw.taobao.com", "detail.tmall.hk", "chaoshi.tmall.com"], a = 0; a < t.length; a++) {
            var n = t[a];
            if (hostsname.indexOf(n) > -1) {
                e = !0;
                break
            }
        }
        return isDpp() && (e = !0),
        e
    }
    var win = window,
    doc = document,
    time_start = (new Date).getTime(),
    s_aplus_queue = "_ap",
    _k = "g_tb_aplus_loaded",
    _launch = "g_tb_aplus_launch",
    url_g_alicdn = "//g.alicdn.com";
    if (win[s_aplus_queue] || (win[s_aplus_queue] = []), !doc.getElementsByTagName("body").length) return void setTimeout(arguments.callee, 50);
    if (!win[_k]) {
        win[_k] = 1;
        var js_fdc_lsproxy = url_g_alicdn + "/alilog/mlog/lsproxy.js?v=20150514",
        CONFIG = {
            VERSION: {
                DEFAULT: "3",
                MANUAL: 9,
                MANUAL_TIMEOUT: 7
            },
            TIME: {
                MANUAL_TIMEOUT: 6e3
            },
            RATE: {
                AHOT_SAMPLING: .1
            },
            DEBUG: {
                AHOT: location.search.indexOf("ap-debug-ahot") > -1,
                ANTI_SPAM: location.search.indexOf("ap-debug-antispam") > -1,
                LS_PROXY: location.search.indexOf("ap-debug-lsproxy") > -1
            }
        },
        KEY = {
            NAME_STORAGE: {
                REFERRER: "wm_referrer",
                REFERRER_PV_ID: "refer_pv_id"
            }
        },
        VERSION = CONFIG.VERSION.DEFAULT,
        loc = location,
        loc_protocol = loc.protocol,
        is_https = "https:" == loc_protocol,
        is_in_iframe = parent !== self,
        use_protocol = is_https ? loc_protocol: "http:",
        default_ab = "0.0",
        pathname = loc.pathname,
        hostsname = loc.hostname,
        isAhot = getMetaAhot(),
        isPad = /TB\-PD/i.test(navigator.userAgent),
        isTerminal = isPad ? !0 : getMetaTerminal(),
        tblog_beacon_base = use_protocol + "//log.mmstat.com/",
        hjlj_beacon_base = is_https ? tblog_beacon_base: use_protocol + (isTerminal ? "//wgo.mmstat.com/": "//gm.mmstat.com/"),
        tblog_beacon_url = tblog_beacon_base + getBeaconSrc(loc.hostname) + ".gif",
        tblog_data = [["logtype", is_in_iframe ? 0 : 1]],
        tblog_extra_data = [],
        page_url = loc.href,
        loc_hash = loc.hash,
        page_referrer = doc.referrer,
        is_login_page = is_https && (page_url.indexOf("login.taobao.com") >= 0 || page_url.indexOf("login.tmall.com") >= 0),
        atta = !!doc.attachEvent,
        s_attachEvent = "attachEvent",
        s_addEventListener = "addEventListener",
        onevent = atta ? s_attachEvent: s_addEventListener,
        s_false = !1,
        s_true = !0,
        s_plain_obj = "::-plain-::",
        s_SPM_ATTR_NAME = "data-spm",
        s_SPM_DATA_PROTOCOL = "data-spm-protocol",
        s_GOLDMINER_QUEUE = "goldlog_queue",
        refer_pv_id,
        pvid = makePVId(),
        _head_node,
        _meta_nodes,
        acookie_cna = getCookie("cna"),
        _microscope_data = {},
        _microscope_data_params,
        _atp_beacon_data = {},
        _atp_beacon_data_params,
        site_instance_id_or_shop_id,
        ms_data_shop_id,
        ms_data_instance_id,
        ms_data_page_id,
        ms_data_siteCategoryId,
        ms_prototype_id,
        wh_in_page = s_false,
        spm_a = win._SPM_a,
        spm_b = win._SPM_b,
        spm_protocol,
        spm_ab,
        page_global_spm_id_origin,
        page_global_is_wangpu,
        is_head_has_meta_microscope_data = s_false,
        goldlog,
        s_goldlog = "goldlog",
        ua = navigator.userAgent,
        lib = win.lib || (win.lib = {}),
        isIOS = /iPhone|iPad|iPod/i.test(ua),
        isAndroid = /Android/i.test(ua),
        isWindVane = /WindVane/i.test(ua),
        osVersion = ua.match(/(?:OS|Android)[\/\s](\d+[._]\d+(?:[._]\d+)?)/i),
        wvVersion = ua.match(/WindVane[\/\s](\d+[._]\d+[._]\d+)/),
        WindVane = {},
        WindVane_Native = win.WindVane_Native,
        callbackMap = {},
        inc = 1,
        iframePool = [],
        iframeLimit = 3,
        LOCAL_PROTOCOL = "hybrid",
        WV_PROTOCOL = "wv_hybrid",
        IFRAME_PREFIX = "iframe_",
        SUCCESS_PREFIX = "suc_",
        FAILURE_PREFIX = "err_",
        DEFERRED_PREFIX = "defer_",
        PARAM_PREFIX = "param_",
        waitingMeta = getMetaWaiting(),
        hasWaitingMeta = 1 == waitingMeta,
        nameStorage = function() {
            function e() {
                var e, t = [],
                i = !0;
                for (var m in d) d.hasOwnProperty(m) && (i = !1, e = d[m] || "", t.push(l(m) + s + l(e)));
                a.name = i ? n: r + l(n) + o + t.join(c)
            }
            function t(e, t, a) {
                e && (e.addEventListener ? e.addEventListener(t, a, !1) : e.attachEvent && e.attachEvent("on" + t,
                function(t) {
                    a.call(e, t)
                }))
            }
            var a = window;
            if (a.nameStorage) return a.nameStorage;
            var n, r = "nameStorage:",
            i = /^([^=]+)(?:=(.*))?$/,
            o = "?",
            s = "=",
            c = "&",
            l = encodeURIComponent,
            m = decodeURIComponent,
            d = {},
            u = {};
            return function(e) {
                if (e && 0 === e.indexOf(r)) {
                    var t = e.split(/[:?]/);
                    t.shift(),
                    n = m(t.shift()) || "";
                    for (var a, o, s, l = t.join(""), u = l.split(c), p = 0, f = u.length; f > p; p++) a = u[p].match(i),
                    a && a[1] && (o = m(a[1]), s = m(a[2]) || "", d[o] = s)
                } else n = e || ""
            } (a.name),
            u.setItem = function(t, a) {
                t && "undefined" != typeof a && (d[t] = String(a), e())
            },
            u.getItem = function(e) {
                return d.hasOwnProperty(e) ? d[e] : null
            },
            u.removeItem = function(t) {
                d.hasOwnProperty(t) && (d[t] = null, delete d[t], e())
            },
            u.clear = function() {
                d = {},
                e()
            },
            u.valueOf = function() {
                return d
            },
            u.toString = function() {
                var e = a.name;
                return 0 === e.indexOf(r) ? e: r + e
            },
            t(a, "beforeunload",
            function() {
                e()
            }),
            u
        } ();
        page_referrer = doc.referrer || nameStorage.getItem(KEY.NAME_STORAGE.REFERRER) || "",
        osVersion = osVersion ? (osVersion[1] || "0.0.0").replace(/\_/g, ".") : "0.0.0",
        wvVersion = wvVersion ? (wvVersion[1] || "0.0.0").replace(/\_/g, ".") : "0.0.0",
        goldlog = {
            version: VERSION,
            pvid: pvid,
            referrer: page_referrer,
            _d: {},
            _microscope_data: _microscope_data,
            on: addEventListener,
            DOMReady: onDOMReady,
            getCookie: getCookie,
            tryToGetAttribute: tryToGetAttribute,
            tryToGetHref: tryToGetHref,
            isNumber: isNumber,
            nameStorage: nameStorage,
            send: function(e, t) {
                var a = new Image,
                n = "_img_" + Math.random(),
                r = makeUrl(e, t);
                return win[n] = a,
                a.onload = a.onerror = function() {
                    win[n] = null
                },
                a.src = r,
                a = null,
                r
            },
            emit: function(e, t) {
                var a, n = "ued.1.1.2?type=9";
                return isArray(t) ? a = [["_gm:id", e]].concat(t) : (a = objSimpleClone(t), a["_gm:id"] = e),
                goldlog.send(hjlj_beacon_base + n, a)
            },
            trace: function(e, t, a, n) {
                goldlog.record(e, t, a, n)
            },
            record: function(e, t, a, n) {
                n = arguments[3] || "";
                var r, i, o = "?",
                s = s_false,
                c = "",
                l = (spm_ab || "0.0") + ".0.0." + pvid,
                m = "//ac.mmstat.com/";
                if ("ac" == e) r = m + "1.gif",
                s = isStartWith(n, "A") && n.substr(1) == makeChkSum(e);
                else if (isStartWith(e, "ac-")) r = m + e.substr(3),
                s = isStartWith(n, "A") && n.substr(1) == makeChkSum(e);
                else if (isStartWith(e, "/")) s = isStartWith(n, "H") && n.substr(1) == makeChkSum(e),
                r = hjlj_beacon_base + e.substr(1),
                i = s_true,
                c += "&spm-cnt=" + l;
                else {
                    if (!isEndWith(e, ".gif")) return s_false;
                    r = tblog_beacon_base + e
                }
                if (!s && "%" != n && makeChkSum(page_url) != n) return s_false;
                if (r += o + "cache=" + makeCacheNum() + "&gmkey=" + encodeURIComponent(t) + "&gokey=" + encodeURIComponent(a) + "&cna=" + acookie_cna + "&isbeta=" + VERSION + c, i && (r += "&logtype=2"), isWindVane && isTerminal) {
                    var d, u = {},
                    p = {
                        gmkey: t,
                        gokey: a,
                        isbeta: VERSION
                    },
                    f = isOnePage(),
                    _ = f.split("|"),
                    g = _[0],
                    h = _[1] ? _[1] : "";
                    try {
                        d = JSON.stringify(p),
                        "{}" == d && (d = "")
                    } catch(b) {
                        d = ""
                    }
                    u.functype = "2101",
                    u.logkey = e,
                    u.logkeyargs = d,
                    u.urlpagename = h,
                    u.url = loc.href,
                    u.cna = acookie_cna || "",
                    u.extendargs = "",
                    u.isonepage = g,
                    WindVane.call("WVTBUserTrack", "toUT", u)
                }
                return isUseLSProxy() ? useLSProxy({
                    url: r,
                    js: js_fdc_lsproxy,
                    referrer: loc.href
                }) : goldlog.send(r)
            },
            launch: function(e) {
                if (!win[_launch]) {
                    win[_launch] = s_true;
                    var t, a, n = VERSION,
                    r = getExParams();
                    hasWaitingMeta && (n = CONFIG.VERSION.MANUAL, e && e.isWait && (n = CONFIG.VERSION.MANUAL_TIMEOUT));
                    for (t in e) e.hasOwnProperty(t) && (a = e[t]) && tblog_data.push([t, a]);
                    if (tblog_data.push(["isbeta", n]), tblog_data.push([mkPlainKey(), r]), tblog_data = tblog_data.concat(tblog_extra_data), win.g_aplus_pv_req = tblogSend(tblog_beacon_url, tblog_data), inAntiSpamWhiteList() || CONFIG.DEBUG.ANTI_SPAM) {
                        var i = param2obj(r).asid,
                        o = obj2param({
                            asid: i,
                            pre: page_referrer
                        });
                        goldlog.record("/ahot.1.9", "", o, "H1733420")
                    }
                }
            }
        },
        win[s_goldlog] = goldlog,
        win.goldminer = {
            record: goldlog.emit
        },
        win[s_GOLDMINER_QUEUE] && isArray(win[s_GOLDMINER_QUEUE]) || (win[s_GOLDMINER_QUEUE] = []),
        isTerminal || init_watchGoldlogQueue(),
        init_getMetaMicroscopeData(),
        init_getGlobalSPMId(),
        init_aplusQueue(),
        init_loadScripts(),
        isWindVane && isTerminal && init_windVane(),
        function() {
            var e, t, a, n = getCookie("tracknick"),
            r = getCookie("thw"),
            i = /\btanx\.com$/.test(hostsname) ? getCookie("cnaui") : "",
            o = getSPMFromUrl(page_url),
            s = getSPMFromUrl(page_referrer),
            c = win.ali_analytics && win.ali_analytics.ua && win.ali_analytics.ua.ua_info || {};
            if (loc_hash && 0 == loc_hash.indexOf("#") && (loc_hash = loc_hash.substr(1)), !is_in_iframe || atp_inIframeException()) { ("3" == ms_prototype_id || "5" == ms_prototype_id) && (t = getCookie("t"), a = t ? wp_bucketId(t, 20) : ""),
                e = [[mkPlainKey(), "title=" + escape(doc.title)], ["pre", page_referrer], ["cache", makeCacheNum()], ["scr", screen.width + "x" + screen.height]],
                acookie_cna && e.push([mkPlainKey(), "cna=" + acookie_cna]),
                n && e.push([mkPlainKey(), "nick=" + n]),
                ifAdd(e, [["wm_pageid", ms_data_page_id], ["wm_prototypeid", ms_prototype_id], ["wm_sid", ms_data_shop_id], ["spm-url", o], ["spm-pre", s], ["cnaui", i]]),
                e.push(["spm-cnt", (spm_ab || "0.0") + ".0.0." + pvid]),
                tblog_data = tblog_data.concat(e),
                ifAdd(tblog_extra_data, [["thw", r], ["bucket_id", a], ["urlokey", loc_hash], ["wm_instanceid", ms_data_instance_id], ["p", c.p], ["o", c.o], ["b", c.b], ["s", c.s], ["w", c.w], ["mx", c.mx], ["ism", c.ism]]),
                hasWaitingMeta ? setTimeout(function() {
                    goldlog.launch({
                        isWait: !0
                    })
                },
                CONFIG.TIME.MANUAL_TIMEOUT) : goldlog.launch();
                var l = spm_ab.split(".")[0];
                is_in_iframe || isTerminal || "a21bo.7724922" != spm_ab && "2013" != l && "a220o" != l || createIframe("//cookiemapping.wrating.com/link.html")
            }
            if (is_in_iframe) {
                getMetaAtpData();
                var m, d = _atp_beacon_data.on,
                u = "1" == d ? "//ac.mmstat.com/y.gif": tblog_beacon_url;
                u = isContain(hostsname, "wrating.com") ? tblog_beacon_url: u,
                "1" != d && "2" != d || !(m = _atp_beacon_data.chksum) || m !== makeChkSum(page_url).toString() || tblogSend(u, tblog_data)
            }
            addEventListener(win, "beforeunload",
            function() {
                recordValInWindowName()
            })
        } ();
        var time_end = (new Date).getTime();
        setTimeout(function() {
            Math.random() > 1e-4 || goldlog.emit("global_sample", {
                type: "timer",
                t: time_end - time_start
            })
        },
        1)
    }
} (),
function() {
    function e(e) {
        var t, a;
        try {
            return t = [].slice.call(e)
        } catch(n) {
            t = [],
            a = e.length;
            for (var r = 0; a > r; r++) t.push(e[r]);
            return t
        }
    }
    function t(e, t) {
        return e && e.getAttribute ? e.getAttribute(t) || "": ""
    }
    function a(e, t, a) {
        if (e && e.setAttribute) try {
            e.setAttribute(t, a)
        } catch(n) {}
    }
    function n(e, t) {
        if (e && e.removeAttribute) try {
            e.removeAttribute(t)
        } catch(n) {
            a(e, t, "")
        }
    }
    function r(e) {
        var t, a = e.match(new RegExp("\\?.*spm=([\\w\\.\\-\\*]+)"));
        return a && (t = a[1]) && 5 == t.split(".").length ? t: null
    }
    function i(e, t) {
        return 0 == e.indexOf(t)
    }
    function o(e) {
        for (var t = ["javascript:", "tel:", "sms:", "mailto:", "tmall://"], a = 0, n = t.length; n > a; a++) if (i(e, t[a])) return ! 0
    }
    function s(e) {
        return "string" == typeof e
    }
    function c(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
    function l(e, t) {
        return e.indexOf(t) >= 0
    }
    function m(e, t) {
        return e.indexOf(t) > -1
    }
    function d(e, t) {
        for (var a = 0,
        n = t.length; n > a; a++) if (m(e, t[a])) return be;
        return ve
    }
    function u(e) {
        return s(e) ? e.replace(/^\s+|\s+$/g, "") : ""
    }
    function p(e) {
        return "undefined" == typeof e
    }
    function f(e, t) {
        var a = t || "";
        if (e) try {
            a = decodeURIComponent(e)
        } catch(n) {}
        return a
    }
    function _() {
        return de = de || ge.getElementsByTagName("head")[0],
        ue || (de ? ue = de.getElementsByTagName("meta") : [])
    }
    function g(e, t) {
        var a, n, r = e.split(";"),
        i = r.length;
        for (a = 0; i > a; a++) n = r[a].split("="),
        t[u(n[0]) || Ne] = f(u(n.slice(1).join("=")))
    }
    function h() {
        var e, a, n, r = _(),
        i = r.length;
        for (e = 0; i > e; e++) if (a = r[e], "aplus-terminal" == t(a, "name")) {
            n = t(a, "content");
            break
        }
        return n
    }
    function b() {
        var e, a, n, r, i = _();
        for (e = 0, a = i.length; a > e; e++) n = i[e],
        r = t(n, "name"),
        r == Be && (pe = t(n, ze))
    }
    function v(e) {
        var a, n, r, o, s, c, l = _();
        if (l) for (a = 0, n = l.length; n > a; a++) if (o = l[a], s = t(o, "name"), s == e) return ce = t(o, "content"),
        ce.indexOf(":") >= 0 && (r = ce.split(":"), pe = "i" == r[0] ? "i": "u", ce = r[1]),
        c = t(o, ze),
        c && (pe = "i" == c ? "i": "u"),
        le = i(ce, "110"),
        se = le ? Ie: ce,
        be;
        return ve
    }
    function y() {
        var e, a, n, r = _(),
        i = r.length;
        for (e = 0; i > e; e++) if (a = r[e], "aplus-touch" == t(a, "name")) {
            n = t(a, "content");
            break
        }
        return n
    }
    function w() {
        return Math.floor(268435456 * Math.random()).toString(16)
    }
    function E(e) {
        var t, a, n = [];
        for (t in e) e.hasOwnProperty(t) && (a = "" + e[t], n.push(i(t, Ne) ? a: t + "=" + encodeURIComponent(a)));
        return n.join("&")
    }
    function A(e) {
        var t, a, n, r = [],
        o = e.length;
        for (n = 0; o > n; n++) t = e[n][0],
        a = e[n][1],
        r.push(i(t, Ne) ? a: t + "=" + encodeURIComponent(a));
        return r.join("&")
    }
    function O(e) {
        var t;
        try {
            t = u(e.getAttribute("href", 2))
        } catch(a) {}
        return t || ""
    }
    function P(e, t, a) {
        return "tap" == t ? void T(e, a) : void e[Ue]((Ve ? "on": "") + t,
        function(e) {
            e = e || _e.event;
            var t = e.target || e.srcElement;
            a(t)
        },
        ve)
    }
    function T(e, t) {
        var a = "ontouchend" in document.createElement("div"),
        n = a ? "touchstart": "mousedown";
        P(e, n,
        function(e) {
            t && t(e)
        })
    }
    function S(e) {
        var t = _e.KISSY;
        t ? t.ready(e) : _e.jQuery ? jQuery(ge).ready(e) : "complete" === ge.readyState ? e() : P(_e, "load", e)
    }
    function M(e, t) {
        var a, n = new Image,
        r = "_img_" + Math.random(),
        i = -1 == e.indexOf("?") ? "?": "&",
        o = t ? c(t) ? A(t) : E(t) : "";
        return _e[r] = n,
        n.onload = n.onerror = function() {
            _e[r] = null
        },
        n.src = a = o ? e + i + o: e,
        n = null,
        a
    }
    function k() {
        var e;
        if (ke && !Xe && (e = ye.match(/^[^?]+\?[^?]*spm=([^&#?]+)/), e && (Xe = e[1] + "_")), !p(se)) return se;
        if (_e._SPM_a && _e._SPM_b && (ie = _e._SPM_a.replace(/^{(\w*|-)}$/g, "$1"), oe = _e._SPM_b.replace(/^{(\w*|-)}$/g, "$1"), ie && "-" != ie && oe && "-" != oe)) return Ge = be,
        se = ie + "." + oe,
        b(),
        se;
        if (v(Be) || v("spm-id"), !se) return Re = !0,
        se = Ie,
        Ie;
        var a, n, r = ge.getElementsByTagName("body");
        return r = r && r.length ? r[0] : null,
        r && (a = t(r, Be), a && (n = se.split("."), se = n[0] + "." + a)),
        m(se, ".") || (Re = !0, se = Ie),
        se
    }
    function x(a) {
        var n, r, i, o, s, c, l, m, d = [];
        for (n = e(a.getElementsByTagName("a")), r = e(a.getElementsByTagName("area")), o = n.concat(r), l = 0, m = o.length; m > l; l++) {
            for (c = !1, s = i = o[l]; (s = s.parentNode) && s != a;) if (t(s, Be)) {
                c = !0;
                break
            }
            c || d.push(i)
        }
        return d
    }
    function I(e, a, n) {
        var r, o, c, m, d, u, p, f, _, g, h, b, v, y, w, E, A;
        if (a = a || e.getAttribute(Be) || "") {
            if (r = x(e), c = a.split("."), w = i(a, "110") && 3 == c.length, w && (E = c[2], c[2] = "w" + (E || "0"), a = c.join(".")), s(h = k()) && h.match(/^[\w\-\*]+(\.[\w\-\*]+)?$/)) if (l(a, ".")) {
                if (!i(a, h)) {
                    for (m = h.split("."), c = a.split("."), v = 0, b = m.length; b > v; v++) c[v] = m[v];
                    a = c.join(".")
                }
            } else l(h, ".") || (h += ".0"),
            a = h + "." + a;
            if (a.match && a.match(/^[\w\-\*]+\.[\w\-\*]+\.[\w\-\*]+$/)) {
                for (A = parseInt(t(e, "data-spm-max-idx")) || 0, y = 0, d = A, b = r.length; b > y; y++) o = r[y],
                u = O(o),
                u && (w && o.setAttribute(He, E), p = o.getAttribute(Ke), p && Q(p) ? W(o, p, n) : (f = D(o.parentNode), f.a_spm_ab ? (g = f.a_spm_ab, _ = f.ab_idx) : (g = void 0, d++, _ = d), p = g ? a + "-" + g + "." + (G(o) || _) : a + "." + (G(o) || _), W(o, p, n)));
                e.setAttribute("data-spm-max-idx", d)
            }
        }
    }
    function R(e) {
        var t, a = ["mclick.simba.taobao.com", "click.simba.taobao.com", "click.tanx.com", "click.mz.simba.taobao.com", "click.tz.simba.taobao.com", "redirect.simba.taobao.com", "rdstat.tanx.com", "stat.simba.taobao.com", "s.click.taobao.com"],
        n = a.length;
        for (t = 0; n > t; t++) if ( - 1 != e.indexOf(a[t])) return ! 0;
        return ! 1
    }
    function N(e) {
        return e ? !!e.match(/^[^\?]*\balipay\.(?:com|net)\b/i) : ve
    }
    function C(e) {
        return e ? !!e.match(/^[^\?]*\balipay\.(?:com|net)\/.*\?.*\bsign=.*/i) : ve
    }
    function j(e) {
        for (var a; (e = e.parentNode) && e.tagName != je;) if (a = t(e, ze)) return a;
        return ""
    }
    function V(e, t) {
        if (e && /&?\bspm=[^&#]*/.test(e) && (e = e.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "")), !t) return e;
        var a, n, r, i, o, s, c, l = "&";
        if ( - 1 != e.indexOf("#") && (r = e.split("#"), e = r.shift(), n = r.join("#")), i = e.split("?"), o = i.length - 1, r = i[0].split("//"), r = r[r.length - 1].split("/"), s = r.length > 1 ? r.pop() : "", o > 0 && (a = i.pop(), e = i.join("?")), a && o > 1 && -1 == a.indexOf("&") && -1 != a.indexOf("%") && (l = "%26"), e = e + "?spm=" + Xe + t + (a ? l + a: "") + (n ? "#" + n: ""), c = m(s, ".") ? s.split(".").pop().toLowerCase() : "") {
            if ({
                png: 1,
                jpg: 1,
                jpeg: 1,
                gif: 1,
                bmp: 1,
                swf: 1
            }.hasOwnProperty(c)) return 0; ! a && 1 >= o && (n || {
                htm: 1,
                html: 1,
                php: 1
            }.hasOwnProperty(c) || (e += "&file=" + s))
        }
        return e
    }
    function L(e) {
        return e && ye.split("#")[0] == e.split("#")[0]
    }
    function W(e, a, n) {
        if (e.setAttribute(Ke, a), !n && !t(e, $e) && (me = _e.g_aplus_pv_id, me && (a += "." + me), me || se && se != Ie)) {
            var r = O(e),
            s = "i" == (t(e, ze) || j(e) || pe),
            c = Se + "tbspm.1.1?logtype=2&spm=";
            r && !R(r) && (s || !(i(r, "#") || L(r) || o(r.toLowerCase()) || N(r) || C(r))) && (s ? (c += a + "&url=" + encodeURIComponent(r) + "&cache=" + w(), fe == e && M(c)) : n || (r = V(r, a)) && U(e, r))
        }
    }
    function U(e, t) {
        var a, n = e.innerHTML;
        n && -1 == n.indexOf("<") && (a = ge.createElement("b"), a.style.display = "none", e.appendChild(a)),
        e.href = t,
        a && e.removeChild(a)
    }
    function G(e) {
        var a;
        return Re ? a = "0": (a = t(e, Be), a && a.match(/^d\w+$/) || (a = "")),
        a
    }
    function F(e) {
        for (var t, a, n = e; e && e.tagName != Ce && e.tagName != je && e.getAttribute;) {
            if (a = e.getAttribute(Be)) {
                t = a,
                n = e;
                break
            }
            if (! (e = e.parentNode)) break
        }
        return t && !/^[\w\-\.]+$/.test(t) && (t = "0"),
        {
            spm_c: t,
            el: n
        }
    }
    function D(e) {
        for (var a, n = {},
        r = ""; e && e.tagName != Ce && e.tagName != je;) {
            if (!r && (r = t(e, Ye))) {
                a = parseInt(t(e, "data-spm-ab-max-idx")) || 0,
                n.a_spm_ab = r,
                n.ab_idx = ++a,
                e.setAttribute("data-spm-ab-max-idx", a);
                break
            }
            if (t(e, Be)) break;
            e = e.parentNode
        }
        return n
    }
    function B(e) {
        var t;
        return e && (t = e.match(/&?\bspm=([^&#]*)/)) ? t[1] : ""
    }
    function z(e, t) {
        var a = O(e),
        n = B(a),
        r = null,
        i = se && 2 == se.split(".").length;
        return i ? (r = [se, 0, G(e) || 0], void W(e, r.join("."), t)) : void(a && n && (a = a.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "").replace(/\?#/, "#"), U(e, a)))
    }
    function Q(e) {
        var t = e.split(".");
        return t[0] + "." + t[1] == se
    }
    function $(e, a) {
        fe = e,
        Ge && q();
        var n, r, i = t(e, Ke);
        if (i && Q(i)) W(e, i, a);
        else {
            if (n = F(e.parentNode), r = n.spm_c, !r) return void z(e, a);
            Re && (r = "0"),
            I(n.el, r, a)
        }
    }
    function X(t) {
        if (t && 1 == t.nodeType) {
            n(t, "data-spm-max-idx");
            var a, r = e(t.getElementsByTagName("a")),
            i = e(t.getElementsByTagName("area")),
            o = r.concat(i),
            s = o.length;
            for (a = 0; s > a; a++) n(o[a], Ke)
        }
    }
    function H(e) {
        var t = e.parentNode;
        if (!t) return "";
        var a = e.getAttribute(Be),
        n = F(t),
        r = n.spm_c || 0;
        r && -1 != r.indexOf(".") && (r = r.split("."), r = r[r.length - 1]);
        var i = se + "." + r,
        o = xe[i] || 0;
        return o++,
        xe[i] = o,
        a = a || o,
        i + ".i" + a
    }
    function K(e) {
        var a, n = e.tagName;
        return me = _e.g_aplus_pv_id,
        "A" != n && "AREA" != n ? a = H(e) : ($(e, be), a = t(e, Ke)),
        a = (a || "0.0.0.0").split("."),
        {
            a: a[0],
            b: a[1],
            c: a[2],
            d: a[3],
            e: me
        }
    }
    function Y(e, t) {
        if (t || (t = ge), ge.evaluate) return t.evaluate(e, ge, null, 9, null).singleNodeValue;
        for (var a, n = e.split("/"); ! a && n.length > 0;) a = n.shift();
        var r, i = /^.+?\[@id="(.+?)"]$/i,
        o = /^(.+?)\[(\d+)]$/i;
        return (r = a.match(i)) ? t = t.getElementById(r[1]) : (r = a.match(o)) && (t = t.getElementsByTagName(r[1])[parseInt(r[2]) - 1]),
        t ? 0 == n.length ? t: Y(n.join("/"), t) : null
    }
    function q() {
        var e, t, n, r = {};
        for (e in Fe) Fe.hasOwnProperty(e) && (t = Y(e), t && (r[e] = 1, n = Fe[e], a(t, Be, ("A" == t.tagName ? n.spmd: n.spmc) || "")));
        for (e in r) r.hasOwnProperty(e) && delete Fe[e]
    }
    function J() {
        if (!De) {
            if (!_e.spmData) return void(Me || setTimeout(arguments.callee, 100));
            De = be;
            var e, t, a, n, r = _e.spmData.data;
            if (r && c(r)) {
                for (e = 0, t = r.length; t > e; e++) a = r[e],
                n = a.xpath,
                n = n.replace(/^id\("(.+?)"\)(.*)/g, '//*[@id="$1"]$2'),
                Fe[n] = {
                    spmc: a.spmc,
                    spmd: a.spmd
                };
                q()
            }
        }
    }
    function Z() {
        var e, a, n, r, i = ge.getElementsByTagName("iframe"),
        o = i.length;
        for (a = 0; o > a; a++) e = i[a],
        !e.src && (n = t(e, Qe)) && (r = K(e), r ? (r = [r.a, r.b, r.c, r.d, r.e].join("."), e.src = V(n, r)) : e.src = n)
    }
    function ee() {
        function e() {
            t++,
            t > 10 && (a = 3e3),
            Z(),
            setTimeout(e, a)
        }
        var t = 0,
        a = 500;
        e()
    }
    function te(e, t) {
        var a, n, o = "gostr",
        s = "locaid",
        c = {};
        if (g(t, c), a = c[o], n = c[s], a && n) {
            i(a, "/") && (a = a.substr(1));
            var l = K(e),
            m = [l.a, l.b, l.c, n].join("."),
            d = a + "." + m,
            u = ["logtype=2", "cache=" + Math.random(), "autosend=1", "spm-cnt=" + [l.a, l.b].join(".") + ".0.0"],
            p = r(ye);
            p && u.push("spm-pre=" + p);
            var f;
            for (f in c) c.hasOwnProperty(f) && f != o && f != s && u.push(f + "=" + c[f]);
            u.length > 0 && (d += "?" + u.join("&"));
            var _, h = {
                gmkey: "",
                gokey: u.length > 0 ? u.join("&") : ""
            };
            setTimeout(function() {
                if (Pe && window.goldlog && window.goldlog.call && (_ = window.goldlog.windVaneData)) {
                    try {
                        h = JSON.stringify(h),
                        "{}" == h && (h = "")
                    } catch(e) {
                        h = ""
                    }
                    _.functype = "2101",
                    _.logkey = "/" + a + "." + m,
                    _.logkeyargs = h,
                    _.extendargs = "",
                    delete _.spmcnt,
                    delete _.spmpre,
                    delete _.lzsid,
                    window.goldlog.call("WVTBUserTrack", "toUT", _)
                }
            },
            300),
            M(Se + d),
            e.setAttribute(Ke, m)
        }
    }
    function ae(e) {
        for (var a; e && e.tagName != Ce;) {
            a = t(e, $e); {
                if (a) {
                    te(e, a);
                    break
                }
                e = e.parentNode
            }
        }
    }
    function ne() {
        Pe && Te ? P(ge, "tap", ae) : P(ge, "mousedown", ae)
    }
    function re(e) {
        for (var t; e && (t = e.tagName);) {
            if ("A" == t || "AREA" == t) {
                $(e, ve);
                break
            }
            if (t == je || t == Ce) break;
            e = e.parentNode
        }
    }
    var ie, oe, se, ce, le, me, de, ue, pe, fe, _e = window,
    ge = document,
    he = location,
    be = !0,
    ve = !1,
    ye = he.href,
    we = he.protocol,
    Ee = "https:" == we,
    Ae = Ee ? we: "http:",
    Oe = /TB\-PD/i.test(navigator.userAgent),
    Pe = Oe ? !0 : h(),
    Te = y(),
    Se = Ae + (Pe ? "//wgo.mmstat.com/": "//gm.mmstat.com/"),
    Me = ve,
    ke = parent !== self,
    xe = {},
    Ie = "0.0",
    Re = !1,
    Ne = "::-plain-::",
    Ce = "HTML",
    je = "BODY",
    Ve = !!ge.attachEvent,
    Le = "attachEvent",
    We = "addEventListener",
    Ue = Ve ? Le: We,
    Ge = ve,
    Fe = {},
    De = ve,
    Be = "data-spm",
    ze = "data-spm-protocol",
    Qe = "data-spm-src",
    $e = "data-spm-click",
    Xe = "",
    He = "data-spm-wangpu-module-id",
    Ke = "data-spm-anchor-id",
    Ye = "data-spm-ab"; (!d(ye, ["xiaobai.com", "admin.taobao.org"]) || d(ye, ["tmc.admin.taobao.org"])) && (S(function() {
        Me = be
    }), k(), J(), Pe || ee(), ne(), Pe && Te ? P(ge, "tap", re) : (P(ge, "mousedown", re), P(ge, "keydown", re)), _e.g_SPM = {
        resetModule: X,
        anchorBeacon: $,
        getParam: K
    })
} (),
function() {
    function e(e, t, a) {
        e[E]((v ? "on": "") + t,
        function(e) {
            e = e || l.event;
            var t = e.target || e.srcElement;
            a(e, t)
        },
        !1)
    }
    function t() {
        return /&?\bspm=[^&#]*/.test(location.href) ? location.href.match(/&?\bspm=[^&#]*/gi)[0].split("=")[1] : ""
    }
    function a(e, t) {
        if (e && /&?\bspm=[^&#]*/.test(e) && (e = e.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "")), !t) return e;
        var a, n, r, i, o, s, c, l = "&";
        if ( - 1 != e.indexOf("#") && (r = e.split("#"), e = r.shift(), n = r.join("#")), i = e.split("?"), o = i.length - 1, r = i[0].split("//"), r = r[r.length - 1].split("/"), s = r.length > 1 ? r.pop() : "", o > 0 && (a = i.pop(), e = i.join("?")), a && o > 1 && -1 == a.indexOf("&") && -1 != a.indexOf("%") && (l = "%26"), e = e + "?spm=" + t + (a ? l + a: "") + (n ? "#" + n: ""), c = s.indexOf(".") > -1 ? s.split(".").pop().toLowerCase() : "") {
            if ({
                png: 1,
                jpg: 1,
                jpeg: 1,
                gif: 1,
                bmp: 1,
                swf: 1
            }.hasOwnProperty(c)) return 0; ! a && 1 >= o && (n || {
                htm: 1,
                html: 1,
                php: 1
            }.hasOwnProperty(c) || (e += "&file=" + s))
        }
        return e
    }
    function n(e) {
        function t(e) {
            return e = e.replace(/refpos[=(%3D)]\w*/gi, s).replace(i, "%3D" + n + "%26" + r.replace("=", "%3D")).replace(o, n),
            r.length > 0 && (e += "&" + r),
            e
        }
        var a = window.location.href,
        n = a.match(/mm_\d{0,24}_\d{0,24}_\d{0,24}/i),
        r = a.match(/[&\?](pvid=[^&]*)/i),
        i = new RegExp("%3Dmm_\\d+_\\d+_\\d+", "ig"),
        o = new RegExp("mm_\\d+_\\d+_\\d+", "ig");
        r = r && r[1] ? r[1] : "";
        var s = a.match(/(refpos=(\d{0,24}_\d{0,24}_\d{0,24})?(,[a-z]+)?)(,[a-z]+)?/i);
        return s = s && s[0] ? s[0] : "",
        n ? (n = n[0], t(e)) : e
    }
    function r(t) {
        var a = l.KISSY;
        a ? a.ready(t) : l.jQuery ? jQuery(m).ready(t) : "complete" === m.readyState ? t() : e(l, "load", t)
    }
    function i(e, t) {
        return e && e.getAttribute ? e.getAttribute(t) || "": ""
    }
    function o(e) {
        if (e) {
            var t, a = b.length;
            for (t = 0; a > t; t++) if (e.indexOf(b[t]) > -1) return ! 0;
            return ! 1
        }
    }
    function s(e, t) {
        if (e && /&?\bspm=[^&#]*/.test(e) && (e = e.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "")), !t) return e;
        var a, n, r, i, o, s, c, l = "&";
        if ( - 1 != e.indexOf("#") && (r = e.split("#"), e = r.shift(), n = r.join("#")), i = e.split("?"), o = i.length - 1, r = i[0].split("//"), r = r[r.length - 1].split("/"), s = r.length > 1 ? r.pop() : "", o > 0 && (a = i.pop(), e = i.join("?")), a && o > 1 && -1 == a.indexOf("&") && -1 != a.indexOf("%") && (l = "%26"), e = e + "?spm=" + t + (a ? l + a: "") + (n ? "#" + n: ""), c = s.indexOf(".") > -1 ? s.split(".").pop().toLowerCase() : "") {
            if ({
                png: 1,
                jpg: 1,
                jpeg: 1,
                gif: 1,
                bmp: 1,
                swf: 1
            }.hasOwnProperty(c)) return 0; ! a && 1 >= o && (n || {
                htm: 1,
                html: 1,
                php: 1
            }.hasOwnProperty(c) || (e += "&__file=" + s))
        }
        return e
    }
    function c(e) {
        if (o(e.href)) {
            var a = i(e, h);
            if (!a) {
                if (!f) return;
                var n = f(e),
                r = [n.a, n.b, n.c, n.d, n.e].join(".");
                _ && (r = [n.a || "0", n.b || "0", n.c || "0", n.d || "0"].join("."), r = (t() || "0.0.0.0.0") + "_" + r);
                var c = s(e.href, r);
                e.href = c,
                e.setAttribute(h, r)
            }
        }
        e = void 0
    }
    var l = window,
    m = document,
    d = location,
    u = (d.href, l._alimm_spmact_on_);
    if ("undefined" == typeof u && (u = 1), 1 == u && (u = 1), 0 == u && (u = 0), u) {
        var p = function() {
            return {
                a: 0,
                b: 0,
                c: 0,
                d: 0,
                e: 0
            }
        },
        f = l.g_SPM && l.g_SPM.getParam ? l.g_SPM.getParam: p,
        _ = !0;
        try {
            _ = self.location != top.location
        } catch(g) {}
        var h = "data-spm-act-id",
        b = ["mclick.simba.taobao.com", "click.simba.taobao.com", "click.tanx.com", "click.mz.simba.taobao.com", "click.tz.simba.taobao.com", "redirect.simba.taobao.com", "rdstat.tanx.com", "stat.simba.taobao.com", "s.click.taobao.com"],
        v = !!m.attachEvent,
        y = "attachEvent",
        w = "addEventListener",
        E = v ? y: w;
        e(m, "mousedown",
        function(e, t) {
            for (var a, n = 0; t && (a = t.tagName) && 5 > n;) {
                if ("A" == a || "AREA" == a) {
                    c(t);
                    break
                }
                if ("BODY" == a || "HTML" == a) break;
                t = t.parentNode,
                n++
            }
        }),
        r(function() {
            for (var e, r, o = document.getElementsByTagName("iframe"), s = 0; s < o.length; s++) {
                e = i(o[s], "mmsrc"),
                r = i(o[s], "mmworked");
                var c = f(o[s]),
                l = [c.a || "0", c.b || "0", c.c || "0", c.d || "0", c.e || "0"].join(".");
                e && !r ? (_ && (l = [c.a || "0", c.b || "0", c.c || "0", c.d || "0"].join("."), l = t() + "_" + l), o[s].src = a(n(e), l), o[s].setAttribute("mmworked", "mmworked")) : o[s].setAttribute(h, l)
            }
        })
    }
} ();