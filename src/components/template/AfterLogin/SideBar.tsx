import { styled } from "styled-components";

const Container = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 20%;
  max-width: 200px;
  min-width: 80px;
`;

const SideBar = () => {
  return (
    <Container>
      <h3>Side Bar</h3>
    </Container>
  );
};

export default SideBar;
