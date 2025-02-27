"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import Mapbox, {
  type MapRef,
  Marker,
  type ViewState,
} from "react-map-gl/mapbox";
import { Ref } from "react";
import { env } from "~/env";

interface MapProps {
  markers: Array<{
    id: string;
    longitude: number;
    latitude: number;
    color?: string;
  }>;

  ref: Ref<MapRef>;

  onMoveEnd?(state: ViewState): void;

  initialState: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export function Map({ markers, onMoveEnd, ref, initialState }: MapProps) {
  return (
    <div className="absolute inset-0 flex-1 overflow-hidden">
      <Mapbox
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        initialViewState={{
          ...initialState,
          fitBoundsOptions: {
            padding: 60,
          },
        }}
        ref={ref}
        onMoveEnd={(e) => onMoveEnd?.(e.viewState)}
      >
        {markers.map((marker) => (
          <Marker
            color={marker.color}
            key={marker.id}
            longitude={marker.longitude}
            latitude={marker.latitude}
          />
        ))}
      </Mapbox>
    </div>
  );
}
