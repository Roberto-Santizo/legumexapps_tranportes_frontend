import type { MyVehicle, MyVehicleForm, MyVehiclesDatasource, MyVehiclesRepository } from "@/features/my-vehicles/my-vehicles";

export class MyVehiclesRepositoryImpl implements MyVehiclesRepository {
    constructor(private datasource: MyVehiclesDatasource) { }

    addVehicleToCarrier(payload: MyVehicleForm, carrierCode: string): Promise<string> {
        return this.datasource.addVehicleToCarrier(payload, carrierCode);
    }

    getCarrierVehicles(carrierCode: string): Promise<MyVehicle[]> {
        return this.datasource.getCarrierVehicles(carrierCode);
    }

}
