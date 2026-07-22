import type { Vehicle } from "@/features/vehicles/vehicles";

type Props = {
  vehicle: Vehicle;
}

export function VehicleComponent({ vehicle }: Props) {
  const imageUrl = `${import.meta.env.VITE_BUCKET_URL}/${vehicle.image}`;
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
      <img
        src={imageUrl}
        alt={vehicle.name}
        className="h-40 w-full object-cover"
      />
      <div className="p-4 space-y-1">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">{vehicle.name}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Año: {vehicle.year}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Autonomía: {vehicle.autonomy} km</p>
      </div>
    </div>
  )
}
