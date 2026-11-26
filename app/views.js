// Page templates for NusaData. Every page is built from data.js, so a
// figure on screen always carries the source and year its data entry
// carries. Nothing is hard-coded twice: change a number in data.js and
// every page that shows it changes with it.

import {
  AS_OF, POPULATION, ECONOMY, LABOUR, PRICES, TRADE, HEALTH, EDUCATION,
  TOURISM, POVERTY, RELEASES, INDICATORS, SOURCES,
} from './data.js';
import { lineChart, barChart, hbarChart } from './charts.js';
import { indonesiaMap } from './map.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const num = (v, d = 2) => Number(v).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

// One figure, with its source and period printed under it — the site's
// basic promise: no number without a source.
function fig(value, unit, label, source, note) {
  return `<div class="kpi"><div class="kpi-value">${value}</div><div class="kpi-unit">${esc(unit)}</div>
  <div class="kpi-label">${esc(label)}</div>
  <div class="kpi-src">Source: ${esc(source)}${note ? ` · ${esc(note)}` : ''}</div></div>`;
}

function srcBox(source) {
  return `<p class="srcbox">All figures on this page: ${esc(source)}</p>`;
}

function section(title, inner) {
  return `<section class="block"><h2>${esc(title)}</h2>${inner}</section>`;
}

function chartCard(title, svg, caption) {
  return `<div class="chart-card"><h3>${esc(title)}</h3>${svg}<p class="caption">${esc(caption)}</p></div>`;
}

function navCards() {
  const pages = [
    ['#/population', 'Population', '284.44m people in 2025, where they live, and how fast the count grows.'],
    ['#/economy', 'Economy', 'GDP Rp23,821 trillion in 2025, growth 5.11%, and what drives it.'],
    ['#/labour', 'Labour', '155.37m in the labour force; open unemployment 4.75% in August 2026.'],
    ['#/prices', 'Prices', 'Inflation 3.23% y-on-y in October 2026 — what got dearer, and why.'],
    ['#/trade', 'Trade', 'Exports US$282.91bn in 2025; a US$3.36bn surplus in September 2026.'],
    ['#/health', 'Health', 'Life expectancy 74.47 years; Human Development Index 75.90 in 2025.'],
    ['#/education', 'Education', '13.30 expected years of schooling; 9.07 mean years in 2025.'],
    ['#/tourism', 'Tourism', '15.39m foreign visitors in 2025 — the most in six years.'],
    ['#/regions', 'Regions', 'The ten largest provinces and the islands they sit on.'],
    ['#/releases', 'Release calendar', 'Every BPS release this site uses, newest first, with dates.'],
  ];
  return `<div class="cards">${pages.map(([href, t, d]) => `<a class="card" href="${href}"><span class="card-title">${t}</span><span class="card-desc">${d}</span><span class="card-go">Open →</span></a>`).join('')}</div>`;
}

function releasesList(items) {
  return `<ol class="releases">${items.map((r) => `<li><span class="rel-date">${esc(r.date)}</span><span class="rel-title">${esc(r.title)}</span><span class="rel-detail">${esc(r.detail)}</span><span class="rel-src">Source: ${esc(r.source)}</span></li>`).join('')}</ol>`;
}

// --- Home -------------------------------------------------------------------
export function home() {
  const kpis = [
    fig('284.44m', 'people', 'Population, 2025', SOURCES.bps, 'Mid-year projection'),
    fig('5.11%', 'growth', 'Economy, 2025', SOURCES.bpsBrs, 'Released 5 Feb 2026'),
    fig('3.23%', 'y-on-y', 'Inflation, Oct 2026', SOURCES.bpsBrs, 'Released 2 Nov 2026'),
    fig('4.75%', 'open unemployment', 'Labour, Aug 2026', SOURCES.bpsBrs, 'Released 5 Nov 2026'),
    fig('8.07%', 'of the population', 'Poverty, Mar 2026', SOURCES.bpsBrs, 'Released 5 Aug 2026'),
    fig('75.90', 'index', 'Human Development, 2025', SOURCES.bpsBrs, 'Released 5 Nov 2025'),
  ].join('');
  return `
  <div class="hero">
    <p class="eyebrow">Indonesia · Official statistics, explained</p>
    <h1>Indonesia in numbers</h1>
    <p class="lede">The population, the economy, jobs, prices, trade, health and schooling — every figure with its source and its year, from the releases of BPS, Statistics Indonesia. Data as of <strong>${esc(AS_OF)}</strong>.</p>
    <div class="search-wrap">
      <label for="search">Find a figure</label>
      <input id="search" type="search" placeholder="Try “inflation”, “exports”, “unemployment”…" autocomplete="off">
      <div id="search-results" class="search-results" aria-live="polite"></div>
    </div>
  </div>
  <div class="kpi-grid">${kpis}</div>
  <div class="chart-row">
    ${chartCard('Population, 2020–2025 (millions)', lineChart({ series: POPULATION.series, decimals: 2, title: 'Population 2020 to 2025' }), POPULATION.seriesSource + '.')}
    ${chartCard('Economic growth, 2021–2025 (% a year)', barChart({ series: ECONOMY.growthSeries, decimals: 2, unit: '%', title: 'GDP growth 2021 to 2025' }), ECONOMY.growthSeriesSource + '.')}
  </div>
  ${section('Latest releases', releasesList(RELEASES.slice(0, 5)) + `<p class="more"><a href="#/releases">See all ${RELEASES.length} releases →</a></p>`)}
  ${section('Explore the numbers', navCards())}
  <p class="fineprint">NusaData is an independent site. It republishes figures from public BPS releases and says so under every number; it is not affiliated with BPS. Figures are shown exactly as published — see <a href="#/sources">Sources &amp; methods</a>.</p>`;
}

