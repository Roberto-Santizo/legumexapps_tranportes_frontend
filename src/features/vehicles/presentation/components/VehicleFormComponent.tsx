import { CustomFileFormField, TextFormField } from "@/features/shared/shared";
import { useEffect, useRef, useState } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { VehicleForm } from "@/features/vehicles/vehicles";

type Props = {
    register: UseFormRegister<VehicleForm>;
    errors: FieldErrors<VehicleForm>;
}

export function VehicleFormComponent({ register, errors }: Props) {
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const previewUrlRef = useRef<string>("");

    const handleFileChange = (file: File | null) => {
        if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);

        const url = file ? URL.createObjectURL(file) : "";
        previewUrlRef.current = url;
        setPreviewUrl(url);
    }

    useEffect(() => {
        return () => {
            if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
        }
    }, []);

    return (
        <>
            <TextFormField<VehicleForm>
                label="Nombre"
                placeholder="Nombre del modelo del vehículo"
                name="name"
                register={register}
                type="text"
                validation={{ required: 'El nombre es requerido' }}
                errorMessage={errors.name?.message}
            />

            <TextFormField<VehicleForm>
                label="Año"
                placeholder="Año del vehículo"
                name="year"
                register={register}
                type="number"
                validation={{ required: 'El año es requerido' }}
                errorMessage={errors.year?.message}
            />

            <TextFormField<VehicleForm>
                label="Autonomía"
                placeholder="Autonomia del vehículo. Km/Litro"
                name="autonomy"
                register={register}
                type="number"
                validation={{ required: 'La autonomía es requerida' }}
                errorMessage={errors.autonomy?.message}
            />

            <div className="flex flex-col justify-between">
                <CustomFileFormField<VehicleForm>
                    extension=".jpg,.jpeg,.png"
                    label="Fotografía del Vehículo"
                    name="file"
                    register={register}
                    validation={{ required: 'La imágen del vehículo es requerida' }}
                    errorMessage={errors.image?.message}
                    onFileChange={handleFileChange}
                />
                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt="Vista previa del vehículo"
                        className="w-40 h-40 object-cover rounded-md border border-gray-200"
                    />
                )}
            </div>
        </>
    )
}
