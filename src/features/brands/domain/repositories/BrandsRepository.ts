import type { Brand } from "@/features/brands/brands";

export abstract class BrandsRepository {
    abstract getBrands(): Promise<Brand[]>;
}