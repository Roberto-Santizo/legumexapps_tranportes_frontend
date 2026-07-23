import { APIProvider, Map, Marker, Polygon } from "@vis.gl/react-google-maps";
import { Controller, type Control, type FieldValues, type Path, type RegisterOptions } from "react-hook-form";
import { getCoordinatesCenter } from "@/features/shared/shared";

const GUATEMALA_CENTER = { lat: 15.7835, lng: -90.2308 };

type Props<T extends FieldValues> = {
    label: string;
    name: Path<T>;
    errorMessage?: string;
    control: Control<T>;
    validation: RegisterOptions<T, Path<T>>;
};

export function MapFormField<T extends FieldValues>({ label, name, errorMessage, control, validation }: Props<T>) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <Controller
                name={name}
                control={control}
                rules={validation}
                render={({ field }) => {
                    const coordinates: number[][] = field.value ?? [];
                    const hasCoordinates = coordinates.length > 0;
                    const paths = coordinates.map(([lng, lat]) => ({ lat, lng }));
                    const center = hasCoordinates ? getCoordinatesCenter(coordinates) : GUATEMALA_CENTER;
                    const zoom = hasCoordinates ? 15 : 7;

                    const handleMapClick = (e: any) => {
                        const latLng = e.detail.latLng;
                        if (!latLng) return;

                        field.onChange([...coordinates, [latLng.lng, latLng.lat]]);
                    };

                    return (
                        <div className="flex flex-col gap-2">
                            <div className="h-96 w-full overflow-hidden rounded-lg border border-gray-300">
                                <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
                                    <Map
                                        className="h-full w-full"
                                        defaultCenter={center}
                                        defaultZoom={zoom}
                                        gestureHandling="greedy"
                                        disableDefaultUI
                                        mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
                                        onClick={handleMapClick}
                                    >
                                        {hasCoordinates && (
                                            <Polygon
                                                paths={paths}
                                                fillColor="#2563eb"
                                                fillOpacity={0.18}
                                                strokeColor="#2563eb"
                                                strokeWeight={3}
                                            />
                                        )}

                                        {paths.map((position, index) => (
                                            <Marker key={index} position={position} />
                                        ))}
                                    </Map>
                                </APIProvider>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="text-xs text-gray-500">
                                    {hasCoordinates
                                        ? `${coordinates.length} punto(s) seleccionado(s)`
                                        : "Haz clic en el mapa para agregar puntos a la zona"}
                                </p>

                                {hasCoordinates && (
                                    <button
                                        type="button"
                                        onClick={() => field.onChange([])}
                                        className="text-xs text-blue-600 hover:underline"
                                    >
                                        Limpiar puntos
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                }}
            />

            <p className="text-red-400 text-xs">{errorMessage}</p>
        </div>
    );
}
