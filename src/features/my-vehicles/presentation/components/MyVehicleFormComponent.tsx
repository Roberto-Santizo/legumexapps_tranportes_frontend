import { fuelTypeOptions, vehiclesOptions, vehiclesRepositoryProvider } from "@/features/vehicles/vehicles";
import { SelectFormField } from "@/features/shared/components/SelectFormField";
import { CustomFileFormField, TextFormField } from "@/features/shared/shared";
import { useQuery } from "@tanstack/react-query";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { MyVehicleForm } from "@/features/my-vehicles/my-vehicles";
import { useEffect, useRef, useState } from "react";

type Props = {
    register: UseFormRegister<MyVehicleForm>;
    errors: FieldErrors<MyVehicleForm>;
    control: Control<MyVehicleForm, any>;
}

export function MyVehicleFormComponent({ register, errors, control }: Props) {
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

    const { data } = useQuery({
        queryKey: ['getVehicles'],
        queryFn: () => vehiclesRepositoryProvider.getVehicles()
    });

    if (data) return (
        <>
            <SelectFormField<MyVehicleForm>
                control={control}
                label="Vehículo"
                name="vehicle_id"
                options={vehiclesOptions(data)}
                validation={{ required: 'El vehículo es requerido' }}
                errorMessage={errors.vehicle_id?.message}
            />

            <TextFormField<MyVehicleForm>
                label="Placa"
                placeholder="Placa del vehículo"
                name="plate"
                register={register}
                type="text"
                validation={{ required: 'La placa es requerida' }}
                errorMessage={errors.plate?.message}
            />

            <TextFormField<MyVehicleForm>
                label="Total Kms"
                placeholder="Kilometros del vehículo"
                name="total_kms"
                register={register}
                type="number"
                validation={{ required: 'El total de kilometros del vehículo es requerido' }}
                errorMessage={errors.total_kms?.message}
            />

            <TextFormField<MyVehicleForm>
                label="Total Peso"
                placeholder="Libras totales soportadas por el vehículo"
                name="max_weight"
                register={register}
                type="number"
                validation={{ required: 'El total de libras soportadas del vehículo es requerido' }}
                errorMessage={errors.max_weight?.message}
            />

            <SelectFormField<MyVehicleForm>
                control={control}
                label="Tipo de combustible"
                name="fuel_type"
                options={fuelTypeOptions}
                validation={{ required: 'El tipo de combustible es requerido' }}
                errorMessage={errors.fuel_type?.message}
            />

            <div className="flex flex-col justify-between">
                <CustomFileFormField<MyVehicleForm>
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
