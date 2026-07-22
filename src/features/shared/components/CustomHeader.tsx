import { Bell, LogOut, Moon, Sun, User } from "lucide-react";
import { logout } from "@/features/auth/auth";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useTheme } from "@/features/shared/shared";
import type { AppDispatch, RootState } from "@/config/config";


export function CustomHeader() {
  const { theme, toggleTheme } = useTheme();
  const user = useSelector((state: RootState) => state.auth.user)!;
  const dispatch = useDispatch<AppDispatch>();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const onLogout = () => {
    setIsMenuOpen(false);
    dispatch(logout());
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-900">
      <p className="font-bold dark:text-white">Bienvenido, {user.fullName}</p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Cambiar tema"
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          type="button"
          aria-label="Notificaciones"
          className="relative rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
        </button>

        <div className="relative ml-2" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600 transition hover:bg-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
          >
            {user.name[0]}
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-11 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-gray-100 px-4 py-3 dark:border-slate-800">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-slate-100">
                  {user.fullName}
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-slate-400">
                  {user.role}
                </p>
              </div>

              <NavLink
                to="/perfil"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <User size={16} />
                Mi perfil
              </NavLink>

              <button
                type="button"
                onClick={onLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
              >
                <LogOut size={16} />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
