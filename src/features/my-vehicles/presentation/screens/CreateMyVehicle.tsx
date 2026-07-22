import { convertImageToBase64, CustomFilledButton, CustomForm, Title, useNotification } from "@/features/shared/shared";
import { MyVehicleFormComponent, myVehiclesRepositoryProvider, type MyVehicleForm } from "@/features/my-vehicles/my-vehicles";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/config/config";

export function CreateMyVehicle() {
  const navigate = useNavigate();
  const notification = useNotification();
  const user = useSelector((state: RootState) => state.auth.user)!;

  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm<MyVehicleForm>();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: MyVehicleForm) => myVehiclesRepositoryProvider.addVehicleToCarrier(payload, user.carrier.code),
    onSuccess: (message) => {
      notification.success(message);
      navigate('/mis-vehiculos');
    },
    onError: (err) => {
      notification.error(err.message);
    }
  });

  const onSubmit = async (payload: MyVehicleForm) => {
    payload.image = await convertImageToBase64(payload.file[0]);
    mutate(payload);
  }

  return (
    <div>
      <Title title="Crear Vehículo" subtitle="Formulario para la creación de vehículos" />

      <CustomForm onSubmit={handleSubmit(onSubmit)}>
        <MyVehicleFormComponent register={register} errors={errors} control={control} />
        <CustomFilledButton label="Crear" type="submit" disabled={isPending} />
      </CustomForm>
    </div>
  )
}
