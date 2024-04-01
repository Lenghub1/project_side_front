import { useEffect, useState } from "react";
import { TextField, Button, Grid, Container, MenuItem } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import CP from "@/components";
import { patchUser } from "@/api/user";
import { userState } from "@/store/userStore";
import { useRecoilState } from "recoil";
import useApi from "@/hooks/useApi";

const FillForm = () => {
  const navigate = useNavigate();
  const { isSuccess, isError, error, handleApiRequest } = useApi();

  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useRecoilState(userState);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
  });

  const roles = ["Super admin", "Admin", "Employee"];
  const userPatch = async () => {
    await handleApiRequest(() => patchUser(user.id, formData));
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("Successfully Update Your Personal Information", {
        variant: "success",
        autoHideDuration: 1500,
      });

      setUser({
        ...user,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      setFormData({
        firstName: "",
        lastName: "",
        role: "",
      });
      navigate("/organization");
    } else if (isError) {
      enqueueSnackbar(error?.message, {
        variant: "error",
        autoHideDuration: 1500,
      });
      console.log(error);
    }
  }, [isSuccess, isError, error]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
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
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CP.Styled.Flex>
              <CP.Typography variant="h5">PERSONAL INFORMATION</CP.Typography>
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
              select
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
      </div>
    </Container>
  );
};

export default FillForm;
