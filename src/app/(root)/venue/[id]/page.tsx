import { api } from "~/trpc/server";
import { env } from "~/env";
import { notFound, redirect } from "next/navigation";
import { db } from "~/server/db";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Home(props: Props) {
  const params = await props.params;

  const venues = await db.venue.findMany();

  for (const venue of venues) {
    if (venue.coordinates?.length) {
      continue;
    }

    const query = new URLSearchParams({
      q: `${venue.name} ${venue.address} ${venue.postcode}`,
      access_token: env.NEXT_PUBLIC_MAPBOX_TOKEN,
    });

    const response = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?${query.toString()}`,
    );

    const data = await response.json();

    if (!data) {
      continue;
    }

    const { features } = data;
    const [feature] = features;

    if (!feature) {
      continue;
    }

    const { coordinates } = feature.geometry;

    await db.venue.update({
      data: {
        coordinates,
      },
      where: {
        id: venue.id,
      },
    });
  }

  const id = decodeURIComponent(params.id);
  const venue = await api.venues.get(id);

  if (!venue) {
    return notFound();
  }

  return redirect(`${id}/${venue.coordinates.join(",")}`);
}
