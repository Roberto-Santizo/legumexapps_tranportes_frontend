import { brandsRepositoryProvider } from "@/features/brands/brands";
import { CustomFilledButton, CustomTableLink, LoadingTable, Table, Tbody, Td, Th, Thead, Title, Tr } from "@/features/shared/shared";
import { EditIcon, EyeIcon, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function IndexBrands() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['getBrands'],
    queryFn: () => brandsRepositoryProvider.getBrands()
  });

  if (isLoading) return <LoadingTable />
  if (data) return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <Title title="Marcas de Vehículos" subtitle="Marcas de Vehículos Disponibles" />
        <CustomFilledButton
          label="Crear Marca"
          type="button"
          icon={<PlusIcon />}
          onClick={() => navigate('/vehiculos-marcas/crear')}
        />
      </div>
      <Table >
        <Thead >
          <Th text="Marca" />
          <Th text="Acciones" />
        </Thead>
        <Tbody>
          {data.map(brand => (
            <Tr key={brand.id}>
              <Td>{brand.name}</Td>
              <Td className="flex gap-5">
                <CustomTableLink onClick={() => navigate(`/vehiculos-marcas/${brand.id}`)} icon={<EyeIcon />} />
                <CustomTableLink onClick={() => navigate(`/vehiculos-marcas/${brand.id}/editar`)} icon={<EditIcon />} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  )
}
