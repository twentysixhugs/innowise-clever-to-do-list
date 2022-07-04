import { Navigate, Outlet } from "react-router-dom";
import { ProtectedRouteProps } from "./props.type";

export const ProtectedRoute = ({
  hasPermission,
  navigateTo,
}: ProtectedRouteProps) => {
  if (!hasPermission) {
    return navigateTo ? <Navigate to={navigateTo} /> : null;
  }

  return <Outlet />;
};
