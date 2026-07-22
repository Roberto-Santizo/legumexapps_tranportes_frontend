import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/config/config";
import { CustomHeader, CustomSideBar } from "@/features/shared/shared";

export function ProtectedLayout() {
    const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);

    if (!isSignedIn) {
        return <Navigate to={'/login'} replace />
    }

    return (
        <main className="h-screen grid grid-cols-[auto_1fr] overflow-hidden">
            <CustomSideBar />

            <div className="flex h-full flex-col overflow-hidden">
                <CustomHeader />

                <section className="flex-1 overflow-y-auto bg-gray-50 p-6 dark:bg-slate-950">
                    <Outlet />
                </section>
            </div>
        </main>
    );
}
