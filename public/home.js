document.getElementById('yr').textContent=new Date().getFullYear();

/* Email capture. Empty endpoint = section stays hidden. Set it to the URL
   of a service that accepts a POST with an `email` field (Zoho Forms,
   Formspree or similar), then add the matching paragraph to /privacy. */
var CAPTURE_ENDPOINT = 'https://formspree.io/f/xnpnnbol';
(function(){
  var sec = document.getElementById('capture');
  if (!sec || !CAPTURE_ENDPOINT) return;
  var form = sec.querySelector('form');
  var note = sec.querySelector('.capture-note');
  form.action = CAPTURE_ENDPOINT;
  sec.hidden = false;
  var btn = form.querySelector('button[type=submit]');
  var busy = false;
  var KEY = 'capture_done';
  function remembered(email){ try { return (localStorage.getItem(KEY) || '').split('\n').indexOf(email) >= 0; } catch(_) { return false; } }
  function remember(email){ try { localStorage.setItem(KEY, (localStorage.getItem(KEY) || '') + '\n' + email); } catch(_) {} }
  function say(t){ note.textContent = t; note.hidden = false; }
  form.addEventListener('submit', function(e){
    e.preventDefault();
    if (busy) return;
    var email = form.email.value.trim().toLowerCase();
    if (!email || email.indexOf('@') < 1){ say('That does not look like an email address.'); return; }
    /* the same address from the same browser is not sent twice: one click
       that looks like nothing happened must not become two rows */
    if (remembered(email)){ say('That address is already on the list. The next teardown comes to ' + email + '.'); return; }
    busy = true; btn.disabled = true; say('Sending\u2026');
    fetch(CAPTURE_ENDPOINT, {method:'POST', headers:{'Accept':'application/json'}, body:new FormData(form)})
      .then(function(r){ if(!r.ok) throw new Error(r.status); remember(email); say('Done. The next teardown comes to ' + email + '. There is no confirmation email: if you want to be sure, write to luca@dropoffaudit.me and I will answer myself.'); form.email.value=''; })
      .catch(function(){ say('Something went wrong. Email me instead: luca@dropoffaudit.me'); })
      .then(function(){ busy = false; btn.disabled = false; });
  });
})();

/* Slow anchor scroll.
   Native scroll-behavior:smooth lasts ~300ms in Chrome and is not tunable,
   which reads as a jump on a page this tall. This animates it by hand over
   a distance-aware duration, and gets out of the way the moment the reader
   touches the wheel or the screen. */
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var running = null;

  function ease(t){ return t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3)/2; }

  function stop(){ if (running !== null){ cancelAnimationFrame(running); running = null; } }
  ['wheel','touchstart','keydown'].forEach(function(ev){
    window.addEventListener(ev, stop, {passive:true});
  });

  function glideTo(target){
    var start = window.pageYOffset;
    var style = getComputedStyle(target);
    var offset = parseFloat(style.scrollMarginTop) || 0;
    var end = start + target.getBoundingClientRect().top - offset;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    end = Math.max(0, Math.min(end, max));
    var dist = Math.abs(end - start);
    if (dist < 2) return;

    /* ~1.4s of ramp plus a third of a millisecond per pixel travelled,
       so the far end of the page takes visibly longer than the near one. */
    var dur = Math.min(3000, Math.max(1200, 1400 + dist * 0.35));
    var t0 = null;

    stop();
    running = requestAnimationFrame(function step(now){
      if (t0 === null) t0 = now;
      var t = Math.min(1, (now - t0) / dur);
      window.scrollTo(0, start + (end - start) * ease(t));
      if (t < 1){ running = requestAnimationFrame(step); }
      else { running = null; target.focus({preventScroll:true}); }
    });
  }

  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    history.pushState(null, '', '#' + id);
    if (reduce.matches){ target.scrollIntoView(); target.focus({preventScroll:true}); return; }
    glideTo(target);
  });
})();

/* Reveal.
   Every block of text below the hero comes up when it reaches the screen,
   the pieces of one section a beat apart in reading order. It runs once:
   scrolling back up never hides anything again. */
(function(){
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var PICK = 'h2, .col > p, .stack li, .points li, .exhibits li, .fig, .btn, .btn-ghost, .capture';
  var secs = document.querySelectorAll('section'), items = [];
  for (var i = 0; i < secs.length; i++){
    var els = secs[i].querySelectorAll(PICK);
    for (var j = 0; j < els.length; j++){
      els[j].classList.add('rv');
      els[j].style.setProperty('--d', Math.min(j * 0.08, 0.48) + 's');
      items.push(els[j]);
    }
  }
  document.documentElement.classList.add('rv-on');

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {rootMargin:'0px 0px -8% 0px'});
  items.forEach(function(el){ io.observe(el); });
})();
