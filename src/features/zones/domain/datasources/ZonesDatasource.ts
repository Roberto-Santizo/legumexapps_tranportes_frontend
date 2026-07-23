import type { FuelRange, FuelRangeForm, Zone, ZoneForm } from "@/features/zones/zones";

export abstract class ZonesDatasource {
    abstract createZone(payload: ZoneForm): Promise<string>;
    abstract getZones(): Promise<Zone[]>;
    abstract getZoneById(id: string): Promise<Zone>;
    abstract createFuelRange(payload: FuelRangeForm, zoneId: string): Promise<string>;
    abstract getFuelPricesByZone(id: string): Promise<FuelRange[]>;
    abstract deleteFuelRange(id: string): Promise<string>;
    abstract deleteZone(zoneId: string): Promise<string>;
}