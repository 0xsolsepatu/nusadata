// NusaData — Indonesia in Numbers.
// Every figure below was checked against a named primary source in the
// build session (26 Nov 2026). Each entry carries its source, its reference
// period and the date it was published, so the site can say, for every
// number on screen, where it came from and how fresh it is. Nothing here
// is estimated by this site: where a value is derived (a share, a density)
// it is computed from two published figures and labelled "derived".

export const AS_OF = '26 November 2026';

export const SOURCES = {
  bps: 'BPS — Statistics Indonesia (bps.go.id)',
  bpsBrs: 'BPS, Berita Resmi Statistik',
  bpsStat2026: 'BPS, Statistik Indonesia 2026 (published 27 Feb 2026)',
  bpsSusenas: 'BPS, Susenas (National Socio-Economic Survey)',
  bpsSakernas: 'BPS, Sakernas (National Labour Force Survey)',
  bpsSupas: 'BPS, SUPAS 2025 (Intercensal Population Survey)',
  spGlobal: 'S&P Global (Manufacturing PMI)',
};

// --- Population -------------------------------------------------------------
export const POPULATION = {
  total2025: { value: 284.44, unit: 'million people', year: 2025, source: SOURCES.bps, note: 'Mid-year projection' },
  total2024: { value: 281.6, unit: 'million people', year: 2024, source: SOURCES.bps },
  growth2025: { value: 1.01, unit: '% per year', year: 2025, source: SOURCES.bps },
  landAreaKm2: 1890179.78,
  islands: 17380,
  languages: 718,
  density: { value: 151, unit: 'people per km²', year: 2025, source: SOURCES.bps, note: 'Derived: 284.44m people ÷ 1,890,180 km²' },
  youngShare: { value: 69, unit: '% aged 44 or younger', year: 2025, source: SOURCES.bpsSupas, note: 'Gen Z, millennials and post-Gen Z' },
  series: [
    { year: 2020, value: 270.2 },
    { year: 2022, value: 275.77 },
    { year: 2023, value: 278.7 },
    { year: 2024, value: 281.6 },
    { year: 2025, value: 284.44 },
  ],
  seriesSource: 'BPS, mid-year population (2020 Census; 2022–2025 projections)',
  // Share of the 2024 population, BPS mid-2024 projection.
  islands: [
    { name: 'Java', value: 54.36, people: 151.59 },
    { name: 'Sumatra', value: 20.71, people: 57.76 },
    { name: 'Kalimantan', value: 5.79, people: 16.15 },
    { name: 'Sulawesi', value: 4.37, people: 12.19 },
    { name: 'Papua', value: 1.49, people: 4.15 },
    { name: 'Bali, Nusa Tenggara & Maluku', value: 13.28, people: 36.84, note: 'Residual' },
  ],
  islandsSource: 'BPS, population projection, mid-2024 (shares; residual computed)',
  // BPS 2026 projections, Statistik Indonesia 2026. Total 287.19m.
  provincesTotal2026: 287.19,
  provinces: [
    { name: 'Jawa Barat', capital: 'Bandung', value: 51.16 },
    { name: 'Jawa Timur', capital: 'Surabaya', value: 42.35 },
    { name: 'Jawa Tengah', capital: 'Semarang', value: 38.56 },
    { name: 'Sumatera Utara', capital: 'Medan', value: 15.98 },
    { name: 'Banten', capital: 'Serang', value: 12.64 },
    { name: 'DKI Jakarta', capital: 'Jakarta', value: 10.67 },
    { name: 'Sulawesi Selatan', capital: 'Makassar', value: 9.66 },
    { name: 'Lampung', capital: 'Bandar Lampung', value: 9.1 },
    { name: 'Sumatera Selatan', capital: 'Palembang', value: 8.99 },
    { name: 'Riau', capital: 'Pekanbaru', value: 7.3 },
  ],
  provincesSource: 'BPS, Statistik Indonesia 2026 (2026 projections)',
};

