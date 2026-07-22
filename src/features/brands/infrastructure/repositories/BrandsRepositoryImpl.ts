import type { Brand, BrandForm, BrandsDatasource, BrandsRepository } from "@/features/brands/brands";

export class BrandsRepositoryImpl implements BrandsRepository {
    constructor(private datasource: BrandsDatasource) { }

    getBrandById(id: string): Promise<Brand> {
       return this.datasource.getBrandById(id);
    }
    
    updateBrandById(id: string, payload: BrandForm): Promise<string> {
       return this.datasource.updateBrandById(id, payload);
    }

    createBrand(payload: BrandForm): Promise<string> {
        return this.datasource.createBrand(payload);
    }

    getBrands(): Promise<Brand[]> {
        return this.datasource.getBrands();
    }

}