import { zonesRepositoryProvider, type FuelRangeForm } from "@/features/zones/zones";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CustomFilledButton, CustomForm, handleDeleteQueryParam, Modal, queryParamExists, TextFormField, useNotification } from "@/features/shared/shared";

export function ModalCreateFuelRange() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const notification = useNotification();
    const queryClient = useQueryClient();
    const show = queryParamExists(location, 'addFuelRange');

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm<FuelRangeForm>();

    const handleCloseModal = () => {
        handleDeleteQueryParam(location, navigate, 'addFuelRange');
        reset();
    };

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: FuelRangeForm) => zonesRepositoryProvider.createFuelRange(payload, id!),
        onSuccess: (message) => {
            notification.success(message);
            queryClient.invalidateQueries({ queryKey: ["getFuelRangesByZone", id] });
            handleCloseModal();
        },
        onError: (err) => {
            notification.error(err.message);
        }
    });

    const onSubmit = (payload: FuelRangeForm) => mutate(payload);

    return (
        <Modal modal={show} closeModal={() => handleCloseModal()} title="Agregar Rango de Combustible" width="w-full">
            <div className="space-y-5">
                <CustomForm onSubmit={handleSubmit(onSubmit)}>
                    <TextFormField<FuelRangeForm>
                        label="Rango"
                        placeholder="Precio de gasolina"
                        name="fuel_range"
                        register={register}
                        type="number"
                        validation={{ required: 'El valor es requerido' }}
                        errorMessage={errors.fuel_range?.message}
                    />

                    <CustomFilledButton label="Crear" type="submit" disabled={isPending} />
                </CustomForm>
            </div>
        </Modal>
    )
}
