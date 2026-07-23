import { PlaceSchema, RouteSchema, type Place, type PlacesDatasource, type Route } from "@/features/places/places";
import { isAxiosError, type AxiosInstance } from "axios";
import { z } from "zod";

export class PlacesDatasourceImpl implements PlacesDatasource {
    constructor(private api: AxiosInstance, private url = '/places') { }

    async getPlaces(query: string): Promise<Place[]> {
        try {
            const url = `${this.url}?place=${query}`
            const { data } = await this.api.get(url);

            const response = z.array(PlaceSchema).safeParse(data['data']);
            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getPlaceById(id: string): Promise<Place> {
        try {
            const url = `${this.url}/${id}`
            const { data } = await this.api.get(url);

            const response = PlaceSchema.safeParse(data['data']);
            if (response.success) {
                return response.data;
            }

            throw new Error("Información no válida");
        } catch (error) {
            if (isAxiosError(error)) throw new Error(error.response?.data.message);

            throw new Error("Error no controlado");
        }
    }

    async getRoute(start: [number, number], end: [number, number]): Promise<Route> {
        try {
            const url = `${this.url}/route`
            const { data } = await this.api.post(url, {
                start_lat: start[0],
                start_lng: start[1],
                end_lat: end[0],
                end_lng: end[1]
            });

            const response = RouteSchema.safeParse(data['data']);
            
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