// --- Population ---------------------------------------------------------------
export function population() {
  const provRows = POPULATION.provinces
    .map((p) => `<tr><td>${esc(p.name)}</td><td>${esc(p.capital)}</td><td>${num(p.value)}m</td><td>${num((p.value / POPULATION.provincesTotal2026) * 100, 1)}%</td></tr>`)
    .join('');
  return `
  <p class="crumb"><a href="#/">← Home</a></p>
  <h1>Population</h1>
  <p class="lede">Indonesia is the world's fourth most populous country. Growth has slowed to about 1% a year, and more than half the population still lives on Java.</p>
  <div class="kpi-grid">
    ${fig('284.44m', 'people', 'Population, 2025', SOURCES.bps, 'Mid-year projection')}
    ${fig('1.01%', 'a year', 'Growth, 2025', SOURCES.bps, 'Down from 1.04% in 2024')}
    ${fig('≈151', 'people per km²', 'Density, 2025', SOURCES.bps, 'Derived: 284.44m ÷ 1,890,180 km²')}
    ${fig('69%', 'aged 44 or younger', 'A young country, 2025', SOURCES.bpsSupas, 'SUPAS 2025')}
  </div>
  <div class="chart-row">
    ${chartCard('Population, 2020–2025 (millions)', lineChart({ series: POPULATION.series, decimals: 2, title: 'Population 2020 to 2025' }), POPULATION.seriesSource + '. 2020 is the Census count; later years are projections.')}
    ${chartCard('Where people live — share by island, 2024 (%)', hbarChart({ series: POPULATION.islands.map((i) => ({ name: i.name, value: i.value })), decimals: 1, title: 'Population share by island' }), POPULATION.islandsSource + '. Bali, Nusa Tenggara & Maluku is the residual share.')}
  </div>
  ${section('The ten largest provinces', `<p>Projections for 2026, from BPS's statistical yearbook. Jawa Barat alone holds more people than Spain.</p>
  <table class="data-table"><thead><tr><th>Province</th><th>Capital</th><th>Population</th><th>Share of Indonesia</th></tr></thead>
  <tbody>${provRows}</tbody></table>
  <p class="caption">${esc(POPULATION.provincesSource)} · Total population, 2026 projection: ${POPULATION.provincesTotal2026}m.</p>`)}
  ${section('In brief', `<ul class="bullets">
    <li><strong>17,380 islands</strong> and <strong>718 regional languages</strong> (BPS).</li>
    <li><strong>Java holds 54.36%</strong> of the population on about 7% of the land (BPS, mid-2024 projection).</li>
    <li>The <strong>poverty rate was 8.07%</strong> in March 2026 and the <strong>Gini ratio 0.363</strong> in September 2025 — see the figures below.</li>
  </ul>`)}
  ${section('Poverty and inequality', `<div class="chart-row">
    ${chartCard('Poverty rate, Mar 2024 – Mar 2026 (%)', lineChart({ series: POVERTY.povertySeries, decimals: 2, unit: '%', color: '#b3541e', title: 'Poverty rate' }), POVERTY.povertySeriesSource + '.')}
    <div class="chart-card"><h3>March 2025, in detail</h3>
    <ul class="bullets">
    <li><strong>23.85m people</strong> below the poverty line (8.47%).</li>
    <li><strong>Urban 6.73%</strong> · <strong>rural 11.03%</strong> — poverty is still mostly a rural story.</li>
    <li><strong>Poverty line Rp609,160</strong> per person a month (≈ Rp20,305 a day).</li>
    <li><strong>Extreme poverty 0.85%</strong> — 2.38m people.</li>
    <li><strong>Gini ratio 0.375</strong> (Mar 2025), falling to <strong>0.363</strong> by Sep 2025.</li>
    </ul><p class="caption">Source: ${esc(SOURCES.bpsSusenas)}; Gini Sep 2025: ${esc(SOURCES.bpsBrs)}.</p></div>
  </div>`)}
  ${srcBox(SOURCES.bps + ' — population, Susenas and SUPAS releases.')}`;
}

