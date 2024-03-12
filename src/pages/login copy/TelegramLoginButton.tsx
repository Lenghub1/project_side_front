import React, { useEffect } from "react";

const TelegramLoginButton: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (window.TelegramLoginWidget) {
      window.TelegramLoginWidget.setData({
        bot_name: "riem_app_bot",
        request_access: "write",
        lang: "en",
        auth_url:
          "https://02a7-167-179-40-121.ngrok-free.app/api/v1/auth/telegram/callback",
      });
      window.TelegramLoginWidget("renderButton", "telegram-login-button");
    }
  }, []);

  return <div id="telegram-login-button" />;
};

export default TelegramLoginButton;
