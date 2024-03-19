import React from "react";
import EnhancedTable from "@/components/table/Table";
import { Container } from "@mui/material";
import { getAllPendingEmployees } from "@/api/employee";
import { handleApiRequest } from "@/api";
// import { socket } from "@/socket";

const userId = "d5e2b24b-7c77-480f-ad24-c79c786179cc";

const EmployeeRegistration = () => {
  const [data, setData] = React.useState<Object | any>([]);
  const [error, setError] = React.useState<Object | any>([]);

  const newPendingEmployees = async () => {
    const [response, error] = await handleApiRequest(() =>
      getAllPendingEmployees("1ca2a528-72c9-4cb8-8823-4d26cfcdd598")
    );
    if (response) {
      console.log(response);
      setData(response);
      setError(undefined);
    } else {
      console.log(error);
      setError(error);
    }
  };

  React.useEffect(() => {
    newPendingEmployees();
    console.log(userId);
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
  } else {
    return (
      <Container>
        <EnhancedTable
          onRequestSort={(_, property) => console.log(property)}
          order="asc"
          rows={data}
          orderBy="name"
          rowCount={data.length}
        />
      </Container>
    );
  }
};

export default EmployeeRegistration;
