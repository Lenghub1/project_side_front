import { styled } from "styled-components";

import { ReactNodeProps } from "@/@type/common";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { useIsMobile } from "@/utils/isMobile";
import GlobalStyles from "@/styles/globalStyle";
const Container = styled.div`
  height: 100svh;
`;
const BodyWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const Body = styled.div`
  flex-grow: 1;
  width: 100%;
  height: 100%;
`;

const Template = ({ children }: ReactNodeProps) => {
  const isMobile = useIsMobile();
  return (
    <Container>
      <TopBar />
      <GlobalStyles />
      <BodyWrapper>
        {!isMobile && <SideBar />}
        <Body>{children}</Body>
      </BodyWrapper>
    </Container>
  );
};

export default Template;
