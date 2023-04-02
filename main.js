import Globe from "globe.gl";
import earthVector from "./data/countries.geo.json";
import capitals from "./data/capitals.json";

// create array of objects contraining the longitude, latitude and country code for capital cities in europe without duplicates
// const capitals = [
//   { lat: 52.516667, lng: 13.383333, country: "DE" },
//   { lat: 48.856667, lng: 2.350987, country: "FR" },
//   { lat: 41.89193, lng: 12.51133, country: "IT" },
//   { lat: 52.229676, lng: 21.012229, country: "PL" },
//   { lat: 50.075538, lng: 14.4378, country: "CZ" },
//   { lat: 59.329323, lng: 18.068581, country: "SE" },
//   { lat: 60.169855, lng: 24.938379, country: "FI" },
//   { lat: 48.211636, lng: 17.154727, country: "SK" },
//   { lat: 47.497912, lng: 19.040235, country: "HU" },
//   { lat: 48.208174, lng: 16.373819, country: "AT" },
//   { lat: 50.087465, lng: 14.421254, country: "CZ" },
//   { lat: 55.676096, lng: 12.568337, country: "DK" },
//   { lat: 50.85034, lng: 4.35171, country: "BE" },
//   { lat: 42.697708, lng: 23.321868, country: "BG" },
//   { lat: 56.949649, lng: 24.105186, country: "LV" },
//   { lat: 37.98381, lng: 23.727539, country: "GR" },
//   { lat: 41.008238, lng: 28.978359, country: "TR" },
//   { lat: 45.943161, lng: 24.96676, country: "RO" },
//   { lat: 52.370216, lng: 4.895168, country: "NL" },
//   { lat: 40.416775, lng: -3.70379, country: "ES" },
//   { lat: 46.947973, lng: 7.447447, country: "CH" },
//   { lat: 41.902782, lng: 12.496366, country: "IT" },
//   { lat: 38.707751, lng: -9.136592, country: "PT" },
//   { lat: 51.507351, lng: -0.127758, country: "GB" },
//   { lat: 48.856667, lng: 2.350987, country: "FR" },
//   { lat: 53.349805, lng: -6.26031, country: "IE" },
//   { lat: 60.169855, lng: 24.938379, country: "FI" },
//   { lat: 59.913869, lng: 10.752245, country: "NO" },
//   { lat: 60.128161, lng: 18.643501, country: "SE" },
//   { lat: 48.856667, lng: 2.350987, country: "FR" },
// ];

const N = 10;
const arcsData = [...Array(N).keys()].map(() => {
  const c1 = capitals[Math.floor(Math.random() * capitals.length)];
  const c2 = capitals[Math.floor(Math.random() * capitals.length)];
  return {
    startLat: c1.latitude,
    startLng: c1.longitude,
    endLat: c2.latitude,
    endLng: c2.longitude,
  };
});

const activeCountries = new Set(["IS", "US", "GB", "FR"]);

const globe = Globe()
  .hexPolygonsData(earthVector.features)
  .hexPolygonResolution(4)
  .hexPolygonMargin(0.3)
  .hexPolygonColor((a) => (activeCountries.has(a.properties.iso_a2) ? "#fc7d00" : "#555555"))
  .onHexPolygonClick((polygon, event, { lat, lng, altitude }) =>
    console.log(polygon, event, lat, lng, altitude)
  )
  .arcsData(arcsData)
  .arcColor(["white", "#fc7d00"])
  .arcDashGap(() => 1)
  .arcDashAnimateTime(() => Math.random() * 4000 + 500)(document.getElementById("globeContainer"));

setTimeout(() => {
  activeCountries.delete("IS");
  globe.hexPolygonColor((a) => (activeCountries.has(a.properties.iso_a2) ? "#fc7d00" : "#555555"));
}, 15000);
