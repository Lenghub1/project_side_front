import { useEffect, useState } from "react";
import { Typography, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import useFetch from "@/hooks/useFetch";
import { allEmployees } from "@/api/employee";
import EnhancedTable from "@/components/table/EnhanceTable";
import { Employement } from "@/utils/interfaces/Employment";
import Error from "../error/Error";
import { useRecoilValue, useRecoilState } from "recoil";
import { filteredDataState, dataToFilterState } from "@/store/filterStore";
import { selectedOrganization } from "@/store/userStore";
import CP from "@/components";
import { Filter, FilterSelection, Sort } from "@/utils/interfaces/Feature";

export const UserInformationCell = (row: Employement) => {
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
  const filters = [
    { field: "status", logicalClause: "ne", targetValue: "pending" },
  ];
  const perPage = 20;
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
    allEmployees(organization, appliedFilters, sortCriteria, perPage, page)
  );

  if (error) {
    return <Error status={error.status_code} />;
  }

  useEffect(() => {
    setDataToFilter(data);
  }, [data]);

  const displayData = isFilter ? filteredData : data;

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
        onFilterChange={handleFilterChange}
        onRequestSort={handleSortRequest}
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
    sortable: false,
    filterable: false,
    sortField: "name",
    id: "name",
    numeric: false,
  },
  {
    id: "position",
    numeric: false,
    disablePadding: false,
    label: "Position",
    filterable: true,
    sortable: true,
    sortField: "position",
  },
  {
    id: "privilege",
    numeric: false,
    disablePadding: false,
    label: "Privilege",
    filterable: true,
    sortable: true,
    sortField: "privilege",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    filterable: false,
  },
];
