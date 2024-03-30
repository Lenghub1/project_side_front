import { useEffect, useState } from "react";
import { TextField, Button, Grid, Container, MenuItem } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import CP from "@/components";
import { patchUser } from "@/api/user";
import { userState } from "@/store/userStore";
import { useRecoilState } from "recoil";
import useApi from "@/hooks/useApi";

const CheckStatus = () => {
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
      navigate("/login/choose-organization");
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
        maxWidth: "768px",
      }}
    >
      <CP.Styled.Flex direction="column" gap="20px" overflow="auto">
        <CP.Typography variant="h5">Pending Approval</CP.Typography>
        <CP.Typography maxWidth={"500px"}>
          Thank you for requesting to join EMCAST! Your request is currently
          under review. We appreciate your patience and will notify you at the
          contact information you provided once a decision has been made.
        </CP.Typography>
        <img
          style={{ width: "300px", height: "300px" }}
          src="/waiting.svg"
        ></img>
        <CP.Styled.Flex gap="20px">
          <CP.Button variant="text">Cancel Request</CP.Button>
          <CP.Button>HomePage</CP.Button>
        </CP.Styled.Flex>
      </CP.Styled.Flex>
    </Container>
  );
};

export default CheckStatus;
