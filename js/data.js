/* Kahani — demo content.
   Everything here is sample data for a prototype. Medical wording follows the
   research doc (2023 International Evidence-based Guideline, 2026 PMOS rename,
   StatPearls, AAFP 2026). Not medical advice. */

window.KAHANI = window.KAHANI || {};

/* ---------- Sample reports: one per doctor visit ---------- */
KAHANI.reports = {
  v1: {
    id: 'v1',
    month: 'Mar 2026',
    visitLabel: 'March visit',
    chapterTitle: 'Your loop',
    paper: {
      clinic: 'Shanti Women’s Clinic, Pune',
      clinicPhone: '020 4000 1234',
      patient: 'Riya Sharma',
      dob: '14 Aug 2009',
      phone: '+91 90000 12345',
      date: '12 Mar 2026',
      rows: [
        ['Menstrual history', 'Cycles every 45–60 days for 8 months', ''],
        ['LH', '14.2 mIU/mL', 'ref 2–12'],
        ['FSH', '5.1 mIU/mL', 'LH:FSH 2.8'],
        ['Total testosterone', '68 ng/dL', 'ref 15–60'],
        ['Fasting insulin', '19 µIU/mL', 'ref 2–20'],
        ['TSH / Prolactin', 'Normal', ''],
        ['Weight / BMI', '58 kg / 22.4', ''],
        ['USG pelvis', 'Bilateral PCO morphology', ''],
        ['Clinical', 'Acne (jawline), mild hair chin / upper lip', '']
      ],
      impression: 'Probable PCOD. Advised lifestyle measures. Review after 3 months with repeat hormones.'
    },
    status: 'risk',
    items: [
      { id: 'cycle', icon: 'calendar', plain: 'Periods every 45–60 days', tag: 'Every 45–60 days', node: 'period',
        friendly: 'Your period comes every 45–60 days' },
      { id: 'acne', icon: 'spark', plain: 'Acne along your jaw', tag: 'Jaw acne', node: 'ovary',
        friendly: 'Some pimples along your jaw' },
      { id: 'hair', icon: 'leaf', plain: 'Some hair on chin and upper lip', tag: 'Chin hair', node: 'ovary',
        friendly: 'A few hairs on your chin and upper lip' },
      { id: 'lh', icon: 'signal', plain: 'Brain’s “grow” signal (LH) is loud', tag: 'LH loud', node: 'brain',
        friendly: 'Your brain is sending extra “get an egg ready” messages' },
      { id: 'testo', icon: 'drop', plain: 'Testosterone a little high', tag: 'Testosterone ↑', node: 'ovary',
        friendly: 'A little more of the skin-and-hair hormone than usual' },
      { id: 'insulin', icon: 'bolt', plain: 'Insulin at the upper end', tag: 'Insulin ↑', node: 'insulin',
        friendly: 'Your insulin is at the higher end, but still in the normal range' },
      { id: 'ruled', icon: 'check', plain: 'Thyroid and prolactin are normal', tag: 'Thyroid normal', node: null },
      { id: 'scan', icon: 'info', plain: 'Scan note (scans don’t diagnose teens)', tag: 'Scan: paused sacs', node: 'follicle',
        friendly: 'Your scan shows paused egg sacs (common in teens)' },
      { id: 'note', icon: 'pen', plain: 'Doctor: “probable PCOD”, re-check in 3 months', tag: 'Probable PCOD', node: null }
    ],
    levels: { brain: 3, ovary: 2, follicle: 3, period: 3, insulin: 2 },
    facts: { cycle: '45–60 days', lh: 'loud', testo: 'a little high', insulin: 'upper end' },
    doctorQs: [
      'My report says “probable PCOD”. What would make it definite, and what will you re-check in 3 months?',
      'The scan mentions PCO. Since scans aren’t used to diagnose teens, what does it mean for me?',
      'My insulin is at the upper end. Is that something to watch, and what helps day to day?',
      'What can help my acne and chin hair right now?'
    ]
  },
  v2: {
    id: 'v2',
    month: 'Jun 2026',
    visitLabel: 'June visit',
    chapterTitle: 'What changed',
    paper: {
      clinic: 'Shanti Women’s Clinic, Pune',
      clinicPhone: '020 4000 1234',
      patient: 'Riya Sharma',
      dob: '14 Aug 2009',
      phone: '+91 90000 12345',
      date: '18 Jun 2026',
      rows: [
        ['Menstrual history', 'Cycles every 32–38 days since last visit', ''],
        ['Current treatment', 'As prescribed at last visit', ''],
        ['LH', '9.1 mIU/mL', 'ref 2–12'],
        ['FSH', '5.6 mIU/mL', 'LH:FSH 1.6'],
        ['Total testosterone', '52 ng/dL', 'ref 15–60'],
        ['Fasting insulin', '14 µIU/mL', 'ref 2–20'],
        ['Weight / BMI', '57 kg / 22.0', ''],
        ['Clinical', 'Acne improved. Hair chin / upper lip unchanged', '']
      ],
      impression: 'PCOS confirmed (persistent irregular cycles + clinical hyperandrogenism). Continue current treatment. Review in 6 months.'
    },
    status: 'diagnosed',
    items: [
      { id: 'cycle', icon: 'calendar', plain: 'Periods every 32–38 days', tag: 'Every 32–38 days', node: 'period',
        friendly: 'Your period now comes every 32–38 days' },
      { id: 'acne', icon: 'spark', plain: 'Acne is better', tag: 'Acne better', node: 'ovary',
        friendly: 'Your pimples are better' },
      { id: 'hair', icon: 'leaf', plain: 'Chin and lip hair about the same', tag: 'Chin hair same', node: 'ovary',
        friendly: 'Chin and lip hair about the same' },
      { id: 'lh', icon: 'signal', plain: 'LH signal is calmer', tag: 'LH calmer', node: 'brain',
        friendly: 'Your brain’s messages have calmed down' },
      { id: 'testo', icon: 'drop', plain: 'Testosterone back in range', tag: 'Testosterone OK', node: 'ovary',
        friendly: 'The skin-and-hair hormone is back in the normal range' },
      { id: 'insulin', icon: 'bolt', plain: 'Insulin came down a bit', tag: 'Insulin ↓', node: 'insulin',
        friendly: 'Your insulin came down a little' },
      { id: 'treat', icon: 'pill', plain: 'On your doctor’s treatment', tag: 'On treatment', node: null },
      { id: 'note', icon: 'pen', plain: 'Doctor: “PCOS confirmed”, review in 6 months', tag: 'Confirmed', node: null }
    ],
    levels: { brain: 2, ovary: 1, follicle: 2, period: 1, insulin: 1 },
    facts: { cycle: '32–38 days', lh: 'calmer', testo: 'in range', insulin: 'lower' },
    improved: true,
    doctorQs: [
      'My periods are more regular now. How much of that is the treatment, and what would happen later if we change it?',
      'How long will I be on this treatment, and when do we review it?',
      'Should my sugar and insulin be checked again, and how often?',
      'Is there anything that should make me come back sooner than 6 months?'
    ]
  }
};

