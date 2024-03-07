import { ReactNodeProps } from "@/@type/common";
import Auth from "@/components/auth";
import { styled } from "styled-components";

const Template = ({ children }: ReactNodeProps) => {
  return (
    <Auth>
      <Container>{children}</Container>
    </Auth>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export default Template;
