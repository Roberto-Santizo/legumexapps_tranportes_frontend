import { brandsRepositoryProvider } from "@/features/brands/brands";
import { Loading, Title } from "@/features/shared/shared";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function ShowBrand() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['getBrandById', id],
    queryFn: () => brandsRepositoryProvider.getBrandById(id!)
  });

  if (isLoading) return <Loading />
  if (data) return (
    <div>
      <Title title={data.name} subtitle="Marca de Vehículo" />
    </div>
  )
}