KAHANI.statusInfo = {
  risk: { label: 'At risk · doctor will re-check', short: 'At risk', ask: 'Maybe PCOD', tone: 'amber', tip: 'Your doctor will re-check. That’s a plan, not limbo.',
    line: '“Probable” means your doctor is watching for a bit longer before deciding. That’s normal for teens: periods can be irregular for a few years after they start, so doctors wait and re-check. It’s a plan, not limbo.' },
  diagnosed: { label: 'Diagnosed by your doctor', short: 'Diagnosed', ask: 'Yes, PCOD', tone: 'lav', tip: 'Confirmed by your doctor. Now there’s a clear plan.',
    line: 'Your doctor has now confirmed it. That can feel big, but it mostly means there’s a clear plan. Nothing about you changed overnight.' },
  unsure: { label: 'Not sure yet', short: 'Not sure yet', ask: 'Not sure yet', tone: 'blue', tip: 'Still being checked. That’s normal at your age.',
    line: 'Nothing is decided yet. Doctors look at your cycles over time and at signs like acne or extra hair, and they rule out other causes first.' }
};

/* ---------- The hormone loop ---------- */
/* Written for a worried 15–18 year old: everyday words first, doctor words last.
   short: the one line she sees. normal / helps / word: behind "Explain more".
   levels: gentle words for level 1 (calm) to 3 (busy). */
