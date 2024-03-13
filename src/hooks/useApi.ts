import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import ApiError from "@/utils/apiError";

function useApi() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleApiRequest<T>(
    request: () => Promise<AxiosResponse<T>>
  ): Promise<[T | null, ApiError | null]> {
    setIsLoading(true);
    try {
      const response = await request();
      setIsLoading(false);
      return [response.data, null];
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        console.log("Something went wrong: ", error.response?.data);
        const apiError = new ApiError(
          error.message,
          error.response?.status,
          error.response?.data
        );
        return [null, apiError];
      } else {
        console.log("An unexpected error occured: ", error);
        return [null, null];
      }
    }
  }
  return { handleApiRequest, isLoading };
}

export default useApi;
