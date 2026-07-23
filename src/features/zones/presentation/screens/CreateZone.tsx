import { ZoneFormComponent, zonesRepositoryProvider, type ZoneForm } from "@/features/zones/zones";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";

export function CreateZone() {
  const notification = useNotification();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<ZoneForm>();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ZoneForm) => zonesRepositoryProvider.createZone(payload),
    onSuccess: (message) => {
      notification.success(message);
      navigate('/zonas');
    },
    onError: (err) => {
      notification.error(err.message);
    }
  });

  const onSubmit = (data: ZoneForm) => mutate(data);

  return (
    <div>
      <Title title="Crear Zona" subtitle="Formulario para la creación de zonas" />

      <section>
        <CustomForm onSubmit={handleSubmit(onSubmit)}>
          <ZoneFormComponent register={register} control={control} errors={errors} />
          <CustomFilledButton label="Crear" type="submit" disabled={isPending} />
        </CustomForm>
      </section>
    </div>
  )
}
