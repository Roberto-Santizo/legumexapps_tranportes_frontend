import type { Brand, BrandsDatasource, BrandsRepository } from "@/features/brands/brands";

export class BrandsRepositoryImpl implements BrandsRepository {
    constructor(private datasource: BrandsDatasource) { }

    getBrands(): Promise<Brand[]> {
        return this.datasource.getBrands();
    }

}