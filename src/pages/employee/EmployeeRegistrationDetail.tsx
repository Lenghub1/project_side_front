import React from "react";
import { handleApiRequest } from "@/api";
import { patchEmployeeById } from "@/api/employee";
import { useNavigate } from "react-router-dom";
import { employementDetail } from "@/store/userStore";
import { useSnackbar } from "notistack";
import CP from "@/components";
import { Avatar, CircularProgress, Container } from "@mui/material"; // Added CircularProgress
import { useIsMobile } from "@/utils/isMobile";
import theme from "@/theme/ligthTheme";
import {
  InformationItem,
  InformationSection,
} from "@/components/information/employeeInfoCard";
import { useRecoilState } from "recoil";

const EmployeeRegistrationDetail = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false); // Added loading state
  const isMobile = useIsMobile();
  const employee = useRecoilState(employementDetail);

  let body = { status: "active" };

  const acceptEmployee = async () => {
    setLoading(true); // Set loading state to true
    setTimeout(async () => {
      console.log("Delayed for 1 second.");

      const [response, error] = await handleApiRequest(() =>
        patchEmployeeById(
          "1ca2a528-72c9-4cb8-8823-4d26cfcdd598",
          employee[0].id,
          body
        )
      );

      if (error) {
        console.log(error);
        enqueueSnackbar("Failed to accept employee", {
          variant: "error",
          autoHideDuration: 2000,
        });
      } else {
        enqueueSnackbar("Accepted Employee successfully", {
          variant: "success",
          autoHideDuration: 2000,
        });
      }

      // Set loading state to false regardless of success or failure
      setLoading(false);

      setTimeout(() => {
        navigate("/organization/employee/registrations");
      }, 1000); // Delay navigation by 1 second
    }, 3000); // Delay the whole process by 3 seconds
  };

  return (
    <Container>
      <CP.Styled.Div>
        {isMobile ? (
          <CP.Styled.Flex>
            <Avatar
              style={{
                width: "150px",
                height: "150px",
                position: "relative",
                marginTop: "50px",
              }}
            />
          </CP.Styled.Flex>
        ) : (
          <CP.Styled.Flex
            padding="20px"
            direction="column"
            justify="flex-start"
            items="flex-start"
            bg={`${theme.palette.accent?.main}`}
          >
            <Avatar
              style={{
                width: "200px",
                height: "200px",
                position: "relative",
                marginLeft: "20px",
              }}
            ></Avatar>
          </CP.Styled.Flex>
        )}

        <CP.Styled.Flex
          gap="20px"
          justify={isMobile ? "center" : "flex-end"}
          padding="20px"
        >
          {!loading && employee[0].status !== "active" && (
            <>
              <CP.Button variant="outlined">REJECT</CP.Button>
              <CP.Button onClick={acceptEmployee}>ACCEPT</CP.Button>
            </>
          )}
          {loading && <CircularProgress />}
        </CP.Styled.Flex>
        <CP.Styled.Flex direction={isMobile ? "column" : "row"}>
          <InformationSection title="PERSONAL INFORMATION">
            <InformationItem
              label="Phone Number"
              value={employee[0].phoneNumber}
            />
            <InformationItem label="Birthday" value="21-Feb-1999" />
            <InformationItem label="Email" value={employee[0].email} />
            <InformationItem
              label="Address"
              value="unknown, 123, Phnom Penh, Cambodia"
            />
          </InformationSection>
          <InformationSection title="WORK INFORMATION">
            <InformationItem label="Role" value={employee[0].position} />
            <InformationItem label="Team" value="software" />
            <InformationItem label="Contract Type" value="Part-Time" />
            <InformationItem label="Working Shift" value="8:00am - 5:00 pm" />
          </InformationSection>
        </CP.Styled.Flex>
      </CP.Styled.Div>
    </Container>
  );
};

export default EmployeeRegistrationDetail;
