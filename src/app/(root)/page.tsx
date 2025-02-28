"use client";

import type { MapRef, ViewState } from "react-map-gl/mapbox";
import { VenueList } from "~/components/venue-list";
import { Map } from "~/components/map";
import { api } from "~/trpc/react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [venues] = api.venues.list.useSuspenseQuery();

  const ref = useRef<MapRef>(null);

  const searchParams = useSearchParams();

  const venueId = searchParams.get("venue");

  const initialState = useMemo(
    () => ({
      latitude: Number(searchParams.get("lat") || 50.827778),
      longitude: Number(searchParams.get("lng") || -0.152778),
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
      venues.map((venue) => {
        const [longitude, latitude] = venue.coordinates as [number, number];
        const isIndependent = venue.company === "Independent";
        const color = isIndependent
          ? "#06c63d"
          : !venue.company
            ? "#9c9c9c"
            : "#c30b0b";

        return {
          id: venue.id,
          name: venue.name,
          longitude,
          latitude,
          color,
          textColor: isIndependent ? "#06c63d" : "white",
          opacity: venue.company ? 1 : 0.5,
          priority: venue.company ? 0 : 1,
        };
      }),
    [venues],
  );

  return (
    <>
      <div className="absolute w-full divide-y sm:relative">
        <VenueList venues={venues} />
      </div>

      <div className="sticky top-0 h-screen">
        <Map
          ref={ref}
          initialState={initialState}
          onMoveEnd={onMoveEnd}
          markers={markers}
        />
      </div>
    </>
  );
}
