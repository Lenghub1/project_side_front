import useApi from "./useApi";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState, accessTokenState } from "@/store/userStore";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { authApi } from "@/api/auth";

interface CustomJwtPayload {
  userId?: string;
}

const useAuth = () => {
  const accessToken = useRecoilValue(accessTokenState);
  const { response, error, handleApiRequest } = useApi();
  const [user, setUser] = useRecoilState(userState);

  console.log("use Auth is running");

  async function getUserInfo(id: string) {
    await handleApiRequest(() => authApi.getUser(id));
  }

  useEffect(() => {
    if (response) {
      console.log(response);
    } else if (error) {
      console.log(error);
    }
  }, [response, error]);

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
};

export default useAuth;
