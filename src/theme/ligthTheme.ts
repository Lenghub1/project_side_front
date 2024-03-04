import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f03c3c",
      contrastText: "#fff"
    },
    secondary: {
      main: "#f57665",
      contrastText: "#fff"
    },
    text: {
      primary: "#1e232c",
      secondary: "#374868"
    },
    background: {
      default: "#fff",
      paper: "#fff"
    }
  }
});

export default theme;
