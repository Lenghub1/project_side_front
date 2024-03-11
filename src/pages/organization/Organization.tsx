import CP from "@/components";
import Typography from "@/components/typography";
import { Container } from "@mui/material";
import CreateOrgStepper from "@/components/stepper/CreateOrgStepper";
import MapComponent from "@/components/map/Map";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const Organization = () => {
  return (
    <Container sx={{ paddingTop: 6 }}>
      <CreateOrgStepper />

      <MapComponent />

      <Stack gap={2}>
        <Typography>Organization Information</Typography>
        <Box>
          <CP.Input label="Name" />
        </Box>
        <Box>
          <CP.Input label="Organization Name" />
        </Box>
        <Box>
          <CP.Input label="Address Line" />
        </Box>
        <Box>
          <CP.Input label="Currency " />
        </Box>
      </Stack>
    </Container>
  );
};

export default Organization;
