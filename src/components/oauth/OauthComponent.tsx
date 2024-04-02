import { Box } from "@mui/material";
import styled from "styled-components";
import CP from "..";
import TelegramLoginButton from "./TelegramLoginButton";
import FacebookLoginButton from "./FacebookLoginButton";
import { authApi } from "@/api/auth";
import { oauthErrorState } from "@/store/error";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

interface OauthProps {
  src: string;
  alt: string;
  click?: () => void;
}
const baseUrl = import.meta.env.VITE_BASE_URL;

const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const googleObject: OauthProps = {
  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png",
  alt: "google image",
  click: function () {
    window.location.href = `${baseUrl}/auth/google`;
  },
};

export const OauthBox = ({ src, alt, click }: OauthProps) => {
  return (
    <Box
      component="img"
      sx={{
        height: 40,
        width: 40,
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
        cursor: "pointer",
      }}
      alt={alt}
      src={src}
      onClick={click}
    />
  );
};

const OuauthComponent = ({ margin }: { margin?: string }) => {
  const { enqueueSnackbar } = useSnackbar();
  function showMessage(message: string, variant: "error" | "success") {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
    });
  }
  const handleTelegramData = async (user: any) => {
    await authApi
      .telegramOauth(user)
      .then((res) => {
        if (res.status === 200) {
          window.location.href = res.data.url;
        }
      })
      .catch(() => {
        showMessage("Authorization failed", "error");
      });
  };
  return (
    <Flex width="100%" gap="40px" margin={margin || "1rem 0"}>
      <FacebookLoginButton appId={import.meta.env.VITE_FACEBOOK_APP_ID} />

      <OauthBox
        src={googleObject.src}
        alt={googleObject.alt}
        click={googleObject.click}
      />

      <TelegramLoginButton
        onAuthCallback={handleTelegramData}
        botUsername="riem_app_bot"
      />
    </Flex>
  );
};

export default OuauthComponent;
