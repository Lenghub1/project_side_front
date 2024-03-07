import CP from "@/components";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface BranchDetailCardProps {
  branchName: string;
}

interface BranchDetailCardState {
  expanded: boolean;
}

export const BranchDetailCard: React.FC<BranchDetailCardProps> = ({
  branchName
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <CP.Card
      border="none"
      borderBottom="0.5px solid"
      borderRadius="0"
      padding="20px"
      onClick={toggleExpansion}
    >
      <CP.Styled.Flex direction="column" items="flex-start">
        <CP.Styled.Div>
          <CP.Styled.Flex justify="space-between">
            <CP.Typography variant="h5">{branchName}</CP.Typography>
            <ExpandMoreIcon />
          </CP.Styled.Flex>
        </CP.Styled.Div>

        {expanded && (
          <>
            <img
              style={{
                width: "100%",
                height: "200px",
                backgroundImage:
                  "url('https://cdn.britannica.com/37/245037-050-79129D52/world-map-continents-oceans.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginTop: "20px"
              }}
              alt=""
            />
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
                  abc, 123, Phnom penh, Cambodia
                </CP.Typography>
                <CP.Typography color={"gray"}> 6 Employee</CP.Typography>
              </CP.Styled.Flex>
              <CP.Styled.Flex gap="10px" justify="flex-end" items="flex-end">
                <CP.Button variant="text">Archieve</CP.Button>
                <CP.Button style={{ borderRadius: "20px" }}>Modify</CP.Button>
              </CP.Styled.Flex>
            </CP.Styled.Div>
          </>
        )}
      </CP.Styled.Flex>
    </CP.Card>
  );
};
