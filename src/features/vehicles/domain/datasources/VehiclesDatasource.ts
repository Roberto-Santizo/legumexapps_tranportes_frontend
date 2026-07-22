import type { Vehicle, VehicleForm } from "@/features/vehicles/vehicles";

export abstract class VehiclesDatasource {
    abstract createVehicle(payload: VehicleForm): Promise<string>;
    abstract getVehicles(): Promise<Vehicle[]>;
    abstract getVehiclesByBrandId(brandId: string): Promise<Vehicle[]>;
}