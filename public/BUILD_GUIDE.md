# 🩺💕 "Ours" — Sonu Lokesh's 21st Birthday Website
### Complete Build Guide for Google Antigravity → Vercel Deployment

This guide has everything you need: the tech setup, where to drop your photos and music, the full prompt to give the Antigravity agent, the actual personalized reasons + letter content (ready to use, editable later), and every manual step until the site is live.

> Her pet name **"Chinna"** is woven into the copy throughout — softer, intimate moments use "Chinna," more formal/celebratory ones use her full name, Sonu Lokesh.

---

## 1. What We're Building (Quick Recap)

**This is not a normal scroll-down website.** It's a sequence of surprises revealed one at a time — she taps/swipes forward through each moment like unwrapping gifts, not scrolling through a long page. Think of it as a guided experience with a gentle "continue" motion between each part, not tabs or separate URLs — it should still feel like one seamless site, just paced deliberately.

1. **Opening** — a "tap to open your surprise" gesture that also starts the background song
2. **Hero** — "Happy Birthday My Love" animated reveal
3. **Little Surprises** — a few click/tap-to-reveal delights
4. **Name Acrostic** — S·O·N·U · L·O·K·E·S·H, letter by letter
5. **21 Reasons to Love Her** — one card at a time, photo + reason, several woven with her future-doctor dream
6. **"All Ours"** — a quiet, intimate pause
7. **The Long Letter** — the emotional peak, ending signed
8. Background song plays continuously from the opening tap all the way through, uninterrupted by section changes

**Recommended stack:** Next.js (React) + Tailwind CSS + Framer Motion (for the reveal transitions) + next/image (for your photos). This deploys to Vercel with zero configuration.

> ⚠️ **Mobile is the priority, not an afterthought.** She's going to open this link on her phone. Desktop should look great too, but every section must be designed mobile-first — readable text without zooming, big enough tap targets, no lag, no cut-off content. This is built into the agent prompt below and has a dedicated testing step in Section 7 — don't skip it.

---

## 2. One-Time Software Setup (Do This First)

1. **Install Node.js** — https://nodejs.org (LTS version). Verify with `node -v`.
2. **Install Git** — https://git-scm.com/downloads. Verify with `git --version`.
3. **Create a GitHub account** if you don't have one — https://github.com
4. **Create a Vercel account** — https://vercel.com/signup — sign up via GitHub so they're linked.
5. **Install Antigravity** — https://antigravity.google/download
   - Sign in with your Google account.
   - Choose **"Agent-assisted development"** as your mode — lets the agent write files and run commands, but keeps you in the loop for big changes.
   - Leave Terminal Policy on **Auto** / **Agent Decides**.

---

## 3. Project Folder Structure

```
sonu-birthday-website/
├── public/
│   ├── images/
│   │   ├── reasons/          ← put your 21 photos here
│   │   │   ├── 01.jpg
│   │   │   ├── ...
│   │   │   └── 21.jpg
│   │   └── hero/               ← 1–2 favorite photos of you two
│   │       └── us.jpg
│   ├── audio/
│   │   └── song.mp3            ← your one background song goes here, exactly this filename
│   └── data/
│       ├── reasons.json        ← ALREADY WRITTEN FOR YOU (see Section 4) — just drop it in
│       ├── letter.txt           ← ALREADY WRITTEN FOR YOU (see Section 5) — just drop it in
│       └── acrostic.json        ← agent generates starter content, you can personalize later
├── app/ (or pages/)             ← agent-generated code
├── components/                  ← agent-generated code
└── BUILD_GUIDE.md
```

### How to add your content
1. Rename your 21 chosen photos `01.jpg` through `21.jpg` and drop them into `public/images/reasons/`.
2. Drop 1–2 photos of you both into `public/images/hero/`.
3. Rename your chosen mp3 to exactly `song.mp3` and drop it into `public/audio/`.
4. Save the two files from Sections 4 and 5 below directly into `public/data/reasons.json` and `public/data/letter.txt`.

---

## 4. The 21 Reasons — Ready to Use

I've written all 21 already, fully personalized, no repeated phrasing, six woven around her future as a doctor (tagged `"tag": "doctor"` so you can find and tweak them easily). Save this exactly as `public/data/reasons.json`:

