import { TextFormField } from "@/features/shared/shared";
import type { BrandForm } from "@/features/brands/brands";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
    register: UseFormRegister<BrandForm>;
    errors: FieldErrors<BrandForm>;
}

export function CreateBrandForm({ register, errors } : Props) {
  return (
    <>  
        <TextFormField<BrandForm> 
            label="Nombre"
            name="name"
            placeholder="Nombre de la marca"
            register={register}
            errorMessage={errors.name?.message}
            type="text"
            validation={{ required: 'El nombre de la marca es requerida' }}
        />
    </>
  )
}
