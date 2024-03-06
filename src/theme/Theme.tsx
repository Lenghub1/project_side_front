import { ThemeProvider } from "@mui/material";

import { lightTheme, darkTheme } from ".";
import { ReactNodeProps } from "@/@type/common";

interface ThemeProps extends ReactNodeProps {}

const Theme = ({ children }: ThemeProps) => {
  // TODO: Create light-mode & dark-mode toggle
  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
};

export default Theme;
