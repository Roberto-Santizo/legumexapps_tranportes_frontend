import { useQuery } from "@tanstack/react-query";
import { vehiclesRepositoryProvider, VehicleComponent } from "@/features/vehicles/vehicles";

type Props = {
    brandId: string;
}

export function VehiclesByBrand({ brandId }: Props) {
    const { data } = useQuery({
        queryKey: ['getVehiclesByBrand', brandId],
        queryFn: () => vehiclesRepositoryProvider.getVehiclesByBrandId(brandId)
    });

    if (data) return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map(vehicle => (
                <VehicleComponent key={vehicle.id} vehicle={vehicle} />
            ))}
        </section>
    )
}
