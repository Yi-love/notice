/*2015-06-09 05:21:26*/
!
function() {
    function e(e) {
        var t, n = [];
        for (t in e) e.hasOwnProperty(t) && n.push(encodeURIComponent(t) + "=" + encodeURIComponent(e[t]));
        return n.join("; ")
    }
    function t(e, t) {
        var n = document.createElement("iframe");
        n.style.width = "1px",
        n.style.height = "1px",
        n.style.position = "absolute",
        n.style.display = "none",
        n.src = e,
        t && (n.name = t);
        var r = document.getElementsByTagName("body")[0];
        return r.appendChild(n),
        n
    }
    function n(e, t, n) {
        var r = document.createElement("form");
        r.action = e,
        r.method = "POST",
        r.target = t;
        var a, o;
        for (o in n) n.hasOwnProperty(o) && (a = document.createElement("input"), a.name = o, a.type = "hidden", a.value = n[o], r.appendChild(a));
        r.submit()
    }
    function r() {
        if (window.g_pdata) {
            var r = window.g_pdata,
            a = o(),
            i = JSON && window.name && JSON.parse(window.name) || {},
            c = i.referrer;
            a.referrer = c || document.referrer;
            var l = "for_beacon";
            d = t("", l),
            n(r.url, l, {
                data: e(a)
            })
        }
    }
    function a(e) {
        for (var t = 0,
        n = e.length; n > t; t++) localStorage.removeItem(e[t])
    }
    function o() {
        var e, t, n, r = localStorage.length,
        o = {},
        i = [],
        c = (new Date).getTime() / 1e3;
        for (e = 0; r > e; e++) if (t = localStorage.key(e), n = localStorage.getItem(t), -1 != n.indexOf(l)) {
            try {
                n = JSON.parse(n)
            } catch(d) {
                i.push(t);
                continue
            } ! n.t || n.t < c ? i.push(t) : o[t] = n.v
        }
        return i.length > 0 && a(i),
        o
    }
    function i(e, t) {
        var n = JSON.stringify([{
            k: "cna",
            v: e,
            t: 1e3 * t
        }]);
        window.parent.postMessage(n, "*")
    }
    function c(e) {
        for (var t = !1,
        n = ["mmstat.com", "alicdn.com"], r = e.split("//"), a = r[1] ? r[1] : r[0], o = 0; o < n.length; o++) {
            var i = n[o];
            if (a.indexOf(i) > -1) {
                t = !0;
                break
            }
        }
        return t
    }
    if (window.localStorage) {
        var d, l = "__isaplus";
        window.addEventListener("message",
        function(e) {
            if (c(e.origin)) {
                var t = e.data;
                try {
                    t = JSON.parse(t)
                } catch(n) {
                    return
                }
                var r, a;
                for (r in t) t.hasOwnProperty(r) && (a = t[r], a[l] = 1, "cna" != r ? localStorage.setItem(r, JSON.stringify(a)) : a.v && i(a.v, a.t))
            }
        }),
        r()
    }
} ();