// --- Economy ------------------------------------------------------------------
export function economy() {
  return `
  <p class="crumb"><a href="#/">← Home</a></p>
  <h1>Economy</h1>
  <p class="lede">Southeast Asia's largest economy: Rp23,821 trillion of output in 2025, growing 5.11% — and faster still in the first nine months of 2026.</p>
  <div class="kpi-grid">
    ${fig('Rp23,821.1tn', 'current prices', 'GDP, 2025', SOURCES.bpsBrs, 'Released 5 Feb 2026')}
    ${fig('5.11%', 'a year', 'Growth, 2025', SOURCES.bpsBrs, '2024: 5.03%')}
    ${fig('Rp83.7m', 'per person', 'GDP per capita, 2025', SOURCES.bpsBrs, 'US$5,083.4')}
    ${fig('5.47%', 'y-on-y', 'Growth, Q3 2026', SOURCES.bpsBrs, 'Released 5 Nov 2026')}
  </div>
  <div class="chart-row">
    ${chartCard('Economic growth, 2021–2025 (% a year)', barChart({ series: ECONOMY.growthSeries, decimals: 2, unit: '%', title: 'GDP growth 2021 to 2025' }), ECONOMY.growthSeriesSource + '.')}
    ${chartCard('Growth by quarter, 2026 (% y-on-y)', barChart({ series: ECONOMY.quarterly2026, decimals: 2, unit: '%', color: '#b3541e', title: 'Quarterly growth 2026' }), ECONOMY.quarterlySource + '.')}
  </div>
  ${section('What the economy is made of — 2025', `<p>Five industries make up ${ECONOMY.sectorsTop5Share}% of GDP. Manufacturing alone is nearly a fifth.</p>
  <div class="chart-card">${hbarChart({ series: ECONOMY.sectors.map((s) => ({ name: s.name, value: s.value })), decimals: 2, title: 'Share of GDP by industry, 2025' })}<p class="caption">${esc(ECONOMY.sectorsSource)} · Share of GDP at current prices. Amounts: manufacturing Rp${num(ECONOMY.sectors[0].amount, 1)}tn; trade Rp${num(ECONOMY.sectors[1].amount, 1)}tn; agriculture Rp${num(ECONOMY.sectors[2].amount, 1)}tn; construction Rp${num(ECONOMY.sectors[3].amount, 1)}tn; mining Rp${num(ECONOMY.sectors[4].amount, 1)}tn.</p></div>
  <table class="data-table"><thead><tr><th>Industry</th><th>Share of GDP</th><th>Growth, 2025</th></tr></thead><tbody>
  ${ECONOMY.sectors.map((s) => `<tr><td>${esc(s.name)}</td><td>${num(s.value)}%</td><td>${s.growth === null ? '—' : `${s.growth > 0 ? '+' : ''}${num(s.growth)}%`}</td></tr>`).join('')}
  </tbody></table>`)}
  ${section('What people spend on — 2025', `<div class="chart-card">${hbarChart({ series: ECONOMY.expenditure, decimals: 2, title: 'GDP by expenditure, 2025' })}<p class="caption">${esc(ECONOMY.expenditureSource)} · Shares of GDP; components sum to more than 100% because imports are subtracted.</p></div>
  <p>Household consumption is the engine: <strong>53.88%</strong> of GDP, and <strong>51.97%</strong> in Q3 2026, growing 5.04% y-on-y. Investment (PMTB) grew <strong>6.06%</strong> in Q3 2026.</p>`)}
  ${section('Fastest-growing industries, 2025', `<ul class="bullets">
    ${ECONOMY.fastestGrowing.map((f) => `<li><strong>${esc(f.name)}: +${num(f.value)}%</strong></li>`).join('')}
    <li><strong>Agriculture grew 5.33%</strong> — food crops +${num(ECONOMY.agriculture.foodCrops)}%, livestock +${num(ECONOMY.agriculture.livestock)}%.</li>
    <li><strong>Mining was the only industry to shrink</strong> (−0.66%).</li>
    <li><strong>Q4 2025 grew 5.39%</strong> — the strongest fourth quarter since the pandemic.</li>
  </ul><p class="caption">Source: ${esc(SOURCES.bpsBrs)}.</p>`)}
  ${srcBox(SOURCES.bpsBrs + ' — GDP releases, 5 Feb 2026 and 5 Nov 2026; ' + SOURCES.bps + ', Pendapatan Nasional Indonesia 2021–2025.')}`;
}

