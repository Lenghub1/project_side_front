import React from "react";

import { AddMemberProps } from "./createBranch";
import { Container } from "@mui/material";
import EnhancedTable from "./addMemberTable";
import CP from "@/components";

const AddMember: React.FC<AddMemberProps> = ({ branchData, setBranchData }) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const fakeMembers = [
    {
      id: "1",
      name: "Leangsour Kim",
      position: "Co-leader",
      workLocation: "Kean svay",
      status: "Active",
    },
    {
      id: "2",
      name: "Ra-tou Korea",
      position: "Co-leader",
      workLocation: "Kean svay",
      status: "Inactive",
    },
    {
      id: "3",
      name: "Ra-seth asey kao",
      position: "Member",
      workLocation: "Kean svay",
      status: "Active",
    },
    {
      id: "4",
      name: "Leng-sonthormuk",
      position: "member",
      workLocation: "sonthormuk",
      status: "Active",
    },
    {
      id: "5",
      name: "Vipoo-somnong12",
      position: "member",
      workLocation: "somnong12",
      status: "Inactive",
    },
  ];

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
