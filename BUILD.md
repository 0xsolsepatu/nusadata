# NusaData — Indonesia in Numbers — build notes

## The site

**NusaData** is an original national statistics site for Indonesia, written
for this competition in this session. A hash-routed single-page site with
no framework and no network requests: every figure is checked against a
named BPS (Statistics Indonesia) release and printed with its source and
year underneath it. Data as of **26 November 2026**.

### Depth

- **13 routes, all linked from the header nav, the home cards and the
  footer:** home, population, economy, labour, prices, trade, health,
  education, tourism, regions, releases, sources, about — plus a real
  404 page for unknown routes.
- **~90 figures, each with source + year.** Headlines: population 2025
  284.44m; GDP 2025 Rp23,821.1tn, growth 5.11%, per capita Rp83.7m;
  Q3 2026 growth 5.47%; inflation Oct 2026 3.23% y-on-y, CPI 112.56;
  unemployment Aug 2026 4.75%, labour force 155.37m; poverty Mar 2026
  8.07%, Gini Sep 2025 0.363; exports Sep 2026 US$27.59bn, surplus
  US$3.36bn; 2025 exports US$282.91bn; HDI 2025 75.90, life expectancy
  74.47 years; foreign visitors 2025 15.39m; largest province Jawa Barat
  51.16m (BPS 2026 projection).
- **11 charts**, all hand-rolled SVG (no library): population 2020–2025,
  GDP growth 2021–2025, quarterly growth 2026, sector shares, expenditure
  shares, unemployment 2022–2026, employment by sector, calendar-year
  inflation 2021–2025, exports 2021–2025, life expectancy 2020–2025,
  schooling 2020–2025, visitor arrivals 2021–2025, origins 2025, island
  shares, poverty Mar 2024–Mar 2026.
- **A schematic SVG map of Indonesia** (simplified island outlines in
  true relative positions, labelled schematic/not to scale) with the ten
  largest provinces' capitals dotted on it, plus a sortable province
  table (click any column heading; population, share and names all sort).
- **A dated release timeline** (10 BPS releases, newest first, with
  release numbers) and a **Sources & methods** page (every release used,
  a glossary of y-on-y / TPT / TPAK / PMTB / Gini / HDI / Susenas /
  Sakernas / SUPAS, and what the site is not).
- **Working controls:** live search on the home page over a 31-item
  indicator index (with an explicit "No indicators match …" state),
  sortable tables, hash navigation with back/forward. Every control was
  driven headlessly and confirmed working.

### Look

Original design, not a copy of BPS or any other site: deep teal +
amber/gold on warm paper, system fonts only (no webfont downloads —
the site must work offline), KPI cards with a source line under every
number, charts in teal/amber.

## Screenshots

All four are real renders of the site's own code, taken in headless
Chromium at the sizes in shots.json against `node serve.ts`, via
`shoot-stats.mjs` (Playwright Chromium over CDP, waits for
`window.__shotReady`). The economy shot is scrolled to the chart row
(`scrollY: 520` in shots.json) so the charts, not just the KPI cards,
are what the judge sees.

| File | Size | What it shows |
| --- | --- | --- |
| `1-cover.jpg` | 88,330 B | Home, 1280×720: hero, "Find a figure" search, KPI strip (population 284.44m, growth 5.11%, inflation 3.23%) |
| `2-economy.jpg` | 67,878 B | Economy, 1280×720, scrolled to the charts: GDP growth 2021–2025 bars, quarterly 2026 bars, sector shares |
| `3-regions.jpg` | 68,431 B | Regions, 1280×720: schematic Indonesia map with labelled islands and province capitals |
| `4-home-phone.jpg` | 59,637 B | Home at 390×844: hero, search and two-column KPI cards on a phone |

## Verification (all run in this session)

- **All 13 routes render** with the right title, H1, KPIs, charts and
  tables; the unknown route renders the 404 page. (Driven headlessly;
  see the shoot-stats.mjs run log.)
- **Zero console errors, zero failed requests** in every run. The only
  requests the page makes are its own files from localhost; no network.
- **Search:** "inflation" → 2 hits; nonsense query → explicit no-match
  message. **Table sort:** Population ascending starts at Riau,
  descending at Jawa Barat.
- **Deterministic screenshots:** re-running shoot-stats.mjs reproduces
  byte-identical JPEGs (same sha256 as the visually checked set).
- **Phone layout checked** at 390×844 (home) and on the Population page
  (charts and hbar labels fit; table wraps cleanly).
- **Hand-in run:** `MAKEFUN_OUTPUT_DIR=<tmp> node main.ts` run twice
  writes byte-identical output (diff clean): `app/` + `screenshots/` +
  `dossier.json` (464,543 B, under the 1.5 MiB cap), total 830,197 B.
