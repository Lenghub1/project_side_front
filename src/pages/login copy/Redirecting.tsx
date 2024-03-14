import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CP from "@/components";
import Store from "@/store";
import { useRecoilState } from "recoil";

const RedirectingPage = () => {
  const naviagate = useNavigate();
  const [_, setLoginUser] = useState(Store.User.userState);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split("?")[1]);

    const paramsElement = Object.fromEntries(params.entries());

    localStorage.setItem("token", paramsElement.token);
    localStorage.setItem("id", paramsElement.id);
    setLoginUser({ token: paramsElement.token, id: paramsElement.id });

    setTimeout(() => {
      naviagate("/loginpage");
    }, 2000);
  }, [naviagate]);

  return (
    <CP.Styled.Flex height="100vh" direction="column">
      <Box sx={{ display: "flex", height: "inheriten" }}>
        <CircularProgress color="success" />
      </Box>
    </CP.Styled.Flex>
  );
};

export default RedirectingPage;