```json
[
  { "id": 1, "photo": "01.jpg", "reason": "Because the first time you laughed at something silly I said, I finally understood why poets waste their whole lives chasing a single sound." },
  { "id": 2, "photo": "02.jpg", "reason": "Because your eyes hold sunrise even on the days you insist you look tired, Chinna — you have never once actually looked ordinary to me." },
  { "id": 3, "photo": "03.jpg", "reason": "Because you remember the smallest things I mention in passing and bring them up weeks later, like quiet proof that you were truly listening." },
  { "id": 4, "photo": "04.jpg", "reason": "Because when you're upset, you still try to make sure I'm okay first — your heart runs on a kind of selflessness I'm still learning from." },
  { "id": 5, "photo": "05.jpg", "reason": "Because Sonu Lokesh sounds, to me, like the name of someone who was always going to matter to the world — and I got to know her before the world did." },
  { "id": 6, "photo": "06.jpg", "reason": "Because you dance badly and unapologetically when you think no one's watching, and it's somehow the most beautiful thing I've ever seen." },
  { "id": 7, "photo": "07.jpg", "tag": "doctor", "reason": "Because I've seen you fall asleep with a textbook still open on your chest, and even exhausted, you looked like someone quietly building a life meant to save others." },
  { "id": 8, "photo": "08.jpg", "reason": "Because your voice on a bad day still somehow manages to sound like home." },
  { "id": 9, "photo": "09.jpg", "tag": "doctor", "reason": "Because you study every diagram like it's something sacred, memorizing detail after detail as if you already know it might one day save someone's life." },
  { "id": 10, "photo": "10.jpg", "reason": "Because you make ordinary places — a bus stop, a parking lot, a boring waiting room — feel like somewhere I'd choose to be, only because you're there too." },
  { "id": 11, "photo": "11.jpg", "tag": "doctor", "reason": "Because one day strangers are going to call you 'doctor' with relief in their voice, and I already know I'll be the proudest person alive, even standing outside that room." },
  { "id": 12, "photo": "12.jpg", "reason": "Because you cry at things you think are silly to cry at, and I love that you feel the world that loudly and that honestly." },
  { "id": 13, "photo": "13.jpg", "reason": "Because you never let me carry a bad day alone, even from a distance, even through a screen." },
  { "id": 14, "photo": "14.jpg", "reason": "Because your stubbornness is somehow one of the softest things about you — you fight that hard only for the people you love." },
  { "id": 15, "photo": "15.jpg", "tag": "doctor", "reason": "Because I've watched your hands turn pages of notes for hours on end, and I keep thinking about how those same hands will one day hold someone's fear steady, the way they've held mine." },
  { "id": 16, "photo": "16.jpg", "reason": "Because you say my name like it's something you chose, not something you're just used to saying." },
  { "id": 17, "photo": "17.jpg", "reason": "Because you worry about everyone before yourself, and someone in this world needs to start worrying about you the way you worry about it." },
  { "id": 18, "photo": "18.jpg", "tag": "doctor", "reason": "Because you talk about your future patients like you already know them — like you've been preparing your whole life to care for people you haven't even met yet." },
  { "id": 19, "photo": "19.jpg", "reason": "Because even your handwriting looks like it's in a hurry to say something kind." },
  { "id": 20, "photo": "20.jpg", "tag": "doctor", "reason": "Because 'Dr. Sonu Lokesh' is a sentence I already say in my head before it exists on any nameplate, and I cannot wait to watch you become exactly who you're meant to be." },
  { "id": 21, "photo": "21.jpg", "reason": "Because no matter how many years pass, or how much older we both grow, I don't know how to picture a version of my life that doesn't have you quietly, permanently in it. Chinna, that's the only reason I really need." }
]
```

Feel free to edit any line — this is a starting point written to sound genuinely like you, not a template.

---

## 5. The Long Letter — Ready to Use

Save this exactly as plain text in `public/data/letter.txt` (keep the blank lines between paragraphs — the agent will use them to space the letter out nicely):

