import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState } from "@/store/userStore";
interface UnprotectedRouteProps {
  element: any;
  redirectPath?: string;
}

const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({
  element,
  redirectPath = "/login/choose-organization",
}) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  if (isAuthenticated) {
    return (
      <Navigate to={redirectPath || "/login/choose-organization"} replace />
    );
  }

  return element;
};

export default UnprotectedRoute;
