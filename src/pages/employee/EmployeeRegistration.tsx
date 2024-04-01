import { useEffect, useState } from "react";
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
import { selectedOrganization } from "@/store/userStore";
import { Sort, Filter, FilterSelection } from "@/utils/interfaces/Feature";

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
  const filters = [
    { field: "status", logicalClause: "eq", targetValue: "pending" },
  ];
  const perPage = 10;
  const page = 1;

  const [_, setDataToFilter] = useRecoilState(dataToFilterState);
  const { isFilter, data: filteredData } = useRecoilValue(filteredDataState);
  const organization = useRecoilValue(selectedOrganization);

  // State to manage the sorting criteria
  const [sortCriteria, setSortCriteria] = useState<Sort[]>([
    { field: "position", direction: "asc" },
  ]);

  // State to manage filters
  const [appliedFilters, setAppliedFilters] = useState<Filter[]>(filters);

  // Fetch data with sorting criteria and filters
  const { data, error, refetchData } = useFetch(() =>
    getAllPendingEmployees(
      organization,
      appliedFilters,
      sortCriteria,
      perPage,
      page
    )
  );

  if (error) {
    return <Error status={error.status_code} />;
  }

  useEffect(() => {
    setDataToFilter(data?.docs);
    console.log(data);
  }, [data]);

  const displayData = isFilter ? filteredData : data?.docs;

  const handleSortRequest = (property: keyof Employement) => {
    const existingSortIndex = sortCriteria.findIndex(
      (criteria) => criteria.field === property
    );

    if (existingSortIndex !== -1) {
      const updatedCriteria = [...sortCriteria];
      const currentDirection = updatedCriteria[existingSortIndex].direction;

      // Check the current sorting direction and update accordingly
      if (currentDirection === "asc") {
        updatedCriteria[existingSortIndex].direction = "desc";
      } else if (currentDirection === "desc") {
        // If sorting direction is descending, remove the sort criteria
        updatedCriteria.splice(existingSortIndex, 1);
      }

      setSortCriteria(updatedCriteria);
    } else {
      // Property doesn't exist in sort criteria, add it
      setSortCriteria((prevCriteria) => [
        ...prevCriteria,
        { field: property as string, direction: "asc" },
      ]);
    }
  };

  const handleFilterChange = (filters: FilterSelection[]) => {
    console.log(filters);
    // Convert SortField[] to Filter[] if needed
    const convertedFilters = filters.map((filter) => {
      const combinedValues = filter.values
        .map((value) => {
          return value;
        })
        .join("||");
      return {
        field: filter.key,
        logicalClause: filter.option,
        targetValue: combinedValues,
      };
    });

    console.log(convertedFilters);
    setAppliedFilters(convertedFilters);
  };

  // Refetch data when sorting criteria or filters change
  useEffect(() => {
    refetchData();
  }, [sortCriteria, appliedFilters]);

  return (
    <CP.Container>
      <EnhancedTable<Employement>
        headCells={headCells}
        rows={displayData || []}
        rowCount={displayData?.length || 0}
        tableName="Employee"
        pagination={data?.pagination}
        onFilterChange={handleFilterChange}
        onRequestSort={handleSortRequest}
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
