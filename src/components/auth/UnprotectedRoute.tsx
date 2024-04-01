import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState, isSelectedState } from "@/store/userStore";
interface UnprotectedRouteProps {
  element: any;
  redirectPath?: string;
}
import { employee } from "@/store/employee";

const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({
  element,
  redirectPath = "/",
}) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const selected = useRecoilValue(isSelectedState);
  const employeeStatus = useRecoilValue(employee);
  const employeedStatus = employeeStatus?.status;

  if (isAuthenticated && selected.isSelected && employeedStatus === "active") {
    return <Navigate to={redirectPath || "/"} replace />;
  }

  return element;
};

export default UnprotectedRoute;
