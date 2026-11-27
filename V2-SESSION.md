# NusaData v2 rebuild — session record (27 Nov 2026)

## Task
Rebuild the make.fun entry `best-national-statistics-site-20261126-0539`
("NusaData — Indonesia in Numbers") after round 1 judged it rank 1307 of
4140, score 540954. Rebuild decided by the 09:35 WIB make.fun watch run;
round 2 cutoff 00:39 WIB 28 Nov. Parent handles push + resubmit; this
session did NOT push, did NOT submit, and used NO private key.

## Diagnosis (why 1307/4140)
- Home screenshot wasted ~40% of the frame on an empty teal hero.
- Economy screenshot clipped a KPI card mid-way at the top edge.
- Charts were basic single-series bars/lines; no donut, no comparison,
  no sparklines — visually generic.
- No comparison story (nothing vs ASEAN peers).
- Data depth was good but invisible to a screenshots+outline judge.
- Every 4-KPI topic page showed a 3+1 orphan card in a 3-column grid.

## What v2 changes
- New Compare page (#/compare): Indonesia vs Vietnam, Thailand, Malaysia,
  Philippines, Singapore — IMF WEO October 2025 estimates, one vintage.
  Two hbar charts (total GDP; GDP per capita indexed Indonesia=100) +
  sortable table (Indonesia row highlighted) + "how to read this".
- Home hero rebuilt as two columns with an "Indonesia at a glance" panel;
  home KPI cards gained trend lines + sparklines.
- Series extended to 2015–2025 (growth, inflation, unemployment, exports)
  and 2019–2025 (visitors); every new figure verified against its source
  in-session (BPS releases/publications, IMF WEO Oct 2025, World Bank WDI).
  Exports series switched to the single latest BPS vintage (v1 mixed
  vintages; its own "+6.15%" note implied 2024 = 266.53).
- New chart types: donut (sector shares, centre 63.92%), target-band line
  (inflation vs BI 1.5–3.5% corridor), sparklines. 23 chart instances.
- All 4-KPI topic pages now use a 4-column grid.
- Bug fixed: niceTicks() could return a top tick below the data maximum,
  clipping bar tops/labels outside the SVG viewBox (found on the decade
  growth chart). Now extends one step when needed.
- Screenshots re-shot (4): home, Compare (scrollY 531, measured), regions
  map, phone home. 2-economy.jpg deleted (4-shot cap).
- Routes 13 → 14; indicators 31 → 35.

## Verification (this session)
- All 14 routes render; search works (2 hits / explicit no-match); table
  sorts on Regions and Compare; 404 works.
- Zero console errors, zero failed requests (one ERR_ABORTED in a driver
  run re-tested with a clean single load: zero — driver churn, not a
  site defect).
- All 4 screenshots visually checked; donut, band chart, decade growth
  chart checked separately at full size.
- Hand-in run twice → byte-identical (923,236 B total, dossier 515,356 B).
- Kit local check (existing kit copy, level 48): 4 passed, 1 failed
  (transcripts_present — parent bundles transcripts), 15 skipped,
  5 at submission. Kit NOT re-downloaded.
- Gemini: pre-build review (diagnosis + plan approved, risks noted and
  addressed) and post-build review (all arithmetic PASS). Every Gemini
  factual claim cross-checked against the session's own verification.

## Honest assessment
v2 is materially stronger on exactly what the judge sees: a dense,
distinctive home shot, a comparison page no generic "country in numbers"
site has, richer chart types, decade-long series, and no clipped or
empty frames. Whether that moves rank 1307 into the top 20 is not
knowable from here — the field is 4,140 entries, the board is blind, and
the top 10 are invisible — but v2 removes every identified reason for
the mid-field rank. Plausibly it moves up substantially; top 20 is a
stretch goal, not a promise.

## Files changed (branch v2)
app/data.js, app/charts.js, app/views.js, app/index.html, app/style.css,
README.md, BUILD.md, shots.json, shoot-stats.mjs, screenshots/ (1-cover,
2-compare [new], 3-regions, 4-home-phone; 2-economy deleted).
