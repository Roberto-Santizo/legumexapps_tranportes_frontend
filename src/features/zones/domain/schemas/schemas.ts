import { z } from "zod";

export const ZoneSchema = z.object({
    id: z.number(),
    name: z.string(),
});