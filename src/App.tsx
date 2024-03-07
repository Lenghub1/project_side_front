import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SnackbarProvider } from "notistack";

import WindowProvider from "./provider/WindowProvider";
import { AppRoutes } from "./route";
import GlobalStyles from "./styles/globalStyle";
import Theme from "./theme";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <Theme>
        <SnackbarProvider>
          <HashRouter>
            <AppRoutes />
            <WindowProvider />
          </HashRouter>
        </SnackbarProvider>
      </Theme>
    </RecoilRoot>
  );
}

export default App;
