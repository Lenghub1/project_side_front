interface ScriptOption {
  /**
   * The URL where the auth data from Telegram will be sent.
   */
  authCallbackUrl?: string;

  /**
   * The username of the bot that will be used to authenticate the user.
   */
  botUsername: string;

  /**
   * The size of the button.
   *
   */
  buttonSize?: "large" | "medium" | "small";

  /**
   * The radius of the button corners.
   */
  cornerRadius?: number;

  /**
   * The language of the button.
   *
   * @default "en"
   */
  lang?: string;

  /**
   * The access level that the bot will request.
   *
   * @default "write"
   */
  requestAccess: string;

  /**
   * Whether to show the user's avatar.
   *
   * @default true
   */
  showAvatar?: boolean;
  onAuthCallback?: (data: any) => void;

  /**
   * The version of the Telegram widget to deal with browser caching.
   */
  widgetVersion?: number | string;
}

function createTelegramScript({
  authCallbackUrl,
  onAuthCallback,
  botUsername,
  lang = "en",
  requestAccess = "write",
}: ScriptOption): HTMLScriptElement {
  const script = document.createElement("script");

  script.async = true;
  script.src = `https://telegram.org/js/telegram-widget.js?`;
  script.setAttribute("data-telegram-login", botUsername);
  script.setAttribute("data-size", "large");
  script.setAttribute("data-lang", lang);
  script.setAttribute("data-request-access", requestAccess);

  if (authCallbackUrl) {
    script.setAttribute("data-auth-url", authCallbackUrl);
  } else if (onAuthCallback) {
    (window as any).onTelegramAuthCallback = (user: any) => {
      onAuthCallback(user);
    };
    script.setAttribute("data-onauth", "onTelegramAuthCallback(user)");
  }
  return script;
}
export default createTelegramScript;
