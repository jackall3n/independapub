
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { FilterIcon } from "lucide-react";
import { VenueListItem } from "~/components/VenueListItem";
import { api } from "~/trpc/server";

export async function VenuesList() {
  const venues = await api.venues.list();

  return (
    <>
      <div className="sticky top-0 z-10 flex space-x-2 bg-background p-4">
        <Input placeholder="Search Independapub" className="rounded-full" />
        <Button
          size="icon"
          variant="outline"
          className="flex-shrink-0 rounded-full"
        >
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
