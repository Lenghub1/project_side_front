import { Route, Routes } from "react-router-dom";
import routes, { RouteProps } from "./routes"; // Assuming this is correctly imported
import useUpdateAxiosInterceptor from "@/hooks/useUpdateAxiosInterceptor";
import { useRecoilValue } from "recoil";
import {
  accessTokenState,
  axiosInterceptorState,
  isAccessTokenFetchedState,
  isUserFetchedState,
} from "@/store/userStore";
import useEnsureAccessToken from "@/hooks/useEnsureAccessToken";
import { ProtectedRoute, UnprotectedRoute } from "@/components/auth";
import useAuth from "@/hooks/useAuth";

const renderRoutes = ({
  routes,
  isUserFetched,
  isAuthenticated,
}: {
  routes: RouteProps[];
  isUserFetched: boolean;
  isAuthenticated: boolean;
}) => {
  return routes.map((route: RouteProps) => {
    const isProtected = route.protected !== false;
    const Element = route.element;
    const element = isProtected ? (
      isUserFetched || (!isAuthenticated && !isUserFetched) ? (
        <ProtectedRoute
          element={Element ? <Element /> : null}
          allowedRoles={route.allowedRoles}
        />
      ) : null
    ) : !isProtected ? (
      <UnprotectedRoute element={Element ? <Element /> : null} />
    ) : Element ? (
      <Element />
    ) : null;

    return (
      <Route key={route.name} path={route.path} element={element}>
        {route.children &&
          renderRoutes({
            routes: route.children,
            isUserFetched,
            isAuthenticated,
          })}
      </Route>
    );
  });
};

const AppRoutes = () => {
  useEnsureAccessToken();
  useUpdateAxiosInterceptor();
  useAuth();

  const isAccessTokenFetched = useRecoilValue(isAccessTokenFetchedState);
  const isInterceptorInitialized = useRecoilValue(axiosInterceptorState);
  const isUserFetched = useRecoilValue(isUserFetchedState);
  const accessToken = useRecoilValue(accessTokenState);

  if (!isAccessTokenFetched || !isInterceptorInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* {isAccessTokenFetched && isInterceptorInitialized && renderRoutes(routes)} */}
      {renderRoutes({
        routes,
        isUserFetched,
        isAuthenticated: !!accessToken,
      })}
    </Routes>
  );
};

export default AppRoutes;
