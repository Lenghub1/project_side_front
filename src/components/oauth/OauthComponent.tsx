import { Box } from "@mui/material";
import styled from "styled-components";
import CP from "..";
import TelegramLoginButton from "./TelegramLoginButton";

interface OauthProps {
  src: string;
  alt: string;
  click?: () => void;
}
const baseUrl = import.meta.env.VITE_BASE_URL_DEV;
const facebookObject: OauthProps = {
  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png",
  alt: "google image",
  click: function () {
    window.location.href = `${baseUrl}/auth/facebook`;
  },
};

const googleObject: OauthProps = {
  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png",
  alt: "google image",
  click: function () {
    window.location.href = `${baseUrl}/auth/google`;
  },
};

const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;
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
  return (
    <Flex width="100%" gap="40px" margin={margin || "1rem 0"}>
      <OauthBox
        src={facebookObject.src}
        alt={facebookObject.alt}
        click={facebookObject.click}
      />

      <OauthBox
        src={googleObject.src}
        alt={googleObject.alt}
        click={googleObject.click}
      />
      <TelegramLoginButton />
    </Flex>
  );
};

export default OuauthComponent;
