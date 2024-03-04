import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { StylesProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

import WindowProvider from "./provider/WindowProvider";
import { AppRoutes } from "./route";
import GlobalStyles from "./styles/globalStyle";

function App() {
  return (
    <RecoilRoot>
      <StylesProvider injectFirst>
        <GlobalStyles />
        <SnackbarProvider>
          <HashRouter>
            <AppRoutes />
            <WindowProvider />
          </HashRouter>
        </SnackbarProvider>
      </StylesProvider>
    </RecoilRoot>
  );
}

export default App;
