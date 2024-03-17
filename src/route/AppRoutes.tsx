import { Route, Routes } from "react-router-dom";
import routes, { RouteProps } from "./routes";
import useUpdateAxiosInterceptor from "@/hooks/useUpdateAxiosInterceptor";
import { useRecoilValue } from "recoil";
import {
  axiosInterceptorState,
  isAccessTokenFetchedState,
} from "@/store/userStore";
import useEnsureAccessToken from "@/hooks/useEnsureAccessToken";
import { ProtectedRoute } from "@/components/auth";

const renderRoutes = (routes: RouteProps[]) => {
  return routes.map((route: RouteProps) => {
    const Element = route.element;
    const element = route.protected ? (
      <ProtectedRoute
        element={Element ? <Element /> : null}
        allowedRoles={route.allowedRoles}
      />
    ) : Element ? (
      <Element />
    ) : null;

    return (
      <Route key={route.name} path={route.path} element={element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    );
  });
};

const AppRoutes = () => {
  useEnsureAccessToken();
  useUpdateAxiosInterceptor();
  // useAuth();

  /**
   * to make sure that the application attempt to fetch
   * accessToken and set appropriate authorization header
   */
  const isAccessTokenFetched = useRecoilValue(isAccessTokenFetchedState);
  const isInterceptorInitialized = useRecoilValue(axiosInterceptorState);

  if (!isAccessTokenFetched || !isInterceptorInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* {isAccessTokenFetched && isInterceptorInitialized && renderRoutes(routes)} */}
      {renderRoutes(routes)}
    </Routes>
  );
};

export default AppRoutes;
