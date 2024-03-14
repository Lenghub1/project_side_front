import CP from "@/components";
import Container from "@mui/material/Container";
import Modal from "@/components/modal";

const CreateEmployee = () => {
  return (
    <Modal open=false>
      <CP.Styled.Div>
        <CP.Typography>Create Employee</CP.Typography>
        <CP.Styled.Flex gap="16px">
          <CP.Input label="First Name" />
          <CP.Input label="Last Name" />
        </CP.Styled.Flex>
        <CP.Styled.Flex gap="16px">
          <CP.Input label="Email" />
          <CP.Input label="Phone" />
        </CP.Styled.Flex>
        <CP.Styled.Flex gap="16px">
          <CP.Input label="Position" />
          <CP.Input label="Privilege" />
        </CP.Styled.Flex>
      </CP.Styled.Div>
      <CP.Styled.Div></CP.Styled.Div>
    </Modal>
  );
};

export default CreateEmployee;
