import React from "react";
import EnhancedTable from "@/components/table/Table";
import { Container } from "@mui/material";
import { allEmployees } from "@/api/employee";
import { Employement } from "@/utils/interfaces/Employment";

interface EmploymentWithAction extends Employement {
  action: string;
}

const EmployeeRegistration = () => {
  const [data, setData] = React.useState<any>([]);

  const newPendingEmployees = async () => {
    const response = await allEmployees("30ed163a-f86f-4b6d-8a9e-eb4263e5a9de");
    if (response) {
      console.log(response);
      setData(response);
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
        onSelectAllClick={(event) => console.log(event.target.checked)}
        order="asc"
        rows={data}
        orderBy="name"
        rowCount={data.length}
      />
    </Container>
  );
};

export default EmployeeRegistration;
