import { authRepositoryProvider, login, type LoginForm } from "@/features/auth/auth";
import { CustomFilledButton, PasswordFormField, TextFormField } from "@/features/shared/shared";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "@/features/shared/shared";
import type { AppDispatch } from "@/config/config";

export function Login() {
    const { error } = useNotification();
    const dispatch = useDispatch<AppDispatch>();

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue
    } = useForm<LoginForm>();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: LoginForm) => authRepositoryProvider.login(payload),
        onSuccess: (user) => {
            dispatch(login(user))
        },
        onError: (err) => {
            error(err.message);
            setValue('password', '');
        }
    });


    const onSubmit = (data: LoginForm) => mutate(data);
    return (
        <div className="w-full max-w-sm px-4">
            <form
                className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="text-center">
                    <h1 className="text-xl font-semibold text-gray-900">Iniciar Sesión</h1>
                    <p className="mt-1 text-sm text-gray-500">Panel Administrativo</p>
                </div>

                <TextFormField<LoginForm>
                    name="email"
                    label="Correo Electrónico"
                    placeholder="Ingrese su correo electrónico"
                    type="email"
                    errorMessage={errors.email?.message}
                    register={register}
                    validation={{ required: 'El correo electrónico es requerido' }}
                />

                <PasswordFormField<LoginForm>
                    name="password"
                    label="Contraseña"
                    placeholder="Contraseña"
                    errorMessage={errors.password?.message}
                    register={register}
                    validation={{ required: 'La contraseña es requerida' }}
                />

                <CustomFilledButton
                    label={isPending ? 'Iniciando sesión' : 'Iniciar Sesión'}
                    type="submit"
                    disabled={isPending}
                    fullWitdh
                />
            </form>
        </div>
    )
}
