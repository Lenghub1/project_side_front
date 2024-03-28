import { useState } from "react";
import { styled } from "styled-components";
import CP from "@/components";
import { useIsMobile } from "@/utils/isMobile";
import {
  Avatar,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Container = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 20%;
  max-width: 250px;
  min-width: 80px;
`;

const SideBar = () => {
  const isMobile = useIsMobile();
  const [openOperation, setOpenOperation] = useState(false);
  const [openPayroll, setOpenPayroll] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);

  const handleOperationClick = () => {
    setOpenOperation(!openOperation);
  };

  const handlePayrollClick = () => {
    setOpenPayroll(!openPayroll);
  };

  const handleEmployeeClick = () => {
    setOpenEmployee(!openEmployee);
  };

  return (
    <Container>
      <CP.Styled.Flex gap="20px">
        <Avatar></Avatar>
        <CP.Typography variant="h5">Sandbox</CP.Typography>
      </CP.Styled.Flex>
      <List component="nav">
        <ListItemButton onClick={handleOperationClick}>
          <ListItemText primary="Operations" />
          {openOperation ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openOperation} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Timesheet" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Task" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={handlePayrollClick}>
              <ListItemText primary="Payroll" />
              {openPayroll ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openPayroll} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 6 }}>
                  <ListItemText primary="Payroll Content 1" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 6 }}>
                  <ListItemText primary="Payroll Content 2" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Collapse>
        <ListItemButton onClick={handleEmployeeClick}>
          <ListItemText primary="Organization" />
          {openEmployee ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openEmployee} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Overview Permission" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Advances" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Employee" />
              {openEmployee ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openEmployee} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 6 }}>
                  <ListItemText primary="Employee Content 1" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 6 }}>
                  <ListItemText primary="Employee Content 2" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Collapse>
        <ListItemButton>
          <ListItemText primary="Communication" />
        </ListItemButton>
      </List>
    </Container>
  );
};

export default SideBar;
