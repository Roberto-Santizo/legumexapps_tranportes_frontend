import type { Place, Route } from "@/features/places/places";

export abstract class PlacesRepository {
    abstract getPlaces(query: string): Promise<Place[]>;
    abstract getPlaceById(id: string): Promise<Place>;
    abstract getRoute(start: [number, number], end: [number, number]): Promise<Route>;
}