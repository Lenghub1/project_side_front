import { authApi } from "@/api/auth";
import React from "react";

export default function FacebookLoginButton() {
  const handleFacebookOauth = async () => {
    window.location.href = `${import.meta.env.VITE_BASE_URL_DEV}/auth/facebook`;
  };
  return (
    <img
      onClick={handleFacebookOauth}
      style={{ width: "36px", height: "36px" }}
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png"
      alt=""
    />
  );
}
