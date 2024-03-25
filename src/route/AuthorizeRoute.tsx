import React from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/userStore";
import useFetch from "@/hooks/useFetch";
import { getUserEmployments } from "@/api/employee";
interface AuthorizedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const AuthorizedRoute: React.FC<AuthorizedRouteProps> = ({ adminOnly }) => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  console.log(user);
  if (!user) {
    // Redirect to login if user is not authenticated
    navigate("/login");
  }
  const { data, error } = useFetch(getUserEmployments);

  if (error) {
    console.log(error);
  }

  const isAuthorized = data?.filter(
    (em: any) => em.role === "admin" || em.role === "super-admin"
  );

  if (adminOnly && isAuthorized) {
    // Redirect to unauthorized page if user is not admin or superadmin
    return <Navigate to="/unauthorized" />;
  } else {
    return <Outlet />;
  }
};

export default AuthorizedRoute;
