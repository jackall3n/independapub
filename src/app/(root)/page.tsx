"use client";

import type { MapRef, ViewState } from "react-map-gl/mapbox";
import { VenueList } from "~/components/venue-list";
import { Map } from "~/components/map";
import { api } from "~/trpc/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import orderBy from "lodash/orderBy";
import * as turf from "@turf/turf";

export default function Home() {
  const [venues] = api.venues.list.useSuspenseQuery();
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates>();

  const ordered = useMemo(() => {
    if (!userLocation) {
      return orderBy(venues, "name");
    }

    const from = turf.point([userLocation.longitude, userLocation.latitude]);

    const mapped = venues.map((venue) => {
      const point = turf.point(venue.coordinates);

      return {
        ...venue,
        distance: turf.distance(from, point, { units: "miles" }),
      };
    });

    return orderBy(mapped, "distance");
  }, [venues, userLocation]);

  console.log({ userLocation });

  const ref = useRef<MapRef>(null);

  const searchParams = useSearchParams();

  const venueId = searchParams.get("venue");

  const initialState = useMemo(
    () => ({
      latitude: Number(searchParams.get("lat") || 50.82367),
      longitude: Number(searchParams.get("lng") || -0.1382),
      zoom: Number(searchParams.get("zoom") || 15),
    }),
    [],
  );

  const selectedVenue = useMemo(() => {
    if (!venueId) {
      return null;
    }

    return venues.find((v) => v.id === venueId);
  }, [venues, venueId]);

  useEffect(() => {
    if (!selectedVenue) {
      return;
    }

    if (!ref.current) {
      return;
    }

    ref.current.flyTo({
      center: selectedVenue.coordinates as [number, number],
    });
  }, [selectedVenue]);

  const onMoveEnd = useCallback(
    (state: ViewState) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("lng", state.longitude.toFixed(5));
      params.set("lat", state.latitude.toFixed(5));
      params.set("zoom", state.zoom.toFixed(2));

      const url = "/?" + params.toString();

      window.history.replaceState({}, "", url);
    },
    [searchParams],
  );

  const markers = useMemo(
    () =>
      ordered.map((venue) => {
        const [longitude, latitude] = venue.coordinates as [number, number];
        const isIndependent = venue.company === "Independent";
        const color = isIndependent
          ? "#20d355"
          : !venue.company
            ? "#9c9c9c"
            : "#ed5252";

        return {
          id: venue.id,
          name: venue.name,
          longitude,
          latitude,
          color,
          textColor: color,
          isIndependent,
          opacity: venue.company ? 1 : 0.5,
          priority: venue.company ? 0 : 1,
        };
      }),
    [ordered],
  );

  return (
    <>
      <div className="scrollbar scrollbar-thumb-muted-foreground scrollbar-track-transparent absolute w-full divide-y h-full overflow-y-auto z-10 sm:relative">
        <VenueList venues={ordered} />
      </div>

      <div className="sticky top-0 h-screen">
        <Map
          ref={ref}
          initialState={initialState}
          onMoveEnd={onMoveEnd}
          markers={markers}
          onUserLocation={setUserLocation}
        />
      </div>
    </>
  );
}
