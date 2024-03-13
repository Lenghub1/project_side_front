import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CP from "@/components";
import Store from "@/store";
import { useRecoilState } from "recoil";
import { authApi } from "@/api/auth";
import { handleApiRequest } from "@/api";

const VerifyToken = () => {
  const naviagate = useNavigate();
  const [_, setLoginUser] = useState(Store.User.userState);

  const verifyForgetPasswordToken = useCallback(
    async (token: string): Promise<void> => {
      const [response, error] = await handleApiRequest(() =>
        authApi.verifyForgetPasswordToken(token)
      );

      if (error) {
        console.log("error", error);
        return;
      }

      console.log("Token", response.data.user);
      return;
    },
    []
  );

  let paramsElement: { token?: string } = {};
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split("?")[1]);

    paramsElement = Object.fromEntries(params.entries());
    if (paramsElement?.token) {
      verifyForgetPasswordToken(paramsElement?.token);
      console.log("done");
    }
    console.log("Param Element", paramsElement.token);

    console.log("Param Element", paramsElement);

    // localStorage.setItem("token", paramsElement.token);
    // localStorage.setItem("id", paramsElement.id);
    // setLoginUser({ token: paramsElement.token, id: paramsElement.id });

    // setTimeout(() => {
    //   naviagate("/loginpage");
    // }, 2000);
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
