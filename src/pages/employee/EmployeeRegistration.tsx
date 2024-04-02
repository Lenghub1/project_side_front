import { useEffect, useState } from "react";
import CP from "@/components";
import EnhancedTable from "@/components/table/EnhanceTable";
import Button from "@/components/button";
import { getAllPendingEmployees } from "@/api/employee";
import { Employment } from "@/utils/interfaces/Employment";
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
import { Sort, Filter } from "@/utils/interfaces/Feature";
import useScreenSize from "@/hooks/useScreenSize";

interface RenderActionCellProps {
  row: Employment;
  onActionCallback: (data: any, error: any) => void;
}

const RenderActionCell = ({ row, onActionCallback }: RenderActionCellProps) => {
  const handleAccept = async () => {
    await handleAcceptEmployee(row.id, row.orgId, (data, error) => {
      onActionCallback(data, error);
    });
  };

  const handleReject = async () => {
    await handleRejectEmployee(row.id, row.orgId, (data, error) => {
      onActionCallback(data, error);
    });
  };

  return (
    <CP.Styled.Flex gap="8px" justify="flex-start">
      <Button onClick={handleAccept} size="small">
        Accept
      </Button>
      <Button color="accent" onClick={handleReject} size="small">
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
  const { isMobile, isTablet } = useScreenSize();
  const initialHeadCells = generateHeadCells(isMobile, isTablet);
  const [headCells, setHeadCells] = useState(initialHeadCells);
  const [_, setDataToFilter] = useRecoilState(dataToFilterState);
  const { isFilter, data: filteredData } = useRecoilValue(filteredDataState);
  const organization = useRecoilValue(selectedOrganization);
  const [updatedData, setUpdatedData] = useState();
  const [errorComponent, setErrorComponent] = useState<React.ReactNode>();
  const [notFoundComponent, setNotFoundComponent] = useState<React.ReactNode>();

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
  useEffect(() => {
    const newHeadCells = generateHeadCells(isMobile, isTablet);
    setHeadCells(newHeadCells);
  }, [isMobile, isTablet]);

  useEffect(() => {
    setDataToFilter(data?.docs);
  }, [data]);

  const displayData = isFilter ? filteredData : data?.docs;

  const handleSortRequest = (property: keyof Employment) => {
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
    // Convert SortField[] to Filter[] if needed
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

    setAppliedFilters(convertedFilters);
  };

  const handleActionCallback = (data: any, error: any) => {
    setUpdatedData(data);
    if (error) {
      setErrorComponent(<Error status={error.status_code} />);
    }
  };

  // Refetch data when sorting criteria or filters change
  useEffect(() => {
    refetchData();
  }, [sortCriteria, appliedFilters, updatedData]);

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
      <EnhancedTable<Employment>
        headCells={headCells}
        rows={displayData || []}
        tableName="Employee"
        pagination={data?.pagination}
        error={notFoundComponent}
        onFilterChange={handleFilterChange}
        onRequestSort={handleSortRequest}
        onActionCallback={handleActionCallback}
      />
    </CP.Container>
  );
};

export default EmployeeRegistration;

const generateHeadCells = (isMobile: boolean, isTablet: boolean) => [
  {
    id: "name",
    label: "Employee",
    type: "ReactCell",
    element: UserInformationCell,
    sortable: true,
    sortFeild: "name",
    visibility: true,
  },
  {
    id: "position",
    numeric: false,
    disablePadding: false,
    label: "Position",
    filterable: true,
    sortable: true,
    visibility: !isMobile && !isTablet,
  },
  {
    id: "privilege",
    numeric: false,
    disablePadding: false,
    label: "Privilege",
    filterable: true,
    sortable: true,
    visibility: !isMobile && !isTablet,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    filterable: true,
    visibility: !isMobile && !isTablet,
  },
  {
    id: "action",
    type: "ReactCell",
    label: "Action",
    element: RenderActionCell,
    visibility: !isMobile || isTablet,
  },
];
