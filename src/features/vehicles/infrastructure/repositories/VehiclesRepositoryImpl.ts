import type { Vehicle, VehicleForm, VehiclesDatasource, VehiclesRepository } from "@/features/vehicles/vehicles";

export class VehiclesRepositoryImpl implements VehiclesRepository {
    constructor(private datasource: VehiclesDatasource) {}

    createVehicle(payload: VehicleForm): Promise<string> {
        return this.datasource.createVehicle(payload);    
    }

    getVehicles(): Promise<Vehicle[]> {
        return this.datasource.getVehicles();    
    }

    getVehiclesByBrandId(brandId: string): Promise<Vehicle[]> {
        return this.datasource.getVehiclesByBrandId(brandId);    
    }

    getVehiclesByCarrierCode(carrierCode: string): Promise<Vehicle[]> {
        return this.datasource.getVehiclesByCarrierCode(carrierCode);    
    }


}