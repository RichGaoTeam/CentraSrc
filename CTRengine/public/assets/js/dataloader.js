AmCharts.translations.dataLoader = {}, AmCharts.addInitHandler(function(t) {
    function e(r, o, n, u) {
        void 0 === u && (u = "dataProvider"), n.showCurtain && s(void 0, n.noStyles), c.remaining++, c.percentLoaded[r] = 0, void 0 !== n.progress && "function" == typeof n.progress && void 0 === n._progress && (n._progress = n.progress, n.progress = function(t) {
            c.percentLoaded[r] = t;
            var e = 0,
                a = 0;
            for (var o in c.percentLoaded) c.percentLoaded.hasOwnProperty(o) && (a++, e += c.percentLoaded[o]);
            var i = Math.round(e / a * 100) / 100;
            n._progress.call(this, i, Math.round(100 * t) / 100, r)
        }), AmCharts.loadFile(r, n, function(s) {
            if (!1 === s) l(n.error, n, t), i(AmCharts.__("Error loading the file", t.language) + ": " + r, !1, n);
            else {
                switch (void 0 === n.format && (n.format = "json"), n.format = n.format.toLowerCase(), n.format) {
                    case "json":
                        if (o[u] = AmCharts.parseJSON(s), !1 === o[u]) return l(n.error, n, t), i(AmCharts.__("Error parsing JSON file", t.language) + ": " + c.url, !1, n), void(o[u] = []);
                        o[u] = a(o[u], n), l(n.load, n, t);
                        break;
                    case "csv":
                        if (o[u] = AmCharts.parseCSV(s, n), !1 === o[u]) return l(n.error, n, t), i(AmCharts.__("Error parsing CSV file", t.language) + ": " + c.url, !1, n), void(o[u] = []);
                        o[u] = a(o[u], n), l(n.load, n, t);
                        break;
                    default:
                        return l(n.error, n, t), void i(AmCharts.__("Unsupported data format", t.language) + ": " + n.format, !1, n.noStyles)
                }
                if (c.remaining--, 0 === c.remaining && (l(n.complete, t), n.async))
                    if ("map" === t.type) t.validateNow(!0), d();
                    else if ("gauge" !== t.type && t.addListener("dataUpdated", function(e) {
                        "stock" !== t.type || n.reloading || void 0 === t.periodSelector || t.periodSelector.setDefaultPeriod(), d(), t.events.dataUpdated.pop()
                    }), "gauge" === t.type ? (d(), t.validateNow()) : t.validateData(), c.startDuration)
                    if ("stock" === t.type) {
                        t.panelsSettings.startDuration = c.startDuration;
                        for (var p = 0; p < t.panels.length; p++) t.panels[p].startDuration = c.startDuration, t.panels[p].animateAgain()
                    } else t.startDuration = c.startDuration, void 0 !== t.animateAgain && t.animateAgain();
                n.reload && (n.timeout && clearTimeout(n.timeout), n.timeout = setTimeout(e, 1e3 * n.reload, r, o, n, u), n.reloading = !0)
            }
        })
    }

    function a(e, a) {
        if (void 0 === a.postProcess || !r(a.postProcess)) return e;
        try {
            return a.postProcess.call(c, e, a, t)
        } catch (r) {
            return i(AmCharts.__("Error loading file", t.language) + ": " + a.url, !1, a), e
        }
    }

    function r(t) {
        return "function" == typeof t
    }

    function o(t) {
        for (var e in p) p.hasOwnProperty(e) && n(t, e, p[e])
    }

    function n(t, e, a) {
        void 0 === t[e] && (t[e] = a)
    }

    function i(t, e, a) {
        a.showErrors ? s(t, a.noStyles) : (d(), console.log(t))
    }

    function s(e, a) {
    /*    d(), void 0 === e && (e = AmCharts.__("Loading data...", t.language));
        var r = document.createElement("div");
        if (r.setAttribute("id", t.div.id + "-curtain"), r.className = "amcharts-dataloader-curtain", !0 !== a) {
            r.style.position = "absolute", r.style.top = 0, r.style.left = 0, r.style.width = (void 0 !== t.realWidth ? t.realWidth : t.divRealWidth) + "px", r.style.height = (void 0 !== t.realHeight ? t.realHeight : t.divRealHeight) + "px", r.style.textAlign = "center", r.style.display = "table", r.style.fontSize = "20px";
            try {
                r.style.background = "rgba(255, 255, 255, 0.3)"
            } catch (t) {
                r.style.background = "rgb(255, 255, 255)"
            }
            r.innerHTML = '<div style="display: table-cell; vertical-align: middle;">' + e + "</div>"
        } else r.innerHTML = e;
        t.containerDiv.appendChild(r), c.curtain = r*/
    }

    function d() {
        try {
            void 0 !== c.curtain && t.containerDiv.removeChild(c.curtain)
        } catch (t) {}
        c.curtain = void 0
    }

    function l(t, e, a, r) {
        "function" == typeof t && t.call(c, e, a, r)
    }
    void 0 !== t.dataLoader && function(t) {
        return "object" == typeof t
    }(t.dataLoader) || (t.dataLoader = {});
    var u = t.version.split(".");
    if (!(Number(u[0]) < 3 || 3 === Number(u[0]) && Number(u[1]) < 13)) {
        var c = t.dataLoader;
        c.remaining = 0, c.percentLoaded = {};
        var p = {
            async: !0,
            format: "json",
            showErrors: !0,
            showCurtain: !0,
            noStyles: !1,
            reload: 0,
            timestamp: !1,
            delimiter: ",",
            skip: 0,
            skipEmpty: !0,
            emptyAs: void 0,
            useColumnNames: !1,
            init: !1,
            progress: !1,
            reverse: !1,
            reloading: !1,
            complete: !1,
            error: !1,
            numberFields: [],
            headers: [],
            chart: t
        };
        c.loadData = function() {
            if ("stock" === t.type) setTimeout(function() {
                0 > t.panelsSettings.startDuration && (c.startDuration = t.panelsSettings.startDuration, t.panelsSettings.startDuration = 0);
                for (var a = 0; a < t.dataSets.length; a++) {
                    var r = t.dataSets[a];
                    void 0 !== r.dataLoader && void 0 !== r.dataLoader.url && (l(r.dataLoader.init, r.dataLoader, t), r.dataProvider = [], o(r.dataLoader), e(r.dataLoader.url, r, r.dataLoader, "dataProvider")), void 0 !== r.eventDataLoader && void 0 !== r.eventDataLoader.url && (l(r.eventDataLoader.init, r.eventDataLoader, t), r.events = [], o(r.eventDataLoader), e(r.eventDataLoader.url, r, r.eventDataLoader, "stockEvents"))
                }
            }, 100);
            else {
                if (l(c.init, c, t), o(c), void 0 === c.url) return;
                void 0 !== t.startDuration && 0 < t.startDuration && (c.startDuration = t.startDuration, t.startDuration = 0), "gauge" === t.type ? (void 0 === t.arrows && (t.arrows = []), e(c.url, t, c, "arrows")) : (void 0 === t.dataProvider && (t.dataProvider = "map" === t.type ? {} : []), e(c.url, t, c, "dataProvider"))
            }
        }, c.loadData()
    }
}, ["pie", "serial", "xy", "funnel", "radar", "gauge", "gantt", "stock", "map"]), void 0 === AmCharts.__ && (AmCharts.__ = function(t, e) {
    return void 0 !== e && void 0 !== AmCharts.translations.dataLoader[e] && void 0 !== AmCharts.translations.dataLoader[e][t] ? AmCharts.translations.dataLoader[e][t] : t
}), AmCharts.loadFile = function(t, e, a) {
    "object" != typeof e && (e = {}), void 0 === e.async && (e.async = !0);
    var r;
    r = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
    try {
        r.open("GET", e.timestamp ? AmCharts.timestampUrl(t) : t, e.async)
    } catch (t) {
        a.call(this, !1)
    }
    if (void 0 !== e.headers && e.headers.length)
        for (var o = 0; o < e.headers.length; o++) {
            var n = e.headers[o];
            r.setRequestHeader(n.key, n.value)
        }
    void 0 !== e.progress && "function" == typeof e.progress && (r.onprogress = function(t) {
        var a = t.loaded / t.total * 100;
        e.progress.call(this, a)
    }), r.onreadystatechange = function() {
        4 === r.readyState && 404 === r.status ? a.call(this, !1) : 4 === r.readyState && 200 === r.status && a.call(this, r.responseText)
    };
    try {
        r.send()
    } catch (t) {
        a.call(this, !1)
    }
}, AmCharts.parseJSON = function(response) {
    try {
        return void 0 !== JSON ? JSON.parse(response) : eval(response)
    } catch (t) {
        return !1
    }
}, AmCharts.parseCSV = function(t, e) {
    var a, r, o = AmCharts.CSVToArray(t, e.delimiter),
        n = e.numberFields && e.numberFields.length > 0,
        i = [],
        s = [];
    if (e.useColumnNames) {
        s = o.shift();
        for (var d = 0; d < s.length; d++) "" === (a = s[d].replace(/^\s+|\s+$/gm, "")) && (a = "col" + d), s[d] = a;
        0 < e.skip && e.skip--
    }
    for (r = 0; r < e.skip; r++) o.shift();
    for (var l; l = e.reverse ? o.pop() : o.shift();)
        if (!e.skipEmpty || 1 !== l.length || "" !== l[0]) {
            var u = {};
            for (r = 0; r < l.length; r++) u[a = void 0 === s[r] ? "col" + r : s[r]] = "" === l[r] ? e.emptyAs : l[r], n && -1 !== e.numberFields.indexOf(a) && (u[a] = Number(u[a]));
            i.push(u)
        }
    return i
}, AmCharts.CSVToArray = function(t, e) {
    e = e || ",";
    for (var a = new RegExp("(\\" + e + '|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\' + e + "\\r\\n]*))", "gi"), r = [
            []
        ], o = null; o = a.exec(t);) {
        var n = o[1];
        n.length && n !== e && r.push([]);
        var i;
        i = o[2] ? o[2].replace(new RegExp('""', "g"), '"') : o[3], r[r.length - 1].push(i)
    }
    return r
}, AmCharts.timestampUrl = function(t) {
    var e = t.split("?");
    return 1 === e.length ? e[1] = (new Date).getTime() : e[1] += "&" + (new Date).getTime(), e.join("?")
};