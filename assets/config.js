/* tryretafit.com — first-touch click-id capture. The outbound affiliate URL is never
   in the page DOM: every CTA points at a first-party /go/ path (see /assets/links.js)
   which builds + fires the real link. Tracking rule (in /go/): sub1 = gclid (paid)
   else the organic geo tag (retafituk / retafitde / retafitdk / retafitno / retafitfr). */
(function () {
  "use strict";
  var KEYS = ["gclid", "fbclid", "ttclid", "msclkid", "utm_source", "utm_medium", "utm_campaign"];
  try {
    var q = new URLSearchParams(location.search);
    var s = JSON.parse(localStorage.getItem("rf_track") || "{}");
    KEYS.forEach(function (k) { var v = q.get(k); if (v && !s[k]) s[k] = v; });
    if (!s._ts) s._ts = Date.now();
    if (!s._lp) s._lp = location.pathname;
    localStorage.setItem("rf_track", JSON.stringify(s));
  } catch (e) {}

  // sticky mobile CTA reveal after slight scroll
  function onScroll() {
    var bar = document.getElementById("sticky-cta");
    if (!bar) return;
    if (window.scrollY > 600) bar.classList.add("show"); else bar.classList.remove("show");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