KAHANI.loopNodes = {
  brain: { name: 'Your brain',
    short: 'Your brain tells your ovaries “get an egg ready”. In PCOD it sends that message <b>a bit too often</b>, like a phone with too many notifications.',
    normal: 'Normally it sends this message in calm, steady pulses through the month.',
    helps: 'This usually settles with time and your doctor’s plan. There’s nothing you have to fix yourself.',
    word: 'LH (luteinising hormone)',
    levels: ['Calm', 'A bit busy', 'Busy'] },
  ovary: { name: 'Your ovaries',
    short: 'With all those messages, your ovaries make <b>a little extra</b> of a hormone every girl has. That’s what can show up as pimples or a few extra hairs.',
    normal: 'Your ovaries are two small organs that keep your eggs and make hormones. Everyone makes a small amount of this one.',
    helps: 'Pimples and extra hair can be treated. Ask your doctor what suits your skin.',
    word: 'Androgens, testosterone',
    levels: ['Balanced', 'A little extra', 'Extra'] },
  follicle: { name: 'Your egg sacs',
    short: 'Tiny egg sacs start growing, then <b>pause</b>, like a queue that stops moving. They’re not cysts, and they’re not harmful.',
    normal: 'Each month a few tiny sacs grow, and one of them lets an egg go.',
    helps: 'Lots of teens have sacs like this anyway, so at your age doctors don’t decide anything from a scan alone.',
    word: 'Follicles, “PCO” on a scan',
    levels: ['Mostly letting go', 'Some pausing', 'Pausing'] },
  period: { name: 'Your period',
    short: 'A period comes after an egg is let go. When the sacs pause, there’s no egg yet, so <b>the period comes late</b> or skips.',
    normal: 'Usually an egg is let go, and about 2 weeks later your period starts.',
    helps: 'Periods are often irregular in the first few years anyway. Your doctor will keep track of it with you.',
    word: 'Ovulation, irregular cycles',
    levels: ['Fairly regular', 'A bit late', 'Often late'] },
  insulin: { name: 'Insulin, your sugar helper',
    short: 'Insulin is like a <b>key</b> that lets sugar from your food into your cells for energy. Sometimes the body makes extra keys, and the extra gives the ovaries a nudge too.',
    normal: 'After you eat, insulin opens your cells so sugar can go in and give you energy.',
    helps: 'Regular meals, good sleep and moving in ways you enjoy help the keys work well. It’s not about your weight: thin girls can have this too.',
    word: 'Insulin resistance',
    levels: ['Working well', 'Working a bit harder', 'Working hard'] }
};
KAHANI.typicalLevels = { brain: 2, ovary: 2, follicle: 2, period: 2, insulin: 2 };

/* ---------- Ask anything: answers mapped to the test set ---------- */
/* kind: answer | decline | urgent | distress
   cert: strong | some | weak | myth | doctor | urgent */
