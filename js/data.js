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
      { id: 'cycle', icon: 'calendar', plain: 'Your periods come every 45–60 days', raw: 'Menstrual history', node: 'period' },
      { id: 'acne', icon: 'spark', plain: 'Acne along your jawline', raw: 'Clinical', node: 'ovary' },
      { id: 'hair', icon: 'leaf', plain: 'Some hair on your chin and upper lip', raw: 'Clinical', node: 'ovary' },
      { id: 'lh', icon: 'signal', plain: 'Your brain’s “grow” signal (LH) is louder than usual', raw: 'LH 14.2 · LH:FSH 2.8', node: 'brain' },
      { id: 'testo', icon: 'drop', plain: 'Testosterone is a little above the usual range', raw: 'Total testosterone 68', node: 'ovary' },
      { id: 'insulin', icon: 'bolt', plain: 'Insulin is at the upper end of normal', raw: 'Fasting insulin 19', node: 'insulin' },
      { id: 'ruled', icon: 'check', plain: 'Thyroid and prolactin are normal, so those causes are ruled out', raw: 'TSH / Prolactin', node: null },
      { id: 'scan', icon: 'info', plain: 'The scan mentions “PCO morphology”. Doctors don’t use scans to diagnose teens, so this is a side note', raw: 'USG pelvis', node: 'follicle' },
      { id: 'note', icon: 'pen', plain: 'Doctor wrote “probable PCOD”, with a re-check in 3 months', raw: 'Impression', node: null }
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
      { id: 'cycle', icon: 'calendar', plain: 'Your periods now come every 32–38 days', raw: 'Menstrual history', node: 'period' },
      { id: 'acne', icon: 'spark', plain: 'Your acne is better', raw: 'Clinical', node: 'ovary' },
      { id: 'hair', icon: 'leaf', plain: 'Chin and upper-lip hair is about the same', raw: 'Clinical', node: 'ovary' },
      { id: 'lh', icon: 'signal', plain: 'Your brain’s LH signal is calmer', raw: 'LH 9.1 · LH:FSH 1.6', node: 'brain' },
      { id: 'testo', icon: 'drop', plain: 'Testosterone is back inside the usual range', raw: 'Total testosterone 52', node: 'ovary' },
      { id: 'insulin', icon: 'bolt', plain: 'Insulin has come down a bit', raw: 'Fasting insulin 14', node: 'insulin' },
      { id: 'treat', icon: 'pill', plain: 'You’re on the treatment your doctor started. I won’t comment on medicines, that’s your doctor’s call', raw: 'Current treatment', node: null },
      { id: 'note', icon: 'pen', plain: 'Doctor wrote “PCOS confirmed”, which is the same as PCOD, with a review in 6 months', raw: 'Impression', node: null }
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
  risk: { label: 'At risk · doctor will re-check', short: 'At risk', tone: 'amber',
    line: '“Probable” means your doctor is watching for a bit longer before deciding. That’s normal for teens: periods can be irregular for a few years after they start, so doctors wait and re-check. It’s a plan, not limbo.' },
  diagnosed: { label: 'Diagnosed by your doctor', short: 'Diagnosed', tone: 'lav',
    line: 'Your doctor has now confirmed it. That can feel big, but it mostly means there’s a clear plan. Nothing about you changed overnight.' },
  unsure: { label: 'Not sure yet', short: 'Not sure yet', tone: 'blue',
    line: 'Nothing is decided yet. Doctors look at your cycles over time and at signs like acne or extra hair, and they rule out other causes first.' }
};

/* ---------- The hormone loop ---------- */
KAHANI.loopNodes = {
  brain:    { name: 'Brain signal', sub: 'LH', text: 'Your brain sends LH, a signal that says “grow an egg”. In PCOD it pulses faster and louder than usual, so the ovaries get over-nudged.' },
  ovary:    { name: 'Ovaries', sub: 'androgens', text: 'Over-nudged ovaries make extra androgens. Everyone makes some of these “male-type” hormones; here there’s more. They’re behind acne and extra hair.' },
  follicle: { name: 'Egg sacs', sub: 'pause', text: 'With too much LH and androgen, the small egg sacs start growing and then pause before releasing an egg. They’re not real cysts, just paused sacs.' },
  period:   { name: 'Period', sub: 'skips', text: 'No egg released means no “brake” signal back to the brain, and no period on schedule. So the loop keeps going and periods come late or skip.' },
  insulin:  { name: 'Insulin', sub: 'booster', text: 'Insulin moves sugar into your cells. When the body needs extra of it, the extra also tells the ovaries to make more androgens. That happens in thin people too.' }
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

/* ---------- Side-panel notes: what each screen demonstrates ---------- */
KAHANI.notes = {
  home: { title: 'Her story', body: 'Each doctor visit adds a chapter. Nothing is saved unless she turns on “Keep my story on this phone”.', tags: ['Principle 5 · Private by default', 'HMW #23 · grows over months'] },
  add: { title: '1 · Add a report', body: 'She can use the sample report, a photo, or just describe what the doctor said. Hinglish is welcome. There’s no account.', tags: ['Principle 7 · Her words', 'Principle 5 · No account'] },
  read: { title: '2 · Blur, then check', body: 'Personal details are blurred before anything is read. She confirms each item. Weight and BMI are deliberately skipped.', tags: ['Harm #8 · Privacy', 'Principle 2 · No numbers on her body', 'Principle 3 · Three states'] },
  chapter: { title: '3 · The chapter', body: 'Tara, a peer-style AI guide, connects her symptoms into one loop. The visual is set to her own levels from the report.', tags: ['HMW #1 · One connected story', 'Test A1–A3, A11'] },
  ask: { title: '4 · Ask anything', body: 'Every answer shows how sure it is. Tricky and unsafe questions from the test set are handled as designed. A test ID tag on each chip links it to the test set.', tags: ['Principle 4 · Honest about certainty', 'Test sets A, B, C'] },
  done: { title: '5 · Bridge to care', body: 'The chapter ends with questions for her doctor, a teach-back, and an optional message for her mum in English, Hindi or Hinglish.', tags: ['Principle 6 · A bridge, not a replacement', 'HMW #16 + #17'] }
};
