import React from "react";
import EnhancedTable from "@/components/table/Table";
import { Container } from "@mui/material";
import { handleApiRequest } from "@/api";
import { allEmployee } from "@/api/employee";
import { Employement } from "@/utils/interfaces/Employment";

interface EmploymentWithAction extends Employement {
  action: string;
}

const EmployeeRegistration = () => {
  const [data, setData] = React.useState<EmploymentWithAction[]>([]);

  const newPendingEmployees = async () => {
    const [response, error] = await handleApiRequest(() =>
      allEmployee("30ed163a-f86f-4b6d-8a9e-eb4263e5a9de")
    );
    if (response) {
      console.log(response);
      setData(response);
    } else {
      console.error(error);
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
