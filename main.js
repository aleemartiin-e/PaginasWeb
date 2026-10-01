/* =============================================================
   Adria Maya — main.js
   IIFE clásico (sin módulos). Un único bucle rAF.
   ============================================================= */
(function () {
  "use strict";

  var B = window.__BRAND__ || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var pad = function (n) { return String(Math.max(0, Math.round(n))).padStart(4, "0"); };
  var TAU = Math.PI * 2;

  function safe(fn, name) {
    try { return fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  /* ---------- Un solo bucle de animación ---------- */
  var Ticker = {
    fns: [],
    running: false,
    add: function (fn) { this.fns.push(fn); this.wake(); },
    // El bucle se duerme cuando ningún módulo tiene trabajo y se despierta con eventos
    wake: function () {
      if (this.running) return;
      this.running = true;
      var self = this;
      function loop(t) {
        var busy = false;
        for (var i = 0; i < self.fns.length; i++) {
          try { if (self.fns[i](t)) busy = true; } catch (e) { console.warn("[tick]", e); self.fns.splice(i, 1); i--; }
        }
        if (busy) requestAnimationFrame(loop); else self.running = false;
      }
      requestAnimationFrame(loop);
    }
  };
  ["pointermove", "pointerdown", "scroll", "resize"].forEach(function (ev) {
    window.addEventListener(ev, function () { Ticker.wake(); }, { passive: true });
  });
  document.addEventListener("visibilitychange", function () { if (!document.hidden) Ticker.wake(); });

  var App = { field: null, pen: null, introStarted: false };
  window.__AM = App;

  function onVisible(el, cb, margin) {
    if (!("IntersectionObserver" in window)) { cb(true); return; }
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { cb(e.isIntersecting); });
      Ticker.wake();
    }, { threshold: 0, rootMargin: margin || "0px" }).observe(el);
  }

  /* =============================================================
     Splash
     ============================================================= */
  function initSplash() {
    var el = $("[data-splash]");
    if (!el) { startIntro(); return; }
    var cnt = $("[data-splash-count]", el);
    var shown = 0, target = 30, done = false, t0 = performance.now();

    function finish() {
      if (done) return;
      done = true;
      if (cnt) cnt.textContent = "100";
      var wait = Math.max(120, 900 - (performance.now() - t0));
      setTimeout(function () {
        el.classList.add("is-out");
        document.documentElement.classList.add("is-loaded");
        setTimeout(startIntro, 380);
        setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 1600);
      }, wait);
    }
    var last = performance.now();
    function step(nowMs) {
      if (done) return;
      var dt = Math.min(0.1, ((nowMs || performance.now()) - last) / 1000); last = nowMs || performance.now();
      shown += (target - shown) * (1 - Math.exp(-dt * 6));
      if (cnt) cnt.textContent = String(Math.round(shown)).padStart(3, "0");
      if (target >= 100 && shown > 99.4) { finish(); return; }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { target = Math.max(target, 75); });
    function go() { target = 100; }
    if (document.readyState === "complete") go(); else window.addEventListener("load", go, { once: true });
    setTimeout(go, 2600);
    setTimeout(finish, 4000);
  }

  function startIntro() {
    if (App.introStarted) return;
    App.introStarted = true;
    if (App.field) App.field.startIntro();
  }

  /* =============================================================
     Nav
     ============================================================= */
  function initNav() {
    var nav = $("[data-nav]");
    if (!nav) return;
    var lastY = window.scrollY;
    function update() {
      var y = window.scrollY;
      nav.classList.toggle("is-scrolled", y > 30);
      var goingDown = y > lastY + 4, goingUp = y < lastY - 4;
      if (goingDown && y > window.innerHeight * 0.9) nav.classList.add("is-hidden");
      else if (goingUp || y < 80) nav.classList.remove("is-hidden");
      lastY = y;
    }
    window.addEventListener("scroll", update, { passive: true });
    nav.addEventListener("focusin", function () { nav.classList.remove("is-hidden"); });
    update();
  }

  /* =============================================================
     Cursor (aguja + coordenadas). Solo puntero fino.
     ============================================================= */
  function initCursor() {
    if (!fine) return;
    var root = $("[data-cursor-root]");
    if (!root) return;
    document.documentElement.classList.add("has-fine");
    var dot = $(".cursor-dot", root), ring = $(".cursor-ring", root), label = $("[data-cursor-label]", root);
    var x = 0, y = 0, rx = 0, ry = 0, first = false, hoverLabel = null, lastTxt = "";

    window.addEventListener("pointermove", function (e) {
      if (e.pointerType && e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY;
      if (!first) {
        first = true; rx = x; ry = y;
        root.classList.add("is-ready");
        document.documentElement.classList.add("has-cursor");
      }
    }, { passive: true });

    document.addEventListener("mouseover", function (e) {
      var t = e.target && e.target.closest ? e.target.closest("[data-cursor], a, button") : null;
      root.classList.toggle("is-hover", !!t);
      hoverLabel = t ? (t.getAttribute("data-cursor") || null) : null;
    });
    document.addEventListener("mouseout", function (e) {
      if (!e.relatedTarget) root.classList.remove("is-ready");
    });
    document.addEventListener("mouseover", function () { if (first) root.classList.add("is-ready"); });

    Ticker.add(function () {
      if (!first) return false;
      rx += (x - rx) * 0.2; ry += (y - ry) * 0.2;
      dot.style.transform = "translate3d(" + x + "px," + y + "px,0)";
      ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
      label.style.transform = "translate3d(" + (x + 22) + "px," + (y + 18) + "px,0)";
      var txt = hoverLabel ? "[ " + hoverLabel + " ]" : "[ " + pad(x) + " , " + pad(y) + " ]";
      if (txt !== lastTxt) { label.textContent = txt; lastTxt = txt; }
      return Math.abs(x - rx) + Math.abs(y - ry) > 0.3;
    });
  }

  /* =============================================================
     Hero — campo de semitono reactivo + título hecho de puntos
     ============================================================= */
  function initField() {
    var hero = $("[data-hero]"), canvas = $("[data-field]");
    if (!hero || !canvas) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    var title = $("[data-hero-title]"), coords = $("[data-coords]"), hint = $("[data-hint]");
    if (!fine && hint) hint.textContent = "Toca para soltar tinta";

    var S = {
      w: 0, h: 0, dpr: 1, sp: 15, n: 0, px: null, py: null,
      mx: -9999, my: -9999, tx: -9999, ty: -9999,
      rip: [], stain: [],
      L: null, Lo: null, Ld: null, ls: 7,
      visible: true, introAt: null, floor: 0,
      penX: -9999, penY: -9999, lw: 0, lh: 0
    };
    var t0 = performance.now();
    var now = function () { return (performance.now() - t0) / 1000; };

    function layout() {
      var r = hero.getBoundingClientRect();
      S.w = r.width; S.h = r.height;
      S.lw = S.w; S.lh = S.h;
      S.dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(S.w * S.dpr);
      canvas.height = Math.round(S.h * S.dpr);
      S.sp = S.w < 720 ? 13 : 15;
      var cols = Math.ceil(S.w / S.sp) + 1, rows = Math.ceil(S.h / S.sp) + 1;
      S.n = cols * rows;
      S.px = new Float32Array(S.n); S.py = new Float32Array(S.n);
      var ox = (S.w - (cols - 1) * S.sp) / 2, oy = (S.h - (rows - 1) * S.sp) / 2, k = 0;
      for (var j = 0; j < rows; j++) for (var i = 0; i < cols; i++, k++) { S.px[k] = ox + i * S.sp; S.py[k] = oy + j * S.sp; }
      buildLetters(r);
    }

    function buildLetters(hr) {
      S.L = null;
      if (!title) return;
      var tr = title.getBoundingClientRect();
      S.floor = (tr.top - hr.top) + tr.height * 0.3;
      var off = document.createElement("canvas");
      off.width = Math.ceil(S.w); off.height = Math.ceil(S.h);
      var o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return;
      o.fillStyle = "#fff";
      $$(".t-line", title).forEach(function (span) {
        var cs = getComputedStyle(span);
        o.font = cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily;
        o.textBaseline = "alphabetic";
        var rr = span.getClientRects()[0];
        if (!rr) return;
        var m = o.measureText(span.textContent);
        var asc = (m.fontBoundingBoxAscent != null) ? m.fontBoundingBoxAscent : parseFloat(cs.fontSize) * 0.86;
        o.fillText(span.textContent.toUpperCase(), rr.left - hr.left, rr.top - hr.top + asc);
      });
      var data;
      try { data = o.getImageData(0, 0, off.width, off.height).data; } catch (e) { return; }
      var ls = S.w < 720 ? 5.5 : 7;
      var pts = [];
      var x0 = Math.max(0, tr.left - hr.left - 8), x1 = Math.min(S.w - 1, tr.right - hr.left + 8);
      var y0 = Math.max(0, tr.top - hr.top - 8), y1 = Math.min(S.h - 1, tr.bottom - hr.top + 8);
      var row = 0;
      for (var y = y0; y < y1; y += ls * 0.866, row++) {
        var shift = (row % 2) * ls / 2;
        for (var x = x0 + shift; x < x1; x += ls) {
          var a = data[((Math.round(y) * off.width) + Math.round(x)) * 4 + 3];
          if (a > 140) pts.push(x, y);
        }
      }
      var n = pts.length / 2;
      S.L = new Float32Array(pts);
      S.Lo = new Float32Array(n * 2);
      S.Ld = new Float32Array(n);
      for (var i = 0; i < n; i++) {
        var ang = Math.random() * TAU, d = 80 + Math.random() * 260;
        S.Lo[2 * i] = Math.cos(ang) * d;
        S.Lo[2 * i + 1] = Math.sin(ang) * d - 60;
        S.Ld[i] = (S.L[2 * i] / S.w) * 0.55 + Math.random() * 0.25;
      }
      S.ls = ls;
      document.documentElement.classList.add("has-field");
    }

    function splash(x, y, s) {
      s = s || 1;
      var t = now();
      S.rip.push({ x: x, y: y, t: t, s: s, speed: 470, life: 1.7, wd: 34, r: 0, a: 0 });
      S.rip.push({ x: x, y: y, t: t + 0.14, s: s * 0.55, speed: 300, life: 1.4, wd: 22, r: 0, a: 0 });
      S.stain.push({ x: x, y: y, t: t, s: s, R0: 46 + 38 * s, life: 5.5, k: 0, a: 0, lim: 0 });
      if (S.rip.length > 10) S.rip.splice(0, S.rip.length - 10);
      if (S.stain.length > 7) S.stain.shift();
    }

    var COL = ["rgba(236,232,225,0.12)", "rgba(236,232,225,0.3)", "rgba(236,232,225,0.78)", "rgba(104,116,255,0.55)", "rgba(104,116,255,0.98)"];

    function frame() {
      if (!S.visible || !S.px || document.hidden) return false;
      var t = now();
      if (S.tx < -9000) { S.mx = -9999; S.my = -9999; }
      else { S.mx += (S.tx - S.mx) * 0.16; S.my += (S.ty - S.my) * 0.16; }

      // efectos vivos
      var rips = [], sts = [];
      S.rip = S.rip.filter(function (R) { var age = t - R.t; if (age > R.life) return false; if (age >= 0) { R.r = age * R.speed; R.a = R.s * Math.pow(1 - age / R.life, 1.5); rips.push(R); } return true; });
      S.stain = S.stain.filter(function (Q) {
        var age = t - Q.t; if (age > Q.life) return false;
        var rr = Q.R0 * (0.35 + 0.65 * (1 - Math.exp(-age * 3.5)));
        var fade = age < 0.15 ? age / 0.15 : Math.pow(1 - (age - 0.15) / (Q.life - 0.15), 1.4);
        Q.k = 1 / (2 * rr * rr); Q.lim = 9 * rr * rr; Q.a = Q.s * fade; sts.push(Q); return true;
      });
      var nr = rips.length, ns = sts.length;

      ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);
      ctx.clearRect(0, 0, S.w, S.h);

      var half = S.sp * 0.5, mx = S.mx, my = S.my, ppx = S.penX, ppy = S.penY;
      var tn = reduced ? t * 0.25 : t;
      var P = [new Path2D(), new Path2D(), new Path2D(), new Path2D(), new Path2D()];
      var i, k, x, y, dx, dy, v, rp, ink, pen, r, b, d, q, d2, R, Q;

      for (k = 0; k < S.n; k++) {
        x = S.px[k]; y = S.py[k];
        v = 0.15 + 0.09 * Math.sin(x * 0.0105 + tn * 0.55) * Math.cos(y * 0.0125 - tn * 0.42) + 0.06 * Math.sin((x + y) * 0.0055 + tn * 0.3);
        dx = x - mx; dy = y - my;
        v += 0.55 * Math.exp(-(dx * dx + dy * dy) * 0.00004);
        dx = x - ppx; dy = y - ppy;
        pen = Math.exp(-(dx * dx + dy * dy) * 0.00011);
        v += pen * 0.32;
        rp = 0; ink = 0;
        for (i = 0; i < nr; i++) { R = rips[i]; dx = x - R.x; dy = y - R.y; d = Math.sqrt(dx * dx + dy * dy); q = (d - R.r) / R.wd; if (q > -3 && q < 3) rp += Math.exp(-q * q) * R.a; }
        for (i = 0; i < ns; i++) { Q = sts[i]; dx = x - Q.x; dy = y - Q.y; d2 = dx * dx + dy * dy; if (d2 < Q.lim) ink += Math.exp(-d2 * Q.k) * Q.a; }
        v += rp * 0.75 + ink * 0.55;
        r = half * Math.min(0.92, v);
        if (r < 0.45) continue;
        if (ink > 0.22) b = 4; else if (ink > 0.07 || pen > 0.55) b = 3; else if (v > 0.62 || rp > 0.3) b = 2; else if (v > 0.3) b = 1; else b = 0;
        P[b].moveTo(x + r, y); P[b].arc(x, y, r, 0, TAU);
      }
      for (b = 0; b < 5; b++) { ctx.fillStyle = COL[b]; ctx.fill(P[b]); }

      // Título de puntos
      if (S.L && S.introAt !== null) {
        var L = S.L, n = L.length / 2, Lo = S.Lo, Ld = S.Ld;
        var ip = reduced ? 1 : clamp((t - S.introAt) / 1.9, 0, 1);
        var PL = new Path2D(), PB = new Path2D();
        var lr = S.ls * 0.46;
        for (k = 0; k < n; k++) {
          x = L[2 * k]; y = L[2 * k + 1];
          if (ip < 1) {
            var loc = clamp(ip * 1.8 - Ld[k], 0, 1);
            if (loc <= 0) continue;
            var e = 1 - Math.pow(1 - loc, 3);
            x += Lo[2 * k] * (1 - e); y += Lo[2 * k + 1] * (1 - e);
          }
          dx = x - mx; dy = y - my; d2 = dx * dx + dy * dy;
          var f = Math.exp(-d2 * 0.00007);
          if (f > 0.01) { d = Math.sqrt(d2) + 0.001; x += dx / d * f * 22; y += dy / d * f * 22; }
          rp = 0; ink = 0;
          for (i = 0; i < nr; i++) { R = rips[i]; dx = x - R.x; dy = y - R.y; d = Math.sqrt(dx * dx + dy * dy); q = (d - R.r) / R.wd; if (q > -3 && q < 3) rp += Math.exp(-q * q) * R.a; }
          for (i = 0; i < ns; i++) { Q = sts[i]; dx = x - Q.x; dy = y - Q.y; d2 = dx * dx + dy * dy; if (d2 < Q.lim) ink += Math.exp(-d2 * Q.k) * Q.a; }
          var nz = 0.8 + 0.2 * Math.sin(x * 0.045 + tn * 1.2) * Math.cos(y * 0.04 - tn * 0.8);
          r = clamp(lr * (nz - f * 0.5 + rp * 0.45), 0, S.ls * 0.6);
          if (r < 0.4) continue;
          var p = ink > 0.12 ? PB : PL;
          p.moveTo(x + r, y); p.arc(x, y, r, 0, TAU);
        }
        ctx.fillStyle = "rgba(236,232,225,0.94)"; ctx.fill(PL);
        ctx.fillStyle = "rgba(104,116,255,1)"; ctx.fill(PB);
      }
      return true;
    }

    // Eventos
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      S.tx = e.clientX - r.left; S.ty = e.clientY - r.top;
      if (S.mx < -9000) { S.mx = S.tx; S.my = S.ty; }
      if (coords) coords.textContent = "[ " + pad(S.tx) + " , " + pad(S.ty) + " ]";
    }, { passive: true });
    hero.addEventListener("pointerleave", function () { S.tx = -9999; S.ty = -9999; });
    hero.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a, button")) return;
      var r = hero.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      splash(x, y, 1);
      if (App.pen) App.pen.release();
    });

    onVisible(hero, function (v) { S.visible = v; });

    var rt = null;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        var r = hero.getBoundingClientRect();
        if (Math.abs(r.width - S.lw) > 2 || Math.abs(r.height - S.lh) > 80) layout();
      }, 160);
    });

    layout();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { layout(); });
    Ticker.add(frame);

    App.field = {
      splash: splash,
      startIntro: function () { if (S.introAt === null) S.introAt = now(); },
      setPen: function (x, y) { S.penX = x; S.penY = y; },
      mouse: function () { return S.tx > -9000 ? { x: S.tx, y: S.ty } : null; },
      floor: function () { return S.floor; }
    };
    // Red de seguridad: el título aparece aunque el splash no avise
    setTimeout(function () { App.field.startIntro(); }, 4600);
    if (App.introStarted) App.field.startIntro();
  }

  /* =============================================================
     Hero — máquina de tatuar (pen) en 3D con gotas de tinta
     ============================================================= */
  function loadThree(cb) {
    if (window.THREE) { cb(); return; }
    var s = document.createElement("script");
    s.src = "lib/three.min.js?v=20261002";
    s.async = true;
    s.onload = cb;
    s.onerror = function () { console.warn("[three] no se pudo cargar"); };
    document.head.appendChild(s);
  }

  function studio(T) {
    var s = new T.Scene();
    s.add(new T.Mesh(new T.BoxGeometry(30, 30, 30), new T.MeshBasicMaterial({ color: 0x060609, side: T.BackSide })));
    function panel(w, h, hex, k, p) {
      var m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: new T.Color(hex).multiplyScalar(k), side: T.DoubleSide }));
      m.position.set(p[0], p[1], p[2]); m.lookAt(0, 0, 0); s.add(m);
    }
    panel(14, 4, 0xffffff, 3.0, [0, 12, 4]);     // softbox cenital
    panel(3, 16, 0xffffff, 2.2, [-12, 0, 5]);    // tira izquierda
    panel(3, 14, 0x5866ff, 4.6, [12, 2, -1]);    // tira azul
    panel(10, 2.5, 0xff2b2b, 2.4, [4, -12, 3]);  // rebote rojo
    panel(6, 6, 0xffffff, 0.8, [0, 0, 13]);      // relleno frontal
    panel(2, 10, 0xffffff, 1.6, [7, 4, 10]);     // kicker
    return s;
  }

  function buildPen(T) {
    var g = new T.Group();
    var M = {
      body: new T.MeshStandardMaterial({ color: 0x24252c, metalness: 1, roughness: 0.27 }),
      grip: new T.MeshStandardMaterial({ color: 0x0e0e11, metalness: 0.45, roughness: 0.42 }),
      silver: new T.MeshStandardMaterial({ color: 0xd6d9e0, metalness: 1, roughness: 0.14 }),
      chrome: new T.MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 0.06 }),
      glass: new T.MeshPhysicalMaterial({ color: 0xdfe6ff, metalness: 0, roughness: 0.04, transparent: true, opacity: 0.3, clearcoat: 1, clearcoatRoughness: 0.02, depthWrite: false, side: T.DoubleSide }),
      ink: new T.MeshPhysicalMaterial({ color: 0x05060d, metalness: 0.05, roughness: 0.05, clearcoat: 1, clearcoatRoughness: 0.03 }),
      cable: new T.MeshStandardMaterial({ color: 0x0c0c0e, metalness: 0.25, roughness: 0.34 }),
      led: new T.MeshBasicMaterial({ color: 0x7b86ff, toneMapped: false })
    };
    var V = function (x, y) { return new T.Vector2(x, y); };
    function lathe(pts, mat, seg) {
      var m = new T.Mesh(new T.LatheGeometry(pts, seg || 72), mat);
      g.add(m); return m;
    }
    // Aguja (vibra)
    var needle = new T.Group(); g.add(needle);
    needle.add(new T.Mesh(new T.LatheGeometry([V(0, 0), V(0.004, 0.016), V(0.011, 0.07), V(0.011, 0.95), V(0, 0.95)], 20), M.chrome));
    // Cartucho transparente + tinta dentro
    var glass = lathe([V(0.032, 0.2), V(0.056, 0.25), V(0.11, 0.4), V(0.16, 0.58), V(0.186, 0.72), V(0.186, 1.36), V(0.212, 1.4), V(0.212, 1.52), V(0.17, 1.54)], M.glass);
    glass.renderOrder = 2;
    lathe([V(0, 0.24), V(0.04, 0.26), V(0.08, 0.36), V(0.122, 0.5), V(0.152, 0.64), V(0.152, 0.7), V(0, 0.72)], M.ink, 48);
    // Grip moleteado
    var gp = [V(0.17, 1.5), V(0.27, 1.52), V(0.31, 1.56)];
    var y0 = 1.58, y1 = 2.72, N = 28;
    for (var i = 0; i <= N; i++) {
      var yy = y0 + (y1 - y0) * i / N;
      var base = 0.315 + 0.06 * Math.pow(i / N, 1.4);
      gp.push(V(base - (i % 2 ? 0.017 : 0), yy));
    }
    gp.push(V(0.395, 2.76));
    lathe(gp, M.grip);
    // Collar plateado
    lathe([V(0.392, 2.75), V(0.418, 2.77), V(0.418, 2.9), V(0.4, 2.92)], M.silver);
    // Cuerpo
    lathe([V(0.4, 2.92), V(0.44, 2.95), V(0.452, 3.0), V(0.452, 3.3), V(0.432, 3.32), V(0.432, 3.4), V(0.452, 3.42), V(0.452, 4.4), V(0.436, 4.48), V(0.39, 4.58), V(0.3, 4.66), V(0.16, 4.71), V(0, 4.72)], M.body);
    // Anillo LED en la ranura
    var led = new T.Mesh(new T.TorusGeometry(0.437, 0.017, 12, 96), M.led);
    led.rotation.x = Math.PI / 2; led.position.y = 3.36; g.add(led);
    var ring2 = new T.Mesh(new T.TorusGeometry(0.453, 0.008, 8, 96), M.silver);
    ring2.rotation.x = Math.PI / 2; ring2.position.y = 4.34; g.add(ring2);
    // Conector + cable
    lathe([V(0.1, 4.68), V(0.1, 4.95), V(0.08, 4.98), V(0, 4.99)], M.silver, 32);
    var curve = new T.CatmullRomCurve3([
      new T.Vector3(0, 4.95, 0), new T.Vector3(0, 5.6, 0), new T.Vector3(0.2, 6.8, -0.25),
      new T.Vector3(0.9, 8.2, -1.0), new T.Vector3(2.2, 9.8, -2.2), new T.Vector3(4, 11.6, -3.4)
    ]);
    g.add(new T.Mesh(new T.TubeGeometry(curve, 120, 0.07, 16, false), M.cable));
    return { group: g, needle: needle, led: led, M: M };
  }

  function teardrop(T) {
    var geo = new T.SphereGeometry(1, 40, 28);
    var p = geo.attributes.position;
    for (var i = 0; i < p.count; i++) {
      var x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      if (y > 0) {
        var k = Math.pow(y, 1.6);
        x *= (1 - 0.9 * k); z *= (1 - 0.9 * k); y *= 1 + 0.95 * k;
      }
      p.setXYZ(i, x, y, z);
    }
    geo.computeVertexNormals();
    return geo;
  }

  function initPen() {
    var T = window.THREE, hero = $("[data-hero]"), canvas = $("[data-pen]");
    if (!T || !hero || !canvas) return;
    var renderer;
    try {
      renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch (e) { console.warn("[pen] WebGL no disponible"); return; }

    var small = function () { return hero.clientWidth < 720; };
    renderer.outputColorSpace = T.SRGBColorSpace;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setClearColor(0x000000, 0);

    var scene = new T.Scene();
    var cam = new T.PerspectiveCamera(28, 1, 0.1, 100);
    cam.position.set(0, 0, 16);

    var pm = new T.PMREMGenerator(renderer);
    scene.environment = pm.fromScene(studio(T), 0.03).texture;
    pm.dispose();

    var key = new T.DirectionalLight(0xffffff, 1.2); key.position.set(-3, 5, 8); scene.add(key);
    var rimB = new T.DirectionalLight(0x5c6cff, 2.6); rimB.position.set(6, 2, -6); scene.add(rimB);
    var rimR = new T.DirectionalLight(0xff3030, 1.3); rimR.position.set(-6, -3, -4); scene.add(rimR);
    scene.add(new T.AmbientLight(0xffffff, 0.12));

    var pen = buildPen(T);
    scene.add(pen.group);

    var dropMat = new T.MeshPhysicalMaterial({ color: 0x070814, metalness: 0.1, roughness: 0.03, clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 1.5 });
    var dropGeo = teardrop(T);
    var bitGeo = new T.SphereGeometry(1, 16, 12);
    var drops = [], bits = [];
    for (var i = 0; i < 3; i++) {
      var dm = new T.Mesh(dropGeo, dropMat); dm.visible = false; scene.add(dm);
      drops.push({ m: dm, state: "idle", t: 0, end: 0, vx: 0, vy: 0, s: 0 });
    }
    for (i = 0; i < 18; i++) {
      var bm = new T.Mesh(bitGeo, dropMat); bm.visible = false; scene.add(bm);
      bits.push({ m: bm, alive: false, vx: 0, vy: 0, vz: 0, t: 0, life: 0, s: 0 });
    }

    var W = 1, H = 1, visH = 1, visW = 1;
    function size() {
      W = hero.clientWidth; H = hero.clientHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small() ? 1.5 : 2));
      renderer.setSize(W, H, false);
      cam.aspect = W / H; cam.updateProjectionMatrix();
      visH = 2 * Math.tan(T.MathUtils.degToRad(cam.fov / 2)) * cam.position.z;
      visW = visH * cam.aspect;
      pen.group.scale.setScalar(small() ? 0.55 : (W < 1100 ? 0.8 : 0.9));
    }
    size();
    var rt = null;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(size, 160); });

    var tmp = new T.Vector3(), tipW = new T.Vector3();
    function toWorld(sx, sy, out) {
      return out.set((sx / W * 2 - 1) * visW / 2, -(sy / H * 2 - 1) * visH / 2, 0);
    }
    function toScreen(v) {
      tmp.copy(v).project(cam);
      return { x: (tmp.x + 1) / 2 * W, y: (1 - tmp.y) / 2 * H };
    }

    var visible = true;
    onVisible(hero, function (v) { visible = v; });

    var S = { tx: W * 0.7, ty: H * 0.46, x: W * 0.7, y: H * 0.46, vx: 0, scrollP: 0, next: 1.4, last: 0 };
    var t0 = performance.now();

    function target(t) {
      var x, y, m = App.field && App.field.mouse();
      if (small()) {
        x = W * (0.7 + 0.1 * Math.sin(t * 0.33));
        y = H * 0.62;
      } else {
        x = m ? clamp(W * 0.46 + (m.x / W) * W * 0.46, W * 0.46, W * 0.9) : W * (0.7 + 0.07 * Math.sin(t * 0.4));
        y = H * 0.5 + (m ? (m.y / H - 0.5) * H * 0.06 : Math.sin(t * 0.6) * H * 0.01);
      }
      y -= S.scrollP * H * 0.6;
      return { x: x, y: y };
    }

    function startDrop(fast) {
      for (var i = 0; i < drops.length; i++) {
        var d = drops[i];
        if (d.state === "idle") {
          d.state = "form"; d.t = 0; d.end = fast ? 0.22 : 1.1 + Math.random() * 0.6; d.s = 0;
          d.m.visible = true; return d;
        }
      }
      return null;
    }

    function burst(pos, sx, sy) {
      if (App.field) App.field.splash(sx, sy, 0.95);
      var count = 7;
      for (var i = 0, c = 0; i < bits.length && c < count; i++) {
        var b = bits[i];
        if (b.alive) continue;
        c++;
        var a = Math.random() * Math.PI;
        b.alive = true; b.t = 0; b.life = 0.45 + Math.random() * 0.3;
        b.vx = Math.cos(a) * (1.2 + Math.random() * 2.2);
        b.vy = 2 + Math.random() * 3;
        b.vz = (Math.random() - 0.5) * 2;
        b.s = 0.022 + Math.random() * 0.03;
        b.m.position.copy(pos);
        b.m.visible = true;
      }
    }

    var last = performance.now();
    function frame(nowMs) {
      if (!visible || document.hidden) { last = nowMs; return false; }
      var dt = Math.min(0.05, (nowMs - last) / 1000); last = nowMs;
      var t = (nowMs - t0) / 1000;

      var hr = hero.getBoundingClientRect();
      S.scrollP = clamp(-hr.top / Math.max(1, hr.height), 0, 1);

      var tg = target(t);
      var px = S.x;
      S.x += (tg.x - S.x) * 0.06; S.y += (tg.y - S.y) * 0.06;
      S.vx = (S.x - px) / Math.max(dt, 0.001);

      // Pose: el pivote es la punta de la aguja
      toWorld(S.x, S.y, tipW);
      var jitter = reduced ? 0 : 0.004;
      pen.group.position.set(tipW.x + (Math.random() - 0.5) * jitter, tipW.y + (Math.random() - 0.5) * jitter, 0);
      var lean = -0.42 + clamp(-S.vx * 0.0006, -0.22, 0.22) + Math.sin(t * 0.7) * 0.03 - S.scrollP * 0.6;
      pen.group.rotation.set(-0.16 + Math.sin(t * 0.5) * 0.06, Math.sin(t * 0.27) * 0.35 + S.scrollP * 1.2, lean);
      pen.needle.position.y = reduced ? 0 : (Math.sin(t * 92) * 0.5 + 0.5) * 0.045;
      var pulse = 0.65 + 0.35 * Math.sin(t * 3.1);
      pen.led.material.color.setRGB(0.48 * pulse + 0.1, 0.52 * pulse + 0.1, 1.0);

      pen.group.updateMatrixWorld();
      pen.needle.getWorldPosition(tmp);
      var tip = tmp.clone();
      var tipS = toScreen(tip);
      if (App.field) App.field.setPen(tipS.x, tipS.y + 6);

      var floorY = (App.field && App.field.floor()) || H * 0.78;
      var canDrop = tipS.y < floorY - 40 && S.scrollP < 0.5;

      // Ritmo automático
      if (!reduced && canDrop && t > S.next) {
        var forming = drops.some(function (d) { return d.state === "form"; });
        if (!forming) startDrop(false);
        S.next = t + 1.6 + Math.random() * 1.4;
      }

      var dropScale = small() ? 0.1 : 0.135;
      drops.forEach(function (d) {
        if (d.state === "idle") return;
        d.t += dt;
        if (d.state === "form") {
          var g = clamp(d.t / Math.max(d.end, 0.01), 0, 1);
          var e = 1 - Math.pow(1 - g, 2.4);
          d.s = dropScale * (0.15 + 0.85 * e) * (small() ? 1 : pen.group.scale.x);
          var wob = 1 + 0.05 * Math.sin(d.t * 15);
          var sy = 1.05 + 0.25 * g;
          d.m.scale.set(d.s * wob, d.s * sy, d.s * wob);
          d.m.position.set(tip.x, tip.y - 1.95 * d.s * sy + 0.01, tip.z);
          if (d.t >= d.end) {
            if (!canDrop) { d.state = "idle"; d.m.visible = false; return; }
            d.state = "fall"; d.vx = clamp(S.vx / W * visW * 0.25, -2, 2); d.vy = -0.5;
          }
        } else if (d.state === "fall") {
          d.vy -= 21 * dt;
          d.m.position.x += d.vx * dt;
          d.m.position.y += d.vy * dt;
          var st = 1 + Math.min(0.9, -d.vy * 0.05), sx = 1 / Math.sqrt(st);
          d.m.scale.set(d.s * sx, d.s * st, d.s * sx);
          var sc = toScreen(d.m.position);
          if (sc.y >= floorY || sc.y > H + 40) {
            d.state = "splat"; d.t = 0;
            burst(d.m.position, sc.x, sc.y);
          }
        } else if (d.state === "splat") {
          var q = clamp(d.t / 0.12, 0, 1);
          d.m.scale.set(d.s * (1 + q * 1.2), d.s * (1 - q * 0.85), d.s * (1 + q * 1.2));
          if (q >= 1) { d.state = "idle"; d.m.visible = false; }
        }
      });

      bits.forEach(function (b) {
        if (!b.alive) return;
        b.t += dt;
        b.vy -= 20 * dt;
        b.m.position.x += b.vx * dt; b.m.position.y += b.vy * dt; b.m.position.z += b.vz * dt;
        var k = 1 - b.t / b.life;
        if (k <= 0) { b.alive = false; b.m.visible = false; return; }
        b.m.scale.setScalar(b.s * k);
      });

      renderer.render(scene, cam);
      return true;
    }

    Ticker.add(frame);
    canvas.classList.add("is-live");

    App.pen = {
      release: function () {
        var f = null;
        drops.forEach(function (d) { if (d.state === "form") f = d; });
        if (f) f.end = Math.min(f.end, f.t);
        else startDrop(true);
        S.next = (performance.now() - t0) / 1000 + 1.8;
      }
    };
  }

  /* =============================================================
     01 — Esfera de semitono (tú pones la luz)
     ============================================================= */
  function initSphere() {
    var cv = $("[data-sphere]");
    if (!cv) return;
    var ctx = cv.getContext("2d");
    if (!ctx) return;
    var hint = $("[data-sphere-hint]");
    if (!fine && hint) hint.textContent = "[ toca y arrastra: tú pones la luz ]";
    var S = { w: 0, h: 0, dpr: 1, vis: false, lx: -0.5, ly: -0.6, tlx: -0.5, tly: -0.6, user: 0 };

    function size() {
      var r = cv.getBoundingClientRect();
      S.w = r.width; S.h = r.height;
      S.dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(S.w * S.dpr); cv.height = Math.round(S.h * S.dpr);
    }
    function geo() {
      var R = Math.min(S.w, S.h) * 0.32;
      return { R: R, cx: S.w / 2, cy: S.h * 0.45 };
    }
    function point(e) {
      var r = cv.getBoundingClientRect(), G = geo();
      S.tlx = clamp((e.clientX - r.left - G.cx) / G.R, -1.8, 1.8);
      S.tly = clamp((e.clientY - r.top - G.cy) / G.R, -1.8, 1.8);
      S.user = performance.now();
    }
    cv.addEventListener("pointermove", function (e) { if (e.pointerType === "mouse" || e.buttons) point(e); });
    cv.addEventListener("pointerdown", point);

    function draw(nowMs) {
      if (!S.vis || !S.w) return false;
      if (nowMs - S.user > 2600) {
        var a = nowMs * 0.00055;
        S.tlx = Math.cos(a) * 0.9; S.tly = Math.sin(a * 1.3) * 0.55 - 0.3;
      }
      S.lx += (S.tlx - S.lx) * 0.08; S.ly += (S.tly - S.ly) * 0.08;
      var lz = 0.8, ln = Math.sqrt(S.lx * S.lx + S.ly * S.ly + lz * lz);
      var Lx = S.lx / ln, Ly = S.ly / ln, Lz = lz / ln;
      var G = geo(), R = G.R, cx = G.cx, cy = G.cy;
      var sp = S.w < 420 ? 8 : 10;
      ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);
      ctx.clearRect(0, 0, S.w, S.h);
      var pB = new Path2D(), pU = new Path2D(), pD = new Path2D();
      var shx = cx - Lx * R * 0.9, shy = cy + R * 1.12;
      for (var y = sp / 2; y < S.h; y += sp) {
        for (var x = sp / 2; x < S.w; x += sp) {
          var nx = (x - cx) / R, ny = (y - cy) / R, d2 = nx * nx + ny * ny, r;
          if (d2 < 1) {
            var nz = Math.sqrt(1 - d2);
            var sh = Math.max(0, nx * Lx + ny * Ly + nz * Lz);
            var rim = Math.pow(1 - nz, 2.2) * (1 - sh);
            if (rim > 0.3) { r = sp * 0.5 * Math.min(0.8, rim * 1.05); pU.moveTo(x + r, y); pU.arc(x, y, r, 0, TAU); continue; }
            r = sp * 0.5 * (0.06 + 0.9 * Math.pow(sh, 1.15));
            if (r > 0.35) { pB.moveTo(x + r, y); pB.arc(x, y, r, 0, TAU); }
          } else {
            var floor = y > cy + R * 0.55 ? Math.exp(-Math.pow((y - shy) / (R * 0.6), 2)) * Math.exp(-Math.pow((x - cx) / (R * 2.2), 2)) : 0;
            var ex = (x - shx) / (R * 1.05), ey = (y - shy) / (R * 0.2), e = ex * ex + ey * ey;
            var shadow = e < 1 ? (1 - e) : 0;
            r = 0.7 + floor * 2.6 * (1 - shadow);
            pD.moveTo(x + r, y); pD.arc(x, y, r, 0, TAU);
          }
        }
      }
      ctx.fillStyle = "rgba(236,232,225,0.2)"; ctx.fill(pD);
      ctx.fillStyle = "#ece8e1"; ctx.fill(pB);
      ctx.fillStyle = "#6874ff"; ctx.fill(pU);
      return true;
    }

    size();
    cv.classList.add("is-live");
    onVisible(cv, function (v) { S.vis = v; }, "100px");
    var rt = null;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(size, 160); });
    Ticker.add(draw);
  }

  /* =============================================================
     01 / CTA — sigilos que se trazan solos
     ============================================================= */
  function initSigils() {
    var svgs = $$(".sigil");
    if (!svgs.length) return;
    svgs.forEach(function (svg) {
      var box = svg.parentElement;
      if (!("IntersectionObserver" in window)) { box.classList.add("is-drawn"); return; }
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) { if (e.isIntersecting) { box.classList.add("is-drawn"); io.disconnect(); } });
      }, { threshold: 0.01, rootMargin: "0px 0px -12% 0px" });
      io.observe(svg);
    });
    setTimeout(function () {
      svgs.forEach(function (svg) {
        if (svg.getBoundingClientRect().top < window.innerHeight) svg.parentElement.classList.add("is-drawn");
      });
    }, 6000);
  }

  /* =============================================================
     02 — Trabajos: semitono que se vuelve piel bajo el cursor
     ============================================================= */
  function initWorks() {
    var hint = $("[data-works-hint]");
    if (!fine && hint) hint.textContent = "Desliza: el punto se vuelve piel.";
    $$("[data-work]").forEach(function (fig) {
      if (fig.dataset.bound) return;
      fig.dataset.bound = "1";
      var media = $(".work-media", fig), img = $("img", fig), cv = $(".work-dots", fig);
      if (!media || !img || !cv) return;
      var ctx = cv.getContext("2d");
      if (!ctx) return;
      var st = { r: 0, x: 0, y: 0, w: 0, h: 0, dpr: 1, ht: null, max: 0, built: false, shown: false };

      function objPos() {
        var p = (getComputedStyle(img).objectPosition || "50% 50%").split(" ");
        return [parseFloat(p[0]) / 100 || 0.5, parseFloat(p[1]) / 100 || 0.5];
      }
      function build() {
        var w = Math.round(media.clientWidth), h = Math.round(media.clientHeight);
        if (!w || !h || !img.naturalWidth) return;
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        cv.width = w * dpr; cv.height = h * dpr;
        var sp = w < 520 ? 5 : 6;
        var cols = Math.ceil(w / sp) + 1, rows = Math.ceil(h / (sp * 0.92)) + 1;
        var sm = document.createElement("canvas"); sm.width = cols; sm.height = rows;
        var sc = sm.getContext("2d", { willReadFrequently: true });
        var iw = img.naturalWidth, ih = img.naturalHeight, s = Math.max(w / iw, h / ih);
        var dw = iw * s, dh = ih * s, op = objPos();
        var dx = (w - dw) * op[0], dy = (h - dh) * op[1];
        sc.drawImage(img, dx / sp, dy / (sp * 0.92), dw / sp, dh / (sp * 0.92));
        var data;
        try { data = sc.getImageData(0, 0, cols, rows).data; } catch (e) { return; }
        var ht = document.createElement("canvas"); ht.width = cv.width; ht.height = cv.height;
        var hc = ht.getContext("2d");
        hc.setTransform(dpr, 0, 0, dpr, 0, 0);
        hc.fillStyle = "#e6e2da"; hc.fillRect(0, 0, w, h);
        var pb = new Path2D(), pu = new Path2D();
        for (var j = 0; j < rows; j++) {
          for (var i = 0; i < cols; i++) {
            var k = (j * cols + i) * 4;
            var R = data[k], G = data[k + 1], Bc = data[k + 2];
            var lum = (0.2126 * R + 0.7152 * G + 0.0722 * Bc) / 255;
            var dark = Math.pow(clamp((0.9 - lum) / 0.78, 0, 1), 0.95);
            var rad = sp * 0.62 * dark;
            if (rad < 0.35) continue;
            var x = i * sp + sp / 2 + (j % 2) * sp / 2, y = j * sp * 0.92 + sp / 2;
            var blueish = Bc > R + 22 && Bc > G + 10;
            var p = blueish ? pu : pb;
            p.moveTo(x + rad, y); p.arc(x, y, rad, 0, TAU);
          }
        }
        hc.fillStyle = "#111113"; hc.fill(pb);
        hc.fillStyle = "#3d49e6"; hc.fill(pu);
        st.ht = ht; st.w = w; st.h = h; st.dpr = dpr;
        st.max = Math.sqrt(w * w + h * h);
        st.built = true;
        fig.classList.add("has-dots");
        draw();
      }
      function draw() {
        if (!st.ht) return;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, cv.width, cv.height);
        ctx.drawImage(st.ht, 0, 0);
        if (st.r > 0.5) {
          var d = st.dpr, x = st.x * d, y = st.y * d, r = st.r * d;
          ctx.globalCompositeOperation = "destination-out";
          var g = ctx.createRadialGradient(x, y, r * 0.86, x, y, r);
          g.addColorStop(0, "rgba(0,0,0,1)"); g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
          if (st.r < st.max * 0.95) {
            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = "rgba(17,17,19,0.55)"; ctx.lineWidth = 1 * d;
            ctx.beginPath(); ctx.arc(x, y, r * 0.93, 0, TAU); ctx.stroke();
          }
        }
      }
      function tweenR(to, dur) {
        if (window.gsap) window.gsap.to(st, { r: to, duration: dur, ease: to > 0 ? "expo.out" : "power3.out", overwrite: true, onUpdate: draw });
        else { st.r = to; draw(); }
      }
      function ensure(cb) {
        if (st.built) { cb && cb(); return; }
        var go = function () { build(); cb && cb(); };
        if (img.complete && img.naturalWidth) go();
        else img.addEventListener("load", go, { once: true });
      }

      // Construir antes de que entre en pantalla (sin parpadeo foto→puntos)
      onVisible(fig, function (v) { if (v) { img.loading = "eager"; ensure(); } }, "700px");

      if (fine) {
        media.addEventListener("pointermove", function (e) {
          var r = media.getBoundingClientRect();
          st.x = e.clientX - r.left; st.y = e.clientY - r.top;
          if (!window.gsap || st.r < st.max) draw();
        });
        media.addEventListener("mouseover", function (e) {
          if (media.contains(e.relatedTarget)) return;
          var r = media.getBoundingClientRect();
          st.x = e.clientX - r.left; st.y = e.clientY - r.top;
          ensure(function () { tweenR(st.max, 1.3); });
        });
        media.addEventListener("mouseout", function (e) {
          if (media.contains(e.relatedTarget)) return;
          tweenR(0, 0.8);
        });
      } else {
        // Táctil: al llegar al centro de la pantalla el semitono se disuelve en la foto
        if ("IntersectionObserver" in window) {
          var io = new IntersectionObserver(function (en) {
            en.forEach(function (e) {
              if (!e.isIntersecting || st.shown) return;
              st.shown = true;
              ensure(function () {
                st.x = st.w * 0.5; st.y = st.h * 0.45;
                setTimeout(function () { tweenR(st.max, 2.2); }, 450);
              });
              io.disconnect();
            });
          }, { threshold: 0.01, rootMargin: "-30% 0px -30% 0px" });
          io.observe(media);
        }
      }

      var rt = null;
      window.addEventListener("resize", function () {
        clearTimeout(rt);
        rt = setTimeout(function () {
          if (!st.built) return;
          var keep = st.r >= st.max * 0.95;
          st.built = false; build();
          if (keep) { st.r = st.max; draw(); }
        }, 200);
      });
    });
  }

  /* =============================================================
     Reveals (umbral bajo + red de seguridad a los 6 s)
     ============================================================= */
  function initReveals() {
    var els = $$("[data-reveal]");
    if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("is-revealed"); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-revealed"); io.unobserve(e.target); }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el, i) {
      var sib = el.parentElement ? $$("[data-reveal]", el.parentElement).indexOf(el) : 0;
      el.style.transitionDelay = Math.min(sib, 5) * 70 + "ms";
      io.observe(el);
    });
    setTimeout(function () {
      $$("[data-reveal]:not(.is-revealed)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-revealed");
      });
    }, 6000);
  }

  /* =============================================================
     Parallax y tilt
     ============================================================= */
  function initParallax() {
    if (!window.gsap || !window.ScrollTrigger) return;
    var gsap = window.gsap;
    $$("[data-parallax]").forEach(function (el) {
      gsap.fromTo(el, { yPercent: -7 }, {
        yPercent: 0, ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true }
      });
    });
    var mq = $(".marquee-track");
    if (mq) {
      gsap.to(mq, {
        skewX: -6, ease: "none",
        scrollTrigger: { trigger: mq, start: "top bottom", end: "bottom top", scrub: 0.6 }
      });
    }
  }

  function initInView() {
    $$(".flash, .marquee").forEach(function (el) {
      onVisible(el, function (v) { el.classList.toggle("is-inview", v); }, "120px");
    });
  }

  function initTilt() {
    if (!fine) return;
    $$("[data-tilt]").forEach(function (el) {
      var parent = el.parentElement;
      parent.style.perspective = "1200px";
      el.style.transition = "transform .6s cubic-bezier(.16,1,.3,1)";
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = "rotateY(" + (nx * 7).toFixed(2) + "deg) rotateX(" + (-ny * 7).toFixed(2) + "deg)";
      });
      el.addEventListener("mouseout", function (e) {
        if (el.contains(e.relatedTarget)) return;
        el.style.transform = "";
      });
    });
  }

  /* =============================================================
     Boot
     ============================================================= */
  function boot() {
    if (window.gsap && window.ScrollTrigger) {
      try { window.gsap.registerPlugin(window.ScrollTrigger); } catch (_) {}
    }
    safe(initField, "initField");
    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initCursor, "initCursor");
    safe(initSigils, "initSigils");
    safe(initSphere, "initSphere");
    safe(initWorks, "initWorks");
    safe(initReveals, "initReveals");
    safe(initParallax, "initParallax");
    safe(initTilt, "initTilt");
    safe(initInView, "initInView");

    // La aguja 3D se carga cuando la página ya está pintada
    function load3D() { setTimeout(function () { loadThree(function () { safe(initPen, "initPen"); }); }, 60); }
    if (document.readyState === "complete") load3D(); else window.addEventListener("load", load3D, { once: true });

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
