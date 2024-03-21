import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { resetPasswordToken } from "@/store/userStore";
import { useRecoilValue } from "recoil";
interface ProtectedRouteProps {
  element: any;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedRoles,
}) => {
  const { isAuthenticated, userRole, selected } = useAuth();
  console.log(selected);

  if (!isAuthenticated) {
    // redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  if (!selected) {
    // Redirect to choose organization page
    return <Navigate to="/login/choose-organization" replace />;
  }
  if (allowedRoles && allowedRoles.length > 0) {
    // check if user has required roles
    const hasRequiredRole = allowedRoles.includes(userRole);

    if (!hasRequiredRole) {
      // redirect to unauthorized page if user doesn't have required role
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return element;
};

export default ProtectedRoute;
