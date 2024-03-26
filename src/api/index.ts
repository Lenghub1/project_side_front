import axios, { AxiosError, AxiosResponse } from "axios";
import ApiError from "@/utils/apiError";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// Create an instance of axios with custom configuration
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000/api/v1",
  timeout: 3000,
  withCredentials: true, // include cookies in the request
});

// logging request for debugging purposes
api.interceptors.request.use((request) => {
  console.log("Starting Request", JSON.stringify(request, null, 2));
  return request;
});

export async function handleApiRequest<T>(
  request: () => Promise<AxiosResponse<T>>
): Promise<[T | null, ApiError | null]> {
  try {
    const response = await request();
    return [response.data, null];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Something went wrong: ", error.response?.data);
      const apiError = new ApiError(
        error.response?.data?.message,
        error.response?.status,
        error.response?.data
      );
      return [null, apiError];
    } else {
      console.log("An unexpected error occurred: ", error);
      return [null, null];
    }
  }
}
