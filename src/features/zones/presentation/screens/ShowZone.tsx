import { GoogleMap, Loading, Title } from "@/features/shared/shared";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { zonesRepositoryProvider } from "@/features/zones/zones";

export function ShowZone() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['getZoneById', id],
    queryFn: () => zonesRepositoryProvider.getZoneById(id!)
  });

  if (isLoading) return <Loading />
  if (data) return (
    <div>
      <Title title="Zona" subtitle="Detalle de la zona" />

      <section>
        <p>{data.name}</p>
      </section>

      <GoogleMap coordinates={data.coordinates} />
    </div>
  )
}
