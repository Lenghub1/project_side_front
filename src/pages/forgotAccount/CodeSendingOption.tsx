import { useNavigate } from "react-router-dom";
import CP from "@/components";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { SyntheticEvent } from "react";
import { useSnackbar } from "notistack";
import { authApi } from "@/api/auth";
import { handleApiRequest } from "@/api";

const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const CodeSendingOption = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 428);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 428);
    };
    console.log("Window size", window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function showError(message: string) {
    enqueueSnackbar(message, {
      variant: "error",
      anchorOrigin: {
        vertical: "bottom", // or 'bottom'
        horizontal: isMobile ? "center" : "left", // or 'left', 'center'
      },
    });
  }

  async function forgetPassword(method: string, data: any): Promise<void> {
    const [response, error] = await handleApiRequest(() =>
      authApi.forgotPassword(method, data)
    );

    if (error) {
      showError(
        `No results were found. Please check your ${
          method === "phone" ? "phone number" : "email"
        } and try again.`
      );
      return;
    }
    console.log("Result", response);
    return;
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    let formData: any = {};

    // if (resetPasswordBy === "email") {
    //   formData = { ...formData, email: email.value };
    //   console.log("Data", formData);
    // } else if (resetPasswordBy === "phone") {
    //   // remove leading 0 from phone number (E.164 format)
    //   const phoneWithoutLeadingZero = phone.value.replace(/^0+/, "");

    //   formData = {
    //     ...formData,
    //     phoneNumber: selectedCountry.dialCode + phoneWithoutLeadingZero,
    //   };
    //   console.log("Data", formData);
    // }

    // await forgetPassword(resetPasswordBy, formData);
  };
  const radioList = [
    { label: "By PhoneNumber", value: "option1" },
    { label: "By Email", value: "option2" },
  ];

  return (
    <CP.Styled.Wrapper height="100vh">
      <Flex height="inherit">
        <CP.Styled.Div
          style={{
            maxWidth: !isMobile ? "565px" : "auto",
            minWidth: isMobile ? "396px" : "565px",
            padding: !isMobile ? "0 1rem" : "0 16px",
          }}
        >
          <Flex
            items="flex-start"
            direction="column"
            style={{
              padding: !isMobile ? "0 3rem" : "0px",
            }}
          >
            <CP.Typography
              variant="h4"
              margin="0 0 2rem"
              style={{
                fontWeight: "semibold",
                textAlign: isMobile ? "center" : "start",
                width: "100%",
              }}
            >
              Find Account
            </CP.Typography>

            <CP.Typography
              style={{
                marginBottom: "2rem",
                fontWeight: "semibold",
                textAlign: isMobile ? "start" : "start",
                width: "100%",
              }}
            >
              Select how to receive th code to find your account.
            </CP.Typography>
            <Flex direction="column" gap="24px" overflow="unset">
              <CP.Radio list={radioList} />
              <Flex width="100%" justify="end" gap="20px">
                <CP.Button variant="text">Cancel</CP.Button>
                <CP.Button type="submit" onClick={handleSubmit}>
                  Receive Code
                </CP.Button>
              </Flex>
            </Flex>
          </Flex>
        </CP.Styled.Div>
        {!isMobile && (
          <CP.Styled.Div height="100%" flex={1}>
            <Flex style={{ height: "100%" }}>
              <Box
                component="img"
                src="/random-unsplash.jpg"
                alt="Random image"
                sx={{
                  width: 1,
                  height: "100vh",
                  objectFit: "cover",
                }}
              />
            </Flex>
          </CP.Styled.Div>
        )}
      </Flex>
    </CP.Styled.Wrapper>
  );
};

export default CodeSendingOption;
