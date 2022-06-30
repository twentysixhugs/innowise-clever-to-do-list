import { Navigate } from "react-router-dom";

interface IProtectedProps {
  isLoggedIn: boolean;
  children?: React.ReactElement;
}

export const Protected = ({ isLoggedIn, children }: IProtectedProps) => {
  if (!isLoggedIn) {
    return <Navigate to="/singin"></Navigate>;
  }

  return children || null;
};
