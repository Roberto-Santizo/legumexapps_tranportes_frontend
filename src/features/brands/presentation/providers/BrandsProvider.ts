import api from "@/config/http/axios";
import { BrandsDatasourceImpl, BrandsRepositoryImpl, type BrandsRepository } from "@/features/brands/brands";

class BrandsProvider {
    constructor(private repository: BrandsRepository) { }
    
    getBrands(){
        return this.repository.getBrands();
    }
}

const datasource = new BrandsDatasourceImpl(api);
const repository = new BrandsRepositoryImpl(datasource);
export const brandsRepositoryProvider = new BrandsProvider(repository);