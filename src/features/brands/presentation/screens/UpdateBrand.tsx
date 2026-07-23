import { brandsRepositoryProvider, CreateBrandForm, type BrandForm } from "@/features/brands/brands"
import { BackLink, CustomFilledButton, CustomForm, Loading, Title, useNotification } from "@/features/shared/shared";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateBrand() {
  const { id } = useParams();
  const notification = useNotification();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['getBrandById', id],
    queryFn: () => brandsRepositoryProvider.getBrandById(id!)
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValues
  } = useForm<BrandForm>();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: BrandForm) => brandsRepositoryProvider.updateBrandById(id!, payload),
    onSuccess: (message) => {
      notification.success(message);
      navigate('/vehiculos-marcas');
    },
    onError: (err) => {
      notification.error(err.message);
    }
  });

  useEffect(() => {
    if (data) {
      const { id, ...rest } = data;
      setValues(rest);
    }
  }, [data]);

  const onSubmit = (payload: BrandForm) => mutate(payload);

  if (isLoading) return <Loading />
  if (data) return (
    <div className="space-y-5">
      <BackLink link="/vehiculos-marcas" text="Volver a marcas" />

      <Title title="Actualizar marca de vehículo" subtitle="Formulario de Actualización" />

      <section>
        <CustomForm onSubmit={handleSubmit(onSubmit)} >
          <CreateBrandForm errors={errors} register={register} />
          <CustomFilledButton label="Guardar Cambios" type="submit" disabled={isPending} />
        </CustomForm>
      </section>
    </div>
  )
}
