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
  const { handleApiRequest } = useApi();
  const [user, setUser] = useRecoilState(userState);

  console.log("use Auth is running");

  async function getUserInfo(id: string) {
    const [response, error] = await handleApiRequest(() => authApi.getUser(id));
    if (response) {
      console.log(response);
      setUser(response.data);
    } else {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (accessToken && true) {
        const decoded = jwtDecode<CustomJwtPayload>(accessToken);
        const { userId } = decoded;

        if (userId) await getUserInfo(userId);
      }
    };

    fetchUserInfo();
  }, [accessToken]);
};

export default useAuth;
