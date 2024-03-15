import { authApi } from "@/api/auth";
import axios from "axios";
import { Box } from "@mui/material";

export default function GoogleLoginButton() {
  const handleGoogleOauth = async () => {
    console.log(`${import.meta.env.VITE_BASE_URL_DEV}/auth/google`);
    window.location.href = `${import.meta.env.VITE_BASE_URL_DEV}/auth/google`;
  };
  return (
    <Box
      onClick={handleGoogleOauth}
      component="img"
      sx={{
        height: 40,
        width: 40,
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
        cursor: "pointer",
      }}
      alt="Image for telegram"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
    />
  );
}
