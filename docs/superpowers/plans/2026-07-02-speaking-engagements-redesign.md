# Speaking Engagements Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing text-only `#speaking` section on palwabuson.com with a photo-collage layout (large TEDx stage photo + small overlapping audience photo) matching the approved design spec, reusing the site's existing design tokens.

**Architecture:** This is a fully static HTML/CSS/JS site (no build step, no framework, no test runner). "Tests" in this plan mean concrete, repeatable verification commands — `sips`/`curl` checks for the new asset, and Claude Preview browser tool checks (screenshot, console logs, DOM assertions via `preview_eval`) for the markup/CSS changes — run in place of unit tests, since none exist in this codebase.

**Tech Stack:** Vanilla HTML/CSS/JS, deployed on Vercel. Local preview via `python3 -m http.server`, verified with the Claude Preview MCP tools (`preview_start`, `preview_screenshot`, `preview_console_logs`, `preview_eval`, `preview_resize`).

## Global Constraints

- No new npm dependencies, no build framework — the site stays fully static (spec: "Goals").
- Reuse existing design tokens (`.section-title`, `.head-copy`, `.button`/`.button-lime` classes) — do not invent new type/button/color styles (spec: "Layout & visual structure").
- No new decorative motifs (e.g. no squiggle/arrow accent) — explicitly out of scope (spec: "Layout & visual structure").
- Section must keep `id="speaking"` in its current document position, between the Journey and Lions Path sections (spec: "Layout & visual structure").
- Sourced stock photo must be free for commercial use with no attribution required (spec: "Assets").

---

### Task 1: Source and prepare the audience photo

**Files:**
- Create: `assets/media/speaking-audience.jpg`

**Interfaces:**
- Produces: a web-optimized JPEG at `./assets/media/speaking-audience.jpg`, landscape orientation, that Task 2's `<img>` tag will reference.

- [ ] **Step 1: Download the source photo**

The design spec calls for a free, commercial-use-licensed audience/crowd photo. Use this pre-vetted Pexels photo (Pexels license: free for commercial use, no attribution required) — "business conference attendees listening to a presentation," landscape orientation:

```bash
cd '/Users/bon/openspace\ app/my website'
curl -sL "https://images.pexels.com/photos/8761540/pexels-photo-8761540.jpeg?cs=srgb" -o assets/media/speaking-audience.jpg
```

- [ ] **Step 2: Verify the download succeeded**

Run:
```bash
sips -g pixelWidth -g pixelHeight -g format assets/media/speaking-audience.jpg
```
Expected: prints `format: jpeg` and both `pixelWidth`/`pixelHeight` greater than 0 (source is approximately 1260x750). If the command errors with "not a file in an image format I can read," the download failed — re-run Step 1 and check for a network error in the curl output.

- [ ] **Step 3: Resize and compress for web delivery**

The collage's secondary photo renders small (see Task 3 CSS, `.speaking-collage-photo.secondary` is ~52% of a column that's already less than half the page width) — cap it well below source size:

```bash
cd '/Users/bon/openspace\ app/my website'
sips -Z 800 assets/media/speaking-audience.jpg >/dev/null
sips -s formatOptions 75 assets/media/speaking-audience.jpg >/dev/null
```

- [ ] **Step 4: Verify final file size is reasonable**

