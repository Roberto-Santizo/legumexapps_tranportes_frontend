import { z } from "zod";

export const ZoneSchema = z.object({
    id: z.number(),
    name: z.string(),
    coordinates: z.array(z.array(z.number())).optional(),
});

export const FuelRangeSchema = z.object({
    id: z.number(),
    fuel_range: z.number()
});