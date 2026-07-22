import { MyVehicleSchema } from "@/features/my-vehicles/my-vehicles";
import type { z } from "zod";

export type MyVehicle = z.infer<typeof MyVehicleSchema>;

export type MyVehicleForm = {
    plate: string;
    vehicle_id: string;
    total_kms: number;
    max_weight: number;
    fuel_type: string;
    image: string;
    file: File;
}