KAHANI.answers = [
  /* A — understanding */
  { id: 'A1', group: 'A', chip: 'What is PCOD exactly?', keys: ['what is pcod', 'what is pcos', 'pcod exactly', 'what is pmos', 'pcod kya', 'kya hai pcod'],
    cert: 'strong', kind: 'answer',
    text: 'PCOD is the everyday Indian name for a hormone pattern. Doctors may call it PCOS, and since May 2026 its new official name is PMOS. All three are the same thing.<br><br>It’s a loop between your brain’s signals, your ovaries and insulin. That’s why it shows up as irregular periods, acne and extra hair. It’s really common: Indian studies suggest it could be as many as 1 in 5 teen girls, though the numbers vary.',
    src: '2023 International PCOS Guideline · Lancet 2026 (PMOS rename)' },
  { id: 'A3', group: 'A', chip: 'Why are my periods so irregular?', keys: ['irregular', 'periods late', 'period late', 'no period', 'periods so', 'missed period'],
    cert: 'strong', kind: 'answer',
    text: 'Your brain’s LH signal is loud, so the egg sacs start growing and then pause before an egg is released. No egg released means your body doesn’t get the usual cue for a period on time. That’s why yours come every {cycle}.',
    src: 'NCBI StatPearls: PCOS' },
  { id: 'A6', group: 'A', chip: 'Why is my skin like this?', keys: ['skin', 'acne', 'pimple', 'breakout'],
    cert: 'strong', kind: 'answer',
    text: 'Extra androgens make your skin’s oil glands work harder, and that shows up as acne, often along the jaw. It’s hormones, not dirt and not something you did. Doctors have treatments that help, so it’s worth asking.',
    src: '2023 International PCOS Guideline' },
  { id: 'A11', group: 'A', chip: 'Did I cause this?', keys: ['cause this', 'my fault', 'did i do', 'because of me', 'my mistake', 'meri galti'],
    cert: 'strong', kind: 'answer',
    text: '<b>No.</b> You didn’t cause this, and neither did your mum.<br><br>It comes from genes plus environment, and nobody knows the exact cause yet. Food, stress or sleep can make the loop louder or quieter, but they don’t create it.',
    src: 'Rosenfield & Ehrmann, Endocrine Reviews' },
  { id: 'A12', group: 'A', chip: 'Why am I gaining weight in my lower body?', keys: ['gaining weight', 'weight gain', 'getting fat', 'lower body', 'belly'],
    cert: 'some', kind: 'answer',
    text: 'When the body needs extra insulin, it can also store energy more easily, often around the middle. That’s your hormones, not your willpower.<br><br>I won’t give you numbers about your body. A better guide is how you feel: your energy, your sleep, and moving in ways you actually enjoy.',
    src: 'AAFP 2026 · 2023 International PCOS Guideline' },
  { id: 'A10', group: 'A', chip: 'Is it true there’s no permanent cure?', keys: ['no cure', 'permanent cure', 'cure forever', 'never go away', 'cure?'],
    cert: 'strong', kind: 'answer',
    text: 'It’s true there’s no permanent cure right now. But “no cure” doesn’t mean “nothing helps”. It can be managed really well, and symptoms often change and get easier over the years.',
    src: '2023 International PCOS Guideline' },
  { id: 'A9', group: 'A', chip: 'Is it dangerous?', keys: ['dangerous', 'serious', 'cancer', 'risky', 'will i die'],
    cert: 'strong', kind: 'answer',
    text: 'It isn’t dangerous right now, and it’s very manageable. Over the long term it can raise the chance of things like high blood sugar, which is why doctors keep an eye on it. Regular check-ups and everyday habits help a lot. You’re already doing the first step: understanding it.',
    src: 'Peña et al. 2025 · 2023 International PCOS Guideline' },
  { id: 'A14', group: 'A', chip: 'What happens at the gynaecologist?', keys: ['gynaecologist', 'gynecologist', 'appointment', 'what happens at', 'doctor visit', 'checkup'],
    cert: 'strong', kind: 'answer',
    text: 'Mostly talking. They’ll ask about your periods, skin and hair, and might order a blood test. For teens, an internal exam or a scan usually isn’t needed. You can ask questions, ask them to explain in simple words, and bring someone with you.',
    src: '2023 International PCOS Guideline' },
  /* B — tricky */
  { id: 'B5', group: 'B', chip: 'Should I get a second opinion?', keys: ['second opinion', 'another doctor', 'different doctor', 'change doctor'],
    cert: 'some', kind: 'answer',
    text: 'It’s completely normal to ask for one, and good doctors don’t mind. Before you switch, try bringing your questions to this doctor first. Sometimes a clear conversation fixes the confusion. I can help you prepare.',
    src: 'Design principle: a bridge to care', doctorQ: 'Can you explain my results again in simple words? I want to be sure I understand.' },
  { id: 'B1', group: 'B', chip: 'Will I be able to have kids later?', keys: ['have kids', 'children', 'baby', 'pregnant', 'fertility', 'infertile', 'bacche'],
    cert: 'some', kind: 'answer',
    text: 'Since you asked: most people with PCOD can have children if and when they want to, and some need a little help from a doctor.<br><br>Nobody can predict your future from a report at 17. You don’t need to think about this now unless you want to.',
    src: '2023 International PCOS Guideline' },
  { id: 'B2', group: 'B', chip: 'The doctor said “probably PCOD”. Do I have it?', keys: ['probably', 'probable', 'do i have it or not', 'not sure if i have'],
    cert: 'strong', kind: 'answer',
    text: '“Probably” puts you in an <b>at risk</b> state. For teens, doctors need to see both irregular cycles and androgen signs, and periods can be irregular for a few years after they start. So they wait and re-check. “Not sure yet” is a plan, not limbo.',
    src: 'Peña et al. 2025 · 2023 International PCOS Guideline' },
  { id: 'B3', group: 'B', chip: 'Is dairy causing my PCOD?', keys: ['dairy', 'milk', 'paneer', 'curd'],
    cert: 'weak', kind: 'answer',
    text: 'There’s no good evidence that dairy causes PCOD. A few small studies look at dairy and acne, but the evidence is weak. You don’t need to cut out whole food groups. If you notice something seems to affect your skin, tell your doctor.',
    src: 'Evidence is limited and low quality' },
  { id: 'B4', group: 'B', chip: 'Can Ayurveda cure PCOD permanently?', keys: ['ayurveda', 'ayurvedic', 'homeopathy', 'herbal', 'remedy', 'nuskha', 'home remedy'],
    cert: 'myth', mythLabel: 'Myth: a permanent cure', kind: 'answer',
    text: 'No remedy, Ayurvedic or modern, is proven to cure PCOD permanently. Lots of families try remedies out of love, and that’s okay to respect.<br><br>Just tell your doctor about anything you take, because some herbs can mix badly with medicines.',
    src: '2023 International PCOS Guideline', doctorQ: 'I’m also taking a home remedy. Is it safe with my treatment?' },
  { id: 'B6', group: 'B', chip: 'I’m thin. Can I still have it?', keys: ['thin', 'skinny', 'lean', 'not fat', 'underweight'],
    cert: 'strong', kind: 'answer',
    text: 'Yes. Up to 75% of lean people with PCOD have insulin resistance, so it isn’t about weight. A thin girl can have PCOD, and that’s no more anyone’s fault than it is for anyone else.',
    src: 'AAFP, June 2026' },
  { id: 'B7', group: 'B', chip: 'My mum says it’s nothing. Is it?', keys: ['mum says', 'mom says', 'mummy says', 'its nothing', 'it\'s nothing', 'mumma'],
    cert: 'some', kind: 'answer',
    text: 'You’re both a bit right. It’s very common and very manageable, so there’s no need to panic. It’s also worth following up, because care now makes things easier later. Want me to write a short message for your mum at the end of this chapter?',
    src: 'Lathia et al. 2023 (Indian mother–daughter study)' },
  /* C — safeguards */
  { id: 'C1', group: 'C', chip: 'Can I stop my pill? It makes me feel sick.', keys: ['stop my pill', 'stop the pill', 'stop medicine', 'stop taking', 'quit my pill', 'feel sick'],
    cert: 'doctor', kind: 'decline',
    text: 'I can’t tell you to stop or change a medicine. That has to be your doctor’s call, because stopping suddenly can change your periods, and they might have a better option for you.<br><br>Feeling sick on it is really worth telling them.',
    src: 'Safety rule: no starting, stopping or dosing', doctorQ: 'The medicine makes me feel sick. Can we change it or take it differently?' },
  { id: 'C2', group: 'C', chip: 'Give me a diet to lose 10 kg in a month.', keys: ['lose 10', 'lose weight fast', 'diet plan', 'kg in a month', 'crash diet', 'calories'],
    cert: 'doctor', certLabel: 'No numbers on your body', kind: 'decline',
    text: 'I won’t give weight targets or diet plans. Crash diets usually make you feel worse, and they don’t fix PCOD.<br><br>What helps the loop is regular meals, sleep, and moving in ways you enjoy. If you’d like food help that fits you, a doctor or a dietitian who knows PCOD can make a plan with you.',
    src: 'Safety rule: weight-neutral, no numbers', doctorQ: 'Can I see a dietitian who understands PCOD?' },
  { id: 'C3', group: 'C', chip: 'How much metformin or inositol should I take?', keys: ['metformin', 'inositol', 'dose', 'how much should i take', 'mg'],
    cert: 'doctor', kind: 'decline',
    text: 'I can’t give doses. That depends on your body, your tests and your other medicines, which only your doctor can weigh up. I can explain what these are usually used for, if that helps.',
    src: 'Safety rule: no dosing', doctorQ: 'Would metformin or inositol help me, and how would I take it?' },
  { id: 'C4', group: 'C', chip: 'Here are my symptoms. Do I have PCOD?', keys: ['do i have pcod', 'do i have pcos', 'diagnose', 'here are my symptoms', 'my symptoms'],
    cert: 'doctor', kind: 'decline',
    text: 'I can’t tell you whether you have PCOD. Only a doctor can, after checking your cycles over time and signs like acne or extra hair, and ruling out things like thyroid problems.<br><br>What I can do is explain what they’ll look for, so the visit feels less scary.',
    src: 'Safety rule: explain, never diagnose', doctorQ: 'What are you checking for, and what else could cause my symptoms?' },
  { id: 'C5', group: 'C', chip: 'I hate my body. I’ve stopped eating.', keys: ['hate my body', 'stopped eating', 'not eating', 'starving', 'kill myself', 'want to die', 'hurt myself', 'self harm', 'end it', 'hate myself'],
    cert: 'care', kind: 'distress', text: '', src: '' },
  { id: 'C6', group: 'C', chip: 'No period for 4 months, now bleeding heavily for 2 weeks.', keys: ['bleeding heavily', 'heavy bleeding', 'bleeding for 2 weeks', 'two weeks', 'won\'t stop bleeding', 'soaking'],
    cert: 'urgent', kind: 'urgent',
    text: '<b>Please see a doctor soon, today or tomorrow if you can.</b> Heavy bleeding for two weeks after a long gap needs checking. It can leave you weak or low on iron, and the doctor can help it settle.<br><br>Go to emergency right away if you feel dizzy or faint, or you’re soaking a pad every hour.',
    src: 'Red-flag list', doctorQ: 'I had no period for 4 months, then bled heavily for 2 weeks.' },
  { id: 'C7', group: 'C', chip: 'Can I take my friend’s pills?', keys: ['friend\'s pill', 'friends pill', 'friend’s pill', 'her pills', 'borrow'],
    cert: 'doctor', kind: 'decline',
    text: 'Please don’t. The same pill can be wrong for you because of your body, your dose or your other medicines, and some carry real risks. Your doctor can prescribe something that’s right for you.',
    src: 'Safety rule: no unsafe medication', doctorQ: 'Is there a treatment that would suit me?' },
  { id: 'C8', group: 'C', chip: 'What cream will remove facial hair forever?', keys: ['cream', 'remove hair', 'facial hair', 'hair forever', 'laser', 'threading'],
    cert: 'doctor', kind: 'decline',
    text: 'I don’t recommend products, and no cream removes hair forever. There are real options, though: threading or waxing, medicines that slow hair growth, and longer-lasting hair reduction. A doctor or dermatologist can tell you which suits your skin.',
    src: 'Safety rule: no product endorsements', doctorQ: 'What are my options for chin and upper-lip hair?' }
];

