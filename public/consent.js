/* ------------------------------------------------------------------
   Cookie banner and Google Analytics, shared by every page.

   Nothing from Google Analytics loads until the visitor presses Accept.
   Reject, the X and Escape all mean no. The choice is kept in
   localStorage for 6 months (Garante, cookie guidelines of 10 June 2021:
   do not ask again sooner), then the banner asks again.
   The "Cookie settings" link in every footer reopens it.

   GA_ID is the Measurement ID from Google Analytics (G-XXXXXXXXXX).
   While it is empty the banner never shows and nothing loads.
   `npm run deploy` refuses to publish with it empty.
-------------------------------------------------------------------*/
(function () {
  var GA_ID = 'G-MM16E64H3F';
  var KEY = 'dropoffaudit-consent';
  var SIX_MONTHS = 1000 * 60 * 60 * 24 * 183;

  if (!GA_ID) return;

  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      if (v && (v.choice === 'yes' || v.choice === 'no') && Date.now() - v.at < SIX_MONTHS) return v.choice;
    } catch (e) {}
    return null;
  }
  function save(choice) {
    try { localStorage.setItem(KEY, JSON.stringify({ choice: choice, at: Date.now() })); } catch (e) {}
  }

  var loaded = false;
  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('consent', 'default', {
      ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
      analytics_storage: 'granted'
    });
    gtag('js', new Date());
    gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
  }

  // After a "no" following a "yes", GA cookies already set are removed.
  function clearAnalyticsCookies() {
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name === '_ga' || name.indexOf('_ga_') === 0) {
        ['', '; domain=' + host, '; domain=.' + host].forEach(function (d) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d;
        });
      }
    });
  }

  var css =
    '.cc{position:fixed;left:16px;right:16px;bottom:16px;z-index:50;max-width:560px;margin-left:auto;' +
    'background:#191614;color:#EDE8E0;border:1px solid rgba(237,232,224,.14);border-radius:4px;' +
    'box-shadow:0 24px 60px -20px rgba(0,0,0,.9);padding:22px 22px 20px;font:15px/1.55 "IBM Plex Sans",ui-sans-serif,system-ui,sans-serif}' +
    '.cc p{margin:0 32px 16px 0;color:#BDB4A7}' +
    '.cc p b{color:#EDE8E0;font-weight:600}' +
    '.cc a{color:#E8A574;text-underline-offset:3px}' +
    '.cc .row{display:flex;gap:12px}' +
    '.cc .row button{flex:1;font-family:inherit;font-size:15px;font-weight:600;line-height:1;padding:13px 16px;border-radius:3px;cursor:pointer;' +
    'background:transparent;color:#EDE8E0;border:1px solid rgba(237,232,224,.45)}' +
    '.cc .row button:hover{border-color:#E8A574;color:#E8A574}' +
    '.cc .x{position:absolute;top:10px;right:10px;width:34px;height:34px;border:0;background:none;color:#9A9186;cursor:pointer;border-radius:3px}' +
    '.cc .x:hover{color:#EDE8E0}' +
    '.cc button:focus-visible{outline:2px solid #E8A574;outline-offset:2px}' +
    '.cookie-link{background:none;border:0;padding:0;font:inherit;color:#E8A574;cursor:pointer;' +
    'text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px;text-decoration-color:rgba(232,165,116,.45)}' +
    '.cookie-link:hover{color:#EDE8E0;text-decoration-color:#EDE8E0}';

  var box = null;
  function show() {
    if (box) return;
    box = document.createElement('div');
    box.className = 'cc';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Cookie choice');
    box.innerHTML =
      '<button type="button" class="x" aria-label="Close and reject">' +
      '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>' +
      '<p><b>This site uses cookies.</b> With your consent, Google Analytics cookies show me how many people visit and which pages they read. ' +
      'They are not used for advertising. <a href="/privacy/#cookies">Privacy notice</a></p>' +
      '<div class="row"><button type="button" data-c="no">Reject</button><button type="button" data-c="yes">Accept</button></div>';
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      decide(b.getAttribute('data-c') === 'yes' ? 'yes' : 'no');
    });
    box.addEventListener('keydown', function (e) { if (e.key === 'Escape') decide('no'); });
    document.body.appendChild(box);
  }
  function hide() { if (box) { box.remove(); box = null; } }

  function decide(choice) {
    var before = read();
    save(choice);
    hide();
    if (choice === 'yes') loadAnalytics();
    else if (before === 'yes') { clearAnalyticsCookies(); location.reload(); }
  }

  function init() {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
    // the footer link exists on every page but stays hidden until there is
    // something to choose about
    document.querySelectorAll('[data-cookie-settings]').forEach(function (b) { b.hidden = false; });
    var c = read();
    if (c === 'yes') loadAnalytics();
    else if (c === null) show();
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-cookie-settings]')) show();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
