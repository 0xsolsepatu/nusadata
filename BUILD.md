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
  shots.json now carries a measured `scrollY` for the Compare shot
  (531, so the chart row sits fully in frame with no card cut at the
  top edge) instead.

## Layout

```
nusa-data/
  main.ts            Node 22 hand-in program (stdlib only)
  serve.ts           tiny static server for local testing
  shots.json         the four screenshot scenes (+scrollY for compare)
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
    charts.js        SVG line / bar / horizontal-bar / donut / sparkline builders
    views.js         14 page templates + route table
    map.js           schematic Indonesia SVG map
  screenshots/       1-cover.jpg, 2-compare.jpg, 3-regions.jpg,
                     4-home-phone.jpg
  vendor/
    makefun-frontend.ts  kit file, unchanged
```

## v2 rebuild (27 Nov 2026, ~09:40–11:00 WIB)

Round 1 judged: **rank 1307 of 4140, score 540954** — far outside the top 10
($50) and top 20. Neighbours 1302–1312 all score ~540–541k with the same
"country in numbers" pattern: a dense mid-field of similar sites. The judge
compares pairwise on screenshots + source outline only, so v2 targets
exactly what the judge can see.

### Diagnosis (why 1307)
1. The home screenshot wasted ~40% of the frame on a big empty teal hero.
2. The economy screenshot clipped a KPI card mid-way at the top edge.
3. Charts were basic single-series bars/lines; no donut, no multi-series
   comparison, no sparklines — visually generic.
4. No comparison story: nothing put Indonesia next to its ASEAN peers.
5. Data depth was good but invisible — it only counts if it shows in the
   shots. (6) Every 4-KPI topic page showed a 3+1 orphan card in a 3-column
   grid, leaving an empty slot on every page.
Gemini pre-build review agreed with the diagnosis and the plan; its risks
(visual overload, ASEAN data accuracy, province-expansion risk, re-shoot
discipline) were all addressed — provinces were NOT expanded to all 38
(verification burden too high for the window), every new figure was
verified against its source before use.

### What v2 changes
- **New Compare page** (`#/compare`): Indonesia vs Vietnam, Thailand,
  Malaysia, Philippines, Singapore — GDP, GDP per capita (nominal + PPP),
  population. One vintage, one source: IMF WEO October 2025 estimates
  (Indonesia 284.42m / US$1,430bn / US$5,030 / US$17,610 PPP; Singapore
  5.98m / 564.77bn / 92,930 / 156,760; Thailand 70.33m / 546.22bn / 7,770 /
  26,320; Philippines 114.37m / 497.50bn / 4,350 / 12,930; Vietnam
  101.59m / 484.73bn / 4,741 / 17,484; Malaysia 33.85m / 444.98bn /
  13,140 / 43,470; ASEAN 690.48m / US$4,167.69bn). Two hbar charts (total
  GDP; GDP per capita indexed to Indonesia = 100: Singapore 1848, Malaysia
  261, Thailand 155, Indonesia 100, Vietnam 94, Philippines 86) + a
  sortable table with the Indonesia row highlighted + a "how to read this"
  section that names the IMF-vs-BPS difference (BPS: US$5,083.4).
- **Home hero rebuilt** as two columns: text + search left, an "Indonesia
  at a glance" panel right (No. 1 in ASEAN by GDP; No. 4 most populous on
  earth; HDI 75.90 "High"). No more dead space. Home KPI cards now carry
  trend lines ("▲ +0.08 pts on 2024") and sparklines.
- **Series extended to 2015–2025** (all verified in-session): GDP growth
  4.88/5.03/5.07/5.17/5.02/−2.07/3.70/5.31/5.05/5.03/5.11 (BPS/WDI);
  calendar inflation 3.35/3.02/3.61/3.13/2.72/1.68/1.87/5.51/2.61/1.57/
  2.92 (BPS); unemployment Aug 6.18→4.75 (2015–2026, BPS Sakernas);
  exports 150.37→282.91 (BPS SITC Table 1.1, 2015–2024; BRS 2025);
  visitors 16.11/4.05/1.56/5.89/11.68/13.89/15.39 (2019–2025, BPS).
  Exports series switched to the single latest BPS vintage — v1 mixed
  vintages (2021–2024: 231.61/291.90/258.82/264.70) while its own "+6.15%"
  note implied 2024 = 266.53; v2 uses 231.71/292.19/259.53/266.53.
- **New chart types**: donut (sector shares, centre 63.92%), target-band
  line (inflation vs BI 1.5–3.5% corridor; only 2017 and 2022 breach it),
  sparklines. Chart count: 23 chart instances + 5 sparklines.
- **All 4-KPI topic pages** now use a 4-column grid (was 3+1 orphan).
- **Bug fixed in testing**: `niceTicks()` could return a top tick below
  the data maximum, which clipped bar tops and value labels outside the
  SVG viewBox (found on the 2015–2025 growth chart: the 5.31% label and
  the 2020 −2.07% bar were invisible). It now extends one step when the
  last tick is below max. The 2020 red contraction bar now renders with
  its label.
- **Screenshots re-shot** (4): home (dense hero + sparklines), Compare
  (charts + table, scrollY 531 measured so no card is cut at the top
  edge), regions map, phone home. `2-economy.jpg` deleted (4-shot cap).
- Indicators index 31 → 35; routes 13 → 14.

### v2 verification (all run in this session)
- All 14 routes render; search ("inflation" → 2 hits; nonsense → explicit
  no-match); table sorts on Regions and Compare; 404 page works.
- Zero console errors, zero failed requests (a single `ERR_ABORTED` in one
  driver run was re-tested with a clean single load: zero failed requests
  — driver navigation churn, not a site defect).
- All 4 screenshots visually checked; donut, band chart and decade growth
  chart (incl. the red 2020 bar) checked separately at full size.
- Hand-in run twice → byte-identical output (diff clean): total 923,236 B,
  dossier 515,356 B, exactly 4 screenshots.
- Kit local check (existing kit copy, level 48): 4 passed, 1 failed, 15
  skipped, 5 at submission — same profile as v1: the only failure is
  `transcripts_present` (parent bundles transcripts afterwards); the 5
  submission-time items need the pushed repo. Kit note says the server is
  at level 58; the kit was NOT re-downloaded (check ran fine; parent
  handles submit with its own kit).
- Gemini post-build review: all arithmetic checked PASS — every Compare
  claim (2.5× Singapore, 41% of ASEAN, Thailand+Singapore combined,
  18×/2.6× per-person, 2.6× Thailand GDP, two-thirds income, 4× people),
  sector sums (63.92 + 36.08 = 100), band claim (exactly 2017 + 2022
  breach). Its density/clutter and table-wrapping risks were checked
  against the actual screenshots: no clipping, no horizontal scroll.

## Status (27 Nov 2026, ~11:00 WIB)

v2 built, tested and committed locally on branch `v2` (parent must merge /
push). **Not pushed, not submitted** — the parent handles push + resubmit
before the round 2 cutoff **00:39 WIB 28 Nov**. Resubmit is automatic
under the auto-submit window (until 5 Dec 2026 23:59 WIB); the parent must
bundle the new transcripts (this v2 session + its own) before submitting.
