import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { FilterIcon } from "lucide-react";
import { VenueListItem } from "~/components/venue-list-item";
import { Venue } from "~/server/api/types";

interface VenueListProps {
  venues: Venue[];
}

export function VenueList({ venues }: VenueListProps) {
  return (
    <>
      <div className="bg-background sticky top-0 z-10 flex space-x-2 p-4">
        <Input placeholder="Search Independapub" className="rounded-full" />
        <Button size="icon" variant="outline" className="shrink-0 rounded-full">
          <FilterIcon />
        </Button>
      </div>

      <div className="grid grid-cols-1 divide-y">
        {venues.map((venue) => (
          <VenueListItem key={venue.id} venue={venue} />
        ))}
      </div>
    </>
  );
}
