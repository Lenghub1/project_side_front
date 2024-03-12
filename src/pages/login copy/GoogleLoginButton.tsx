import { authApi } from "@/api/auth";
import axios from "axios";

export default function GoogleLoginButton() {
  const handleGoogleOauth = async () => {
    console.log(`${import.meta.env.VITE_BASE_URL_DEV}/auth/google`);
    window.location.href = `${import.meta.env.VITE_BASE_URL_DEV}/auth/google`;
  };
  return (
    <img
      onClick={handleGoogleOauth}
      style={{ width: "36px", height: "36px" }}
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
      alt=""
    />
  );
}
