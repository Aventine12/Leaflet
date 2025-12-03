// Minimal example of BBR-like address points in GeoJSON
// Replace these with your actual BBR data and coordinates
const bbrGeojson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [12.568337, 55.676098] // [lon, lat] - Copenhagen
      },
      "properties": {
        "adresse": "Rådhuspladsen 1, 1550 København V",
        "bbr_id": "1234567890",
        "bygningstype": "Etagebolig",
        "etager": 6,
        "opfoerelsesaar": 1905
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [10.203921, 56.162939] // Aarhus
      },
      "properties": {
        "adresse": "Rådhuspladsen 2, 8000 Aarhus C",
        "bbr_id": "9876543210",
        "bygningstype": "Rådhus",
        "etager": 4,
        "opfoerelsesaar": 1941
      }
    }
  ]
};