// --- Labour -------------------------------------------------------------------
export function labour() {
  return `
  <p class="crumb"><a href="#/">← Home</a></p>
  <h1>Labour</h1>
  <p class="lede">155.37 million people in the labour force in August 2026. Unemployment is at its lowest in years — but nearly six in ten workers are informal.</p>
  <div class="kpi-grid">
    ${fig('4.75%', 'open unemployment', 'TPT, Aug 2026', SOURCES.bpsBrs, 'Aug 2025: 4.85%')}
    ${fig('155.37m', 'people', 'Labour force, Aug 2026', SOURCES.bpsSakernas, 'TPAK 70.33%')}
    ${fig('147.99m', 'people', 'Employed, Aug 2026', SOURCES.bpsSakernas, '+1.44m on Aug 2025')}
    ${fig('Rp3.42m', 'a month', 'Average wage, Aug 2026', SOURCES.bpsSakernas, 'Labourers’ average wage')}
  </div>
  <div class="chart-row">
    ${chartCard('Open unemployment rate, August each year (%)', lineChart({ series: LABOUR.tptSeries, decimals: 2, unit: '%', title: 'Unemployment rate 2022 to 2026' }), LABOUR.tptSeriesSource + '.')}
    ${chartCard('Where people work — share of the employed, Aug 2026 (%)', hbarChart({ series: LABOUR.bySector, decimals: 2, title: 'Employment by sector' }), LABOUR.bySectorSource + '. Agriculture still employs more people than any other sector.')}
  </div>
  ${section('Formal or informal?', `<ul class="bullets">
    <li><strong>Formal workers: 42.07%</strong> (62.25m people) — down from 42.20% a year earlier, though up 410,000 in absolute terms.</li>
    <li><strong>Informal workers: 57.93%</strong> of the employed.</li>
    <li><strong>Full-time: 67.47%</strong> (99.85m) · <strong>part-time: 23.85%</strong> (35.29m) · <strong>underemployed: 8.68%</strong> (12.84m) — underemployment rose from 7.91% in Aug 2025.</li>
    <li><strong>Working-age population: 220.91m</strong>; 65.54m are outside the labour force.</li>
    <li><strong>Highest unemployment by schooling: vocational high school (SMK), 8.63%</strong> (Aug 2025).</li>
  </ul><p class="caption">Source: ${esc(SOURCES.bpsSakernas)}, August 2026; SMK figure: August 2025.</p>`)}
  ${srcBox(SOURCES.bpsBrs + ' — Keadaan Ketenagakerjaan Indonesia, August 2026 (released 5 Nov 2026).')}`;
}

// --- Prices -------------------------------------------------------------------
export function prices() {
  return `
  <p class="crumb"><a href="#/">← Home</a></p>
  <h1>Prices</h1>
  <p class="lede">Inflation was 3.23% in October 2026 — inside Bank Indonesia's 2.5% ± 1% target corridor, but the highest October reading in five years. Food did most of the pushing.</p>
  <div class="kpi-grid">
    ${fig('3.23%', 'y-on-y', 'Inflation, Oct 2026', SOURCES.bpsBrs, 'Released 2 Nov 2026')}
    ${fig('0.22%', 'm-to-m', 'Monthly, Oct 2026', SOURCES.bpsBrs, 'Sep 2026: 0.30%')}
    ${fig('112.56', 'index', 'Consumer Price Index, Oct 2026', SOURCES.bpsBrs, 'Sep 2026: 112.31')}
    ${fig('2.40%', 'year-to-date', 'Calendar-year, Oct 2026', SOURCES.bpsBrs, 'Full-year 2025: 2.92%')}
  </div>
  <div class="chart-row">
    ${chartCard('Calendar-year inflation, 2021–2025 (%)', barChart({ series: PRICES.calendarSeries, decimals: 2, unit: '%', title: 'Calendar-year inflation' }), PRICES.calendarSource + '. 2022 spiked to 5.51% on administered fuel-price rises; 2024 fell to 1.57%.')}
    <div class="chart-card"><h3>What drove October 2026?</h3>
    <ul class="bullets">
      <li><strong>Food, beverages &amp; tobacco: +4.82% y-on-y</strong> — the biggest contributor, 1.40 percentage points of the 3.23%.</li>
      <li><strong>Core inflation: 2.56% y-on-y</strong> (Oct 2025: 2.36%).</li>
      <li><strong>Transport: 0.59 points</strong>; personal care &amp; other services: 0.32 points.</li>
      <li><strong>Single biggest item: bird's eye chilli — 0.24 points.</strong> Fresh fish, rice, cooking oil and chicken followed.</li>
      <li><strong>26 of 38 provinces</strong> ran above the national rate; DKI Jakarta was lowest at 2.52%.</li>
    </ul><p class="caption">Source: ${esc(SOURCES.bpsBrs)}, October 2026 release.</p></div>
  </div>
  ${section('How to read inflation', `<ul class="bullets">
    <li><strong>y-on-y</strong> compares prices with the same month a year earlier — the headline number.</li>
    <li><strong>m-to-m</strong> compares with last month — the freshest signal, but noisy.</li>
    <li><strong>Calendar-year (y-to-d)</strong> compares with last December — how far prices have moved this year.</li>
    <li>The target corridor is <strong>2.5% ± 1%</strong>: October 2026's 3.23% sits inside it.</li>
  </ul>`)}
  ${srcBox(SOURCES.bpsBrs + ' — inflation releases, 3 Nov 2025 and 2 Nov 2026; Bank Indonesia, Analisis Inflasi Oktober 2025.')}`;
}

