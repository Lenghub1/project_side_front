import CP from "@/components";
import useFetch from "@/hooks/useFetch";
import { allEmployees } from "@/api/employee";
import EnhancedTable from "@/components/table/EnhanceTable";
import { Employement } from "@/utils/interfaces/Employment";
import Error from "../error/Error";
import { useRecoilValue, useRecoilState } from "recoil";
import { filteredDataState, dataToFilterState } from "@/store/filterStore";
import { useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const UserInformationCell = (row: Employement) => {
  return (
    <CP.Styled.Flex gap="8px" justify="flex-start">
      <Avatar src="https://avatar.iran.liara.run/public" />
      <Stack>
        <Typography>{row.name}</Typography>
        <Typography>
          <small>{row.user.email || row.user.phone}</small>
        </Typography>
      </Stack>
    </CP.Styled.Flex>
  );
};

const EmployeeTable = () => {
  const [_, setDataToFilter] = useRecoilState(dataToFilterState);
  const { isFilter, data: filteredData } = useRecoilValue(filteredDataState);
  const { data, error } = useFetch(allEmployees);
  if (error) {
    return <Error status={error.status_code} />;
  }
  useEffect(() => {
    setDataToFilter(data);
  }, []);
  const displayData = isFilter ? filteredData : data;
  if (!displayData) {
    return <h1>Loading</h1>;
  }
  return (
    <CP.Container>
      <EnhancedTable<Employement>
        orderBy="name"
        order="asc"
        headCells={headCells}
        rows={displayData || []}
        rowCount={displayData?.length || 0}
        tableName="Employee"
      />
    </CP.Container>
  );
};

export default EmployeeTable;

const headCells = [
  {
    label: "Employee",
    type: "ReactCell",
    element: UserInformationCell,
    sortable: true,
    sortFeild: "name", //The sort field and id have to be the same for sorting to work properly
    id: "name",
  },
  {
    id: "position",
    numeric: false,
    disablePadding: false,
    label: "Position",
    filterable: true,
    sortable: true,
  },
  {
    id: "privilege",
    numeric: false,
    disablePadding: false,
    label: "Privilege",
    filterable: true,
    sortable: true,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    filterable: false,
  },
];
