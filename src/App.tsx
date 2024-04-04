import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SnackbarProvider } from "notistack";
import WindowProvider from "./provider/WindowProvider";
import { AppRoutes } from "./route";
import Theme from "./theme";
import { lightTheme } from "./theme";

function App() {
  return (
    <RecoilRoot>
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
