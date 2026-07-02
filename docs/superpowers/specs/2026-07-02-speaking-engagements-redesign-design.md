# Speaking Engagements section redesign

## Context

The site's existing `#speaking` section (`index.html`) is a two-column text block: eyebrow "Speaking", heading "I speak about what I am building and learning.", a paragraph, two buttons ("Invite Pal to Speak", "Watch Speaking Highlights"), and a JS-populated `.talk-list`. It has no photography.

The user shared two reference screenshots from Steven Bartlett's "Diary of a CEO" site: a video-grid hero, and a "Speaking Engagements" section built from a photo collage (large speaking photo + small overlapping audience photo), heading, short copy, and a single "SPEAKER ENQUIRIES" button. They asked to bring this to palwabuson.com.

Scoped down through discussion to: **redesign the existing Speaking section only** (the video-grid hero was explicitly dropped — it would require podcast-guest-style video assets the site doesn't have).

## Goals

- Replace `#speaking`'s content with a photo-driven layout matching the reference's collage structure, styled with the site's existing design tokens (colors, type, button shapes) rather than introducing a new visual language.
- Preserve existing functionality: nav anchor (`#speaking`), the "Invite Pal to Speak" CTA path, and the talk-list content.
- Use real assets already in the repo wherever possible; source one new licensed stock photo only where no suitable asset exists.

## Content

- Eyebrow: "Speaking" (unchanged, `.eyebrow.lime`).
- Heading: "Speaking Engagements" (replaces "I speak about what I am building and learning.").
- Body copy: two short paragraphs (split from the current single paragraph), covering (1) what Pal offers as a speaker — TEDx speaker, topics in entrepreneurship, AI, sales, leadership, African business — and (2) a direct invitation to reach out.
- CTA: single button, "Invite Pal to Speak" → `#contact` (existing target, unchanged). "Watch Speaking Highlights" is dropped from this section; that content stays reachable via the Media section from the main nav.
- Talk list: the existing `#talks` list (populated by `script.js`'s `talks` array) moves below the collage+text block as a full-width compact strip, instead of sitting inline beside the copy.

## Layout & visual structure

- Desktop: two-column grid, same responsive pattern as the existing `.global-card` (photo collage ~55% left, text ~45% right). Section keeps `id="speaking"` in its current document position (between Journey and Lions Path).
- Mobile/tablet (existing 1100px/760px breakpoints): collapses to a single column, collage first, text below — consistent with how `.global-card` and `.community-grid` already respond.
- Photo collage: large photo (TEDx stage shot) with a second, smaller photo overlapping its bottom-right corner, offset up and to the right, thin border — visually similar to the existing `.press-shot` card treatment (border + shadow), not a new pattern.
- No new decorative motifs (e.g., the lime squiggle/arrow accent in the reference) — the site doesn't use that kind of decoration elsewhere, and adding it here only would be inconsistent. Skipped by explicit decision.
- Typography/buttons: reuse `.section-title`, `.head-copy`, `.button`/`.button-lime` classes as-is — no new component classes for text/buttons, only new classes for the collage/image layout itself.

## Assets

- Large photo: `assets/media/tedx-cover.jpeg` (existing, already in repo — a real TEDx Tanke stage photo).
- Small overlapping photo: a new photo of a conference/event audience, sourced from Pexels or Unsplash (free commercial-use license, no attribution required), saved to `assets/media/`. Apply the same `saturate()`/`contrast()` filter treatment already used on `.press-shot img` so the sourced photo visually matches Pal's own photography rather than looking like generic stock.

## Testing / verification

- Local preview server (`python3 -m http.server`), verified through the Claude Preview browser tooling used earlier this session.
- Screenshot at desktop/tablet/mobile widths, confirm collage and text reflow correctly at both existing breakpoints.
- Confirm no console errors after the change.
- Confirm the nav's `#speaking` link still scrolls to the section correctly.
- Confirm `.reveal` scroll-in animations still trigger on the new markup (reuse the existing `reveal` class pattern already used throughout the page).
- Confirm the "Invite Pal to Speak" button still links to `#contact`, and the talk-list still renders all six talk titles from `script.js`.

## Out of scope

- The video-grid hero section from the first reference screenshot — explicitly dropped by the user (insufficient video assets to populate it meaningfully).
- Any changes to other sections of the site.
