import CP from "@/components";
import MapComponent from "@/components/map/Map";
import { Slider, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";

const InformationBranch = ({
  branchData,
  handleInputChange,
  setBranchData,
}: any) => {
  const [sliderValue, setSliderValue] = useState(branchData.geoFencing);

  const handleSliderChange = (
    event: React.ChangeEvent<{}>,
    value: number | number[]
  ) => {
    setSliderValue(value);
    const updatedBranchData = { ...branchData, geoFencing: value };
    setBranchData(updatedBranchData);
  };
  return (
    <CP.Styled.Div style={{ marginTop: "20px" }}>
      <MapComponent />
      <CP.Typography variant="h5" marginTop={"20px"}>
        Information
      </CP.Typography>
      <CP.Styled.Flex
        direction="column"
        style={{ marginTop: "20px" }}
        justify="flex-start"
        items="flex-start"
      >
        <CP.Styled.Flex>
          <CP.Typography width={"25%"}>Branch Name</CP.Typography>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={branchData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </CP.Styled.Flex>
        <CP.Styled.Flex>
          <CP.Typography width={"25%"}>Manager Name</CP.Typography>
          <TextField
            label="Manager"
            type="text"
            name="manager"
            value={branchData.manager}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </CP.Styled.Flex>
        <CP.Styled.Flex>
          <CP.Typography width={"25%"}>Location</CP.Typography>
          <TextField
            label="Location"
            type="text"
            name="location"
            value={branchData.location}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </CP.Styled.Flex>

        <CP.Typography width={"25%"} marginTop={"20px"}>
          GeoFencing Range:
        </CP.Typography>

        <Slider
          style={{ marginTop: "20px" }}
          aria-label="Default"
          value={sliderValue}
          valueLabelDisplay="auto"
          onChange={handleSliderChange}
        />
      </CP.Styled.Flex>
      <CP.Styled.Flex direction="column"></CP.Styled.Flex>
    </CP.Styled.Div>
  );
};

export default InformationBranch;
