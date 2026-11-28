// SVG chart builders for NusaData. No library: each chart is a plain SVG
// string with a viewBox, so it scales to any screen and prints the same
// on desktop and on a phone. All numbers come from data.js; nothing here
// invents a value. Labels are placed on a fixed grid with room to breathe
// so they never overlap: value labels sit above points/bars, axis labels
// sit below, and the y-axis is drawn from rounded "nice" ticks.

const escape = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const fmt = (v, d = 2) => Number(v).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

function niceTicks(min, max, count = 4) {
  const span = max - min || 1;
  const step = span / count;
  const mag = 10 ** Math.floor(Math.log10(step));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const s = nice * mag;
  const lo = Math.floor(min / s) * s;
  const ticks = [];
  for (let t = lo; t <= max + s * 0.001; t += s) ticks.push(t);
  // The loop stops at the last tick <= max, which can sit below the data's
  // own maximum (e.g. ticks to 4.00 while a bar reaches 5.31): extend one
  // more step so every value — bar top and label — stays inside the chart.
  if (ticks[ticks.length - 1] < max) ticks.push(ticks[ticks.length - 1] + s);
  return ticks;
}

function chartFrame({ width = 640, height = 300, padL = 52, padR = 14, padT = 30, padB = 34 }) {
  return { width, height, padL, padR, padT, padB, iw: width - padL - padR, ih: height - padT - padB };
}

// Line chart with a dot and a value label on every point. Optional `band`
// shades a reference corridor (e.g. a central bank's inflation target)
// behind the line, with dashed edges and a label.
export function lineChart({ series, color = '#0b6b5e', unit = '', decimals = 2, title = '', band = null }) {
  const f = chartFrame({});
  const values = series.map((p) => p.value);
  const labels = series.map((p) => String(p.label ?? p.year));
  let min = Math.min(...values);
  let max = Math.max(...values);
  const pad = (max - min) * 0.18 || max * 0.1 || 1;
  min -= pad;
  max += pad;
  const ticks = niceTicks(min, max);
  const yMin = ticks[0];
  const yMax = ticks[ticks.length - 1];
  const x = (i) => f.padL + (i / (series.length - 1)) * f.iw;
  const y = (v) => f.padT + (1 - (v - yMin) / (yMax - yMin)) * f.ih;
  const grid = ticks
    .map(
      (t) => `<line x1="${f.padL}" y1="${y(t)}" x2="${f.width - f.padR}" y2="${y(t)}" stroke="#e3e8e6" stroke-width="1"/>
      <text x="${f.padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="12" fill="#5a6b68">${fmt(t, decimals)}</text>`,
    )
    .join('');
  const bandSvg = band
    ? `<rect x="${f.padL}" y="${y(Math.min(band.hi, yMax))}" width="${f.iw}" height="${Math.max(0, y(Math.max(band.lo, yMin)) - y(Math.min(band.hi, yMax)))}" fill="#f2b705" opacity="0.20"/>
      <line x1="${f.padL}" y1="${y(Math.min(band.hi, yMax))}" x2="${f.width - f.padR}" y2="${y(Math.min(band.hi, yMax))}" stroke="#b98a00" stroke-width="1.2" stroke-dasharray="5 4"/>
      <line x1="${f.padL}" y1="${y(Math.max(band.lo, yMin))}" x2="${f.width - f.padR}" y2="${y(Math.max(band.lo, yMin))}" stroke="#b98a00" stroke-width="1.2" stroke-dasharray="5 4"/>
      <text x="${f.width - f.padR}" y="${y(Math.max(band.lo, yMin)) + 17}" text-anchor="end" font-size="11.5" font-weight="700" fill="#8a6d00">${escape(band.label)}</text>`
    : '';
  const points = series.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const dots = series
    .map(
      (p, i) => `<circle cx="${x(i)}" cy="${y(p.value)}" r="4.5" fill="${color}" stroke="#fff" stroke-width="2"/>
      <text x="${x(i)}" y="${y(p.value) - 11}" text-anchor="middle" font-size="12.5" font-weight="700" fill="#12312c">${fmt(p.value, decimals)}${unit}</text>`,
    )
    .join('');
  const xlabels = series
    .map((p, i) => `<text x="${x(i)}" y="${f.height - 10}" text-anchor="middle" font-size="12.5" fill="#33423f">${escape(labels[i])}</text>`)
    .join('');
  return `<svg viewBox="0 0 ${f.width} ${f.height}" role="img" aria-label="${escape(title)}" class="chart">${grid}${bandSvg}
    <polyline points="${points}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}${xlabels}</svg>`;
}

