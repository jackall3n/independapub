"use client";

import { Milestone } from "lucide-react";
import Link from "next/link";

export function VenueListItem({ venue }: any) {
  return (
    <Link
      replace
      scroll={false}
      href={{
        pathname: "/",
        query: {
          venue: venue.id,
        },
      }}
      className="hover:bg-muted space-y-0.5 px-5 py-4 text-left"
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
