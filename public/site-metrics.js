// Public page counts only. Never send form values, query strings or room codes.
(() => {
  const sites = {
  "cinema.ilyamedve.dev": {
    "host": "cinema.ilyamedve.dev",
    "id": "pa-X5JPqRDrCq4zknhgO7H8b"
  }
};
  const site = sites[location.hostname];
  if (!site || window.__siteMetricsLoaded) return;
  window.__siteMetricsLoaded = true;

  function redactedUrl(value) {
    const url = new URL(value, location.origin);
    url.search = "";
    url.hash = "";
    url.username = "";
    url.password = "";
    url.pathname = url.pathname.replace(/^\/room\/[^/]+/, "/room/:code");
    return url;
  }

  const plausible = window.plausible = window.plausible || function () {
    (plausible.q = plausible.q || []).push(arguments);
  };
  plausible.init = plausible.init || function (options) { plausible.o = options || {}; };
  plausible.init({
    transformRequest(payload) {
      const url = redactedUrl(payload.u || location.href);
      url.host = site.host;
      url.protocol = "https:";
      payload.u = url.href;
      payload.r = document.referrer ? new URL(document.referrer).origin : null;
      if (payload.p && typeof payload.p.url === "string") {
        payload.p.url = redactedUrl(payload.p.url).href;
      }
      return payload;
    },
  });
  const script = document.createElement("script");
  script.async = true;
  script.referrerPolicy = "no-referrer";
  script.src = "https://analytics.ilyamedve.dev/js/" + site.id + ".js";
  document.head.appendChild(script);
})();
