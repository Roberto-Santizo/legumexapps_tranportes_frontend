import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/config/config";
import { PublicHeader } from "@/features/shared/shared";
import backgroundVideo from "@/assets/videos/background.mp4";

export function PublicLayout() {
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);

  if (isSignedIn) {
    return <Navigate to={'/dashboard'} replace />
  }

  return (
    <main className="relative flex h-screen flex-col overflow-hidden ">
      <video
        className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover blur-sm"
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      <PublicHeader />
      <div className="flex flex-1 items-center justify-center">
        <Outlet />
      </div>
    </main>
  );
}
