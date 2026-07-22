import { z } from "zod";

export const MyVehicleSchema = z.object({
    id: z.number(),
    plate: z.string(),
    image: z.string(),
    vehicle: z.string(),
    model: z.string(),
    status: z.boolean(),
    kms: z.string(),
    fuelType: z.string()
});