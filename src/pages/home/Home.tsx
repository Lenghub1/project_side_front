import { useRecoilValue } from "recoil";

import CP from "@/components";
import Store from "@/store";
import AfterLoginTemplate from "@/components/template/AfterLogin";

const HomePage = () => {
  const campus = useRecoilValue(Store.User.campusState);

  return (
    <AfterLoginTemplate>
      <CP.Styled.Wrapper>
        <h2>Body</h2>
        <h4>Main</h4>
        <h5>campus name : {campus && campus.name ? campus.name : "none"}</h5>
      </CP.Styled.Wrapper>
    </AfterLoginTemplate>
  );
};

export default HomePage;
