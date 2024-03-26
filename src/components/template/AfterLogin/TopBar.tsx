import { AppBar, Toolbar, Typography } from "@mui/material";

const TopBar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white", color: "black" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Top Bar
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
