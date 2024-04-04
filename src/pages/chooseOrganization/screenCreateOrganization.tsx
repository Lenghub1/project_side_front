import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom"; // Import useHistory for navigation
import { newOrganization } from "@/api/organization";
import { handleApiRequest } from "@/api";
import { useIsMobile } from "@/utils/isMobile";
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
} from "@mui/material";
import CP from "@/components";
import countryData from "./countryData.json";
import industryData from "./industryData.json";

const ScreenCreateOrganization = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [country, setCountry] = useState("");
  const isMobile = useIsMobile();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate(); // Initialize useHistory for navigation

  const handleBusinessTypeChange = (event: any) => {
    setBusinessType(event.target.value);
  };

  const handleCompanySizeChange = (event: any) => {
    setCompanySize(event.target.value);
  };

  const handleCountryChange = (event: any) => {
    setCountry(event.target.value);
  };

  const businessTypes = industryData;
  const companySizes = ["1-25", "26-50", "51-100"];
  const countries = countryData;

  const createOrganization = async (data: any) => {
    const [response, error] = await handleApiRequest(() =>
      newOrganization(data)
    );
    if (error) {
      enqueueSnackbar("Failed to create organization", {
        variant: "error",
        autoHideDuration: 1500,
      });
    } else {
      enqueueSnackbar("Organization created successfully", {
        variant: "success",
        autoHideDuration: 1500,
      });
      // Navigate to join-organization screen upon successful creation
      navigate("/join-organization");
    }
  };

  const handleCreateOrganization = () => {
    if (!organizationName || !businessType || !companySize || !country) {
      enqueueSnackbar("Please fill in all fields.", {
        variant: "error",
        autoHideDuration: 1500,
      });
      return;
    }
    const data = {
      name: organizationName,
      type: businessType,
      companySize: companySize,
      country: country,
    };
    createOrganization(data);
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
      <Container style={{ maxWidth: "760px" }}>
        <Box sx={{ p: 4 }}>
          <Typography variant={isMobile ? "h5" : "h4"}>
            Create Organization
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant={isMobile ? "h6" : "h5"}>
              Organization Details
            </Typography>
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
                {businessTypes.map((data) => (
                  <MenuItem key={data.type} value={data.type}>
                    {data.type}
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
                  <MenuItem
                    key={`${country.name}-${country.code}`}
                    value={country.name}
                  >
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <CP.Styled.Flex justify="flex-end" gap="20px">
            <CP.Button variant="text" sx={{ mt: 4 }}>
              Cancel
            </CP.Button>
            <CP.Button
              variant="contained"
              onClick={handleCreateOrganization}
              sx={{ mt: 4 }}
            >
              Create
            </CP.Button>
          </CP.Styled.Flex>
        </Box>
      </Container>
    </CP.Styled.Div>
  );
};

export default ScreenCreateOrganization;
