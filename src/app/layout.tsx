import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";

export const metadata: Metadata = {
  title: "Independapub",
  description: "Where are all the independent pubs?",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(GeistSans.variable, "h-dvh dark")}>
      <body className="h-dvh">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
