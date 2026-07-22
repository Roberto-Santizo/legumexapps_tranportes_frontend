import api from "@/config/http/axios";
import { VehiclesDatasourceImpl, VehiclesRepositoryImpl, type Vehicle, type VehicleForm, type VehiclesRepository } from "@/features/vehicles/vehicles";

class VehiclesProvider {
    constructor(private repository: VehiclesRepository) { }

    createVehicle(payload: VehicleForm): Promise<string> {
        return this.repository.createVehicle(payload);
    }

    getVehicles(): Promise<Vehicle[]> {
        return this.repository.getVehicles();
    }

    getVehiclesByBrandId(brandId: string): Promise<Vehicle[]> {
        return this.repository.getVehiclesByBrandId(brandId);
    }
}

const datasource = new VehiclesDatasourceImpl(api);
const repository = new VehiclesRepositoryImpl(datasource);
export const vehiclesRepositoryProvider = new VehiclesProvider(repository);