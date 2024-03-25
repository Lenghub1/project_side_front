import React from "react";
import CP from "@/components";
import EnhancedTable from "@/components/table/Table";
import Button from "@/components/button";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getAllPendingEmployees } from "@/api/employee";
import { HeadCell } from "@/components/table/TableHead";
import { Employement } from "@/utils/interfaces/Employment";
import {
  handleAcceptEmployee,
  handleRejectEmployee,
} from "@/utils/employee.util";
import useFetch from "@/hooks/useFetch";
import Error from "../error/Error";
import { useRecoilValue } from "recoil";
import { filteredDataState } from "@/store/employee";

const RenderActionCell = (row: Employement) => {
  const { id } = row;
  return (
    <CP.Styled.Flex gap="8px" justify="flex-start">
      <Button onClick={() => handleAcceptEmployee(id)}>Accept</Button>
      <Button color="accent" onClick={() => handleRejectEmployee(id)}>
        Reject
      </Button>
    </CP.Styled.Flex>
  );
};

const EmployeeRegistration = () => {
  const filteredData = useRecoilValue(filteredDataState);
  const { data, error } = useFetch(getAllPendingEmployees);
  const [notifiactionCount, setNotifiactionCount] = React.useState<number>(0);

  if (error) {
    return <Error status={error.status_code} />;
  }
  console.log(filteredData);
  return (
    <CP.Container>
      <CP.Container>
        <CP.Styled.Flex justify="flex-end">
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
        </CP.Styled.Flex>
      </CP.Container>

      <EnhancedTable<Employement>
        headCells={headCells}
        order="asc"
        rows={filteredData || []}
        orderBy="name"
        rowCount={filteredData?.length || 0}
        tableName="Employee Registrations"
        actionCell={RenderActionCell}
      />
    </CP.Container>
  );
};

export default EmployeeRegistration;

const headCells: HeadCell<Employement>[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Emplyee Information",
    filterable: true,
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
    filterable: true,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    filterable: true,
  },
];
