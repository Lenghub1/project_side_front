import { Route, Routes } from "react-router-dom";
import routes, { RouteProps } from "./routes";
import useUpdateAxiosInterceptor from "@/hooks/useUpdateAxiosInterceptor";
import { PersistLogin } from "@/components/auth";
import useAuth from "@/hooks/useAuth";
import { useRecoilValue } from "recoil";
import { axiosInterceptorState } from "@/store/userStore";

const renderRoutes = (routes: RouteProps[]) => {
  return routes.map((route: RouteProps) => {
    if (route.children && route.children.length > 0) {
      return (
        <Route
          key={route.name}
          path={route.path}
          element={route.element ? <route.element /> : undefined}
        >
          {renderRoutes(route.children)} {/* recursive call */}
        </Route>
      );
    } else {
      return (
        <Route
          key={route.name}
          path={route.path}
          element={route.element ? <route.element /> : undefined}
        />
      );
    }
  });
};

const AppRoutes = () => {
  useUpdateAxiosInterceptor();
  useAuth();

  // to make sure that Authorization header
  const isInterceptorInitialized = useRecoilValue(axiosInterceptorState);

  // if (!isInterceptorInitialized) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {!isInterceptorInitialized ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route element={<PersistLogin />}>{renderRoutes(routes)}</Route>
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