```
My Chinna,

I've rewritten this letter in my head more times than I can count, and every version starts the same way — with the thought that I am the luckiest person alive to get to love you. Twenty-one years ago, the world quietly gained someone it didn't yet know it needed, and I got the unbelievable privilege of finding you before everyone else caught up.

I want to talk about your beauty first, even though it's the smallest part of why I love you, because it deserves to be said out loud once in a while. It isn't only your eyes, though I could write paragraphs about the way they change with the light. It isn't only your smile, though it has genuinely ruined my ability to focus on anything else in the room when it happens. It's the way beauty sits on you differently when you're not trying — hair falling out of place while you're bent over your notes, sleep still in your eyes at six in the morning, completely unaware that you're the most stunning thing I've ever seen. You wear it so carelessly, Chinna, like it never once occurred to you that anyone was watching. I was. I always am.

But if I'm honest, what undid me first wasn't how you look. It was how you love. The way you check on people mid-conversation just to make sure they're alright. The way you remember something I mentioned once in passing and bring it back weeks later, like a small, quiet gift. The way your anger never seems to outlast your love for the person it's aimed at. I have never met anyone who holds people as gently as you do, and somehow, impossibly, I get to be one of the people you hold.

I want you to know how much it means to watch you become who you're becoming. I've seen you fall asleep over your books more nights than either of us would like to admit, chasing a version of yourself that doesn't fully exist yet — Dr. Sonu Lokesh — and I already believe in her completely. I think about the people who haven't met you yet, the ones who will one day sit across from you, scared and unsure, and how lucky they'll be to have your hands, your patience, your particular way of making fear feel smaller just by being in the room. I am so unbelievably eager to watch you get there. Every late night, every exam, every moment you doubt yourself, I see all of it, and none of it changes what I already know — you were built for this.

And then there's the part of this letter I've avoided writing the longest, because it's the part that scares me the most. I don't know how to explain what it feels like to love someone this much, except to say that somewhere inside it is a small, persistent fear — of time, of distance, of every ordinary thing that could ever come between us. When I try to picture growing older, I don't picture it in years or milestones. I picture your laugh, slightly different than it is now, still doing the exact same thing to my chest that it does today. I picture your hands, maybe steadier, maybe more tired, still finding mine the way they do now. Chinna, I don't know how to want anything more than I want to never lose you — not to time, not to distance, not to anything at all. Whatever version of you exists twenty years from now, thirty years from now, however much older either of us gets, I already know I'll love that version too, quietly and completely, the same way I love this one.

So happy birthday, my love. Happy birthday to the girl who somehow makes ordinary days feel worth remembering, who is going to spend her life healing people and doesn't even realize she's already healed mine. Happy birthday, Sonu Lokesh. Happy birthday, Chinna.

I love you — today, twenty-one years into your life, and every year after this one that I get to stay in it.

Yours, always.
```

Edit any part of this too — I wrote it to sound personal rather than generic, but you know her better than anyone, so make it yours wherever you feel something's missing.

---

## 6. The Antigravity Agent Prompt

Open Antigravity → **New Project** → empty folder `sonu-birthday-website` → **Manager view** → new agent task → use **Plan mode** (not Fast mode, since this is multi-section) → paste this entire prompt:

