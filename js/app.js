/* Kahani — clickable prototype. Plain JS, no build step. */
(function () {
  const K = window.KAHANI;
  const S = window.KStory;

  /* ---------- helpers ---------- */
  const $ = (sel, el) => (el || document).querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

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
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.1 4M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a9.9 9.9 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    send: '<path d="M4 12l16-8-6 16-2.5-6.5z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    right: '<path d="M9 5l7 7-7 7"/>',
    left: '<path d="M15 5l-7 7 7 7"/>',
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
    brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a3 3 0 0 0-3-1z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>'
  };
  const icon = (n, cls) => `<svg class="ic ${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ICONS.info}</svg>`;

  /* Tara — original illustrated peer guide */
  function tara(size, mood) {
    const smile = mood === 'care'
      ? '<path d="M54 82 Q60 85 66 82" stroke="#b4545f" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
      : '<path d="M52 80 Q60 88 68 80" stroke="#b4545f" stroke-width="2.4" fill="#fff" stroke-linecap="round"/>';
    return `<svg class="tara" width="${size}" height="${size * 1.1}" viewBox="0 0 120 132" aria-hidden="true">
      <path d="M18 132 Q20 104 60 100 Q100 104 102 132Z" fill="#f8c5d3"/>
      <path d="M44 104 Q60 114 76 104" stroke="#e58aa5" stroke-width="3" fill="none"/>
      <g transform="translate(60 120)"><circle r="4.5" fill="#ee7fa1"/><circle cx="-6" cy="-1" r="4" fill="#ee7fa1"/><circle cx="6" cy="-1" r="4" fill="#ee7fa1"/><circle cx="-3.5" cy="5" r="4" fill="#ee7fa1"/><circle cx="3.5" cy="5" r="4" fill="#ee7fa1"/><circle cy="1.5" r="3" fill="#f9dc7a"/></g>
      <rect x="52" y="88" width="16" height="16" rx="6" fill="#efbf9f"/>
      <path d="M22 64 Q18 20 60 16 Q102 20 98 64 Q102 96 88 102 L32 102 Q18 96 22 64Z" fill="#1f1a26"/>
      <ellipse cx="31" cy="66" rx="5" ry="7" fill="#f2c2a3"/><ellipse cx="89" cy="66" rx="5" ry="7" fill="#f2c2a3"/>
      <ellipse cx="60" cy="62" rx="28" ry="31" fill="#f8d3b8"/>
      <path d="M31 56 Q32 25 60 25 Q88 25 89 56 Q80 42 72 46 Q66 37 58 45 Q48 38 40 47 Q35 48 31 56Z" fill="#1f1a26"/>
      <ellipse cx="49" cy="65" rx="4.6" ry="5.6" fill="#2b1f2e"/><ellipse cx="71" cy="65" rx="4.6" ry="5.6" fill="#2b1f2e"/>
      <circle cx="50.6" cy="63" r="1.7" fill="#fff"/><circle cx="72.6" cy="63" r="1.7" fill="#fff"/>
      <path d="M43 57 Q49 54 55 57M65 57 Q71 54 77 57" stroke="#1f1a26" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <ellipse cx="41" cy="75" rx="6" ry="3.6" fill="#f49aa6" opacity=".65"/><ellipse cx="79" cy="75" rx="6" ry="3.6" fill="#f49aa6" opacity=".65"/>
      <ellipse cx="60" cy="73" rx="2.2" ry="1.5" fill="#e9a58f"/>
      ${smile}
    </svg>`;
  }

  /* ---------- state ---------- */
  const fresh = () => ({
    screen: 'home', report: null, source: null, phase: 'scan', rejected: {}, status: null,
    chIndex: null, card: 0, loopMode: 'mine', node: null, chat: [], ctx: null, group: 'A',
    paused: false, mumOpen: false, mumLang: 'en', teachFb: null, carriedDone: false,
    hidden: false, sheet: false
  });
  let st = fresh();
  const STEPS = ['add', 'read', 'chapter', 'ask', 'done'];
  const STEP_LABEL = ['Add', 'Check', 'Chapter', 'Ask', 'Done'];

  const chapter = () => (st.chIndex != null ? S.chapters[st.chIndex] : S.last());
  const prevChapter = () => { const c = chapter(); return c ? S.chapters[c.n - 2] || null : null; };
  const nextSample = () => {
    const used = S.chapters.map((c) => c.reportId);
    if (!used.includes('v1')) return K.reports.v1;
    if (!used.includes('v2')) return K.reports.v2;
    return null;
  };

  function go(screen, extra) {
    Object.assign(st, extra || {}, { screen });
    render();
    const v = $('#view'); if (v) v.scrollTop = 0;
  }

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
  }

  /* ---------- top bar ---------- */
  function topbar() {
    const i = STEPS.indexOf(st.screen);
    const steps = i < 0 ? '' : `<ol class="steps" aria-label="Progress">${STEP_LABEL.map((l, k) =>
      `<li class="${k < i ? 'done' : k === i ? 'now' : ''}"><span class="dot">${k < i ? icon('check') : k + 1}</span><span class="lbl">${l}</span></li>`).join('')}</ol>`;
    return `<header class="topbar">
      <button class="iconbtn" data-act="hide" aria-label="Quick hide">${icon('eyeOff')}</button>
      ${i < 0 ? '<div class="brand"><span class="logo">K</span>Kahani</div>' : steps}
      <button class="iconbtn" data-act="sheet" aria-label="What I know about you">${icon('shield')}</button>
    </header>`;
  }

  /* ---------- HOME: her story ---------- */
  function home() {
    const chs = S.chapters;
    const bubble = chs.length
      ? `Welcome back. Your story has <b>${chs.length} chapter${chs.length > 1 ? 's' : ''}</b>. After your next doctor visit, add the new report and we’ll see what changed.`
      : `Hi, I’m Tara, your AI guide. Just got a report or a new “PCOD”? Let’s make sense of it together, privately. <b>Each doctor visit adds a chapter to your story.</b>`;
    const nodes = chs.map((c, k) => {
      const s = K.statusInfo[c.status];
      return `<li class="pnode ${k % 2 ? 'r' : 'l'}">
        <button class="pbtn done" data-act="opench" data-arg="${k}" aria-label="Open chapter ${c.n}">${icon('check')}</button>
        <div class="pcap"><b>Chapter ${c.n} · ${esc(c.title)}</b><span>${esc(c.visitLabel)} · <i class="chip t-${s.tone}">${s.short}</i></span></div>
      </li>`;
    }).join('');
    const addK = chs.length;
    return `<section class="scr home">
      <div class="scene" aria-hidden="true">${sceneSvg()}</div>
      <div class="home-top">
        <h1 class="h-xl">Your story</h1>
        <p class="sub">${chs.length ? `${chs.length} chapter${chs.length > 1 ? 's' : ''} so far` : 'Chapter 1 starts with your first report'}</p>
      </div>
      <div class="guide">
        ${tara(84)}
        <p class="bubble">${bubble}</p>
      </div>
      <ol class="path">
        ${nodes}
        <li class="pnode ${addK % 2 ? 'r' : 'l'}">
          <button class="pbtn add" data-act="go" data-arg="add" aria-label="Add your next visit">${icon('plus')}</button>
          <div class="pcap"><b>${chs.length ? '+ Add your next visit' : '+ Add your first report'}</b><span>Chapter ${chs.length + 1}</span></div>
        </li>
      </ol>
      <div class="home-foot">
        <label class="keep">
          <input type="checkbox" data-act="keep" ${S.keep ? 'checked' : ''}>
          <span class="sw" aria-hidden="true"></span>
          <span><b>Keep my story on this phone</b><small>${S.keep ? 'Saved on this phone only. No name, no account.' : 'Off: everything disappears when you close this.'}</small></span>
        </label>
      </div>
    </section>`;
  }

  function sceneSvg() {
    return `<svg viewBox="0 0 390 844" preserveAspectRatio="xMidYMax slice" width="100%" height="100%">
      <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe3ff"/><stop offset=".55" stop-color="#e6f2ff"/><stop offset="1" stop-color="#f4ecff"/></linearGradient></defs>
      <rect width="390" height="844" fill="url(#sky)"/>
      <g fill="#fff" opacity=".95"><ellipse cx="300" cy="120" rx="46" ry="18"/><ellipse cx="330" cy="108" rx="30" ry="18"/><ellipse cx="70" cy="190" rx="38" ry="14"/><ellipse cx="96" cy="180" rx="24" ry="14"/></g>
      <path d="M0 430 Q90 370 190 420 T390 400 V844 H0Z" fill="#c9ecb8"/>
      <path d="M0 500 Q120 440 240 490 T390 470 V844 H0Z" fill="#9edc8a"/>
      <path d="M0 580 Q140 530 260 575 T390 560 V844 H0Z" fill="#7ccc6e"/>
      <g fill="#5fb85a"><path d="M330 470 l10 -34 l10 34z"/><path d="M348 476 l8 -26 l8 26z"/><path d="M28 520 l9 -30 l9 30z"/></g>
      <g transform="translate(300 640)"><circle r="5" fill="#fff"/><circle cx="-6" cy="-2" r="4" fill="#fff"/><circle cx="6" cy="-2" r="4" fill="#fff"/><circle cy="0" r="2.4" fill="#f9d35a"/></g>
      <g transform="translate(70 760)"><circle r="5" fill="#ffd1e0"/><circle cx="-6" cy="-2" r="4" fill="#ffd1e0"/><circle cx="6" cy="-2" r="4" fill="#ffd1e0"/><circle cy="0" r="2.4" fill="#f9d35a"/></g>
    </svg>`;
  }

  /* ---------- 1. ADD ---------- */
  function add() {
    const n = S.chapters.length + 1;
    const smp = nextSample();
    return `<section class="scr add">
      <button class="back" data-act="go" data-arg="home">${icon('left')} Your story</button>
      <p class="eyebrow">Chapter ${n}</p>
      <h1 class="h-l">${n === 1 ? 'Add your report' : 'Add your new visit'}</h1>
      <p class="sub">${n === 1 ? 'Start with what the doctor gave you or said.' : 'Each new visit becomes a new chapter, and we’ll compare it with last time.'}</p>

      <div class="opts">
        ${smp ? `<button class="opt hero" data-act="sample">
          <span class="opt-ic lav">${icon('doc')}</span>
          <span class="opt-t"><b>Use the sample report</b><small>Demo · ${esc(smp.visitLabel)} (${esc(smp.month)})</small></span>
          ${icon('right', 'chev')}
        </button>` : `<div class="opt muted"><span class="opt-ic">${icon('info')}</span><span class="opt-t"><b>Both demo visits used</b><small>Try describing a visit below.</small></span></div>`}

        <label class="opt" tabindex="0">
          <span class="opt-ic pink">${icon('camera')}</span>
          <span class="opt-t"><b>Take or upload a photo</b><small>Personal details get blurred first</small></span>
          ${icon('right', 'chev')}
          <input type="file" accept="image/*,.pdf" data-act="photo" class="sr">
        </label>

        <div class="opt tell">
          <div class="tell-h"><span class="opt-ic mint">${icon('chat')}</span><span class="opt-t"><b>Tell me what the doctor said</b><small>Any language. Hinglish is welcome.</small></span></div>
          <label class="sr" for="tellbox">What did the doctor say?</label>
          <textarea id="tellbox" rows="3" placeholder="e.g. Doctor ne bola probably PCOD hai, periods irregular hain aur acne bhi…"></textarea>
          <button class="btn sm" data-act="tell">Explain this ${icon('right')}</button>
        </div>
      </div>

      <div class="privacy-strip">${icon('lock')}<span><b>No account. Nothing leaves this phone.</b> I blur your name, number and clinic before reading anything.</span></div>
    </section>`;
  }

  function parseTell(t) {
    const s = t.toLowerCase();
    const has = (re) => re.test(s);
    const items = []; const lv = { ...K.typicalLevels };
    if (has(/irregular|late|skip|miss|delay|nahi aa|not com/)) { items.push({ id: 'cycle', icon: 'calendar', plain: 'Your periods are irregular', node: 'period' }); lv.period = 3; lv.follicle = 3; }
    if (has(/acne|pimple|daane|skin/)) { items.push({ id: 'acne', icon: 'spark', plain: 'You have acne', node: 'ovary' }); lv.ovary = 3; }
    if (has(/hair|baal|facial/)) { items.push({ id: 'hair', icon: 'leaf', plain: 'Some extra hair on your face or body', node: 'ovary' }); lv.ovary = 3; }
    if (has(/insulin|sugar|diabet/)) { items.push({ id: 'insulin', icon: 'bolt', plain: 'Something about insulin or sugar', node: 'insulin' }); lv.insulin = 3; }
    if (has(/hormone|testosterone|lh|androgen/)) { items.push({ id: 'lh', icon: 'signal', plain: 'Your hormone tests were a bit off', node: 'brain' }); lv.brain = 3; }
    const weight = has(/weight|wajan|vajan|fat|mota|kg|bmi/);
    let status = 'unsure';
    if (has(/probabl|shayad|maybe|might|lagta|could be|at risk|borderline/)) status = 'risk';
    else if (has(/confirm|diagnos|you have|pakka|definitely/)) status = 'diagnosed';
    if (!items.length) items.push({ id: 'note', icon: 'pen', plain: 'Your doctor mentioned PCOD', node: null });
    items.push({ id: 'note2', icon: 'pen', plain: `In your words: “${t.trim().slice(0, 140)}”`, node: null });
    const d = new Date();
    const month = d.toLocaleString('en', { month: 'short' }) + ' ' + d.getFullYear();
    return {
      id: 'text', month, visitLabel: 'Your visit', chapterTitle: S.chapters.length ? 'What changed' : 'Your loop',
      paper: null, status, items, levels: lv, facts: {}, weightSkipped: weight,
      doctorQs: [
        'What exactly did my tests show, in simple words?',
        status === 'risk' ? 'What would make it definite, and when do we re-check?' : 'What is the plan from here, and when do we review it?',
        'What can help my symptoms right now?'
      ]
    };
  }

  /* ---------- 2. READ: blur, then "Is this right?" ---------- */
  function read() {
    const r = st.report;
    const scanning = r.paper && st.phase === 'scan';
    const blurred = st.phase !== 'scan';
    const paper = r.paper ? `
      <div class="paper ${scanning ? 'scanning' : ''} ${blurred ? 'blurred' : ''}" aria-label="Sample report">
        ${scanning ? '<div class="scanline" aria-hidden="true"></div>' : ''}
        <div class="p-head"><b class="pii">${esc(r.paper.clinic)}</b><span class="pii">${esc(r.paper.clinicPhone)}</span></div>
        <div class="p-meta"><span>Patient: <b class="pii">${esc(r.paper.patient)}</b></span><span>DOB: <b class="pii">${esc(r.paper.dob)}</b></span><span>Ph: <b class="pii">${esc(r.paper.phone)}</b></span><span>Date: ${esc(r.paper.date)}</span></div>
        <table>${r.paper.rows.map(([a, b, c]) => `<tr class="${/Weight/.test(a) ? 'skipme' : ''}"><td>${esc(a)}</td><td>${esc(b)}</td><td>${esc(c)}</td></tr>`).join('')}</table>
        <p class="p-imp"><b>Impression:</b> ${esc(r.paper.impression)}</p>
      </div>` : '';

    if (scanning) {
      return `<section class="scr read">
        <p class="eyebrow">Step 2 · Reading safely</p>
        <h1 class="h-l">First, I hide your details</h1>
        ${st.source === 'photo' ? `<p class="demo-note">${icon('info')} Demo: reading the sample report in place of your photo.</p>` : ''}
        ${paper}
        <p class="sub center">Blurring name, phone, date of birth and clinic…</p>
      </section>`;
    }

    const stInfo = K.statusInfo[st.status];
    const n = S.chapters.length + 1;
    return `<section class="scr read">
      <p class="eyebrow">Step 2 · Is this right?</p>
      <h1 class="h-l">Here’s what I read</h1>
      ${r.paper ? `<div class="hidden-chips">${['Name', 'Phone', 'Date of birth', 'Clinic'].map((x) => `<span class="chip t-mint">${icon('eyeOff')} ${x} hidden</span>`).join('')}</div>
      <details class="peek"><summary>See the blurred report</summary>${paper}</details>` : ''}

      <ul class="items">
        ${r.items.map((it) => {
          const no = st.rejected[it.id];
          return `<li class="item ${no ? 'no' : ''}">
            <span class="item-ic">${icon(it.icon)}</span>
            <div class="item-t"><p>${esc(it.plain)}</p>${it.raw ? `<small>From: ${esc(it.raw)}</small>` : ''}${no ? '<small class="ok">Got it. I’ll leave this out.</small>' : ''}</div>
            <div class="yn" role="group" aria-label="Is this right?">
              <button class="${!no ? 'on' : ''}" data-act="yes" data-arg="${it.id}" aria-pressed="${!no}">Yes</button>
              <button class="${no ? 'on' : ''}" data-act="no" data-arg="${it.id}" aria-pressed="${!!no}">Not quite</button>
            </div>
          </li>`;
        }).join('')}
      </ul>

      ${(r.paper || r.weightSkipped) ? `<div class="skipped">${icon('heart')}<span>I skipped your weight and BMI. They’re not part of your story here.</span></div>` : ''}

      <div class="statusbox">
        <p class="lbl">Where things stand</p>
        <div class="tri" role="radiogroup" aria-label="Diagnosis state">
          ${['risk', 'diagnosed', 'unsure'].map((k) => `<button role="radio" aria-checked="${st.status === k}" class="${st.status === k ? 'on t-' + K.statusInfo[k].tone : ''}" data-act="status" data-arg="${k}">${K.statusInfo[k].short}</button>`).join('')}
        </div>
        <p class="small">${esc(stInfo.line)}</p>
      </div>

      <div class="bar"><button class="btn block" data-act="startch">Yes, start Chapter ${n} ${icon('right')}</button></div>
    </section>`;
  }

  /* ---------- 3. CHAPTER ---------- */
  function cardsFor(c) {
    const p = S.chapters[c.n - 2];
    return p ? ['welcome', 'changed', 'loop', 'status', 'carried'] : ['intro', 'name', 'loop', 'signs', 'fault'];
  }
  const CTX = {
    intro: { label: 'Meeting Tara', ids: ['A1', 'A14', 'C4'] },
    name: { label: 'The name', ids: ['A1', 'B2', 'A10'] },
    loop: { label: 'Your loop', ids: ['A3', 'A6', 'B6'] },
    signs: { label: 'Your signs', ids: ['A6', 'A12', 'C8'] },
    fault: { label: 'Not your fault', ids: ['A11', 'B7', 'B1'] },
    welcome: { label: 'Your new visit', ids: ['A10', 'B7', 'C1'] },
    changed: { label: 'What changed', ids: ['C1', 'A10', 'B4'] },
    status: { label: 'Your diagnosis', ids: ['A1', 'B1', 'A10'] },
    carried: { label: 'Last time’s questions', ids: ['B5', 'A14', 'C1'] }
  };

  function loopViz(c, mode) {
    const p = prevChapter();
    let lv = c.levels;
    if (mode === 'typical') lv = K.typicalLevels;
    if (mode === 'then' && p) lv = p.levels;
    const pins = {};
    ((mode === 'then' && p ? p.items : c.items) || []).forEach((it) => { if (it.node) (pins[it.node] = pins[it.node] || []).push(it); });
    const pos = { brain: [50, 14], ovary: [84, 50], follicle: [50, 86], period: [16, 50], insulin: [50, 50] };
    const speed = (k) => (2.6 - (lv[k] || 1) * 0.6).toFixed(2) + 's';
    const nodes = Object.keys(pos).map((k) => {
      const N = K.loopNodes[k];
      const count = mode === 'typical' ? 0 : (pins[k] || []).length;
      return `<button class="lnode n-${k} ${st.node === k ? 'sel' : ''}" style="left:${pos[k][0]}%;top:${pos[k][1]}%;--lv:${lv[k]}" data-act="node" data-arg="${k}" aria-label="${N.name}: ${['', 'quiet', 'medium', 'loud'][lv[k]]}">
        <span class="orb">${icon(k === 'brain' ? 'brain' : k === 'ovary' ? 'drop' : k === 'follicle' ? 'pause' : k === 'period' ? 'calendar' : 'bolt')}</span>
        <span class="nm">${N.name}</span>
        ${count ? `<span class="cnt">${count}</span>` : ''}
      </button>`;
    }).join('');
    const sel = st.node ? K.loopNodes[st.node] : null;
    const selPins = st.node && mode !== 'typical' ? (pins[st.node] || []) : [];
    const toggles = p
      ? [['then', `Then · ${p.visitLabel.replace(' visit', '')}`], ['mine', `Now · ${c.visitLabel.replace(' visit', '')}`]]
      : [['mine', 'My pattern'], ['typical', 'Typical PCOD']];
    return `<div class="loopwrap">
      <div class="seg" role="tablist" aria-label="Loop view">${toggles.map(([k, l]) => `<button role="tab" aria-selected="${mode === k}" class="${mode === k ? 'on' : ''}" data-act="loopmode" data-arg="${k}">${l}</button>`).join('')}</div>
      <div class="loop" style="--sb:${speed('brain')};--so:${speed('ovary')};--sf:${speed('follicle')};--sp:${speed('period')};--si:${speed('insulin')}">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs><marker id="ah" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#8b6cf0"/></marker></defs>
          <path class="flow fb" d="M60 12 Q80 14 83 34" marker-end="url(#ah)"/>
          <path class="flow fo" d="M83 66 Q80 86 61 88" marker-end="url(#ah)"/>
          <path class="flow ff" d="M39 88 Q20 86 17 66" marker-end="url(#ah)"/>
          <path class="flow fp" d="M17 34 Q20 14 39 12" marker-end="url(#ah)"/>
          <path class="flow fi" d="M60 50 L71 50" marker-end="url(#ah)"/>
        </svg>
        ${nodes}
      </div>
      <p class="loop-legend">Bigger, faster glow = louder in ${mode === 'typical' ? 'a typical pattern' : 'your report'}. Tap a circle.</p>
      ${sel ? `<div class="nodecard n-${st.node}"><b>${sel.name}</b><p>${sel.text}</p>${selPins.length ? `<div class="pins">${selPins.map((x) => `<span class="chip">${esc(x.plain)}</span>`).join('')}</div>` : ''}</div>` : ''}
    </div>`;
  }

  function chapterScreen() {
    const c = chapter();
    const p = prevChapter();
    const cards = cardsFor(c);
    const key = cards[st.card];
    const last = st.card === cards.length - 1;
    const s = K.statusInfo[c.status];
    let say = ''; let body = '';

    if (key === 'intro') {
      say = 'Hi, I’m Tara. I’m an AI guide: I talk like a friend, but <b>I’m not a doctor and not a real person</b>. Let’s go through your report one bit at a time. You can stop or ask anything.';
      body = `<ul class="toc">${['The name', 'Your loop', 'Where your signs come from', 'Whose fault it is (nobody’s)'].map((t, i) => `<li><span>${i + 1}</span>${t}</li>`).join('')}</ul>`;
    } else if (key === 'name') {
      say = 'First, the name. You’ll hear three of them, and they all mean the same thing.';
      body = `<div class="names"><span class="nm-pill">PCOD<small>what most people in India say</small></span><span class="eq">=</span><span class="nm-pill">PCOS<small>what doctors said until 2026</small></span><span class="eq">=</span><span class="nm-pill new">PMOS<small>new official name, May 2026</small></span></div>
      <div class="callout">${icon('info')}<p>The old names made it sound like cysts. They’re really <b>paused egg sacs</b>, and the new name says it’s about hormones and metabolism, not just ovaries.</p></div>`;
    } else if (key === 'loop') {
      say = p ? `Here’s your loop then and now. Switch between them and watch it change.` : `This is your loop, set to your report. It’s one chain that keeps feeding itself, not lots of separate problems.`;
      body = loopViz(c, st.loopMode === 'typical' && p ? 'mine' : (st.loopMode === 'then' && !p ? 'mine' : st.loopMode));
    } else if (key === 'signs') {
      say = 'See? Not a random list. Every sign you have sits somewhere on the same loop.';
      const by = {};
      c.items.forEach((it) => { if (it.node) (by[it.node] = by[it.node] || []).push(it); });
      body = `<ul class="signs">${Object.keys(K.loopNodes).filter((k) => by[k]).map((k) => `<li class="n-${k}"><span class="sg-dot"></span><div><b>${K.loopNodes[k].name}</b>${by[k].map((x) => `<p>${esc(x.plain)}</p>`).join('')}</div></li>`).join('') || '<li><div><p>No signs confirmed yet. That’s okay.</p></div></li>'}</ul>`;
    } else if (key === 'fault') {
      say = 'One more thing, and it’s the most important: <b>you didn’t cause this.</b> Not your food, not your stress, not your mum. It’s genes plus environment, and nobody knows the exact cause.';
      body = `<div class="statuscard t-${s.tone}"><span class="chip t-${s.tone}">${s.label}</span><p>${esc(s.line)}</p></div>`;
    } else if (key === 'welcome') {
      say = `Welcome back! This is chapter ${c.n}, from your ${esc(c.visitLabel)}. Let’s see what changed since your ${esc(p.visitLabel)}.`;
      body = `<div class="visits"><div class="vcard old"><small>Chapter ${p.n}</small><b>${esc(p.visitLabel)}</b><span class="chip t-${K.statusInfo[p.status].tone}">${K.statusInfo[p.status].short}</span></div>${icon('right', 'varrow')}<div class="vcard"><small>Chapter ${c.n}</small><b>${esc(c.visitLabel)}</b><span class="chip t-${s.tone}">${s.short}</span></div></div>`;
    } else if (key === 'changed') {
      const rows = [['cycle', 'Period gap'], ['lh', 'Brain signal (LH)'], ['testo', 'Testosterone'], ['insulin', 'Insulin']]
        .filter(([k]) => p.facts[k] && c.facts[k])
        .map(([k, l]) => `<tr><th>${l}</th><td class="was">${esc(p.facts[k])}</td><td>${icon('right')}</td><td class="now">${esc(c.facts[k])}</td></tr>`).join('');
      const itemsNow = c.items.filter((i) => i.node).map((i) => `<li>${esc(i.plain)}</li>`).join('');
      say = c.improved ? 'Some real changes! Your loop is quieter than last time.' : 'Here’s what your new report says, next to last time.';
      body = (rows ? `<table class="diff">${rows}</table>` : `<ul class="plainlist">${itemsNow}</ul>`) +
        (c.improved ? `<div class="callout">${icon('pill')}<p>Some of this may be your treatment doing its job. Ask your doctor which changes come from it. <b>I won’t comment on medicines.</b></p></div>` : '');
    } else if (key === 'status') {
      const ps = K.statusInfo[p.status];
      say = p.status !== c.status ? 'Your diagnosis state changed at this visit.' : 'Your diagnosis state is the same as last time.';
      body = `<div class="statemove"><span class="chip t-${ps.tone}">${ps.label}</span>${icon('right')}<span class="chip t-${s.tone}">${s.label}</span></div>
        <div class="statuscard t-${s.tone}"><p>${esc(s.line)}</p>${c.status === 'diagnosed' ? '<p>“PCOS” on your report is the same as PCOD.</p>' : ''}</div>`;
    } else if (key === 'carried') {
      const qs = p.doctorQs.filter((q) => !q.skip);
      say = 'Last time you planned to ask your doctor these. Did you get answers?';
      body = `<ul class="carried">${qs.map((q, i) => `<li><p>${esc(q.text)}</p><div class="yn" role="group"><button class="${q.answered === true ? 'on' : ''}" data-act="carry" data-arg="${i}:y">Answered</button><button class="${q.answered === false ? 'on' : ''}" data-act="carry" data-arg="${i}:n">Not yet</button></div></li>`).join('')}</ul>
        <p class="small">“Not yet” questions move into this chapter’s list for next time.</p>`;
    }

    return `<section class="scr chapter">
      <div class="ch-head">
        <button class="back" data-act="go" data-arg="home">${icon('left')} Story</button>
        <span class="chip t-${s.tone}">${s.short}</span>
      </div>
      <p class="eyebrow">Chapter ${c.n} · ${esc(c.visitLabel)}</p>
      <h1 class="h-l">${esc(c.title)}</h1>
      ${st.paused ? `<div class="paused">${icon('pause')}<span>Chapter paused. Take all the time you need.</span><button class="btn xs ghost" data-act="resume">Continue</button></div>` : ''}
      <div class="dots" aria-hidden="true">${cards.map((_, i) => `<span class="${i === st.card ? 'on' : i < st.card ? 'past' : ''}"></span>`).join('')}</div>
      <div class="card">
        <div class="say">${tara(56, 'talk')}<p class="bubble">${say}</p></div>
        ${body}
      </div>
      <div class="bar two">
        <button class="btn ghost" data-act="askabout" data-arg="${key}">${icon('chat')} Ask about this</button>
        ${last ? `<button class="btn" data-act="finish">Finish chapter ${icon('star')}</button>` : `<button class="btn" data-act="next">Next ${icon('right')}</button>`}
      </div>
      ${st.card > 0 ? `<button class="linkbtn" data-act="prev">${icon('left')} Previous</button>` : ''}
    </section>`;
  }

  /* ---------- 4. ASK ---------- */
  function fillVars(t) {
    const c = chapter();
    return t.replace('{cycle}', (c && c.facts && c.facts.cycle) || 'longer than usual');
  }
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
    return best || null;
  }
  function ask(q, viaChip) {
    const a = viaChip || answerFor(q);
    st.chat.push({ who: 'me', text: q });
    if (a && a.kind === 'distress') {
      st.paused = true;
      st.chat.push({ who: 'tara', kind: 'distress' });
    } else if (a) {
      st.chat.push({ who: 'tara', id: a.id, text: fillVars(a.text), cert: a.cert, certLabel: a.certLabel || a.mythLabel, src: a.src, doctorQ: a.doctorQ, kind: a.kind });
    } else {
      st.chat.push({ who: 'tara', id: null, text: K.fallback.text, cert: 'none', src: K.fallback.src, doctorQ: q, kind: 'answer' });
    }
    render();
    const log = $('.chatlog'); if (log) log.scrollTop = log.scrollHeight;
  }

  function msgHtml(m, i) {
    if (m.who === 'me') return `<li class="msg me"><p>${esc(m.text)}</p></li>`;
    if (m.kind === 'distress') {
      return `<li class="msg tara care">
        <div class="carecard">
          <div class="care-h">${tara(44, 'care')}<p><b>Thank you for telling me.</b> That sounds really heavy, and you don’t have to carry it alone. I’ve paused the chapter. There’s no rush.</p></div>
          <a class="care-row" href="tel:14416">${icon('phone')}<span><b>Talk to someone now: Tele-MANAS 14416</b><small>Free, 24×7, in many Indian languages</small></span></a>
          <button class="care-row" data-act="trusted">${icon('users')}<span><b>Tell someone you trust</b><small>A parent, an aunt, a teacher or a friend. I can help with the words.</small></span></button>
          ${m.trusted ? `<div class="words">“I’ve been feeling really bad about my body and I haven’t been eating properly. Can we talk?”<button class="btn xs ghost" data-act="copytext" data-arg="I’ve been feeling really bad about my body and I haven’t been eating properly. Can we talk?">${icon('copy')} Copy</button></div>` : ''}
          <p class="small">If you’re in danger right now, call <a href="tel:112">112</a>.</p>
          <button class="linkbtn" data-act="resume">I’m okay to keep going</button>
        </div>
      </li>`;
    }
    const ci = K.certInfo[m.cert] || K.certInfo.none;
    return `<li class="msg tara ${m.kind}">
      <div class="badge ${ci.cls}">${m.kind === 'urgent' ? icon('info') : m.cert === 'doctor' ? icon('shield') : icon('star')}${esc(m.certLabel || ci.label)}${m.id ? `<span class="tid">${m.id}</span>` : ''}</div>
      <p>${m.text}</p>
      ${m.src ? `<small class="src">Source: ${esc(m.src)}</small>` : ''}
      <div class="m-acts">
        ${m.doctorQ ? (m.added ? `<span class="added">${icon('check')} Added to doctor questions</span>` : `<button class="mini" data-act="addq" data-arg="${i}">${icon('plus')} Add to doctor questions</button>`) : ''}
        ${m.flagged ? `<span class="added">${icon('flag')} Flagged. Check the source with your doctor.</span>` : `<button class="mini ghost" data-act="flag" data-arg="${i}">${icon('flag')} This seems wrong</button>`}
      </div>
    </li>`;
  }

  function askScreen() {
    const groups = { A: 'Understand', B: 'Tricky', C: 'Safety tests' };
    const ctxIds = st.ctx ? (CTX[st.ctx] || {}).ids || [] : [];
    const suggested = ctxIds.map((id) => K.answers.find((a) => a.id === id)).filter(Boolean);
    const chips = K.answers.filter((a) => a.group === st.group);
    return `<section class="scr ask">
      <div class="ch-head">
        <button class="back" data-act="go" data-arg="chapter">${icon('left')} Chapter</button>
        <button class="btn xs" data-act="finish">Finish chapter</button>
      </div>
      <h1 class="h-m">Ask Tara anything</h1>
      ${st.ctx ? `<p class="ctx">${icon('book')} Asking about: <b>${CTX[st.ctx].label}</b></p>` : ''}
      <ul class="chatlog" aria-live="polite">
        <li class="msg tara intro"><div class="say">${tara(40)}<p>Ask me anything, even the awkward stuff. I’ll always tell you <b>how sure I am</b>, and when something is your doctor’s call.</p></div></li>
        ${st.chat.map(msgHtml).join('')}
      </ul>
      <div class="asktools">
        ${suggested.length ? `<div class="chips sug">${suggested.map((a) => `<button class="qchip" data-act="chip" data-arg="${a.id}">${esc(a.chip)}<span class="tid">${a.id}</span></button>`).join('')}</div>` : ''}
        <div class="seg sm" role="tablist" aria-label="Question set">${Object.keys(groups).map((g) => `<button role="tab" aria-selected="${st.group === g}" class="${st.group === g ? 'on' : ''}" data-act="group" data-arg="${g}">${groups[g]}</button>`).join('')}</div>
        <div class="chips">${chips.map((a) => `<button class="qchip" data-act="chip" data-arg="${a.id}">${esc(a.chip)}<span class="tid">${a.id}</span></button>`).join('')}</div>
        <form class="composer" data-act="askform">
          <label class="sr" for="askbox">Your question</label>
          <input id="askbox" autocomplete="off" placeholder="Type anything… Hinglish is fine">
          <button class="send" aria-label="Send">${icon('send')}</button>
        </form>
      </div>
    </section>`;
  }

  /* ---------- 5. DONE ---------- */
  function mumText(c, lang) {
    const M = K.mum[lang];
    return [M.open, M[c.status], c.improved ? M.improved : '', M.asks].filter(Boolean).join(' ');
  }
  function doneScreen() {
    const c = chapter();
    const qs = c.doctorQs;
    const fromLbl = { report: 'From your report', chat: 'You asked', carried: 'From last time' };
    return `<section class="scr done">
      <div class="reward" aria-hidden="true">
        <div class="burst"></div>
        <svg viewBox="0 0 120 100" width="120" height="100"><rect x="18" y="44" width="84" height="46" rx="10" fill="#f39c3d"/><rect x="18" y="44" width="84" height="12" fill="#e2812a"/><path d="M14 46 Q60 6 106 46Z" fill="#f6b04f"/><rect x="52" y="50" width="16" height="18" rx="4" fill="#ffd96a"/><circle cx="60" cy="58" r="3" fill="#b8641f"/><g fill="#ffe27a"><circle cx="20" cy="20" r="3"/><circle cx="100" cy="16" r="2.5"/><circle cx="108" cy="36" r="2"/></g></svg>
      </div>
      <p class="eyebrow center">Chapter ${c.n} complete</p>
      <h1 class="h-l center">${c.n === 1 ? 'You know your loop now' : 'Your story moved forward'}</h1>

      <div class="panel">
        <h2 class="h-s">${icon('chat')} Explain it back</h2>
        <p class="small">In one line, how would you explain your loop to a friend?</p>
        <div class="teach"><label class="sr" for="teachbox">Your explanation</label><input id="teachbox" value="${esc(c.teach)}" placeholder="My brain signal is loud, so…"><button class="btn sm" data-act="teach">Check</button></div>
        ${st.teachFb ? `<div class="teachfb">${st.teachFb}</div>` : ''}
      </div>

      <div class="panel">
        <h2 class="h-s">${icon('doc')} Questions for my doctor</h2>
        <ul class="qlist">${qs.map((q, i) => `<li><label><input type="checkbox" data-act="qtoggle" data-arg="${i}" ${q.skip ? '' : 'checked'}><span>${esc(q.text)}<small>${fromLbl[q.from] || ''}</small></span></label></li>`).join('')}</ul>
        <div class="row"><button class="btn sm ghost" data-act="copyqs">${icon('copy')} Copy</button><button class="btn sm ghost" data-act="dlqs">${icon('download')} Save as file</button></div>
      </div>

      <div class="panel mum">
        <label class="keep inline">
          <input type="checkbox" data-act="mum" ${st.mumOpen ? 'checked' : ''}><span class="sw" aria-hidden="true"></span>
          <span><b>Explain it to Mum</b><small>Optional. Only if you want to.</small></span>
        </label>
        ${st.mumOpen ? `
          <div class="seg sm" role="tablist" aria-label="Language">${[['en', 'English'], ['hi', 'हिंदी'], ['hl', 'Hinglish']].map(([k, l]) => `<button role="tab" aria-selected="${st.mumLang === k}" class="${st.mumLang === k ? 'on' : ''}" data-act="mumlang" data-arg="${k}">${l}</button>`).join('')}</div>
          <div class="letter" lang="${st.mumLang === 'hi' ? 'hi' : 'en'}">${esc(mumText(c, st.mumLang))}</div>
          <button class="btn sm ghost" data-act="copymum">${icon('copy')} Copy message</button>` : ''}
      </div>

      <div class="panel">
        <label class="keep inline">
          <input type="checkbox" data-act="keep" ${S.keep ? 'checked' : ''}><span class="sw" aria-hidden="true"></span>
          <span><b>Keep my story on this phone</b><small>So your next visit becomes Chapter ${c.n + 1}. Stored only on this phone, without your name.</small></span>
        </label>
      </div>

      <div class="bar col">
        <button class="btn block" data-act="go" data-arg="home">${icon('book')} Back to my story</button>
        <button class="linkbtn danger" data-act="wipe">End and clear everything</button>
      </div>
    </section>`;
  }

  /* ---------- overlays ---------- */
  function overlays() {
    const c = S.last();
    return `
    ${st.hidden ? `<div class="notes" role="dialog" aria-label="Notes">
      <div class="notes-h"><span>Notes</span><button data-act="unhide">Done</button></div>
      <h2>Groceries</h2>
      <ul><li>Milk 1L</li><li>Atta 5kg</li><li>Tomatoes, onions</li><li>Maggi ×2</li><li>Return library book</li></ul>
    </div>` : ''}
    ${st.sheet ? `<div class="scrim" data-act="sheet"></div>
    <div class="sheet" role="dialog" aria-label="What I know about you">
      <div class="grab"></div>
      <h2 class="h-m">${icon('shield')} What I know about you right now</h2>
      ${c ? `<ul class="known">${c.items.map((i) => `<li>${icon(i.icon)}${esc(i.plain)}</li>`).join('')}</ul>` : '<p class="small">Nothing yet.</p>'}
      <p class="small"><b>I don’t know:</b> your name, phone, school, location or weight. No account exists.</p>
      <p class="small"><b>Saved:</b> ${S.keep ? `${S.chapters.length} chapter(s) on this phone only.` : 'Nothing. It disappears when you close this.'}</p>
      <div class="bar col">
        <button class="btn block danger" data-act="wipe">Delete everything</button>
        <button class="linkbtn" data-act="sheet">Close</button>
      </div>
    </div>` : ''}`;
  }

  /* ---------- render ---------- */
  function render() {
    const views = { home, add, read, chapter: chapterScreen, ask: askScreen, done: doneScreen };
    $('#app').className = `app on-${st.screen}`;
    $('#app').innerHTML = `${topbar()}<main id="view" class="view v-${st.screen}">${views[st.screen]()}</main>${overlays()}<div id="toast" class="toast" role="status"></div>`;
    const n = K.notes[st.screen];
    const side = $('#sidenote');
    if (side && n) {
      side.innerHTML = `<p class="sn-k">Now showing</p><h2>${n.title}</h2><p>${n.body}</p><div class="sn-tags">${n.tags.map((t) => `<span>${t}</span>`).join('')}</div>`;
    }
  }

  /* ---------- actions ---------- */
  function startRead(report, source) {
    st.report = report; st.source = source; st.rejected = {}; st.status = report.status;
    st.phase = report.paper ? 'scan' : 'list';
    go('read');
    if (report.paper) {
      setTimeout(() => { const p = $('.paper'); if (p) p.classList.add('blurred'); }, 1300);
      setTimeout(() => { if (st.screen === 'read') { st.phase = 'list'; render(); } }, 2700);
    }
  }

  function createChapter() {
    const r = st.report;
    const items = r.items.filter((i) => !st.rejected[i.id]);
    const c = S.add({
      reportId: r.id === 'text' ? null : r.id, month: r.month, visitLabel: r.visitLabel,
      title: S.chapters.length ? 'What changed' : r.chapterTitle, status: st.status,
      levels: r.levels, facts: r.facts, items, improved: r.improved, doctorQs: r.doctorQs
    });
    st.chIndex = c.n - 1; st.card = 0; st.loopMode = 'mine'; st.node = null;
    st.chat = []; st.ctx = null; st.paused = false; st.teachFb = null; st.mumOpen = false;
    go('chapter');
  }

  function copy(text, msg) {
    const done = () => toast(msg || 'Copied');
    try {
      navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
    } catch (e) { fallbackCopy(text, done); }
  }
  function fallbackCopy(text, done) {
    const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) { /* ignore */ }
    ta.remove(); done();
  }
  const qText = (c) => 'Questions for my doctor\n\n' + c.doctorQs.filter((q) => !q.skip).map((q, i) => `${i + 1}. ${q.text}`).join('\n');

  const acts = {
    go: (a) => { if (a === 'chapter') { st.ctx = null; } go(a); },
    hide: () => { st.hidden = true; render(); },
    unhide: () => { st.hidden = false; render(); },
    sheet: () => { st.sheet = !st.sheet; render(); },
    opench: (a) => { st.chIndex = +a; st.card = 0; st.loopMode = 'mine'; st.node = null; st.chat = []; st.paused = false; go('chapter'); },
    sample: () => { const r = nextSample(); if (r) startRead(r, 'sample'); },
    tell: () => {
      const t = ($('#tellbox') || {}).value || '';
      if (t.trim().length < 4) { toast('Write a few words about what the doctor said'); return; }
      startRead(parseTell(t), 'text');
    },
    yes: (a) => { delete st.rejected[a]; render(); },
    no: (a) => { st.rejected[a] = true; render(); },
    status: (a) => { st.status = a; render(); },
    startch: createChapter,
    next: () => { st.card++; st.node = null; render(); $('#view').scrollTop = 0; },
    prev: () => { st.card = Math.max(0, st.card - 1); st.node = null; render(); },
    loopmode: (a) => { st.loopMode = a; render(); },
    node: (a) => { st.node = st.node === a ? null : a; render(); },
    carry: (a) => {
      const [i, v] = a.split(':'); const p = prevChapter(); const c = chapter();
      const q = p.doctorQs.filter((x) => !x.skip)[+i];
      q.answered = v === 'y';
      const exists = c.doctorQs.findIndex((x) => x.text === q.text && x.from === 'carried');
      if (v === 'n' && exists < 0) c.doctorQs.unshift({ text: q.text, from: 'carried' });
      if (v === 'y' && exists >= 0) c.doctorQs.splice(exists, 1);
      S.persist(); render();
    },
    askabout: (a) => { st.ctx = a; go('ask'); },
    finish: () => { S.update((c) => { c.complete = true; }); go('done'); },
    resume: () => { st.paused = false; if (st.screen === 'ask') go('chapter'); else render(); },
    group: (a) => { st.group = a; render(); },
    chip: (a) => { const ans = K.answers.find((x) => x.id === a); if (ans) ask(ans.chip, ans); },
    addq: (a) => {
      const m = st.chat[+a]; const c = chapter();
      if (!c.doctorQs.some((q) => q.text === m.doctorQ)) c.doctorQs.push({ text: m.doctorQ, from: 'chat' });
      m.added = true; S.persist(); render(); toast('Added to your doctor questions');
      const log = $('.chatlog'); if (log) log.scrollTop = log.scrollHeight;
    },
    flag: (a) => { st.chat[+a].flagged = true; render(); },
    trusted: () => { const m = st.chat.filter((x) => x.kind === 'distress').pop(); if (m) m.trusted = true; render(); },
    copytext: (a) => copy(a),
    teach: () => {
      const v = ($('#teachbox') || {}).value || '';
      const c = chapter(); c.teach = v; S.persist();
      const s = v.toLowerCase();
      const parts = [
        ['the brain signal', /brain|lh|signal|dimag/],
        ['extra androgens', /androgen|testosterone|hormone|ovar/],
        ['paused eggs and periods', /egg|period|ovulat|cycle/],
        ['insulin', /insulin|sugar/]
      ];
      const got = parts.filter(([, re]) => re.test(s)).map(([l]) => l);
      const miss = parts.filter(([, re]) => !re.test(s)).map(([l]) => l);
      st.teachFb = !v.trim() ? 'Give it a go. There’s no wrong answer here.'
        : got.length >= 3 ? `Nailed it! You covered ${got.join(', ')}.`
        : got.length ? `Nice, you got ${got.join(' and ')}. Maybe add ${miss[0]}?`
        : `Good start! Try mentioning ${miss.slice(0, 2).join(' or ')}.`;
      render();
    },
    qtoggle: (a, el) => { const c = chapter(); c.doctorQs[+a].skip = !el.checked; S.persist(); },
    copyqs: () => copy(qText(chapter()), 'Questions copied'),
    dlqs: () => {
      const blob = new Blob([qText(chapter())], { type: 'text/plain' });
      const u = URL.createObjectURL(blob); const a = document.createElement('a');
      a.href = u; a.download = 'questions-for-my-doctor.txt'; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(u), 1000);
    },
    mum: (a, el) => { st.mumOpen = el.checked; render(); },
    mumlang: (a) => { st.mumLang = a; render(); },
    copymum: () => copy(mumText(chapter(), st.mumLang), 'Message copied'),
    keep: (a, el) => { S.setKeep(el.checked); render(); toast(el.checked ? 'Saved on this phone only' : 'Not saved. Gone when you close this.'); },
    wipe: () => { S.clearAll(); st = fresh(); render(); toast('Everything cleared'); }
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
    if (el.dataset.act === 'photo') {
      if (el.files && el.files.length) startRead(nextSample() || K.reports.v1, 'photo');
      return;
    }
    const f = acts[el.dataset.act];
    if (f) f(el.dataset.arg, el);
  });
  document.addEventListener('submit', (e) => {
    const f = e.target.closest('[data-act="askform"]');
    if (!f) return;
    e.preventDefault();
    const inp = $('#askbox', f); const q = inp.value.trim();
    if (q) ask(q);
    const ni = $('#askbox'); if (ni) ni.focus();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.closest && e.target.closest('label.opt')) { e.target.querySelector('input').click(); }
  });

  const reset = document.getElementById('resetdemo');
  if (reset) reset.addEventListener('click', () => { S.clearAll(); st = fresh(); render(); toast('Demo reset'); });

  render();
})();