// Vertical bar chart with the value on top of every bar. When the series
// has a negative value (e.g. the 2020 growth contraction), the scale
// extends below zero so the bar and its label stay inside the chart.
export function barChart({ series, color = '#0b6b5e', unit = '', decimals = 2, title = '' }) {
  const f = chartFrame({});
  const values = series.map((p) => p.value);
  const labels = series.map((p) => String(p.label ?? p.year));
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 0);
  const ticks = niceTicks(min, max);
  const yMin = ticks[0];
  const yMax = ticks[ticks.length - 1];
  const slot = f.iw / series.length;
  const bw = Math.min(64, slot * 0.58);
  const y = (v) => f.padT + (1 - (v - yMin) / (yMax - yMin)) * f.ih;
  const grid = ticks
    .map(
      (t) => `<line x1="${f.padL}" y1="${y(t)}" x2="${f.width - f.padR}" y2="${y(t)}" stroke="#e3e8e6" stroke-width="1"/>
      <text x="${f.padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="12" fill="#5a6b68">${fmt(t, decimals)}</text>`,
    )
    .join('');
  const bars = series
    .map((p, i) => {
      const cx = f.padL + slot * i + slot / 2;
      const neg = p.value < 0;
      const top = neg ? y(0) : y(p.value);
      const h = Math.abs(y(p.value) - y(0));
      const ly = neg ? y(p.value) + 16 : y(p.value) - 8;
      return `<rect x="${(cx - bw / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(h, 2).toFixed(1)}" rx="3" fill="${neg ? '#c0392b' : color}"/>
      <text x="${cx}" y="${ly.toFixed(1)}" text-anchor="middle" font-size="12.5" font-weight="700" fill="#12312c">${fmt(p.value, decimals)}${unit}</text>
      <text x="${cx}" y="${f.height - 10}" text-anchor="middle" font-size="12.5" fill="#33423f">${escape(labels[i])}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${f.width} ${f.height}" role="img" aria-label="${escape(title)}" class="chart">${grid}${bars}</svg>`;
}

// Tiny sparkline: a bare polyline with a dot on the last point, no axes.
// For KPI cards — the trend at a glance, with the numbers in the card.
export function sparkline({ series, color = '#0b6b5e', width = 300, height = 40 }) {
  const values = series.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const x = (i) => 4 + (i / (series.length - 1)) * (width - 8);
  const y = (v) => 4 + (1 - (v - min) / span) * (height - 8);
  const points = series.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const last = series[series.length - 1];
  return `<svg viewBox="0 0 ${width} ${height}" class="spark" role="img" aria-label="Trend"><polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${x(series.length - 1).toFixed(1)}" cy="${y(last.value).toFixed(1)}" r="3.5" fill="${color}"/></svg>`;
}

// Donut chart: a ring on the left, a legend with values on the right.
// `centre` is the big number printed in the hole (e.g. the top-5 share).
export function donutChart({ series, colors, title = '', centre = '' }) {
  const total = series.reduce((a, s) => a + s.value, 0);
  const cx = 110;
  const cy = 115;
  const r = 88;
  const ir = 58;
  const width = 640;
  const height = 230;
  let a0 = -Math.PI / 2;
  const arcs = series
    .map((s, i) => {
      const frac = s.value / total;
      const a1 = a0 + frac * Math.PI * 2;
      const large = frac > 0.5 ? 1 : 0;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const xi1 = cx + ir * Math.cos(a1);
      const yi1 = cy + ir * Math.sin(a1);
      const xi0 = cx + ir * Math.cos(a0);
      const yi0 = cy + ir * Math.sin(a0);
      const d = `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${ir} ${ir} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z`;
      const out = `<path d="${d}" fill="${colors[i % colors.length]}"/>`;
      a0 = a1;
      return out;
    })
    .join('');
  const legend = series
    .map((s, i) => {
      const y = 38 + i * 31;
      return `<rect x="248" y="${y - 11}" width="14" height="14" rx="3" fill="${colors[i % colors.length]}"/><text x="270" y="${y}" font-size="13.5" fill="#1d2b29">${escape(s.name)} — ${fmt(s.value, 2)}%</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escape(title)}" class="chart donut">${arcs}<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="21" font-weight="800" fill="#12312c">${escape(centre)}</text><text x="${cx}" y="${cy + 19}" text-anchor="middle" font-size="12" fill="#5a6b68">top five, of GDP</text>${legend}</svg>`;
}

// Horizontal bars: a label on the left, a bar, the value on the right.
// Used for sector shares, island shares, provinces and origins.
// `highlight` names the one bar to paint in `highlightColor` (and bold its
// label) so the reader's eye lands on it first — used on the Compare page
// and the home teaser, where Indonesia is the subject among its peers.
export function hbarChart({ series, color = '#0b6b5e', unit = '%', decimals = 2, maxValue = null, title = '', highlight = null, highlightColor = '#b3541e' }) {
  const rowH = 34;
  const width = 640;
  const labelW = 218;
  const valueW = 74;
  const height = series.length * rowH + 16;
  const max = maxValue ?? Math.max(...series.map((p) => p.value));
  const barW = width - labelW - valueW - 16;
  const rows = series
    .map((p, i) => {
      const y = 8 + i * rowH;
      const w = Math.max(2, (p.value / max) * barW);
      const isHl = highlight !== null && p.name === highlight;
      return `<text x="0" y="${y + 15}" font-size="13" font-weight="${isHl ? '800' : '400'}" fill="#1d2b29">${escape(p.name)}</text>
      <rect x="${labelW}" y="${y + 2}" width="${w.toFixed(1)}" height="18" rx="3" fill="${isHl ? highlightColor : color}"/>
      <text x="${labelW + w + 8}" y="${y + 16}" font-size="13" font-weight="700" fill="#12312c">${fmt(p.value, decimals)}${unit}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escape(title)}" class="chart">${rows}</svg>`;
}