// --- Economy ---------------------------------------------------------------
export const ECONOMY = {
  gdp2025: { value: 23821.1, unit: 'Rp trillion', year: 2025, source: SOURCES.bpsBrs, note: 'Current prices; released 5 Feb 2026' },
  gdp2024: { value: 22139.0, unit: 'Rp trillion', year: 2024, source: SOURCES.bpsBrs, note: 'Current prices' },
  growth2025: { value: 5.11, unit: '%', year: 2025, source: SOURCES.bpsBrs, note: 'Released 5 Feb 2026' },
  growth2024: { value: 5.03, unit: '%', year: 2024, source: SOURCES.bpsBrs },
  perCapita2025: { value: 83.7, unit: 'Rp million', year: 2025, source: SOURCES.bpsBrs, note: 'US$5,083.4' },
  perCapita2024: { value: 78.6, unit: 'Rp million', year: 2024, source: SOURCES.bpsBrs, note: 'US$4,960.3' },
  growthSeries: [
    { year: 2015, value: 4.88 },
    { year: 2016, value: 5.03 },
    { year: 2017, value: 5.07 },
    { year: 2018, value: 5.17 },
    { year: 2019, value: 5.02 },
    { year: 2020, value: -2.07 },
    { year: 2021, value: 3.7 },
    { year: 2022, value: 5.31 },
    { year: 2023, value: 5.05 },
    { year: 2024, value: 5.03 },
    { year: 2025, value: 5.11 },
  ],
  growthSeriesSource: 'BPS / World Bank WDI, annual GDP growth (c-to-c), 2015–2025',
  quarterly2026: [
    { label: 'Q1 2026', value: 5.61 },
    { label: 'Q2 2026', value: 5.29 },
    { label: 'Q3 2026', value: 5.47 },
  ],
  quarterlySource: 'BPS, released 5 Nov 2026; Jan–Sep 2026 cumulative 5.45%',
  q3: {
    gdpNominal: { value: 6741, unit: 'Rp trillion', period: 'Q3 2026', source: SOURCES.bpsBrs },
    householdShare: { value: 51.97, unit: '% of GDP', period: 'Q3 2026', source: SOURCES.bpsBrs, note: 'Household consumption, +5.04% y-on-y' },
    investmentGrowth: { value: 6.06, unit: '% y-on-y', period: 'Q3 2026', source: SOURCES.bpsBrs, note: 'Gross fixed capital formation (PMTB)' },
    manufacturingShare: { value: 19.22, unit: '% of GDP', period: 'Q3 2026', source: SOURCES.bpsBrs, note: 'Manufacturing, +5.87% y-on-y' },
  },
  // Share of GDP at current prices, 2025. BPS, Pendapatan Nasional 2021–2025.
  sectors: [
    { name: 'Manufacturing', value: 19.07, amount: 4541.5, growth: 5.3 },
    { name: 'Trade (wholesale & retail)', value: 13.17, amount: 3136.6, growth: 5.49 },
    { name: 'Agriculture, forestry & fishing', value: 13.1, amount: 3120.5, growth: 5.33 },
    { name: 'Construction', value: 9.83, amount: 2340.9, growth: null },
    { name: 'Mining & quarrying', value: 8.75, amount: 2084.6, growth: -0.66 },
  ],
  sectorsSource: 'BPS, Pendapatan Nasional Indonesia 2021–2025 (published 22 Jun 2026)',
  sectorsTop5Share: 63.92,
  expenditure: [
    { name: 'Household consumption', value: 53.88 },
    { name: 'Investment (PMTB)', value: 28.77 },
    { name: 'Exports of goods & services', value: 22.85 },
  ],
  expenditureSource: 'BPS, GDP by expenditure, 2025',
  fastestGrowing: [
    { name: 'Other services', value: 9.93 },
    { name: 'Business services', value: 9.1 },
    { name: 'Transport & storage', value: 8.78 },
  ],
  fastestSource: 'BPS, 2025 annual growth by industry',
  agriculture: {
    foodCrops: { value: 9.94, unit: '% growth, 2025', source: SOURCES.bpsBrs },
    livestock: { value: 7.78, unit: '% growth, 2025', source: SOURCES.bpsBrs },
    note: 'Food crops and livestock drove farm growth of 5.33% in 2025.',
  },
  q4_2025: { value: 5.39, unit: '% y-on-y', period: 'Q4 2025', source: SOURCES.bpsBrs, note: 'Strongest Q4 growth since the pandemic' },
};

