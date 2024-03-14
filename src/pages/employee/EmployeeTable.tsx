import { Container } from "@mui/material";
import useFetch from "@/hooks/useFetch";
import { allEmployees } from "@/api/employee";
import EnhancedTable from "@/components/table/Table";
import { HeadCell } from "@/components/table/TableHead";
import { Employement } from "@/utils/interfaces/Employment";

const EmployeeTable = () => {
  const { data, error } = useFetch(allEmployees);
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
  }
  return (
    <Container>
      <EnhancedTable<Employement>
        orderBy="name"
        order="asc"
        headCells={headCells}
        rows={data || []}
        rowCount={data?.length || 0}
        tableName="Employee"
      />
    </Container>
  );
};

export default EmployeeTable;

const headCells: HeadCell<Employement>[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    disablePadding: false,
    label: "Emplyee Information",
    filterable: true,
  },
  {
    id: "position",
    numeric: false,
    disablePadding: false,
    label: "Position",
    filterable: true,
  },
  {
    id: "privilege",
    id: "privilege",
    numeric: false,
    disablePadding: false,
    label: "privilege",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];
