import { Container } from "@mui/material";
import { Employement } from "@/utils/interfaces/Employment";
import { handleApiRequest } from "@/api";
import { allEmployees } from "@/api/employee";
import EnhancedTable from "@/components/table/Table";
import { HeadCell } from "@/components/table/TableHead";
import { useState, useEffect } from "react";

const EmployeeTable = () => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>([]);
  const fetchData = async () => {
    const [response, error] = await handleApiRequest(() => allEmployees());
    if (response) {
      console.log(response);
      setData(response);
      setError(undefined);
    } else {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
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
  }
  return (
    <Container>
      <EnhancedTable<Employement>
        orderBy="name"
        order="asc"
        headCells={headCells}
        rows={data}
        rowCount={data?.length}
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
    label: "privilege",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];
