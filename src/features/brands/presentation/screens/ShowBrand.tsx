import { brandsRepositoryProvider } from "@/features/brands/brands";
import { BackLink, CustomFilledButton, Loading, Title } from "@/features/shared/shared";
import { ModalCreateVehicle } from "@/features/vehicles/presentation/components/ModalCreateVehicle";
import { PlusIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { VehiclesByBrand } from "@/features/vehicles/vehicles";

export function ShowBrand() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['getBrandById', id],
    queryFn: () => brandsRepositoryProvider.getBrandById(id!)
  });

  if (isLoading) return <Loading />
  if (data) return (
    <div className="space-y-5">
      <BackLink link="/vehiculos-marcas" text="Volver a marcas" />


      <div className="flex justify-between items-center">
        <Title title={data.name} subtitle="Marca de Vehículo" />
        <CustomFilledButton
          label="Agregar Vehículo"
          type="button"
          icon={<PlusIcon />}
          onClick={() => navigate('?createVehicle=true')}
        />
      </div>

      <VehiclesByBrand brandId={id!} />
      <ModalCreateVehicle brandId={id!} />
    </div>
  )
}
