"use client";

import { VenueList } from "~/components/venue-list";
import { Map } from "~/components/map";
import { api } from "~/trpc/react";
import { useEffect, useMemo, useRef } from "react";
import type { MapRef } from "react-map-gl/mapbox";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const [venues] = api.venues.list.useSuspenseQuery();
  const ref = useRef<MapRef>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const venueId = searchParams.get("venue");

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
      minZoom: 15,
    });
  }, [selectedVenue]);

  return (
    <>
      <div className="divide-y">
        <VenueList venues={venues} />
      </div>

      <div className="sticky top-0 h-screen">
        {/*<div className="absolute bottom-0 left-0 top-0 z-20 flex p-8">*/}
        {/*  <div className="rounded-xl bg-background p-4 shadow-md">*/}
        {/*    <div className="pb-3 text-xl">{venue.name}</div>*/}

        {/*    <div className="text-sm">*/}
        {/*      <div className="flex items-center pb-2">*/}
        {/*        <MapPin className="mr-2" />*/}
        {/*        <div>*/}
        {/*          {venue.address} {venue.postcode}*/}
        {/*        </div>*/}
        {/*      </div>*/}

        {/*      <div className="flex items-center">*/}
        {/*        <FactoryIcon className="mr-2" />*/}
        {/*        <div>{venue.company}</div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <Map
          ref={ref}
          initialState={{
            latitude: Number(searchParams.get("lat") || 50.827778),
            longitude: Number(searchParams.get("lng") || -0.152778),
            zoom: Number(searchParams.get("zoom") || 15),
          }}
          onMoveEnd={(state) => {
            const params = new URLSearchParams(searchParams.toString());

            params.set("lng", state.longitude.toFixed(5));
            params.set("lat", state.latitude.toFixed(5));
            params.set("zoom", state.zoom.toFixed(2));

            router.replace("/?" + params.toString(), {
              scroll: false,
            });
          }}
          markers={venues.map((venue) => {
            const [longitude, latitude] = venue.coordinates as [number, number];
            const color =
              venue.company === "Independent"
                ? "green"
                : !venue.company
                  ? "gray"
                  : "red";

            return {
              id: venue.id,
              longitude,
              latitude,
              color,
            };
          })}
        />
      </div>
    </>
  );
}
