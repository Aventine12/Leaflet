// Import the GeoJSON data (make sure <script src="data.js"></script> is added before main.js in index.html
// OR keep everything in one file. I’ll assume separate file and that data.js defines `bbrGeojson`.

// If you separated files, add this line near bottom of index.html:
// <script src="data.js"></script>
// <script src="main.js"></script>

// -------- MAP SETUP --------
const map = L.map('map').setView([56.0, 10.0], 7); // Roughly Denmark

// Basemap (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// -------- HELPER: DOWNLOAD METADATA AS JSON --------
function downloadMetadata(featureProps) {
  const dataStr = JSON.stringify(featureProps, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;

  // Use address or bbr_id in filename
  const safeName = (featureProps.adresse || featureProps.bbr_id || 'bbr_address')
    .replace(/[^a-z0-9]+/gi, '_')
    .toLowerCase();

  a.download = `${safeName}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

// -------- ADD GEOJSON LAYER --------
function onEachFeature(feature, layer) {
  if (!feature.properties) return;

  const p = feature.properties;

  // Build popup HTML
  const popupDiv = document.createElement('div');
  popupDiv.className = 'popup-content';

  // Basic info
  popupDiv.innerHTML = `
    <strong>${p.adresse || 'Ukendt adresse'}</strong><br/>
    BBR-ID: ${p.bbr_id || '-'}<br/>
    Bygningstype: ${p.bygningstype || '-'}<br/>
    Etager: ${p.etager != null ? p.etager : '-'}<br/>
    Opførelsesår: ${p.opfoerelsesaar || '-'}<br/>
  `;

  // Add download button
  const btn = document.createElement('button');
  btn.textContent = 'Download metadata (JSON)';
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent map click from closing popup
    downloadMetadata(p);
  });

  popupDiv.appendChild(btn);

  // Attach popup to layer
  layer.bindPopup(popupDiv);
}

L.geoJSON(bbrGeojson, {
  pointToLayer: (feature, latlng) => {
    return L.circleMarker(latlng, {
      radius: 6,
      weight: 1,
      fillOpacity: 0.8
    });
  },
  onEachFeature: onEachFeature
}).addTo(map);
