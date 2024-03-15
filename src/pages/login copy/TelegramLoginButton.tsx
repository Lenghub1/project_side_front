import { useEffect, useRef } from "react";
import createTelegramScript from "./CreateTelegramScript";
import CP from "@/components";
import { Translate } from "@mui/icons-material";

const TelegramLoginButton = (props: any) => {
  const telegramOauthRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement>(null);

  useEffect(() => {
    //distroy the script ref
    scriptRef.current?.remove();

    scriptRef.current = createTelegramScript(props);
    telegramOauthRef.current?.after(scriptRef.current);
  }, []);

  return (
    <CP.Styled.Div
      width="40px"
      height="40px"
      overflow="hidden"
      padding="0 0 0 0"
      style={{
        borderRadius: "100%",
        position: "relative",
      }}
      margin="0 0 0 0"
    >
      <CP.Styled.Div
        style={{ opacity: 0.00001, position: "absolute", top: 0, left: 0 }}
      >
        <div ref={telegramOauthRef} />C
      </CP.Styled.Div>
      <img
        width="40px"
        height="40px"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/1200px-Telegram_2019_Logo.svg.png"
        alt=""
      />
    </CP.Styled.Div>
  );
};

export default TelegramLoginButton;
