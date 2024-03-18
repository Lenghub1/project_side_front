import React from "react";
import { Navigate, Location, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

interface UnprotectedRouteProps {
  element: any;
  redirectPath?: string;
}

const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({
  element,
  redirectPath = "/",
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return element;
};

export default UnprotectedRoute;
