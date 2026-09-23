(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  var escHTML = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  /* ---------------------------------------------------------------
     Brand links — mounts phone / whatsapp / email from manifest.js
     onto elements already carrying correct hardcoded hrefs, so the
     page is 100% correct even if this script fails to load.
     --------------------------------------------------------------- */
  function initBrandLinks() {
    if (!data.phoneHref) return;
    $$("[data-phone-link]").forEach(function (el) { el.setAttribute("href", data.phoneHref); });
    $$("[data-whatsapp-link]").forEach(function (el) { el.setAttribute("href", data.whatsappHref); });
    $$("[data-email-link]").forEach(function (el) { el.setAttribute("href", "mailto:" + data.email); });
  }

  /* ---------------------------------------------------------------
     Nav — sticky border emphasis + mobile fullscreen menu
     --------------------------------------------------------------- */
  function initNav() {
    var nav = $(".nav");
    if (nav) {
      var onScroll = function () {
        if (window.scrollY > 8) nav.classList.add("is-scrolled");
        else nav.classList.remove("is-scrolled");
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    var toggle = $("[data-nav-toggle]");
    var mobile = $("[data-nav-mobile]");
    if (!toggle || !mobile) return;

    function closeMenu() {
      mobile.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.documentElement.classList.remove("nav-open");
    }
    function openMenu() {
      mobile.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.documentElement.classList.add("nav-open");
      var firstLink = mobile.querySelector("a");
      if (firstLink) firstLink.focus();
    }
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) closeMenu(); else openMenu();
    });
    $$("a", mobile).forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ---------------------------------------------------------------
     Smooth anchors — native scroll, offset for sticky header
     --------------------------------------------------------------- */
  function initSmoothAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navEl = $(".nav");
      var offset = navEl ? navEl.offsetHeight + 12 : 80;
      var top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
      history.pushState ? history.pushState(null, "", id) : (location.hash = id);
    });
  }

  /* ---------------------------------------------------------------
     Reveal on scroll — universal, low threshold + 6s safety net
     --------------------------------------------------------------- */
  function initReveals() {
    var els = $$("[data-reveal]");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-revealed"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    els.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      $$("[data-reveal]:not(.is-revealed)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-revealed");
      });
    }, 6000);
  }

  /* ---------------------------------------------------------------
     Count-up numbers for the stats strip
     --------------------------------------------------------------- */
  function initCountUp() {
    var els = $$("[data-count-to]");
    if (!els.length || !("IntersectionObserver" in window)) return;
    els.forEach(function (el) {
      var raw = el.dataset.countTo;
      var target = parseFloat(raw);
      if (isNaN(target)) return;
      var decimals = (raw.split(".")[1] || "").length;
      var prefix = el.dataset.countPrefix || "";
      var suffix = el.dataset.countSuffix || "";
      var triggered = false;
      function trigger() {
        if (triggered) return;
        triggered = true;
        if (reduced) { el.textContent = prefix + target.toFixed(decimals) + suffix; return; }
        var duration = 1400;
        var start = null;
        function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
        function frame(ts) {
          if (start === null) start = ts;
          var progress = Math.min(1, (ts - start) / duration);
          var value = target * easeOutExpo(progress);
          el.textContent = prefix + value.toFixed(decimals) + suffix;
          if (progress < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { if (entry.isIntersecting) { trigger(); io.unobserve(entry.target); } });
      }, { threshold: 0.05 });
      io.observe(el);
    });
  }

  /* ---------------------------------------------------------------
     Signature effect — live coordinate readout cursor.
     Maps the pointer position to a plausible UTM 30N easting /
     northing near Vélez-Málaga, like a total station data logger.
     --------------------------------------------------------------- */
  function initCoordCursor() {
    if (!fineHover) return;
    var stage = $("[data-coord-stage]");
    var coord = $("[data-coord-readout]");
    if (!stage || !coord) return;

    var BASE_X = 400682.30;
    var BASE_Y = 4067145.88;

    var raf = null;
    function onMove(e) {
      var rect = stage.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        coord.classList.remove("is-live");
        return;
      }
      var px = (e.clientX - rect.left) / rect.width;
      var py = (e.clientY - rect.top) / rect.height;
      var x = BASE_X + px * 118.42;
      var y = BASE_Y - py * 96.77;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        coord.textContent = "X " + x.toFixed(2) + "  Y " + y.toFixed(2) + "  ETRS89 / UTM 30N";
        coord.style.left = e.clientX + "px";
        coord.style.top = e.clientY + "px";
        coord.classList.add("is-live");
        raf = null;
      });
    }
    stage.addEventListener("mousemove", onMove, { passive: true });
    stage.addEventListener("mouseleave", function () { coord.classList.remove("is-live"); });
  }

  /* ---------------------------------------------------------------
     Contact form — progressive enhancement over a real POST target
     (FormSubmit). Works with JS disabled via native form submit.
     --------------------------------------------------------------- */
  function initContactForm() {
    var form = $("[data-contact-form]");
    if (!form) return;
    var honeypot = form.querySelector('[name="_honeypot"]');
    var submitBtn = form.querySelector('[type="submit"]');
    var successBox = $("[data-contact-success]");
    var errorBox = $("[data-contact-error]");
    var endpoint = form.getAttribute("action");
    if (!endpoint || !window.fetch) return; // let the native submit happen

    form.addEventListener("submit", function (e) {
      if (honeypot && honeypot.value) return; // let bots submit into the void, no preventDefault
      if (!form.reportValidity()) return;
      e.preventDefault();
      if (form.classList.contains("is-sending")) return;
      form.classList.add("is-sending");
      form.classList.remove("is-error");
      if (submitBtn) submitBtn.disabled = true;
      if (errorBox) errorBox.hidden = true;

      var ajaxEndpoint = endpoint.replace("formsubmit.co/", "formsubmit.co/ajax/");
      fetch(ajaxEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      }).then(function (res) {
        if (!res.ok) throw new Error("bad response");
        form.classList.remove("is-sending");
        form.classList.add("is-sent");
        if (submitBtn) submitBtn.disabled = false;
        if (successBox) {
          successBox.hidden = false;
          successBox.setAttribute("aria-hidden", "false");
          successBox.classList.add("is-visible");
        }
        form.reset();
      }).catch(function () {
        form.classList.remove("is-sending");
        if (submitBtn) submitBtn.disabled = false;
        form.classList.add("is-error");
        if (errorBox) errorBox.hidden = false;
      });
    });
  }

  /* ---------------------------------------------------------------
     FAQ accordion — native <details>, close siblings on open
     --------------------------------------------------------------- */
  function initFaqAccordion() {
    var items = $$("[data-faq-item]");
    if (!items.length) return;
    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        items.forEach(function (other) { if (other !== item) other.open = false; });
      });
    });
  }

  function boot() {
    safe(initBrandLinks, "initBrandLinks");
    safe(initNav, "initNav");
    safe(initSmoothAnchors, "initSmoothAnchors");
    safe(initReveals, "initReveals");
    safe(initCountUp, "initCountUp");
    safe(initCoordCursor, "initCoordCursor");
    safe(initContactForm, "initContactForm");
    safe(initFaqAccordion, "initFaqAccordion");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
