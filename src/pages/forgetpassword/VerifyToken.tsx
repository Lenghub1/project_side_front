import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CP from "@/components";
import Store from "@/store";
import { useRecoilState } from "recoil";
import { authApi } from "@/api/auth";
import { handleApiRequest } from "@/api";
import { useSnackbar } from "notistack";

const VerifyToken = () => {
  const naviagate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [_, setLoginUser] = useState(Store.User.userState);
  function showError(message: string) {
    enqueueSnackbar(message, {
      variant: "error",
      anchorOrigin: {
        vertical: "bottom", // or 'bottom'
        horizontal: "center", // or 'left', 'center'
      },
    });
  }
  const verifyForgetPasswordToken = useCallback(
    async (token: string): Promise<void> => {
      const [response, error] = await handleApiRequest(() =>
        authApi.verifyForgetPasswordToken(token)
      );

      if (error) {
        showError("Token is invalid. Please try agian");
        setTimeout(() => {
          naviagate("/forgetpassword");
        }, 2000);
      }

      console.log("Token", response.data.user);
      if (response?.data?.user) {
        naviagate("/resetpassword");
      }
    },
    []
  );

  let paramsElement: { token?: string } = {};
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split("?")[1]);

    paramsElement = Object.fromEntries(params.entries());
    if (paramsElement?.token) {
      verifyForgetPasswordToken(paramsElement?.token);
    }
  }, []);

  return (
    <CP.Styled.Flex height="100vh" direction="column">
      <Box sx={{ display: "flex", height: "inheriten" }}>
        <CircularProgress color="success" />
      </Box>
      <CP.Typography marginTop={1} variant="h5">
        Verifying
      </CP.Typography>
    </CP.Styled.Flex>
  );
};

export default VerifyToken;
