import Store from "@/store";
import { useRecoilState } from "recoil";
import { Box } from "@mui/material";
import { useState } from "react";

export default function FacebookLoginButton() {
  const handleFacebookOauth = async () => {
    window.location.href = `${import.meta.env.VITE_BASE_URL_DEV}/auth/facebook`;
  };
  return (
    <Box
      onClick={handleFacebookOauth}
      component="img"
      sx={{
        height: 36,
        width: 36,
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
        cursor: "pointer",
      }}
      alt="Image for telegram"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png"
    />
  );
}
