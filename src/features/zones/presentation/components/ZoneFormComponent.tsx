import { MapFormField, TextFormField } from "@/features/shared/shared";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { ZoneForm } from "@/features/zones/zones";

type Props = {
    register: UseFormRegister<ZoneForm>;
    control: Control<ZoneForm>;
    errors: FieldErrors<ZoneForm>;
}

export function ZoneFormComponent({ register, control, errors }: Props) {
    return (
        <>
            <TextFormField<ZoneForm>
                label="Nombre"
                placeholder="Nombre de la zona"
                name="name"
                register={register}
                type="text"
                validation={{ required: 'El nombre de la zona es requerida' }}
                errorMessage={errors.name?.message}
            />

            <MapFormField<ZoneForm>
                label="Coordenadas"
                name="coordinates"
                control={control}
                validation={{
                    validate: (value) => {
                        const length = Array.isArray(value) ? value.length : 0;
                        return length >= 3 || 'Debes seleccionar al menos 3 puntos en el mapa'
                    }
                }}
                errorMessage={errors.coordinates?.message}
            />
        </>
    )
}

