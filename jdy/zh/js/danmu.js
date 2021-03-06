!
function(a) {
    a.jQueryPlugin = function(b) {
        a.fn[b] = function(c) {
            var d = Array.prototype.slice.call(arguments, 1);
            return this.length ? this.each(function() {
                var e = a.data(this, b) || a.data(this, b, new cyntax.plugins[b](this, c)._init());
                "string" == typeof c && (c = c.replace(/^_/, ""), e[c] && e[c].apply(e, d))
            }) : void 0
        }
    }
} (jQuery);
var cyntax = {
    plugins: {}
}; !
function() {
    function a() {
        return (new Date).getTime()
    }
    var b = jQuery,
    c = "jQuery.pause",
    d = 1,
    e = b.fn.animate,
    f = {};
    b.fn.animate = function(g, h, i, j) {
        var k = b.speed(h, i, j);
        return k.complete = k.old,
        this.each(function() {
            this[c] || (this[c] = d++);
            var h = b.extend({},
            k);
            e.apply(b(this), [g, b.extend({},
            h)]),
            f[this[c]] = {
                run: !0,
                prop: g,
                opt: h,
                start: a(),
                done: 0
            }
        })
    },
    b.fn.pause = function() {
        return this.each(function() {
            this[c] || (this[c] = d++);
            var e = f[this[c]];
            e && e.run && (e.done += a() - e.start, e.done > e.opt.duration ? delete f[this[c]] : (b(this).stop().stop().stop(), b(this).stop(), b(this).stop(), b(this).stop(), b(this).stop(), b(this).stop(), b(this).stop(), b(this).stop(), b(this).stop(), b(this).stop(), b(this).stop(), b(this).stop(), b(this).stop(), b(this).stop(), b(this).stop(), e.run = !1))
        })
    },
    b.fn.resume = function() {
        return this.each(function() {
            this[c] || (this[c] = d++);
            var g = f[this[c]];
            g && !g.run && (g.opt.duration -= g.done, g.done = 0, g.run = !0, g.start = a(), e.apply(b(this), [g.prop, b.extend({},
            g.opt)]))
        })
    }
} (),
function(a) {
    cyntax.plugins.timer = function(b, c) {
        this.$this = a(b),
        this.options = a.extend({},
        this.defaults, c),
        this.timer_info = {
            id: null,
            index: null,
            state: 0
        }
    },
    cyntax.plugins.timer.prototype = {
        defaults: {
            delay: 1e3,
            repeat: !1,
            autostart: !0,
            callback: null,
            url: "",
            post: ""
        },
        _init: function() {
            return this.options.autostart && (this.timer_info.state = 1, this.timer_info.id = setTimeout(a.proxy(this._timer_fn, this), this.options.delay)),
            this
        },
        _timer_fn: function() {
            "function" == typeof this.options.callback ? a.proxy(this.options.callback, this.$this).call(this, ++this.timer_info.index) : "string" == typeof this.options.url && (ajax_options = {
                url: this.options.url,
                context: this,
                type: "string" == typeof this.options.post && "" != typeof this.options.post == "" ? "POST": "GET",
                success: function(a) {
                    this.$this.html(a)
                }
            },
            "string" == typeof this.options.post && "" != typeof this.options.post && (ajax_options.data = this.options.post), a.ajax(ajax_options)),
            this.options.repeat && 1 == this.timer_info.state && ("boolean" == typeof this.options.repeat || parseInt(this.options.repeat) > this.timer_info.index) ? this.timer_info.id = setTimeout(a.proxy(this._timer_fn, this), this.options.delay) : this.timer_id = null
        },
        start: function() {
            0 == this.timer_info.state && (this.timer_info.index = 0, this.timer_info.state = 1, this.timer_id = setTimeout(a.proxy(this._timer_fn, this), this.options.delay))
        },
        stop: function() {
            1 == this.timer_info.state && this.timer_info.id && (clearTimeout(this.timer_info.id), this.timer_id = null),
            this.timer_info.state = 0
        },
        pause: function() {
            1 == this.timer_info.state && this.timer_info.id && clearTimeout(this.timer_info.id),
            this.timer_info.state = 0
        },
        resume: function() {
            this.timer_info.state = 1,
            this.timer_id = setTimeout(a.proxy(this._timer_fn, this), this.options.delay)
        }
    },
    a.jQueryPlugin("timer")
} (jQuery),
function(a) {
    function b(b, d) {
        return this.each(function() {
            var e = a(this),
            f = a.extend({},
            c.DEFAULTS, "object" == typeof b && b),
            g = e.data("danmu"),
            h = "string" == typeof b ? b: 0 / 0;
            g || e.data("danmu", g = new c(this, f)),
            h && g[h](d)
        })
    }
    var c = function(b, c) {
        this.$element = a(b),
        this.options = c,
        this.id = a(b).attr("id"),
        a(b).data("nowTime", 0),
        a(b).data("danmuList", c.danmuList),
        a(b).data("opacity", c.opacity),
        a(b).data("paused", 1),
        a(b).data("topSpace", 0),
        a(b).data("bottomSpace", 0),
        this.$element.css({
            position: "absolute",
            left: this.options.left,
            top: this.options.top,
            width: this.options.width,
            height: this.options.height,
            "z-index": this.options.zindex,
            color: c.defaultFontColor,
            overflow: "hidden"
        });
        var d = this;
        d.height = this.$element.height(),
        d.width = this.$element.width(),
        d.speed = 1e3 / c.speed,
        this.launched = [],
        this.preTime = 0;
        var e = this.options.maxCountInScreen,
        f = this.options.maxCountPerSec,
        g = 0,
        h = 0;
        this.rowCount = parseInt(d.height / c.FontSizeBig),
        d.options.SubtitleProtection && (d.rowCount = d.rowCount - 3),
        this.rows = [],
        this.initRows = function(a) {
            for (var b = 0; b < a.rowCount; b++) a.rows[b] = 0
        },
        this.initRows(this),
        d.getRow = function(a) {
            for (var b = 0; 0 !== a.rows[b];) if (b += 1, b >= a.rowCount) {
                a.initRows(a),
                b = 0;
                break
            }
            return b
        },
        d.checkRow = function(b) {
            for (var c in b.rows) 0 !== b.rows[c] && "undefined" != typeof a("#" + b.rows[c]).position() && a("#" + b.rows[c]).position().left < b.$element.width() - a("#" + b.rows[c]).width() && (b.rows[c] = 0)
        },
        a("<div class='danmakuTimer'></div>").appendTo(this.$element),
        this.$timer = a(".danmakuTimer"),
        this.$timer.timer({
            delay: 100,
            repeat: c.sumTime,
            autostart: !1,
            callback: function(i) {
                setTimeout(function() {
                    d.options.danmuLoop && a(b).data("nowTime") >= a(b).data("sumTime") && a(b).data("nowTime", 0),
                    a(b).data("nowTime", a(b).data("nowTime") + 1),
                    d.height = a(b).height(),
                    d.width = a(b).width(),
                    Math.abs(a(b).data("nowTime") - (d.preTime + 1)) > 10 && (d.launched = []),
                    d.preTime = a(b).data("nowTime");
                    var j = d.rowCount;
                    if (d.rowCount = parseInt(d.height / c.FontSizeBig), setTimeout(d.checkRow(d), 0), d.options.SubtitleProtection && (d.rowCount = d.rowCount - 3), 0 !== j && d.rowCount !== j && d.initRows(d), h = 0, a(b).data("danmuList")[a(b).data("nowTime")] && d.launched.indexOf(a(b).data("nowTime")) < 0) {
                        for (var k = a(b).data("nowTime"), l = a(b).data("danmuList")[k], m = l.length - 1; m >= 0; m--) {
                            setTimeout(d.checkRow(d), 0);
                            var n = "<span class='danmaku' id='" + d.id + "tempDanmaku'></span>";
                            a(b).append(n);
                            var o = l[m];
                            if (a("#" + d.id + "tempDanmaku").html(o.text).css({
                                color: o.color,
                                "text-shadow": " 0px 0px 1px #000000",
                                "-moz-opacity": a(b).data("opacity"),
                                opacity: a(b).data("opacity"),
                                "white-space": "nowrap",
                                "font-weight": "bold",
                                "font-family": "SimHei",
                                "font-size": c.FontSizeBig
                            }), o.color < "#777777" && a("#" + d.id + "tempDanmaku").css({
                                "text-shadow": " 0px 0px 1px #FFFFFF"
                            }), o.hasOwnProperty("isnew") && a("#" + d.id + "tempDanmaku").css({
                                border: "2px solid " + o.color
                            }), 0 == o.size && a("#" + d.id + "tempDanmaku").css("font-size", c.fontSizeSmall), 0 == o.position) {
                                var p = d.id + "fly" + parseInt((new Date).getTime()).toString();
                                if (a("#" + d.id + "tempDanmaku").attr("id", p), e >= g && f >= h) {
                                    d.checkRow(d);
                                    var q = d.getRow(d);
                                    d.rows[q] = p,
                                    o.row = q;
                                    var r = q * c.FontSizeBig;
                                    o.width = a("#" + p).width();
                                    var s = a("#" + d.id).width();
                                    a("#" + p).css({
                                        width: a("#" + p).width(),
                                        position: "absolute",
                                        top: r,
                                        left: s
                                    });
                                    var t = (a(b).width() + 400) / d.speed;
                                    g++,
                                    h++,
                                    a("#" + p).animate({
                                        left: -(a("#" + p).width() + 400)
                                    },
                                    t,
                                    function() {
                                        a(this).remove(),
                                        g--,
                                        h--
                                    })
                                } else a("#" + p).remove()
                            } else if (1 == o.position) {
                                var u = d.id + "top" + parseInt(1e4 * Math.random()).toString();
                                a("#" + d.id + "tempDanmaku").attr("id", u),
                                a("#" + u).css({
                                    width: "100%",
                                    "text-align": "center",
                                    position: "absolute",
                                    top: a(b).data("topSpace"),
                                    left: "0"
                                }),
                                a(b).data("topSpace", a(b).data("topSpace") + c.FontSizeBig),
                                a("#" + u).fadeTo(c.topBottomDanmuTime, a(b).data("opacity"),
                                function() {
                                    a(this).remove(),
                                    a(b).data("topSpace", a(b).data("topSpace") - c.FontSizeBig)
                                })
                            } else if (2 == o.position) {
                                var v = d.id + "bottom" + parseInt(1e4 * Math.random()).toString();
                                a("#" + d.id + "tempDanmaku").attr("id", v),
                                a("#" + v).css({
                                    width: c.width,
                                    left: "0",
                                    "text-align": "center",
                                    position: "absolute",
                                    bottom: 0 + a(b).data("bottomSpace")
                                }),
                                a(b).data("bottomSpace", a(b).data("bottomSpace") + c.FontSizeBig),
                                a("#" + v).fadeTo(c.topBottomDanmuTime, a(b).data("opacity"),
                                function() {
                                    a(this).remove(),
                                    a(b).data("bottomSpace", a(b).data("bottomSpace") - c.FontSizeBig)
                                })
                            }
                            l[m] = o
                        }
                        a(b).data("danmuList")[k] = l
                    }
                    d.launched.push(a(b).data("nowTime")),
                    i == c.sumTime && c.isLoop && (d.$timer.timer("stop"), d.$timer.timer("start"))
                })
            }
        })
    };
    c.DEFAULTS = {
        left: 0,
        top: 0,
        height: 360,
        width: 640,
        zindex: 100,
        speed: 8e3,
        sumTime: 65535,
        danmuLoop: !1,
        danmuList: {},
        defaultFontColor: "#FFFFFF",
        fontSizeSmall: 16,
        FontSizeBig: 24,
        opacity: "0.9",
        topBottomDanmuTime: 6e3,
        SubtitleProtection: !1,
        positionOptimize: !1,
        maxCountInScreen: 40,
        maxCountPerSec: 10
    },
    c.prototype.danmuStart = function() {
        this.$timer.timer("start"),
        this.$element.data("paused", 0)
    },
    c.prototype.danmuStop = function() {
        this.$timer.timer("stop"),
        a("#" + this.id + " .danmaku").remove(),
        nowTime = 0,
        this.$element.data("paused", 1),
        this.$element.data("nowTime", 0)
    },
    c.prototype.danmuPause = function() {
        this.$timer.timer("pause"),
        a("#" + this.id + " .danmaku").pause(),
        this.$element.data("paused", 1)
    },
    c.prototype.danmuResume = function() {
        this.$timer.timer("resume"),
        a("#" + this.id + " .danmaku").resume(),
        this.$element.data("paused", 0)
    },
    c.prototype.danmuHideAll = function() {
        a("#" + this.id + " .danmaku").css({
            opacity: 0
        }),
        this.initRows(this)
    },
    c.prototype.setTime = function(b) {
        a("#" + this.id + " .danmaku").remove(),
        this.$element.data("nowTime", b)
    },
    c.prototype.setOpacity = function(b) {
        a("#" + this.id + " .danmaku").css("opacity", b),
        this.$element.data("opacity", b)
    },
    c.prototype.addDanmu = function(a) {
        if (a instanceof Array) for (var b in a) this.$element.data("danmuList")[a[b].time] ? this.$element.data("danmuList")[a[b].time].push(a[b]) : (this.$element.data("danmuList")[a[b].time] = [], this.$element.data("danmuList")[a[b].time].push(a[b]));
        else this.$element.data("danmuList")[a.time] ? this.$element.data("danmuList")[a.time].push(a) : (this.$element.data("danmuList")[a.time] = [], this.$element.data("danmuList")[a.time].push(a))
    },
    a.fn.danmu = b,
    a.fn.danmu.Constructor = c
} (jQuery);