// --- Trade --------------------------------------------------------------------
export function trade() {
  return `
  <p class="crumb"><a href="#/">← Home</a></p>
  <h1>Trade</h1>
  <p class="lede">Indonesia has run a trade surplus every month since mid-2020. In September 2026 it was US$3.36bn — but imports are now growing far faster than exports.</p>
  <div class="kpi-grid">
    ${fig('US$27.59bn', 'exports', 'September 2026', SOURCES.bpsBrs, '+11.87% y-on-y')}
    ${fig('US$24.23bn', 'imports', 'September 2026', SOURCES.bpsBrs, '+18.41% y-on-y')}
    ${fig('US$3.36bn', 'surplus', 'September 2026', SOURCES.bpsBrs, 'Non-oil +US$5.67bn; oil −US$2.31bn')}
    ${fig('US$282.91bn', 'exports', 'Full year 2025', SOURCES.bpsBrs, '+6.15% on 2024; surplus US$41.05bn')}
  </div>
  <div class="chart-row">
    ${chartCard('Exports, 2021–2025 (US$ billion)', barChart({ series: TRADE.exportsSeries, decimals: 0, unit: '', color: '#0b6b5e', title: 'Exports 2021 to 2025' }), TRADE.exportsSeriesSource + '. 2022 was the commodity-price peak.')}
    <div class="chart-card"><h3>January – September 2026</h3>
    <ul class="bullets">
      <li><strong>Exports US$221.23bn</strong> (+5.58% y-on-y) · <strong>imports US$210.63bn</strong> (+19.67%).</li>
      <li><strong>Surplus US$10.61bn</strong> — down from US$33.54bn a year earlier, as imports surged.</li>
      <li>Non-oil surplus <strong>US$34.21bn</strong>; oil &amp; gas deficit <strong>US$23.6bn</strong>.</li>
      <li>Biggest surplus partners: <strong>United States US$14.26bn</strong>, <strong>India US$10.59bn</strong>, <strong>Philippines US$6.48bn</strong>.</li>
      <li>Manufacturing PMI hit <strong>54.0 in October 2026</strong> (S&amp;P Global) — the strongest new-export orders since the survey began in 2011.</li>
    </ul><p class="caption">Sources: ${esc(SOURCES.bpsBrs)}; PMI: ${esc(SOURCES.spGlobal)}.</p></div>
  </div>
  ${section('What Indonesia sells', `<p>Non-oil exports carry the surplus: palm-oil derivatives, processed iron and steel from nickel smelters, precision electronics, footwear and textiles. Imports are dominated by raw materials, intermediate goods and capital goods for domestic factories — which is why a rising import bill is not only a warning sign.</p>
  <p class="caption">Source: ${esc(SOURCES.bpsBrs)}, trade releases 2026.</p>`)}
  ${srcBox(SOURCES.bpsBrs + ' — trade releases, 2 Nov 2026 (September data) and 2025 full-year release.')}`;
}

// --- Health -------------------------------------------------------------------
export function health() {
  return `
  <p class="crumb"><a href="#/">← Home</a></p>
  <h1>Health</h1>
  <p class="lede">Indonesians live longer than ever: a baby born in 2025 can expect 74.47 years. The Human Development Index reached 75.90 — the "High" category.</p>
  <div class="kpi-grid">
    ${fig('75.90', 'index', 'Human Development Index, 2025', SOURCES.bpsBrs, '2024: 75.02 · 2020: 72.81')}
    ${fig('74.47', 'years', 'Life expectancy at birth, 2025', SOURCES.bpsBrs, '+0.32 years on 2024')}
    ${fig('Rp12.80m', 'a year', 'Adjusted real spending per person, 2025', SOURCES.bpsBrs, '+Rp461,000 on 2024')}
    ${fig('+0.88', 'points', 'HDI gain, 2025', SOURCES.bpsBrs, 'Fastest rise in the 2020–2025 run')}
  </div>
  <div class="chart-row">
    ${chartCard('Life expectancy at birth, 2020–2025 (years)', lineChart({ series: HEALTH.lifeSeries, decimals: 2, title: 'Life expectancy 2020 to 2025' }), HEALTH.lifeSource + '.')}
    <div class="chart-card"><h3>What makes up the HDI?</h3>
    <ul class="bullets">
      <li><strong>Long and healthy life</strong> — life expectancy 74.47 years.</li>
      <li><strong>Knowledge</strong> — expected schooling 13.30 years, mean schooling 9.07 years (see <a href="#/education">Education</a>).</li>
      <li><strong>A decent standard of living</strong> — adjusted real expenditure Rp12.80m a year per person.</li>
      <li>Every component rose in 2025 — the first time in the 2020–2025 series that all four moved up together.</li>
      <li>The national average hides wide gaps: only three provinces reach the "Very High" HDI category.</li>
    </ul><p class="caption">Source: ${esc(SOURCES.bpsBrs)}, Indeks Pembangunan Manusia 2025 (BRS No. 104/11/Th. XXVIII, 5 Nov 2025).</p></div>
  </div>
  ${srcBox(SOURCES.bpsBrs + ' — Indeks Pembangunan Manusia 2025, released 5 Nov 2025.')}`;
}

