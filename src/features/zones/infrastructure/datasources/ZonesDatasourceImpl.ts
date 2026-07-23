import { z } from 'zod';
import { isAxiosError, type AxiosInstance } from "axios";
import { FuelRangeSchema, ZoneSchema, type FuelRange, type FuelRangeForm, type Zone, type ZoneForm, type ZonesDatasource } from "@/features/zones/zones";
import { ApiResponseSchema } from "@/features/shared/shared";

export class ZonesDatasourceImpl implements ZonesDatasource {
    constructor(private api: AxiosInstance, private url = '/zones') { }

    async createFuelRange(payload: FuelRangeForm, zoneId: string): Promise<string> {
        try {
            const url = `${this.url}/addPriceRange/${zoneId}`
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

    async createZone(payload: ZoneForm): Promise<string> {
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

    async getFuelPricesByZone(id: string): Promise<FuelRange[]> {
        try {
            const url = `${this.url}/getPricesByZone/${id}`
            const { data } = await this.api.get(url);
            const response = z.array(FuelRangeSchema).safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getZones(): Promise<Zone[]> {
        try {
            const { data } = await this.api.get(this.url);
            const response = z.array(ZoneSchema).safeParse(data['data']);

            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getZoneById(id: string): Promise<Zone> {
        try {
            const url = `${this.url}/${id}`

            const { data } = await this.api.get(url);
            const response = ZoneSchema.safeParse(data['data']);

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