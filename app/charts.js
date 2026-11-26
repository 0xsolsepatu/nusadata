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
  return ticks;
}

function chartFrame({ width = 640, height = 300, padL = 52, padR = 14, padT = 30, padB = 34 }) {
  return { width, height, padL, padR, padT, padB, iw: width - padL - padR, ih: height - padT - padB };
}

// Line chart with a dot and a value label on every point.
export function lineChart({ series, color = '#0b6b5e', unit = '', decimals = 2, title = '' }) {
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
  return `<svg viewBox="0 0 ${f.width} ${f.height}" role="img" aria-label="${escape(title)}" class="chart">${grid}
    <polyline points="${points}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}${xlabels}</svg>`;
}

// Vertical bar chart with the value on top of every bar.
export function barChart({ series, color = '#0b6b5e', unit = '', decimals = 2, title = '' }) {
  const f = chartFrame({});
  const values = series.map((p) => p.value);
  const labels = series.map((p) => String(p.label ?? p.year));
  const max = Math.max(...values, 0);
  const ticks = niceTicks(0, max);
  const yMax = ticks[ticks.length - 1];
  const slot = f.iw / series.length;
  const bw = Math.min(64, slot * 0.58);
  const y = (v) => f.padT + (1 - v / yMax) * f.ih;
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

// Horizontal bars: a label on the left, a bar, the value on the right.
// Used for sector shares, island shares, provinces and origins.
export function hbarChart({ series, color = '#0b6b5e', unit = '%', decimals = 2, maxValue = null, title = '' }) {
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
      return `<text x="0" y="${y + 15}" font-size="13" fill="#1d2b29">${escape(p.name)}</text>
      <rect x="${labelW}" y="${y + 2}" width="${w.toFixed(1)}" height="18" rx="3" fill="${color}"/>
      <text x="${labelW + w + 8}" y="${y + 16}" font-size="13" font-weight="700" fill="#12312c">${fmt(p.value, decimals)}${unit}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escape(title)}" class="chart">${rows}</svg>`;
}
