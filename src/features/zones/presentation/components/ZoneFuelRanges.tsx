import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ModalCreateFuelRange, zonesRepositoryProvider } from "@/features/zones/zones";
import { Fuel, PlusIcon } from "lucide-react";
import { CustomFilledButton, Table, Tbody, Td, Th, Thead, Tr } from "@/features/shared/shared";

type Props = {
    zoneId: string;
};

export function ZoneFuelRanges({ zoneId }: Props) {
    const navigate = useNavigate();

    const { data: ranges, isLoading } = useQuery({
        queryKey: ["getFuelRangesByZone", zoneId],
        queryFn: () => zonesRepositoryProvider.getFuelPricesByZone(zoneId),
    });

    return (
        <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-gray-50 p-4 dark:bg-slate-800">
                <div className="flex items-center gap-3 justify-between">
                    <Fuel className="h-5 w-5 text-gray-500 dark:text-slate-400" />

                    <div>
                        <p className="text-sm text-gray-500 dark:text-slate-400">
                            Rangos de Gasolina
                        </p>
                    </div>

                    <CustomFilledButton
                        label="Agregar"
                        type="button"
                        icon={<PlusIcon />}
                        onClick={() => navigate('?addFuelRange=true')}
                    />
                </div>
            </div>

            <div className="rounded-2xl border border-dashed border-gray-300 p-4 dark:border-slate-700">
                {isLoading ? (
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                        Cargando rangos...
                    </p>
                ) : (
                    <Table>
                        <Thead>
                            <Th text="Precio" />
                        </Thead>

                        <Tbody>
                            {ranges?.map(range => (
                                <Tr key={range.id}>
                                    <Td>Q {range.fuel_range}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                )}
            </div>

            <ModalCreateFuelRange />
        </div>
    );
}
