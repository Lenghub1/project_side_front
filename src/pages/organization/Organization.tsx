import CP from "@/components";
import Typography from "@/components/typography";
import MapComponent from "@/components/map/Map";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const Organization = () => {
  return (
    <CP.Container sx={{ overflow: "scroll" }}>
      <MapComponent />
      <Stack gap={2} padding="16px 0">
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
    </CP.Container>
  );
};

export default Organization;
