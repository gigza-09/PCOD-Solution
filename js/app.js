/* Kahani — clickable prototype. Plain JS, no build step.
   Full renders happen only on screen changes; everything else is patched
   in place so transitions stay smooth. */
(function () {
  const K = window.KAHANI;
  const S = window.KStory;

  /* ---------- helpers ---------- */
  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  const ICONS = {
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    spark: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
    leaf: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l7-7"/>',
    signal: '<path d="M3 12h3l3-7 4 14 3-7h5"/>',
    drop: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    check: '<path d="M4 12.5l5 5L20 6.5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    pen: '<path d="M4 20l4-1 11-11-3-3L5 16z"/>',
    pill: '<rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="M9.5 8l4.5 7"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    send: '<path d="M4 12l16-8-6 16-2.5-6.5z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    right: '<path d="M9 5l7 7-7 7"/>',
    left: '<path d="M15 5l-7 7 7 7"/>',
    down: '<path d="M5 9l7 7 7-7"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 12h7M9 16h7"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
    pause: '<path d="M9 5v14M15 5v14"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a5 5 0 0 1 5.5 5"/>',
    brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a3 3 0 0 0-3-1z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3.5 7l8.5 6 8.5-6"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    loop: '<path d="M20 12a8 8 0 1 1-2.4-5.7"/><path d="M20 4v4.5h-4.5"/>',
    body: '<circle cx="12" cy="5" r="2.5"/><path d="M12 8v7M8 10.5h8M9.5 21l2.5-6 2.5 6"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    speaker: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
    stop: '<rect x="6.5" y="6.5" width="11" height="11" rx="2"/>'
  };
  const icon = (n, cls) => `<svg class="ic ${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ICONS.info}</svg>`;

  /* ---------- voice: speak instead of typing, and listen instead of reading ----------
     Speech-to-text uses the browser's recogniser, which in Chrome/Edge sends audio online,
     so the first use asks first. Read-aloud uses the device's own voices. */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const Voice = {
    canListen: !!SR,
    canSpeak: 'speechSynthesis' in window,
    rec: null, recBtn: null, sayBtn: null,
    listen(input, btn) {
      if (this.rec) { this.stopListening(); return; }
      const rec = new SR();
      rec.lang = 'en-IN'; rec.interimResults = true; rec.continuous = false;
      const base = input.value ? input.value.replace(/\s*$/, ' ') : '';
      rec.onresult = (e) => {
        let txt = '';
        for (let i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript;
        input.value = base + txt;
        input.dispatchEvent(new Event('input', { bubbles: true }));
      };
      rec.onerror = (e) => { toast(e.error === 'not-allowed' ? 'Microphone is blocked. You can type instead.' : 'Didn’t catch that. Try again?'); };
      rec.onend = () => { this.rec = null; if (this.recBtn) { this.recBtn.classList.remove('on'); this.recBtn.setAttribute('aria-pressed', 'false'); } this.recBtn = null; input.focus(); };
      this.rec = rec; this.recBtn = btn;
      btn.classList.add('on'); btn.setAttribute('aria-pressed', 'true');
      try { rec.start(); } catch (e) { rec.onend(); }
    },
    stopListening() { if (this.rec) this.rec.stop(); },
    speak(text, lang, btn) {
      const synth = window.speechSynthesis;
      const same = this.sayBtn === btn;
      this.stopSpeaking();
      if (same) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang || 'en-IN'; u.rate = 0.95;
      const v = synth.getVoices().find((x) => x.lang === u.lang) || synth.getVoices().find((x) => x.lang.startsWith(u.lang.slice(0, 2)));
      if (v) u.voice = v;
      u.onend = u.onerror = () => { if (this.sayBtn === btn) this.stopSpeaking(); };
      this.sayBtn = btn; btn.classList.add('on'); btn.innerHTML = icon('stop') + '<span>Stop</span>';
      synth.speak(u);
    },
    stopSpeaking() {
      if (!this.canSpeak) return;
      window.speechSynthesis.cancel();
      if (this.sayBtn) { this.sayBtn.classList.remove('on'); this.sayBtn.innerHTML = icon('speaker') + '<span>Listen</span>'; }
      this.sayBtn = null;
    }
  };
  /* 🎤 next to a text box (only where the browser supports it) */
  const micBtn = (target) => (Voice.canListen ? `<button type="button" class="mic" data-act="mic" data-arg="${target}" aria-pressed="false" aria-label="Speak instead of typing" title="Speak instead of typing">${icon('mic')}</button>` : '');
  /* 🔊 Listen: reads the text of the nearest [data-say] block */
  const sayBtn = () => (Voice.canSpeak ? `<button type="button" class="say-btn" data-act="say" aria-label="Read this aloud">${icon('speaker')}<span>Listen</span></button>` : '');
  const plainText = (el) => {
    const c = el.cloneNode(true);
    c.querySelectorAll('button, .say-btn, .vs, svg, small.src').forEach((n) => n.remove());
    return c.innerText.replace(/[→↑↓“”]/g, ' ').replace(/\s+/g, ' ').trim();
  };

  /* Literal pictures for each part of the loop */
  const ILLUS = {
    brain: `<circle cx="32" cy="32" r="31" fill="#efe9ff"/>
      <path d="M31 17c-3-3-9-3-11 1-5 0-8 5-6 9-4 3-3 9 1 11 0 5 5 8 9 6 2 3 5 3 7 1z" fill="#f7a8c6"/>
      <path d="M33 17c3-3 9-3 11 1 5 0 8 5 6 9 4 3 3 9-1 11 0 5-5 8-9 6-2 3-5 3-7 1z" fill="#f28fb5"/>
      <path d="M32 18v27M21 26c3 0 5 2 5 5M43 26c-3 0-5 2-5 5M19 36c3-1 6 0 7 3M45 36c-3-1-6 0-7 3" stroke="#c4527f" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <g stroke="#7a5af5" stroke-width="2.4" fill="none" stroke-linecap="round"><path d="M47 11a9 9 0 0 1 5 6"/><path d="M50 6a15 15 0 0 1 8 10"/></g>`,
    ovary: `<circle cx="32" cy="32" r="31" fill="#ffe6ef"/>
      <path d="M22 24 Q32 20 42 24 L38 39 Q32 43 26 39Z" fill="#f28fb5"/>
      <rect x="29" y="40" width="6" height="9" rx="3" fill="#f28fb5"/>
      <path d="M23 25 Q17 19 12 26M41 25 Q47 19 52 26" stroke="#f28fb5" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="13" cy="31" rx="6" ry="4.5" fill="#ffb68f"/><ellipse cx="51" cy="31" rx="6" ry="4.5" fill="#ffb68f"/>
      <g fill="#ee8a2e"><circle cx="9" cy="20" r="2.2"/><circle cx="15" cy="16" r="1.7"/><circle cx="49" cy="16" r="1.7"/><circle cx="55" cy="20" r="2.2"/></g>`,
    follicle: `<circle cx="32" cy="32" r="31" fill="#fff0de"/>
      <ellipse cx="32" cy="32" rx="21" ry="16" fill="#ffc9a3"/>
      <g fill="#fff" stroke="#ee8a2e" stroke-width="1.6"><circle cx="16.5" cy="30" r="4"/><circle cx="22" cy="21" r="3.6"/><circle cx="32" cy="18" r="3.6"/><circle cx="42" cy="21" r="3.6"/><circle cx="47.5" cy="30" r="4"/><circle cx="43" cy="40" r="3.6"/><circle cx="32" cy="44" r="3.6"/><circle cx="21" cy="40" r="3.6"/></g>
      <circle cx="32" cy="31" r="7" fill="#ee8a2e"/><path d="M29.5 28v6M34.5 28v6" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>`,
    period: `<circle cx="32" cy="32" r="31" fill="#ffe1e7"/>
      <rect x="13" y="16" width="38" height="34" rx="6" fill="#fff"/>
      <path d="M13 22a6 6 0 0 1 6-6h26a6 6 0 0 1 6 6v3H13z" fill="#d33a54"/>
      <path d="M22 12v7M42 12v7" stroke="#8f2238" stroke-width="2.6" stroke-linecap="round"/>
      <g fill="#eadde1"><circle cx="21" cy="32" r="2.2"/><circle cx="29" cy="32" r="2.2"/><circle cx="37" cy="32" r="2.2"/><circle cx="45" cy="32" r="2.2"/><circle cx="21" cy="41" r="2.2"/><circle cx="29" cy="41" r="2.2"/></g>
      <circle cx="40" cy="41" r="5.5" fill="none" stroke="#d33a54" stroke-width="1.6" stroke-dasharray="2.2 2"/>
      <text x="40" y="44.6" font-size="10" font-weight="800" text-anchor="middle" fill="#d33a54" font-family="Nunito, sans-serif">?</text>`,
    insulin: `<circle cx="32" cy="32" r="31" fill="#fff4d4"/>
      <rect x="11" y="35" width="14" height="14" rx="3" fill="#fff" stroke="#d9a300" stroke-width="2"/>
      <rect x="19" y="25" width="14" height="14" rx="3" fill="#fff" stroke="#d9a300" stroke-width="2"/>
      <circle cx="45" cy="25" r="7" fill="none" stroke="#d9a300" stroke-width="3.2"/>
      <path d="M45 32v15M45 41h5M45 46h4" stroke="#d9a300" stroke-width="3.2" stroke-linecap="round"/>`
  };
  const illus = (k, cls) => `<svg class="illus ${cls || ''}" viewBox="0 0 64 64" aria-hidden="true">${ILLUS[k] || ''}</svg>`;

  /* Before/after picture scenes: "Usually" vs "With PCOD", one pair per step (viewBox 140×90). */
  const g = {
    brain: (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s}) translate(-32 -32)"><path d="M31 17c-3-3-9-3-11 1-5 0-8 5-6 9-4 3-3 9 1 11 0 5 5 8 9 6 2 3 5 3 7 1z" fill="#f7a8c6"/><path d="M33 17c3-3 9-3 11 1 5 0 8 5 6 9 4 3 3 9-1 11 0 5-5 8-9 6-2 3-5 3-7 1z" fill="#f28fb5"/><path d="M32 18v27M21 26c3 0 5 2 5 5M43 26c-3 0-5 2-5 5" stroke="#c4527f" stroke-width="2" fill="none" stroke-linecap="round"/></g>`,
    ovary: (x, y, rx, ry) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#ffc9a3"/>`,
    env: (x, y, r) => `<g transform="translate(${x} ${y}) rotate(${r || 0})"><rect x="-8" y="-5.5" width="16" height="11" rx="2" fill="#fff" stroke="#7a5af5" stroke-width="1.5"/><path d="M-7 -4.5L0 1L7 -4.5" fill="none" stroke="#7a5af5" stroke-width="1.5" stroke-linejoin="round"/></g>`,
    drop: (x, y, s, c) => `<path transform="translate(${x} ${y}) scale(${s || 1})" d="M0 -6c0 0 4.5 5 4.5 8a4.5 4.5 0 0 1-9 0c0-3 4.5-8 4.5-8z" fill="${c || '#ee8a2e'}"/>`,
    arrow: (x1, x2, y, c) => `<path d="M${x1} ${y}H${x2}" stroke="${c || '#cbbdf7'}" stroke-width="2" stroke-dasharray="3 3"/><path d="M${x2 - 4} ${y - 4}l5 4-5 4" fill="none" stroke="${c || '#cbbdf7'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    sac: (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#ee8a2e" stroke-width="1.6"/>`,
    key: (x, y) => `<g transform="translate(${x} ${y})"><circle r="5" fill="none" stroke="#d9a300" stroke-width="2.6"/><path d="M5 0h12M13 0v4M16.5 0v3" stroke="#d9a300" stroke-width="2.6" stroke-linecap="round"/></g>`,
    lock: (x, y) => `<g transform="translate(${x} ${y})"><path d="M-3.5 -3v-3a3.5 3.5 0 0 1 7 0v3" fill="none" stroke="#5fb488" stroke-width="2"/><rect x="-6" y="-3" width="12" height="10" rx="2.5" fill="#5fb488"/></g>`,
    cube: (x, y) => `<rect x="${x - 4}" y="${y - 4}" width="8" height="8" rx="2" fill="#fff" stroke="#d9a300" stroke-width="1.6"/>`
  };
  const SCENES = {
    brain: {
      usual: g.brain(24, 45, 0.62) + g.arrow(44, 100, 45) + g.env(70, 45) + g.ovary(118, 45, 14, 10),
      pcod: g.brain(24, 45, 0.62) + g.arrow(44, 100, 45) + g.env(58, 30, -14) + g.env(74, 47, 8) + g.env(88, 30, 16) + g.env(62, 64, -6) + g.env(88, 62, 6) + g.ovary(118, 45, 14, 10) +
        '<path d="M110 28l-3-5M118 26v-6M126 28l3-5" stroke="#ee8a2e" stroke-width="2" stroke-linecap="round"/>',
      cap: ['One calm message', 'Too many messages']
    },
    ovary: {
      usual: g.ovary(70, 56, 30, 20) + g.sac(58, 54, 4) + g.sac(74, 60, 4) + g.sac(84, 50, 3.5) + g.drop(62, 24) + g.drop(80, 28, 0.8),
      pcod: g.ovary(46, 58, 28, 19) + g.sac(36, 56, 4) + g.sac(52, 62, 4) + g.sac(60, 50, 3.5) +
        g.drop(28, 30) + g.drop(42, 20) + g.drop(56, 30) + g.drop(68, 18, 0.9) + g.drop(36, 8, 0.7) + g.drop(78, 34, 0.8) +
        g.arrow(80, 96, 50, '#f2b48a') +
        '<circle cx="118" cy="48" r="15" fill="#f8d3b8"/><circle cx="113" cy="45" r="1.7" fill="#2b1f2e"/><circle cx="123" cy="45" r="1.7" fill="#2b1f2e"/>' +
        '<path d="M114 52q4 3 8 0" stroke="#b4545f" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="109" cy="52" r="2" fill="#e8768a"/><circle cx="127" cy="50" r="2" fill="#e8768a"/>' +
        '<path d="M114 61l-1 4M118 62v4M122 61l1 4" stroke="#3a2a30" stroke-width="1.3" stroke-linecap="round"/>',
      cap: ['A little hormone', 'Extra: pimples, hair']
    },
    follicle: {
      usual: g.ovary(58, 50, 34, 24) + g.sac(40, 44, 4) + g.sac(44, 60, 4) + g.sac(58, 66, 3.5) + g.sac(66, 46, 12) +
        '<path d="M78 40Q94 28 106 32" stroke="#f2b48a" stroke-width="2" stroke-dasharray="3 3" fill="none"/>' +
        '<circle cx="116" cy="32" r="7" fill="#ffd96a" stroke="#e2a400" stroke-width="1.6"/><path d="M110 22l-3-4M116 20v-5M122 22l3-4" stroke="#e2a400" stroke-width="1.8" stroke-linecap="round"/>',
      pcod: g.ovary(70, 46, 40, 28) + [[40, 44], [48, 28], [64, 22], [82, 24], [97, 34], [100, 54], [86, 66], [66, 70], [48, 62]].map(([x, y]) => g.sac(x, y, 5.5)).join('') +
        '<circle cx="70" cy="46" r="9" fill="#ee8a2e"/><path d="M67 42v8M73 42v8" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>',
      cap: ['One egg is let go', 'Sacs pause, no egg']
    },
    period: {
      usual: '<path d="M10 46H130" stroke="#efe6ea" stroke-width="8" stroke-linecap="round"/>' + g.drop(40, 28, 1.5, '#d33a54') + g.drop(100, 28, 1.5, '#d33a54') +
        '<circle cx="40" cy="46" r="4" fill="#d33a54"/><circle cx="100" cy="46" r="4" fill="#d33a54"/><path d="M40 60v5H100v-5" stroke="#b9b1c9" stroke-width="1.6" fill="none"/>',
      pcod: '<path d="M10 46H130" stroke="#efe6ea" stroke-width="8" stroke-linecap="round"/>' + g.drop(18, 28, 1.5, '#d33a54') + g.drop(124, 28, 1.5, '#d33a54') +
        '<circle cx="18" cy="46" r="4" fill="#d33a54"/><circle cx="124" cy="46" r="4" fill="#d33a54"/>' +
        '<circle cx="70" cy="32" r="8" fill="none" stroke="#d33a54" stroke-width="1.5" stroke-dasharray="2.5 2.2"/><text x="70" y="36" font-size="11" font-weight="800" text-anchor="middle" fill="#d33a54" font-family="Nunito, sans-serif">?</text>' +
        '<path d="M18 60v5H124v-5" stroke="#b9b1c9" stroke-width="1.6" fill="none"/>',
      cap: ['About once a month', 'Comes late']
    },
    insulin: {
      usual: '<circle cx="98" cy="45" r="26" fill="#e3f6ea" stroke="#a5dcbf" stroke-width="2"/>' + g.lock(72, 45) + g.key(34, 45) + g.arrow(54, 64, 45, '#e9c868') +
        g.cube(94, 36) + g.cube(106, 50) + g.cube(92, 56),
      pcod: '<circle cx="100" cy="45" r="26" fill="#e3f6ea" stroke="#a5dcbf" stroke-width="2"/>' + g.lock(74, 45) +
        g.key(16, 22) + g.key(16, 45) + g.key(16, 68) + g.cube(52, 26) + g.cube(56, 64) + g.cube(46, 46) +
        '<text x="100" y="50" font-size="12" font-weight="800" text-anchor="middle" fill="#a5dcbf" font-family="Nunito, sans-serif">…</text>',
      cap: ['Key lets sugar in', 'Body makes extra keys']
    }
  };
  const scene = (k, which) => `<svg viewBox="0 0 140 90" aria-hidden="true">${SCENES[k][which]}</svg>`;

  /* Tara — original illustrated peer guide (she blinks) */
  function tara(size, mood) {
    const mouth = mood === 'care'
      ? '<path d="M54 82 Q60 85 66 82" stroke="#b4545f" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
      : '<path d="M52 80 Q60 88 68 80" stroke="#b4545f" stroke-width="2.4" fill="#fff" stroke-linecap="round"/>';
    return `<svg class="tara" width="${size}" height="${Math.round(size * 1.1)}" viewBox="0 0 120 132" aria-hidden="true">
      <path d="M18 132 Q20 104 60 100 Q100 104 102 132Z" fill="#f8c5d3"/>
      <path d="M44 104 Q60 114 76 104" stroke="#e58aa5" stroke-width="3" fill="none"/>
      <g transform="translate(60 120)"><circle r="4.5" fill="#ee7fa1"/><circle cx="-6" cy="-1" r="4" fill="#ee7fa1"/><circle cx="6" cy="-1" r="4" fill="#ee7fa1"/><circle cx="-3.5" cy="5" r="4" fill="#ee7fa1"/><circle cx="3.5" cy="5" r="4" fill="#ee7fa1"/><circle cy="1.5" r="3" fill="#f9dc7a"/></g>
      <rect x="52" y="88" width="16" height="16" rx="6" fill="#efbf9f"/>
      <path d="M22 64 Q18 20 60 16 Q102 20 98 64 Q102 96 88 102 L32 102 Q18 96 22 64Z" fill="#1f1a26"/>
      <ellipse cx="31" cy="66" rx="5" ry="7" fill="#f2c2a3"/><ellipse cx="89" cy="66" rx="5" ry="7" fill="#f2c2a3"/>
      <ellipse cx="60" cy="62" rx="28" ry="31" fill="#f8d3b8"/>
      <path d="M31 56 Q32 25 60 25 Q88 25 89 56 Q80 42 72 46 Q66 37 58 45 Q48 38 40 47 Q35 48 31 56Z" fill="#1f1a26"/>
      <g class="eyes"><ellipse cx="49" cy="65" rx="4.6" ry="5.6" fill="#2b1f2e"/><ellipse cx="71" cy="65" rx="4.6" ry="5.6" fill="#2b1f2e"/>
      <circle cx="50.6" cy="63" r="1.7" fill="#fff"/><circle cx="72.6" cy="63" r="1.7" fill="#fff"/></g>
      <path d="M43 57 Q49 54 55 57M65 57 Q71 54 77 57" stroke="#1f1a26" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <ellipse cx="41" cy="75" rx="6" ry="3.6" fill="#f49aa6" opacity=".65"/><ellipse cx="79" cy="75" rx="6" ry="3.6" fill="#f49aa6" opacity=".65"/>
      <ellipse cx="60" cy="73" rx="2.2" ry="1.5" fill="#e9a58f"/>
      ${mouth}
    </svg>`;
  }

  /* ---------- state ---------- */
  const fresh = () => ({
    screen: 'home', report: null, source: null, phase: 'scan', rejected: {}, status: null,
    chIndex: null, card: 0, loopMode: 'mine', chat: [], ctx: null, group: 'A',
    paused: false, mumLang: 'en', teachFb: null, typing: false, voiceOk: false, voicePending: null,
    hidden: false, sheet: null, sheetAnim: false, anim: null
  });
  let st = fresh();
  const ORDER = ['home', 'body', 'ask', 'doctor', 'add', 'read', 'chapter', 'done'];
  const FLOW = ['add', 'read', 'chapter', 'done'];
  const STEP_LABEL = { add: 'Add', read: 'Check', chapter: 'Learn', done: 'Done' };
  const TABS = [['home', 'book', 'Story'], ['body', 'body', 'My body'], ['ask', 'chat', 'Ask'], ['doctor', 'doc', 'Doctor']];
  let lastScreen = null;

  const chapter = () => (st.chIndex != null ? S.chapters[st.chIndex] : S.last());
  const prevChapter = () => { const c = chapter(); return c ? S.chapters[c.n - 2] || null : null; };
  const nextSample = () => {
    const used = S.chapters.map((c) => c.reportId);
    if (!used.includes('v1')) return K.reports.v1;
    if (!used.includes('v2')) return K.reports.v2;
    return null;
  };

  let toastTimer;
  function toast(msg, ms) {
    if (st.hidden) return;
    const t = $('#toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), ms || 2000);
  }

  /* ---------- top bar (persistent, so the progress bar animates) ---------- */
  function updateTop() {
    const i = FLOW.indexOf(st.screen);
    const app = $('#app');
    app.classList.toggle('in-flow', i >= 0);
    app.classList.toggle('has-tabs', i < 0);
    if (i >= 0) {
      $('#progfill').style.width = ((i + 1) / FLOW.length * 100) + '%';
      $('#proglabel').textContent = `${i + 1} of ${FLOW.length} · ${STEP_LABEL[st.screen]}`;
    }
    $$('#tabbar button').forEach((b) => { const on = b.dataset.arg === st.screen; b.classList.toggle('on', on); b.setAttribute('aria-current', on ? 'page' : 'false'); });
  }
  function tabbarHtml() {
    return TABS.map(([k, ic, l]) => `<button data-act="tab" data-arg="${k}">${icon(ic)}<span>${l}</span></button>`).join('');
  }

  /* ---------- HOME ---------- */
  function home() {
    const chs = S.chapters;
    const bubble = chs.length
      ? `Welcome back! After your next visit, add the report and we’ll see <b>what changed</b>.`
      : `Hi, I’m Tara. Let’s make sense of your report, <b>privately</b>.`;
    const nodes = chs.map((c, k) => {
      const s = K.statusInfo[c.status];
      return `<li class="pnode ${k % 2 ? 'r' : 'l'}" style="--d:${k * 70}ms">
        <button class="pbtn done" data-act="opench" data-arg="${k}" aria-label="Open chapter ${c.n}: ${esc(c.title)}">${icon('check')}</button>
        <div class="pcap"><b>${esc(c.title)}</b><span>Ch ${c.n} · ${esc(c.visitLabel)}</span><i class="chip t-${s.tone}">${s.short}</i></div>
      </li>`;
    }).join('');
    return `<section class="scr home">
      <div class="scene" aria-hidden="true">${sceneSvg()}</div>
      <h1 class="h-xl">Your story</h1>
      <div class="guide">${tara(96)}<p class="bubble" data-say>${bubble} ${sayBtn()}</p></div>
      ${chs.length ? '' : `<ol class="howto" aria-label="How it works">
        <li>${icon('doc')}<span>Add</span></li>
        <li>${icon('check')}<span>Check</span></li>
        <li>${icon('body')}<span>Learn your body</span></li>
      </ol>`}
      <ol class="path">
        ${nodes}
        <li class="pnode ${chs.length % 2 ? 'r' : 'l'}" style="--d:${chs.length * 70}ms">
          <button class="pbtn add" data-act="go" data-arg="add" aria-label="Add a visit">${icon('plus')}</button>
          <div class="pcap"><b>${chs.length ? 'Add next visit' : 'Add your report'}</b><span>Chapter ${chs.length + 1}</span></div>
        </li>
      </ol>
      <div class="home-foot">${keepToggle('home')}</div>
    </section>`;
  }
  function keepToggle(where) {
    return `<label class="keep">
      <input type="checkbox" data-act="keep" ${S.keep ? 'checked' : ''}>
      <span class="sw" aria-hidden="true"></span>
      <span class="keep-t"><b>Keep my story on this phone</b><small class="keep-s">${S.keep ? 'On · no name, no account' : 'Off · gone when you close this'}</small></span>
    </label>`;
  }

  function sceneSvg() {
    return `<svg viewBox="0 0 390 844" preserveAspectRatio="xMidYMax slice" width="100%" height="100%">
      <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe8ff"/><stop offset=".55" stop-color="#eaf3ff"/><stop offset="1" stop-color="#f5efff"/></linearGradient></defs>
      <rect width="390" height="844" fill="url(#sky)"/>
      <g class="clouds" fill="#fff"><g class="cl1"><ellipse cx="300" cy="96" rx="46" ry="18"/><ellipse cx="330" cy="84" rx="30" ry="18"/></g><g class="cl2"><ellipse cx="70" cy="170" rx="38" ry="14"/><ellipse cx="96" cy="160" rx="24" ry="14"/></g></g>
      <path d="M0 470 Q90 410 190 460 T390 440 V844 H0Z" fill="#d5f0c6"/>
      <path d="M0 540 Q120 480 240 530 T390 510 V844 H0Z" fill="#aee39a"/>
      <path d="M0 620 Q140 570 260 615 T390 600 V844 H0Z" fill="#8ad37c"/>
      <g fill="#64bd5f"><path d="M330 510 l10 -34 l10 34z"/><path d="M348 516 l8 -26 l8 26z"/><path d="M28 560 l9 -30 l9 30z"/></g>
      <g transform="translate(300 690)"><circle r="5" fill="#fff"/><circle cx="-6" cy="-2" r="4" fill="#fff"/><circle cx="6" cy="-2" r="4" fill="#fff"/><circle r="2.4" fill="#f9d35a"/></g>
      <g transform="translate(60 780)"><circle r="5" fill="#ffd1e0"/><circle cx="-6" cy="-2" r="4" fill="#ffd1e0"/><circle cx="6" cy="-2" r="4" fill="#ffd1e0"/><circle r="2.4" fill="#f9d35a"/></g>
    </svg>`;
  }

  /* ---------- 1. ADD ---------- */
  function add() {
    const n = S.chapters.length + 1;
    const smp = nextSample();
    return `<section class="scr add">
      <button class="back" data-act="go" data-arg="home">${icon('left')} Story</button>
      <h1 class="h-l">${n === 1 ? 'Add your report' : 'Add your new visit'}</h1>
      <p class="sub">${n === 1 ? 'Pick whatever is easiest.' : 'It becomes Chapter ' + n + '.'}</p>
      <div class="opts">
        ${smp ? `<button class="opt hero" data-act="sample" style="--d:0ms">
          <span class="opt-ic lav">${icon('doc')}</span>
          <span class="opt-t"><b>Use sample report</b><small>${esc(smp.visitLabel)} · demo</small></span>
          ${icon('right', 'chev')}
        </button>` : ''}
        <label class="opt" tabindex="0" style="--d:60ms">
          <span class="opt-ic pink">${icon('camera')}</span>
          <span class="opt-t"><b>Upload a photo</b><small>Details get blurred first</small></span>
          ${icon('right', 'chev')}
          <input type="file" accept="image/*,.pdf" data-act="photo" class="sr">
        </label>
        <div class="opt tell" style="--d:120ms">
          <button class="tell-h" data-act="tellopen" aria-expanded="false">
            <span class="opt-ic mint">${icon('chat')}</span>
            <span class="opt-t"><b>Tell me what they said</b><small>Hinglish is welcome</small></span>
            ${icon('down', 'chev')}
          </button>
          <div class="expand"><div>
            <label class="sr" for="tellbox">What did the doctor say?</label>
            <div class="field"><textarea id="tellbox" rows="3" placeholder="Type or tap the mic: “Doctor ne bola probably PCOD hai…”"></textarea>${micBtn('tellbox')}</div>
            <button class="btn sm" data-act="tell">Explain this ${icon('right')}</button>
          </div></div>
        </div>
      </div>
      <p class="privacy-line">${icon('lock')} No account. Your details stay on this phone.</p>
    </section>`;
  }

  function parseTell(t) {
    const s = t.toLowerCase();
    const has = (re) => re.test(s);
    const items = []; const lv = { ...K.typicalLevels };
    if (has(/irregular|late|skip|miss|delay|nahi aa|not com/)) { items.push({ id: 'cycle', icon: 'calendar', plain: 'Irregular periods', tag: 'Irregular periods', node: 'period' }); lv.period = 3; lv.follicle = 3; }
    if (has(/acne|pimple|daane|skin/)) { items.push({ id: 'acne', icon: 'spark', plain: 'Acne', tag: 'Acne', node: 'ovary' }); lv.ovary = 3; }
    if (has(/hair|baal|facial/)) { items.push({ id: 'hair', icon: 'leaf', plain: 'Extra hair on face or body', tag: 'Extra hair', node: 'ovary' }); lv.ovary = 3; }
    if (has(/insulin|sugar|diabet/)) { items.push({ id: 'insulin', icon: 'bolt', plain: 'Something about insulin or sugar', tag: 'Insulin', node: 'insulin' }); lv.insulin = 3; }
    if (has(/hormone|testosterone|\blh\b|androgen/)) { items.push({ id: 'lh', icon: 'signal', plain: 'Hormone tests a bit off', tag: 'Hormones off', node: 'brain' }); lv.brain = 3; }
    const weight = has(/weight|wajan|vajan|fat|mota|kg|bmi/);
    let status = 'unsure';
    if (has(/probabl|shayad|maybe|might|lagta|could be|at risk|borderline/)) status = 'risk';
    else if (has(/confirm|diagnos|you have|pakka|definitely/)) status = 'diagnosed';
    if (!items.length) items.push({ id: 'note', icon: 'pen', plain: 'Doctor mentioned PCOD', tag: 'PCOD mentioned', node: null });
    const d = new Date();
    return {
      id: 'text', month: d.toLocaleString('en', { month: 'short' }) + ' ' + d.getFullYear(), visitLabel: 'Your visit',
      chapterTitle: S.chapters.length ? 'What changed' : 'Your loop',
      paper: null, status, items, levels: lv, facts: {}, weightSkipped: weight,
      doctorQs: [
        'What exactly did my tests show, in simple words?',
        status === 'risk' ? 'What would make it definite, and when do we re-check?' : 'What is the plan from here, and when do we review it?',
        'What can help my symptoms right now?'
      ]
    };
  }

  /* ---------- 2. READ ---------- */
  function paperHtml(r, scanning) {
    return `<div class="paper ${scanning ? 'scanning' : 'blurred'}" aria-label="Report">
      ${scanning ? '<div class="scanline" aria-hidden="true"></div>' : ''}
      <div class="p-head"><b class="pii">${esc(r.paper.clinic)}</b><span class="pii">${esc(r.paper.clinicPhone)}</span></div>
      <div class="p-meta"><span>Patient: <b class="pii">${esc(r.paper.patient)}</b></span><span>DOB: <b class="pii">${esc(r.paper.dob)}</b></span><span>Ph: <b class="pii">${esc(r.paper.phone)}</b></span><span>Date: ${esc(r.paper.date)}</span></div>
      <table>${r.paper.rows.map(([a, b, c]) => `<tr class="${/Weight/.test(a) ? 'skipme' : ''}"><td>${esc(a)}</td><td>${esc(b)}</td><td>${esc(c)}</td></tr>`).join('')}</table>
      <p class="p-imp"><b>Impression:</b> ${esc(r.paper.impression)}</p>
    </div>`;
  }

  function read() {
    const r = st.report;
    if (r.paper && st.phase === 'scan') {
      return `<section class="scr read">
        <h1 class="h-l">Hiding your details</h1>
        <p class="sub">${st.source === 'photo' ? 'Demo: reading the sample report.' : 'Name, phone and clinic first.'}</p>
        ${paperHtml(r, true)}
        <div class="scanmsg"><span class="typing"><i></i><i></i><i></i></span> Reading safely</div>
      </section>`;
    }
    const n = S.chapters.length + 1;
    return `<section class="scr read">
      <h1 class="h-l">Is this right?</h1>
      <div class="safe-row">
        ${r.paper ? `<button class="chip t-mint" data-act="sheet" data-arg="paper">${icon('lock')} Details hidden</button>` : ''}
        ${(r.paper || r.weightSkipped) ? `<span class="chip t-pink">${icon('heart')} Weight skipped</span>` : ''}
      </div>
      <div class="statusbox">
        <h2 class="qlabel">What did your doctor say?</h2>
        <div class="seg tri" role="radiogroup" aria-label="What did your doctor say?">
          ${['risk', 'diagnosed', 'unsure'].map((k) => `<button role="radio" aria-checked="${st.status === k}" class="${st.status === k ? 'on' : ''}" data-act="status" data-arg="${k}">${K.statusInfo[k].ask}</button>`).join('')}
        </div>
        <p class="tip" id="statustip">${esc(K.statusInfo[st.status].tip)}</p>
      </div>
      <h2 class="qlabel">What I found <span>Tap “Not right?” if something’s wrong</span></h2>
      <ul class="items">
        ${r.items.map((it, k) => {
          const no = !!st.rejected[it.id];
          return `<li class="item ${no ? 'no' : ''}" style="--d:${k * 40}ms" data-item="${it.id}">
            <span class="item-ic">${icon(it.icon)}</span>
            <p>${esc(it.friendly || it.plain)}</p>
            <button class="wrong" data-act="tick" data-arg="${it.id}" aria-pressed="${no}">${no ? 'Undo' : 'Not right?'}</button>
          </li>`;
        }).join('')}
      </ul>
      <div class="cta"><button class="btn block" data-act="startch">Start Chapter ${n} ${icon('right')}</button></div>
    </section>`;
  }

  /* ---------- 3. CHAPTER ---------- */
  const prevOf = (c) => (c ? S.chapters[c.n - 2] || null : null);
  const cardsFor = (c) => (prevOf(c) ? ['changed', 'loop', 'carried'] : ['name', 'loop', 'fault']);
  const CTX = {
    name: ['A1', 'B2', 'A14'], loop: ['A3', 'A6', 'B6'], fault: ['A11', 'B7', 'B1'],
    changed: ['C1', 'A10', 'B4'], carried: ['B5', 'A14', 'C1']
  };

  /* The loop, drawn as a picture story: Brain → Ovaries → Egg sacs → Period → repeat, with insulin as a booster. */
  const CHAIN = ['brain', 'ovary', 'follicle', 'period'];
  const LINKS = { brain: 'so', ovary: 'so', follicle: 'so' };

  function loopData(c, mode) {
    if (!c) return { lv: K.typicalLevels, pins: {} };
    const p = prevOf(c);
    let lv = c.levels; let items = c.items;
    if (mode === 'then' && p) { lv = p.levels; items = p.items; }
    const pins = {};
    items.forEach((it) => { if (it.node) (pins[it.node] = pins[it.node] || []).push(it); });
    return { lv, pins };
  }
  function meter(k, l) {
    return `<span class="lvl" title="How busy this part is for you"><span class="dots3" aria-hidden="true">${[1, 2, 3].map((n) => `<i class="${n <= l ? 'on' : ''}"></i>`).join('')}</span>${K.loopNodes[k].levels[l - 1]}</span>`;
  }
  function stepHtml(k, lv, pins, i, personal) {
    const N = K.loopNodes[k];
    const mine = pins[k] || [];
    const S2 = SCENES[k];
    const strip = (h) => h.replace(/<[^>]+>/g, '');
    const spoken = `${N.name}. ${strip(N.short)} ${mine.length ? 'From your report: ' + mine.map((x) => x.friendly || x.plain).join('. ') + '.' : ''} What helps: ${N.helps}`;
    return `<li class="step n-${k}" style="--d:${i * 70}ms" data-say="${esc(spoken)}">
      <div class="step-top">
        <b class="step-name">${N.name}</b>
        ${personal ? meter(k, lv[k] || 2) : ''}
        ${sayBtn()}
      </div>
      <div class="vs" role="img" aria-label="Usually: ${S2.cap[0]}. With PCOD: ${S2.cap[1]}.">
        <figure class="vs-a"><figcaption class="vs-t">Usually</figcaption>${scene(k, 'usual')}<span>${S2.cap[0]}</span></figure>
        <figure class="vs-b"><figcaption class="vs-t">With PCOD</figcaption>${scene(k, 'pcod')}<span>${S2.cap[1]}</span></figure>
      </div>
      ${mine.length ? `<div class="yours"><small>You</small><ul>${mine.map((x) => `<li>${esc(x.friendly || x.plain)}</li>`).join('')}</ul></div>` : ''}
      <button class="step-more" data-act="stepmore" aria-expanded="false">Explain more ${icon('down')}</button>
      <div class="expand"><div class="step-x">
        <p>${N.short}</p>
        <p><b>How it normally works</b>${N.normal}</p>
        <p class="helps"><b>What helps</b>${N.helps}</p>
        <p class="word">Doctor’s word: <i>${N.word}</i></p>
      </div></div>
    </li>`;
  }
  function loopViz(c) {
    const p = prevOf(c);
    const mode = p ? st.loopMode : 'mine';
    const { lv, pins } = loopData(c, mode);
    const personal = !!c;
    const chain = CHAIN.map((k, i) => stepHtml(k, lv, pins, i, personal) +
      (LINKS[k] ? `<li class="link" aria-hidden="true">${icon('down')}<span>${LINKS[k]}</span></li>` : '')).join('');
    return `<div class="loopwrap" data-ch="${c ? c.n : 0}">
      ${p ? `<div class="seg" role="tablist" aria-label="Compare visits">${[['then', esc(p.visitLabel)], ['mine', esc(c.visitLabel)]].map(([k, l]) => `<button role="tab" aria-selected="${mode === k}" class="${mode === k ? 'on' : ''}" data-act="loopmode" data-arg="${k}">${l}</button>`).join('')}</div>` : ''}
      <ol class="chain">
        ${chain}
        <li class="repeat">${icon('loop')}<span>Without an egg, your brain doesn’t get the “all done” message, so it keeps sending. <b>That’s the loop.</b></span></li>
      </ol>
      <div class="boost">
        <span class="boost-tag">${icon('plus')} Also part of it</span>
        <ul class="chain">${stepHtml('insulin', lv, pins, 5, personal)}</ul>
      </div>
      <p class="calm">${icon('heart')}<span>This is <b>very common</b> and can be managed well. Nothing here is your fault.</span></p>
    </div>`;
  }
  function patchLoop() {
    const w = $('.loopwrap'); if (!w) return;
    const n = +w.dataset.ch;
    w.outerHTML = loopViz(n ? S.chapters[n - 1] : null);
  }

  function cardHtml(c) {
    const p = prevChapter();
    const cards = cardsFor(c);
    const key = cards[st.card];
    const s = K.statusInfo[c.status];
    let say = ''; let body = '';

    if (key === 'name') {
      say = 'Hi, I’m Tara, an AI guide, <b>not a doctor</b>. First: three names, <b>one thing</b>.';
      body = `<div class="names">
        <div class="nm-pill"><b>PCOD</b><small>India</small></div><span class="eq">=</span>
        <div class="nm-pill"><b>PCOS</b><small>Doctors</small></div><span class="eq">=</span>
        <div class="nm-pill new"><b>PMOS</b><small>New, 2026</small></div>
      </div>
      <p class="note">${icon('bulb')} No real cysts, just <b>paused egg sacs</b>.</p>`;
    } else if (key === 'loop') {
      say = p ? 'Switch between visits and <b>see what changed</b>.' : 'Here’s what’s happening in your body, <b>in plain words</b>. Read at your own pace.';
      body = loopViz(c);
    } else if (key === 'fault') {
      say = 'The most important part:';
      body = `<div class="bigmsg">${icon('heart')}<b>You didn’t cause this.</b><p>Genes plus environment. Not your food, not stress, not your mum.</p></div>`;
    } else if (key === 'changed') {
      const ps = K.statusInfo[p.status];
      const rows = [['cycle', 'period', 'Period gap'], ['lh', 'brain', 'Brain messages'], ['testo', 'ovary', 'Skin-and-hair hormone'], ['insulin', 'insulin', 'Insulin']]
        .filter(([k]) => p.facts[k] && c.facts[k])
        .map(([k, n, l], i) => `<li style="--d:${i * 60}ms">${illus(n, 'sm')}<span class="d-l">${l}</span><span class="d-v"><span class="was">${esc(p.facts[k])}</span>${icon('right')}<span class="now">${esc(c.facts[k])}</span></span></li>`).join('');
      say = `Welcome back! ${c.improved ? 'Since your ' + esc(p.visitLabel) + ', your loop got <b>quieter</b>.' : 'Here’s your new report next to your ' + esc(p.visitLabel) + '.'}`;
      body = `<div class="visits">
          <div class="vcard old"><small>${esc(p.visitLabel)}</small><span class="chip t-${ps.tone}">${ps.short}</span></div>${icon('right', 'varrow')}
          <div class="vcard"><small>${esc(c.visitLabel)}</small><span class="chip t-${s.tone}">${s.short}</span></div>
        </div>
        ${p.status !== c.status ? `<p class="tip">${esc(s.tip)}${c.status === 'diagnosed' ? ' “PCOS” on your report means PCOD.' : ''}</p>` : ''}
        ${rows ? `<ul class="diff">${rows}</ul>` : ''}
        ${c.improved ? `<p class="note">${icon('pill')} Some of this may be your treatment. Ask your doctor which part.</p>` : ''}`;
    } else if (key === 'carried') {
      const qs = p.doctorQs.filter((q) => !q.skip);
      say = 'Did you get answers to <b>last time’s questions</b>?';
      body = `<ul class="carried">${qs.map((q, i) => `<li style="--d:${i * 50}ms"><p>${esc(q.text)}</p><div class="seg sm"><button class="${q.answered === true ? 'on' : ''}" data-act="carry" data-arg="${i}:y">Answered</button><button class="${q.answered === false ? 'on' : ''}" data-act="carry" data-arg="${i}:n">Not yet</button></div></li>`).join('')}</ul>
        <p class="hint">“Not yet” ones move to this chapter.</p>`;
    }
    const last = st.card === cards.length - 1;
    return `<div class="card" data-key="${key}">
        <div class="say">${tara(52)}<p class="bubble" data-say>${say} ${sayBtn()}</p></div>
        ${body}
      </div>
      <div class="cta row3">
        <button class="btn ghost icon-only" data-act="prev" aria-label="Previous" ${st.card === 0 ? 'disabled' : ''}>${icon('left')}</button>
        <button class="btn ghost" data-act="askabout" data-arg="${key}">${icon('chat')} Ask</button>
        ${last ? `<button class="btn" data-act="finish">Finish ${icon('star')}</button>` : `<button class="btn" data-act="next">Next ${icon('right')}</button>`}
      </div>`;
  }

  function chapterScreen() {
    const c = chapter();
    const s = K.statusInfo[c.status];
    const cards = cardsFor(c);
    return `<section class="scr chapter">
      <div class="ch-head">
        <button class="back" data-act="go" data-arg="home">${icon('left')} Story</button>
        <span class="chip t-${s.tone}">${s.short}</span>
      </div>
      <p class="eyebrow">Chapter ${c.n} · ${esc(c.visitLabel)}</p>
      <h1 class="h-l">${esc(c.title)}</h1>
      ${st.paused ? `<div class="paused">${icon('pause')}<span>Paused. Take your time.</span><button class="btn xs ghost" data-act="resume">Continue</button></div>` : ''}
      <div class="dots" aria-hidden="true">${cards.map((_, i) => `<span class="${i === st.card ? 'on' : i < st.card ? 'past' : ''}"></span>`).join('')}</div>
      <div id="cardslot">${cardHtml(c)}</div>
    </section>`;
  }
  function goCard(delta) {
    const c = chapter();
    const n = cardsFor(c).length;
    const to = Math.max(0, Math.min(n - 1, st.card + delta));
    if (to === st.card) return;
    st.card = to;
    if (cardsFor(c)[to] === 'loop') st.loopMode = 'mine';
    const slot = $('#cardslot');
    slot.innerHTML = cardHtml(c);
    $('.card', slot).classList.add('enter', delta > 0 ? 'fwd' : 'rev');
    $$('.dots span').forEach((d, i) => { d.className = i === to ? 'on' : i < to ? 'past' : ''; });
    $('#view').scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------- 4. ASK ---------- */
  const fillVars = (t) => { const c = chapter(); return t.replace('{cycle}', (c && c.facts && c.facts.cycle) || 'longer than usual'); };
  function answerFor(q) {
    const s = q.toLowerCase();
    const distress = K.answers.find((a) => a.id === 'C5');
    if (distress.keys.some((k) => s.includes(k))) return distress;
    const urgent = K.answers.find((a) => a.id === 'C6');
    if (urgent.keys.some((k) => s.includes(k)) || (/no period/.test(s) && /bleed/.test(s))) return urgent;
    let best = null; let score = 0;
    K.answers.forEach((a) => {
      const sc = a.keys.reduce((n, k) => n + (s.includes(k) ? k.length : 0), 0);
      if (sc > score) { score = sc; best = a; }
    });
    return best;
  }

  function msgHtml(m, i) {
    if (m.who === 'me') return `<li class="msg me" data-i="${i}"><p>${esc(m.text)}</p></li>`;
    if (m.kind === 'distress') {
      return `<li class="msg care" data-i="${i}"><div class="carecard">
          <div class="care-h">${tara(44, 'care')}<p><b>Thank you for telling me.</b> That sounds really heavy. You don’t have to carry it alone. I’ve paused the chapter.</p></div>
          <a class="care-row" href="tel:14416">${icon('phone')}<span><b>Talk now: Tele-MANAS 14416</b><small>Free · 24×7 · many languages</small></span></a>
          <button class="care-row" data-act="trusted" data-arg="${i}">${icon('users')}<span><b>Tell someone you trust</b><small>I can help with the words</small></span></button>
          <div class="expand ${m.trusted ? 'open' : ''}"><div><div class="words">“I’ve been feeling really bad about my body and haven’t been eating properly. Can we talk?”<button class="btn xs ghost" data-act="copytext" data-arg="I’ve been feeling really bad about my body and haven’t been eating properly. Can we talk?">${icon('copy')} Copy</button></div></div></div>
          <p class="hint">In danger right now? Call <a href="tel:112">112</a>.</p>
          <button class="linkbtn" data-act="resume">I’m okay to keep going</button>
        </div></li>`;
    }
    const ci = K.certInfo[m.cert] || K.certInfo.none;
    const parts = String(m.text).split('<br><br>');
    const first = parts[0]; const rest = parts.slice(1).join('<br><br>');
    return `<li class="msg tara ${m.kind} ${m.open ? 'open' : ''}" data-i="${i}" data-say>
      <span class="badge ${ci.cls}">${m.kind === 'urgent' ? icon('info') : m.cert === 'doctor' ? icon('shield') : icon('star')}${esc(m.certLabel || ci.label)}</span>
      <p>${first}</p>
      <div class="expand ${m.open ? 'open' : ''}"><div>${rest ? `<p>${rest}</p>` : ''}${m.src ? `<small class="src">Source: ${esc(m.src)}</small>` : ''}</div></div>
      <div class="m-acts">
        ${sayBtn()}
        <button class="mini ghost more" data-act="more" data-arg="${i}">${m.open ? 'Less' : (rest ? 'Tell me more' : 'Source')}</button>
        ${m.doctorQ ? `<button class="mini ${m.added ? 'done' : ''}" data-act="addq" data-arg="${i}" ${m.added ? 'disabled' : ''}>${m.added ? icon('check') + ' Added' : icon('plus') + ' Doctor list'}</button>` : ''}
        <button class="mini ghost flag ${m.flagged ? 'done' : ''}" data-act="flag" data-arg="${i}" aria-label="This seems wrong" ${m.flagged ? 'disabled' : ''}>${icon('flag')}${m.flagged ? ' Flagged' : ''}</button>
      </div>
    </li>`;
  }

  function sugIds() {
    const base = st.ctx ? CTX[st.ctx] : ['A11', 'B1', 'A3'];
    const askedIds = st.chat.filter((m) => m.who === 'tara').map((m) => m.id);
    const pool = base.concat(['A1', 'B6', 'C2', 'B4', 'A9']).filter((id, k, a) => a.indexOf(id) === k && !askedIds.includes(id));
    return pool.slice(0, 3);
  }
  function chipsHtml() {
    return sugIds().map((id) => K.answers.find((a) => a.id === id)).filter(Boolean)
      .map((a) => `<button class="qchip" data-act="chip" data-arg="${a.id}">${esc(a.chip)}</button>`).join('') +
      `<button class="qchip more" data-act="sheet" data-arg="questions">${icon('plus')} More</button>`;
  }

  function askScreen() {
    return `<section class="scr ask">
      ${st.ctx ? `<div class="ch-head">
        <button class="back" data-act="go" data-arg="chapter">${icon('left')} Chapter</button>
        <button class="btn xs" data-act="finish">Finish ${icon('star')}</button>
      </div>` : '<h1 class="h-l">Ask Tara</h1>'}
      <ul class="chatlog" id="chatlog" aria-live="polite">
        <li class="msg intro"><div class="say">${tara(44)}<p class="bubble">Ask me anything, even the awkward stuff. Type it or say it. I’ll always tell you <b>how sure I am</b>.</p></div></li>
        ${st.chat.map(msgHtml).join('')}
      </ul>
      <div class="asktools">
        <div class="chips" id="chips">${chipsHtml()}</div>
        <form class="composer" data-act="askform">
          <label class="sr" for="askbox">Your question</label>
          <div class="field"><input id="askbox" autocomplete="off" placeholder="Type or tap the mic…">${micBtn('askbox')}</div>
          <button class="send" aria-label="Send">${icon('send')}</button>
        </form>
      </div>
    </section>`;
  }

  function appendMsg(html) {
    const log = $('#chatlog'); if (!log) return;
    log.insertAdjacentHTML('beforeend', html);
    const el = log.lastElementChild; el.classList.add('in');
    log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' });
  }
  async function ask(q, viaChip) {
    if (st.typing) return;
    const a = viaChip || answerFor(q);
    st.chat.push({ who: 'me', text: q });
    appendMsg(msgHtml(st.chat[st.chat.length - 1], st.chat.length - 1));
    st.typing = true;
    appendMsg('<li class="msg tara typing-row" id="typingrow"><span class="typing"><i></i><i></i><i></i></span></li>');
    await wait(a && a.kind === 'distress' ? 900 : 700);
    const tr = $('#typingrow'); if (tr) tr.remove();
    let m;
    if (a && a.kind === 'distress') { st.paused = true; m = { who: 'tara', kind: 'distress' }; }
    else if (a) m = { who: 'tara', id: a.id, text: fillVars(a.text), cert: a.cert, certLabel: a.certLabel || a.mythLabel, src: a.src, doctorQ: a.doctorQ, kind: a.kind };
    else m = { who: 'tara', id: null, text: K.fallback.text, cert: 'none', src: K.fallback.src, doctorQ: q, kind: 'answer' };
    st.chat.push(m);
    appendMsg(msgHtml(m, st.chat.length - 1));
    st.typing = false;
    const chips = $('#chips'); if (chips) chips.innerHTML = chipsHtml();
  }
  function rerenderMsg(i) {
    const el = $(`.chatlog [data-i="${i}"]`); if (!el) return;
    el.outerHTML = msgHtml(st.chat[i], i);
  }

  /* ---------- 5. DONE ---------- */
  function mumText(c, lang) {
    const M = K.mum[lang];
    return [M.open, M[c.status], c.improved ? M.improved : '', M.asks].filter(Boolean).join(' ');
  }
  function doneScreen() {
    const c = chapter();
    const nq = c.doctorQs.filter((q) => !q.skip).length;
    return `<section class="scr done">
      <div class="reward" aria-hidden="true">
        <div class="burst"></div>
        <svg viewBox="0 0 120 100" width="128" height="106"><rect x="18" y="44" width="84" height="46" rx="10" fill="#f39c3d"/><rect x="18" y="44" width="84" height="12" fill="#e2812a"/><path class="lid" d="M14 46 Q60 6 106 46Z" fill="#f6b04f"/><rect x="52" y="50" width="16" height="18" rx="4" fill="#ffd96a"/><circle cx="60" cy="58" r="3" fill="#b8641f"/><g class="sparkles" fill="#ffd84d"><circle cx="20" cy="20" r="3"/><circle cx="100" cy="16" r="2.5"/><circle cx="108" cy="36" r="2"/><circle cx="12" cy="40" r="2"/></g></svg>
      </div>
      <p class="eyebrow center">Chapter ${c.n} complete</p>
      <h1 class="h-l center">${c.n === 1 ? 'You know your loop!' : 'Your story moved on'}</h1>
      <p class="sub center">Take it with you:</p>
      <div class="tiles">
        <button class="tile" data-act="tab" data-arg="doctor" style="--d:0ms"><span class="tile-ic lav">${icon('doc')}</span><b>Questions for my doctor</b><small>${nq} ready</small>${icon('right', 'chev')}</button>
        <button class="tile" data-act="sheet" data-arg="teach" style="--d:70ms"><span class="tile-ic sun">${icon('bulb')}</span><b>Explain it back</b><small>${c.teach ? 'Done' : '30 seconds'}</small>${icon('right', 'chev')}</button>
        <button class="tile" data-act="sheet" data-arg="mum" style="--d:140ms"><span class="tile-ic pink">${icon('mail')}</span><b>A message for Mum</b><small>Optional</small>${icon('right', 'chev')}</button>
      </div>
      <div class="cta col">
        ${keepToggle('done')}
        <button class="btn block" data-act="tab" data-arg="home">${icon('book')} Back to my story</button>
        <button class="linkbtn danger" data-act="wipe">End and clear everything</button>
      </div>
    </section>`;
  }

  /* ---------- tab: MY BODY ---------- */
  function bodyScreen() {
    const c = S.last();
    return `<section class="scr body">
      <h1 class="h-l">How PCOD works</h1>
      <p class="sub">${c ? `Set to your ${esc(c.visitLabel)}.` : 'The general picture. Add a report to see yours.'}</p>
      <div class="card">${loopViz(c)}</div>
      ${c ? '' : `<div class="cta"><button class="btn block" data-act="go" data-arg="add">${icon('plus')} Add my report</button></div>`}
    </section>`;
  }

  /* ---------- tab: DOCTOR ---------- */
  function qlistHtml(c) {
    return `<ul class="qlist">${c.doctorQs.map((q, i) => `<li><label><input type="checkbox" data-act="qtoggle" data-arg="${i}" ${q.skip ? '' : 'checked'}><span>${esc(q.text)}${q.from === 'chat' ? '<small>You asked</small>' : q.from === 'own' ? '<small>Your question</small>' : q.from === 'carried' ? '<small>From last time</small>' : ''}</span></label></li>`).join('')}</ul>`;
  }
  function doctorScreen() {
    const c = S.last();
    if (!c) {
      return `<section class="scr doctor">
        <h1 class="h-l">For your doctor</h1>
        <div class="empty">${illus('brain')}<p>Add a report and I’ll write questions to take to your next visit.</p></div>
        <div class="cta"><button class="btn block" data-act="go" data-arg="add">${icon('plus')} Add my report</button></div>
      </section>`;
    }
    return `<section class="scr doctor">
      <h1 class="h-l">For your doctor</h1>
      <p class="sub">Tick the ones you want to ask at your next visit.</p>
      ${qlistHtml(c)}
      <form class="ownq" data-act="ownform">
        <label class="qlabel" for="ownbox">Add my own question</label>
        <div class="composer">
          <div class="field"><input id="ownbox" autocomplete="off" placeholder="Type or tap the mic…">${micBtn('ownbox')}</div>
          <button class="send" aria-label="Add question">${icon('plus')}</button>
        </div>
      </form>
      <div class="cta"><div class="row2"><button class="btn ghost" data-act="copyqs">${icon('copy')} Copy</button><button class="btn" data-act="dlqs">${icon('download')} Save</button></div></div>
    </section>`;
  }

  /* ---------- sheets & overlays ---------- */
  function sheetBody() {
    const c = chapter();
    switch (st.sheet) {
      case 'privacy': {
        const lc = S.last();
        return `<h2 class="h-m">${icon('shield')} What I know right now</h2>
          ${lc ? `<div class="pins">${lc.items.map((i) => `<span class="chip">${esc(i.tag || i.plain)}</span>`).join('')}</div>` : '<p class="hint">Nothing yet.</p>'}
          <p class="hint"><b>I don’t know</b> your name, phone, school or weight.</p>
          <p class="hint"><b>Saved:</b> ${S.keep ? `${S.chapters.length} chapter(s), on this phone only.` : 'nothing.'}</p>
          ${Voice.canListen ? '<p class="hint"><b>Voice typing:</b> your browser turns speech into text, and may use an online service to do it. Typing never leaves this phone.</p>' : ''}
          <button class="btn block danger" data-act="wipe">Delete everything</button>`;
      }
      case 'paper':
        return `<h2 class="h-m">${icon('lock')} Your report, blurred</h2>${paperHtml(st.report, false)}<p class="hint">Weight and BMI are skipped. They’re not part of your story here.</p>`;
      case 'questions': {
        const groups = { A: 'Understand', B: 'Tricky', C: 'Safety' };
        return `<h2 class="h-m">${icon('chat')} Ask something</h2>
          <div class="seg sm" role="tablist">${Object.keys(groups).map((g) => `<button role="tab" aria-selected="${st.group === g}" class="${st.group === g ? 'on' : ''}" data-act="group" data-arg="${g}">${groups[g]}</button>`).join('')}</div>
          <div class="qgrid" id="qgrid">${qgrid()}</div>`;
      }
      case 'voice':
        return `<h2 class="h-m">${icon('mic')} Before you speak</h2>
          <p class="hint">Your browser turns your voice into text. To do that it may send the audio to its online speech service (Google or Microsoft).</p>
          <p class="hint">Anything you <b>type</b> stays on this phone. Don’t say names or phone numbers out loud.</p>
          <div class="row2"><button class="btn sm ghost" data-act="voiceno">Type instead</button><button class="btn sm" data-act="voiceok">${icon('mic')} Use my voice</button></div>`;
      case 'teach':
        return `<h2 class="h-m">${icon('bulb')} Explain it back</h2>
          <p class="hint">In one line, how would you explain your loop to a friend?</p>
          <div class="teach"><label class="sr" for="teachbox">Your explanation</label><div class="field"><input id="teachbox" value="${esc(c.teach)}" placeholder="Type or say it…">${micBtn('teachbox')}</div><button class="btn sm" data-act="teach">Check</button></div>
          <div class="expand ${st.teachFb ? 'open' : ''}" id="teachwrap"><div><p class="teachfb" id="teachfb">${st.teachFb || ''}</p></div></div>`;
      case 'mum':
        return `<h2 class="h-m">${icon('mail')} A message for Mum</h2>
          <p class="hint">Only if you want to. Copy it, then change anything before you send it. Or play it out loud to her.</p>
          <div class="seg sm" role="tablist" aria-label="Language">${[['en', 'English'], ['hi', 'हिंदी'], ['hl', 'Hinglish']].map(([k, l]) => `<button role="tab" aria-selected="${st.mumLang === k}" class="${st.mumLang === k ? 'on' : ''}" data-act="mumlang" data-arg="${k}">${l}</button>`).join('')}</div>
          <div class="letter" id="letter" lang="${st.mumLang === 'hi' ? 'hi' : 'en'}" data-say data-lang="${st.mumLang === 'hi' ? 'hi-IN' : 'en-IN'}">${esc(mumText(c, st.mumLang))}</div>
          <div class="row2"><button class="btn sm ghost" data-act="saymum">${icon('speaker')} Play aloud</button><button class="btn sm" data-act="copymum">${icon('copy')} Copy</button></div>`;
      default: return '';
    }
  }
  function qgrid() {
    return K.answers.filter((a) => a.group === st.group).map((a) => `<button class="qrow" data-act="chip" data-arg="${a.id}">${esc(a.chip)}${icon('right', 'chev')}</button>`).join('');
  }
  function renderLayer() {
    const a = st.sheetAnim ? ' in' : '';
    $('#layer').innerHTML = `
      ${st.hidden ? `<div class="notes in" role="dialog" aria-label="Notes">
        <div class="notes-h"><span>‹ Notes</span><button data-act="unhide">Done</button></div>
        <h2>Groceries</h2><ul><li>Milk 1L</li><li>Atta 5kg</li><li>Tomatoes, onions</li><li>Maggi ×2</li><li>Return library book</li></ul>
      </div>` : ''}
      ${st.sheet ? `<div class="scrim${a}" data-act="closesheet"></div>
      <div class="sheet${a}" role="dialog" aria-modal="true">
        <div class="grab"></div>
        <button class="sheet-x iconbtn" data-act="closesheet" aria-label="Close">${icon('x')}</button>
        ${sheetBody()}
      </div>` : ''}`;
    st.sheetAnim = false;
  }
  function openSheet(name) { st.sheet = name; st.sheetAnim = true; renderLayer(); }
  async function closeSheet() {
    const sh = $('.sheet'); const sc = $('.scrim');
    if (sh) { sh.classList.add('out'); sc && sc.classList.add('out'); await wait(220); }
    if (sh && sh.contains(Voice.sayBtn)) Voice.stopSpeaking();
    st.sheet = null; renderLayer();
  }

  /* ---------- render ---------- */
  const VIEWS = { home, body: bodyScreen, ask: askScreen, doctor: doctorScreen, add, read, chapter: chapterScreen, done: doneScreen };
  function render() {
    Voice.stopSpeaking(); Voice.stopListening();
    const view = $('#view');
    const changed = st.screen !== lastScreen;
    const dir = ORDER.indexOf(st.screen) >= ORDER.indexOf(lastScreen) ? 'fwd' : 'rev';
    const keep = view.scrollTop;
    $('#app').classList.toggle('on-home', st.screen === 'home');
    updateTop();
    view.innerHTML = VIEWS[st.screen]();
    const scr = view.firstElementChild;
    if (changed || st.anim) { scr.classList.add('enter', st.anim || dir); view.scrollTop = 0; }
    else view.scrollTop = keep;
    st.anim = null;
    lastScreen = st.screen;
    renderLayer();
    if (st.screen === 'ask') { const log = $('#chatlog'); if (log) log.scrollTop = log.scrollHeight; }
  }
  function go(screen, extra) { Object.assign(st, extra || {}, { screen }); render(); }

  /* ---------- actions ---------- */
  function startRead(report, source) {
    st.report = report; st.source = source; st.rejected = {}; st.status = report.status;
    st.phase = report.paper ? 'scan' : 'list';
    go('read');
    if (report.paper) {
      setTimeout(() => { const p = $('.paper.scanning'); if (p) p.classList.add('blurred'); }, 1200);
      setTimeout(() => { if (st.screen === 'read' && st.phase === 'scan') { st.phase = 'list'; st.anim = 'fade'; render(); } }, 2500);
    }
  }
  function createChapter() {
    const r = st.report;
    const c = S.add({
      reportId: r.id === 'text' ? null : r.id, month: r.month, visitLabel: r.visitLabel,
      title: S.chapters.length ? 'What changed' : r.chapterTitle, status: st.status,
      levels: r.levels, facts: r.facts, items: r.items.filter((i) => !st.rejected[i.id]), improved: r.improved, doctorQs: r.doctorQs
    });
    Object.assign(st, { chIndex: c.n - 1, card: 0, loopMode: 'mine', node: null, chat: [], ctx: null, paused: false, teachFb: null });
    go('chapter');
  }
  function copy(text, msg) {
    const done = () => toast(msg || 'Copied');
    const fb = () => { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) { /* ignore */ } ta.remove(); done(); };
    try { navigator.clipboard.writeText(text).then(done, fb); } catch (e) { fb(); }
  }
  const qText = (c) => 'Questions for my doctor\n\n' + c.doctorQs.filter((q) => !q.skip).map((q, i) => `${i + 1}. ${q.text}`).join('\n');

  /* After the voice notice: go back to where she was, then start listening (or just focus the box). */
  async function voiceBack(listen) {
    const p = st.voicePending; st.voicePending = null;
    if (!p) { await closeSheet(); return; }
    if (p.sheet) openSheet(p.sheet); else await closeSheet();
    const inp = $('#' + p.target); if (!inp) return;
    inp.value = p.value;
    if (listen) Voice.listen(inp, $('.mic', inp.parentNode)); else inp.focus();
  }

  const acts = {
    go: (a) => { if (a === 'chapter') st.ctx = null; go(a); },
    tab: (a) => { if (a === st.screen) { $('#view').scrollTo({ top: 0, behavior: 'smooth' }); return; } Object.assign(st, { chIndex: null, ctx: null, loopMode: 'mine', anim: 'fade' }); go(a); },
    hide: () => { Voice.stopSpeaking(); Voice.stopListening(); st.hidden = true; $('#toast').classList.remove('show'); renderLayer(); },
    /* voice */
    say: (a, el) => {
      const box = el.closest('[data-say]'); if (!box) return;
      const text = box.dataset.say || plainText(box);
      Voice.speak(text, box.dataset.lang, el);
    },
    saymum: (a, el) => {
      const L = $('#letter'); const same = Voice.sayBtn === el;
      Voice.stopSpeaking(); if (same) return;
      Voice.speak(L.textContent, L.dataset.lang, el);
      el.innerHTML = icon('stop') + ' Stop';
    },
    mic: (a, el) => {
      const inp = $('#' + a); if (!inp) return;
      if (!st.voiceOk) { st.voicePending = { target: a, sheet: st.sheet, value: inp.value }; openSheet('voice'); return; }
      Voice.listen(inp, el);
    },
    voiceok: async () => { st.voiceOk = true; await voiceBack(true); },
    voiceno: async () => { await voiceBack(false); },
    unhide: () => { st.hidden = false; renderLayer(); },
    sheet: (a) => openSheet(a),
    closesheet: () => closeSheet(),
    opench: (a) => { Object.assign(st, { chIndex: +a, card: 0, loopMode: 'mine', chat: [], paused: false }); go('chapter'); },
    sample: () => { const r = nextSample(); if (r) startRead(r, 'sample'); },
    tellopen: (a, el) => {
      const box = el.closest('.tell'); const open = !box.classList.contains('open');
      box.classList.toggle('open', open); el.setAttribute('aria-expanded', open);
      if (open) setTimeout(() => $('#tellbox').focus(), 250);
    },
    tell: () => {
      const t = ($('#tellbox') || {}).value || '';
      if (t.trim().length < 4) { toast('Write a few words first'); return; }
      startRead(parseTell(t), 'text');
    },
    tick: (a, el) => {
      st.rejected[a] = !st.rejected[a];
      const no = st.rejected[a];
      el.closest('.item').classList.toggle('no', no);
      el.setAttribute('aria-pressed', no);
      el.textContent = no ? 'Undo' : 'Not right?';
      if (no) toast('Okay, I’ll leave that out');
    },
    status: (a) => {
      st.status = a;
      $$('.tri button').forEach((b) => { const on = b.dataset.arg === a; b.classList.toggle('on', on); b.setAttribute('aria-checked', on); });
      const tip = $('#statustip'); tip.classList.remove('swap'); void tip.offsetWidth; tip.textContent = K.statusInfo[a].tip; tip.classList.add('swap');
    },
    startch: createChapter,
    next: () => goCard(1),
    prev: () => goCard(-1),
    loopmode: (a) => { st.loopMode = a; patchLoop(); },
    stepmore: (a, el) => {
      const step = el.closest('.step'); const open = !step.classList.contains('open');
      step.classList.toggle('open', open); $('.expand', step).classList.toggle('open', open);
      el.setAttribute('aria-expanded', open);
      el.firstChild.textContent = open ? 'Show less ' : 'Explain more ';
    },
    carry: (a, el) => {
      const [i, v] = a.split(':'); const p = prevChapter(); const c = chapter();
      const q = p.doctorQs.filter((x) => !x.skip)[+i];
      q.answered = v === 'y';
      const at = c.doctorQs.findIndex((x) => x.text === q.text && x.from === 'carried');
      if (v === 'n' && at < 0) c.doctorQs.unshift({ text: q.text, from: 'carried' });
      if (v === 'y' && at >= 0) c.doctorQs.splice(at, 1);
      S.persist();
      $$('button', el.parentNode).forEach((b) => b.classList.toggle('on', b === el));
    },
    askabout: (a) => { st.ctx = a; go('ask'); },
    finish: () => { S.update((c) => { c.complete = true; }); go('done'); },
    resume: () => { st.paused = false; if (st.screen === 'ask') go('chapter'); else { const p = $('.paused'); if (p) { p.classList.add('out'); setTimeout(() => p.remove(), 250); } } },
    group: (a, el) => { st.group = a; $$('.sheet .seg button').forEach((b) => b.classList.toggle('on', b === el)); $('#qgrid').innerHTML = qgrid(); },
    chip: async (a) => {
      const ans = K.answers.find((x) => x.id === a); if (!ans) return;
      if (st.sheet) await closeSheet();
      if (st.screen !== 'ask') go('ask');
      ask(ans.chip, ans);
    },
    more: (a) => { const m = st.chat[+a]; m.open = !m.open; const el = $(`.chatlog [data-i="${a}"]`); el.classList.toggle('open', m.open); $('.expand', el).classList.toggle('open', m.open); $('.more', el).textContent = m.open ? 'Less' : (String(m.text).includes('<br><br>') ? 'Tell me more' : 'Source'); },
    addq: (a) => {
      const m = st.chat[+a]; const c = chapter();
      if (!c) { toast('Add a report first to start your doctor list'); return; }
      if (!c.doctorQs.some((q) => q.text === m.doctorQ)) c.doctorQs.push({ text: m.doctorQ, from: 'chat' });
      m.added = true; S.persist(); rerenderMsg(+a); toast('Added to your doctor list');
    },
    flag: (a) => { st.chat[+a].flagged = true; rerenderMsg(+a); toast('Thanks. Check this with your doctor.'); },
    trusted: (a) => { const m = st.chat[+a]; m.trusted = true; const el = $(`.chatlog [data-i="${a}"] .expand`); if (el) el.classList.add('open'); },
    copytext: (a) => copy(a),
    teach: () => {
      const v = ($('#teachbox') || {}).value || '';
      const c = chapter(); c.teach = v; S.persist();
      const s = v.toLowerCase();
      const parts = [['the brain signal', /brain|lh|signal|dimag/], ['androgens', /androgen|testosterone|hormone|ovar/], ['paused eggs', /egg|period|ovulat|cycle/], ['insulin', /insulin|sugar/]];
      const got = parts.filter(([, re]) => re.test(s)).map(([l]) => l);
      const miss = parts.filter(([, re]) => !re.test(s)).map(([l]) => l);
      st.teachFb = !v.trim() ? 'Give it a go. There’s no wrong answer.'
        : got.length >= 3 ? `Nailed it! You covered ${got.join(', ')}.`
        : got.length ? `Nice, you got ${got.join(' and ')}. Maybe add ${miss[0]}?`
        : `Good start! Try mentioning ${miss.slice(0, 2).join(' or ')}.`;
      $('#teachfb').textContent = st.teachFb; $('#teachwrap').classList.add('open');
    },
    qtoggle: (a, el) => { const c = chapter(); c.doctorQs[+a].skip = !el.checked; S.persist(); const qc = $('#qcount'); if (qc) qc.textContent = c.doctorQs.filter((q) => !q.skip).length + ' ready'; },
    copyqs: () => copy(qText(chapter()), 'Questions copied'),
    dlqs: () => {
      const u = URL.createObjectURL(new Blob([qText(chapter())], { type: 'text/plain' }));
      const a = document.createElement('a'); a.href = u; a.download = 'questions-for-my-doctor.txt'; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(u), 1000); toast('Saved');
    },
    mumlang: (a, el) => {
      st.mumLang = a;
      $$('.sheet .seg button').forEach((b) => b.classList.toggle('on', b === el));
      const L = $('#letter'); L.classList.add('fade');
      setTimeout(() => { L.textContent = mumText(chapter(), a); L.lang = a === 'hi' ? 'hi' : 'en'; L.classList.remove('fade'); }, 160);
    },
    copymum: () => copy(mumText(chapter(), st.mumLang), 'Message copied'),
    keep: (a, el) => {
      S.setKeep(el.checked);
      $$('.keep-s').forEach((s) => { s.textContent = el.checked ? 'On · no name, no account' : 'Off · gone when you close this'; });
      toast(el.checked ? 'Saved on this phone only' : 'Not saved');
    },
    wipe: async (a, el) => {
      /* two taps: the first one arms it, so nothing is lost by accident */
      if (!el.dataset.armed) {
        el.dataset.armed = '1'; el.dataset.label = el.textContent; el.classList.add('armed');
        el.textContent = 'Tap again to delete everything';
        setTimeout(() => { if (el.isConnected) { delete el.dataset.armed; el.classList.remove('armed'); el.textContent = el.dataset.label; } }, 4000);
        return;
      }
      if (st.sheet) await closeSheet(); S.clearAll(); st = fresh(); lastScreen = null; render(); toast('Everything cleared');
    }
  };

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]');
    if (!el || el.tagName === 'INPUT' || el.tagName === 'FORM') return;
    const f = acts[el.dataset.act];
    if (f) { e.preventDefault(); f(el.dataset.arg, el); }
  });
  document.addEventListener('change', (e) => {
    const el = e.target;
    if (!el.dataset || !el.dataset.act) return;
    if (el.dataset.act === 'photo') { if (el.files && el.files.length) startRead(nextSample() || K.reports.v1, 'photo'); return; }
    const f = acts[el.dataset.act];
    if (f) f(el.dataset.arg, el);
  });
  document.addEventListener('submit', (e) => {
    if (e.target.closest('[data-act="ownform"]')) {
      e.preventDefault();
      const inp = $('#ownbox'); const q = inp.value.trim(); const c = S.last();
      if (!q) { toast('Type or say your question first'); return; }
      if (c && !c.doctorQs.some((x) => x.text === q)) { c.doctorQs.push({ text: q, from: 'own' }); S.persist(); }
      Voice.stopListening(); render(); toast('Added to your list');
      return;
    }
    const f = e.target.closest('[data-act="askform"]');
    if (!f) return;
    e.preventDefault();
    Voice.stopListening();
    const inp = $('#askbox'); const q = inp.value.trim();
    if (q && !st.typing) { inp.value = ''; ask(q); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && st.sheet) closeSheet();
    if (e.key === 'Enter' && e.target.matches && e.target.matches('label.opt')) $('input', e.target).click();
  });

  $('#tabbar').innerHTML = tabbarHtml();
  render();

  /* Installable app: register the offline worker when served over http(s). */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
})();
