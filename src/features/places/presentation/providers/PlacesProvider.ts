import api from "@/config/http/axios";
import { PlacesDatasourceImpl, PlacesRepositoryImpl, type Place, type PlacesRepository, type Route } from "@/features/places/places";

export class PlacesProvider {
    constructor(private repository: PlacesRepository) { }

    getPlaces(query: string): Promise<Place[]> {
        return this.repository.getPlaces(query);
    }

    getPlaceById(id: string): Promise<Place> {
        return this.repository.getPlaceById(id);
    }

    getRoute(start: [number, number], end: [number, number]): Promise<Route> {
        return this.repository.getRoute(start, end);
    }

}

const datasource = new PlacesDatasourceImpl(api);
const repository = new PlacesRepositoryImpl(datasource);
export const placesRepositoryProvider = new PlacesProvider(repository);