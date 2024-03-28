import CP from "@/components";
import Button from "@/components/button";
import Modal from "@/components/modal";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";

const CreateEmployee = () => {
  const [openModal, setOpenModal] = useState(true);
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    privilege: "",
  });

  const handleInputChange = (fieldName, value) => {
    setInputData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
    setOpenModal(true);
  };

  const handleSubmit = () => {
    // Handle form submission here
    
    // Clear input data
    setInputData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      privilege: "",
    });
    // Close modal after form submission
    handleCloseModal();
  };

  const handleCancel = () => {
    // Clear input data
    setInputData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      privilege: "",
    });
    // Close modal on cancel
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Check if any input field has non-empty value
  const shouldModalStayOpen = Object.values(inputData).some(
    (value) => value !== ""
  );

  return (
    <>
      <Modal open={openModal || shouldModalStayOpen} onClose={handleCloseModal}>
        <FormControl>
          <CP.Typography>Create Employee</CP.Typography>
          <CP.Styled.Flex gap="16px" padding="1rem 0 0 0">
            <CP.Input
              label="First Name"
              value={inputData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
            <CP.Input
              label="Last Name"
              value={inputData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
          </CP.Styled.Flex>

          <CP.Styled.Flex direction="column" padding="1rem 0 0 0" gap="1rem">
            <CP.Input
              label="Email"
              value={inputData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <CP.Input
              label="Phone"
              value={inputData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </CP.Styled.Flex>

          <CP.Styled.Flex gap="16px" padding="1rem 0 0 0">
            <CP.Input
              label="Position"
              value={inputData.position}
              onChange={(e) => handleInputChange("position", e.target.value)}
            />
            <CP.Input
              label="Privilege"
              value={inputData.privilege}
              onChange={(e) => handleInputChange("privilege", e.target.value)}
            />
          </CP.Styled.Flex>

          <CP.Styled.Flex justify="flex-end" gap="8px" padding="1rem 0">
            <Button onClick={handleSubmit}>create</Button>
            <Button onClick={handleCancel}>cancel</Button>
          </CP.Styled.Flex>
        </FormControl>
      </Modal>
    </>
  );
};

export default CreateEmployee;
