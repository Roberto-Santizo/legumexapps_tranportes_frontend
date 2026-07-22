import type { MyVehicle, MyVehicleForm } from "@/features/my-vehicles/my-vehicles";

export abstract class MyVehiclesDatasource {
    abstract addVehicleToCarrier(payload: MyVehicleForm, carrierCode: string): Promise<string>;
    abstract getCarrierVehicles(carrierCode: string): Promise<MyVehicle[]>;
    abstract updateVehicleStatus(id: string): Promise<string>;
}
