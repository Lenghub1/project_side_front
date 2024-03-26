import CP from "..";
import styled from "styled-components";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PlaceIcon from "@mui/icons-material/Place";
import PersonIcon from "@mui/icons-material/Person";
interface RoleCardProps {
  id: string;
  setActiveOrgId: (id: string | undefined) => void;
  isActive: boolean;
  title: string;
  description: string;
  location: Number;
  employee: Number;
}

const Typography = styled(CP.Typography)`
  color: inherit;
`;

const ChooseOrganizationCard = ({
  id,
  setActiveOrgId,
  isActive,
  title,
  description,
  location,
  employee,
}: RoleCardProps) => {
  const handleCardClick = () => {
    setActiveOrgId(isActive ? undefined : id);
  };

  // Truncate title if it's longer than 25 characters
  const truncatedTitle = title.length > 25 ? title.slice(0, 23) + " .." : title;

  return (
    <CP.Card
      sx={{
        border: isActive ? "2px solid" : "1px solid",
        borderColor: isActive ? "primary.main" : "grey.300",
        color: isActive ? "primary.main" : "text.primary",
        maxWidth: "100%",
        height: "9rem",
        borderRadius: "1rem",
      }}
      variant="outlined"
      padding="0"
      onClick={handleCardClick}
    >
      <CardActionArea
        sx={{ color: isActive ? "primary.main" : "text.primary" }}
      >
        <CP.Styled.Flex padding="1.5rem" justify="flex-start">
          <CardContent>
            <Typography variant="h6" gutterBottom color="inherit">
              {truncatedTitle}
            </Typography>
            <CP.Styled.Flex gap="20px" justify="flex-start">
              <PersonIcon />
              {description}
            </CP.Styled.Flex>
          </CardContent>
        </CP.Styled.Flex>
      </CardActionArea>
    </CP.Card>
  );
};

export default ChooseOrganizationCard;
