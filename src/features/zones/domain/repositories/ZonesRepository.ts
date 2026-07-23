import type { Zone } from "@/features/zones/zones";

export abstract class ZonesRepository {
    abstract getZones(): Promise<Zone[]>;
    abstract getZoneById(id: string): Promise<Zone>;
}