import { MapPinned } from "lucide-react";
import { GoogleMap, Loading, Title } from "@/features/shared/shared";
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
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8">
      <Title
        title="Zona"
        subtitle="Información y delimitación geográfica"
      />

      <div className="grid gap-8 xl:grid-cols-[360px_1fr]">
        <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-50 p-3 dark:bg-blue-900/40">
              <MapPinned className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Nombre de la zona
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.name}
              </h2>
            </div>
          </div>

          <ZoneFuelRanges zoneId={id!} />
        </aside>

        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-gray-100 px-6 py-4 dark:border-slate-800">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Ubicación
            </h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              Delimitación de la zona en el mapa.
            </p>
          </div>

          <div className="h-162.5">
            <GoogleMap coordinates={data.coordinates} />
          </div>
        </section>
      </div>
    </div>
  );
}
