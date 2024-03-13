import { Route, Routes } from "react-router-dom";
import routes, { RouteProps } from "./routes";
import useUpdateAxiosInterceptor from "@/hooks/useUpdateAxiosInterceptor";
import { PersistLogin } from "@/components/auth";
import useAuth from "@/hooks/useAuth";

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
  return (
    <Routes>
      <Route element={<PersistLogin />}>{renderRoutes(routes)}</Route>
    </Routes>
  );
};

export default AppRoutes;