// --- Labour ----------------------------------------------------------------
export const LABOUR = {
  tptAug2026: { value: 4.75, unit: '%', period: 'Aug 2026', source: SOURCES.bpsBrs, note: 'Released 5 Nov 2026 (BRS No. 113/11/Th. XXIX)' },
  tptAug2025: { value: 4.85, unit: '%', period: 'Aug 2025', source: SOURCES.bpsBrs },
  unemployed: { value: 7.38, unit: 'million people', period: 'Aug 2026', source: SOURCES.bpsSakernas },
  labourForce: { value: 155.37, unit: 'million people', period: 'Aug 2026', source: SOURCES.bpsSakernas, note: '+1.37m on Aug 2025' },
  employed: { value: 147.99, unit: 'million people', period: 'Aug 2026', source: SOURCES.bpsSakernas, note: '+1.44m on Aug 2025' },
  workingAge: { value: 220.91, unit: 'million people', period: 'Aug 2026', source: SOURCES.bpsSakernas },
  tpaks: { value: 70.33, unit: '%', period: 'Aug 2026', source: SOURCES.bpsSakernas, note: 'Labour-force participation rate' },
  avgWage: { value: 3.42, unit: 'Rp million per month', period: 'Aug 2026', source: SOURCES.bpsSakernas, note: 'Average wage of labourers' },
  tptSeries: [
    { year: 2015, value: 6.18 },
    { year: 2016, value: 5.61 },
    { year: 2017, value: 5.5 },
    { year: 2018, value: 5.34 },
    { year: 2019, value: 5.28 },
    { year: 2020, value: 7.07 },
    { year: 2021, value: 6.49 },
    { year: 2022, value: 5.86 },
    { year: 2023, value: 5.32 },
    { year: 2024, value: 4.91 },
    { year: 2025, value: 4.85 },
    { year: 2026, value: 4.75 },
  ],
  tptSeriesSource: 'BPS, Sakernas, August each year',
  bySector: [
    { name: 'Agriculture, forestry & fishing', value: 28.2 },
    { name: 'Wholesale & retail trade', value: 17.86 },
    { name: 'Manufacturing', value: 13.75 },
  ],
  bySectorSource: 'BPS, Sakernas Aug 2026 — share of the employed',
  formal: { value: 42.07, unit: '% of the employed', period: 'Aug 2026', source: SOURCES.bpsSakernas, note: '62.25m people' },
  informal: { value: 57.93, unit: '% of the employed', period: 'Aug 2026', source: SOURCES.bpsSakernas },
  fullTime: { value: 67.47, unit: '% of the employed', period: 'Aug 2026', source: SOURCES.bpsSakernas, note: '99.85m people' },
  partTime: { value: 23.85, unit: '% of the employed', period: 'Aug 2026', source: SOURCES.bpsSakernas, note: '35.29m people' },
  underemployed: { value: 8.68, unit: '% of the employed', period: 'Aug 2026', source: SOURCES.bpsSakernas, note: '12.84m people; 7.91% in Aug 2025' },
  smkTpt: { value: 8.63, unit: '%', period: 'Aug 2025', source: SOURCES.bpsSakernas, note: 'Highest open unemployment by schooling: vocational high school (SMK)' },
};

