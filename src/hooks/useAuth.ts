import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { authApi } from "@/api/auth";
import { handleApiRequest } from "@/api";

import {
  userState,
  accessTokenState,
  isUserFetchedState,
} from "@/store/userStore";
import { resetPasswordToken } from "@/store/userStore";
interface CustomJwtPayload {
  userId?: string;
}

const useAuth = () => {
  const accessToken = useRecoilValue(accessTokenState);
  const setUser = useSetRecoilState(userState);
  const setIsUserFetched = useSetRecoilState(isUserFetchedState);

  async function getUserInfo(id: string) {
    const [response, error] = await handleApiRequest(() => authApi.getUser(id));
    if (response) {
      setUser(response.data);
    } else if (error) {
      console.log(error.message);
    }
    setIsUserFetched(true);
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (accessToken) {
        const decoded = jwtDecode<CustomJwtPayload>(accessToken);
        const { userId } = decoded;

        if (userId) {
          await getUserInfo(userId);
        }
      }
    };

    fetchUserInfo();
  }, [accessToken, setUser, setIsUserFetched]);
};

export default useAuth;
