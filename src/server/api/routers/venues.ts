import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const venuesRouter = createTRPCRouter({
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
});
