import React, { useEffect, useState } from "react";
import { Typography, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import useFetch from "@/hooks/useFetch";
import { allEmployees } from "@/api/employee";
import EnhancedTable from "@/components/table/EnhanceTable";
import { Employement } from "@/utils/interfaces/Employment";
import Error from "../error/Error";
import { useRecoilValue, useRecoilState } from "recoil";
import { selectedOrganization } from "@/store/userStore";
import CP from "@/components";
import { Filter, Sort } from "@/utils/interfaces/Feature";
import useScreenSize from "@/hooks/useScreenSize";
import { dataToFilterState } from "@/store/filterStore";

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
  const filters: Filter[] = [
    { field: "status", logicalClause: "ne", targetValue: "pending" },
  ];

  const [_, setDataToFilter] = useRecoilState(dataToFilterState);
  const { isMobile, isTablet } = useScreenSize();
  const initialHeadCells = generateHeadCells(isMobile, isTablet);
  const [headCells, setHeadCells] = useState(initialHeadCells);
  const organization = useRecoilValue(selectedOrganization);
  const [errorComponent, setErrorComponent] = useState<React.ReactNode>();
  const [notFoundComponent, setNotFoundComponent] = useState<React.ReactNode>();
  const [sortCriteria, setSortCriteria] = useState<Sort[]>([
    { field: "position", direction: "asc" },
  ]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  // State to manage filters
  const [appliedFilters, setAppliedFilters] = useState<Filter[]>(filters);

  // Fetch data with sorting criteria and filters
  const { data, error, refetchData } = useFetch(() =>
    allEmployees(organization, appliedFilters, sortCriteria, perPage, page)
  );

  const handlePageChange = (page: number) => {
    setPage(page + 1);
    console.log(page);
  };

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

  const handleFilterChange = (filters: Filter[]) => {
    const convertedFilters = filters.map((filter) => {
      const combinedValues = filter
        .values!.map((value) => {
          return value;
        })
        .join("||");
      return {
        field: filter.field,
        logicalClause: filter.logicalClause,
        targetValue: combinedValues,
      };
    });

    console.log(convertedFilters);
    setAppliedFilters(convertedFilters);
  };
  useEffect(() => {
    setDataToFilter(data?.docs);
    console.log(data);
  }, [data]);

  useEffect(() => {
    const newHeadCells = generateHeadCells(isMobile, isTablet);
    setHeadCells(newHeadCells);
  }, [isMobile, isTablet]);

  // Refetch data when sorting criteria or filters change
  useEffect(() => {
    refetchData();
  }, [sortCriteria, appliedFilters, page]);

  useEffect(() => {
    if (error) {
      if (error.statusCode === 404) {
        setNotFoundComponent(<Error status={error.statusCode} />);
      } else {
        setErrorComponent(<Error status={error.statusCode} />);
      }
    }
  }, [error]);
  if (errorComponent) {
    return errorComponent;
  }
  return (
    <CP.Container>
      <EnhancedTable<Employement>
        headCells={headCells}
        rows={data?.docs || []}
        tableName="Employee"
        pagination={data?.pagination || undefined}
        error={notFoundComponent}
        onFilterChange={handleFilterChange}
        onRequestSort={handleSortRequest}
        onPageChange={handlePageChange}
      />
    </CP.Container>
  );
};

export default EmployeeTable;

const generateHeadCells = (isMobile: boolean, isTablet: boolean) => [
  {
    label: "Employee",
    type: "ReactCell",
    element: UserInformationCell,
    sortable: false,
    filterable: false,
    sortField: "name",
    id: "name",
    numeric: false,
    visibility: true,
  },
  {
    id: "position",
    numeric: false,
    disablePadding: false,
    label: "Position",
    filterable: true,
    sortable: true,
    sortField: "position",
    visibility: !isMobile || isTablet,
  },
  {
    id: "privilege",
    numeric: false,
    disablePadding: false,
    label: "Privilege",
    filterable: true,
    sortable: true,
    sortField: "privilege",
    visibility: !isMobile && !isTablet,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    filterable: false,
    visibility: !isMobile && !isTablet,
  },
];
