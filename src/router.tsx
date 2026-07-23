import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CreateBrand, IndexBrands, ShowBrand, UpdateBrand } from "@/features/brands/brands";
import { CreateMyVehicle, IndexMyVehicles, ShowMyVehicle, UpdateMyVehicle } from "@/features/my-vehicles/my-vehicles";
import { Dashboard } from "@/features/dashboard/dashboard";
import { Login } from "@/features/auth/auth";
import { NotFound, ProtectedLayout, PublicLayout } from "@/features/shared/shared";
import { Profile } from "@/features/profile/profile";
import { CreateZone, IndexZones, ShowZone, UpdateZone } from "@/features/zones/zones";
import { CreateTrip, IndexTrips, ShowTrip } from "./features/trips/trips";

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
                    <Route path="/mis-vehiculos" element={<IndexMyVehicles />} />
                    <Route path="/mis-vehiculos/crear" element={<CreateMyVehicle />} />
                    <Route path="/mis-vehiculos/:id" element={<ShowMyVehicle />} />
                    <Route path="/mis-vehiculos/:id/editar" element={<UpdateMyVehicle />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route path="/vehiculos-marcas" element={<IndexBrands />} />
                    <Route path="/vehiculos-marcas/crear" element={<CreateBrand />} />
                    <Route path="/vehiculos-marcas/:id" element={<ShowBrand />} />
                    <Route path="/vehiculos-marcas/:id/editar" element={<UpdateBrand />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route path="/zonas" element={<IndexZones />} />
                    <Route path="/zonas/crear" element={<CreateZone />} />
                    <Route path="/zonas/:id" element={<ShowZone />} />
                    <Route path="/zonas/:id/editar" element={<UpdateZone />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route path="/mis-viajes" element={<IndexTrips />} />
                    <Route path="/mis-viajes/crear" element={<CreateTrip />} />
                    <Route path="/mis-viajes/:id" element={<ShowTrip />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