```
You are building a romantic, animated website as a 21st birthday gift.
Recipient: Sonu Lokesh, nicknamed "Chinna," a future doctor (medical student).
Sender: her boyfriend.

TECH STACK: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion.
Deployable to Vercel with zero config.

⚠️ MOBILE-FIRST IS A HARD REQUIREMENT. The recipient will open this on her
phone, most likely first and possibly only. Concretely, for every section:
- Design for a 360-390px viewport first, then scale up with Tailwind's
  responsive prefixes (sm:, md:, lg:).
- Body text minimum 16px on mobile. Headings scale down gracefully on
  small screens using responsive font-size classes.
- All tap targets at least 44x44px with clear spacing.
- NO horizontal scrolling or overflow at any viewport width — test this
  explicitly for every section.
- NO content cut off or requiring zoom on small screens.
- Prefer transform/opacity-based Framer Motion animations (GPU-accelerated),
  lower particle/floating-heart counts on small screens, avoid heavy
  blur/shadow effects that cause jank on mid-range phones.
- Use next/image responsive sizing so photos don't over-download on mobile data.
- Every interaction must work with TAP, not rely on hover — there is no
  hover on a touchscreen.

⭐ NAVIGATION MODEL — READ CAREFULLY, THIS IS NOT A NORMAL SCROLL SITE ⭐
Do NOT build this as one long continuously-scrollable page. Instead, build
it as a sequence of full-viewport "moments" that reveal one at a time:
- Maintain a single `currentStep` state (integer) in the main page/layout.
- Only the active step's section is rendered/visible at once, centered in
  the viewport, using Framer Motion's AnimatePresence for a smooth
  transition (e.g. fade + slight slide) when moving between steps.
- At the bottom (or a fixed position that works well on mobile) of each
  section, show a small, elegant "continue" affordance — e.g. a soft
  downward arrow or a heart-shaped button with a label like "continue" or
  "keep going" — tapping it advances `currentStep` by 1 with an animated
  transition to the next section.
- Within the 21 Reasons section specifically, treat each reason as its own
  sub-step within that section (one card visible at a time, tap/swipe to
  advance to the next reason), still using the same transition style,
  before moving on to the next main section once all 21 are seen.
- Add small, unobtrusive progress dots or a thin progress bar at the top of
  the screen so she has a sense of how many "surprises" are left, without
  it looking like a technical UI element — keep it delicate and on-theme.
- Support swipe gestures on mobile (left/right or up/down swipe, your
  choice, whichever feels most natural) as an alternative to tapping the
  continue button, since swiping will feel more natural on a phone.
- The whole experience should feel like unwrapping a sequence of gifts, not
  browsing a webpage. Pacing and anticipation matter more than density.

STEP SEQUENCE:

STEP 0 — OPENING GATE (components/Opening.tsx)
   - A soft, elegant single screen: something like a wax-seal / envelope /
     heart icon, with text like "a little surprise for you, Chinna" and a
     clear "tap to open" affordance.
   - Tapping this is the ONLY user gesture required to both (a) advance to
     Step 1 and (b) start the background song playing (see AUDIO section
     below — browsers require a user gesture before audio can play with
     sound, so this tap satisfies that requirement cleanly).

STEP 1 — HERO (components/Hero.tsx)
   - Floating hearts drift upward continuously in the background.
   - "Happy Birthday My Love" fades/types in, then "Sonu Lokesh" appears
     beneath in a script font, then a smaller, warmer line "my Chinna"
     appears just below that, slightly delayed, like a whispered nickname.
   - A subtle animated heartbeat/EKG line beneath the text.

STEP 2 — LITTLE SURPRISES (components/Surprises.tsx)
   - A small set (4-6) of interactive icons/cards (gift box, heart,
     envelope, star). Tapping each reveals a short sweet message or micro
     animation (confetti hearts, a tiny note). Write warm, genuine
     placeholder one-liners for these (not Lorem Ipsum), addressing her as
     "Chinna" in a couple of them so the nickname feels natural.

STEP 3 — NAME ACROSTIC (components/NameAcrostic.tsx)
   - Reads from public/data/acrostic.json — create this file yourself with
     a starter array of 10 objects, one per letter of "SONULOKESH", each
     with { letter, word, description }. Write warm, beautiful starter
     words/phrases (marked as easy to personalize later).
   - Reveal one letter at a time (fits the step-by-step navigation model
     naturally — treat each letter as a mini sub-step, or animate them in
     a staggered sequence within this one step, your call on what reads
     better), large stylized letter with its word + description.

STEP 4 — 21 REASONS (components/Reasons.tsx)
   - Reads from public/data/reasons.json (already provided by the user,
     21 objects: id, photo, reason, optional tag).
   - One reason-card visible at a time (see navigation model above): photo
     from public/images/reasons/{photo}, the reason text, and a small
     elegant "Reason #01" style badge. Tap/swipe advances to the next of
     the 21 before continuing to the next main step.

STEP 5 — ALL OURS (components/AllOurs.tsx)
   - Quiet, calmer moment. Shared photo from public/images/hero/us.jpg,
     softly framed (heart-shaped or elegant rounded mask). Text: "this
     little part of the internet is all ours now, Chinna." Minimal
     animation, let it breathe — no rush here.

STEP 6 — THE LETTER (components/Letter.tsx)
   - Reads full text from public/data/letter.txt (already provided by the
     user, paragraphs separated by blank lines — render each as its own
     paragraph).
   - Styled like a handwritten letter on textured cream paper (CSS
     texture, not a literal scan). Long-form readable typography, generous
     line-height for mobile readability. Ends with an animated
     "signature" — closing line drawn on with an SVG stroke animation.
   - Below the letter: "Happy 21st Birthday, my Chinna — future Dr. Sonu
     Lokesh 🩺💕" as the final closing note. This is the last step — no
     further "continue" arrow after this, just a quiet, settled ending.

AUDIO — ONE BACKGROUND SONG, PLAYING THROUGHOUT
   - Add a single <audio> element (or use Howler.js if easier) that plays
     public/audio/song.mp3 on a loop.
   - Playback starts on the Step 0 tap (the same gesture that advances to
     Step 1) — browsers block autoplay-with-sound until a user gesture, so
     this tap satisfies that requirement. Do NOT attempt to autoplay
     before this tap.
   - Once started, the song must persist and keep playing uninterrupted
     across every step transition (i.e. the audio element should live at
     the top-level layout, not be remounted inside individual step
     components, or it will restart/cut out on every transition).
   - Add a small, unobtrusive mute/unmute icon fixed in a corner (thumb-
     reachable on mobile, e.g. bottom-right) in case she wants to mute it,
     styled to match the theme (e.g. a small music note or heart icon).

GENERAL REQUIREMENTS:
- Use next/image for all photos with proper alt text.
- Warm romantic palette: soft blush pinks, deep rose reds, cream/ivory,
  gold accents. Elegant, not childish.
- Recurring motif: a heartbeat/EKG pulse line as a subtle divider/accent
  (nod to her being a future doctor). One small stethoscope-heart icon
  somewhere unobtrusive (e.g. near the mute button or on Step 0).
  Keep doctor references tasteful and minimal, a wink not a costume.
- No Lorem Ipsum anywhere — always write warm, genuine placeholder copy in
  the birthday/love theme, commented `// TODO: personalize` where the user
  should edit it.
