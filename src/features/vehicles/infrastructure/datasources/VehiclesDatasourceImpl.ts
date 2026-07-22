import { ApiResponseSchema } from "@/features/shared/shared";
import { VehicleSchema, type Vehicle, type VehicleForm, type VehiclesDatasource } from "@/features/vehicles/vehicles";
import { isAxiosError, type AxiosInstance } from "axios";
import { z } from "zod";

export class VehiclesDatasourceImpl implements VehiclesDatasource {
    constructor(private api: AxiosInstance, private url = '/vehicles') { }

    async createVehicle(payload: VehicleForm): Promise<string> {
        try {
            const { data } = await this.api.post(this.url, payload);
            const response = ApiResponseSchema.safeParse(data);

            if (response.success) {
                return response.data.message;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");

        }
    }

    async getVehicles(): Promise<Vehicle[]> {
        try {

            throw new Error("Información no válida");

        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");

        }
    }

    async getVehiclesByBrandId(brandId: string): Promise<Vehicle[]> {
        try {
            const url = `${this.url}/getVehiclesByBrand/${brandId}`
            const { data } = await this.api.get(url);
            const response = z.array(VehicleSchema).safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");

        }
    }

    async getVehiclesByCarrierCode(carrierCode: string): Promise<Vehicle[]> {
        try {

            throw new Error("Información no válida");

        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");

        }
    }


}