import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f03c3c",
      contrastText: "#fff"
    },
    secondary: {
      main: "#f57665",
      contrastText: "#fff"
    },
    accent: {
      main: "#406377",
      dark: "#324D5D",
      contrastText: "#fff"
    },
    text: {
      primary: "#f3f4f7",
      secondary: "#c2c9d6"
    },
    background: {
      default: "#212121",
      paper: "#212121"
    }
  }
});

export default theme;
