"use client";

import { Milestone } from "lucide-react";
import { env } from "~/env";
import Link from "next/link";

export function VenueListItem({ venue }: any) {
  async function onLookup() {
    const params = new URLSearchParams({
      q: `${venue.name} ${venue.address} ${venue.postcode}`,
      access_token: env.NEXT_PUBLIC_MAPBOX_TOKEN,
    });

    const response = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?${params.toString()}`,
    );

    const data = await response.json();

    console.log({ data });
  }

  const id = venue.id.replaceAll(" ", "+");

  const path = venue.coordinates?.length
    ? `${id}/${venue.coordinates.join(",")}`
    : id;

  return (
    <Link
      href={`/venue/${path}`}
      prefetch={false}
      className="hover:bg-muted space-y-0.5 px-5 py-4 text-left"
      onClick={onLookup}
    >
      <div className="flex items-center">
        <div className="font-medium">{venue.name}</div>
        <div className="ml-auto text-xs">{venue.company}</div>
      </div>

      <div className="text-muted-foreground text-sm">
        {venue.address} {venue.postcode}
      </div>

      <div className="text-muted-foreground flex items-center space-x-1">
        <Milestone className="h-4 w-4" />
        <div className="text-xs">300 meters</div>
      </div>
    </Link>
  );
}
