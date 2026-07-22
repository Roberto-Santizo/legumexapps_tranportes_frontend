import type { MyVehicle, MyVehicleForm } from "@/features/my-vehicles/my-vehicles";

export abstract class MyVehiclesRepository {
    abstract addVehicleToCarrier(payload: MyVehicleForm, carrierCode: string): Promise<string>;
    abstract getCarrierVehicles(carrierCode: string): Promise<MyVehicle[]>;
}
