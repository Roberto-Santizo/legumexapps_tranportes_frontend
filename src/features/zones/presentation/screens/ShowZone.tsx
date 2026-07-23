import { MapPin, MapPinned } from "lucide-react";
import { BackLink, GoogleMap, Loading, Title } from "@/features/shared/shared";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { zonesRepositoryProvider } from "@/features/zones/zones";
import { ZoneFuelRanges } from "@/features/zones/presentation/components/components";

export function ShowZone() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["getZoneById", id],
    queryFn: () => zonesRepositoryProvider.getZoneById(id!),
  });

  if (isLoading) return <Loading />;
  if (data) return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8">
      <BackLink link="/zonas" text="Volver a zonas"/>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Title
          title="Zona"
          subtitle="Información y delimitación geográfica"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/30">
              <MapPinned className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Nombre de la zona
              </p>

              <h2 className="truncate text-xl font-bold text-gray-900 dark:text-white">
                {data.name}
              </h2>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-5 dark:border-slate-800">
            <div className="rounded-xl bg-gray-50 p-3 dark:bg-slate-800/60">
              <dt className="text-xs font-medium text-gray-500 dark:text-slate-400">
                Precisión de Puntos
              </dt>
              <dd className="mt-0.5 text-sm font-semibold text-gray-900 dark:text-white">
                {data.coordinates?.length ?? 0}
              </dd>
            </div>
          </dl>
        </section>

        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-gray-100 px-6 py-4 dark:border-slate-800">
            <MapPin className="h-4 w-4 text-gray-400 dark:text-slate-500" />

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Ubicación
              </h3>

              <p className="text-sm text-gray-500 dark:text-slate-400">
                Delimitación de la zona en el mapa
              </p>
            </div>
          </div>

          <div className="h-96 lg:h-full lg:min-h-125">
            <GoogleMap coordinates={data.coordinates} />
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <ZoneFuelRanges zoneId={id!} />
      </section>
    </div>
  );
}