// --- Prices ----------------------------------------------------------------
export const PRICES = {
  yoyOct2026: { value: 3.23, unit: '% y-on-y', period: 'Oct 2026', source: SOURCES.bpsBrs, note: 'Released 2 Nov 2026 (BRS 43/02500/HM.240/2026)' },
  momOct2026: { value: 0.22, unit: '% m-to-m', period: 'Oct 2026', source: SOURCES.bpsBrs },
  ytdOct2026: { value: 2.4, unit: '% year-to-date', period: 'Oct 2026', source: SOURCES.bpsBrs },
  cpiOct2026: { value: 112.56, unit: 'index (2022=100)', period: 'Oct 2026', source: SOURCES.bpsBrs, note: 'Up from 112.31 in Sep 2026' },
  yoySep2026: { value: 3.28, unit: '% y-on-y', period: 'Sep 2026', source: SOURCES.bpsBrs },
  yoyOct2025: { value: 2.86, unit: '% y-on-y', period: 'Oct 2025', source: SOURCES.bpsBrs },
  calendarSeries: [
    { year: 2015, value: 3.35 },
    { year: 2016, value: 3.02 },
    { year: 2017, value: 3.61 },
    { year: 2018, value: 3.13 },
    { year: 2019, value: 2.72 },
    { year: 2020, value: 1.68 },
    { year: 2021, value: 1.87 },
    { year: 2022, value: 5.51 },
    { year: 2023, value: 2.61 },
    { year: 2024, value: 1.57 },
    { year: 2025, value: 2.92 },
  ],
  calendarSource: 'BPS, calendar-year inflation (December to December)',
  coreOct2026: { value: 2.56, unit: '% y-on-y', period: 'Oct 2026', source: SOURCES.bpsBrs, note: 'Core inflation' },
  foodOct2026: { value: 4.82, unit: '% y-on-y', period: 'Oct 2026', source: SOURCES.bpsBrs, note: 'Food, beverages & tobacco group' },
  drivers: [
    { name: 'Food, beverages & tobacco', value: 1.4, unit: 'percentage points of the 3.23%' },
    { name: 'Transportation', value: 0.59, unit: 'percentage points' },
    { name: 'Personal care & other services', value: 0.32, unit: 'percentage points' },
  ],
  driversSource: 'BPS, Oct 2026 inflation release',
  topCommodity: { name: "Bird's eye chilli (cabai rawit)", value: 0.24, unit: 'percentage points', period: 'Oct 2026', source: SOURCES.bpsBrs },
  provincesAbove: { value: 26, unit: 'of 38 provinces above the national rate', period: 'Oct 2026', source: SOURCES.bpsBrs, note: '12 below; DKI Jakarta lowest at 2.52%' },
  target: 'Bank Indonesia target corridor: 2.5% ± 1%',
};

// --- Trade -----------------------------------------------------------------
export const TRADE = {
  exportsSep2026: { value: 27.59, unit: 'US$ billion', period: 'Sep 2026', source: SOURCES.bpsBrs, note: '+11.87% y-on-y, +3.68% m-to-m; released 2 Nov 2026' },
  importsSep2026: { value: 24.23, unit: 'US$ billion', period: 'Sep 2026', source: SOURCES.bpsBrs, note: '+18.41% y-on-y' },
  surplusSep2026: { value: 3.36, unit: 'US$ billion', period: 'Sep 2026', source: SOURCES.bpsBrs, note: 'Non-oil surplus US$5.67bn; oil deficit US$2.31bn' },
  exportsJanSep2026: { value: 221.23, unit: 'US$ billion', period: 'Jan–Sep 2026', source: SOURCES.bpsBrs, note: '+5.58% y-on-y' },
  importsJanSep2026: { value: 210.63, unit: 'US$ billion', period: 'Jan–Sep 2026', source: SOURCES.bpsBrs, note: '+19.67% y-on-y' },
  surplusJanSep2026: { value: 10.61, unit: 'US$ billion', period: 'Jan–Sep 2026', source: SOURCES.bpsBrs, note: 'Down from US$33.54bn in Jan–Sep 2025' },
  exports2025: { value: 282.91, unit: 'US$ billion', year: 2025, source: SOURCES.bpsBrs, note: '+6.15% on 2024' },
  surplus2025: { value: 41.05, unit: 'US$ billion', year: 2025, source: SOURCES.bpsBrs },
  // Total exports, US$ billion. 2015–2024: BPS, Statistik Perdagangan Luar
  // Negeri Indonesia 2023–2024, Table 1.1 (latest vintage, so 2024 is
  // 266.53 — the figure the 2025 full-year release's +6.15% is measured
  // against); 2025: BRS full-year release. v1 used the older BRS vintage
  // for 2021–2024 (231.61 / 291.90 / 258.82 / 264.70); v2 switches to the
  // one consistent vintage above.
  exportsSeries: [
    { year: 2015, value: 150.37 },
    { year: 2016, value: 145.13 },
    { year: 2017, value: 168.83 },
    { year: 2018, value: 180.01 },
    { year: 2019, value: 167.68 },
    { year: 2020, value: 163.19 },
    { year: 2021, value: 231.71 },
    { year: 2022, value: 292.19 },
    { year: 2023, value: 259.53 },
    { year: 2024, value: 266.53 },
    { year: 2025, value: 282.91 },
  ],
  exportsSeriesSource: 'BPS, total exports (US$ billion) — Statistik Perdagangan Luar Negeri, Table 1.1 (2015–2024); BRS full-year release (2025)',
  partners: [
    { name: 'United States', value: 14.26 },
    { name: 'India', value: 10.59 },
    { name: 'Philippines', value: 6.48 },
  ],
  partnersSource: 'BPS, Jan–Sep 2026 cumulative trade surplus by partner (total, oil + non-oil)',
  pmiOct2026: { value: 54.0, unit: 'index (above 50 = expansion)', period: 'Oct 2026', source: SOURCES.spGlobal, note: 'Up from 52.4 in Sep 2026' },
};

