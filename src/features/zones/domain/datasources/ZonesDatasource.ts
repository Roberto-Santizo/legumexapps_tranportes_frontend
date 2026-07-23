import type { Zone } from "@/features/zones/zones";

export abstract class ZonesDatasource {
    abstract getZones(): Promise<Zone[]>;
    abstract getZoneById(id: string): Promise<Zone>;
}