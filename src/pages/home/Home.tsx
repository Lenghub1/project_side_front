import { useRecoilValue, useSetRecoilState } from "recoil";

import CP from "@/components";
// import Store from "@/store";
import { authApi } from "@/api/auth";
import { handleApiRequest } from "@/api";
import { accessTokenState } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
// import AfterLoginTemplate from "@/components/template/AfterLogin";

const HomePage = () => {
  //   const campus = useRecoilValue(Store.User.campusState);
  const navigate = useNavigate();
  const setAccessToken = useSetRecoilState(accessTokenState);
  async function handleSignout() {
    const [response, error] = await handleApiRequest(() => authApi.logout());

    if (error) {
      console.log(error);
    } else {
      console.log("Logout successfully.");
      setAccessToken(null);
      navigate("/test-login");
    }
  }

  return (
    // <AfterLoginTemplate>
    <CP.Styled.Wrapper>
      <h2>Body</h2>
      <h4>Main</h4>
      <CP.Button onClick={handleSignout}>Logout</CP.Button>
      {/* <h5>campus name : {campus && campus.name ? campus.name : "none"}</h5> */}
    </CP.Styled.Wrapper>
    // </AfterLoginTemplate>
  );
};

export default HomePage;
