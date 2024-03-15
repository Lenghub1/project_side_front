import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/userStore";
import useFetch from "@/hooks/useFetch";
import { getUserEmployments } from "@/api/employee";
interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ adminOnly }) => {
  const user = useRecoilValue(userState);
  console.log(user);
  const { data, error } = useFetch(getUserEmployments);

  if (error) {
    console.log(error);
  }
  console.log(data);

  const isAuthorized = data?.filter(
    (em: any) => em.role === "admin" || em.role === "super-admin"
  );

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/test-login" />;
  } else if (adminOnly && isAuthorized) {
    // Redirect to unauthorized page if user is not admin or superadmin
    return <Navigate to="/unauthorized" />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
