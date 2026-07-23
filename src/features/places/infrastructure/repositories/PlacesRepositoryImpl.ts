import type { Place, PlacesDatasource, PlacesRepository, Route } from "@/features/places/places";

export class PlacesRepositoryImpl implements PlacesRepository {
    constructor(private datasource: PlacesDatasource) { }

    getPlaces(query: string): Promise<Place[]> {
        return this.datasource.getPlaces(query);
    }

    getPlaceById(id: string): Promise<Place> {
        return this.datasource.getPlaceById(id);
    }

    getRoute(start: [number, number], end: [number, number]): Promise<Route> {
        return this.datasource.getRoute(start, end);
    }

}