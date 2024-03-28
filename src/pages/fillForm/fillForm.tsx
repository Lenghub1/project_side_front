import React, { useState } from "react";
import { TextField, Button, Grid, Container, MenuItem } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import CP from "@/components";
import { handleApiRequest } from "@/api";
import { patchUser } from "@/api/user";
import { userState } from "@/store/userStore";
import { useRecoilValue } from "recoil";
const FillForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const user = useRecoilValue(userState);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
  });

  const roles = ["Super admin", "Admin", "Employee"]; // Array of roles
  const userPatch = async () => {
    const [response, error] = await handleApiRequest(() =>
      patchUser(user.id, formData)
    );

    if (error) {
      const errorMessage = enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1500,
      });
      return { error, errorMessage };
    }
    enqueueSnackbar("successfully Update Your Personal Information", {
      variant: "success",
      autoHideDuration: 1500,
    });
    setFormData({
      firstName: "",
      lastName: "",
      role: "",
    });
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate form data
    if (formData.firstName.trim() === "") {
      enqueueSnackbar("Please enter your first name", {
        variant: "error",
        autoHideDuration: 1500,
      });
      return;
    }
    if (formData.lastName.trim() === "") {
      enqueueSnackbar("Please enter your last name", {
        variant: "error",
        autoHideDuration: 1500,
      });
      return;
    }
    if (formData.role === "") {
      enqueueSnackbar("Please select a role", {
        variant: "error",
        autoHideDuration: 1500,
      });
      return;
    }

    userPatch();

    navigate("/login/choose-organization");
  };

  return (
    <Container style={{ width: "768px" }}>
      <CP.Styled.Div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CP.Styled.Flex>
              <CP.Typography variant="h5">PERSONAL information</CP.Typography>
            </CP.Styled.Flex>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              placeholder="Enter your first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              placeholder="Enter your last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select // Change to select input
              label="Role"
              variant="outlined"
              placeholder="Select role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </CP.Styled.Div>
    </Container>
  );
};

export default FillForm;
