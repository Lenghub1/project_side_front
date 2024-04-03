import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CP from "@/components";
import Store from "@/store";
import { useRecoilValue, useSetRecoilState } from "recoil";

const RedirectingPage = () => {
  const navigate = useNavigate();
  const accountType = useRecoilValue(Store.SignUp.accountTypeState);
  const setAccessToken = useSetRecoilState(Store.User.accessTokenState);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
    const paramElement = Object.fromEntries(urlParams.entries());

    if (paramElement.token) {
      setAccessToken(paramElement.token);

      setTimeout(() => {
        if (accountType) {
          if (accountType === "employee") {
            navigate("/get-started/employee-info");
          } else {
            navigate("/login");
          }
        } else {
          navigate("/");
        }
      }, 2000);
    }
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
