import { MyVehiclesDatasourceImpl, MyVehiclesRepositoryImpl, type MyVehicle, type MyVehicleForm, type MyVehiclesRepository } from "@/features/my-vehicles/my-vehicles";
import api from "@/config/http/axios";

export class MyVehiclesProvider {
    constructor(private repository: MyVehiclesRepository) {}

    addVehicleToCarrier(payload: MyVehicleForm, carrierCode: string): Promise<string> {
        return this.repository.addVehicleToCarrier(payload, carrierCode);
    }

    getCarrierVehicles(carrierCode: string): Promise<MyVehicle[]> {
        return this.repository.getCarrierVehicles(carrierCode);
    }
}

const datasource = new MyVehiclesDatasourceImpl(api);
const repository = new MyVehiclesRepositoryImpl(datasource);
export const myVehiclesRepositoryProvider = new MyVehiclesProvider(repository);