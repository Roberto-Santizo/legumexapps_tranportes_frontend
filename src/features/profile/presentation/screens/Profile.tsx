import { Mail, Shield, User } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/config/config";

export function Profile() {
  const user = useSelector((state: RootState) => state.auth.user)!;

  const initials = `${user.name?.charAt(0) ?? ""}${user.lastName?.charAt(0) ?? ""}`.toUpperCase();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
          <p className="mt-1 text-sm text-gray-500">
            Consulta tu información personal y los datos de tu cuenta.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="h-32 bg-linear-to-r from-emerald-500 via-emerald-600 to-green-600" />
          <div className="px-8 pb-8">
            <div className="-mt-16 flex flex-col items-center md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col items-center md:flex-row md:items-end">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-white text-3xl font-bold text-emerald-600 shadow-lg">
                  {initials}
                </div>

                <div className="mt-10 text-center md:ml-6 md:mt-0 md:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 mt-20">
                    {user.name} {user.lastName}
                  </h2>

                  <p className="mt-1 text-gray-500">
                    Información de tu cuenta
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 p-5 transition hover:shadow-md">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">
                    <User size={20} />
                  </div>

                  <h3 className="font-semibold text-gray-900">
                    Nombre completo
                  </h3>
                </div>

                <p className="text-gray-600">
                  {user.fullName}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-5 transition hover:shadow-md">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-xl bg-blue-100 p-2 text-blue-600">
                    <Mail size={20} />
                  </div>

                  <h3 className="font-semibold text-gray-900">
                    Correo electrónico
                  </h3>
                </div>

                <p className="break-all text-gray-600">{user.email}</p>
              </div>

              <div className="flex justify-between">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-xl bg-purple-100 p-2 text-purple-600">
                    <Shield size={20} />
                  </div>

                  <h3 className="font-semibold text-gray-900">Rol: {user.role}</h3>
                </div>

               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}