import { Route, Routes } from "react-router-dom";
import routes, { RouteProps } from "./routes";
import useUpdateAxiosInterceptor from "@/hooks/useUpdateAxiosInterceptor";
import { useRecoilValue } from "recoil";
import {
  axiosInterceptorState,
  isAccessTokenFetchedState,
  isUserFetchedState,
} from "@/store/userStore";
import useEnsureAccessToken from "@/hooks/useEnsureAccessToken";
import { ProtectedRoute, UnprotectedRoute } from "@/components/auth";

const renderRoutes = (routes: RouteProps[]) => {
  return routes.map((route: RouteProps) => {
    const isProtected = route.protected !== false;
    const Element = route.element;
    const element = isProtected ? (
      <ProtectedRoute
        element={Element ? <Element /> : null}
        allowedRoles={route.allowedRoles}
      />
    ) : !isProtected ? (
      <UnprotectedRoute element={Element ? <Element /> : null} />
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

  // to make sure that Authorization header
  /**
   * to make sure that the application attempt to fetch
   * accessToken and set appropriate authorization header
   */
  const isAccessTokenFetched = useRecoilValue(isAccessTokenFetchedState);
  const isInterceptorInitialized = useRecoilValue(axiosInterceptorState);

  if (
    !isAccessTokenFetched ||
    !isInterceptorInitialized ||
    !isUserFetchedState
  ) {
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
