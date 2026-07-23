import type { Place, PlacesRepository, Route } from "@/features/places/places";

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