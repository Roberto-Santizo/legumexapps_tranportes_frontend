import type { FuelRange, Zone, ZonesDatasource, ZonesRepository } from "@/features/zones/zones";

export class ZonesRepositoryImpl implements ZonesRepository {
    constructor(private datasource: ZonesDatasource) {}

    getFuelPricesByZone(id: string): Promise<FuelRange[]> {
        return this.datasource.getFuelPricesByZone(id);
    }

    getZones(): Promise<Zone[]> {
        return this.datasource.getZones();
    }
    
    getZoneById(id: string): Promise<Zone> {
        return this.datasource.getZoneById(id);
    }

}