import { useEffect, useState } from "react";
import { Button, Grid, Container, MenuItem } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import CP from "@/components";
import { patchUser } from "@/api/user";
import { userState } from "@/store/userStore";
import { useRecoilState, useResetRecoilState } from "recoil";
import useApi from "@/hooks/useApi";
import Loading from "@/components/loading/Loading";
import { employeeRegister } from "@/store/organizationStore";
import { authApi } from "@/api/auth";
import { validateName } from "../signup/Signup";
import useValidatedInput from "@/hooks/useValidatedInput";
import { Error } from "@/pages/error";
const FillForm = () => {
  const navigate = useNavigate();
  const { isSuccess, isError, error, handleApiRequest, isLoading } = useApi();
  const registerEmployee = useRecoilState(employeeRegister);
  const resetRegisterState = useResetRecoilState(employeeRegister);

  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useRecoilState(userState);

  const firstName = useValidatedInput("", "First Name", validateName);
  const lastName = useValidatedInput("", "Last Name", validateName);
  const roles = ["Super admin", "Admin", "Employee"];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const userPatch = async () => {
    await handleApiRequest(() => patchUser(user.id, formData));
    if (registerEmployee) {
      await handleApiRequest(() =>
        authApi.signupAsEmployee({
          orgId: registerEmployee[0].id,
          ownerId: registerEmployee[0].ownerId,
          userId: user.id,
          socialId: user.socialId,
        })
      );
    }
  };
  useEffect(() => {
    setFormData({ firstName: firstName.value, lastName: lastName.value });
  }, [firstName.value, lastName.value]);
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

      navigate("/organization");
    } else if (isError) {
      enqueueSnackbar(error?.message, {
        variant: "error",
        autoHideDuration: 1500,
      });
      console.log(error);
    }
  }, [isSuccess, isError, error]);

  const handleSubmit = () => {
    userPatch();
  };

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }
  if (isError && error) {
    return <Error status={error.statusCode!} message={error.message!} />;
  }

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
            <CP.Input
              fullWidth
              label="First Name"
              value={firstName.value}
              onChange={firstName.onChange}
              error={!!firstName.error}
              helperText={<firstName.HelperText />}
            />
          </Grid>
          <Grid item xs={12}>
            <CP.Input
              fullWidth
              label="Last Name"
              value={lastName.value}
              onChange={lastName.onChange}
              error={!!lastName.error}
              helperText={<lastName.HelperText />}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={
                !firstName.value ||
                !lastName.value ||
                !!firstName.error ||
                !!lastName.error
              }
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
