import { isAxiosError, type AxiosInstance } from "axios";
import { z } from 'zod';
import { ZoneSchema, type Zone, type ZonesDatasource } from "@/features/zones/zones";

export class ZonesDatasourceImpl implements ZonesDatasource {
    constructor(private api: AxiosInstance, private url = '/zones') { }

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