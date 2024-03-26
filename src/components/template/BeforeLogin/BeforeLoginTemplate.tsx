import { ReactNodeProps } from "@/@type/common";
import { styled } from "styled-components";

const Template = ({ children }: ReactNodeProps) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export default Template;
