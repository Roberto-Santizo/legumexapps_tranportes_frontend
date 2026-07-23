import { PlaceSchema, RouteSchema } from "@/features/places/places";
import type { z } from "zod";

export type Place = z.infer<typeof PlaceSchema>;
export type Route = z.infer<typeof RouteSchema>;