import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { isAuthenticatedState, userRoleState } from "@/store/userStore";

interface ProtectedRouteProps {
  element: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedRoles,
}) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const userRole = useRecoilValue(userRoleState);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const hasRequiredRole = allowedRoles.includes(userRole);

    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{element}</>;
};

export default ProtectedRoute;
