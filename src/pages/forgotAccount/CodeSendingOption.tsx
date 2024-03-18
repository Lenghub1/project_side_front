import { useNavigate } from "react-router-dom";
import CP from "@/components";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { SyntheticEvent } from "react";
import { useSnackbar } from "notistack";
import { authApi } from "@/api/auth";
import { handleApiRequest } from "@/api";
import Store from "@/store";
import { useRecoilValue } from "recoil";
const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const CodeSendingOption = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 428);
  const option = useRecoilValue(Store.User.condeSendingOption);
  console.log("###", option);

  const [data, setData] = useState({
    id: "",
    codeSendingMethod: "",
  });

  useEffect(() => {
    if (!option) {
      console.log("Option", option);
      navigate("/forgot-account");
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 428);
    };
    console.log("Window size", window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleRadioChange = (e: string) => {
    const [index, key] = e.split("-");
    setData({
      id: option[0].id,
      codeSendingMethod: key,
    });
    console.log("Data", data);
  };

  function showMessage(message: string, variant: "error" | "success") {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "bottom", // or 'bottom'
        horizontal: "left", // or 'left', 'center'
      },
    });
  }

  async function sendVerify(data: any): Promise<void> {
    const [response, error] = await handleApiRequest(() =>
      authApi.forgotAccountVerification(data)
    );

    if (error) {
      showMessage(
        `No results were found. Please check your ${
          data.codeSendingMethod === "phone" ? "phone number" : "email"
        } and try again.`,
        "error"
      );
      return;
    }
    console.log("Result", response);
    return;
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log("Data", data);
    await sendVerify(data);
  };

  console.log("Options", option);
  const radioList = option.slice(1).flatMap((item, index) =>
    Object.keys(item).map((key) => ({
      label: `By ${key}`,
      value: `${index + 1}-${key}`,
    }))
  );

  console.log("radioList", radioList);

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
              <CP.Radio
                list={radioList}
                value={data.codeSendingMethod}
                onChange={handleRadioChange}
              />
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
