import { APIProvider, Map, Polygon } from "@vis.gl/react-google-maps";
import { getCoordinatesCenter } from "@/features/shared/shared";

const GUATEMALA_CENTER = { lat: 15.7835, lng: -90.2308 };

interface Props {
    coordinates?: number[][];
}

export function GoogleMap({ coordinates }: Props) {
    const hasCoordinates = !!coordinates && coordinates.length > 0;
    const paths = coordinates?.map(([lng, lat]) => ({ lat, lng }));

    const center = hasCoordinates ? getCoordinatesCenter(coordinates) : GUATEMALA_CENTER;
    const zoom = hasCoordinates ? 15 : 7;

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
            <Map
                className="h-full w-full"
                defaultCenter={center}
                defaultZoom={zoom}
                gestureHandling="greedy"
                disableDefaultUI
                mapId={import.meta.env.VITE_GOOGLE_MAP_ID} // opcional
            >
                {paths && paths.length > 0 && (
                    <Polygon
                        paths={paths}
                        fillColor="#2563eb"
                        fillOpacity={0.18}
                        strokeColor="#2563eb"
                        strokeWeight={3}
                    />
                )}
            </Map>
        </APIProvider>
    )
}

