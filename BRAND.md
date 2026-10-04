# Speeir Brand Kit

Identity reference for speeir.com — who we are, how we sound, how the logo
is used. For color, type, and component specs see [DESIGN.md](DESIGN.md);
this file doesn't repeat those tables.

---

## Identity

- **Name:** Speeir (legal: Speeir LTD). Always capitalized as "Speeir", never
  "SPEEIR" or "speeir" in copy.
- **Tagline:** "Software agency that builds what it pitches."
- **One-liner:** Speeir designs and ships web, mobile, and custom software,
  building its own products first.
- **Mission:** To bridge the gap between business and technology,
  transforming ideas into powerful digital products that drive growth and
  create exceptional user experiences.
- **HQ:** Dublin, Ireland. Team operates a blended model — local
  accountability, global delivery network.

## Voice

- **Confident, not hypey.** States capability directly ("we build what we
  pitch") rather than with superlatives ("best-in-class", "revolutionary").
- **Short sentences, plain words.** Avoid jargon stacking — one technical
  term per sentence, not three.
- **Client-first framing.** Copy leads with the outcome for the reader
  ("drive growth", "exceptional user experiences"), not the company's
  internal process.
- Second person for CTAs ("Start a project"), third person/"we" for
  descriptive copy.

## Logo

- Source: [public/logo.svg](public/logo.svg), used via
  [Logo.tsx](src/components/Logo.tsx). Native aspect ratio 132:73.
- Header render height is `h-9` (36px); never stretch off-ratio.
- Clearspace: keep at least the height of the wordmark's cap-height clear on
  all sides.
- Only render on light backgrounds (`surface`/`white`) or `ink` — the mark
  has no dedicated reversed/mono variant, so don't place it over photography
  or busy gradients without a solid backing.
- Favicon/apple-touch/OG all reuse the same `logo.svg` — don't introduce a
  second mark.

## Color & type (quick reference)

Full rules, usage patterns, and Tailwind tokens live in
[DESIGN.md](DESIGN.md#color). For external use (decks, social, docs):

| Swatch | Hex |
|---|---|
| Brand purple | `#A15FDC` |
| Amber accent | `#D4A043` |
| Ink (text/dark) | `#14181C` |
| Surface (page bg) | `#F3F4F8` |

Typeface: **Geist Sans** (Google Fonts), one family, semibold for headings.

## Contact & social

- Email: `info@speeir.com`
- LinkedIn: [ie.linkedin.com/company/speeir](https://ie.linkedin.com/company/speeir)
- Instagram: [instagram.com/speeir.ltd](https://www.instagram.com/speeir.ltd/)
- Facebook: [facebook.com/people/Speeir](https://www.facebook.com/people/Speeir/61576228562819/)

Canonical domain: `https://speeir.com`. Links list is shared from
[src/data/social.ts](src/data/social.ts) — update there, not per-page.
