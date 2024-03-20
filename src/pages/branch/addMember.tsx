import React from "react";
import { handleApiRequest } from "@/api";
import { AddMemberProps } from "./createBranch";
import { Container } from "@mui/material";
import EnhancedTable from "./addMemberTable";
import { allEmployees } from "@/api/employee";
import { selectedOrganization } from "@/store/userStore";
import CP from "@/components";
import { useRecoilValue } from "recoil";
import { Employement } from "@/utils/interfaces/Employment";
import { Employement } from "@/utils/interfaces/Employment";
const AddMember: React.FC<AddMemberProps> = ({ branchData, setBranchData }) => {
  const [selected, setSelected] = React.useState<any>([]);
  const [fakeMembers, setFakeMembers] = React.useState<Partial<Employement[]>>(
    []
  );
  const currentOrganization = useRecoilValue(selectedOrganization);
  const newPendingEmployees = async () => {
    const [response, error] = await handleApiRequest(() =>
      allEmployees(currentOrganization)
    );
    console.log(response);
    if (response) {
      setFakeMembers(response);
      setFakeMembers(response);
    }
    if (error) {
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