// --- Indonesia vs its ASEAN neighbours -------------------------------------
// IMF, World Economic Outlook, October 2025 (2025 estimates). One vintage,
// one source, so the six countries are comparable. Population in millions;
// GDP in US$ billion, nominal; gdpPc nominal US$ per person; gdpPppPc in
// international dollars per person. Indonesia's own BPS release puts its
// 2025 GDP per capita slightly higher, at US$5,083.4 — the IMF figure is
// an October 2025 estimate, and the Compare page says so.
export const COMPARE = {
  source: 'IMF, World Economic Outlook, October 2025 (2025 estimates)',
  aseanPop: 690.48,
  aseanGdp: 4167.69,
  countries: [
    { name: 'Indonesia', pop: 284.42, gdp: 1430.0, gdpPc: 5030, gdpPppPc: 17610 },
    { name: 'Singapore', pop: 5.98, gdp: 564.77, gdpPc: 92930, gdpPppPc: 156760 },
    { name: 'Thailand', pop: 70.33, gdp: 546.22, gdpPc: 7770, gdpPppPc: 26320 },
    { name: 'Philippines', pop: 114.37, gdp: 497.5, gdpPc: 4350, gdpPppPc: 12930 },
    { name: 'Vietnam', pop: 101.59, gdp: 484.73, gdpPc: 4741, gdpPppPc: 17484 },
    { name: 'Malaysia', pop: 33.85, gdp: 444.98, gdpPc: 13140, gdpPppPc: 43470 },
  ],
};

// --- Health & human development --------------------------------------------
export const HEALTH = {
  hdi2025: { value: 75.9, unit: 'index', year: 2025, source: SOURCES.bpsBrs, note: 'Released 5 Nov 2025 (BRS No. 104/11/Th. XXVIII); category: High' },
  hdi2024: { value: 75.02, unit: 'index', year: 2024, source: SOURCES.bpsBrs },
  hdi2020: { value: 72.81, unit: 'index', year: 2020, source: SOURCES.bpsBrs },
  lifeExpectancy: { value: 74.47, unit: 'years at birth', year: 2025, source: SOURCES.bpsBrs, note: '+0.32 years on 2024' },
  lifeSeries: [
    { year: 2020, value: 73.37 },
    { year: 2021, value: 73.46 },
    { year: 2022, value: 73.7 },
    { year: 2023, value: 73.93 },
    { year: 2024, value: 74.15 },
    { year: 2025, value: 74.47 },
  ],
  lifeSource: 'BPS, Indeks Pembangunan Manusia 2025, Table 1',
  realExpenditure: { value: 12.802, unit: 'Rp million per person per year (adjusted)', year: 2025, source: SOURCES.bpsBrs, note: '+Rp461,000 on 2024' },
};

