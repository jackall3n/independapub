import { api, HydrateClient } from "~/trpc/server";
import { Sidebar } from "~/components/sidebar";
import React, { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  void api.venues.list.prefetch();

  return (
    <HydrateClient>
      <div className="grid grid-cols-[auto_1fr] divide-x">
        <Sidebar />

        <div className="relative grid sm:grid-cols-[450px_1fr] divide-x">{children}</div>
      </div>
    </HydrateClient>
  );
}
