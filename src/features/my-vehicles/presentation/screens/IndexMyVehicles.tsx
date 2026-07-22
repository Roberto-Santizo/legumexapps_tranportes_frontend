import { CustomFilledButton, Loading, Title } from "@/features/shared/shared";
import { MyVehicleComponent } from "@/features/my-vehicles/my-vehicles";
import { myVehiclesRepositoryProvider } from "@/features/my-vehicles/my-vehicles";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "@/config/config";

export function IndexMyVehicles() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user)!;

  const { data, isLoading } = useQuery({
    queryKey: ['getMyVehicles', user.carrier.code],
    queryFn: () => myVehiclesRepositoryProvider.getCarrierVehicles(user.carrier.code)
  });

  if (isLoading) return <Loading />
  if (data) return (
    <div>
      <div className="flex justify-between items-center">
        <Title title="Mis Vehículos" subtitle="Listado de mis vehículos" />
        <CustomFilledButton
          label="Agregar Vehículo"
          type="button"
          icon={<PlusIcon />}
          onClick={() => navigate('/mis-vehiculos/crear')}
        />
      </div>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 rounded-3xl bg-gray-50 p-8 sm:grid-cols-2 xl:grid-cols-3 dark:bg-slate-900">
        {data.map((myVehicle) => (
          <MyVehicleComponent
            key={myVehicle.id}
            myVehicle={myVehicle}
          />
        ))}
      </section>
    </div>
  )
}
