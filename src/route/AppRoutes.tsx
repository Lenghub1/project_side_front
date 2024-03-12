import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import useUpdateAxiosInterceptor from "@/hooks/useUpdateAxiosInterceptor";
import PersistLogin from "@/components/auth/PersistLogin";

const AppRoutes = () => {
  useUpdateAxiosInterceptor();
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        {routes.map((route) => {
          return (
            <Route
              path={route.path}
              element={<route.element />}
              key={route.name}
            >
              {route.children?.map((r) => {
                return (
                  <Route path={r.path} element={<r.element />} key={r.name} />
                );
              })}
            </Route>
          );
        })}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