// --- Education ---------------------------------------------------------------
export const EDUCATION = {
  expectedSchooling: { value: 13.3, unit: 'years', year: 2025, source: SOURCES.bpsBrs, note: 'Expected years of schooling, age 7+; ≈ 2nd year of university' },
  meanSchooling: { value: 9.07, unit: 'years', year: 2025, source: SOURCES.bpsBrs, note: 'Mean years of schooling, age 25+; ≈ grade 9; +0.22 years on 2024' },
  hlsSeries: [
    { year: 2020, value: 12.98 },
    { year: 2021, value: 13.08 },
    { year: 2022, value: 13.1 },
    { year: 2023, value: 13.15 },
    { year: 2024, value: 13.21 },
    { year: 2025, value: 13.3 },
  ],
  rlsSeries: [
    { year: 2020, value: 8.48 },
    { year: 2021, value: 8.54 },
    { year: 2022, value: 8.69 },
    { year: 2023, value: 8.77 },
    { year: 2024, value: 8.85 },
    { year: 2025, value: 9.07 },
  ],
  seriesSource: 'BPS, Indeks Pembangunan Manusia 2025, Table 1',
};

// --- Tourism -----------------------------------------------------------------
export const TOURISM = {
  visitors2025: { value: 15.39, unit: 'million visits', year: 2025, source: SOURCES.bpsBrs, note: '+10.80% on 2024; highest in six years; released 2 Feb 2026' },
  visitorsDec2025: { value: 1.41, unit: 'million visits', period: 'Dec 2025', source: SOURCES.bpsBrs, note: '+14.43% y-on-y' },
  visitorsSeries: [
    { year: 2019, value: 16.11 },
    { year: 2020, value: 4.05 },
    { year: 2021, value: 1.56 },
    { year: 2022, value: 5.89 },
    { year: 2023, value: 11.68 },
    { year: 2024, value: 13.89 },
    { year: 2025, value: 15.39 },
  ],
  visitorsSource: 'BPS, foreign visitor arrivals (2019–2020: BPS releases; 2024 derived from the reported +10.80% growth)',
  origins: [
    { name: 'Malaysia', value: 17.2, people: 2.6 },
    { name: 'Australia', value: 11.4, people: 1.7 },
    { name: 'Singapore', value: 9.9, people: 1.5 },
    { name: 'China', value: 8.7, people: 1.34 },
    { name: 'Timor-Leste', value: 8.7, people: 1.0 },
  ],
  originsSource: 'BPS, 2025 visitor arrivals by nationality (share %; millions of visits)',
  aseanShare: { value: 41.3, unit: '% of all visitors', year: 2025, source: SOURCES.bpsBrs },
  avgSpend: { value: 1267.07, unit: 'US$ per visit', year: 2025, source: SOURCES.bpsBrs, note: 'Accommodation took 38.34% of spending' },
  domesticTrips: { value: 1.2, unit: 'billion trips', year: 2025, source: SOURCES.bpsBrs, note: 'Domestic tourist trips (wisnus), +17.55% on 2024' },
};

