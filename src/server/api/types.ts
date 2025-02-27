import type { AppRouter } from "~/server/api/root";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type Venue = RouterOutput['venues']['list'][number]