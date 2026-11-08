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
    'background:#fff;color:#0A0A0A;border:2px solid #0A0A0A;border-radius:4px;' +
    'box-shadow:0 24px 50px -24px rgba(0,0,0,.45);padding:22px 22px 20px;font:16px/1.55 "Atkinson Next",ui-sans-serif,system-ui,sans-serif}' +
    '.cc p{margin:0 32px 16px 0;color:#4A4A4A}' +
    '.cc p b{color:#0A0A0A;font-weight:700}' +
    '.cc a{color:#0A0A0A;text-underline-offset:3px;text-decoration-color:#1C3AA9;text-decoration-thickness:1.5px}' +
    '.cc .row{display:flex;gap:12px}' +
    '.cc .row button{flex:1;font-family:inherit;font-size:16px;font-weight:700;line-height:1;padding:13px 16px;border-radius:3px;cursor:pointer;' +
    'background:#fff;color:#0A0A0A;border:2px solid #0A0A0A}' +
    '.cc .row button:hover{background:#0A0A0A;color:#fff}' +
    '.cc .x{position:absolute;top:10px;right:10px;width:34px;height:34px;border:0;background:none;color:#4A4A4A;cursor:pointer;border-radius:3px}' +
    '.cc .x:hover{color:#0A0A0A}' +
    '.cc button:focus-visible{outline:3px solid #C4161C;outline-offset:2px}' +
    '.cookie-link{background:none;border:0;padding:0;font:inherit;color:#0A0A0A;cursor:pointer;' +
    'text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1.5px;text-decoration-color:#1C3AA9}' +
    '.cookie-link:hover{color:#1C3AA9}';

  // The Italian page gets the banner in Italian; every other page in English.
  var IT = (document.documentElement.lang || '').indexOf('it') === 0;
  var T = IT ? {
    label: 'Scelta sui cookie', x: 'Chiudi e rifiuta',
    text: '<b>Questo sito usa i cookie.</b> Con il tuo consenso, i cookie di Google Analytics mi dicono quante persone visitano il sito e quali pagine leggono. ' +
      'Non servono per la pubblicit\u00e0. <a href="/privacy/#cookies">Informativa privacy (in inglese)</a>',
    no: 'Rifiuta', yes: 'Accetta'
  } : {
    label: 'Cookie choice', x: 'Close and reject',
    text: '<b>This site uses cookies.</b> With your consent, Google Analytics cookies show me how many people visit and which pages they read. ' +
      'They are not used for advertising. <a href="/privacy/#cookies">Privacy notice</a>',
    no: 'Reject', yes: 'Accept'
  };

  var box = null;
  function show() {
    if (box) return;
    box = document.createElement('div');
    box.className = 'cc';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', T.label);
    box.innerHTML =
      '<button type="button" class="x" aria-label="' + T.x + '">' +
      '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>' +
      '<p>' + T.text + '</p>' +
      '<div class="row"><button type="button" data-c="no">' + T.no + '</button><button type="button" data-c="yes">' + T.yes + '</button></div>';
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
