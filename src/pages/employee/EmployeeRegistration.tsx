import React, { useEffect } from "react";
import CP from "@/components";
import EnhancedTable from "@/components/table/EnhanceTable";
import Button from "@/components/button";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getAllPendingEmployees } from "@/api/employee";
import { Employement } from "@/utils/interfaces/Employment";
import {
  handleAcceptEmployee,
  handleRejectEmployee,
} from "@/utils/employee.util";
import useFetch from "@/hooks/useFetch";
import Error from "../error/Error";
import { useRecoilValue, useRecoilState } from "recoil";
import { filteredDataState, dataToFilterState } from "@/store/filterStore";

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
  const [dataToFilter, setDataToFilter] = useRecoilState(dataToFilterState);
  const { isFilter, data: filteredData } = useRecoilValue(filteredDataState);
  const { data, error } = useFetch(getAllPendingEmployees);
  const [notifiactionCount, setNotifiactionCount] = React.useState<number>(0);

  if (error) {
    return <Error status={error.status_code} />;
  }
  useEffect(() => {
    setDataToFilter(data);
  }, []);

  const displayData = isFilter ? filteredData : data;
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
        rows={displayData || []}
        orderBy="name"
        rowCount={displayData?.length || 0}
        tableName="Employee Registrations"
      />
    </CP.Container>
  );
};

export default EmployeeRegistration;

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Employee",
    filterable: true,
    sortable: true,
  },
  {
    id: "position",
    numeric: false,
    disablePadding: false,
    label: "Position",
    sortable: true,
  },
  {
    id: "privilege",
    numeric: false,
    disablePadding: false,
    label: "Priviledges",
    filterable: true,
    sortable: true,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    filterable: true,
  },
  {
    type: "ReactCell",
    label: "Action",
    element: RenderActionCell,
  },
];