- Do not include anything about weddings, engagement, or married life —
  keep all content strictly about love and the relationship as it is now.
- Set page <title> to "Happy 21st Birthday, Chinna ❤️" with a nice Open
  Graph meta description.
- After building, run the dev server, confirm no compile errors, and check
  every step at a 375px mobile viewport before considering it done —
  mobile bugs are the highest priority to catch.

Start by showing me your implementation plan before writing any code.
```

---

## 7. What You Do Manually, Step by Step

1. **Let the agent scaffold and build** from the prompt above (Plan mode → review the plan → approve → let it build).
2. **Add your content:**
   - Drop 21 renamed photos into `public/images/reasons/`
   - Drop 1–2 couple photos into `public/images/hero/`
   - Drop your renamed `song.mp3` into `public/audio/`
   - Save the JSON from Section 4 into `public/data/reasons.json`
   - Save the letter from Section 5 into `public/data/letter.txt`
   - Personalize `public/data/acrostic.json` once the agent creates it, if you want to change the starter words
3. **Preview locally:**
   ```
   npm run dev
   ```
   Open `http://localhost:3000`.

   **Mobile-first QA — do this before anything else:**
   - DevTools (F12) → Device Toolbar → test at **375px** and **390-430px**. Step through the *entire* sequence (not just scroll — actually tap/swipe through every step) checking for cut-off text, overlapping elements, tiny tap targets, horizontal scrollbars.
   - **Then test on your real phone.** Run `npm run dev -- -H 0.0.0.0`, find your computer's local IP (e.g. `192.168.x.x`), open `http://192.168.x.x:3000` on your phone over the same WiFi. Confirm the tap-to-open gesture starts the song correctly, and that it keeps playing without cutting out as you move between steps.
   - Only after mobile feels right, check desktop for polish.
   - Give the agent specific mobile bug reports if anything's off, e.g. "on mobile, the continue arrow overlaps the letter text on Step 6."

### Push to GitHub
4. In the Antigravity terminal:
   ```
   git init
   git add .
   git commit -m "Sonu's birthday website"
   ```
5. Create a new **private** repo at https://github.com/new (e.g. `sonu-birthday`).
6. Run the commands GitHub shows you, e.g.:
   ```
   git remote add origin https://github.com/YOUR_USERNAME/sonu-birthday.git
   git branch -M main
   git push -u origin main
   ```

### Deploy to Vercel
7. Go to https://vercel.com/new
8. Click **Import** next to your `sonu-birthday` repo.
9. Leave all settings default (Vercel auto-detects Next.js).
10. Click **Deploy**. Wait ~1-2 minutes.
11. You'll get a live URL like `sonu-birthday.vercel.app` — that's the link you send her! 🎉
    - **Note:** total file size matters for load time — keep the mp3 reasonably compressed (a standard 128-192kbps mp3 is plenty; you don't need studio quality for a background track) so the site opens quickly on her mobile data.
12. **Optional:** rename the project in Vercel Project Settings → General so the URL reads nicer (e.g. `sonu-and-you.vercel.app`), or attach a custom domain under Domains if you own one.

### After launch
13. For any edits, just change the file, then:
    ```
    git add .
    git commit -m "update"
    git push
    ```
    Vercel auto-redeploys within a minute of every push.

---

## 8. Quick Checklist Before You Send It To Her

- [ ] All 21 photos uploaded and matched correctly to their reasons
- [ ] Reasons and letter reviewed once more in your own voice — edit anything that doesn't feel like you
- [ ] Song uploaded, plays on the opening tap, and doesn't cut out or restart between steps
- [ ] Acrostic words personalized to her actual personality
- [ ] Stepped through the entire sequence (not scrolled — tapped/swiped through) on your real phone, no cut-off text, no stuck transitions
- [ ] Tested on desktop too, but treated as secondary polish
- [ ] Deployed link opens correctly in an incognito/private window
- [ ] Page title / favicon look right in the browser tab

Good luck — this is going to mean a lot to her. Bring any specific section back here if you want help refining a line or two.
