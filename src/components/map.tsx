"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import Mapbox, {
  GeolocateControl,
  Layer,
  type MapRef,
  Source,
  type ViewState,
} from "react-map-gl/mapbox";
import { RefObject, useMemo, useState } from "react";
import { env } from "~/env";
import {
  clusterCountLayer,
  clusterLayer,
  venuesIconLayer,
  venuesLayer,
  venuesTextLayer,
} from "~/components/map-layer";
import { MapMouseEvent } from "mapbox-gl";
import { Feature, FeatureCollection } from "geojson";
import { cubicBezier, motion } from "motion/react";

interface MapProps {
  markers: Array<{
    id: string;
    name: string;
    longitude: number;
    latitude: number;
    color?: string;
  }>;

  ref: RefObject<MapRef>;

  onMoveEnd?(state: ViewState): void;
  onUserLocation?(coordinates: GeolocationCoordinates): void;

  initialState: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export function Map({
  markers,
  onMoveEnd,
  ref,
  initialState,
  onUserLocation,
}: MapProps) {
  const [isLoaded, setLoaded] = useState(false);

  const data = useMemo<FeatureCollection>(() => {
    const features = markers.map((marker) => {
      const feature: Feature = {
        id: marker.id,
        type: "Feature",
        properties: marker,
        geometry: {
          type: "Point",
          coordinates: [marker.longitude, marker.latitude],
        },
      };

      return feature;
    });

    return {
      type: "FeatureCollection",
      features,
    };
  }, [markers]);

  const onClick = (event: MapMouseEvent) => {
    const map = ref.current;

    if (!map) {
      return;
    }

    const features = map.queryRenderedFeatures(event.point, {
      layers: ["venues"],
    });

    const [feature] = features;

    if (!feature?.id) {
      return;
    }

    map.setFeatureState(
      { source: "venues", id: feature.id },
      { selected: !feature.state?.selected },
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="h-full w-full"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.1 }}
        transition={{ ease: cubicBezier(0.22, 1, 0.36, 1), duration: 1.5 }}
      >
        <Mapbox
          mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          initialViewState={{
            ...initialState,
          }}
          onLoad={() => setLoaded(true)}
          ref={ref}
          onClick={onClick}
          onMoveEnd={(e) => onMoveEnd?.(e.viewState)}
        >
          <GeolocateControl
            position="bottom-right"
            onTrackUserLocationStart={(e) => console.log({ e })}
            onGeolocate={(e) => onUserLocation?.(e.coords)}
          />

          <Source type="geojson" id="venues" data={data}>
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...venuesLayer} />
            <Layer {...venuesTextLayer} />
          </Source>
        </Mapbox>
      </motion.div>
    </div>
  );
}
