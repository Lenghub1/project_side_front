import { useEffect, FC, useState } from "react";
import { OauthBox } from "./OauthComponent";
import { OauthProps } from "@/utils/interfaces/Oauth";
import { authApi } from "@/api/auth";

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
  console.log("CLICK me");
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

  useEffect(() => {
    loadFacebookSDK(appId).then(() => {
      setSdkLoaded(true);
    });
  }, [appId]);

  const handleFacebookSignIn = async (user: any) => {
    await authApi.facebookSignIn(user).then((res: any) => {
      if (res.status === 200) {
        window.location.href = res.data.url;
      }
    });
  };

  const handleUserInformation = async () => {
    window.FB.api(
      "/me",
      { fields: "id,name,last_name,first_name,gender,birthday" },
      async function (response: any) {
        if (!response || response.error) {
          console.error("Error fetching user information:", response.error);
        } else {
          //post data to backend
          console.log("Sending data to backend", response);
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
            handleUserInformation().catch((error) => {
              console.error("Error fetching user information:", error);
            });
          } else {
            console.error("User cancelled login or did not fully authorize.");
          }
        },
        { scope: "email,public_profile" }
      );
    } else {
      console.error(
        "The Facebook SDK has not been initialized or is not yet loaded."
      );
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
