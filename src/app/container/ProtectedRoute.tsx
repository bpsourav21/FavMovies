import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isUserAuthenticated } from "../actions/authActions";
import { useAppAuth, useAppDispatch } from "../hooks";

interface ProtectedRouteProps {
  redirectPath: string;
  children?: React.ReactElement;
}

export const ProtectedRoute = ({
  redirectPath = "/",
  children,
}: ProtectedRouteProps) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppAuth();

  useEffect(() => {
    dispatch(isUserAuthenticated());
  });

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
  return children ? children : <Outlet />;
};
