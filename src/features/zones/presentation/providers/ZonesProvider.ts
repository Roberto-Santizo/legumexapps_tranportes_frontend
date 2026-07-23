import api from "@/config/http/axios";
import { ZonesDatasourceImpl } from "@/features/zones/infrastructure/infrastructure";
import { ZonesRepositoryImpl, type ZonesRepository } from "@/features/zones/zones";

export class ZonesProvider {
    constructor(private repository: ZonesRepository) { }

    getZones() {
        return this.repository.getZones();
    }

    getZoneById(id: string) {
        return this.repository.getZoneById(id);
    }

    getFuelPricesByZone(id: string) {
        return this.repository.getFuelPricesByZone(id);
    }
}

const datasource = new ZonesDatasourceImpl(api);
const repository = new ZonesRepositoryImpl(datasource);
export const zonesRepositoryProvider = new ZonesProvider(repository);