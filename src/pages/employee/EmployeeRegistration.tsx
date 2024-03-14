import React from "react";
import CP from "@/components";
import EnhancedTable from "@/components/table/Table";
import Container from "@mui/material/Container";
import Button from "@/components/button";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getAllPendingEmployees } from "@/api/employee";
import { socket } from "@/socket";
import { HeadCell } from "@/components/table/TableHead";
import { Employement } from "@/utils/interfaces/Employment";
import {
  handleAcceptEmployee,
  handleRejectEmployee,
} from "@/utils/employee.util";
import useFetch from "@/hooks/useFetch";

const userId = "d5e2b24b-7c77-480f-ad24-c79c786179cc";

const RenderActionCell = (row: Employement) => {
  const { id } = row;
  return (
    <CP.Styled.Flex>
      <Button onClick={() => handleAcceptEmployee(id)}>Accept</Button>
      <Button onClick={() => handleRejectEmployee(id)}>Reject</Button>
    </CP.Styled.Flex>
  );
};

const EmployeeRegistration = () => {
  const { data, error } = useFetch(getAllPendingEmployees);
  const [notifiactionCount, setNotifiactionCount] = React.useState<number>(0);

  React.useEffect(() => {
    console.log(userId);
  }, []);

  if (error) {
    if (error.response?.status === 404) {
      return (
        <Container sx={{ color: (theme) => theme.palette.text.primary }}>
          <h1>There's no pending request</h1>
        </Container>
      );
    } else {
      return (
        <Container sx={{ color: (theme) => theme.palette.text.primary }}>
          <h1>Something went wrong</h1>
        </Container>
      );
    }
  } else {
    return (
      <Container>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Badge
            badgeContent={notifiactionCount}
            sx={{
              color: (theme) => {
                return theme.palette.text.primary;
              },
            }}
          >
            <NotificationsIcon />
          </Badge>
        </Box>
        <EnhancedTable<Employement>
          headCells={headCells}
          order="asc"
          rows={data || []}
          orderBy="name"
          rowCount={data?.length || 0}
          tableName="Employee Registrations"
          actionCell={RenderActionCell}
        />
      </Container>
    );
  }
};

export default EmployeeRegistration;

const headCells: HeadCell<Employement>[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Emplyee Information",
  },
  {
    id: "position",
    numeric: false,
    disablePadding: false,
    label: "Position",
  },
  {
    id: "privilege",
    numeric: false,
    disablePadding: false,
    label: "Priviledges",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];
