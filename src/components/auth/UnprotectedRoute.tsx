import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useRecoilValue } from "recoil";
import { selectedOrganization } from "@/store/userStore";
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
  const selected = useRecoilValue(selectedOrganization);
  const accountType = useRecoilValue(accountTypeState);
  const resetPassword = useRecoilValue(resetPasswordToken);

<<<<<<< HEAD
  if (isAuthenticated && selected) {
    return <Navigate to={redirectPath || "/"} replace />;
=======
  if (isAuthenticated) {
    if (resetPassword) {
      console.log("Forget True");
      return <Navigate to="/forget-password/reset-password" replace />;
    }
    if (accountType) {
      return accountType === "employer" ? (
        <Navigate to="/get-started/employer-info" replace />
      ) : (
        <Navigate to="/get-started/employee-info" replace />
      );
    }

    if (!selected) {
      console.log("Organzation True");
      return <Navigate to="/login/choose-organization" replace />;
    } else if (selected) {
      return <Navigate to={redirectPath} replace />;
    }
>>>>>>> 39a6d77 (fix: fixing the token for resetting password)
  }

  return element;
};

export default UnprotectedRoute;
