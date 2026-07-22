import { brandsRepositoryProvider } from "@/features/brands/brands";
import { LoadingTable, Table, Tbody, Td, Th, Thead, Title, Tr } from "@/features/shared/shared";
import { useQuery } from "@tanstack/react-query";

export function IndexBrands() {
  const { data, isLoading } = useQuery({
    queryKey: ['getBrands'],
    queryFn: () => brandsRepositoryProvider.getBrands()
  });

  if (isLoading) return <LoadingTable />
  if (data) return (
    <div className="space-y-5">
      <Title title="Marcas de Vehículos" subtitle="Marcas de vehículos registrados" />

      <Table >
        <Thead >
          <Th text="Marca" />
        </Thead>
        <Tbody>
          {data.map(brand => (
            <Tr key={brand.id}>
              <Td>{brand.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  )
}