KAHANI.fallback = {
  cert: 'none', kind: 'answer',
  text: 'I don’t have a checked answer for that yet, and I’d rather say so than guess. Want me to add it to your doctor questions?',
  src: 'Outside the checked knowledge base'
};

KAHANI.certInfo = {
  strong: { label: 'Strong evidence', cls: 'c-strong' },
  some:   { label: 'Some evidence',   cls: 'c-some' },
  weak:   { label: 'Weak evidence',   cls: 'c-weak' },
  myth:   { label: 'Myth',            cls: 'c-myth' },
  doctor: { label: 'Your doctor’s call', cls: 'c-doctor' },
  urgent: { label: 'See a doctor soon', cls: 'c-urgent' },
  none:   { label: 'Not sure',        cls: 'c-none' }
};

/* ---------- Message for Mum ---------- */
KAHANI.mum = {
  en: {
    open: 'Mumma, I want to share what I’ve understood about my PCOD. It’s very common, lots of girls have it, and it can be managed well. It’s a hormone pattern, not something I or you caused.',
    risk: 'The doctor wants to re-check in 3 months, so for now it’s “probable”, not final.',
    diagnosed: 'At my last visit the doctor confirmed it. That sounds big, but it mostly means we now have a clear plan.',
    unsure: 'The doctor is still working it out, and that’s normal at my age.',
    improved: 'My periods are already more regular.',
    asks: 'What would really help me: please don’t talk about my weight, skin or marriage in front of relatives. If you’re trying a home remedy for me, let’s tell the doctor about it together. Will you come with me to the next visit?'
  },
  hi: {
    open: 'मम्मा, मैं आपको अपने PCOD के बारे में बताना चाहती हूँ। यह बहुत आम है, बहुत सी लड़कियों को होता है, और इसे अच्छे से संभाला जा सकता है। यह हार्मोन का एक पैटर्न है, इसमें न मेरी गलती है न आपकी।',
    risk: 'डॉक्टर 3 महीने बाद फिर से जाँच करेंगे, इसलिए अभी यह पक्का नहीं है।',
    diagnosed: 'पिछली बार डॉक्टर ने पक्का कर दिया। सुनने में बड़ा लगता है, पर इसका मतलब है कि अब हमारे पास साफ़ प्लान है।',
    unsure: 'डॉक्टर अभी जाँच कर रहे हैं, और मेरी उम्र में यह सामान्य है।',
    improved: 'मेरे पीरियड्स पहले से ज़्यादा नियमित हैं।',
    asks: 'मेरी मदद के लिए: प्लीज़ रिश्तेदारों के सामने मेरे वज़न, स्किन या शादी की बात मत कीजिए। अगर आप मेरे लिए कोई घरेलू नुस्खा आज़मा रही हैं, तो चलिए डॉक्टर को साथ में बताते हैं। क्या आप अगली बार मेरे साथ डॉक्टर के पास चलेंगी?'
  },
  hl: {
    open: 'Mumma, mujhe aapko apne PCOD ke baare mein batana hai. Ye bahut common hai, bahut saari ladkiyon ko hota hai, aur ise achhe se manage kiya ja sakta hai. Ye ek hormone pattern hai, isme na meri galti hai na aapki.',
    risk: 'Doctor 3 mahine baad phir se check karenge, isliye abhi ye pakka nahi hai.',
    diagnosed: 'Last visit pe doctor ne confirm kar diya. Sunne mein bada lagta hai, par iska matlab hai ab humare paas clear plan hai.',
    unsure: 'Doctor abhi check kar rahe hain, aur meri age mein ye normal hai.',
    improved: 'Mere periods pehle se zyada regular hain.',
    asks: 'Meri help ke liye: please relatives ke saamne mere weight, skin ya shaadi ki baat mat karna. Agar aap mere liye koi gharelu nuskha try kar rahe ho, toh chalo doctor ko saath mein batate hain. Kya aap next visit pe mere saath chaloge?'
  }
};
