import { ZoneSchema } from "@/features/zones/zones";
import type { z } from "zod";

export type Zone = z.infer<typeof ZoneSchema>;

export type ZoneForm = {
    name: string;
    coordinates: [number, number][];
}