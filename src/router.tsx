import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "@/features/auth/auth";
import { NotFound, ProtectedLayout, PublicLayout } from "@/features/shared/shared";

function Dashboard() {
    return <h1 className="text-3xl font-bold">Dashboard</h1>;
}

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path="*" element={<NotFound />} />
                </Route>

                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Navigate to={'/login'} replace />} />
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
