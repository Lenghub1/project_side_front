import { useEffect } from "react";
import CP from "@/components";
import EnhancedTable from "@/components/table/EnhanceTable";
import Button from "@/components/button";
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
import { UserInformationCell } from "./EmployeeTable";
import { organizationState } from "@/store/organizationStore";

const RenderActionCell = (row: Employement) => {
  const { id } = row;
  return (
    <CP.Styled.Flex gap="8px" justify="flex-start">
      <Button onClick={() => handleAcceptEmployee(id)} size="small">
        Accept
      </Button>
      <Button
        color="accent"
        onClick={() => handleRejectEmployee(id)}
        size="small"
      >
        Reject
      </Button>
    </CP.Styled.Flex>
  );
};

const EmployeeRegistration = () => {
  const [_, setDataToFilter] = useRecoilState(dataToFilterState);
  const { isFilter, data: filteredData } = useRecoilValue(filteredDataState);
  const organization = useRecoilValue(organizationState);
  console.log(organization);
  const { data, error } = useFetch(() => getAllPendingEmployees(organization));

  if (error) {
    return <Error status={error.status_code} />;
  }
  useEffect(() => {
    setDataToFilter(data);
  }, []);

  const displayData = isFilter ? filteredData : data;
  return (
    <CP.Container>
      <EnhancedTable<Employement>
        headCells={headCells}
        order="asc"
        rows={displayData || []}
        rowCount={displayData?.length || 0}
        orderBy="position"
        tableName="Employee Registrations"
      />
    </CP.Container>
  );
};

export default EmployeeRegistration;

const headCells = [
  {
    id: "name",
    label: "Employee",
    type: "ReactCell",
    element: UserInformationCell,
    sortable: true,
    sortFeild: "name",
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
    filterable: true,
  },
  {
    id: "action",
    type: "ReactCell",
    label: "Action",
    element: RenderActionCell,
  },
];
