import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CP from "@/components";
import Store from "@/store";
import { useRecoilState } from "recoil";
import { authApi } from "@/api/auth";
import { VERIFICAITON_TYPE } from "./OTP";
import { useSnackbar } from "notistack";
import useApi from "@/hooks/useApi";

interface ElementType {
  token: string;
  verificationType?: string;
}

const VerifyToken = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [_, setAccessToken] = useRecoilState(Store.User.accessTokenState);
  const [__, setResetPasswordToken] = useRecoilState(
    Store.User.resetPasswordToken
  );
  const [params, setParams] = useState<ElementType>({
    token: "",
    verificationType: "",
  });
  function showMessage(message: string, variant: "error" | "success") {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "bottom", // or 'bottom'
        horizontal: "left", // or 'left', 'center'
      },
    });
  }
  const { response, isError, isSuccess, handleApiRequest } = useApi();

  const verifyForgetPasswordToken = useCallback(
    async (token: any): Promise<void> => {
      await handleApiRequest(() => authApi.verifyForgetPasswordToken(token));
    },
    []
  );

  const verifyEmail = useCallback(
    async (token: any): Promise<void> => {
      await handleApiRequest(() => authApi.verifyEmail(token));
    },
    [params]
  );

  useEffect(() => {
    if (!params.token && !params.verificationType) {
      const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
      const paramElement = Object.fromEntries(urlParams.entries());

      if (paramElement.token && paramElement.type) {
        setParams({
          token: paramElement.token,
          verificationType: paramElement.type,
        });
      }
    }
  }, [params]);

  useEffect(() => {
    if (params.token && params.verificationType) {
      if (
        params.verificationType === VERIFICAITON_TYPE.VERIFY_FORGET_PASSWORD
      ) {
        verifyForgetPasswordToken({ resetToken: params.token });
      } else if (params.verificationType === VERIFICAITON_TYPE.VERIFY_ACCOUNT) {
        verifyEmail({ resetToken: params.token });
      }
    }
  }, [params]);

  useEffect(() => {
    if (isSuccess) {
      showMessage("Token has been successfully verified", "success");
      if (
        params.verificationType === VERIFICAITON_TYPE.VERIFY_FORGET_PASSWORD
      ) {
        setResetPasswordToken(true);
        setTimeout(() => {
          navigate("/forget-password/reset-password");
        });
      } else if (params.verificationType === VERIFICAITON_TYPE.VERIFY_ACCOUNT) {
        navigate("/");
      }
    }
  }, [isSuccess, response]);

  useEffect(() => {
    if (isError && !isSuccess && params.token) {
      showMessage("Token is in valid", "error");
    }
  }, [isError, params]);

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
