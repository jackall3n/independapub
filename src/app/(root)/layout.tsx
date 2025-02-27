import { api, HydrateClient } from "~/trpc/server";
import { Map } from "~/components/map";
import { Sidebar } from "~/components/sidebar";
import { VenuesList } from "~/components/venues-list";

export default async function Layout({ children }: any) {
  void api.venues.list.prefetch();

  return (
    <HydrateClient>
      <div className="grid grid-cols-[auto,450px,1fr] divide-x">
        <Sidebar />

        <div className="divide-y">
          <VenuesList />
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

          <Map />
        </div>
      </div>
    </HydrateClient>
  );
}
