import React, { useEffect } from "react";

const TelegramLoginButton = () => {
  const telegramOauthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", "riem_app_bot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-lang", "en");
    script.setAttribute(
      "data-auth-url",
      "https://02a7-167-179-40-121.ngrok-free.app/api/v1/auth/telegram/callback"
    );

    telegramOauthRef.current?.appendChild(script);
  }, []);

  return (
    <div>
      <div ref={telegramOauthRef}> </div>
    </div>
  );
};

export default TelegramLoginButton;
