import { useEffect, useRef } from "react";
import createTelegramScript from "./CreateTelegramScript";
import CP from "@/components";
import { OauthBox } from "./OauthComponent";
import styled from "styled-components";

const StyledDiv = styled(CP.Styled.Div)`
  width: 40px;
  height: 40px;
  overflow: hidden;
  padding: 0;
  border-radius: 100%;
  position: relative;
  margin: 0;
`;

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
    <StyledDiv>
      <CP.Styled.Div opacity={0.00001} position="absolute" top={0} left={0}>
        <div ref={telegramOauthRef} />C
      </CP.Styled.Div>
      <OauthBox
        alt="telegram image"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/1200px-Telegram_2019_Logo.svg.png"
      />
    </StyledDiv>
  );
};

export default TelegramLoginButton;
