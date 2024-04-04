import CP from "@/components";
import MapComponent from "@/components/map/Map";
import { BranchData } from "@/utils/interfaces/Branch";
import { Avatar } from "@mui/material";
import { useIsMobile } from "@/utils/isMobile";
interface Props {
  branchData: BranchData;
  manager: any[];
}

const ConfirmationCreateBranch = ({ branchData, manager }: Props) => {
  const { member } = branchData;
  const isMobile = useIsMobile();
  const managersName = manager
    .filter((item) => item.userId === branchData.managerId)
    .map((item) => `${item.user.firstName} ${item.user.lastName}`);

  return (
    <CP.Styled.Flex
      width="100%"
      direction="column"
      justify="flex-start"
      items="flex-start"
      padding="20px"
      gap="20px"
    >
      <CP.Typography variant="h5" fontFamily={"bold"}>
        Confirmation
      </CP.Typography>
      <MapComponent />
      <CP.Card width="100%">
        <CP.Styled.Wrapper
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <CP.Typography variant="h5">{branchData.name}</CP.Typography>

          <CP.Styled.Flex justify="flex-start">
            {member.map((index: any) => (
              <Avatar key={index}></Avatar>
            ))}
          </CP.Styled.Flex>
          <CP.Typography color={"grey"}>
            {member.length} Employees
          </CP.Typography>
          <CP.Styled.Flex
            justify="flex-start"
            gap="20px"
            width={isMobile ? "100%" : "50%"}
          >
            <CP.Styled.Div>
              <CP.Typography color={"grey"}>
                {isMobile ? "Manager" : "Branch Manager"}
              </CP.Typography>
              <CP.Typography color={"grey"} marginTop={"20px"}>
                {isMobile ? "Location" : "Branch Location"}
              </CP.Typography>
              <CP.Typography color={"grey"} marginTop={"20px"}>
                {isMobile ? "Range" : "GeoFencing Range"}
              </CP.Typography>
            </CP.Styled.Div>
            <CP.Styled.Div>
              <CP.Typography>{managersName[0]}</CP.Typography>
              <CP.Typography marginTop={"20px"}>
                {branchData.locationName}
              </CP.Typography>
              <CP.Typography marginTop={"20px"}>
                {branchData.geoFencing}m
              </CP.Typography>
            </CP.Styled.Div>
          </CP.Styled.Flex>
        </CP.Styled.Wrapper>
      </CP.Card>
    </CP.Styled.Flex>
  );
};

export default ConfirmationCreateBranch;
