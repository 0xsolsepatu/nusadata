// A schematic map of Indonesia for the Regions page: simplified island
// outlines in their true relative positions, drawn from the country's
// well-known geography (Sumatra NW–SE, Java E–W below Kalimantan,
// Sulawesi's K shape, Papua in the far east). It is labelled schematic
// and not to scale on the page — it is a locator, not a survey map.
// Province dots mark the ten largest provinces' capitals.
//
// Labels: island names sit on the islands in pale type; province names
// sit in the sea beside their dots, in dark red with a pale halo
// (paint-order stroke) so they stay readable over both sea and land.

export function indonesiaMap() {
  return `<svg viewBox="0 0 900 380" role="img" aria-label="Schematic map of Indonesia with the ten largest provinces marked" class="map">
  <rect x="0" y="0" width="900" height="380" rx="10" fill="#dcefee"/>
  <g fill="#0b6b5e" stroke="#084a43" stroke-width="1.5">
    <!-- Sumatra: long diagonal island, north-west to south-east -->
    <path d="M78 42 L118 30 L138 52 L128 84 L158 118 L146 150 L176 186 L164 214 L138 226 L112 196 L96 158 L66 128 L52 92 L64 62 Z"/>
    <!-- Kalimantan: the big island in the centre-north -->
    <path d="M330 96 L392 66 L452 78 L486 116 L470 168 L430 206 L372 200 L330 168 L318 128 Z"/>
    <!-- Java: long thin island under Kalimantan -->
    <path d="M268 268 L520 258 L536 272 L520 284 L280 292 L262 280 Z"/>
    <!-- Sulawesi: the K-shaped island east of Kalimantan -->
    <path d="M556 96 L592 84 L612 104 L596 128 L622 142 L614 162 L584 156 L580 186 L596 214 L574 228 L556 202 L566 168 L544 150 L540 120 Z"/>
    <!-- Papua: the wide island in the far east -->
    <path d="M690 168 L790 146 L884 160 L896 190 L868 226 L780 232 L706 210 L684 188 Z"/>
    <!-- Bali, Lombok, Sumbawa, Flores chain east of Java -->
    <ellipse cx="548" cy="292" rx="12" ry="6"/>
    <ellipse cx="576" cy="296" rx="10" ry="5"/>
    <ellipse cx="606" cy="298" rx="16" ry="6"/>
    <ellipse cx="646" cy="300" rx="22" ry="6"/>
    <!-- Maluku dots north-east of Sulawesi -->
    <circle cx="640" cy="96" r="6"/><circle cx="664" cy="112" r="5"/><circle cx="626" cy="128" r="4"/>
    <!-- Bangka-Belitung and small islands near Sumatra -->
    <circle cx="238" cy="196" r="5"/><circle cx="252" cy="212" r="4"/>
  </g>
  <g font-size="14" font-weight="700" fill="#eaf6f3">
    <text x="86" y="140">Sumatra</text>
    <text x="368" y="140">Kalimantan</text>
    <text x="356" y="282">Java</text>
    <text x="756" y="196">Papua</text>
  </g>
  <g font-size="14" font-weight="700" fill="#33524d">
    <text x="628" y="150">Sulawesi</text>
  </g>
  <g font-size="11.5" fill="#33524d">
    <text x="560" y="330">Bali · Lombok · Flores</text>
    <text x="620" y="80">Maluku</text>
  </g>
  <!-- Province capitals: dot + label. Labels sit in the sea beside the
       dot, with a pale halo so they read over land and sea alike. -->
  <g font-size="12.5" font-weight="700" fill="#7a1f14" paint-order="stroke" stroke="#dcefee" stroke-width="3.5" stroke-linejoin="round">
    <circle cx="104" cy="66" r="5" fill="#c0392b" stroke="#fff" stroke-width="1.5"/><text x="12" y="52">Medan</text>
    <circle cx="286" cy="276" r="5" fill="#c0392b" stroke="#fff" stroke-width="1.5"/><text x="252" y="258">Jakarta</text>
    <circle cx="322" cy="280" r="4" fill="#c0392b" stroke="#fff" stroke-width="1.5"/><text x="302" y="308">Bandung</text>
    <circle cx="398" cy="276" r="4" fill="#c0392b" stroke="#fff" stroke-width="1.5"/><text x="376" y="258">Semarang</text>
    <circle cx="470" cy="272" r="5" fill="#c0392b" stroke="#fff" stroke-width="1.5"/><text x="452" y="296">Surabaya</text>
    <circle cx="228" cy="188" r="4" fill="#c0392b" stroke="#fff" stroke-width="1.5"/><text x="196" y="172">Palembang</text>
    <circle cx="182" cy="150" r="4" fill="#c0392b" stroke="#fff" stroke-width="1.5"/><text x="150" y="138">Pekanbaru</text>
    <circle cx="176" cy="214" r="4" fill="#c0392b" stroke="#fff" stroke-width="1.5"/><text x="132" y="238">B. Lampung</text>
    <circle cx="590" cy="216" r="4" fill="#c0392b" stroke="#fff" stroke-width="1.5"/><text x="604" y="206">Makassar</text>
    <circle cx="314" cy="280" r="3.5" fill="#c0392b" stroke="#fff" stroke-width="1.5"/><text x="248" y="332">Serang</text>
  </g>
  <text x="14" y="366" font-size="11.5" fill="#5a6b68">Schematic map — island shapes simplified, not to scale. Red dots: capitals of the ten largest provinces.</text>
</svg>`;
}
