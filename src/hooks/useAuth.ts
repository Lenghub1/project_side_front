import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { authApi } from "@/api/auth";
import { handleApiRequest } from "@/api";
import {
  userState,
  accessTokenState,
  isUserFetchedState,
} from "@/store/userStore";
import { selectedOrganization } from "@/store/userStore";
interface CustomJwtPayload {
  userId?: string;
}

const useAuth = () => {
  const accessToken = useRecoilValue(accessTokenState);
  const [user, setUser] = useRecoilState(userState);
  const setIsUserFetched = useSetRecoilState(isUserFetchedState);
  const selected = useRecoilValue(selectedOrganization);

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
    setIsUserFetched(true);
  }, [accessToken, setUser, setIsUserFetched]);

  return {
    selected: !!selected,
    isAuthenticated: !!accessToken,
    userRole: user?.firstName,
  };
};

export default useAuth;
