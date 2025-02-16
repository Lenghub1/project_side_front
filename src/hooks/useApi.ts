import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import ApiError from "@/utils/apiError";

type UseApiReturnType<T> = {
  response: ApiResponse | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: ApiError | null;
  handleApiRequest: (request: () => Promise<AxiosResponse<T>>) => Promise<void>;
  resetState: () => void;
};

interface ApiResponse {
  status_code: number;
  message: string;
  dev_message: string;
  query?: {
    where?: string;
    where_value?: string;
    order_by?: string;
    desc?: boolean;
    group_by?: string;
  };
  pagination?: {
    page: number;
    perpage: number;
    total_pages: number;
  };
  data: any[] | any;
  errors?: Object[];
}

function useApi<T>(): UseApiReturnType<T> {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  async function handleApiRequest(
    request: () => Promise<AxiosResponse<T>>
  ): Promise<void> {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    try {
      const response = await request();
      setIsSuccess(true);
      setResponse(response.data as ApiResponse);
    } catch (error) {
      setIsError(true);
      if (axios.isAxiosError(error)) {
        console.log("Something went wrong: ", error.response?.data);
        const apiError = new ApiError(
          error.response?.data?.message,
          error.response?.status,
          error.response?.data
        );

        setError(apiError);
      } else {
        console.log("An unexpected error occurred: ", error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function resetState() {
    setResponse(null);
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
    setError(null);
  }

  return {
    response,
    isLoading,
    isSuccess,
    isError,
    error,
    handleApiRequest,
    resetState,
  };
}

export default useApi;
