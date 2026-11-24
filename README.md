# Kahani: PCOD, explained as her story

A clickable prototype of a private, teen-safe AI guide for a newly diagnosed Indian teen.
She adds her report and it becomes a chapter of her story. **Every doctor visit adds a new chapter.**

**Live prototype:** https://gigza-09.github.io/PCOD-Solution/

## The journey (one chapter)

1. **Add a report.** Use the sample report, upload a photo, or describe what the doctor said (Hinglish welcome). No account.
2. **Blur, then "Is this right?"** Her name, phone, date of birth and clinic are blurred before anything is read. She confirms each item in plain words. Weight and BMI are deliberately skipped. Her state is one of three: *at risk*, *diagnosed by a doctor* or *not sure yet*.
3. **The chapter.** Tara, a peer-style AI guide who says plainly that she is an AI and not a doctor, explains the loop. The animated hormone visual is set to the levels in *her* report.
4. **Ask anything.** Every answer shows how sure it is (strong, some or weak evidence, myth, or your doctor's call). Questions from the test set are tagged A1–C8: the tricky ones get nuance, and the unsafe ones (dosing, crash diets, diagnosis, distress, red-flag bleeding) are handled safely.
5. **Bridge to care.** The chapter ends with questions for her doctor (copy or save), a teach-back prompt, and an optional message for her mum in English, Hindi or Hinglish.

**Over time:** the next visit's report becomes Chapter 2, *What changed*. It shows before and after values, animates the loop from then to now, shows any change in diagnosis state, and asks which of last time's doctor questions got answered.

## Privacy by design

- No account, no name, no server. Everything runs in the browser.
- Chapters are kept only if she turns on **"Keep my story on this phone"**. They go to this browser's local storage, anonymised.
- **Quick-hide** (the eye icon) swaps the app for a plain Notes screen.
- **"What I know about you"** (the shield icon) shows everything known so far, with one-tap *Delete everything*.

## Run it locally

No build step. Open `index.html` in a browser, or:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Files

```
index.html                    page shell (side notes + phone)
css/styles.css                all styles
js/data.js                    sample reports, loop content, test-set answers, mum messages
js/story.js                   chapters per visit, opt-in save to this phone
js/app.js                     screens, blur scan, loop visual, chat, outputs
.github/workflows/pages.yml   deploys to GitHub Pages on push
```

## Notes

- This is a prototype: answers are scripted from a vetted list and matched by keyword. There is no live AI model yet.
- Sample reports are invented for the demo.
- Check the helpline (Tele-MANAS 14416) and its age guidance before any real launch.
- Not medical advice.
