import { ApiResponseSchema } from "@/features/shared/shared";
import { isAxiosError, type AxiosInstance } from "axios";
import { MyVehicleSchema, type MyVehicle, type MyVehicleForm, type MyVehiclesDatasource } from "@/features/my-vehicles/my-vehicles";
import { z } from "zod";

export class MyVehiclesDatasourceImpl implements MyVehiclesDatasource {
    constructor(private api: AxiosInstance) { }

    async addVehicleToCarrier(payload: MyVehicleForm, carrierCode: string): Promise<string> {
        try {
            const url = `/carriers/addVehicle/${carrierCode}`;
            const { data } = await this.api.post(url, payload);
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

    async getCarrierVehicles(carrierCode: string): Promise<MyVehicle[]> {
        try {
            const url = `/carriers/getVehicles/${carrierCode}`;
            const { data } = await this.api.get(url);
            const response = z.array(MyVehicleSchema).safeParse(data['data']);

            console.log(response);
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
