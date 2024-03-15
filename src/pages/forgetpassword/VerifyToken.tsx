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

  const [_, setAccessToken] = useRecoilState(Store.User.accessTokenState);
  function showMessage(message: string, variant: "error" | "success") {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "bottom", // or 'bottom'
        horizontal: "left", // or 'left', 'center'
      },
    });
  }
  const verifyForgetPasswordToken = useCallback(
    async (token: string): Promise<void> => {
      const [response, error] = await handleApiRequest(() =>
        authApi.verifyForgetPasswordToken(token)
      );

      if (error) {
        showMessage("Token is invalid. Please try agian", "error");
        setTimeout(() => {
          naviagate("/reset-password");
        }, 2000);
      }

      if (response?.data?.user) {
        console.log("@@@ MY TOKEN @@", paramsElement.token);

        setAccessToken(paramsElement.token);
        showMessage("Token is verified", "success");
        naviagate("/reset-password");
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
