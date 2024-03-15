import { authApi } from "@/api/auth";
import { handleApiRequest } from "@/api";

export async function refreshAccessToken(setAccessToken: Function) {
  const [response, error] = await handleApiRequest(() => authApi.refresh());
  if (response) {
    const { accessToken: newAccessToken } = response.data.user;
    setAccessToken(newAccessToken);
    return newAccessToken;
  } else {
    setAccessToken(null);
    if (
      error?.message !==
      "Unauthorized: Access is denied due to invalid credential. Please login again"
    ) {
      await handleApiRequest(() => authApi.logout());
    }
    return null;
  }
}