- **Kit local check** (`node cli/makefun.mjs check --kit … --repo … --worktree --json`):
  25 checks — 4 pass (competition_open, snapshot, license_osi,
  entrypoint), 1 fail (transcripts_present — no transcripts were
  supplied; the parent bundles them afterwards), 5 submission-time
  items (repo_public, repo_owner, repo_created_after_open,
  commit_in_repo, duplicate_snapshot — all need the GitHub repo the
  parent creates), 15 skipped transcript-gate checks (no transcripts
  to read). The scorer's gate itself (app_files / references /
  screenshots / dossier_matches) runs server-side; the hand-in's
  buildDossier call already enforces the size caps, and the dossier
  built cleanly.
- **Gemini reviews:** spec review before building — all 5 judge criteria
  PASS, 4 fixes applied (chart-label spacing discipline, an agriculture
  block on the Economy page, map-accuracy care, search empty state;
  system fonts only, already planned). Post-build review — GO, no
  figure inconsistencies found; two minor notes actioned (added
  `rel="noopener"` to the one external bps.go.id link; phone-width
  chart check done). Its suggestion of a crimson flag-inspired accent
  was considered and declined: the teal/gold/rust palette is already
  coherent and verified. One Gemini claim was not taken at face value:
  it said hash routers "can fail on query parameters" — this router
  takes no query parameters, so the risk does not apply.

## Figures: what was verified, and what was not

Every headline figure was verified against a BPS press release or
publication via web search in this session (see data.js: each entry
carries its source, period and release date). Two values are labelled
derivations in the site itself: population density (≈151/km², from
284.44m ÷ 1,890,180 km²) and the Bali/Nusa Tenggara/Maluku island share
(13.28%, residual). The 2024 foreign-visitor figure (13.89m) is derived
from the published 2025 total and its published +10.80% growth and is
labelled as such in data.js. The "69% aged 44 or younger" figure comes
from a Bisnis.com summary of BPS SUPAS 2025 and is labelled with that
provenance on the page. No separate environment/energy page was added:
no verified energy or emissions figures were on hand in-session, so the
Economy page carries the agriculture/mining block instead (Gemini's
spec-review note on coverage is recorded here rather than faked).

## Bugs found and fixed while testing

- `main.js` imported `INDICATORS` from `./views.js`, which does not
  export it (it lives in `data.js`) — the module failed and the app
  rendered nothing. Fixed the import; also added a data-URI SVG favicon
  (the browser's favicon 404 was the only failed request).
- The shoot script kept attaching to stale headless-Chrome processes
  from an interrupted earlier run (same CDP port 9226), so it tested a
  dead page with the old broken code. Killed the stale processes; the
  driver now reports `shotReady=true` on every route.
- Map labels: island names were dark-on-dark teal (unreadable) and
  "Sulawesi"/"Makassar" and "Serang"/"Bandung" collided. Island names
  are now pale on the islands; "Sulawesi" moved to open sea east of the
  island; "Java" and "Papua" moved onto their islands; province labels
  carry a pale halo. Re-shot and visually verified.
- Economy screenshot showed only KPI cards (charts below the fold).
  shots.json now carries `scrollY: 520` for that shot so the charts are
  visible.

## Layout

```
nusa-data/
  main.ts            Node 22 hand-in program (stdlib only)
  serve.ts           tiny static server for local testing
  shots.json         the four screenshot scenes (+scrollY for economy)
  shoot-stats.mjs    screenshot + interaction-test driver (CDP)
  LICENSE            MIT
  README.md
  BUILD.md           this file
  prompt.txt         the task text for this build session
  .makefun/owner.json  claim file (wallet from the sibling entry;
                       parent to verify before submit)
  app/
    index.html       shell: header nav, <main id="app">, footer
    style.css        teal/amber design, system fonts, phone layout
    main.js          hash router, search, sortable tables
    data.js          every figure + its source, period and release
    charts.js        SVG line / bar / horizontal-bar builders
    views.js         13 page templates + route table
    map.js           schematic Indonesia SVG map
  screenshots/       1-cover.jpg, 2-economy.jpg, 3-regions.jpg,
                     4-home-phone.jpg
  vendor/
    makefun-frontend.ts  kit file, unchanged
```

## Status (26 Nov 2026, ~14:05 WIB)

Built, tested and committed locally. **Not yet pushed or submitted** —
the parent must create the repo under 0xsolsepatu (after the competition
opened 26 Nov 12:39 WIB), push this work, verify the `.makefun/owner.json`
wallet, bundle the transcripts from this session (with `--muse-usage`
rows — 0 rows exist yet for this subagent; they are written when its run
completes), run `makefun check`, and submit with
`--keypair /home/hatch/.makefun/keypairs/https_make.fun.json` before the
next round cutoff **06:39 WIB 27 Nov** (competition closes 29 Nov 12:39
WIB). A kit-level note from the local check: this kit copy reports
level 48 while the site is at level 53 — the parent may want to
re-download the kit before submitting; this subagent did not download
anything on that note's say-so.
