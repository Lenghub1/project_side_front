import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Box,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material"; // Assuming you're using Material-UI
import CP from "@/components";

const ScreenCreateOrganization = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [businessType, setBusinessType] = useState(""); // Updated state variable
  const [companySize, setCompanySize] = useState("");
  const [country, setCountry] = useState("");

  const handleBusinessTypeChange = (event: any) => {
    setBusinessType(event.target.value);
  };

  const handleCompanySizeChange = (event: any) => {
    setCompanySize(event.target.value);
  };

  const handleCountryChange = (event: any) => {
    setCountry(event.target.value);
  };

  const businessTypes = ["Type 1", "Type 2", "Type 3", "Type 4"];
  const companySizes = ["1-25", "26-50", "51-100"];
  const countries = ["USA", "UK", "Canada"];

  const handleCreateOrganization = () => {
    const data = {
      name: organizationName,
      type: businessType,
      companySize: companySize,
      country: country,
    };
    console.log(data);
  };

  return (
    <CP.Styled.Div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Container style={{ width: "760px" }}>
        <Box sx={{ p: 4 }}>
          <Typography variant="h4">Create Organization</Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Organization Details</Typography>
            <TextField
              label="Organization Name"
              variant="outlined"
              fullWidth
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              sx={{ mt: 2 }}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="business-type-label">Business Type</InputLabel>
              <Select
                labelId="business-type-label"
                id="business-type"
                value={businessType}
                label="Business Type"
                onChange={handleBusinessTypeChange}
              >
                {businessTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="company-size-label">Company Size</InputLabel>
              <Select
                labelId="company-size-label"
                id="company-size"
                value={companySize}
                label="Company Size"
                onChange={handleCompanySizeChange}
              >
                {companySizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="country-label">Country</InputLabel>
              <Select
                labelId="country-label"
                id="country"
                value={country}
                label="Country"
                onChange={handleCountryChange}
              >
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            onClick={handleCreateOrganization}
            sx={{ mt: 4 }}
          >
            Create Organization
          </Button>
        </Box>
      </Container>
    </CP.Styled.Div>
  );
};

export default ScreenCreateOrganization;
