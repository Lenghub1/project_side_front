import { Route, Routes } from "react-router-dom";
import routes, { RouteProps } from "./routes";
import useUpdateAxiosInterceptor from "@/hooks/useUpdateAxiosInterceptor";
import useAuth from "@/hooks/useAuth";
import { useRecoilValue } from "recoil";
import {
  axiosInterceptorState,
  isAccessTokenFetchedState,
} from "@/store/userStore";
import useEnsureAccessToken from "@/hooks/useEnsureAccessToken";

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
  useEnsureAccessToken();
  useUpdateAxiosInterceptor();
  useAuth();

  /**
   * to make sure that the application attempt to fetch
   * accessToken and set appropriate authorization header
   */
  const isAccessTokenFetched = useRecoilValue(isAccessTokenFetchedState);
  const isInterceptorInitialized = useRecoilValue(axiosInterceptorState);

  // if (!isInterceptorInitialized) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Routes>
      {/* <Route element={<PersistLogin />}> */}
      {isAccessTokenFetched && isInterceptorInitialized && renderRoutes(routes)}
      {/* </Route> */}
    </Routes>
  );
};

export default AppRoutes;
