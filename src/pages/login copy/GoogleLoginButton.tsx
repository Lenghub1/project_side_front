import { authApi } from "@/api/auth";
import axios from "axios";

export default function GoogleLoginButton() {
  const handleGoogleOauth = async () => {
    window.location.href =
      "https://e251-167-179-40-121.ngrok-free.app/api/v1/auth/google";
    const res = await authApi.googleOauth();

    console.log("this", res);
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
