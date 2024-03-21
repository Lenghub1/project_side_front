import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
interface UnprotectedRouteProps {
  element: any;
  redirectPath?: string;
}

const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({
  element,
  redirectPath = "/",
}) => {
  const { isAuthenticated, selected } = useAuth();
  console.log(selected);

  if (isAuthenticated) {
    if (!selected) {
      return <Navigate to="/login/choose-organization" replace />;
    } else if (selected) {
      return <Navigate to={redirectPath} replace />;
    }
  }

  return element;
};

export default UnprotectedRoute;