// --- Poverty & inequality ----------------------------------------------------
export const POVERTY = {
  rateMar2026: { value: 8.07, unit: '%', period: 'Mar 2026', source: SOURCES.bpsBrs, note: 'Released 5 Aug 2026; 22.93m people' },
  rateSep2025: { value: 8.25, unit: '%', period: 'Sep 2025', source: SOURCES.bpsBrs, note: '23.36m people; poverty line Rp641,443 per person/month' },
  rateMar2025: { value: 8.47, unit: '%', period: 'Mar 2025', source: SOURCES.bpsSusenas, note: '23.85m people; released 25 Jul 2025; lowest in two decades' },
  rateSep2024: { value: 8.57, unit: '%', period: 'Sep 2024', source: SOURCES.bpsSusenas, note: '24.06m people' },
  rateMar2024: { value: 9.03, unit: '%', period: 'Mar 2024', source: SOURCES.bpsSusenas },
  povertySeries: [
    { label: 'Mar 2024', value: 9.03 },
    { label: 'Sep 2024', value: 8.57 },
    { label: 'Mar 2025', value: 8.47 },
    { label: 'Sep 2025', value: 8.25 },
    { label: 'Mar 2026', value: 8.07 },
  ],
  povertySeriesSource: 'BPS, Susenas — poverty rate, % of population',
  poorMar2026: { value: 22.93, unit: 'million people', period: 'Mar 2026', source: SOURCES.bpsBrs },
  poorMar2025: { value: 23.85, unit: 'million people', period: 'Mar 2025', source: SOURCES.bpsSusenas },
  extremeMar2025: { value: 0.85, unit: '%', period: 'Mar 2025', source: SOURCES.bpsSusenas, note: '2.38m people in extreme poverty' },
  povertyLineMar2025: { value: 609160, unit: 'Rp per person per month', period: 'Mar 2025', source: SOURCES.bpsSusenas, note: '≈ Rp20,305 a day' },
  urbanMar2025: { value: 6.73, unit: '%', period: 'Mar 2025', source: SOURCES.bpsSusenas },
  ruralMar2025: { value: 11.03, unit: '%', period: 'Mar 2025', source: SOURCES.bpsSusenas },
  giniMar2025: { value: 0.375, unit: 'Gini ratio', period: 'Mar 2025', source: SOURCES.bpsSusenas, note: 'Down from 0.381 in Sep 2024' },
  giniSep2025: { value: 0.363, unit: 'Gini ratio', period: 'Sep 2025', source: SOURCES.bpsBrs, note: 'Urban 0.383, rural 0.295' },
};

// --- Release timeline ---------------------------------------------------------
export const RELEASES = [
  { date: '5 Nov 2026', title: 'Economy grew 5.47% in Q3 2026', detail: 'GDP up 5.47% y-on-y (Q2: 5.29%); household consumption 51.97% of GDP; cumulative Jan–Sep 2026: 5.45%.', source: 'BPS, Berita Resmi Statistik' },
  { date: '5 Nov 2026', title: 'Open unemployment 4.75% in August 2026', detail: 'Labour force 155.37m; 147.99m employed; 7.38m unemployed; average wage Rp3.42m a month.', source: 'BPS, BRS No. 113/11/Th. XXIX' },
  { date: '2 Nov 2026', title: 'Inflation 3.23% y-on-y in October 2026', detail: 'CPI 112.56 (+0.22% m-to-m); calendar-year inflation 2.40%; food, beverages & tobacco drove the rise.', source: 'BPS, BRS 43/02500/HM.240/2026' },
  { date: '2 Nov 2026', title: 'Trade surplus US$3.36bn in September 2026', detail: 'Exports US$27.59bn (+11.87% y-on-y); imports US$24.23bn; Jan–Sep surplus US$10.61bn.', source: 'BPS, Berita Resmi Statistik' },
  { date: '5 Aug 2026', title: 'Poverty fell to 8.07% in March 2026', detail: '22.93m people below the poverty line — 0.92m fewer than in March 2025.', source: 'BPS, Berita Resmi Statistik' },
  { date: '27 Feb 2026', title: 'Statistik Indonesia 2026 published', detail: 'The statistical yearbook: 2026 population projection 287.19m; Jawa Barat the largest province at 51.16m.', source: 'BPS, Statistik Indonesia 2026' },
  { date: '5 Feb 2026', title: 'Economy grew 5.11% in 2025', detail: 'GDP Rp23,821.1 trillion; GDP per capita Rp83.7m (US$5,083.4); Q4 2025 grew 5.39%.', source: 'BPS, Berita Resmi Statistik' },
  { date: '2 Feb 2026', title: 'Foreign visitors hit 15.39m in 2025', detail: 'Up 10.80% on 2024 — the highest in six years; Malaysia the largest source at 17.2%.', source: 'BPS, BRS No. 13/02/Th. XXIX' },
  { date: '5 Nov 2025', title: 'Human Development Index 75.90 in 2025', detail: 'Life expectancy 74.47 years; expected schooling 13.30 years; mean schooling 9.07 years.', source: 'BPS, BRS No. 104/11/Th. XXVIII' },
  { date: '25 Jul 2025', title: 'Poverty 8.47% in March 2025', detail: '23.85m people; poverty line Rp609,160 per person a month; extreme poverty 0.85%.', source: 'BPS, Susenas March 2025' },
];

