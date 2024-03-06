import { styled } from "styled-components";

import { ReactNodeProps } from "@/@type/common";
import Auth from "@/components/auth";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

const Container = styled.div`
  height: 100vh;
`;
const BodyWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const Body = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  flex-grow: 1;
`;

const Template = ({ children }: ReactNodeProps) => {
  return (
    <Auth>
      <Container>
        <TopBar />
        <BodyWrapper>
          <SideBar />
          <Body>{children}</Body>
        </BodyWrapper>
      </Container>
    </Auth>
  );
};

export default Template;
