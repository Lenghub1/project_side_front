import CP from "@/components";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MapComponent from "@/components/map/Map";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { selectBranch } from "@/store/branch";

interface BranchDetailCardProps {
  branchData: branchData; // Corrected from branchName
}

interface branchData {
  locationId: string;
  name: string;
}

export const BranchDetailCard: React.FC<BranchDetailCardProps> = ({
  branchData,
}) => {
  const navigate = useNavigate();
  const [branchSelected, setBranchSeleted] = useRecoilState(selectBranch);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [iconHovered, setIconHovered] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const toggleExpansion = () => {
    setExpanded(!expanded);
    setIsActive(!isActive);
  };

  const handleIconHover = () => {
    setIconHovered(true);
  };

  const handleIconBlur = () => {
    setIconHovered(false);
  };
  const handleModify = () => {
    navigate("/organization/modifyBranch");
    setBranchSeleted(branchData as any);
  };

  return (
    <CP.Card padding="20px" width="100%">
      <CP.Styled.Flex direction="column" items="flex-start">
        <CP.Styled.Div>
          <CP.Styled.Flex justify="space-between">
            <CP.Typography variant="subtitle1" fontWeight={500}>
              {branchData.name}
            </CP.Typography>
            <ExpandMoreIcon
              onMouseDown={handleIconHover}
              onMouseUp={handleIconBlur}
              onTouchStart={handleIconHover}
              onTouchEnd={handleIconBlur}
              style={{
                color: iconHovered ? "#007bff" : "inherit",
                transform:
                  iconHovered || isActive ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s, color 0.3s",
                cursor: "pointer",
              }}
              onClick={toggleExpansion}
            />
          </CP.Styled.Flex>
        </CP.Styled.Div>

        {expanded && (
          <>
            <MapComponent />
            <CP.Styled.Div padding="20px">
              <CP.Styled.Flex
                justify="flex-start"
                gap="20px"
                items="flex-start"
                direction="column"
              >
                <CP.Typography color={"grey"}>
                  John Doe 4 Feb 2022
                </CP.Typography>
                <CP.Typography variant="h5">
                  {branchData.locationId}
                </CP.Typography>
                <CP.Typography color={"gray"}> 6 Employee</CP.Typography>
              </CP.Styled.Flex>
              <CP.Styled.Flex
                gap="10px"
                justify="flex-end"
                items="flex-end"
                overflow="unset"
              >
                <CP.Button variant="text">Archive</CP.Button>
                <CP.Button onClick={handleModify}>Modify</CP.Button>
              </CP.Styled.Flex>
            </CP.Styled.Div>
          </>
        )}
      </CP.Styled.Flex>
    </CP.Card>
  );
};
