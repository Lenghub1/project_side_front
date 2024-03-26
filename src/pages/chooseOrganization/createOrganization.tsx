import React, { useState } from "react";
import { Modal, TextField, Button } from "@mui/material"; // Import necessary components from Material-UI
import CP from "@/components";
import { newOrganization } from "@/api/organization";
import { handleApiRequest } from "@/api";

interface CreateOrganizationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (organizationName: string) => void;
}

const CreateOrganizationModal: React.FC<CreateOrganizationModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [organizationName, setOrganizationName] = useState("");
  const [data, setData] = useState<any>({ name: "" });

  const createOrganization = async () => {
    const [response, error] = await handleApiRequest(() =>
      newOrganization(data)
    );
    if (error) {
      throw error;
    } else {
      setData({ name: "" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setOrganizationName(value);
    setData({ name: value }); // Update data.name as well
  };

  const handleSubmit = () => {
    onSubmit(organizationName);
    setOrganizationName("");
    if (organizationName) {
      createOrganization();
    }
    // Clear the input field after submission
  };

  const handleCancel = () => {
    onClose();
    setOrganizationName("");
    setData({ name: "" }); // Clear the input field and data
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CP.Styled.Div
        width="40%"
        style={{
          outline: "none",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.15)",
          padding: "20px",
        }}
      >
        <TextField
          label="Organization Name"
          value={organizationName}
          onChange={handleChange} // Update to handleChange function
          fullWidth
          margin="normal"
        />
        <CP.Styled.Div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <CP.Styled.Flex gap="20px" justify="flex-end">
            <Button variant="text" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Create
            </Button>
          </CP.Styled.Flex>
        </CP.Styled.Div>
      </CP.Styled.Div>
    </Modal>
  );
};

export default CreateOrganizationModal;
