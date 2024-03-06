import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Box from "@mui/material/Box";

import { lightTheme, darkTheme } from ".";
import { ReactNodeProps } from "@/@type/common";

interface ThemeProps extends ReactNodeProps {}

const Theme = ({ children }: ThemeProps) => {
  // TODO: Create light-mode & dark-mode toggle
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          backgroundColor: "background.default",
          height: "100vh"
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default Theme;
