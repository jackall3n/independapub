import { api, HydrateClient } from "~/trpc/server";
import { Sidebar } from "~/components/sidebar";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  void api.venues.list.prefetch();

  return (
    <HydrateClient>
      <div className="grid grid-cols-[auto_450px_1fr] divide-x">
        <Sidebar />

        {children}
      </div>
    </HydrateClient>
  );
}