Run:
```bash
ls -la '/Users/bon/openspace\ app/my website/assets/media/speaking-audience.jpg'
```
Expected: file size under 150KB (matches the compression level already used for the site's other photography, e.g. the hall-of-fame images average ~30-50KB after the same treatment).

- [ ] **Step 5: Commit**

```bash
cd '/Users/bon/openspace\ app/my website'
git add assets/media/speaking-audience.jpg
git commit -m "Add sourced audience photo for Speaking Engagements collage"
```

---

### Task 2: Replace the #speaking section markup

**Files:**
- Modify: `index.html:220-233`

**Interfaces:**
- Consumes: `assets/media/tedx-cover.jpeg` (existing), `assets/media/speaking-audience.jpg` (produced by Task 1).
- Produces: new HTML structure with classes `.speaking-layout`, `.speaking-collage`, `.speaking-collage-photo` (with modifiers `.main` / `.secondary`), `.speaking-copy` — these exact class names are what Task 3's CSS must target. The `#talks` element keeps its existing `id` and `.talk-list` class so `script.js`'s existing `document.getElementById("talks")` code (unchanged) continues to work.

- [ ] **Step 1: Read the current section to confirm line numbers haven't drifted**

Run:
```bash
grep -n 'id="speaking"' '/Users/bon/openspace\ app/my website/index.html'
```
Expected: `220:      <section class="section dark speaking" id="speaking">`. If the line number differs, open the file and locate the section by its `id="speaking"` attribute instead of trusting the line number below.

- [ ] **Step 2: Replace the section markup**

Replace this block (`index.html:220-233`):

```html
      <section class="section dark speaking" id="speaking">
        <div class="wrap split">
          <div>
            <p class="eyebrow lime reveal">Speaking</p>
            <h2 class="section-title mid reveal d1">I speak about what I am building and learning.</h2>
            <p class="head-copy wide reveal d2">I am a TEDx speaker and public speaker with interests in entrepreneurship, artificial intelligence, sales, leadership and the future of African business. My talks draw from experience building across different industries and navigating the transition from real estate into technology.</p>
            <div class="button-row reveal d2">
              <a class="button button-lime" href="#contact">Invite Pal to Speak <span aria-hidden="true">-></span></a>
              <a class="button button-outline" href="#media">Watch Speaking Highlights</a>
            </div>
          </div>
          <div class="talk-list" id="talks"></div>
        </div>
      </section>
```

With:

```html
      <section class="section dark speaking" id="speaking">
        <div class="wrap">
          <div class="speaking-layout">
            <div class="speaking-collage reveal">
              <div class="speaking-collage-photo main">
                <img src="./assets/media/tedx-cover.jpeg" alt="Pal Wabuson speaking on stage at TEDx Tanke" loading="lazy">
              </div>
              <div class="speaking-collage-photo secondary">
                <img src="./assets/media/speaking-audience.jpg" alt="Conference audience listening to a talk" loading="lazy">
              </div>
            </div>
            <div class="speaking-copy">
              <p class="eyebrow lime reveal">Speaking</p>
              <h2 class="section-title mid reveal d1">Speaking Engagements</h2>
              <p class="head-copy wide reveal d2">I am a TEDx speaker with talks on entrepreneurship, artificial intelligence, sales, leadership and the future of African business, drawn from my own experience building across real estate and technology.</p>
              <p class="head-copy wide reveal d2">Looking for a speaker for your next event? Get in touch and let's talk about what I can bring to your audience.</p>
              <div class="button-row reveal d2">
                <a class="button button-lime" href="#contact">Invite Pal to Speak <span aria-hidden="true">-></span></a>
              </div>
            </div>
          </div>
          <div class="talk-list" id="talks"></div>
        </div>
      </section>
```

Note: the `#talks` div is unchanged (same `id`, same `.talk-list` class) — it moves from being the second grid child of `.wrap.split` to being a direct sibling of `.speaking-layout` inside `.wrap`, so it now renders as a full-width strip below the collage+copy block instead of a side column.

- [ ] **Step 3: Verify the HTML is well-formed**

Run:
```bash
cd '/Users/bon/openspace\ app/my website'
python3 -c "
import re
html = open('index.html').read()
opens = len(re.findall(r'<section\b', html))
closes = len(re.findall(r'</section>', html))
print(f'section open={opens} close={closes}')
assert opens == closes, 'mismatched <section> tags'
print('OK')
"
```
Expected: `section open=N close=N` (equal counts) followed by `OK`. If it raises an AssertionError, re-check Step 2's replacement for a missing or extra closing tag.

- [ ] **Step 4: Commit**

```bash
cd '/Users/bon/openspace\ app/my website'
git add index.html
git commit -m "Redesign #speaking section markup as photo collage"
```

---

### Task 3: Add CSS for the collage layout

**Files:**
- Modify: `styles.css:1098-1105` (insert new section after `.talk strong`, before `.media-story`)
- Modify: `styles.css:1953-1958` (add `.speaking-layout` to the existing 1100px collapse rule)
- Modify: `styles.css:2196-2200` (add mobile secondary-photo adjustment inside the existing 760px block)

**Interfaces:**
- Consumes: class names produced by Task 2 (`.speaking-layout`, `.speaking-collage`, `.speaking-collage-photo.main`, `.speaking-collage-photo.secondary`, `.speaking-copy`).
- Produces: visual layout only — no new classes are consumed by later tasks.

- [ ] **Step 1: Confirm anchor line numbers haven't drifted**

Run:
```bash
grep -n '^\.talk strong {\|^\.media-story {\|^\.global-card {' '/Users/bon/openspace\ app/my website/styles.css'
```
Expected: three matches, in that order (`.talk strong` first, `.media-story` second, `.global-card` later in the file). If line numbers differ from this plan's references, use these selector matches to locate the insertion points instead of the line numbers below.

- [ ] **Step 2: Insert the new collage CSS block**

Find this exact text in `styles.css` (around line 1098-1105):

```css
.talk strong {
  color: var(--white);
  font-size: clamp(17px, 1.8vw, 22px);
  font-weight: 600;
  line-height: 1.2;
}

.media-story {
```

Replace it with:

```css
.talk strong {
  color: var(--white);
  font-size: clamp(17px, 1.8vw, 22px);
  font-weight: 600;
  line-height: 1.2;
}

/* ==== Speaking Engagements collage ==== */
.speaking-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(320px, 0.72fr);
  gap: clamp(30px, 6vw, 82px);
  align-items: center;
  margin-bottom: clamp(60px, 8vw, 110px);
}

.speaking-collage {
  position: relative;
}

.speaking-collage-photo {
  overflow: hidden;
  border: 1px solid rgba(243, 240, 232, 0.16);
  background: #111;
}

.speaking-collage-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.9) contrast(1.02);
}

.speaking-collage-photo.main {
  aspect-ratio: 4 / 5;
}

.speaking-collage-photo.secondary {
  position: absolute;
  right: -6%;
  bottom: -10%;
  width: 52%;
  aspect-ratio: 4 / 3;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
}

.speaking-copy .button-row {
  margin-top: 8px;
}

.media-story {
```

- [ ] **Step 3: Add `.speaking-layout` to the existing 1100px single-column collapse rule**

Find this exact text in `styles.css` (inside the `@media (max-width: 1100px)` block):

```css
  .journey-card,
  .intro-composition,
  .community-grid,
  .global-card {
    grid-template-columns: 1fr;
  }
```

Replace it with:

```css
  .journey-card,
  .intro-composition,
  .community-grid,
  .global-card,
  .speaking-layout {
    grid-template-columns: 1fr;
  }
```

- [ ] **Step 4: Add a mobile adjustment for the secondary photo inside the 760px block**

Find this exact text in `styles.css` (inside the second `@media (max-width: 760px)` block, near its end):

```css
  .press-grid a {
    min-height: 300px;
  }
}
```

Replace it with:

```css
  .press-grid a {
    min-height: 300px;
  }

  .speaking-collage {
    margin-bottom: 60px;
  }

  .speaking-collage-photo.secondary {
    right: 0;
    bottom: -48px;
    width: 62%;
  }
}
```

- [ ] **Step 5: Verify the CSS is well-formed**

Run:
```bash
cd '/Users/bon/openspace\ app/my website'
python3 -c "
css = open('styles.css').read()
opens = css.count('{')
closes = css.count('}')
print(f'braces open={opens} close={closes}')
assert opens == closes, 'mismatched braces'
print('OK')
"
```
Expected: `braces open=N close=N` (equal counts) followed by `OK`.

- [ ] **Step 6: Commit**

```bash
cd '/Users/bon/openspace\ app/my website'
git add styles.css
git commit -m "Add CSS for Speaking Engagements photo collage layout"
```

---

### Task 4: Visual and functional verification

**Files:** none (verification only)

**Interfaces:**
- Consumes: the complete section from Tasks 1-3.

- [ ] **Step 1: Start the local preview server**

Use the `pal-wabuson-website` launch config already defined in `/Users/bon/.claude/launch.json` (created earlier this session) via the `preview_start` MCP tool with `name: "pal-wabuson-website"`. If no server is running yet, this starts one on port 4174.

- [ ] **Step 2: Reload and check for console errors**

Call `preview_eval` with `expression: "window.location.reload()"`, then call `preview_console_logs` with `level: "all"`.
Expected: `No console logs.` (or only benign entries already present before this change — no new errors/warnings, and specifically no `404` for `speaking-audience.jpg` or `tedx-cover.jpeg`).

- [ ] **Step 3: Verify the new DOM structure and asset paths**

Call `preview_eval` with:
```js
JSON.stringify({
  headingText: document.querySelector('#speaking h2').textContent.trim(),
  buttonCount: document.querySelectorAll('#speaking .button-row .button').length,
  mainImgSrc: document.querySelector('.speaking-collage-photo.main img').getAttribute('src'),
  secondaryImgSrc: document.querySelector('.speaking-collage-photo.secondary img').getAttribute('src'),
  talkListStillPresent: document.getElementById('talks') !== null,
  talkCount: document.querySelectorAll('#talks .talk').length
})
```
Expected: `headingText` is `"Speaking Engagements"`, `buttonCount` is `1`, `mainImgSrc` is `"./assets/media/tedx-cover.jpeg"`, `secondaryImgSrc` is `"./assets/media/speaking-audience.jpg"`, `talkListStillPresent` is `true`, `talkCount` is `6` (matches the six-item `talks` array in `script.js`).

- [ ] **Step 4: Verify both images actually load (not broken)**

Call `preview_network` with `filter: "failed"`.
Expected: no entries referencing `speaking-audience.jpg` or `tedx-cover.jpeg`. If either 404s, re-check the `src` path against the actual file location from Task 1/existing repo.

- [ ] **Step 5: Screenshot at desktop width**

Call `preview_resize` with `preset: "desktop"`, then scroll to the section via `preview_eval` with `expression: "document.getElementById('speaking').scrollIntoView(); 'ok'"`, then call `preview_screenshot`.
Expected: two-column layout — photo collage on the left (large TEDx photo with the audience photo overlapping its bottom-right corner), heading "Speaking Engagements" + copy + single "Invite Pal to Speak" button on the right, talk list visible as a full-width strip below.

- [ ] **Step 6: Screenshot at mobile width**

Call `preview_resize` with `preset: "mobile"`, scroll to `#speaking` again the same way, then call `preview_screenshot`.
Expected: single-column stacked layout — collage on top, copy below, talk list below that. The secondary (audience) photo should not overflow the viewport horizontally.

- [ ] **Step 7: Verify the nav anchor still works**

Call `preview_eval` with:
```js
(() => {
  document.querySelector('a[href="#speaking"]').click();
  return JSON.stringify({ scrollY: window.scrollY });
})()
```
Expected: `scrollY` is greater than `0` (page scrolled down to the section, not stuck at top).

- [ ] **Step 8: Verify reveal-on-scroll animation still applies**

Call `preview_eval` with:
```js
JSON.stringify({
  collageHasReveal: document.querySelector('.speaking-collage').classList.contains('reveal'),
  headingHasReveal: document.querySelector('#speaking h2').classList.contains('reveal')
})
```
Expected: both `true`.

- [ ] **Step 9: Final commit**

If any fixes were needed during verification, stage and commit them:
```bash
cd '/Users/bon/openspace\ app/my website'
git status --short
```
If there are unstaged changes from fixes made during this task, commit them with a message describing the fix (e.g. `git commit -am "Fix speaking collage mobile overflow"`). If verification passed with no fixes needed, no commit is required for this task.

---

## Post-implementation

This branch (`audit/global-standard`) already has unpushed/pushed commits from the earlier site audit. After Task 4 passes:
1. `git push` to update the remote branch.
2. Deploy a Vercel preview (`vercel --yes`, no `--prod`) and visually confirm the section on the preview URL before promoting to production, following the same workflow used earlier this session (note: preview URLs on this Vercel team are SSO-gated — open it in an authenticated browser rather than via curl).
3. Only promote to production (`vercel --prod --yes`) after explicit user confirmation, consistent with how the rest of this session's changes were shipped.