// --- Education ----------------------------------------------------------------
export function education() {
  return `
  <p class="crumb"><a href="#/">← Home</a></p>
  <h1>Education</h1>
  <p class="lede">A seven-year-old today can expect 13.30 years of schooling — into the second year of university. But adults aged 25 and over average only 9.07 years: the system is improving faster than the stock of schooling it inherited.</p>
  <div class="kpi-grid">
    ${fig('13.30', 'years', 'Expected schooling, 2025', SOURCES.bpsBrs, 'Age 7+ · 2024: 13.21')}
    ${fig('9.07', 'years', 'Mean schooling, 2025', SOURCES.bpsBrs, 'Age 25+ · 2024: 8.85')}
    ${fig('+0.22', 'years', 'Mean-schooling gain, 2025', SOURCES.bpsBrs, 'The fastest yearly gain since 2020')}
    ${fig('75.90', 'index', 'HDI, 2025', SOURCES.bpsBrs, 'Knowledge is one of its three dimensions')}
  </div>
  <div class="chart-row">
    ${chartCard('Expected years of schooling, 2020–2025', lineChart({ series: EDUCATION.hlsSeries, decimals: 2, title: 'Expected schooling 2020 to 2025' }), EDUCATION.seriesSource + '.')}
    ${chartCard('Mean years of schooling, 2020–2025', lineChart({ series: EDUCATION.rlsSeries, decimals: 2, color: '#b3541e', title: 'Mean schooling 2020 to 2025' }), EDUCATION.seriesSource + '. The 2025 jump (+0.22 years) is the largest in the series.')}
  </div>
  ${section('How to read these two numbers', `<ul class="bullets">
    <li><strong>Expected schooling (HLS, 13.30)</strong> is forward-looking: how long a child starting school today would study if today's enrolment held. It is roughly the second year of university.</li>
    <li><strong>Mean schooling (RLS, 9.07)</strong> is backward-looking: the average actually completed by everyone aged 25 and over. It is roughly grade 9.</li>
    <li>The gap between them is the story: each new cohort stays in school longer than the last, so the mean rises a little every year — 8.48 in 2020 to 9.07 in 2025.</li>
    <li>Both feed the HDI's knowledge dimension, alongside the other two dimensions on the <a href="#/health">Health</a> page.</li>
  </ul>`)}
  ${srcBox(SOURCES.bpsBrs + ' — Indeks Pembangunan Manusia 2025, Table 1 (released 5 Nov 2025).')}`;
}

// --- Tourism ------------------------------------------------------------------
export function tourism() {
  return `
  <p class="crumb"><a href="#/">← Home</a></p>
  <h1>Tourism</h1>
  <p class="lede">15.39 million foreign visitors in 2025 — up 10.80% on 2024 and the most in six years. Indonesians themselves made 1.20 billion domestic trips.</p>
  <div class="kpi-grid">
    ${fig('15.39m', 'visits', 'Foreign visitors, 2025', SOURCES.bpsBrs, 'Released 2 Feb 2026')}
    ${fig('1.41m', 'visits', 'December 2025 alone', SOURCES.bpsBrs, '+14.43% y-on-y')}
    ${fig('US$1,267', 'per visit', 'Average visitor spending, 2025', SOURCES.bpsBrs, 'Accommodation 38.34%')}
    ${fig('1.20bn', 'trips', 'Domestic tourist trips, 2025', SOURCES.bpsBrs, '+17.55% on 2024')}
  </div>
  <div class="chart-row">
    ${chartCard('Foreign visitor arrivals, 2021–2025 (millions)', barChart({ series: TOURISM.visitorsSeries, decimals: 2, unit: 'm', title: 'Foreign visitors 2021 to 2025' }), TOURISM.visitorsSource + '. The post-pandemic recovery, year by year.')}
    ${chartCard('Where visitors came from, 2025 (% of arrivals)', hbarChart({ series: TOURISM.origins, decimals: 1, title: 'Visitor origins 2025' }), TOURISM.originsSource + '. ASEAN supplied 41.3% of all visitors.')}
  </div>
  ${section('The year in months', `<p>Arrivals dipped early in 2025 — 1.16m in January, 1.02m in February, 0.98m in March — then climbed to 1.51m in August, eased through the autumn (1.39m in September, 1.20m in November) and closed at 1.41m in December. The December peak is the usual year-end holiday pattern.</p>
  <p class="caption">Source: ${esc(SOURCES.bpsBrs)}, BRS No. 13/02/Th. XXIX (2 Feb 2026).</p>`)}
  ${srcBox(SOURCES.bpsBrs + ' — Perkembangan Pariwisata, December 2025 (released 2 Feb 2026).')}`;
}

