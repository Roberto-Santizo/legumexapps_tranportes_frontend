import { BrandSchema, type Brand, type BrandsDatasource } from "@/features/brands/brands";
import { isAxiosError, type AxiosInstance } from "axios";
import { z } from 'zod';

export class BrandsDatasourceImpl implements BrandsDatasource {
    constructor(private api: AxiosInstance, private url = '/vehicle-brands') { }

    async getBrands(): Promise<Brand[]> {
        try {
            const { data } = await this.api.get(this.url);
            const response = z.array(BrandSchema).safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

}