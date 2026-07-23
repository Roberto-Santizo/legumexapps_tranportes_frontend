import { PlacesSearchField } from "@/features/places/places";
import { Title } from "@/features/shared/shared";

export function CreateTrip() {
  return (
    <div className="space-y-5">

        <Title title="Crear Viaje" subtitle="Creación de viaje para planificación"/>

        <section>
            <PlacesSearchField />
        </section>
    </div>
  )
}
