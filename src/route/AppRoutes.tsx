import { Route, Routes } from "react-router-dom";
import routes from "./routes";

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => {
        return (
          <Route path={route.path} element={<route.element />} key={route.name}>
            {route.children?.map((r) => {
              return (
                <Route path={r.path} element={<r.element />} key={r.name} />
              );
            })}
          </Route>
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
