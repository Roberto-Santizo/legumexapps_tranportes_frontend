import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/config/config";

export function ProtectedLayout() {
    const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);

    if (!isSignedIn) {
        return <Navigate to={'/login'} replace />
    }

    return (
        <main className="h-screen w-full overflow-y-auto p-6">
            <Outlet />
        </main>
    );
}
