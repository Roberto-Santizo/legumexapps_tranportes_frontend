import type { Option } from "@/features/shared/shared";
import type { Vehicle } from "@/features/vehicles/vehicles";

export const vehiclesOptions = (vehicles: Vehicle[]): Option[] => {
    const options: Option[] = vehicles.map((vehicle) => {
        return {
            value: vehicle.id,
            label: `${vehicle.name} - ${vehicle.year}`
        }
    })

    return options;
}