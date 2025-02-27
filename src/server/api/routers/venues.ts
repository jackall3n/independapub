import { z } from "zod";

import { router, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env";
import { db } from "~/server/db";

export const venues = router({
  list: publicProcedure
    .input(z.object({ city: z.string() }).optional())
    .query(({ input, ctx }) => {
      return ctx.db.venue.findMany();
    }),
  get: publicProcedure.input(z.string()).query(({ input: id, ctx }) => {
    return ctx.db.venue.findFirst({
      where: {
        id,
      },
    });
  }),
  getMaps: publicProcedure
    .input(z.object({ city: z.string() }).optional())
    .query(({ input, ctx }) => {
      return ctx.db.venue.findMany();
    }),
  getCoordinates: publicProcedure
    .input(z.string())
    .query(async ({ input: id, ctx }) => {
      const venue = await ctx.db.venue.findFirstOrThrow({ where: { id } });

      const query = new URLSearchParams({
        q: `${venue.name} ${venue.address} ${venue.postcode}`,
        access_token: env.NEXT_PUBLIC_MAPBOX_TOKEN,
      });

      const response = await fetch(
        `https://api.mapbox.com/search/geocode/v6/forward?${query.toString()}`,
      );

      const data = await response.json();

      if (!data) {
        return;
      }

      const { features } = data;
      const [feature] = features;

      if (!feature) {
        return;
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
    }),
});
