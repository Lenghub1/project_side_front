import { Avatar } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import Store from "@/store";

const Container = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;
const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Wrapper = styled.div`
  display: flex;
`;

const TopBar = () => {
  const [loginUser, setLoginUser] = useRecoilState(Store.User.loginUserState);

  const logout = () => {
    setLoginUser(null);
  };

  return (
    <Container>
      <Wrapper>
        <h3>Top Bar</h3>
      </Wrapper>

      <AvatarWrapper>
        <Avatar
          alt="Cindy Baker"
          src="/static/images/avatar/3.jpg"
          sx={{ width: 30, height: 30 }}
        />
        <ExitToAppIcon
          onClick={logout}
          sx={{ fontSize: "30px", cursor: "pointer" }}
          style={{ color: "grey" }}
        />
      </AvatarWrapper>
    </Container>
  );
};

export default TopBar;
