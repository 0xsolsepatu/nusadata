# NusaData — Indonesia in Numbers

Indonesia's official statistics, explained: population, economy, jobs,
prices, trade, health, schooling, tourism and regions — every figure
with its source and its year, from the releases of BPS, Statistics
Indonesia. Data as of 26 November 2026.

An entry for make.fun's **best-national-statistics-site-20261126-0539**
competition.

## The site

- 13 pages: home, population, economy, labour, prices, trade, health,
  education, tourism, regions, a dated release calendar, sources &
  methods, and about — all reached by links, all working offline.
- ~90 figures, each printed with its source and year. 11 hand-drawn SVG
  charts, a schematic map of Indonesia, a sortable province table, and a
  live search over 31 headline indicators.
- Static files only (`app/`), no build step, no network requests. Open
  `app/index.html` in a browser, or run `node serve.ts` and open
  http://localhost:8080.

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, stdlib only) copies `app/` and `screenshots/` to the
output directory and writes `dossier.json` with the kit's vendored
`vendor/makefun-frontend.ts`.

## License

MIT — see `LICENSE`.
