import { useEffect, FC, useState } from "react";
import { OauthBox } from "./OauthComponent";
import { OauthProps } from "@/utils/interfaces/Oauth";
import { authApi } from "@/api/auth";
import { useSnackbar } from "notistack";

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

interface FacebookLoginButtonProps {
  appId: string;
}

const facebookObject: OauthProps = {
  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png",
  alt: "google image",
};

const loadFacebookSDK = (appId: string): Promise<void> => {
  return new Promise((resolve) => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
      resolve();
    };

    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode!.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });
};

const FacebookLoginButton: FC<FacebookLoginButtonProps> = ({ appId }) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    loadFacebookSDK(appId).then(() => {
      setSdkLoaded(true);
    });
  }, [appId]);

  function showMessage(message: string, variant: "error" | "success") {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
    });
  }

  const handleFacebookSignIn = async (user: any) => {
    await authApi.facebookSignIn(user).then((res: any) => {
      if (res.status === 200) {
        window.location.href = res.data.url;
      }
    });
  };

  const handleUserInformation = async (accessToken: string) => {
    window.FB.api(
      "/me",
      {
        fields: "id,name,last_name,first_name,gender,birthday",
        access_token: accessToken,
      },
      async function (response: any) {
        if (!response || response.error) {
          showMessage("Failed to login facebook", "error");
        } else {
          await handleFacebookSignIn({ ...response });
        }
      }
    );
  };
  const handleLogin = () => {
    if (sdkLoaded && window.FB) {
      window.FB.login(
        (response: any) => {
          if (response.authResponse) {
            const accessToken = response.authResponse.accessToken;
            handleUserInformation(accessToken);
          } else {
            showMessage("Authorization faild", "error");
          }
        },
        { scope: "email,public_profile" }
      );
    } else {
      showMessage("Something went wrong!", "error");
    }
  };

  return (
    <OauthBox
      src={facebookObject.src}
      alt={facebookObject.alt}
      click={handleLogin}
    />
  );
};

export default FacebookLoginButton;
