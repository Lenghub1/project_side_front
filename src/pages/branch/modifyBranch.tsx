import React, { useEffect, useState } from "react";
import CP from "@/components";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectBranch } from "@/store/branch";
import MapComponent from "@/components/map/Map";
import { TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { allEmployees } from "@/api/employee";
import { handleApiRequest } from "@/api";
import { organizationLocation } from "@/api/location";
import { modifyBranch } from "@/api/branch";
import { selectOrganization } from "@/store/userStore";
interface Data {
  locationId: string;
  managerId: string;
  name: string;
}

const ModifyBranch: React.FC = () => {
  const [selectedBranch, setBranchSelected] = useRecoilState(selectBranch);
  const [managers, setManagers] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const selected = useRecoilValue(selectOrganization);
  console.log(selectedBranch);
  const navigate = useNavigate();
  const [data, setData] = useState<Data>({
    locationId: selectedBranch.locationId,
    managerId: selectedBranch.managerId,
    name: selectedBranch.name,
  }) as any;
  const managerRequest = async () => {
    const [response, error] = await handleApiRequest(() =>
      allEmployees(selected)
    );
    if (response) {
      console.log("hellosss", response);

      setManagers(response);
    } else {
      console.log(error);
    }
  };

  const locationRequest = async () => {
    const [response, error] = await handleApiRequest(() =>
      organizationLocation(selected)
    );
    if (response) {
      setLocations(response.data.data);
    } else {
      console.log(error);
    }
  };
  const branchPatch = async () => {
    const [response, error] = await handleApiRequest(() =>
      modifyBranch(selected, selectedBranch.id, data)
    );
    if (!error) {
      navigate("/organization/overview");
    }
    console.log(response);
  };
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

  const handleModifyBranch = () => {
    console.log(data);
    branchPatch();
  };
  const handleCancelModify = () => {
    navigate("/overview");
  };
  useEffect(() => {
    managerRequest();
    locationRequest();
  }, []);

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
