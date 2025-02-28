import type { LayerProps } from "react-map-gl/mapbox";

export const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  source: "earthquakes",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#51bbd6",
      100,
      "#f1f075",
      750,
      "#f28cb1",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
  },
};

export const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  source: "earthquakes",
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

export const venuesLayer: LayerProps = {
  id: "venues",
  type: "circle",
  // filter: ["case", ["zoom"], 15],
  source: "venues",
  paint: {
    "circle-color": ["get", "color"],
    "circle-radius": 5,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
  layout: {
    visibility: "visible",
    "circle-sort-key": ["get", "priority"],
  },
};

export const venuesTextLayer: LayerProps = {
  id: "venues-text",
  type: "symbol",
  source: "venues",
  // filter: ["case", ["get", "isIndependent", true]],
  layout: {
    "text-field": ["get", "name"],
    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
    "text-size": 12,
    "text-anchor": "left",
    "text-variable-anchor": ["left", "right"],
    "text-radial-offset": 1,
    "text-justify": "auto",
    "text-optional": true,
    "text-allow-overlap": false,
    "text-ignore-placement": false,
    "symbol-z-order": "auto",
    "symbol-sort-key": ["get", "priority"],
  },
  paint: {
    "text-color": ["get", "textColor"],
    "text-halo-color": "black",
    "text-halo-width": 1.5,
    // "text-opacity": ["get", "opacity"],
  },
};

export const venuesIconLayer: LayerProps = {
  id: "venues-icons",
  type: "symbol",
  source: "venues",
  layout: {
    "icon-image": "marker-15",
    "icon-size": 1, // Adjust icon size
    "icon-anchor": "center", // Keep it inside the circle
    "icon-allow-overlap": true, // Ensures the icon stays inside the circle
  },
};
