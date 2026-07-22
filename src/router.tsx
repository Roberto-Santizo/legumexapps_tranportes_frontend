import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "@/features/auth/auth";
import { NotFound, ProtectedLayout, PublicLayout } from "@/features/shared/shared";
import { Dashboard } from "@/features/dashboard/dashboard";
import { Profile } from "@/features/profile/profile";
import { CreateBrand, IndexBrands, ShowBrand, UpdateBrand } from "@/features/brands/brands";

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

                <Route element={<ProtectedLayout />}>
                    <Route path="/perfil" element={<Profile />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route path="/vehiculos-marcas" element={<IndexBrands />} />
                    <Route path="/vehiculos-marcas/crear" element={<CreateBrand />} />
                    <Route path="/vehiculos-marcas/:id" element={<ShowBrand />} />
                    <Route path="/vehiculos-marcas/:id/editar" element={<UpdateBrand />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
