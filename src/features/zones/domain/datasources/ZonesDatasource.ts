import type { FuelRange, Zone, ZoneForm } from "@/features/zones/zones";

export abstract class ZonesDatasource {
    abstract createZone(payload: ZoneForm): Promise<string>;
    abstract getZones(): Promise<Zone[]>;
    abstract getZoneById(id: string): Promise<Zone>;
    abstract getFuelPricesByZone(id: string): Promise<FuelRange[]>;
}