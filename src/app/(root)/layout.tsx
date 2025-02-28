import { Sidebar } from "~/components/sidebar";
import React, { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex divide-x h-full overflow-hidden">
        <Sidebar />

        <div className="flex-1 relative grid sm:grid-cols-[450px_1fr] divide-x">{children}</div>
      </div>
    </>
  );
}
