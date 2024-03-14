import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { ReactNode } from "react";

export interface TabProps {
  Tab: {
    label: string;
    value: string;
  };
  children: ReactNode;
}

const GroupTab = () => {
  return (
    <Box>
      <Tab label="Overview" />
      <Tab label="Permissions" />
      <Tab label="Advances" />
    </Box>
  );
};

export default GroupTab;
