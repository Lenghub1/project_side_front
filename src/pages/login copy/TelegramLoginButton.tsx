import { useEffect, useRef } from "react";
import createTelegramScript from "./CreateTelegramScript";
import CP from "@/components";

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
      width="36px"
      height="36px"
      overflow="hidden"
      padding="0 30px 0 0"
      style={{ borderRadius: "100%" }}
      margin="0 20px 0 0"
    >
      <div
        style={{
          margin: "0 0 0 10px",
          display: "flex",
          justifyContent: "center",
        }}
        ref={telegramOauthRef}
      />
      ;
    </CP.Styled.Div>
  );
};

export default TelegramLoginButton;
