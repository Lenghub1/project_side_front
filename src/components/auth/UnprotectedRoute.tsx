import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState, isSelectedState } from "@/store/userStore";
interface UnprotectedRouteProps {
  element: any;
  redirectPath?: string;
}

const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({
  element,
  redirectPath = "/",
}) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const selected = useRecoilValue(isSelectedState);

  if (isAuthenticated && selected && user.firstName) {
    return <Navigate to={redirectPath || "/"} replace />;
  }

  return element;
};

export default UnprotectedRoute;
