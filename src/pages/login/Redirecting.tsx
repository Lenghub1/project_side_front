import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CP from "@/components";
import Store from "@/store";
import { useRecoilValue } from "recoil";

const RedirectingPage = () => {
  const navigate = useNavigate();
  const accountType = useRecoilValue(Store.SignUp.accountTypeState);

  useEffect(() => {
    setTimeout(() => {
      if (accountType) {
        if (accountType === "employee") {
          navigate("/get-started/employee-info");
        } else {
          navigate("/login");
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
