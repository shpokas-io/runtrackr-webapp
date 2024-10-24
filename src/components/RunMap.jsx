/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { colors } from "@mui/material";
import L, { latLng } from "leaflet";
import { useEffect } from "react";

export default function RunMap({ polyline }) {
  useEffect(() => {
    const map = L.map(`map`).setView([0, 0], 13);

    L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
      maxZoom: 19,
    }).addTo(map);

    const latLngs = decodePolyline(polyline);
    const polylineLayer = L.polyline(latLngs, { color: "blue" }).addTo(map);
    map.fitBounds(polylineLayer.getBounds());

    return () => {
      map.remove();
    };
  }, [polyline]);

  //Function to decode polyline to LatLng objects
  const decodePolyline = (polyline) => {
    const coordinates = [];
    let index = 0,
      len = polyline.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        result = 0,
        shift = 0;
      do {
        b = polyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result >> 1) ^ -(result & 1);
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = polyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result >> 1) ^ -(result & 1);
      lng += dlng;

      coordinates.push([lat / 1e5, lng / 1e5]);
    }
    return coordinates;
  };
  return <div id="map" style={{ height: "400px", width: "100%" }} />;
}
