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
  const { isAuthenticated } = useAuth();
  const selected = useRecoilValue(selectOrganization);

  if (isAuthenticated) {
    if (!selected) {
      return <Navigate to="/login/choose-organizations" replace />;
    }
    if (selected) {
      return <Navigate to={redirectPath} replace />;
    }
  }

  return element;
};

export default UnprotectedRoute;
