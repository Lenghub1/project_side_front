import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useRecoilValue } from "recoil";
import { selectOrganization } from "@/store/userStore";
import { accountTypeState } from "@/store/signupStore";
import { resetPasswordToken } from "@/store/userStore";

interface UnprotectedRouteProps {
  element: any;
  redirectPath?: string;
}

const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({
  element,
  redirectPath = "/",
}) => {
  const { isAuthenticated, selected } = useAuth();
  const { isAuthenticated } = useAuth();
  const selected = useRecoilValue(selectOrganization);
  const accountType = useRecoilValue(accountTypeState);
  const resetPassword = useRecoilValue(resetPasswordToken);

  if (isAuthenticated && selected) {
    return <Navigate to={redirectPath || "/"} replace />;
  }

  return element;
};

export default UnprotectedRoute;
