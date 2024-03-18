import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CP from "@/components";
import { useParams } from "react-router-dom";
import Store from "@/store";
import { useRecoilValue } from "recoil";

export default function DetailInformation() {
  const { id } = useParams();

  const data = useRecoilValue(Store.User.forgotAccountInformation);
  return (
    <CP.Styled.Flex
      width="100%"
      height="100vh"
      justify="center"
      align-items="start"
      direction="column"
    >
      <Typography variant="h4" marginBottom="1rem">
        Find Your Account
      </Typography>
      <Typography variant="body1" align="start">
        {`The credential account for ${data[id].firstName} ${data[id].lastName} is ${data[0].email ? data[0].email : data[0].email} `}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginTop: "1rem" }}
      >
        Login
      </Button>
    </CP.Styled.Flex>
  );
}
