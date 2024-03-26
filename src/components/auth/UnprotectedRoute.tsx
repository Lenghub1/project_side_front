import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
<<<<<<< HEAD
import { useRecoilValue } from "recoil";
import { selectedOrganization } from "@/store/userStore";
import { accountTypeState } from "@/store/signupStore";

=======
>>>>>>> develop
interface UnprotectedRouteProps {
  element: any;
  redirectPath?: string;
}

const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({
  element,
  redirectPath = "/",
}) => {
<<<<<<< HEAD
  const { isAuthenticated } = useAuth();
  const selected = useRecoilValue(selectedOrganization);
  const accountType = useRecoilValue(accountTypeState);

  if (isAuthenticated) {
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
=======
  const { isAuthenticated, selected } = useAuth();

  if (isAuthenticated && selected) {
    return <Navigate to={redirectPath || "/"} replace />;
>>>>>>> develop
  }

  return element;
};

export default UnprotectedRoute;
