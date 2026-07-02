# Homepage overhaul — stevenbartlett.com structure

## Context

After the Speaking Engagements redesign shipped, the user clarified the real goal: the whole homepage should follow stevenbartlett.com's structure and feel, not just one section. Reference screenshots: the DOAC tile-wall section (wall of media tiles, dimmed, centered logo + tagline + pill button) and the Speaking Engagements collage. User approved a 7-section mapping ("build exactly this").

## Approved structure (all reusing existing assets, dark theme + lime accent + current fonts stay)

1. **Hero** — keep full-screen intro video + sound toggle; add SB-style rotating descriptor line under the name cycling: Entrepreneur → Founder of Unovia Technologies → TEDx Speaker → Convener, Lions Path (animated word swap; respects prefers-reduced-motion).
2. **Featured grid** — 6 equal tiles (image + heading + arrow): Unovia (→unovia.ai), Amber (→amber.unovia.ai), Lana (→lana.unovia.ai), Arthena (→#contact), Lions Path (→#lions-path), TEDx Talk (→#media). Replaces the separate Unovia feature-card and products sections.
3. **Timeline** — vertical chronology replacing the journey-stack: Pal Bass Academy → Real Estate → Technology/Unovia, using existing journey photos/videos, numbered chapters (01/02/03 — no invented years). Reuses the existing dormant `.chapter` CSS where possible.
4. **News & Stories** — uniform card grid (thumbnail + category label + headline): 2 ThisDay press articles (link out) + 4 idea cards. Replaces the separate press-showcase and ideas sections.
5. **Tile wall** — full-width static grid of photo tiles from the 38 hall-of-fame images, dimmed, with centered overlay (name/logotype + tagline + outline pill button). Replaces the scrolling fame-rail marquee. Story portals (TEDx/AI lecture) stay in the media section.
6. **Speaking Engagements** — keep the shipped collage layout; fix the main TEDx photo crop so Pal on stage is the focal point (currently the blurred foreground audience head dominates). Crop the source image rather than fighting object-position.
7. **Footer** — keep "Still Building." marquee; add socials row (LinkedIn + email; more when provided).

Nav labels update to match the new sections; all existing anchor ids that scripts/links depend on remain valid or are redirected.

## Out of scope
- No build framework/dependencies; site stays fully static.
- No new decorative motifs beyond what the reference sections require.
- No invented facts (no fabricated years/stats in the timeline).

## Verification
Preview server + Claude Preview tooling per section: screenshot desktop/mobile, console clean, no failed asset requests, nav anchors work, reveal animations fire. Full pass before deploy; preview deploy before production.
