import React from "react";
import EnhancedTable from "@/components/table/Table";
import { Container } from "@mui/material";
import { getAllPendingEmployees } from "@/api/employee";
import { handleApiRequest } from "@/api";

const EmployeeRegistration = () => {
  const [data, setData] = React.useState<any>([]);

  const newPendingEmployees = async () => {
    const [response, error] = handleApiRequest(
      getAllPendingEmployees("30ed163a-f86f-4b6d-8a9e-eb4263e5a9de") as any
    );
    if (response) {
      console.log(response);
      setData(response);
    } else {
      console.log(error);
    }
  };

  React.useEffect(() => {
    newPendingEmployees();
  }, []);

  return (
    <Container>
      <EnhancedTable
        numSelected={0}
        onRequestSort={(_, property) => console.log(property)}
        order="asc"
        rows={data}
        orderBy="name"
        rowCount={data.length}
      />
    </Container>
  );
};

export default EmployeeRegistration;
