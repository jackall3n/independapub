import { createCallerFactory, router } from "~/server/api/trpc";
import { venues } from "~/server/api/routers/venues";

export const appRouter = router({
  venues,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
