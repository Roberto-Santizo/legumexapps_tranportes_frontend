import { VehicleSchema } from "@/features/vehicles/vehicles";
import type { z } from "zod";

export type Vehicle = z.infer<typeof VehicleSchema>;

export type VehicleForm = {
    name: string;
    file: File[];
    image: string;
    autonomy: string;
    vehicle_brand_id: string;
    year: string;
}