import type { Brand } from "@/features/brands/brands";

export abstract class BrandsDatasource {
    abstract getBrands(): Promise<Brand[]>;
}