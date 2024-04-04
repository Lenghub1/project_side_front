import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState, resetPasswordToken } from "@/store/userStore";
import { useLocation } from "react-router-dom";

interface UnprotectedRouteProps {
  element: any;
  redirectPath?: string;
}

const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({
  element,
  redirectPath = "/",
}) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const location = useLocation();

  const isResetPasswordRoute = location.pathname.startsWith("/verify-token");
  const isResetPassword = useRecoilValue(resetPasswordToken);

  if (isAuthenticated && !isResetPasswordRoute && !isResetPassword) {
    return <Navigate to={redirectPath || "/"} replace />;
  }

  return element;
};

export default UnprotectedRoute;
