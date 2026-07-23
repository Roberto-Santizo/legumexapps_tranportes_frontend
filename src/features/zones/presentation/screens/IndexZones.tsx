import { CustomFilledButton, CustomTableLink, Loading, Table, Tbody, Td, Th, Thead, Title, Tr, useNotification } from "@/features/shared/shared";
import { EyeIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { zonesRepositoryProvider } from "@/features/zones/zones";

export function IndexZones() {
  const navigate = useNavigate();
  const notification = useNotification();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['getZones'],
    queryFn: () => zonesRepositoryProvider.getZones()
  });

  const { mutate } = useMutation({
    mutationFn: (id: string) => zonesRepositoryProvider.deleteZone(id),
    onSuccess: (message) => {
      notification.success(message);
      refetch();
    },
    onError: (err) => {
      notification.error(err.message);
    }
  });

  const handleDelete = (id: string) => {
    notification.question('¿Desea eliminar la zona?', 'eliminar', 'Si elimina la zona no se podran realizar viajes a esta región', () => mutate(id));
  }

  if (isLoading) return <Loading />
  if (data) return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <Title title="Zonas" subtitle="Zonas Disponibles" />
        <CustomFilledButton
          label="Crear"
          icon={<PlusIcon />}
          type="button"
          onClick={() => navigate('/zonas/crear')}
        />
      </div>

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
                <CustomTableLink onClick={() => handleDelete(`${zone.id}`)} icon={<TrashIcon />} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  )
}
