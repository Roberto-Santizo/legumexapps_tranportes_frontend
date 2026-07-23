import { CustomTableLink, Loading, Table, Tbody, Td, Th, Thead, Title, Tr } from "@/features/shared/shared";
import { EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { zonesRepositoryProvider } from "@/features/zones/zones";

export function IndexZones() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['getZones'],
    queryFn: () => zonesRepositoryProvider.getZones()
  });


  if (isLoading) return <Loading />
  if (data) return (
    <div className="space-y-5">
      <Title title="Zonas" subtitle="Zonas Disponibles" />
      <Table>
        <Thead>
          <Th text="Zona" />
          <Th text="Acciones" />
        </Thead>
        <Tbody>
          {data.map(zone => (
            <Tr key={zone.id}>
              <Td>{zone.name}</Td>
              <Td className="flex gap-5">
                <CustomTableLink onClick={() => navigate(`/zonas/${zone.id}`)} icon={<EyeIcon />} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  )
}
