"use client";

import Link from "next/link";
import { Venue } from "~/server/api/types";
import { Milestone } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

export function VenueListItem({ venue }: { venue: Venue }) {
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
      className="hover:bg-muted space-y-0.5 px-4 py-3.5 text-left"
    >
      <div className="flex items-center">
        <div className="space-x-2 text-sm font-medium">
          {venue.name}

          {venue.company && (
            <Badge
              className={cn(
                  "ml-2 dark:ring-2",
                venue.company === "Independent"
                  ? "bg-emerald-400 text-emerald-900 dark:bg-background dark:text-emerald-400"
                  : "bg-red-400 text-red-900 dark:bg-background dark:text-red-400",
              )}
            >
              {venue.company}
            </Badge>
          )}
        </div>

        <div className="ml-auto text-xs">
          {venue.distance && (
            <div className="text-muted-foreground flex items-center space-x-1">
              <Milestone className="h-4 w-4" />
              <div className="text-xs">
                {venue.distance.toFixed(venue.distance >= 10 ? 0 : 1)} mi
              </div>
            </div>
          )}
        </div>
        <div className="ml-auto hidden text-xs">{venue.company}</div>
      </div>

      <div className="text-muted-foreground text-sm">
        {venue.address} {venue.postcode}
      </div>
    </Link>
  );
}
