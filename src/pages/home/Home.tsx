import { useRecoilValue } from "recoil";
import { useRecoilValue } from "recoil";
import CP from "@/components";
import AfterLoginTemplate from "@/components/template/AfterLogin";
import Organization from "../organization/Organization";

const HomePage = () => {
  const user = useRecoilValue(Store.User.userState);
  console.log(user);
  const user = useRecoilValue(Store.User.userState);
  console.log(user);

  return (
    <AfterLoginTemplate>
      <CP.Styled.Wrapper>
        <Organization />
      </CP.Styled.Wrapper>
    </AfterLoginTemplate>
  );
};

export default HomePage;
