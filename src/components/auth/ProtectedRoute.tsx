import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import CP from "..";
import {
  isAuthenticatedState,
  isSelectedState,
  userRoleState,
  userState,
} from "@/store/userStore";
import { employee } from "@/store/employee";
import { Error } from "@/pages/error";
import { ErrorStatus } from "@/store/error";
interface ProtectedRouteProps {
  element: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedRoles,
}) => {
  const navigate = useNavigate();
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const selected = useRecoilValue(isSelectedState);

  const error = useRecoilValue(ErrorStatus);
  const userRole = useRecoilValue(userRoleState);
  const user = useRecoilValue(userState);
  const employeeStatus = useRecoilValue(employee);
  console.log(employeeStatus);
  const handleBack = () => {
    navigate("/join-organization");
  };
  console.log("ming", employeeStatus?.status);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.firstName || !user.lastName) {
    return <Navigate to="/fillForm" replace />;
  }

  if (!selected.isSelected) {
    return <Navigate to="/login/choose-organization" replace />;
  }
  if (employeeStatus?.status === "pending") {
    return <Navigate to="/check-status" replace />;
  }
  if (allowedRoles && allowedRoles.length > 0) {
    // check if user has required roles
    const hasRequiredRole = allowedRoles.includes(userRole);

    if (!hasRequiredRole) {
      // redirect to unauthorized page if user doesn't have required role
      return <Navigate to="/unauthorized" replace />;
    }
  }
  if (error) {
    return (
      <CP.Styled.Flex direction="column">
        <Error status={error.statusCode!} message={error.message!} />
        <CP.Button onClick={handleBack}>Back to organizations</CP.Button>
      </CP.Styled.Flex>
    );
  }

  return <>{element}</>;
};

export default ProtectedRoute;
