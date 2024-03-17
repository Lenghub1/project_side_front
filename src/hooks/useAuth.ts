import { useRecoilValue, useRecoilState } from "recoil";
import { userState, accessTokenState } from "@/store/userStore";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { authApi } from "@/api/auth";
import { handleApiRequest } from "@/api";

interface CustomJwtPayload {
  userId?: string;
}

const useAuth = () => {
  const accessToken = useRecoilValue(accessTokenState);
  const [user, setUser] = useRecoilState(userState);

  console.log("use Auth is running", user);

  async function getUserInfo(id: string) {
    const [response, error] = await handleApiRequest(() => authApi.getUser(id));
    if (response) {
      setUser(response.data);
    } else if (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (accessToken) {
        const decoded = jwtDecode<CustomJwtPayload>(accessToken);
        const { userId } = decoded;

        if (userId) await getUserInfo(userId);
      }
    };

    fetchUserInfo();
  }, [accessToken]);

  return {
    isAuthenticated: !!accessToken,
    userRole: user?.firstName,
  };
};

export default useAuth;
