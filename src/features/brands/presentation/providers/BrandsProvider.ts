import api from "@/config/http/axios";
import { BrandsDatasourceImpl, BrandsRepositoryImpl, type BrandForm, type BrandsRepository } from "@/features/brands/brands";

class BrandsProvider {
    constructor(private repository: BrandsRepository) { }
    
    updateBrandById(id: string, payload: BrandForm){
        return this.repository.updateBrandById(id, payload);
    }

    getBrandById(id: string){
        return this.repository.getBrandById(id);
    }

    getBrands(){
        return this.repository.getBrands();
    }

    createBrand(payload: BrandForm){
        return this.repository.createBrand(payload);
    }
}

const datasource = new BrandsDatasourceImpl(api);
const repository = new BrandsRepositoryImpl(datasource);
export const brandsRepositoryProvider = new BrandsProvider(repository);