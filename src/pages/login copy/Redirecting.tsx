import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CP from "@/components";
import Store from "@/store";
import { useRecoilState, useRecoilValue } from "recoil";

const RedirectingPage = () => {
  const navigate = useNavigate();
  const [__, setAccessToken] = useRecoilState(Store.User.accessTokenState);
  const accountType = useRecoilValue(Store.SignUp.accountTypeState);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split("?")[1]);
    const paramsElement = Object.fromEntries(params.entries());

    localStorage.setItem("token", paramsElement.token);
    localStorage.setItem("id", paramsElement.id);
    setLoginUser({ token: paramsElement.token, userId: paramsElement.id });

    setTimeout(() => {
      if (accountType) {
        if (accountType === "employee") {
          navigate("/get-started/employee-info");
        } else {
          navigate("/get");
        }
      }
    }, 2000);
  }, [navigate]);

  return (
    <CP.Styled.Flex height="100vh" direction="column">
      <Box sx={{ display: "flex", height: "inheriten" }}>
        <CircularProgress color="success" />
      </Box>
    </CP.Styled.Flex>
  );
};

export default RedirectingPage;
