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

    if (response) {
      setFakeMembers(response as any);
    }

    if (error) {
      console.error(error);
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
        rows={fakeMembers} // Ensure that only the expected props are passed
        branchData={branchData}
        setBranchData={setBranchData}
      />
    </Container>
  );
};

export default AddMember;
