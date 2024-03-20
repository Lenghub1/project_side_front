import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useRecoilValue } from "recoil";
import { selectedOrganization } from "@/store/userStore";
interface ProtectedRouteProps {
  element: any;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedRoles,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();
  const [selected] = useRecoilValue(selectedOrganization);
  console.log(selected, isAuthenticated);

  if (!isAuthenticated) {
    navigate("/login");
  } else {
    if (!selected) {
      navigate("/login/choose-organization");
    }
  }

  if (allowedRoles && allowedRoles.length > 0) {
    // check if user has required roles
    const hasRequiredRole = allowedRoles.includes(userRole);

    if (!hasRequiredRole) {
      // redirect to unauthorized page if user doesn't have required role
      navigate("/unauthorized");
    }
  }

  return element;
};

export default ProtectedRoute;
