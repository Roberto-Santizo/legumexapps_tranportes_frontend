import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { useForm } from "react-hook-form";
import { brandsRepositoryProvider, CreateBrandForm, type BrandForm } from "@/features/brands/brands";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function CreateBrand() {
  const notification = useNotification();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<BrandForm>();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: BrandForm) => brandsRepositoryProvider.createBrand(payload),
    onSuccess: (message) => {
      notification.success(message);
      navigate('/vehiculos-marcas');
    },
    onError: (err) => {
      notification.error(err.message);
    }
  });

  const onSubmit = (payload: BrandForm) => mutate(payload);

  return (
    <div>
      <Title title="Crear Marca de Vehículo" subtitle="Formulario para la creación de marcas de vehículo" />

      <section>
        <CustomForm onSubmit={handleSubmit(onSubmit)}>
          <CreateBrandForm errors={errors} register={register} />
          <CustomFilledButton label="Crear" type="submit" disabled={isPending} />
        </CustomForm>
      </section>
    </div>
  )
}
