/* ==========================================================================
   Kosmetik- & Nagelstudio Valeria Niederhaus
   Progressive Enhancement – die Seite funktioniert auch ohne dieses Skript.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Ladevorschau ausblenden ------------------------------------ */
  /* Sie verschwindet, sobald die Seite geladen ist – aber nicht vor einer
     Mindestdauer, sonst blitzt sie bei schnellen Verbindungen nur kurz auf.
     Ein Zeitlimit sorgt dafür, dass ein hängendes Bild die Seite nie
     dauerhaft verdeckt.                                                     */
  /* Ergänzt die Vorkehrung aus dem <head>: dort wird die Wiederherstellung
     der Scrollposition abgeschaltet, hier wird sie zusätzlich aktiv auf den
     Seitenanfang gesetzt – manche Browser scrollen erst nach dem Ladeende.  */
  function nachObenSetzen() {
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }

  nachObenSetzen();
  window.addEventListener('load', nachObenSetzen);

  var loader = document.getElementById('loader');
  if (loader) {
    var MINDESTDAUER = reduceMotion ? 300 : 1400;
    var HOECHSTDAUER = 3500;
    var start = Date.now();
    var erledigt = false;

    var ausblenden = function () {
      if (erledigt) return;
      erledigt = true;
      nachObenSetzen();
      loader.classList.add('is-done');
      document.documentElement.classList.remove('is-loading');
      // Nach der Überblendung ganz aus dem Dokument nehmen.
      window.setTimeout(function () {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, 700);
    };

    var planen = function () {
      var rest = Math.max(0, MINDESTDAUER - (Date.now() - start));
      window.setTimeout(ausblenden, rest);
    };

    if (document.readyState === 'complete') planen();
    else window.addEventListener('load', planen);
    window.setTimeout(ausblenden, HOECHSTDAUER);
  }

  /* ---------- Jahreszahl im Footer -------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header: fest/transparent umschalten ------------------------ */
  var header = document.getElementById('siteHeader');
  var hero = document.querySelector('.hero');

  function syncHeader() {
    if (!header) return;
    var threshold = hero ? hero.offsetHeight - header.offsetHeight - 40 : 40;
    header.classList.toggle('is-solid', window.scrollY > Math.max(threshold, 40));
  }

  /* ---------- Mobile-Navigation ------------------------------------------ */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    nav.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    // Bei offenem Menü braucht der Header immer den hellen Hintergrund.
    if (open && header) header.classList.add('is-solid');
    else syncHeader();
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setNav(false);
        toggle.focus();
      }
    });
    // Beim Wechsel auf Desktop-Breite zurücksetzen.
    window.matchMedia('(min-width: 821px)').addEventListener('change', function (e) {
      if (e.matches) setNav(false);
    });
  }

  /* ---------- Scroll-Reveal ---------------------------------------------- */
  var revealables = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Aktiver Navigationspunkt ----------------------------------- */
  var sections = ['leistungen', 'studio', 'galerie', 'stimmen', 'kontakt']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navLinks = nav ? nav.querySelectorAll('a[href^="#"]') : [];

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- Öffnungsstatus aus der Öffnungszeiten-Tabelle --------------- */
  /* Einzige Quelle der Wahrheit sind die data-Attribute in index.html –
     wer die Zeiten dort ändert, ändert automatisch auch diese Anzeige.      */
  var TZ = 'Europe/Berlin';
  var DAY_NAMES = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  var DAY_SHORT = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  var EN_DAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  function berlinNow() {
    try {
      var weekday = new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'short' })
        .format(new Date());
      var time = new Intl.DateTimeFormat('en-GB', {
        timeZone: TZ, hour: '2-digit', minute: '2-digit', hour12: false
      }).format(new Date());

      var parts = time.split(':');
      var hours = parseInt(parts[0], 10) % 24; // "24:00" kommt in manchen Engines vor
      var minutes = parseInt(parts[1], 10);

      if (!(weekday in EN_DAYS) || isNaN(hours) || isNaN(minutes)) return null;
      return { day: EN_DAYS[weekday], minutes: hours * 60 + minutes };
    } catch (err) {
      return null; // Ohne verlässliche Zeitzone lieber gar nichts behaupten.
    }
  }

  function toMinutes(value) {
    if (!value) return null;
    var m = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
    if (!m) return null;
    return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
  }

  function readSchedule() {
    var rows = document.querySelectorAll('#hoursTable tr[data-day]');
    var schedule = {};
    rows.forEach(function (row) {
      var day = parseInt(row.getAttribute('data-day'), 10);
      if (isNaN(day)) return;
      var open = toMinutes(row.getAttribute('data-open'));
      var close = toMinutes(row.getAttribute('data-close'));
      schedule[day] = (open !== null && close !== null && close > open)
        ? { open: open, close: close, row: row }
        : { row: row };
    });
    return schedule;
  }

  function formatMinutes(total) {
    var h = Math.floor(total / 60);
    var m = total % 60;
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }

  function nextOpening(schedule, fromDay) {
    for (var i = 1; i <= 7; i++) {
      var day = (fromDay + i) % 7;
      var entry = schedule[day];
      if (entry && typeof entry.open === 'number') {
        return { day: day, open: entry.open };
      }
    }
    return null;
  }

  function renderStatus() {
    var badge = document.querySelector('[data-open-status]');
    var now = berlinNow();
    var schedule = readSchedule();
    if (!now || !Object.keys(schedule).length) return;

    // Heutige Zeile in der Tabelle hervorheben.
    Object.keys(schedule).forEach(function (day) {
      schedule[day].row.classList.toggle('is-today', Number(day) === now.day);
    });

    if (!badge) return;

    var today = schedule[now.day];
    var isOpen = today && typeof today.open === 'number' &&
                 now.minutes >= today.open && now.minutes < today.close;
    var label;

    if (isOpen) {
      var left = today.close - now.minutes;
      label = left <= 60
        ? 'Schließt um ' + formatMinutes(today.close)
        : 'Jetzt geöffnet · bis ' + formatMinutes(today.close);
    } else if (today && typeof today.open === 'number' && now.minutes < today.open) {
      label = 'Öffnet heute um ' + formatMinutes(today.open);
    } else {
      var next = nextOpening(schedule, now.day);
      label = next
        ? 'Geschlossen · öffnet ' + DAY_SHORT[next.day] + ' um ' + formatMinutes(next.open)
        : 'Termine nach Vereinbarung';
    }

    badge.innerHTML = '';
    var dot = document.createElement('span');
    dot.className = 'dot';
    var text = document.createElement('span');
    text.textContent = label;
    badge.appendChild(dot);
    badge.appendChild(text);
    badge.classList.toggle('is-closed', !isOpen);
    badge.hidden = false;

    // Für Screenreader lesbar machen, was sonst nur farblich kodiert wäre.
    badge.setAttribute('role', 'status');
    badge.setAttribute('aria-label', 'Studio heute, ' + DAY_NAMES[now.day] + ': ' + label);
  }

  renderStatus();
  setInterval(renderStatus, 60 * 1000);

  /* ---------- Karte erst auf Klick laden (Zwei-Klick-Lösung) ------------- */
  var mapBtn = document.getElementById('loadMap');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      var card = mapBtn.closest('.map-card');
      var placeholder = document.getElementById('mapPlaceholder');
      if (!card) return;

      var frame = document.createElement('iframe');
      frame.title = 'Karte: Kreuzweg 48, 64711 Erbach';
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer';
      frame.src = 'https://www.openstreetmap.org/export/embed.html' +
                  '?bbox=9.0015%2C49.6548%2C9.0095%2C49.6598' +
                  '&layer=mapnik&marker=49.65726%2C9.00551';

      if (placeholder) placeholder.remove();
      card.appendChild(frame);
    });
  }

  /* ---------- Scroll-Listener (gedrosselt) ------------------------------- */
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      syncHeader();
      ticking = false;
    });
  }, { passive: true });

  window.addEventListener('resize', syncHeader, { passive: true });
  syncHeader();
})();
