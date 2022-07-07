import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "../../Loader";
import { ProtectedRouteProps } from "./ProtectedRoute.types";

export const ProtectedRoute = ({
  hasPermission,
  isLoading,
  navigateTo,
}: ProtectedRouteProps) => {
  if (isLoading) return <Loader />;

  if (!hasPermission) {
    return navigateTo ? <Navigate to={navigateTo} /> : null;
  }

  return <Outlet />;
};
