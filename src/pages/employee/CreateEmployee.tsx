import CP from "@/components";
import Container from "@mui/material/Container";

const CreateEmployee = () => {
  return (
    <Container>
      <CP.Styled.Div>
        <CP.Typography>Create Employee</CP.Typography>
        <CP.Styled.Flex>
          <CP.Input label="First Name" />
          <CP.Input label="Last Name" />
        </CP.Styled.Flex>
        <CP.Styled.Flex>
          <CP.Input label="Email" />
          <CP.Input label="Phone" />
        </CP.Styled.Flex>
        <CP.Styled.Flex>
          <CP.Input label="Position" />
          <CP.Input label="Privilege" />
        </CP.Styled.Flex>
      </CP.Styled.Div>
      <CP.Styled.Div></CP.Styled.Div>
    </Container>
  );
};

export default CreateEmployee;
