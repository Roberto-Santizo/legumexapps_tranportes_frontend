import { AuthDatasource, type LoginForm, BadRequestError, ConflictError, NotFoundError, type AuthUser, Unauthorized, AuthUserSchema } from '@/features/auth/auth';
import { isAxiosError, type AxiosInstance } from 'axios';

export class AuthDatasourceImpl implements AuthDatasource {
    constructor(private api: AxiosInstance) { }

    async checkStatus(): Promise<AuthUser> {
        try {
            const url = '/check-status';
            const { data } = await this.api.get(url);
            const response = AuthUserSchema.safeParse(data['data']);
            if (response.success) {
                return response.data;
            }

            throw new Error("Error de validación");
        } catch (error) {
            if (isAxiosError(error)) {
                const status = error.response?.status;
                if (status == 401) throw new Unauthorized(error.response?.data?.message ?? 'No autorizado');
            }
            throw new Error("Error no controlado");
        }
    }

    async login(payload: LoginForm): Promise<AuthUser> {
        try {
            const url = '/login';
            const { data } = await this.api.post(url, payload);
            const response = AuthUserSchema.safeParse(data['data']);
            if (response.success) {
                return response.data;
            }

            throw new Error("Error de validación");
        } catch (error) {
            if (isAxiosError(error)) {
                const status = error.response?.status;
                const message = error.response?.data?.message;
                if (status == 404) throw new NotFoundError(message ?? 'El usuario ingresado no existe');
                if (status == 409) throw new ConflictError(message ?? 'Credenciales incorrectas');
                if (status == 400) throw new BadRequestError(error.response?.data?.errors?.[0] ?? 'Datos inválidos');
            }
            throw new Error("Error no controlado");
        }
    }

}
