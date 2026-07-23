import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ModalCreateFuelRange, zonesRepositoryProvider } from "@/features/zones/zones";
import { PlusIcon, TrashIcon } from "lucide-react";
import { CustomFilledButton, CustomTableLink, Table, Tbody, Td, Th, Thead, Tr, useNotification } from "@/features/shared/shared";

type Props = {
    zoneId: string;
};

export function ZoneFuelRanges({ zoneId }: Props) {
    const navigate = useNavigate();
    const notification = useNotification();

    const { data: ranges, isLoading, refetch } = useQuery({
        queryKey: ["getFuelRangesByZone", zoneId],
        queryFn: () => zonesRepositoryProvider.getFuelPricesByZone(zoneId),
    });

    const { mutate } = useMutation({
        mutationFn: (id: string) => zonesRepositoryProvider.deleteFuelRange(id),
        onSuccess: (message) => {
            notification.success(message);
            refetch();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    if (ranges) return (
        <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-gray-50 p-4 dark:bg-slate-800">
                <div className="flex items-center gap-3 justify-between">
                    <p className="font-semibold">Rangos de Gasolina</p>
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
                            <Th text="Acciones" />
                        </Thead>

                        <Tbody>
                            {ranges.map(range => (
                                <Tr key={range.id}>
                                    <Td>Q {range.fuel_range}</Td>
                                    <Td>
                                        <CustomTableLink
                                            onClick={() => mutate(`${range.id}`)}
                                            icon={<TrashIcon />}
                                        />
                                    </Td>
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
