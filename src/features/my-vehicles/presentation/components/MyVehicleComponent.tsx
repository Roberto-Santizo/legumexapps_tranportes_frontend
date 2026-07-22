import { BadgeCheck, Car, Fuel, Gauge, Hash } from "lucide-react";
import type { MyVehicle } from "@/features/my-vehicles/my-vehicles";

type Props = {
    myVehicle: MyVehicle;
    onUpdateStatus: (id: string) => void;
};

export function MyVehicleComponent({ myVehicle, onUpdateStatus }: Props) {
    const imageUrl = `${import.meta.env.VITE_BUCKET_URL}/${myVehicle.image}`;

    return (
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
            <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-slate-800">
                <img
                    src={imageUrl}
                    alt={`${myVehicle.vehicle} ${myVehicle.model}`}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>

            <div className="space-y-6 p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {myVehicle.vehicle}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-slate-400">
                            Modelo {myVehicle.model}
                        </p>
                    </div>

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${myVehicle.status
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                            }`}
                    >
                        {myVehicle.status ? "Activo" : "Inactivo"}
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 dark:bg-slate-800">
                        <Hash className="h-5 w-5 text-gray-500 dark:text-slate-400" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-slate-400">
                                Placa
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                {myVehicle.plate}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 dark:bg-slate-800">
                        <Gauge className="h-5 w-5 text-gray-500 dark:text-slate-400" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-slate-400">
                                Kilometraje
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                {myVehicle.kms} km
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 dark:bg-slate-800">
                        <Fuel className="h-5 w-5 text-gray-500 dark:text-slate-400" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-slate-400">
                                Combustible
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                {myVehicle.fuelType}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl bg-gray-50 hover:bg-gray-200 p-4 dark:bg-slate-800 cursor-pointer dark:hover:bg-slate-600" onClick={() => onUpdateStatus(`${myVehicle.id}`)}>
                        <Car className="h-5 w-5 text-gray-500 dark:text-slate-400" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-slate-400">
                                Estado
                            </p>
                            <p className="flex items-center gap-1 font-semibold text-gray-900 dark:text-white">
                                <BadgeCheck className="h-4 w-4 text-green-500" />
                                {myVehicle.status ? "Disponible" : "Fuera de servicio"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