// --- Searchable indicator index (home search) --------------------------------
export const INDICATORS = [
  { name: 'Population, 2025', value: '284.44 million', route: '#/population' },
  { name: 'Population growth, 2025', value: '1.01% a year', route: '#/population' },
  { name: 'Largest province — Jawa Barat', value: '51.16 million (2026 proj.)', route: '#/regions' },
  { name: 'Population density', value: '≈151 people per km²', route: '#/population' },
  { name: 'Islands', value: '17,380', route: '#/population' },
  { name: 'GDP, 2025', value: 'Rp23,821.1 trillion', route: '#/economy' },
  { name: 'Economic growth, 2025', value: '5.11%', route: '#/economy' },
  { name: 'Economic growth, Q3 2026', value: '5.47% y-on-y', route: '#/economy' },
  { name: 'GDP per capita, 2025', value: 'Rp83.7 million', route: '#/economy' },
  { name: 'Manufacturing share of GDP', value: '19.07% (2025)', route: '#/economy' },
  { name: 'Agriculture share of GDP', value: '13.10% (2025)', route: '#/economy' },
  { name: 'Open unemployment, Aug 2026', value: '4.75%', route: '#/labour' },
  { name: 'Labour force, Aug 2026', value: '155.37 million', route: '#/labour' },
  { name: 'Average wage, Aug 2026', value: 'Rp3.42 million a month', route: '#/labour' },
  { name: 'Informal workers', value: '57.93% of the employed', route: '#/labour' },
  { name: 'Inflation, Oct 2026 (y-on-y)', value: '3.23%', route: '#/prices' },
  { name: 'Consumer Price Index, Oct 2026', value: '112.56', route: '#/prices' },
  { name: 'Inflation, 2025 (calendar year)', value: '2.92%', route: '#/prices' },
  { name: 'Exports, Sep 2026', value: 'US$27.59 billion', route: '#/trade' },
  { name: 'Trade surplus, Sep 2026', value: 'US$3.36 billion', route: '#/trade' },
  { name: 'Exports, 2025', value: 'US$282.91 billion', route: '#/trade' },
  { name: 'Human Development Index, 2025', value: '75.90', route: '#/health' },
  { name: 'Life expectancy at birth, 2025', value: '74.47 years', route: '#/health' },
  { name: 'Expected years of schooling, 2025', value: '13.30 years', route: '#/education' },
  { name: 'Mean years of schooling, 2025', value: '9.07 years', route: '#/education' },
  { name: 'Foreign visitors, 2025', value: '15.39 million', route: '#/tourism' },
  { name: 'Domestic tourist trips, 2025', value: '1.20 billion', route: '#/tourism' },
  { name: 'Poverty rate, Mar 2026', value: '8.07%', route: '#/population' },
  { name: 'Poverty rate, Mar 2025', value: '8.47%', route: '#/population' },
  { name: 'Gini ratio, Sep 2025', value: '0.363', route: '#/population' },
  { name: 'Poverty line, Mar 2025', value: 'Rp609,160 a month', route: '#/population' },
  { name: 'GDP per capita, Indonesia vs ASEAN', value: 'US$5,030 (IMF, 2025)', route: '#/compare' },
  { name: 'Largest ASEAN economy', value: 'Indonesia, US$1,430bn (IMF, 2025)', route: '#/compare' },
  { name: 'GDP per capita (PPP), Indonesia', value: 'US$17,610 (IMF, 2025)', route: '#/compare' },
  { name: 'Economic growth, 2015–2025', value: 'From 4.88% to 5.11%; −2.07% in 2020', route: '#/economy' },
];
