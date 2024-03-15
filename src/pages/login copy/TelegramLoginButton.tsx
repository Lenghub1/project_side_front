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
      width="50px"
      height="40px"
      overflow="hidden"
      padding="0 30px 0 0"
      style={{
        borderRadius: "100%",
        position: "relative",
      }}
      margin="0 20px 0 0"
    >
      <div ref={telegramOauthRef} />
    </CP.Styled.Div>
  );
};

export default TelegramLoginButton;
