import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { accessTokenState, axiosInterceptorState } from "@/store/userStore";
import { api } from "@/api";
import { refreshAccessToken } from "@/utils/authUtils";
import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

interface ErrorResponseData {
  message?: string;
}

/**
 * Interceptor is like some sort of checkpoint or filter for HTTP requests
 * and responses. When we make request to a server, the request interceptor
 * can modify this request before it is sent. e.g. by adding authorization
 * headers, log the requests, or add additional data
 * SOURCE: https://stackoverflow.com/a/52737325
 */

const useUpdateAxiosInterceptor = () => {
  const [accessToken, setAccessToken] = useRecoilState<string | null>(
    accessTokenState
  );
  const setInterceptorInitialized = useSetRecoilState(axiosInterceptorState);

  console.log("Setting axios");

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      /**
       * config inside interceptors has a different interface
       * SOURCE: https://github.com/axios/axios/issues/5494#issuecomment-1402663237
       */
      (config: InternalAxiosRequestConfig) => {
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError<ErrorResponseData>) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;
        originalRequest.headers = originalRequest.headers || {};

        const refreshableErrors = [
          "You are not logged in! Please login to get access.",
          "Session expired! Please log in again.",
          "Invalid token.",
        ];

        const errorStatus = error.response?.status;
        const errorMessage = error.response?.data?.message;

        if (
          (errorStatus === 401 || errorStatus === 403) &&
          !originalRequest._retry &&
          errorMessage &&
          refreshableErrors.includes(errorMessage)
        ) {
          originalRequest._retry = true;
          const newAccessToken = await refreshAccessToken(setAccessToken);
          if (newAccessToken) {
            // re-set authorization header and retry the original request
            originalRequest.headers["Authorization"] =
              `Bearer ${newAccessToken}`;
            return api(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    setInterceptorInitialized(true);
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]);

  console.log("Setting up axios completed");
  return null;
};

export default useUpdateAxiosInterceptor;
