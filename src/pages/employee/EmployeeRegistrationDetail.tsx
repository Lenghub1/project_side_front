import React from "react";
import { handleApiRequest } from "@/api";
import { getEmployeeById, patchEmployeeById } from "@/api/employee";
import { Employement } from "@/utils/interfaces/Employment";
import CP from "@/components";
import { Avatar, CircularProgress } from "@mui/material"; // Added CircularProgress
import { useIsMobile } from "@/utils/isMobile";
import theme from "@/theme/ligthTheme";
import {
  InformationItem,
  InformationSection,
} from "@/components/information/employeeInfoCard";

interface EmploymentWithAction extends Employement {
  action: string;
}

const EmployeeRegistrationDetail = () => {
  const [employeeData, setEmployeeData] = React.useState<
    EmploymentWithAction[]
  >([]);
  const [loading, setLoading] = React.useState(false); // Added loading state
  const isMobile = useIsMobile();

  const EmployeeDetails = async () => {
    const [response, error] = await handleApiRequest(() =>
      getEmployeeById(
        "1ca2a528-72c9-4cb8-8823-4d26cfcdd598",
        "3a2266a6-ad0c-4c44-8cd1-e5b40fc0a05a"
      )
    );
    if (error) {
      console.log(error);
    } else {
      setEmployeeData((response || []) as EmploymentWithAction[]);
    }
  };

  let body = { status: "active" };

  const acceptEmployee = async () => {
    setLoading(true); // Set loading state to true
    const [response, error] = await handleApiRequest(() =>
      patchEmployeeById(
        "1ca2a528-72c9-4cb8-8823-4d26cfcdd598",
        "3a2266a6-ad0c-4c44-8cd1-e5b40fc0a05a",
        body
      )
    );
    if (error) {
      console.log(error);
    } else {
      setEmployeeData((response || []) as EmploymentWithAction[]);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  React.useEffect(() => {
    EmployeeDetails();
  }, []);

  return (
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
        {!loading && employeeData?.data?.status !== "active" && (
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
            value={employeeData?.data?.users.phoneNumber}
          />
          <InformationItem label="Birthday" value="21-Feb-1999" />
          <InformationItem
            label="Email"
            value={employeeData?.data?.users.email}
          />
          <InformationItem
            label="Address"
            value="unknown, 123, Phnom Penh, Cambodia"
          />
        </InformationSection>
        <InformationSection title="WORK INFORMATION">
          <InformationItem label="Role" value={employeeData?.data?.position} />
          <InformationItem label="Team" value="software" />
          <InformationItem label="Contract Type" value="Part-Time" />
          <InformationItem label="Working Shift" value="8:00am - 5:00 pm" />
        </InformationSection>
      </CP.Styled.Flex>
    </CP.Styled.Div>
  );
};

export default EmployeeRegistrationDetail;
