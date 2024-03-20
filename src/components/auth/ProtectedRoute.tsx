import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
interface ProtectedRouteProps {
  element: any;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedRoles,
}) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    // redirect to login if not authenticated
    return <Navigate to="/login" replace />;
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
