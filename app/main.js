// NusaData router and controls. Hash routes only, no framework:
//   #/                home
//   #/population       topic pages
//   #/regions ...      (see views.js ROUTES)
//   #/sources, #/about
//
// window.__shotReady is false while a page renders and true once it is
// on screen, so a screenshot script knows when to capture.
//
// Controls, all wired here and all real:
//  - the home search box filters the indicator index on every keystroke
//    (with an explicit "no match" state, never a silent empty box);
//  - the Regions table sorts by any column heading, toggling direction;
//  - hash navigation is plain links, so back/forward work.

import { ROUTES, TITLES } from './views.js';
import { INDICATORS } from './data.js';

const app = document.getElementById('app');
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

function route() {
  const m = location.hash.match(/^#\/([a-z-]*)/);
  return m ? m[1] : '';
}

function render() {
  window.__shotReady = false;
  const r = route();
  const view = ROUTES[r] || null;
  if (view) {
    document.title = TITLES[r];
    app.innerHTML = view();
    document.querySelectorAll('header nav a').forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === `#/${r}`);
    });
  } else {
    document.title = 'Not found | NusaData';
    app.innerHTML = `<h1>Not found</h1><p>There is no page at this address. <a href="#/">Back to the home page</a>.</p>`;
  }
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

function searchResults(query) {
  const box = document.getElementById('search-results');
  if (!box) return;
  const q = query.trim().toLowerCase();
  if (q.length < 2) {
    box.innerHTML = '';
    return;
  }
  const hits = INDICATORS.filter((ind) => ind.name.toLowerCase().includes(q) || ind.value.toLowerCase().includes(q)).slice(0, 8);
  if (hits.length === 0) {
    box.innerHTML = `<p class="no-match">No indicators match “${esc(query.trim())}”. Try “inflation”, “exports”, “population” or “schooling”.</p>`;
    return;
  }
  box.innerHTML = `<ul class="hits">${hits.map((h) => `<li><a href="${h.route}">${esc(h.name)} — <strong>${esc(h.value)}</strong></a></li>`).join('')}</ul>`;
}

// One delegated listener for every control on the page.
app.addEventListener('input', (event) => {
  if (event.target.id === 'search') searchResults(event.target.value);
});

app.addEventListener('click', (event) => {
  const th = event.target.closest('th[data-key]');
  if (!th) return;
  const table = th.closest('table');
  const key = th.dataset.key;
  const tbody = table.querySelector('tbody');
  const rows = [...tbody.querySelectorAll('tr')];
  const dir = th.dataset.dir === 'asc' ? -1 : 1;
  table.querySelectorAll('th').forEach((h) => delete h.dataset.dir);
  th.dataset.dir = dir === 1 ? 'asc' : 'desc';
  const col = [...th.parentNode.children].indexOf(th);
  rows.sort((a, b) => {
    const av = a.children[col].dataset.sort ?? a.children[col].textContent;
    const bv = b.children[col].dataset.sort ?? b.children[col].textContent;
    const an = parseFloat(av);
    const bn = parseFloat(bv);
    if (!Number.isNaN(an) && !Number.isNaN(bn)) return (an - bn) * dir;
    return String(av).localeCompare(String(bv)) * dir;
  });
  rows.forEach((row) => tbody.appendChild(row));
});

window.addEventListener('hashchange', render);
render();
