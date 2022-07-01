import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  hasPermission: boolean;
  navigateTo?: string;
};

export const ProtectedRoute = ({
  hasPermission,
  navigateTo,
}: ProtectedRouteProps) => {
  if (!hasPermission) {
    return navigateTo ? <Navigate to={navigateTo} /> : null;
  }

  return <Outlet />;
};
