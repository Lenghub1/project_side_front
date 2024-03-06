import Typography from "@/components/typography";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import CreateOrgStepper from "@/components/stepper/CreateOrgStepper";
import TextField from "@/components/textField";
import MapComponent from "@/components/map/Map";
const Organization = () => {
  return (
    <Container sx={{ width: "100%", paddingTop: 6 }}>
      <CreateOrgStepper />

      <MapComponent />
      <Box>
        <Typography>Organization Information</Typography>
        <Box>
          <TextField label="Name" />
        </Box>
        <Box>
          <TextField label="Organization Name" />
        </Box>
        <Box>
          <TextField label="Address Line" />
        </Box>
        <Box>
          <TextField label="Currency " />
        </Box>
      </Box>
    </Container>
  );
};

export default Organization;
