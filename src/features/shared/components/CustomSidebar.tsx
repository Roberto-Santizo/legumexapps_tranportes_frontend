import { CustomNavLink } from "@/features/shared/shared";
import { Car, Home, Map } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/config/config";
import { NavLink } from "react-router-dom";

export function CustomSideBar() {
  const user = useSelector((state: RootState) => state.auth.user)!;

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-16 items-center border-b border-gray-200 px-6 dark:border-slate-800">
        <img
          src="https://legumexappsapi-storage.s3.us-east-1.amazonaws.com/resources/LOGO_LX_V2.png"
          alt="Logo"
          className="h-10 w-10 object-contain"
        />

        <div className="ml-3">
          <h1 className="font-semibold text-gray-900 dark:text-slate-100">
            Transportes
          </h1>

          <p className="text-xs text-gray-500 dark:text-slate-400">
            Plataforma de Transportes
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 pt-6">
        <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">
          Menú
        </p>

        <ul className="space-y-1 pb-4">
          <CustomNavLink to="/dashboard" text="Dashboard" icon={<Home />} />
          <CustomNavLink to="/vehiculos-marcas" text="Marcas de Vehículo" icon={<Car />} />
          <CustomNavLink to="/viajes" text="Viajes" icon={<Map />} />
        </ul>
      </nav>

      <div className="border-t border-gray-200 p-4 dark:border-slate-800">
        <NavLink
          to={'/perfil'}
          className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-gray-50 dark:hover:bg-slate-800"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            {user.name[0]}
          </div>

          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-slate-100">
              {user.fullName}
            </p>

            <p className="truncate text-xs text-gray-500 dark:text-slate-400">
              {user.role}
            </p>
          </div>
        </NavLink>
      </div>
    </aside>
  );
}
