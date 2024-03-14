import React from "react";
import { handleApiRequest } from "@/api";
import { AddMemberProps } from "./createBranch";
import { Container } from "@mui/material";
import EnhancedTable from "./addMemberTable";
import { allEmployees } from "@/api/employee";
import CP from "@/components";

const AddMember: React.FC<AddMemberProps> = ({ branchData, setBranchData }) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [fakeMembers, setFakeMembers] =React.useState<string[]>([]);
  const newPendingEmployees = async () => {
    const [response, error] = await handleApiRequest(() =>
    allEmployees("d5a86690-7488-4a3b-aa5e-383ea4e01878")
    );
    console.log(response);
    if(response){
      setFakeMembers(response as any)
    }
    if(error){
      console.log(error);
      
    }

  };

  
  React.useEffect(() => {
    newPendingEmployees();
 
    
  }, []);
  return (
    <Container style={{ marginTop: "20px" }}>
      <CP.Typography variant="h5" fontFamily={"bold"}>
        Add Members
      </CP.Typography>
      <EnhancedTable
        onRequestSort={(_, property) => console.log(property)}
        order="asc"
        rows={fakeMembers}
        selected={selected}
        setSelected={setSelected}
        branchData={branchData}
        setBranchData={setBranchData}
        orderBy="name"
        rowCount={fakeMembers.length}
      />
    </Container>
  );
};

export default AddMember;
