/* Kahani — her story: one chapter per doctor visit.
   Chapters live in memory for this session. They are written to this
   browser's localStorage only if she turns on "Keep my story on this phone".
   No names, phone numbers or clinic details are ever kept. */

(function () {
  const KEY = 'kahani.story.v1';

  function safeGet() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
  }
  function safeSet(v) {
    try { localStorage.setItem(KEY, JSON.stringify(v)); return true; } catch (e) { return false; }
  }
  function safeDel() {
    try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
  }

  const saved = safeGet();

  const Story = {
    keep: !!(saved && saved.keep),
    chapters: (saved && saved.chapters) || [],

    persist() {
      if (this.keep) safeSet({ keep: true, chapters: this.chapters });
    },
    setKeep(on) {
      this.keep = on;
      if (on) this.persist(); else safeDel();
    },
    last() { return this.chapters[this.chapters.length - 1] || null; },
    previous() { return this.chapters[this.chapters.length - 2] || null; },

    /* Anonymised chapter: only what's needed to tell the story. */
    add(ch) {
      const clean = {
        n: this.chapters.length + 1,
        reportId: ch.reportId || null,
        month: ch.month,
        visitLabel: ch.visitLabel,
        title: ch.title,
        status: ch.status,
        levels: ch.levels,
        facts: ch.facts || {},
        items: (ch.items || []).map((i) => ({ id: i.id, plain: i.plain, tag: i.tag || i.plain, icon: i.icon, node: i.node })),
        improved: !!ch.improved,
        doctorQs: (ch.doctorQs || []).map((q) => ({ text: q, done: false, from: 'report' })),
        teach: '',
        complete: false
      };
      this.chapters.push(clean);
      this.persist();
      return clean;
    },
    update(fn) {
      const c = this.last();
      if (c) { fn(c); this.persist(); }
    },
    clearAll() {
      this.chapters = [];
      this.keep = false;
      safeDel();
    }
  };

  window.KStory = Story;
})();
