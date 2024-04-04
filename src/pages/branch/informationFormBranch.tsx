import CP from "@/components";
import MapComponent from "@/components/map/Map";
import { Slider, TextField, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useIsMobile } from "@/utils/isMobile";
const InformationBranch = ({
  branchData,
  handleInputChange,
  setBranchData,
  managers,
}: any) => {
  const [sliderValue, setSliderValue] = useState(branchData.geoFencing);
  const pinPoint = { type: "Point", coordinates: [40, 60] };
  const isMobile = useIsMobile();
  const handleSliderChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    setSliderValue(value);
    const updatedBranchData = {
      ...branchData,
      geoFencing: value,
      pinPoint: pinPoint,
    };
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
          <CP.Typography width={"25%"}>
            {isMobile ? "name" : "Branch Name"}
          </CP.Typography>
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
          <CP.Typography width={"25%"}>
            {" "}
            {isMobile ? "Manager" : "Manager Name"}
          </CP.Typography>
          {/* Replace TextField with a select dropdown */}
          <TextField
            select
            label="Manager"
            name="managerId"
            value={branchData.managerId}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {/* Assuming managers are stored in an array */}
            {managers.map((manager: any) => (
              <MenuItem key={manager.id} value={manager.userId}>
                {manager.user.firstName} {manager.user.lastName}
              </MenuItem>
            ))}
          </TextField>
        </CP.Styled.Flex>
        <CP.Styled.Flex>
          <CP.Typography width={"25%"}>
            {isMobile ? "Address" : "Address Line"}
          </CP.Typography>
          <TextField
            label="Address Line"
            type="text"
            name="addressLine"
            value={branchData.addressLine}
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
            name="locationName"
            value={branchData.locationName}
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
