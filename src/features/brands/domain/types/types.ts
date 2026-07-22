import { BrandSchema } from "@/features/brands/brands";
import { z } from "zod";

export type Brand = z.infer<typeof BrandSchema>;

export type BrandForm = {
    name: string;
}