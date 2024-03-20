import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

interface UnprotectedRouteProps {
  element: any;
  redirectPath?: string;
}

const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({
  element,
  redirectPath,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated && redirectPath) {
    navigate(redirectPath);
  }

  return element;
};

export default UnprotectedRoute;
