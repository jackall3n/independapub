"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import Mapbox, { type MapRef, Marker } from "react-map-gl/mapbox";
import { Fragment, useEffect, useRef, useState } from "react";
import { env } from "~/env";
import { useParams, useRouter } from "next/navigation";
import { useVenueId } from "~/app/(root)/venue/[id]/utils";
import { api } from "~/trpc/react";

export function Map() {
  const [venues] = api.venues.list.useSuspenseQuery();
  const ref = useRef<MapRef>(null);
  const params = useParams<{ coordinates?: string; id: string }>();
  const [activePin, setActivePin] = useState<[number, number]>();
  const id = useVenueId();
  //
  // useEffect(() => {
  //   if (!params.coordinates) {
  //     return;
  //   }
  //
  //   const parsed = decodeURIComponent(params.coordinates).split(",");
  //   const coordinates = [Number(parsed[0]), Number(parsed[1])] as [
  //     number,
  //     number,
  //   ];
  //
  //   ref.current?.flyTo({
  //     center: coordinates,
  //   });
  //
  //   setActivePin(coordinates);
  // }, [params.coordinates]);

  console.log({ params });

  const router = useRouter();

  return (
    <div className="absolute inset-0 flex-1 overflow-hidden">
      <Mapbox
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        initialViewState={{
          latitude: 50.827778,
          longitude: -0.152778,
          fitBoundsOptions: {
            padding: 60,
          },
          zoom: 15,
        }}
        ref={ref}
        onMoveEnd={(e) =>
          router.replace(
            `${e.viewState.longitude.toFixed(7)},${e.viewState.latitude.toFixed(7)},${e.viewState.zoom.toFixed(2)}z`,
          )
        }
      >
        {venues.map((venue: any) => {
          if (!venue.coordinates?.length) {
            return <Fragment key={venue.id} />;
          }

          return (
            <Marker
              color={
                venue.company === "Independent"
                  ? "green"
                  : !venue.company
                    ? "grey"
                    : "red"
              }
              key={venue.id}
              longitude={venue.coordinates[0]}
              latitude={venue.coordinates[1]}
            />
          );
        })}

        {/*<Marker longitude={-0.152778} latitude={50.827778} />*/}
      </Mapbox>
    </div>
  );
}
