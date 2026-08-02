# TODO

Things temporarily hidden/commented out in code, to revisit later.

## Hidden — re-enable when ready

- **Trust bar** ("Trusted across industries") — commented out in
  `src/app/page.tsx`, along with the `CLIENTS` array it uses.
- **Work nav link** (and its "Case Studies" sub-link) — commented out in
  `src/components/Header.tsx` (`NAV_LINKS`) and `src/components/Footer.tsx`
  (Company links). The routes themselves are live and share one implementation
  (`src/components/Portfolio.tsx`); fill in `work` / `caseStudies` in
  `src/data/portfolio.ts` to populate them.

## Removed — recover from git if wanted

- **Testimonials section** — `TestimonialsSlider` + `data/testimonials.ts`
  were deleted (they were only reachable from commented-out imports). Last
  present in commit `139de46`.

## Waiting on credentials

Zoho SMTP host/port/user/app-password (`COMPANY_*` in `.env`)
GTM container ID (`NEXT_PUBLIC_GTM_ID`)

To bring a hidden block back, uncomment the marked block(s) in the file(s)
above.