// --- Regions ------------------------------------------------------------------
export function regions() {
  const rows = POPULATION.provinces
    .map((p) => `<tr><td>${esc(p.name)}</td><td>${esc(p.capital)}</td><td data-sort="${p.value}">${num(p.value)}</td><td data-sort="${((p.value / POPULATION.provincesTotal2026) * 100).toFixed(2)}">${num((p.value / POPULATION.provincesTotal2026) * 100, 1)}%</td></tr>`)
    .join('');
  return `
  <p class="crumb"><a href="#/">← Home</a></p>
  <h1>Regions</h1>
  <p class="lede">38 provinces across 17,380 islands. Six of the ten largest are on Java — and Jawa Barat alone holds 51.16 million people, more than Spain.</p>
  <div class="map-card">${indonesiaMap()}</div>
  ${section('The ten largest provinces — 2026 projections', `<p>Click a column heading to sort the table. Figures are in millions of people.</p>
  <table class="data-table sortable" id="prov-table"><thead><tr>
    <th data-key="name">Province ↕</th><th data-key="capital">Capital ↕</th><th data-key="pop">Population ↕</th><th data-key="share">Share ↕</th>
  </tr></thead><tbody>${rows}</tbody></table>
  <p class="caption">${esc(POPULATION.provincesSource)} · Total population, 2026 projection: ${POPULATION.provincesTotal2026}m. The ten provinces together hold ${(POPULATION.provinces.reduce((a, p) => a + p.value, 0)).toFixed(2)}m people — ${num((POPULATION.provinces.reduce((a, p) => a + p.value, 0) / POPULATION.provincesTotal2026) * 100, 1)}% of Indonesia.</p>`)}
  ${section('The Java question', `<ul class="bullets">
    <li><strong>Java: 54.36% of people</strong> on roughly 7% of the land (BPS, mid-2024 projection).</li>
    <li><strong>Sumatra: 20.71%</strong> · <strong>Kalimantan: 5.79%</strong> · <strong>Sulawesi: 4.37%</strong> · <strong>Papua: 1.49%</strong>.</li>
    <li>Outside Java, the largest province is <strong>Sumatera Utara (15.98m)</strong>; the largest outside Java and Sumatra is <strong>Sulawesi Selatan (9.66m)</strong>.</li>
    <li>DKI Jakarta, the smallest province by area, is also the densest — 10.67m people in 661 km².</li>
  </ul>`)}
  ${srcBox(POPULATION.provincesSource + '; BPS population projection, mid-2024; Kepmendagri 300.2.2-2430/2025 for areas and island counts.')}`;
}

// --- Releases -----------------------------------------------------------------
export function releases() {
  return `
  <p class="crumb"><a href="#/">← Home</a></p>
  <h1>Release calendar</h1>
  <p class="lede">Every BPS release this site is built on, newest first. A figure on this site is never newer than the release that published it — check the date before you quote it.</p>
  ${releasesList(RELEASES)}
  <p class="fineprint">BPS publishes inflation on the 1st of each month, GDP each quarter, labour data each February, May, August and November, and poverty figures twice a year. The next releases land on <a href="https://www.bps.go.id" rel="noopener">bps.go.id</a> — this site is a snapshot as of ${esc(AS_OF)}, not a live feed.</p>`;
}

