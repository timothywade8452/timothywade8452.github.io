/* tryretafit.com — exit popup behaviour.
   ORGANIC visitors (where ~all the traffic is): fires whenever the mouse leaves the browser
   window, RE-fires on every attempt (no once-per-session limit), and the Back button scrolls
   the page to the top instead of navigating away.
   PAID visitors (a gclid/fbclid/etc. is present): softened automatically — the popup shows
   once and the Back button is NOT hijacked, so a Google-Ads / Meta landing page won't be
   disapproved for an aggressive interstitial. Remove the `paid` guards to make it aggressive
   for everyone. The popup is still closable (dead-X hard-gate is a separate, later change). */
(function () {
  "use strict";
  var pop = document.getElementById("exitpop");
  if (!pop) return;

  var paid = false;
  try {
    var t = JSON.parse(localStorage.getItem("rf_track") || "{}");
    paid = !!(t.gclid || t.fbclid || t.ttclid || t.msclkid || t.gbraid || t.wbraid);
  } catch (e) {}

  var isOpen = false, shownOnce = false;

  // --- countdown timer (session-scoped urgency; keeps ticking across re-opens) ---
  var clock = document.getElementById("pop-clock");
  var SPAN = 5 * 60 * 1000, tHandle = null;
  function endTime() {
    var e = +sessionStorage.getItem("rf_pop_end") || 0;
    if (!e) { e = Date.now() + SPAN; try { sessionStorage.setItem("rf_pop_end", e); } catch (x) {} }
    return e;
  }
  function tick() {
    if (!clock) return;
    var ms = Math.max(0, endTime() - Date.now());
    var m = Math.floor(ms / 60000), s = Math.floor((ms % 60000) / 1000);
    clock.textContent = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }
  function startTimer() {
    if (tHandle || !clock) return;
    tick(); tHandle = setInterval(tick, 1000);     // never auto-redirects; CTA stays live at 00:00
  }

  function show() {
    if (isOpen) return;
    if (paid && shownOnce) return;                 // paid: only once
    isOpen = true; shownOnce = true;
    pop.classList.add("show");
    pop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    startTimer();
  }
  function hide() {
    isOpen = false;
    pop.classList.remove("show");
    pop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // close controls — ONLY the explicit dismiss link closes it.
  // Clicking the backdrop/rest of the screen does NOT dismiss (locked, per spec).
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) { e.preventDefault(); hide(); }
  });

  // (1) EXIT-INTENT — the mouse leaves the browser window (any edge). Re-arms after each close,
  //     so for organic it pops every single time the pointer leaves.
  document.addEventListener("mouseout", function (e) {
    if (!e.relatedTarget && !e.toElement) show();
  });

  // fallbacks so it still fires on touch devices (no mouse): timer + deep scroll
  setTimeout(function () { show(); }, 20000);
  window.addEventListener("scroll", function onSc() {
    var sd = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
    if (sd > 0.6) { show(); window.removeEventListener("scroll", onSc); }
  }, { passive: true });

  // (3) BACK-BUTTON → scroll to top instead of leaving (organic only). Re-pushes state so every
  //     subsequent Back press is caught too, and re-shows the popup.
  if (!paid) {
    try {
      history.pushState(null, document.title, location.href);
      window.addEventListener("popstate", function () {
        history.pushState(null, document.title, location.href);
        window.scrollTo({ top: 0, behavior: "smooth" });
        show();
      });
    } catch (e) {}
  }
})();
