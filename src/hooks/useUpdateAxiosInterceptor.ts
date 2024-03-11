import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "@/store/userStore";
import { api, handleApiRequest } from "@/api";
import { authApi } from "@/api/auth";

const useUpdateAxiosInterceptor = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  async function refreshAccessToken() {
    const [response, error] = await handleApiRequest(() => authApi.refresh());
    console.log("RESPONSE: ", response);
    console.log("ERROR: ", error);
    if (response) {
      const { accessToken } = response.data.user;
      return accessToken;
    } else if (
      error?.response?.status === 401 &&
      error?.response?.data?.message ===
        "Unauthorized: Access is denied due to invalid credential. Please login again"
    ) {
      console.log("hii");
      setAccessToken(null);
      //   window.location.href = "/test-login";
      await handleApiRequest(() => authApi.logout());
      return;
    } else if (error) {
      console.log("Error refreshing access token: ", error);
      return;
    }
  }

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        console.log("Original Request: ", originalRequest);
        if (
          error.response?.status === 401 &&
          error.response?.message !==
            "Unauthorized: Access is denied due to invalid credential. Please login again" &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          const newAccessToken = await refreshAccessToken();

          if (newAccessToken) {
            setAccessToken(newAccessToken);
            originalRequest.headers["Authorization"] =
              `Bearer ${newAccessToken}`;

            // retry the original request
            return api(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    // remove the interceptor when the accessToken changes
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]);
};

export default useUpdateAxiosInterceptor;
