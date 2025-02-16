import * as React from "react";
import CP from "@/components";
import Typography from "@/components/typography";
import MapComponent from "@/components/map/Map";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import FormControl from "@mui/material/FormControl";

const NewOrganization = () => {
  const handleOnSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const orgData = document.querySelector("#org_form");
    const submitData = new FormData(orgData as HTMLFormElement);
    // const data = await handleApiRequest(() => newOrganization(submitData));
  };
  return (
    <CP.Container>
      <MapComponent />
      <Typography>Organization Information</Typography>
      <FormControl id="org_form" fullWidth onSubmit={() => handleOnSubmit}>
        <Stack gap={2} padding="16px 0">
          <Box>
            <CP.Input label="Organization Name" />
          </Box>
          <Box>
            <CP.Input label="Address Line" />
          </Box>
          <Box>
            <CP.Input label="Currency " />
          </Box>
          <CP.Button type="submit">Create</CP.Button>
        </Stack>
      </FormControl>
      <Outlet />
    </CP.Container>
  );
};

export default NewOrganization;