// --- Sources & methods ---------------------------------------------------------
export function sources() {
  return `
  <p class="crumb"><a href="#/">← Home</a></p>
  <h1>Sources &amp; methods</h1>
  <p class="lede">Where every number comes from, what the words mean, and what this site is — and is not.</p>
  ${section('Primary source', `<p>Nearly every figure on this site comes from <strong>BPS — Statistics Indonesia</strong> (Badan Pusat Statistik), the government agency that publishes Indonesia's official statistics, via its <em>Berita Resmi Statistik</em> press releases and its publications. The single exception is the manufacturing PMI, which comes from S&amp;P Global and is labelled as such wherever it appears.</p>
  <p>Figures are shown exactly as published. Where this site derives a value — a share, a density, a residual — it says "derived" next to it and shows the inputs.</p>`)}
  ${section('Releases used', `<ul class="bullets">
    <li>Inflation, October 2026 — BRS 43/02500/HM.240/2026, 2 Nov 2026.</li>
    <li>Trade, September 2026 — BPS press release, 2 Nov 2026.</li>
    <li>GDP, Q3 2026 and labour, August 2026 — BPS press releases, 5 Nov 2026 (labour: BRS No. 113/11/Th. XXIX).</li>
    <li>Poverty, March 2026 — BPS press release, 5 Aug 2026.</li>
    <li>GDP, 2025 — BPS press release, 5 Feb 2026.</li>
    <li>Tourism, December 2025 — BRS No. 13/02/Th. XXIX, 2 Feb 2026.</li>
    <li>Human Development Index, 2025 — BRS No. 104/11/Th. XXVIII, 5 Nov 2025.</li>
    <li>Poverty, March 2025 — BPS / Susenas, released 25 Jul 2025.</li>
    <li>Statistik Indonesia 2026 (yearbook) — BPS, published 27 Feb 2026.</li>
    <li>Pendapatan Nasional Indonesia 2021–2025 — BPS, published 22 Jun 2026.</li>
  </ul>`)}
  ${section('Words that need explaining', `<ul class="bullets">
    <li><strong>y-on-y</strong> — compared with the same period a year earlier. <strong>m-to-m</strong> — compared with last month. <strong>c-to-c</strong> — cumulative, this year so far against the same stretch last year.</li>
    <li><strong>TPT (Tingkat Pengangguran Terbuka)</strong> — the open unemployment rate: unemployed people as a share of the labour force.</li>
    <li><strong>TPAK</strong> — labour-force participation rate. <strong>IHK</strong> — the Consumer Price Index.</li>
    <li><strong>PMTB</strong> — gross fixed capital formation (investment). <strong>ADHB / ADHK</strong> — at current prices / at constant prices.</li>
    <li><strong>Gini ratio</strong> — 0 is perfect equality, 1 is total inequality. <strong>HDI / IPM</strong> — Human Development Index, 0–100.</li>
    <li><strong>Susenas</strong> — National Socio-Economic Survey (poverty). <strong>Sakernas</strong> — National Labour Force Survey. <strong>SUPAS</strong> — Intercensal Population Survey.</li>
  </ul>`)}
  ${section('What this site is not', `<ul class="bullets">
    <li>Not affiliated with BPS or any government body. BPS publishes the data; this site explains it.</li>
    <li>Not a live feed. It is a snapshot as of ${esc(AS_OF)}; new releases after that date are not in it.</li>
    <li>Not a forecast. Every number is a published figure or a labelled derivation from published figures.</li>
  </ul>`)}`;
}

// --- About --------------------------------------------------------------------
export function about() {
  return `
  <p class="crumb"><a href="#/">← Home</a></p>
  <h1>About NusaData</h1>
  <p class="lede">NusaData is an independent guide to Indonesia's official statistics — built because the numbers are public, but finding the one you need should not take an afternoon.</p>
  ${section('How it works', `<ul class="bullets">
    <li>Pick a topic — population, economy, labour, prices, trade, health, education, tourism, regions — and the page gives you the headline figures, the trend, and the detail.</li>
    <li>Every figure carries its source and its year, printed underneath it. The <a href="#/releases">release calendar</a> lists the publication behind each number.</li>
    <li>Use the search box on the home page to find any of the ${INDICATORS.length} headline indicators by name.</li>
    <li>The site is static files only: it works offline, on a desktop and on a phone, with no account and no tracking.</li>
  </ul>`)}
  ${section('A note on the name', `<p><em>Nusa</em> is the old word for island — fitting for a country of 17,380 of them. The design, text and charts are this site's own; the data belongs to its publishers, credited throughout.</p>`)}
  <p class="fineprint">Built November 2026 · Data as of ${esc(AS_OF)} · Sources: BPS — Statistics Indonesia, except where labelled otherwise.</p>`;
}

// --- Missing route --------------------------------------------------------------
export function missing() {
  return `<h1>Not found</h1><p>There is no page at this address. <a href="#/">Back to the home page</a>.</p>`;
}

export const ROUTES = {
  '': home,
  population,
  economy,
  labour,
  prices,
  trade,
  health,
  education,
  tourism,
  regions,
  releases,
  sources,
  about,
};

export const TITLES = {
  '': 'NusaData — Indonesia in Numbers',
  population: 'Population | NusaData',
  economy: 'Economy | NusaData',
  labour: 'Labour | NusaData',
  prices: 'Prices | NusaData',
  trade: 'Trade | NusaData',
  health: 'Health | NusaData',
  education: 'Education | NusaData',
  tourism: 'Tourism | NusaData',
  regions: 'Regions | NusaData',
  releases: 'Release calendar | NusaData',
  sources: 'Sources & methods | NusaData',
  about: 'About | NusaData',
};
