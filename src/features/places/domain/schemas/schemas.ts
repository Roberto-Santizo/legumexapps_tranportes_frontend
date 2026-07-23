import { z } from "zod";

export const PlaceSchema = z.object({
    id: z.string(),
    address: z.string(),
    lat: z.number(),
    lng: z.number()
});

export const RouteSchema = z.object({
    distance: z.number(),
    duration: z.number(),
    polyline: z.string(),
    points: z.array(z.array(z.number())),
});