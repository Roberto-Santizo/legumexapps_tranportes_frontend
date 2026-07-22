import type { Brand, BrandForm } from "@/features/brands/brands";

export abstract class BrandsRepository {
    abstract createBrand(payload: BrandForm): Promise<string>;
    abstract getBrands(): Promise<Brand[]>;
    abstract getBrandById(id: string): Promise<Brand>;
    abstract updateBrandById(id: string, payload: BrandForm): Promise<string>;
}