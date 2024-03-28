import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  isAuthenticatedState,
  isSelectedState,
  isUserFetchedState,
  userRoleState,
  userState,
} from "@/store/userStore";

interface ProtectedRouteProps {
  element: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedRoles,
}) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const selected = useRecoilValue(isSelectedState);
  const userRole = useRecoilValue(userRoleState);
  const user = useRecoilValue(userState);
  const isUserFetched = useRecoilValue(isUserFetchedState);

  console.log("USER: ", user, isUserFetched);

  if (!isAuthenticated || !selected) {
    // redirect to login or choose organization if not authenticated or selected
    return (
      <Navigate
        to={!isAuthenticated ? "/login" : "/login/choose-organization"}
        replace
      />
    );
  }

  if (allowedRoles && allowedRoles.length > 0) {
    // check if user has required roles
    const hasRequiredRole = allowedRoles.includes(userRole);

    if (!hasRequiredRole) {
      // redirect to unauthorized page if user doesn't have required role
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{element}</>;
};

export default ProtectedRoute;
