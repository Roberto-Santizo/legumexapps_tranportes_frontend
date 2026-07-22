import { convertImageToBase64, CustomFilledButton, CustomForm, handleDeleteQueryParam, Modal, queryParamExists, useNotification } from "@/features/shared/shared";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VehicleFormComponent, vehiclesRepositoryProvider, type VehicleForm } from "@/features/vehicles/vehicles";

type Props = {
    brandId: string;
}

export function ModalCreateVehicle({ brandId }: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const notification = useNotification();
    const queryClient = useQueryClient();
    const show = queryParamExists(location, 'createVehicle');

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<VehicleForm>();

    const handleCloseModal = () => {
        handleDeleteQueryParam(location, navigate, 'createVehicle')
        reset();
    };

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: VehicleForm) => vehiclesRepositoryProvider.createVehicle(payload),
        onSuccess: (message) => {
            notification.success(message);
            queryClient.invalidateQueries({ queryKey: ['getVehiclesByBrand', brandId] });
            handleCloseModal();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = async (payload: VehicleForm) => {
        payload.image = await convertImageToBase64(payload.file[0]);
        payload.vehicle_brand_id = brandId;
        mutate(payload);
    }
    return (
        <Modal modal={show} closeModal={() => handleCloseModal()} title="Crear Vehículo" width="w-full">
            <div className="space-y-5">
                <CustomForm onSubmit={handleSubmit(onSubmit)}>
                    <VehicleFormComponent register={register} errors={errors} />
                    <CustomFilledButton label="Crear" type="submit" disabled={isPending} />
                </CustomForm>
            </div>
        </Modal>
    )
}
