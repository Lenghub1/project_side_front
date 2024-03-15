import React, { useState } from "react";
import CP from "@/components";
import { useRecoilState } from "recoil";
import { selectBranch } from "@/store/branch";
import MapComponent from "@/components/map/Map";
import { TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
interface Manager {
  id: string;
  name: string;
}

interface Location {
  id: string;
  name: string;
}

const ModifyBranch: React.FC = () => {
  const [selectedBranch, setBranchSelected] = useRecoilState(selectBranch);
  console.log(selectedBranch);
  const navigate = useNavigate();
  const [data, setData] = useState({
    locationId: selectedBranch.locationId,
    managerId: selectedBranch.managerId,
    name: selectedBranch.name,
  }) as any;
  const managers: Manager[] = [
    { id: "fa6f8c4b-e5fd-4c23-a20c-edbab2b5d169", name: "John Doe" },
    { id: "manager-id-2", name: "Jane Smith" },
    // Add more manager objects as needed
  ];

  const locations: Location[] = [
    { id: "613e3bf0-d7fc-441f-ad3c-4491cb5f850e", name: "Location 1" },
    { id: "location-id-2", name: "Location 2" },
    // Add more location objects as needed
  ];

  const handleManagerChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setData({ ...data, managerId: event.target.value as string });
  };

  const handleLocationChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setData({ ...data, locationId: event.target.value as string });
  };
  const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setData({ ...data, name: event.target.value as string });
  };
  console.log(data);
  const handleModifyBranch = () => {
    console.log(data);
  };
  const handleCancelModify = () => {
    navigate("/overview");
  };
  return (
    <CP.Styled.Wrapper>
      <MapComponent />

      <TextField
        select
        label="Select Manager"
        fullWidth
        value={data.managerId}
        onChange={handleManagerChange}
        style={{ marginTop: "20px" }}
      >
        {managers.map((manager: any) => (
          <MenuItem key={manager.id} value={manager.id}>
            {manager.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Select Location"
        fullWidth
        value={data.locationId}
        onChange={handleLocationChange}
        style={{ marginTop: "20px" }}
      >
        {locations.map((location: any) => (
          <MenuItem key={location.id} value={location.id}>
            {location.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Name"
        fullWidth
        value={data.name}
        onChange={handleNameChange}
        style={{ marginTop: "20px" }}
      ></TextField>
      <CP.Styled.Flex margin="20px 0" justify="flex-end" gap="20px">
        <CP.Button onClick={handleCancelModify} variant="text">
          CANCEL
        </CP.Button>
        <CP.Button onClick={handleModifyBranch}>CONFIRM</CP.Button>
      </CP.Styled.Flex>
    </CP.Styled.Wrapper>
  );
};

export default ModifyBranch;
