import { z } from "zod";

export const VehicleSchema = z.object({
    id: z.number(),
    name: z.string(),
    autonomy: z.number(),
    image: z.string(),
    year: z.string()
});