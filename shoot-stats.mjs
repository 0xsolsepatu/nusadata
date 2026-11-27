// Screenshot + interaction-test driver for NusaData (Node 22+, stdlib only).
// Drives the Playwright Chromium build over CDP: loads each hash route in
// shots.json, waits for window.__shotReady, captures a JPEG, then drives
// every route and control and reports console errors / failed requests.
// Usage: node shoot-stats.mjs <workdir> [port]
// serve.ts must already be running on <port> from <workdir>.
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { execFile } from 'node:child_process';

const WORKDIR = process.argv[2];
const PORT = Number(process.argv[3] ?? 8080);
if (!WORKDIR) {
  console.error('usage: node shoot-stats.mjs <workdir> [port]');
  process.exit(2);
}
const CHROME = `${process.env.HOME}/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome`;
const SHOTS = JSON.parse(readFileSync(`${WORKDIR}/shots.json`, 'utf-8'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(path) {
  const res = await fetch(`http://127.0.0.1:9226${path}`);
  return res.json();
}

const chrome = execFile(CHROME, [
  '--headless=new', '--no-sandbox', '--enable-unsafe-swiftshader', '--hide-scrollbars',
  '--remote-debugging-port=9226', '--window-size=1280,720', '--force-device-scale-factor=1',
  `http://127.0.0.1:${PORT}/index.html`,
], { stdio: 'ignore' });
chrome.on('error', (e) => { console.error('chrome launch failed', e); process.exit(1); });

let target = null;
for (let i = 0; i < 40 && !target; i += 1) {
  await sleep(500);
  try {
    const list = await getJson('/json/list');
    target = list.find((t) => t.type === 'page');
  } catch { /* not up yet */ }
}
if (!target) { console.error('no CDP target'); chrome.kill(); process.exit(1); }

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
let id = 0;
const pending = new Map();
const consoleErrors = [];
const failedRequests = [];
const requests = [];
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(JSON.stringify(msg.error)));
    else resolve(msg.result);
  }
  if (msg.method === 'Runtime.exceptionThrown') {
    consoleErrors.push(msg.params.exceptionDetails?.exception?.description || JSON.stringify(msg.params.exceptionDetails));
  }
  if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
    consoleErrors.push(msg.params.args.map((a) => a.value ?? a.description ?? '').join(' '));
  }
  if (msg.method === 'Network.loadingFailed') failedRequests.push(msg.params.errorText);
  if (msg.method === 'Network.responseReceived') {
    if (msg.params.response.status >= 400) failedRequests.push(`${msg.params.response.status} ${msg.params.response.url}`);
    requests.push(msg.params.response.url);
  }
};
function send(method, params = {}) {
  const mid = ++id;
  return new Promise((resolve, reject) => {
    pending.set(mid, { resolve, reject });
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
}

await send('Runtime.enable');
await send('Network.enable');
await send('Page.enable');

async function evalJs(expression) {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
  return r.result.value;
}
async function waitForShotReady() {
  for (let i = 0; i < 40; i += 1) {
    if (await evalJs('window.__shotReady === true')) return true;
    await sleep(250);
  }
  return false;
}
async function navigate(url, width, height, mobile) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: !!mobile });
  await send('Page.navigate', { url });
  await sleep(1200);
}

mkdirSync(`${WORKDIR}/screenshots`, { recursive: true });
for (const shot of SHOTS) {
  const { width, height } = shot.viewport;
  await navigate(`http://127.0.0.1:${PORT}/index.html${shot.path}`, width, height, width < 500);
  const ready = await waitForShotReady();
  await sleep(500);
  if (shot.scrollY) {
    await evalJs(`window.scrollTo(0, ${shot.scrollY})`);
    await sleep(400);
  }
  const img = await send('Page.captureScreenshot', { format: 'jpeg', quality: 82 });
  writeFileSync(`${WORKDIR}/screenshots/${shot.file}`, Buffer.from(img.data, 'base64'));
  console.log(`${shot.file}: shotReady=${ready} ${width}x${height}`);
}

// --- Interaction test: every route, search, table sort -------------------
await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 720, deviceScaleFactor: 1, mobile: false });
const routes = ['', 'population', 'economy', 'compare', 'labour', 'prices', 'trade', 'health', 'education', 'tourism', 'regions', 'releases', 'sources', 'about', 'nope'];
for (const r of routes) {
  await navigate(`http://127.0.0.1:${PORT}/index.html#/${r}`, 1280, 720, false);
  const ready = await waitForShotReady();
  const info = await evalJs(`({ title: document.title, h1: (document.querySelector('h1')||{}).textContent, links: document.querySelectorAll('#app a').length, kpis: document.querySelectorAll('.kpi').length, svgs: document.querySelectorAll('svg').length, tables: document.querySelectorAll('table').length })`);
  console.log(`route #/${r || '(home)'}: ready=${ready} ${JSON.stringify(info)}`);
}

// Search: type "inflation", expect hits; type nonsense, expect no-match.
await navigate(`http://127.0.0.1:${PORT}/index.html#/`, 1280, 720, false);
await waitForShotReady();
await evalJs(`(() => { const s = document.getElementById('search'); s.value = 'inflation'; s.dispatchEvent(new Event('input', { bubbles: true })); return true; })()`);
await sleep(300);
console.log('search "inflation":', await evalJs(`document.querySelectorAll('#search-results .hits a').length + ' hits'`));
await evalJs(`(() => { const s = document.getElementById('search'); s.value = 'zzzzqqq'; s.dispatchEvent(new Event('input', { bubbles: true })); return true; })()`);
await sleep(300);
console.log('search "zzzzqqq":', await evalJs(`document.querySelector('.no-match') ? 'no-match shown' : 'MISSING no-match'`));

// Table sort: click Population header twice, read first row each time.
await navigate(`http://127.0.0.1:${PORT}/index.html#/regions`, 1280, 720, false);
await waitForShotReady();
const firstBefore = await evalJs(`document.querySelector('#prov-table tbody tr td').textContent`);
await evalJs(`document.querySelector('#prov-table th[data-key="pop"]').click()`);
await sleep(200);
const firstAsc = await evalJs(`document.querySelector('#prov-table tbody tr td').textContent`);
await evalJs(`document.querySelector('#prov-table th[data-key="pop"]').click()`);
await sleep(200);
const firstDesc = await evalJs(`document.querySelector('#prov-table tbody tr td').textContent`);
console.log(`table sort: before=${firstBefore} asc-first=${firstAsc} desc-first=${firstDesc}`);

// Internal links: every header nav link + footer link resolves to a route.
const badLinks = await evalJs(`(() => { const bad = []; document.querySelectorAll('header nav a, footer nav a').forEach((a) => { if (!a.getAttribute('href').startsWith('#/')) bad.push(a.getAttribute('href')); }); return bad; })()`);
console.log('non-hash nav links:', JSON.stringify(badLinks));

console.log('console errors:', JSON.stringify(consoleErrors));
console.log('failed requests:', JSON.stringify(failedRequests));
console.log('requests made:', JSON.stringify([...new Set(requests)]));
ws.close();
chrome.kill();
process.exit(0);
