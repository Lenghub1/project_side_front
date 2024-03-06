import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SnackbarProvider } from "notistack";

import WindowProvider from "./provider/WindowProvider";
import { AppRoutes } from "./route";
import GlobalStyles from "./styles/globalStyle";
import Theme from "./theme";
import Organization from "./pages/organization/Organization";

function App() {
  return (
    <RecoilRoot>
      {/* <StylesProvider injectFirst> */}
      <GlobalStyles />
      <Theme>
        {/* <SnackbarProvider> */}
        {/* <HashRouter> */}
        {/* <AppRoutes /> */}
        <Organization />
        {/* <WindowProvider /> */}
        {/* </HashRouter> */}
        {/* </SnackbarProvider> */}
      </Theme>
      {/* </StylesProvider> */}
    </RecoilRoot>
  );
}

export default App;
